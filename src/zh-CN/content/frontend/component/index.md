# <WPageTitle></WPageTitle>

项目 <WFrontLink path="/src/components">`components`</WFrontLink> 目录按 **功能分层** 规划了 7 个子文件夹，覆盖从通用能力到业务专属的组件体系：

:::info
- **目录结构**：每个组件的文档独立编写，按分类存放在对应子目录（如 `./advanced/`、`./app/`、`./business/`）。
:::

## 1. <WFrontLink path="/src/components/Advanced">`Advanced`</WFrontLink>：通用高级组件
**定位**：封装复杂交互逻辑的 **可配置型组件**，通过 Prop 注入接口等参数，实现跨场景复用。

| 组件名                                  | 功能说明                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| [ApiSelect](./advanced/api-select.md)   | 待重构，接口驱动的下拉选择器，内置虚拟列表、懒加载、回显等逻辑（接口通过 Prop 传入）   |
| [CRUD](./advanced/crud.md)              | 一站式封装“增删改查”全流程（查询表单、数据表格、增编表单、列操作、导入导出等） |
| [RoleSelect](./advanced/role-select.md) | 待重构，基于 ApiSelect 二次封装的角色选择组件（直接传入角色列表接口，无额外逻辑）      |

## 2. <WFrontLink path="/src/components/App">`App`</WFrontLink>：应用级全局组件
**定位**：与 **应用全局状态/功能强绑定** 的组件，部分需配合后端接口实现核心能力（如权限、主题、国际化）。

| 组件名                                          | 功能说明                          |
| ----------------------------------------------- | --------------------------------- |
| [AppAuthorize](./app/app-authorize.md)          | 权限校验组件（控制页面/功能权限） |
| [AppDarkMode](./app/app-dark-mode.md)           | 暗黑模式切换组件                  |
| [AppFullScreen](./app/app-full-screen.md)       | 全局全屏模式控制                  |
| [AppLocalePicker](./app/app-locale-picker.md)   | 国际化语言选择组件                |
| [AppLock](./app/app-lock.md)                    | 应用锁屏组件（需接口同步状态）    |
| [AppNotAuthorized](./app/app-not-authorized.md) | 无权限提示组件                    |
| [AppSearch](./app/app-search.md)                | 全局搜索组件（依赖搜索接口）      |
| [AppSettings](./app/app-settings.md)            | 应用设置面板（主题、布局等配置）  |

## 3. <WFrontLink path="/src/components/Business">`Business`</WFrontLink>：业务强关联组件
**定位**：**与具体业务接口深度绑定** 的组件，脱离接口无法独立运行（如地区级联、头像上传、业务字典）。

| 组件名                                      | 功能说明                              |
| ------------------------------------------- | ------------------------------------- |
| [AreaCascader](./business/area-cascader.md) | 地区级联选择组件（依赖地区数据接口）  |
| [AvatarUpload](./business/avatar-upload.md) | 头像上传组件（依赖头像管理接口）      |
| [Cap](./business/cap.md)                    | 业务专属组件（需结合场景解释，暂略）  |
| [Dict](./business/dict.md)                  | 业务字典展示/编辑组件（依赖字典接口） |
| [DictLabel](./business/dict-label.md)       | 字典值转标签组件（关联 Dict 组件）    |
| [ForceQuit](./business/force-quit.md)       | 强制退出组件（依赖权限状态接口）      |
| [LangSelect](./business/lang-select.md)     | 语言选择组件（与国际化接口绑定）      |

## 4. <WFrontLink path="/src/components/Extra">`Extra`</WFrontLink>：通用辅助组件
**定位**：覆盖工具类、交互增强、格式处理等场景的 **通用辅助组件**，补充主流程外的多样化能力。

| 组件名                                                    | 功能说明                                                  |
| --------------------------------------------------------- | --------------------------------------------------------- |
| [AbsImage](./extra/abs-image.md)                          | 抽象image组件，支持通过blob、base64等多种方式获取图片资源 |
| [Arrow](./extra/arrow.md)                                 | 通用箭头组件                                              |
| [CapsLockTooltip](./extra/caps-lock-tooltip.md)           | 检测CapsLock状态并提示的工具组件                          |
| [Copy](./extra/copy.md)                                   | 一键复制组件                                              |
| [CountryCallingSelect](./extra/country-calling-select.md) | 国家区号选择组件                                          |
| [DemoCard](./extra/demo-card.md)                          | 演示用卡片组件                                            |
| [EmailInput](./extra/email-input.md)                      | 邮箱格式校验输入框                                        |
| [Eyedropper](./extra/eyedropper.md)                       | 取色器组件                                                |
| [Flipclock](./extra/flipclock.md)                         | 翻转时钟组件                                              |
| [Flipper](./extra/flipper.md)                             | 翻转切换组件                                              |
| [IconPicker](./extra/icon-picker.md)                      | 图标选择器                                                |
| [JSON](./extra/json.md)                                   | JSON可视化组件                                            |
| [LocaleSelect](./extra/locale-select.md)                  | 多语言词条选择组件                                        |
| [Message](./extra/message.md)                             | 轻量化的提示消息组件                                      |
| [Password](./extra/password.md)                           | 密码输入增强组件                                          |
| [PhoneNumberInput](./extra/phone-number-input.md)         | 手机号格式校验输入框，支持国际化                          |
| [QRCode](./extra/qr-code.md)                              | 二维码生成组件，基于naive-ui封装                          |
| [Scrollbar](./extra/scrollbar.md)                         | 滚动条组件，基于naive-ui封装                              |
| [TextScroll](./extra/text-scroll.md)                      | 文本滚动组件                                              |
| [Title](./extra/title.md)                                 | 标题增强组件                                              |
| [Transition](./extra/transition.md)                       | 过渡动画组件                                              |
| [TransitionSelect](./extra/transition-select.md)          | 动画选择器                                                |
| [VerifyCode](./extra/verify-code.md)                      | 验证码输入组件                                            |

