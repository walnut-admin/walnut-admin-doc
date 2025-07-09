# <WPageTitle></WPageTitle>

## 1. 全局路由配置模块
### 核心文件：`router/index.ts`
该模块是路由系统的“大脑”，负责路由实例的创建、初始化及全局配置，是连接所有路由功能的核心枢纽。

#### 核心功能：
- **创建路由实例**：通过 `createRouter` 函数初始化路由实例，配置关键参数：
  - `history: createWebHistory()`：采用 HTML5 History 模式（无哈希值 `#`）；
  - `routes`：导入合并后的完整路由列表；
  - `strict: true`：严格匹配路由路径（避免 `/path` 与 `/path/` 被视为同一路由）；
  - `stringifyQuery` 和 `parseQuery`：自定义查询参数的序列化与解析方法（关联 `router/utils/query.ts`）。

- **路由初始化**：提供 `setupRouter` 函数，完成两项关键操作：
  - 将路由实例挂载到 Vue 应用（`app.use(AppRouter)`）；
  - 调用 `createRouterGuard(AppRouter)` 注册所有路由守卫（关联 `router/guard/index.ts`）。

- **工具函数导出**：封装并导出路由访问工具，简化组件中路由使用：
  - `useAppRoute`：获取当前路由信息（替代 `useRoute`）；
  - `useAppRouter`：获取路由实例（替代 `useRouter`）；
  - `useAppRouterPush`：封装路由跳转方法，统一处理跳转逻辑。

#### 关键代码示例：
```typescript
// 创建路由实例
export const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  stringifyQuery,
  parseQuery,
})

// 初始化路由
export function setupRouter(app: App) {
  app.use(AppRouter)
  createRouterGuard(AppRouter) // 注册所有守卫
}
```

## 2. 路由定义与合并模块
该模块负责管理路由的“骨架”，定义各类路由规则并合并为完整路由列表，支持内置路由与业务路由的分离管理。

### 2.1 路由合并文件：`router/routes/index.ts`
- **功能**：汇总所有分散的路由记录，生成最终供路由实例使用的完整路由列表。
- **实现逻辑**：通过数组展开运算符合并两类路由：
```typescript
import { builtinRoutes } from './builtin'
import { mainoutRoutes } from './mainout'

export const routes = [...builtinRoutes, ...mainoutRoutes]
```

### 2.2 内置路由定义：`router/routes/builtin.ts`
- **功能**：定义项目基础必备路由（无需业务扩展的核心页面）。
- **包含路由示例**：
  - `AppAuthRoute`：认证页面（登录/注册），路径 `\auth`；
  - `AppAuthPrivacyPolicyRoute`：隐私政策页面，路径 `\auth\privacy-policy`；
  - `AppNotAllowedRoute`：无权限提示页面，路径 `\not-allowed`。
- **共性特征**：通过 `meta: { _auth: false }` 标记为无需登录即可访问的公共路由。

### 2.3 业务扩展路由定义：`router/routes/mainout.ts`
- **功能**：定义项目特定业务路由（随业务需求扩展的页面）。
- **包含路由示例**：
  - `testMainoutRoute`：测试页面，路径 `\test-mainout`；
  - `externalLinkRoute`：外部链接跳转页，路径 `\external-link`；
  - `splashCursorRoute`：光标动效演示页，路径 `\splash-cursor`。
- **性能优化**：所有路由组件通过懒加载引入（`component: () => import('../../views/xxx.vue')`），减少首屏加载资源体积。

## 3. 路由守卫机制模块
路由守卫是路由跳转的“保安系统”，负责在路由切换过程中执行权限验证、用户交互、状态维护等关键逻辑，共分为全局守卫和细分功能守卫两类。

### 3.1 守卫入口：`router/guard/index.ts`
- **功能**：统一注册所有路由守卫，避免守卫逻辑分散，便于管理和扩展。
- **执行逻辑**：按顺序调用各类守卫的创建函数，确保守卫按预期顺序生效：
```typescript
export function createRouterGuard(router: Router) {
  createLoadingbarGuard(router) // 加载进度条守卫
  createLeaveTipGuard(router) // 页面离开提示守卫
  createLockGuard(router) // 应用锁定守卫
  createRouteParamsEnhancedGuard(router) // 参数增强守卫
  createBeforeEachGuard(router) // 全局前置守卫
  createAfterEachGuard(router) // 全局后置守卫
}
```

### 3.2 全局前置守卫：`router/guard/beforeEach.ts`
- **触发时机**：路由跳转前（页面尚未开始切换）。
- **核心逻辑**：
  - 白名单校验：检查目标路由是否在 `routeWhiteListPath`（关联 `router/constant.ts`），白名单路由直接放行；
  - 登录状态校验：非白名单路由需验证用户登录状态，未登录则强制跳转至 `\auth`（认证页）；
  - 用户信息补全：已登录状态下验证用户信息完整性，缺失时自动调用接口获取用户数据；
  - 权限校验：根据用户角色判断是否有权访问目标路由，无权限则跳转至 `\not-allowed`。

