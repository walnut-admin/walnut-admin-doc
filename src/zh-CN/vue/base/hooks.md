# <WPageTitle></WPageTitle>

## `hooks/component` 目录

### <WFrontLink path="/src/hooks/component/useMessage.ts">`useMessage.ts`</WFrontLink>
- **功能**：封装消息提示函数，支持成功、信息、警告、错误等类型，可配置显示时长、是否可关闭、显示位置等。
- **使用场景**：用户操作后反馈结果，如表单提交成功、数据获取失败等。

### <WFrontLink path="/src/hooks/component/useCountdown.ts">`useCountdown.ts`</WFrontLink>
- **功能**：提供倒计时功能，支持持久化存储倒计时状态。
- **使用场景**：验证码倒计时、活动倒计时等需要倒计时的场景。

### <WFrontLink path="/src/hooks/component/useNoti.ts">`useNoti.ts`</WFrontLink>
- **功能**：封装通知提示函数，支持多种类型，可配置显示时长、是否可关闭、显示位置等。
- **使用场景**：发送重要通知，如系统消息、提醒等。

### <WFrontLink path="/src/hooks/component/useDriver.ts">`useDriver.ts`</WFrontLink>
- **功能**：提供应用引导功能，支持多步骤引导，可配置步骤内容和样式。
- **使用场景**：新用户首次使用时，引导了解应用功能模块。

### <WFrontLink path="/src/hooks/component/useConfirm.ts">`useConfirm.ts`</WFrontLink>
- **功能**：提供确认对话框功能，用于询问用户是否继续操作。
- **使用场景**：删除数据、提交表单等需用户确认的操作场景。

## `hooks/core` 目录

### <WFrontLink path="/src/hooks/core/useProps.ts">`useProps.ts`</WFrontLink>
- **功能**：提供组件属性的设置和获取方法，支持属性合并与响应式更新。
- **使用场景**：组件开发中需动态更新属性时。

### <WFrontLink path="/src/hooks/core/useAppResize.ts">`useAppResize.ts`</WFrontLink>
- **功能**：根据窗口大小变化，自动调整应用设备类型和菜单折叠状态。
- **使用场景**：需根据设备类型（手机、平板等）调整应用布局时。

### <WFrontLink path="/src/hooks/core/useDict.ts">`useDict.ts`</WFrontLink>
- **功能**：提供字典数据的初始化、获取和使用，支持异步加载。
- **使用场景**：表单、表格、描述信息等需用字典数据展示或验证时。

### <WFrontLink path="/src/hooks/core/useAppContentFull.ts">`useAppContentFull.ts`</WFrontLink>
- **功能**：根据路由参数中 `full` 查询参数，切换应用布局。
- **使用场景**：需全屏显示某个页面内容时。

### <WFrontLink path="/src/hooks/core/useAppTextSelection.ts">`useAppTextSelection.ts`</WFrontLink>
- **功能**：监听文本选择事件，在控制台打印选中文本。
- **使用场景**：需监控或处理用户文本选择行为时。

### <WFrontLink path="/src/hooks/core/useLocalRefresh.ts">`useLocalRefresh.ts`</WFrontLink>
- **功能**：提供局部刷新功能，通过切换标志位实现页面局部刷新。
- **使用场景**：需局部刷新内容而不刷新整个页面时。

### <WFrontLink path="/src/hooks/core/useAppColorMode.ts">`useAppColorMode.ts`</WFrontLink>
- **功能**：监听应用设置中颜色模式变化，同步更新应用颜色模式。
- **使用场景**：需根据应用设置动态切换颜色模式时。

### <WFrontLink path="/src/hooks/core/useAppIntro.ts">`useAppIntro.ts`</WFrontLink>
- **功能**：提供应用引导功能，页面加载后一段时间显示引导步骤。
- **使用场景**：新用户首次使用时引导了解功能模块。

