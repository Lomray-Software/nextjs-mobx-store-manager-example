import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {StoreManagerProvider} from "@lomray/react-mobx-manager";
import {useMobxManager} from "../store/manager";

export default function App({ Component, pageProps }: AppProps) {
  const storeManager = useMobxManager(pageProps.initialMobxState);

  return (
      <StoreManagerProvider storeManager={storeManager}>
        <Component {...pageProps} />
      </StoreManagerProvider>
  )
}
