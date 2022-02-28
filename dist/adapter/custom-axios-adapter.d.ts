import { Adapter, Options } from '../interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class CustomAxiosAdapter implements Adapter {
    private instance;
    constructor(config: AxiosRequestConfig);
    private createHttp;
    request(config: Options): Promise<AxiosResponse>;
}