### <WFrontLink path="/src/hooks/core/useAppHijackF5.ts">`useAppHijackF5.ts`</WFrontLink>
- **功能**：拦截 F5 刷新事件，用局部刷新代替全页面刷新。
- **使用场景**：需避免全页面刷新，仅局部刷新时。

### <WFrontLink path="/src/hooks/core/useContext.ts">`useContext.ts`</WFrontLink>
- **功能**：提供上下文的设置和获取，方便组件树中共享数据。
- **使用场景**：不同组件间需共享数据（如全局配置、用户信息）时。

### <WFrontLink path="/src/hooks/core/useAppEnv.ts">`useAppEnv.ts`</WFrontLink>
- **功能**：提供应用环境配置信息，如加密设置、标题、代理等。
- **使用场景**：需根据应用环境配置执行不同操作（如不同环境用不同 API 地址）时。

### <WFrontLink path="/src/hooks/core/useAppTitle.ts">`useAppTitle.ts`</WFrontLink>
- **功能**：根据路由和文档可见性状态，动态更新文档标题。
- **使用场景**：需根据页面内容和状态动态更新标题时。

### <WFrontLink path="/src/hooks/core/useRedirect.ts">`useRedirect.ts`</WFrontLink>
- **功能**：实现路由重定向，将当前路由重定向到指定路径。
- **使用场景**：登录成功后重定向到主页等需页面跳转时。

### <WFrontLink path="/src/hooks/core/useAppReducedMotion.ts">`useAppReducedMotion.ts`</WFrontLink>
- **功能**：根据应用设置和系统偏好，控制应用动画效果。
- **使用场景**：需为用户提供流畅或简洁动画体验时。

## `hooks/vueuse` 目录

### <WFrontLink path="/src/hooks/vueuse/useBreakpoints.ts">`useBreakpoints.ts`</WFrontLink>
- **功能**：使用 Tailwind CSS 断点配置，提供响应式断点检测。
- **使用场景**：需根据屏幕尺寸执行不同逻辑（如显示不同组件）时。

### <WFrontLink path="/src/hooks/vueuse/useColorMode.ts">`useColorMode.ts`</WFrontLink>
- **功能**：创建共享颜色模式组合，支持深色/浅色模式切换。
- **使用场景**：需实现应用颜色模式切换功能时。

### <WFrontLink path="/src/hooks/vueuse/useDark.ts">`useDark.ts`</WFrontLink>
- **功能**：实现深色模式切换，支持动画过渡效果。
- **使用场景**：为应用添加深色模式切换功能时。

### <WFrontLink path="/src/hooks/vueuse/useDocumentVisibility.ts">`useDocumentVisibility.ts`</WFrontLink>
- **功能**：提供共享的文档可见性状态，判断文档是否可见。
- **使用场景**：需根据文档可见性执行不同逻辑（如不可见时暂停操作）时。

### <WFrontLink path="/src/hooks/vueuse/usePreferredReducedMotion.ts">`usePreferredReducedMotion.ts`</WFrontLink>
- **功能**：提供共享的系统偏好减少动画效果状态。
- **使用场景**：需根据用户系统偏好调整应用动画时。

### <WFrontLink path="/src/hooks/vueuse/useResize.ts">`useResize.ts`</WFrontLink>
- **功能**：监听窗口大小变化事件，执行指定回调，支持节流。
- **使用场景**：需根据窗口大小动态调整布局或执行操作时。

### <WFrontLink path="/src/hooks/vueuse/useBattery.ts">`useBattery.ts`</WFrontLink>
- **功能**：提供共享的电池状态监测功能。
- **使用场景**：需监测设备电池状态（如提示充电）时。

### <WFrontLink path="/src/hooks/vueuse/useNetwork.ts">`useNetwork.ts`</WFrontLink>
- **功能**：提供共享的网络状态监测功能。
- **使用场景**：需根据网络状态执行不同逻辑（如断网时提示）时。

