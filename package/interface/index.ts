// 请求参数
export interface Options {
  baseUrl?: string
  method: string
  url: string
  query?: Record<any, any>
  body?: Record<any, any>
  headers?: Record<any, any>
}
// 请求适配器接口
export interface Adapter {
  request: (config: Options) => Promise<any>,
}
// 筛选转换
export type Filter = 'eq' | 'like' | 'gt' | 'le' | 'ge' | 'between'
// 筛选转换参数
export type TransformParameter = {
  [key in Filter]: Array<string>;
};
// 请求参数配置
export interface QueryOptions {
  // 包含
  includes?: string | string[]
  // 不包含
  excepts?: string | string[]
}
