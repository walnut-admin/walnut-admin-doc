# <WPageTitle></WPageTitle>

## 一、插件概述
项目基于<WBaseLink preset="vite">Vite</WBaseLink>生态，使用了近20种插件以实现功能开发、性能优化及开发体验提升。插件配置入口位于项目根目录下的 <WFrontLink path="/build/vite/plugin/index.ts">`build/vite/plugin/index.ts`</WFrontLink>。

## 二、基础插件
为开发/生产环境必备插件，确保项目基础运行及核心功能实现：

### 1. 核心基础插件
- **[vite-vue] 插件**：使<WBaseLink preset="vue">Vue</WBaseLink>与<WBaseLink preset="vite">Vite</WBaseLink>更好配合，配置中包含 `isCustomElement` 选项，用于指定 `cropper-` 前缀标签及 `cap-widget` 为[Web component]，避免Vue对Web组件的判断失误（防止控制台警告）。
- **[vuejsx] 插件**：支持在项目中书写JSX和TSX，类似[React]的开发方式。
- **[vite-plugin-validate-env]**：用于环境变量验证，确保环境变量配置正确。

### 2. 自动引入插件
实现方法/函数、组件（组件库组件及自定义组件）的自动引入：
- 涉及插件：[unplugin-auto-import]（自动引入方法/函数）、[unplugin-vue-components]（自动引入组件）。
- 配置细节：具体自动引入的文件夹、包及规则，可查看 `auto-import.ts` 和 `component.ts` 两个文件。

### 3. 样式相关插件
- **<WBaseLink preset="unocss">UnoCSS</WBaseLink> 插件**：
  - 插件本身无配置，配置文件位于项目根目录 `uno.config.ts`。
  - 使用预设：[windi CSS3]（暂未升级到 `preset-wind4`，因配置有变化，待后续调整）。
  - <WBaseLink preset="unocss">UnoCSS</WBaseLink> 已支持 `preset-wind4`，但项目暂未升级。

### 4. 代码检查插件
- **[vite-plugin-checker]**：
  - 功能：校验TypeScript、ESLint，支持Vue TSC检查，配置简单，具体可参考官方文档。

### 5. 安全相关插件
- **[vite-plugin-csp-guard]**（[CSP] 插件）：
  - 作用：增强应用安全性，加固内容安全策略。
  - 现状：暂被注释（因开发环境下存在热加载问题，待问题解决后可启用）。

## 三、开发插件
开发插件多含环境判断，无需手动配置环境加载，打包时会被忽略，具体如下：

1. **[vite-plugin-devtools-json]**：
   - 功能：生成Chrome dev tools的JSON文件，对特殊开发环境配置有帮助。

2. **[vuejs/devtools]（官方dev tools插件）**：
   - 功能：开发环境下项目底部显示小图标，点开后提供完整功能面板，为现代开发必备工具，无需多余配置。

3. **[unplugin-turbo-console]**：
   - 功能：追踪并定位console，控制台打印内容可通过链接直接打开VSCode并定位到对应文件行；支持 `// turbo-console-disable-next-line` 注释，使下一行console不显示链接和样式。
   - 特点：配置丰富，详情可参考官网。

4. **[vite-plugin-restart]（antfu大佬插件）**：
   - 功能：监听不在项目框架/依赖中的文件，变动时自动重启开发服务器。

5. **[vite-plugin-mkcert]（HTTPS插件）**：
   - 功能：支持开发环境下需要HTTPS的浏览器API。
   - 配置：开启/关闭通过 `.env.development` 中的 `VITE_DEV_HTTPS` 控制（设为false即关闭）。

## 四、生产插件
生产环境插件功能复杂多变，相对复杂且不稳定，具体如下：

> 说明：下述第3-7个插件均支持通过环境变量配置是否启用。

1. **[vite-plugin-image-optimizer]（静态资源压缩插件）**：
   - 功能：打包时动态压缩jpg、png、SVG等图片。
   - 配置：丰富且复杂，具体细节需参考官方文档。

2. **[@vitejs/plugin-legacy]（官方legacy插件）**：
   - 功能：实现旧版浏览器兼容，解决现代浏览器API/JS API在旧版浏览器的适配问题。
   - 配置：默认支持最新10个活跃浏览器版本，具体兼容范围及功能需参考官方文档。

