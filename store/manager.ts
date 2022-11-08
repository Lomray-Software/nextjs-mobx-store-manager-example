import { useMemo } from 'react'
import ApiClient from "../services/api-client";
import Endpoints from "../services/endpoints";
import {Manager, MobxLocalStorage} from "@lomray/react-mobx-manager";

let store: Manager | undefined;

function initStore(initState: Record<string, any>) {
    const apiClient = new ApiClient();
    const endpoints = new Endpoints(apiClient);
    const storeManager = new Manager({
        initState,
        storage: new MobxLocalStorage(),
        storesParams: { endpoints },
        options: { isSSR: true, shouldDisablePersist: typeof window === 'undefined', shouldRemoveInitState: false },
    });

    apiClient.setStoreManager(storeManager);

    return storeManager;
}

export const initializeManager = (initState: Record<string, any> = {}) => {
    let _store = store ?? initStore(initState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (initState && store) {
        _store = initStore({
            ...store.toJSON(),
            ...initState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useMobxManager(initialState: Record<string, any>) {
    const manager = useMemo(() => initializeManager(initialState), [initialState])
    return manager
}
