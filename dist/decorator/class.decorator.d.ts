import 'reflect-metadata';
export declare const Controller: (prefix?: string | undefined) => ClassDecorator;
export declare const HttpBaseUrl: (baseUrl: string) => ClassDecorator;
export declare const HttpHeaders: (config: Record<string, string>) => ClassDecorator;
