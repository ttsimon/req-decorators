import 'reflect-metadata'
import {MetadataKey} from '@/enum'
import {QueryOptions} from '@/interface'
export const HttpQuery = (keys?: QueryOptions): ParameterDecorator => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
	Reflect.defineMetadata(MetadataKey.QUERY_DATA_INDEX, parameterIndex, target, propertyKey)
	if (keys) {
		Reflect.defineMetadata(MetadataKey.QUERY_DATA_KEY, keys, target, propertyKey)
	}
}

export const HttpBody = (keys?: string | string[]): ParameterDecorator => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
	Reflect.defineMetadata(MetadataKey.BODY_DATA_INDEX, parameterIndex, target, propertyKey)
	if (keys) {
		Reflect.defineMetadata(MetadataKey.BODY_DATA_KEY, keys, target, propertyKey)
	}
}

export const HttpParam = (key: string): ParameterDecorator => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
	const metadata = Reflect.getMetadata(MetadataKey.PARAM_DATA, target, propertyKey) ?? {}
	metadata[key] = parameterIndex
	Reflect.defineMetadata(MetadataKey.PARAM_DATA, metadata, target, propertyKey)
}

