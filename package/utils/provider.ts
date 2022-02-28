import {Adapter} from '../interface'

class Provider {
	http!: Adapter
	use (adapter: Adapter) {
		this.http = adapter
	}
}

export const provider = new Provider()
