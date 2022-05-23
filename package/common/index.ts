import {AxiosResponse} from 'axios'
import 'reflect-metadata'
import {MetadataKey} from '@/enum'
import {requestData} from '@/utils/request'
import Qs from 'qs'
import {Filter, QueryOptions, TransformParameter} from '@/interface'

/**
 * 方法装饰器工厂 创建http装饰器
 * @param httpMethod
 * @param url
 */
export const createHttpDecorator = (httpMethod: string, url: string): MethodDecorator => {
	return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		// 保存原始方法
		const method = descriptor.value
		try {
			descriptor.value = async function () {
				const { resIndex, prefix, baseUrl, params, queryIndex, queryKeys, bodyIndex, bodyKeys, classHeadersConfig, methodHeadersConfig, transformParametersConfig } = getMetaData(target, propertyKey)
				// 传入的参数
				// eslint-disable-next-line prefer-rest-params
				const args: Array<any> = [...arguments]
				// 获取请求返回结果
				let path = prefix + url
				// query参数
				let query = {} as Record<any, any>
				// post参数
				let body = {} as Record<any, any>
				// path 参数处理
				if (queryIndex >= 0) {
					query = getHttpQueryData(args[queryIndex], queryKeys)
					if (transformParametersConfig) {
						const { data, urlPath } = combinationUrlAndQuery(url, query, transformParametersConfig)
						query = data
						path = urlPath
					}
				}
				// body 参数处理
				if (bodyIndex >= 0) {
					body = getHttpBodyData(args[bodyIndex], bodyKeys)
				}
				// 处理请求地址后缀参数
				if (params) {
					for (const k in params) {
						path = path.replace(`:${k}`, args[params[k]])
					}
				}
				// 请求头数据
				const headers = { ...(classHeadersConfig ?? {}), ...(methodHeadersConfig ?? {}) }
				const res: AxiosResponse = await requestData({ method: httpMethod, url: path, baseUrl, query, body, headers })
				args.splice(resIndex, 1, res.data)
				// 调用方法并传递参数
				return method.apply(this, args)
			}
		} catch (e) {
			console.log(e)
		}
	}
}

function combinationUrlAndQuery (url: string, query: Record<any, any>, config: TransformParameter) {
	const q = {} as Record<string, any>
	const data = {} as Record<string, any>
	const keySet = new Set()
	for (const k in config) {
		for (const key in query) {
			if (config[k as Filter].includes(key)) {
				q[key] = {
					...(typeof q[key] === 'object' ? q[key] : {}),
					[k]: query[key]
				}
			}
		}
		config[k as Filter].forEach((item: string) => {
			keySet.add(item)
		})
	}
	for (const key in query) {
		if (![...keySet].includes(key)) {
			data[key] = query[key]
		}
	}
	const str = Qs.stringify({q})
	return {
		data,
		urlPath: `${url}?${str}`
	}
}

/**
 * 处理query请求数据
 * @param obj 原数据
 * @param keys 要过滤的参数
 */
function getHttpQueryData (obj: Record<any, any>, keys?: QueryOptions) {
	if (!keys) return obj
	const data = {} as Record<string, any>
	if (keys.excepts) {
		if (typeof keys.excepts === 'string') {
			if (obj[keys.excepts]) {
				delete obj[keys.excepts]
			}
			return obj
		}
		keys.excepts.forEach((item: string) => {
			delete obj[item]
		})
		return obj
	}
	if (keys.includes) {
		if (typeof keys.includes === 'string') return {[keys.includes]: obj[keys.includes]}
		const data = {} as Record<string, any>
		keys.includes.forEach((item: string) => {
			data[item] = obj[item]
		})
		return data
	}
	return data
}

/**
 * 处理body请求数据
 * @param obj 原数据
 * @param keys 要过滤的参数
 */
function getHttpBodyData (obj: Record<any, any>, keys: string | string[]) {
	if (!keys) return obj
	if (typeof keys === 'string') return {[keys]: obj[keys]}
	const data = {} as Record<string, any>
	keys.forEach((item: string) => {
		data[item] = obj[item]
	})
	return data
}

/**
 * 获取元数据
 * @param target 类原型
 * @param propertyKey 方法key
 */
function getMetaData (target: any, propertyKey: string | symbol ) {
	// 获取需要装入返回结果的参数位置
	const resIndex = Reflect.getOwnMetadata(MetadataKey.RES, target, propertyKey)
	// 获取请求的前缀
	const prefix = Reflect.getOwnMetadata(MetadataKey.PREFIX, target)
	// 获取配置的基础请求路径
	const baseUrl = Reflect.getOwnMetadata(MetadataKey.BASE_URL, target)
	// 获取要转换的params
	const params = Reflect.getOwnMetadata(MetadataKey.PARAM_DATA, target, propertyKey)
	// 获取queryData配置
	const queryIndex = Reflect.getOwnMetadata(MetadataKey.QUERY_DATA_INDEX, target, propertyKey)
	const queryKeys = Reflect.getOwnMetadata(MetadataKey.QUERY_DATA_KEY, target, propertyKey)
	// 获取postData配置
	const bodyIndex = Reflect.getOwnMetadata(MetadataKey.BODY_DATA_INDEX, target, propertyKey)
	const bodyKeys = Reflect.getOwnMetadata(MetadataKey.BODY_DATA_KEY, target, propertyKey)
	// 类请求头数据
	const classHeadersConfig = Reflect.getOwnMetadata(MetadataKey.CLASS_HEADERS, target)
	// 方法请求头数据
	const methodHeadersConfig = Reflect.getOwnMetadata(MetadataKey.METHOD_HEADERS, target, propertyKey)
	const transformParametersConfig = Reflect.getOwnMetadata(MetadataKey.TRANSFORM_PARAMETERS, target, propertyKey)
	return {
		resIndex,
		prefix,
		baseUrl,
		params,
		queryIndex,
		queryKeys,
		bodyIndex,
		bodyKeys,
		classHeadersConfig,
		methodHeadersConfig,
		transformParametersConfig
	}
}
