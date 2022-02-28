import { Adapter } from '../interface';
declare class Provider {
    http: Adapter;
    use(adapter: Adapter): void;
}
export declare const provider: Provider;
export {};
