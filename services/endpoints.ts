import type { Method } from 'axios';
import type ApiClient from './api-client';
import type { IApiClientReqOptions } from './api-client';

interface IEndpointsCreateHandlerConfig extends Pick<IApiClientReqOptions, 'isCached'> {}

interface IEndpointsCreateHandlerOptions extends Omit<IApiClientReqOptions, 'isCached'> {}

/**
 * Backend API endpoints
 */
class Endpoints {
    /**
     * API client
     */
    public readonly apiClient: ApiClient;

    /**
     * @constructor
     */
    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;

        apiClient.setEndpoints(this);
    }

    /**
     * Create endpoint handler
     */
    private createHandler =
        <TInput, TOutput>(
            url: string,
            method: Method,
            { isCached }: IEndpointsCreateHandlerConfig = {},
        ) =>
            (params?: TInput, options?: IEndpointsCreateHandlerOptions) =>
                this.apiClient.sendRequest<TOutput, TInput>(url, method, params, {
                    isCached,
                    ...options,
                });

    /**
     * Backend API
     */
    backend = {
        getName: this.createHandler<never, { name?: string }>('/api/hello', 'GET'),
    };
}

export default Endpoints;
