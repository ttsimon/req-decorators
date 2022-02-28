import {Adapter, Options} from '../interface'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

export class CustomAxiosAdapter implements Adapter {
	private instance!: AxiosInstance
	constructor(config: AxiosRequestConfig) {
		this.createHttp(config)
	}

	/**
	 * 创建请求方法
	 * @param config
	 */
	private createHttp (config: AxiosRequestConfig) {
		this.instance = axios.create(config)
	}

	/**
	 * 请求调用方法
	 * @param config
	 */
	request (config: Options): Promise<AxiosResponse> {
		const options = {
			method: config.method,
			url: config.url,
			baseURL: config?.baseUrl,
			params: config?.query,
			data: config?.body,
			headers: config?.headers
		} as AxiosRequestConfig
		return new Promise((resolve, reject) => {
			this.instance.request(options).then((res: AxiosResponse) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}
