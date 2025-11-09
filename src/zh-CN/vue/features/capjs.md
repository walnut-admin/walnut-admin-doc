# capjs人机校验

cap.js [官网](https://capjs.js.org) [仓库](https://github.com/tiagozip/cap) 一款开源的，十分简单的人机校验方案，同时功能也比较完善。

本来也一直想做类似reCaptcha的人机校验功能，正好无意中刷到了这个项目，一看仓库作者也是很用心，而且是完全开源的，就决定尝试一下。

后端可以像我一样集成到项目中，也有一个standalone的版本。社区也有各种版本，java/go/python等等，都可以前去尝试。

:::info
项目默认是全局的cap token guard守卫的，如果有不重要的公共接口就做cap token free处理，也就是添加一个cap token free的guard。
:::

:::tabs
== 新用户流程

```mermaid
flowchart TD
    %% 样式定义
    classDef startEnd fill:#10b981,stroke:#059669,color:#fff
    classDef frontend fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef backend fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef success fill:#22c55e,stroke:#16a34a,color:#fff
    classDef error fill:#ef4444,stroke:#dc2626,color:#fff
    classDef process fill:#f3f4f6,stroke:#9ca3af,color:#111

    %% 流程开始
    Start(["新用户未登录"]):::startEnd --> LoginAPI["点击登录按钮"]:::frontend
    LoginAPI --> BackendAuth["调用/need接口，多维度获取是否需要cap token"]:::backend
    BackendAuth --> NeedCAP{"是否需要验证码验证？"}:::backend

    NeedCAP -->|是| TriggerCAP["检测到需验证码 → 唤起全局 CAP 组件"]:::frontend
    NeedCAP -->|否| LoginSuccess["继续登录逻辑"]:::success

    TriggerCAP --> UserSolve["用户点击完成验证"]:::frontend
    UserSolve --> RedeemAPI["widget内部连续调用/challenge、/redeem"]:::frontend
    RedeemAPI --> ContinueLogin["后端验证成功 → cookie中设置 cap token"]:::backend
    ContinueLogin --> LoginSuccess

    LoginSuccess --> Finish(["后续请求都会携带cap token的cookie做验证"]):::success

    %% 样式分配
    class Start,Finish startEnd
    class LoginAPI,TriggerCAP,UserSolve,RedeemAPI,ContinueLogin frontend
    class BackendAuth,NeedCAP,ReturnFlag,SetCookie backend
    class LoginSuccess success
```

== 老用户流程
```mermaid
flowchart TD
    %% 样式定义
    classDef startEnd fill:#10b981,stroke:#059669,color:#fff
    classDef frontend fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef backend fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef warning fill:#f59e0b,stroke:#d97706,color:#fff
    classDef success fill:#22c55e,stroke:#16a34a,color:#fff
    classDef error fill:#ef4444,stroke:#dc2626,color:#fff
    classDef process fill:#f3f4f6,stroke:#9ca3af,color:#111

    %% 起点
    Start(["老用户访问"]):::startEnd -->  SendAPI["发送请求到后端"]:::frontend
    SendAPI --> Guard["后端 Guard 校验 token"]:::backend
    Guard --> TokenValid{"token 是否有效？"}:::backend

    TokenValid -->|有效| Return200["返回 200 响应"]:::success
    TokenValid -->|无效| ThrowBotFail["抛出 BotValidateFailed 异常 40011"]:::error

    ThrowBotFail --> ReceiveFail["前端axios拦截器走到40011代码块中"]:::frontend
    ReceiveFail --> RefreshToken["触发 refreshCapJSToken() 流程"]:::warning
    RefreshToken --> ReloadCAP["无感无组件刷新，直接调用cap.solve，调用后台接口"]:::warning
    ReloadCAP --> GetNewToken["后台生成新cap token并写入cookie"]:::frontend
    GetNewToken --> RetryRequest["拦截器中 重试原请求"]:::frontend
    RetryRequest --> SendAPI
    Return200 --> Success["响应成功处理"]:::success
    Success --> Finish(["操作完成"]):::success

    %% 样式分配
    class Start,Finish startEnd
    class AxiosInterceptor,SendAPI,ReceiveFail,RefreshToken,ReloadCAP,GetNewToken,RetryRequest frontend
    class Guard,TokenValid,ThrowBotFail backend
    class RefreshToken,ReloadCAP warning
```
:::