3. **[vite-plugin-cdn]（CDN插件）**：
   - 功能：可将指定依赖在打包时转为CDN形式引入。
   - 现状：项目中暂未使用，因与其他插件配合时功能实现不佳；建议若需使用CDN，可通过<WBaseLink preset="vueuse">VueUse</WBaseLink>的`useScriptTag`函数实现CDN懒加载。

4. **[vite-plugin-compression]（压缩插件）**：
   - 功能：将打包后的构建产物压缩为zip或brotli格式，提升静态资源访问速度。
   - 使用场景：
     - 预生产/测试环境：可打包为zip，配合nginx的gzip压缩加快加载。
     - 生产环境：需通过HTTPS实现brotli压缩加载，且nginx需加载brotli压缩模块。

5. **[vite-plugin-bundle-obfuscator]（代码混淆插件）**：
   - 功能：对代码进行混淆，项目默认配置为`low-obfuscation`（低程度混淆）。
   - 注意：使用medium或high等级混淆可能导致打包错误，低等级混淆已满足演示需求；若需高安全级别混淆，需自行深入配置。

6. **[vite-plugin-banner]（banner插件）**：
   - 功能：在打包后的JS文件中添加自定义格式的头部（banner）。

7. **[vite-bundle-analyzer]（构建产物可视化插件）**：
   - 功能：构建完成后生成可视化的包体积预览，帮助分析并调整构建产物体积、优化代码分割。

## 五、补充说明：PWA 插件

项目中还包含[vite-plugin-pwa]，目前处于注释状态，具体说明如下：

### 功能目标
该插件主要用于实现PWA（渐进式Web应用）相关能力，核心目标是在用户网络断开时仍能加载部分资源，提供基础离线体验。类似[YouTube]的离线表现：断网状态下刷新页面，仍能打开页面并显示头部、侧边栏等基础结构，同时提示网络断开。

### 实现原理
通过在后台挂载`service worker`，将项目运行所需的最小必要资源（如基础页面结构、离线状态提示组件等）由`service worker`管理。当用户断网时，`service worker`会接管请求，渲染预设的离线内容，保障基础访问体验。

### 当前状态及原因
- **开发环境**：已实现断网刷新页面时的离线功能（可打开页面并渲染离线状态图标及提示）。
- **生产环境**：暂被注释，因打包后与代码混淆等生产环境插件存在冲突，导致功能异常，待后续排查解决后可启用。

<!-- urls -->
[vite-vue]: https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue
[vuejsx]: https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue-jsx
[Web component]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[React]: https://react.dev/
[unplugin-auto-import]: https://github.com/antfu/unplugin-auto-import
[unplugin-vue-components]: https://github.com/antfu/unplugin-vue-components
[windi CSS3]: https://windicss.org/
[vite-plugin-checker]: https://github.com/fi3ework/vite-plugin-checker
[CSP]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[vite-plugin-csp-guard]: https://github.com/tsotimus/vite-plugin-csp-guard
[vite-plugin-validate-env]: https://github.com/Julien-R44/vite-plugin-validate-env
[vite-plugin-devtools-json]: https://github.com/ChromeDevTools/vite-plugin-devtools-json
[vuejs/devtools]: https://github.com/vuejs/devtools
[unplugin-turbo-console]: https://github.com/unplugin/unplugin-turbo-console
[vite-plugin-restart]: https://github.com/antfu/vite-plugin-restart
[vite-plugin-mkcert]: https://github.com/liuweiGL/vite-plugin-mkcert
[@vitejs/plugin-legacy]: https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
[vite-plugin-image-optimizer]: https://github.com/FatehAK/vite-plugin-image-optimizer
[vite-plugin-cdn]: https://github.com/nonzzz/vite-plugin-cdn
[vite-plugin-compression]: https://github.com/nonzzz/vite-plugin-compression
[vite-plugin-bundle-obfuscator]: https://github.com/z0ffy/vite-plugin-bundle-obfuscator
[vite-plugin-banner]: https://github.com/chengpeiquan/vite-plugin-banner
[vite-bundle-analyzer]: https://github.com/nonzzz/vite-bundle-analyzer
[vite-plugin-pwa]: https://github.com/vite-pwa/vite-plugin-pwa
[YouTube]: https://www.youtube.com/
[PWA]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[service worker]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
