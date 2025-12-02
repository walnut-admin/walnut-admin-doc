# web-vitals & google-analytics

- 简单来说就是通过vite插件的`transformIndexHtml`方法动态插入`script`代码块，让<WBaseLink preset="gtag-js">gtag.js</WBaseLink>最先加载，这样window对象上就有需要的`dataLayer`了
- 然后就是项目入口处引用`setupGoogleAnalytics`，还是通过动态加载script标签的方式（这回是vueuse的useScriptTag）加载<WBaseLink preset="web-vitals">web-vitals</WBaseLink>，然后就是上报指标了

:::tabs
== 插件
```mermaid
graph LR
A[Vite启动构建] --> B[执行createGoogleAnalyticsPlugin插件]
B --> C{是否配置GA_ID?}
C -->|否| D[跳过脚本注入]
C -->|是| E[在index.html的</head>前插入GA初始化脚本]
E --> F[生成包含GA基础脚本的index.html]
```

== 运行
```mermaid
graph LR
A[页面加载index.html] --> B[执行GA初始化脚本]
B --> C[加载gtag.js并初始化window.gtag]
C --> D[执行setupGoogleAnalytics函数]
D --> E{是否存在VITE_GA_ID?}
E -->|否| F[终止流程]
E -->|是| G[动态加载web-vitals脚本]
G --> H[注册Web Vitals监听（CLS/INP/LCP）]
H --> I[指标触发时调用sendToGoogleAnalytics]
I --> J[通过gtag上报事件到GA]
```
:::
