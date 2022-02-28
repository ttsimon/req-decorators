import {MetadataKey} from '@/enum'
import 'reflect-metadata'
/**
 * Controller 类装饰器
 * @param prefix
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const Controller = (prefix?: string): ClassDecorator => <TFunction extends Function>(target: TFunction): TFunction | void => Reflect.defineMetadata(MetadataKey.PREFIX, prefix ?? '/', target.prototype)
/**
 * httpBaseUrl 类装饰器
 * @param baseUrl 请求基础路径配置
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const HttpBaseUrl = (baseUrl: string): ClassDecorator => <TFunction extends Function>(target: TFunction): TFunction | void => Reflect.defineMetadata(MetadataKey.BASE_URL, baseUrl, target.prototype)
/**
 * Headers 请求类请求头配置装饰器
 * @param config
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const HttpHeaders = (config: Record<string, string>): ClassDecorator => <TFunction extends Function>(target: TFunction): TFunction | void => Reflect.defineMetadata(MetadataKey.CLASS_HEADERS, config, target.prototype)
