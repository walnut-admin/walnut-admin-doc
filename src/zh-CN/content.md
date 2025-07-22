# <WPageTitle></WPageTitle>

## 前端

[看这里吧](./vue/introduction.md)

## 后端
:::info
其实我下面写的很细了，就是有些细节没展开讲，对于懂行的即使没有代码，脑子里也应该有一个架构轮廓了。
下面的内容我在想要不要仔细展开讲讲，那就真的是设计细节都暴露了（虽然也没啥特别高级的吧）
:::

- 技术栈 `tech stack`
    - <WBaseLink preset="nestjs">NestJS 11.x</WBaseLink> + <WBaseLink preset="swc">swc</WBaseLink> 构建，比tsc快10倍的开发体验！
    - <WBaseLink preset="express">express</WBaseLink> 基于express的app应用，原有概念完全继承，方便上手！
    - <WBaseLink preset="mongoose">mongoose</WBaseLink> mongodb + mongoose，动态灵活的数据库支持，同时支持事务回滚！
    - <WBaseLink preset="nestjs-i18n">nestjs-i18n</WBaseLink> 接口返回信息也可以做国际化处理！
    - <WBaseLink preset="nestjs-jwt">@nestjs/jwt</WBaseLink> 基于jwt和<WBaseLink preset="passport">passport</WBaseLink>的完整的认证流程，支持email/phone认证、oauth认证等等！
    - <WBaseLink preset="nestjs-config">@nestjs/config</WBaseLink> 完备的env config管理，支持加载时的校验！
    - <WBaseLink preset="nestjs-bull">@nestjs/bull</WBaseLink> 基于bull的队列管理模块，用于处理非阻塞的异步任务类似于发短信发邮件等等！
    - <WBaseLink preset="nestjs-cache">@nestjs/cache</WBaseLink> 基于cache-manager/<WBaseLink preset="redis">redis</WBaseLink>/<WBaseLink preset="keyv">keyv</WBaseLink>的缓存模块，包含controller层直接缓存和手动缓存等等！
    - <WBaseLink preset="nestjs-axios">@nestjs/axios</WBaseLink> 基于axios的http模块，方便后台请求第三方接口！
    - <WBaseLink preset="nestjs-socket">@nestjs/socket</WBaseLink> websocket模块，后台可主动与前端沟通！
    - <WBaseLink preset="nestjs-sse">sse</WBaseLink> sse模块，更轻量化现代化的socket替代方案！
    - <WBaseLink preset="nestjs-swagger">@nestjs/swagger</WBaseLink> swagger模块，基于schema的接口文档的生成！
    - <WBaseLink preset="nestjs-throttler">@nestjs/throttler</WBaseLink> 限流模块，防止关键接口被刷！
    - <WBaseLink preset="class-transformer">class-transformer</WBaseLink>和<WBaseLink preset="class-validator">class-validator</WBaseLink>，类的序列化和校验的核心！
    - <WBaseLink preset="nestjs-task">@nestjs/schedule</WBaseLink> 任务调度模块，支持定时任务和周期任务
    - <WBaseLink preset="nestjs-event">@nestjs/event-emitter</WBaseLink> 事件模块，支持发布订阅模式的事件处理
    - 基于`winton`的日志记录和轮转，后续前端考虑做一个查看日志的地方
    - 腾讯的短信发送接入，ali的sts接入，简单的邮件发送，基于网易的smtp服务
    - `bcryptjs`和`cryptojs`接入，敏感数据/请求返回数据加密解密
    - `dayjs`和`lodash`接入，方便时间操作和常用工具函数使用
    - `murlock`事务锁接入（还需深入研究）

- 模块 `modules`
    - `角色/用户/菜单(权限)`，用户可拥有多角色，角色可拥有多权限，用户在多角色的情况下支持角色切换或者角色权限合并
    - `access token/refresh token的双token模式`，同时有refresh token的管理模块（页面功能暂未开发）
    - `删除模块`，删除时将被删除的内容直接存到该表中，实现删除缓存，后续可实现回收站功能或者5分钟内撤销删除操作的功能
    - `设备模块`，记录用户的设备信息，后续可实现设备管理功能，例如风险设备禁用，个人常用设备管理等模块
    - `字典模块`，包括字典类型和字段数据，缓存支持和i18n的支持
    - `国际化模块`，包括语言模块和词条模块，可动态添加语言，同时词条也可按照语言动态新增编辑
    - `日志模块`，包括登录/操作日志，对关键操作进行记录
    - `用户关联模块`，目前包括两张表，用户设备和用户oauth，后续计划添加用户偏好等等模块
    - `认证模块`，包括账号密码/邮箱验证码/短信验证码/oauth第三方认证登录
    - `示例模块`，crud增删改查的一个示例模块，同时也是一些新功能测试的模块
    - `错误模块`，对于一些关键错误进行入库处理，后续同时会考虑接入sentry
    - `监控模块`，包含用户监控、缓存监控、服务器监控，后续会添加数据库监控，socket监控等等
    - `配置模块`，全局应用级别的配置项目，默认有缓存支持
    - `基于capjs的人机校验模块`，全局的cap token验证guard，防止接口被脚本或机器人刷
    - `ali sts模块`，配合前端ali oss直传，后续计划添加file表做映射关联和管理
    - `area国内五级区域级联模块`，配合前端组件实现。支持单边树回显和缓存支持
    - `mail模块`，配合bull实现邮件发送，后续计划添加模板模块，实现动态的email模板
    - `sms模块`，同样配合bull实现短信验证码发送，但线上demo功能暂时隐藏，现在国内个人资质没办法申请短信模板
    - `健康模块`，检查网络/数据库/内存/磁盘等健康程度