## 5.  <WFrontLink path="/src/components/HOC">`HOC`</WFrontLink>：高阶组件（待补充）
**定位**：通过高阶函数封装 **业务逻辑或交互模式** 的复用型组件（如权限包裹、异步加载、状态增强等）

| 组件名    | 功能说明                                       |
| --------- | ---------------------------------------------- |
| WithValue | v-model:value的拦截，支持自定义value的格式转换 |

## 6. <WFrontLink path="/src/components/UI">`UI`</WFrontLink>：原子化基础组件
**定位**：构成界面的 **原子化UI单元**，覆盖按钮、表单、弹窗等基础交互，提供统一视觉风格和交互规范，都是基于naive-ui原有组件上的二次封装。

| 组件名                                  | 功能说明     |
| --------------------------------------- | ------------ |
| [Button](./ui/button.md)                | 基础按钮组件 |
| [ButtonConfirm](./ui/button-confirm.md) | 确认按钮组件 |
| [ButtonGroup](./ui/button-group.md)     | 按钮组容器   |
| [ButtonRetry](./ui/button-retry.md)     | 重试按钮组件 |
| [Card](./ui/card.md)                    | 卡片组件     |
| [Checkbox](./ui/checkbox.md)            | 复选框组件   |
| [ColorPicker](./ui/color-picker.md)     | 颜色选择器   |
| [DatePicker](./ui/date-picker.md)       | 日期选择组件 |
| [Descriptions](./ui/descriptions.md)    | 描述列表组件 |
| [Drawer](./ui/drawer.md)                | 抽屉组件     |
| [Dropdown](./ui/dropdown.md)            | 下拉菜单组件 |
| [DynamicTags](./ui/dynamic-tags.md)     | 动态标签组件 |
| [Form](./ui/form.md)                    | 表单容器组件 |
| [Icon](./ui/icon.md)                    | 图标组件     |
| [IconButton](./ui/icon-button.md)       | 图标按钮组件 |
| [Input](./ui/input.md)                  | 文本输入框   |
| [InputNumber](./ui/input-number.md)     | 数字输入框   |
| [Modal](./ui/modal.md)                  | 模态弹窗组件 |
| [Radio](./ui/radio.md)                  | 单选框组件   |
| [Select](./ui/select.md)                | 选择器组件   |
| [Switch](./ui/switch.md)                | 开关组件     |
| [Table](./ui/table.md)                  | 表格组件     |
| [TimePicker](./ui/time-picker.md)       | 时间选择组件 |
| [Tree](./ui/tree.md)                    | 树形组件     |
| [TreeSelect](./ui/tree-select.md)       | 树形选择器   |

## 7. <WFrontLink path="/src/components/Vendor">`Vendor`</WFrontLink>：第三方依赖组件
**定位**：集成第三方库的 **封装型组件**，桥接外部依赖与项目技术体系，降低直连第三方 API 的复杂度。

| 组件名                                  | 功能说明                         |
|-----------------------------------------|----------------------------------|
| [CodeMirror](./vendor/code-mirror.md)   | CodeMirror 代码编辑器封装组件    |
| [Cropper](./vendor/cropper.md)         | Cropper 图片裁剪组件             |
| [ECharts](./vendor/echarts.md)         | ECharts 可视化图表组件           |
| [LocationPicker](./vendor/location-picker.md) | 地址选择组件（地图能力封装）   |
| [Mindmap](./vendor/mindmap.md)         | 思维导图组件     |
| [OSSUpload](./vendor/oss-upload.md)     | OSS 文件上传组件   |
| [SignPad](./vendor/sign-pad.md)         | 手写签名板组件                   |
| [Tinymce](./vendor/tinymce.md)         | Tinymce 富文本编辑器封装组件     |
