export interface Options {
    baseUrl?: string;
    method: string;
    url: string;
    query?: Record<any, any>;
    body?: Record<any, any>;
    headers?: Record<any, any>;
}
export interface Adapter {
    request: (config: Options) => Promise<any>;
}
export interface TransformParameter {
    eq?: string[];
    like?: string[];
    gt?: string[];
    le?: string[];
    ge?: string[];
    between?: string[];
}