### 3.3 全局后置守卫：`router/guard/afterEach.ts`
- **触发时机**：路由跳转完成后（页面已渲染）。
- **核心逻辑**：
  - 更新标签页参数：同步路由信息到标签页状态（如缓存当前路由标题）；
  - 清理未完成请求：终止上一页面未完成的 API 请求，避免数据混乱；
  - 维护缓存视图：根据路由元信息 `meta.keepAlive` 更新缓存视图列表（关联 Vue 组件缓存机制）。

### 3.4 细分功能守卫

#### 3.4.1 页面离开提示守卫：`router/guard/modules/leaveTip.ts`
- **功能**：防止用户误关闭或跳转页面导致未保存数据丢失。
- **关键逻辑**：
  - 进入含 `meta.leaveTip: true` 的页面时，添加 `beforeunload` 事件监听（关闭浏览器标签页时触发提示）；
  - 离开此类页面时，通过 `window.confirm` 弹窗询问用户“是否确定离开”，用户取消则阻止路由跳转。

#### 3.4.2 应用锁定守卫：`router/guard/modules/lock.ts`
- **功能**：当应用处于锁定状态（如用户长时间未操作），限制路由访问。
- **关键逻辑**：
  - 检测应用锁定状态（通过 `useAppStoreLock()` 获取）；
  - 若处于锁定状态且目标路由不是解锁页，则强制跳转至锁定页面（如密码验证页）。

#### 3.4.3 参数增强守卫：`router/guard/modules/paramsEnhanced.ts`
- **功能**：对路由参数进行加密/编码处理，提升参数传输安全性。
- **关键逻辑**：
  - 路由跳转前（`beforeEach`）：若启用增强模式（`appSetting.routeParamsEnhanced`），对参数进行 Base64 编码或加密；
  - 路由解析前（`beforeResolve`）：自动解密/解码参数，确保页面能正常读取参数值。

#### 3.4.4 加载进度条守卫：`router/guard/modules/loadingbar.ts`
- **功能**：通过进度条直观展示路由加载状态，优化用户体验。
- **关键逻辑**：
  - 路由跳转开始时（`beforeEach`）：启动进度条（如 `NProgress.start()`）；
  - 路由跳转完成后（`afterEach`）：结束进度条（如 `NProgress.done()`）；
  - 特殊处理：若跳转至已缓存的页面，跳过进度条（避免无意义的加载动画）。

## 4. 路由工具函数模块
该模块提供路由系统的“工具集”，负责处理路由参数、路由树构建等辅助功能。

### 4.1 查询参数处理：`router/utils/query.ts`
- **核心功能**：封装查询参数的序列化（对象转字符串）和解析（字符串转对象），支持普通模式和增强模式。
- **序列化函数（`stringifyQuery`）**：
  - 普通模式：直接通过 `qs.stringify` 转换（如 `{ id: 1, name: 'test' } → id=1&name=test`）；
  - 增强模式：先转换为字符串，再进行 Base64 编码或加密（如 `id=1 → 加密后字符串`）。
- **解析函数（`parseQuery`）**：
  - 普通模式：通过 `qs.parse` 解析字符串为对象；
  - 增强模式：先解密/解码字符串，再转换为对象；
  - 白名单处理：白名单路径（`routeWhiteListPath`）的参数不进行增强处理，直接解析。

### 4.2 路由树构建：`router/utils/route.ts`
- **核心功能**：将原始路由数据转换为符合 `vue-router` 规范的路由树，适配复杂路由结构。
- **关键函数**：
  - `buildRoutes`：接收原始路由数组，处理并返回标准路由树，包含：
    - 解析路由组件（如 `resolveIFrameComponent` 处理 iframe 类型路由）；
    - 自动添加 404 路由（`*` 通配符，匹配未定义的路径）；
  - `transformToTwoLevelRouteTree`：将多级嵌套路由转换为两级结构（适配侧边栏菜单展示，避免菜单层级过深）。

## 5. 路由常量管理模块
- **核心文件**：`router/constant.ts`
- **功能**：该模块是路由系统的“字典”，集中管理所有路由相关的常量，避免硬编码，提升代码可维护性。
- **包含内容**：
  - 路由路径常量：如 `AppAuthPath = '/auth'`、`AppNotAllowedPath = '/not-allowed'`；
  - 路由名称常量：如 `AppAuthName = 'Auth'`、`AppNotAllowedName = 'NotAllowed'`；
