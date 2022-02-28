import {Options} from '../interface'
import {provider} from '../utils/provider'

export function requestData(config: Options): Promise<any> {
	return provider.http.request(config)
}