### <WFrontLink path="/src/hooks/vueuse/useDraggableElement.ts">`useDraggableElement.ts`</WFrontLink>
- **功能**：使指定元素可拖动，支持设置初始位置和拖动回调。
- **使用场景**：需实现元素拖动（如拖动窗口、卡片）时。

### <WFrontLink path="/src/hooks/vueuse/usePageLeave.ts">`usePageLeave.ts`</WFrontLink>
- **功能**：提供共享的页面离开状态监测功能。
- **使用场景**：需在用户离开页面时执行操作（如保存数据）时。

### <WFrontLink path="/src/hooks/vueuse/useIdle.ts">`useIdle.ts`</WFrontLink>
- **功能**：提供共享的用户空闲状态监测功能。
- **使用场景**：需根据用户空闲状态执行逻辑（如长时间空闲自动注销）时。

### <WFrontLink path="/src/hooks/vueuse/useNavigatorLanguage.ts">`useNavigatorLanguage.ts`</WFrontLink>
- **功能**：提供共享的浏览器语言设置监测功能。
- **使用场景**：需根据用户浏览器语言提供多语言支持时。

### <WFrontLink path="/src/hooks/vueuse/useIntervalFnWithPercent.ts">`useIntervalFnWithPercent.ts`</WFrontLink>
- **功能**：创建可获取百分比的计时器，支持设置总时长和更新回调。
- **使用场景**：需实现带进度条的倒计时（如下载进度）时。

## `hooks/web` 目录

### <WFrontLink path="/src/hooks/web/useExternalGeoIP.ts">`useExternalGeoIP.ts`</WFrontLink>
- **功能**：获取用户地理位置信息，进行持久化存储。
- **使用场景**：需根据用户地理位置提供个性化服务（如显示当地天气）时。

### <WFrontLink path="/src/hooks/web/useWebVitals.ts">`useWebVitals.ts`</WFrontLink>
- **功能**：收集和报告网页性能指标（如 LCP、INP），发送到 Google Analytics。
- **使用场景**：需监控网页性能、优化用户体验时。

### <WFrontLink path="/src/hooks/web/useBlob.ts">`useBlob.ts`</WFrontLink>
- **功能**：提供创建和销毁 Blob URL 的功能，处理二进制数据。
- **使用场景**：文件下载、图片预览等需处理二进制数据时。

### <WFrontLink path="/src/hooks/web/useCleanLocalStroage.ts">`useCleanLocalStroage.ts`</WFrontLink>
- **功能**：清理本地存储中不符合版本要求的数据。
- **使用场景**：应用版本更新后，需清理旧版本本地存储数据时。

### <WFrontLink path="/src/hooks/web/useRouterParam.ts">`useRouterParam.ts`</WFrontLink>
- **功能**：提供路由参数的获取和设置，支持增强模式。
- **使用场景**：需获取或设置路由参数（如根据参数显示内容）时。

### <WFrontLink path="/src/hooks/web/useFingerprint.ts">`useFingerprint.ts`</WFrontLink>
- **功能**：生成用户设备指纹，持久化存储，初始化设备信息。
- **使用场景**：需识别用户设备进行绑定或安全验证时。

### <WFrontLink path="/src/hooks/web/useMonitor.ts">`useMonitor.ts`</WFrontLink>
- **功能**：监控用户路由变化、页面可见性和关闭事件，将数据发送到服务器。
- **使用场景**：需收集用户行为数据进行分析和统计时。

### <WFrontLink path="/src/hooks/web/useLinkTag.ts">`useLinkTag.ts`</WFrontLink>
- **功能**：动态管理文档中 `<link>` 标签，支持加载、卸载等操作。
- **使用场景**：需动态加载或卸载样式表（如切换主题）时。

### <WFrontLink path="/src/hooks/web/useRouterQuery.ts">`useRouterQuery.ts`</WFrontLink>
- **功能**：提供路由查询参数的获取和设置功能。
- **使用场景**：需获取或设置路由查询参数（如数据筛选、搜索）时。
