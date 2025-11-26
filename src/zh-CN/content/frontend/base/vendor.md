# <WPageTitle></WPageTitle>

## 一、插件分类概述
项目中的第三方插件分为两类：
1. **UI组件类**：位于<WFrontLink path="/src/components/Vendor">`components/Vendor`</WFrontLink>目录下，带有UI界面，可能需要配合表单录入或实现特殊功能。详情查看[组件章节](../components/vendor.md)。

2. **功能性辅助类**：通过编程方式调用，提供各种功能性支持。

## 二、非<WFrontLink path="/src/components/Vendor">`components/Vendor`</WFrontLink>目录下的第三方插件

### 1. [crypto-js]
- **功能**：实现数据的加密和解密，包括请求数据加密、响应数据解密、storage数据加密等。

### 2. [highlight.js]
- **功能**：为Naive UI的`n-code`组件提供代码高亮显示功能。

### 3. [driver.js]
- **功能**：轻量级引导插件，帮助新用户快速了解系统功能。
- **详情**：可查看"有趣的功能"中纯前端部分的单独篇章。

### 4. [html-to-image]
- **功能**：将HTML页面转换为图片。
- **项目应用**：在layout的tabs中，右键选项卡有"快照"功能，可对当前页面内容进行图片输出。

### 5. [libphonenumber-js]
- **功能**：处理手机号相关逻辑。
- **关联组件**：与`PhoneNumberInput`组件深度绑定。
- **详情**：可查看components章节。

### 6. [mind-elixir]
- **功能**：思维导图组件，支持动态编辑、导入、导出等功能。
- **特点**：文档全面，功能满足绝大多数需求。

### 7. [sortablejs]
- **功能**：提供拖拽功能，适用于需要拖拽的场景。

### 8. [ua-parser-js]
- **功能**：解析User Agent字符串。
- **项目状态**：暂未使用。原计划用于指纹追踪逻辑，后期改造后不再需要，但依赖仍保留在项目中。

## 三、项目后续插件集成计划

### 1. 文档处理类
- PDF插件
- Word插件
- Excel插件

### 2. 工具类
- [print-js]：打印插件
- [vditor]：Markdown编辑器
- [FullCalendar]：强大的日历组件

### 3. 特殊功能类
- [rrweb]：记录和重放用户操作流程
  - **应用场景**：主要用于银行或金融业务中，满足国家要求的用户操作流程追踪需求。
  - **个人兴趣**：因作者有保险投保业务经验，曾在手机端接入腾讯SDK，对该功能感兴趣，故计划集成到项目中。

[crypto-js]: https://github.com/brix/crypto-js
[highlight.js]: https://github.com/highlightjs/highlight.js
[driver.js]: https://github.com/kamranahmedse/driver.js
[html-to-image]: https://github.com/bubkoo/html-to-image
[libphonenumber-js]: https://github.com/catamphetamine/libphonenumber-js
[mind-elixir]: https://github.com/SSShooter/mind-elixir-core
[sortablejs]: https://github.com/SortableJS/Sortable
[ua-parser-js]: https://github.com/faisalman/ua-parser-js
[print-js]: https://github.com/crabbly/Print.js
[vditor]: https://github.com/Vanessa219/vditor
[FullCalendar]: https://github.com/fullcalendar/fullcalendar
[rrweb]: https://github.com/rrweb-io/rrweb
