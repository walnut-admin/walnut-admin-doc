# <WPageTitle></WPageTitle>

## 一、整体架构
项目基于 <WBaseLink preset="axios">Axios</WBaseLink>进行请求层封装，覆盖 **配置增强、拦截器扩展、适配器拓展、Token 无感刷新** 四大核心能力，支撑复杂业务场景下的请求管理。

## 二、核心模块解析

### 1. 配置层封装（`config`）
#### （1）基础配置
- `baseURL`：统一请求域名，通过环境变量动态注入。
- `withCredentials: true`：默认携带 Cookie，支持跨域会话保持。
- `paramsSerializer`：使用 `qs` 库序列化 URL 参数，数组默认以逗号分隔（`arrayFormat: 'comma'`），适配后端参数解析规则。
- `timeout`：全局超时时间（默认值可配置，如 10s）。

#### （2）自定义配置（TS 类型增强）
通过扩展 `AxiosRequestConfig` 类型，新增以下下划线前缀的自定义字段（支持 TS 智能提示，全局类型定义带注释）：

| 字段名                          | 功能说明                                                                 |
|---------------------------------|--------------------------------------------------------------------------|
| `_carryToken: boolean`          | 是否在请求头携带 `Authorization Bearer` Token                            |
| `_timestamp: boolean`           | 是否在 Query 中追加时间戳（防缓存或签名场景）                             |
| `_error: boolean`               | 标记该请求为“预期失败”（用于测试错误逻辑）                                |
| `_sleep: number`                | 模拟接口延迟（需后端接口支持）                                           |
| `_transformStringToBoolean: boolean` | 自动将请求参数中的字符串布尔值（`"true"/"false"`）转为 JS 布尔值         |
| `_autoDecryptResponseData: boolean` | 自动解密响应数据（依赖 `crypto-js`）                                     |
| `_autoEncryptRequestDataFields: string[]` | 自动加密请求指定字段（依赖 `crypto-js`，数组指定加密字段）              |
| `_cache: boolean`               | 启用请求缓存（基于 [axios-extensions](https://github.com/kuitos/axios-extensions) 优化） |
| `_cache_force_update: boolean`  | 强制更新缓存（忽略已有缓存）                                             |
| `_retryTimes: number`           | 请求失败重试次数（基于 [axios-extensions](https://github.com/kuitos/axios-extensions) 优化） |
| `_throttle: number`             | 接口限流毫秒数（单位：ms，基于 [axios-extensions](https://github.com/kuitos/axios-extensions) 优化） |
| `_mergeRequest: boolean`        | 合并同接口不同参数的 GET 请求（如字典接口去重）                           |
| `_request_after_refresh_token: boolean` | 标记为“Token 刷新后重试的请求”（内部逻辑标记）                     |
| `_request_from_route_path: string` | 标记请求所属页面（用于页面级请求取消）                                 |
| `_request_id: string`           | 请求唯一 ID（用于追踪或去重）                                             |

### 2. 拦截器体系（`interceptors`）
#### （1）请求拦截器（Request Interceptor）
- **功能**：请求发送前统一处理 **请求头、参数、自定义配置**：
  - 若 `_carryToken: true`，自动在 `Headers` 注入 `Authorization: Bearer ${token}`；
  - 若 `_timestamp: true`，在 Query 追加 `_t=${Date.now()}`；
  - 处理 `_transformStringToBoolean` 对参数的自动转换；
  - 其他自定义配置的前置逻辑（如加密、Mock 标记等）。

#### （2）响应拦截器（Response Interceptor）
- **核心能力**：全局错误处理 + **Token 无感刷新**：
  - 捕获 HTTP 状态码异常（如 401、403），触发统一错误提示；
  - 检测 `access_token` 过期错误码（如 `CODE_TOKEN_EXPIRED`），启动 **Token 刷新流程**：
    - 将当前失败请求加入“重试队列”；
    - 调用 `refreshToken` 接口获取新 Token；
    - 新 Token 生效后，自动重试队列中所有请求，实现用户无感知。
  - 兼容 `CAPJS Token`（人机校验 Token）的类似刷新逻辑，但存在 **双 Token 同时过期时重复请求** 的潜在问题（暂未修复，优先级较低）。

### 3. 适配器拓展（`adapters`）
基于 [`axios-extensions`](https://github.com/kuitos/axios-extensions) 扩展 5 种增强适配器，代码位于<WFrontLink path="/src/utils/axios/src/adapters">`src/adapters/`</WFrontLink>  目录：

| 适配器文件                     | 功能                                                         |
|--------------------------------|--------------------------------------------------------------|
| `cacheAdapterEnhancer.ts`      | 请求缓存（配置 `_cache`/`_cache_force_update`，复用相同请求，避免重复调用）                       |
| `cancelAdapterEnhancer.ts`     | 请求取消（支持页面级、全局请求取消）                         |
| `mergeAdapterEnhancer.ts`      | 合并请求（配置 `_mergeRequest`，同接口不同参数的 GET 请求合并，如字典接口去重）     |
| `retryAdapterEnhancer.ts`      | 失败重试（配置 `_retryTimes` 实现自动重试）                  |
| `throttleAdapterEnhancer.ts`   | 接口限流（配置 `_throttle` 控制请求频率）                    |

### 4. 辅助逻辑封装
- **状态码校验**：`checkStatus.ts` 封装 HTTP 状态码、业务错误码的统一校验逻辑。
- **Token 管理**：
  - `refreshToken.ts`：实现 `access_token` 刷新及重试队列处理；
  - `capJSToken.ts`：人机校验 Token 的类似刷新逻辑（与 `refreshToken` 复用核心流程）。
- **数据转换**：`transform.ts` 处理请求参数加密、响应数据解密等自定义转换逻辑。

## 三、设计亮点与待优化
### 亮点：
1. **TS 友好性**：通过类型扩展实现自定义配置的智能提示，注释清晰，降低使用成本。
2. **适配器解耦**：基于 `axios-extensions` 拓展能力，通过配置字段灵活启用/关闭，不侵入核心逻辑。
3. **无感 Token 刷新**：重试队列机制保障 Token 刷新后请求自动续发，提升用户体验。

### 待优化：
- **双 Token 过期冲突**：`access_token` 与 `CAPJS Token` 同时过期时，可能触发重复请求，需优化队列调度逻辑。

## 四、使用示例（伪代码）
```typescript
// 携带 Token + 启用缓存 + 3次重试
AppAxios.post({
  url: '/api/user',
  _carryToken: true,
  _cache: true,
  _retryTimes: 3
})

// 加密请求字段 + 自动转换布尔值
AppAxios.post({
  url: '/api/login',
  method: 'POST',
  data: { password: 'xxx', isAdmin: 'true' },
  _autoEncryptRequestDataFields: ['password'],
  _transformStringToBoolean: true
})
