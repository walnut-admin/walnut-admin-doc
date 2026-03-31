# <WPageTitle></WPageTitle>

cap.js [官网](https://capjs.js.org) [仓库](https://github.com/tiagozip/cap) 一款开源的，十分简单的人机校验方案，同时功能也比较完善。

本来也一直想做类似reCaptcha的人机校验功能，正好无意中刷到了这个项目，一看仓库作者也是很用心，而且是完全开源的，就决定尝试一下。

后端可以像我一样集成到项目中，也有一个standalone的版本。社区也有各种版本，java/go/python等等，都可以前去尝试。

:::warning
项目默认是全局的cap token guard守卫的，如果有不重要的公共接口就做cap token free处理，也就是添加一个cap token free的guard。
:::

:::tabs
== Guard流程
```mermaid
sequenceDiagram
    participant Client as 客户端<br/>(浏览器)
    participant Guard as CAP Guard<br/>(WalnutAdminGuardCap)
    participant Cache as Redis缓存
    participant Lock as MurLock<br/>(分布式锁)
    participant CapAPI as CapJS API<br/>(第三方)
    participant Challenge as Challenge<br/>State Service

    Note over Client,Challenge: 每个请求都会执行 CAP Guard

    Client->>Guard: HTTP 请求<br/>(携带 capToken Cookie)
    activate Guard

    Note over Guard: Step 1: 检查是否跳过
    Guard->>Guard: 检查 @WalnutAdminGuardCapFree()<br/>或 Postman 请求

    alt 需要跳过验证
        Guard-->>Client: 跳过验证,直接通过
    end

    Note over Guard: Step 2: 读取风险决策
    Guard->>Guard: 读取 request.risk.comprehensive<br/>.recommendation

    alt 无风险评估数据
        Guard-->>Client: 警告并允许通过
    end

    Note over Guard: Step 3: CAP Token 硬校验
    Guard->>Guard: 获取 Cookie 中的 capToken

    alt Token 缺失
        alt shouldChallenge = true
            Guard-->>Client: 40116 Interaction Required<br/>(需要明确交互)
        else shouldChallenge = false
            Guard-->>Client: 40117 Refresh Required<br/>(无感刷新)
        end
    end

    Note over Guard,Cache: Token 存在,验证有效性
    Guard->>Cache: getCapTokenCache(deviceId)

    alt 缓存命中
        Cache-->>Guard: 返回缓存结果 (true/false)
        Guard->>Guard: 快速路径验证通过
    else 缓存未命中
        Guard->>Lock: 请求分布式锁<br/>Key: CAP:{deviceId}
        Lock-->>Guard: 获取锁成功 (3s 超时)

        Note over Guard: Double-Check 模式
        Guard->>Cache: 再次检查缓存<br/>(防止并发重复验证)

        alt Double-Check 缓存命中
            Cache-->>Guard: 返回缓存结果
        else 缓存仍未命中
            Guard->>CapAPI: AppCapJS.validateToken(capToken)
            activate CapAPI
            CapAPI-->>Guard: { success: true/false }
            deactivate CapAPI

            alt 验证失败
                Guard-->>Client: 40111 You Are Bot<br/>(判定为机器人)
            else 验证成功
                Guard->>Cache: setCapTokenCache(deviceId)<br/>(缓存验证结果)
                Cache-->>Guard: 缓存成功
            end
        end

        Guard->>Lock: 释放分布式锁
    end

    Note over Guard: Step 4: 标记 Critical Factors
    Guard->>Challenge: markChallengeHandled()<br/>批量标记所有 criticalFactors
    activate Challenge
    Challenge->>Challenge: 根据 userId 自动区分<br/>Pre Auth / Post Auth 因子
    Challenge-->>Guard: 标记成功
    deactivate Challenge

    Guard-->>Client: 验证通过,继续执行业务逻辑
    deactivate Guard

    Note over Client: 请求进入 Controller 层
```

== 交互完整流程
```mermaid
sequenceDiagram
    participant User as 用户
    participant Client as 前端<br/>(Vue/Axios)
    participant Interceptor as Axios<br/>拦截器
    participant Queue as Singleton<br/>Promise Queue
    participant Store as Pinia Store<br/>(CapJS)
    participant Widget as Cap Widget<br/>(Web Component)
    participant Server as 后端服务器
    participant CapAPI as CapJS API

    Note over User,CapAPI: 场景 1: 交互式验证 (40116 错误)

    User->>Client: 发起请求 (登录/敏感操作)
    Client->>Server: HTTP 请求
    activate Server
    Server->>Server: CAP Guard 验证<br/>Token 缺失/无效
    Server-->>Client: 40116 Interaction Required
    deactivate Server

    Client->>Interceptor: 拦截 40116 错误
    activate Interceptor
    Interceptor->>Queue: SingletonPromiseCapJSInteraction()
    activate Queue

    Note over Queue: 防止并发多次弹窗
    Queue->>Store: compStoreCapJS.onOpenCapModal()
    activate Store

    Store->>Store: loadCap()<br/>加载 Cap Widget 脚本
    Store->>Store: show = true<br/>显示模态框
    Store-->>Widget: 渲染 <cap-widget>
    deactivate Store

    Widget->>Server: POST /security/cap/challenge
    activate Server
    Server->>Server: SecurityCapService.challenge()
    Server->>CapAPI: AppCapJS.createChallenge({<br/>  count, size, difficulty, ttl })
    CapAPI-->>Server: 返回挑战数据
    Server-->>Widget: 返回挑战
    deactivate Server

    Widget-->>User: 展示验证挑战<br/>(图形/拼图等)

    User->>Widget: 完成挑战
    Widget->>Widget: 本地验证解决方案

    Widget->>Server: POST /security/cap/redeem<br/>{ solution }
    activate Server
    Server->>Server: SecurityCapService.redeem()
    Server->>CapAPI: AppCapJS.redeemChallenge(solution)
    CapAPI-->>Server: { token, success }
    Server->>Server: 设置 capToken 到 Cookie<br/>(maxAge: ttl)
    Server-->>Widget: { token }
    deactivate Server

    Widget->>Store: @solve 事件触发<br/>onCapSolve({ detail: { token } })
    activate Store
    Store->>Store: onSuccess(token) 回调
    Store->>Store: show = false<br/>关闭模态框
    Store-->>Queue: 返回 token
    deactivate Store

    Queue-->>Interceptor: Promise resolve
    deactivate Queue

    Interceptor->>Client: 重新发起原始请求<br/>AppAxios.request(res.config)
    deactivate Interceptor

    Client->>Server: 重试请求 (携带新 capToken)
    Server->>Server: CAP Guard 验证通过
    Server-->>Client: 返回业务数据
    Client-->>User: 显示结果

    Note over User,CapAPI: 场景 2: 无感刷新 (40117 错误)

    User->>Client: 发起请求
    Client->>Server: HTTP 请求
    Server-->>Client: 40117 Refresh Required<br/>(Token 过期)

    Client->>Interceptor: 拦截 40117 错误
    Interceptor->>Queue: SingletonPromiseCapJSRefresh()
    activate Queue

    Queue->>Store: compStoreCapJS.refreshCapJSToken()
    activate Store
    Store->>Store: 后台创建隐藏 Cap 实例
    Store->>Widget: cap.solve()<br/>(自动解决,无 UI)
    deactivate Store

    Widget->>Server: 自动完成 challenge + redeem
    Server-->>Widget: 返回新 token

    Widget-->>Queue: 返回 token
    deactivate Queue

    Interceptor->>Client: 自动重试请求
    Client->>Server: 重试 (携带新 token)
    Server-->>Client: 返回数据
    Client-->>User: 无感完成,用户无感知
```
