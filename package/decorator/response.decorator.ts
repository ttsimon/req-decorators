import 'reflect-metadata'
import {MetadataKey} from '@/enum'
/**
 * 返回数据装饰器
 * @param target
 * @param propertyKey
 * @param parameterIndex
 * @constructor
 */
export const HttpRes: ParameterDecorator = (target: any, propertyKey: string | symbol, parameterIndex: number) => {
	Reflect.defineMetadata(MetadataKey.RES, parameterIndex, target, propertyKey)
}