- 中间件 `middleware`
    - `compression` 压缩
    - `cookie` signedCookie及加密cookie
    - `cors` 跨域配置
    - `csp` 内容安全策略
    - `csurf` csrf防护
    - `fingerprint` 指纹挂载到req上
    - `helmet` helmet模块，设置一些http头，防止xss攻击
    - `id` 请求唯一id
    - `ip` ip地址，同时包含拦截
    - `language` 当前语言挂载到req上
    - `logger` 日志打印
    - `responseTime` 响应时间
    - `session` 会话
    - `timestamp` 时间戳
    - `timezone` 时区
    - `useragent` UA挂载到req上，同时包含拦截
    - `version` 版本号挂载到req上
    - `xss` xss防护

- 拦截器 `interceptors`
    - `request解密拦截器`，将加密参数解密挂载到req上，`controller`层可直接获取
    - `登录日志拦截器`，登录的`controller`层需要添加该拦截器
    - `操作日志拦截器`，关键操作的`controller`上需要添加该拦截器
    - `response加密拦截器`，将service层返回的内容加密，返回给前端
    - `loose返回拦截器`，不使用全局的返回格式，service返回什么就返回什么
    - `success拦截器`，app级别的成功返回封装
    - `transaction拦截器`，`controller`事务拦截器，service抛出错误可事务回滚，但需要注意一点，暂时不能在service层获取事务中修改或新增的内容，需要在事务成功之后配合event-emitter再执行相应逻辑

- 国际化 `i18n`
    - 目前只有英文和中文，包括了基础返回信息和业务返回信息，同时也支持i18n的传参
    - 支持在请求头或url的query中传参实现i18n的功能

- 守卫 `guard`
    - `capjstoken 守卫`，app级别guard，默认所有接口都需要cap token才能访问，如果不需要可以在`controller`层添加装饰器 `@WalnutAdminGuardCapJSTokenFree()`
    - `device守卫`，app级别guard，默认所有接口都需要系统中已经存在的设备id才能访问，如果不需要可以在`controller`层添加装饰器 `@WalnutAdminGuardDeviceFree()`
    - `functional守卫`，接口功能守卫，对一些关键性的接口进行全局配置介入，像暂时停止该接口的所有访问就是这个守卫实现的
    - `permission守卫`，权限守卫，需要权限的接口需要添加装饰器 `@WalnutAdminDecoratorHasPermission()`
    - `role守卫`，角色守卫，需要角色的接口需要添加装饰器 `@WalnutAdminDecoratorHasRole()`

- 装饰器 `decorator`，内容较多，大体有下面几类
    - crud装饰器，对于常规的增删改查的`controller`层的装饰器的封装
    - field装饰器，对于`mongoose schema`的字段装饰器封装，包含了transform和validate以及swagger等
    - mongo装饰器，`transaction拦截器`的装饰器封装
    - param装饰器，对`nestjs param`装饰器的封装
    - swagger装饰器，对`nestjs swagger`装饰器的封装
    - transformer装饰器，包含了一系列基于`class-transformer`的封装
    - validator装饰器，包含了一系列基于`class-validator`的封装
    - walnut装饰器，包含了一系列自定义的装饰器，有一大部分是基于拦截器做的封装

- 异常 `exception`
    - 自定义异常filter，继承自`nestjs`的异常类，同时支持i18n，统一错误返回格式
    - 不同业务的错误返回码，支持前端做不同逻辑的处理
    - 错误数据的入库，对于一些敏感错误信息需要做完成的记录
    - 后续sentry的介入也应该是在这里

- 还有一些内容就是const常量、database链接、common的一些封装、env config配置和校验及转化
