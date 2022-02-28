import {createHttpDecorator} from '../common'
import 'reflect-metadata'
import {MetadataKey} from '../enum'
import {TransformParameter} from '@/interface'
/**
 * Get 请求装饰器
 * @param url 请求地址
 * @constructor
 */
export const Get = (url?: string) => createHttpDecorator('GET', url ?? '')
/**
 * Post 请求装饰器
 * @param url 请求地址
 * @constructor
 */
export const Post = (url?: string) => createHttpDecorator('POST', url ?? '')
/**
 * Delete 请求装饰器
 * @param url 请求地址
 * @constructor
 */
export const Delete = (url?: string) => createHttpDecorator('DELETE', url ?? '')
/**
 * Patch 请求装饰器
 * @param url 请求地址
 * @constructor
 */
export const Patch = (url?: string) => createHttpDecorator('PATCH', url ?? '')
/**
 * Put 请求装饰器
 * @param url 请求地址
 * @constructor
 */
export const Put = (url?: string) => createHttpDecorator('PUT', url ?? '')

/**
 * Headers 接口请求头配置装饰器
 * @param config
 * @constructor
 */
export const Headers = (config: Record<string, string>): MethodDecorator => (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	Reflect.defineMetadata(MetadataKey.METHOD_HEADERS, config, target, propertyKey)
}
/**
 * query请求参数转换 需配合HttpQuery装饰器
 * @param config
 * @constructor
 */
export const TransformQueryParameters = (config: TransformParameter): MethodDecorator => (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	Reflect.defineMetadata(MetadataKey.TRANSFORM_PARAMETERS, config, target, propertyKey)
}
