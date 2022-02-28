## req-decorator 请求装饰器

### 使用配置

```ts
依赖于axios请求库，项目中需要安装此依赖
```
### 安装

```ts
// npm
npm i -S req-decorator

// yarn
yarn add req-decorator
```

### 使用

该插件依赖于ts语法，使用时需打开tsconfig.json中的"experimentalDecorators"配置

```ts
{
  // 开启装饰器语法
  "experimentalDecorators": true,
}
```

```ts
import {Controller, HttpBaseUrl, HttpHeaders,HttpBody, HttpQuery, Param, HttpRes, Get, Headers, Post, CustomAxiosAdapter, provider, TransformQueryParameters } from 'req-decorators'

// 全局注入请求适配器
provider.use(new CustomAxiosAdapter({
  baseURL: 'http://127.0.0.1:3000/v1/api'
}))


@Controller('/sjl')
@HttpBaseUrl('http://127.0.0.1:3000/v1/api')
@HttpHeaders({
  'content-type': 'application/json'
})
class TestRequest {
  @Get('/all/type')
  @Headers({
    'content-type': 'application/json'
  })
  queryData (@HttpRes res?: any): any {
    return res
  }
  @Get('/:id')
  queryDataById (@Param('id') id: number, @HttpRes res?: any) {
    return res
  }
  @Get()
  @TransformQueryParameters({
    eq: ['type']
  })
  querySjlData (@HttpQuery() query: Record<string, any>, @HttpRes res?: any) {
    return res
  }
  @Post()
  postData (@HttpBody() data: Record<string, any>, @HttpRes res?: any) {
    return res
  }
}
export const testRequest = new TestRequest()
const res = await testRequest.querySjlData()
console.log(res)
```



### 装饰器介绍

#### 类装饰器

