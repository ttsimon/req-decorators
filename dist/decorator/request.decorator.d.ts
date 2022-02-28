import 'reflect-metadata';
import { TransformParameter } from '@/interface';
export declare const Get: (url?: string | undefined) => MethodDecorator;
export declare const Post: (url?: string | undefined) => MethodDecorator;
export declare const Delete: (url?: string | undefined) => MethodDecorator;
export declare const Patch: (url?: string | undefined) => MethodDecorator;
export declare const Put: (url?: string | undefined) => MethodDecorator;
export declare const Headers: (config: Record<string, string>) => MethodDecorator;
export declare const TransformQueryParameters: (config: TransformParameter) => MethodDecorator;
