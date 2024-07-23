# 跨域

## 介绍

跨域资源共享（英语：Cross-origin resource sharing，缩写：CORS），用于让网页的受限资源能够被其他域名的页面访问的一种机制。

通过该机制，页面能够自由地使用不同源（英语：cross-origin）的图片、样式、脚本、iframes 以及视频。一些跨域的请求（特别是 Ajax）常常会被同源策略（英语：Same-origin policy）所禁止。跨源资源共享定义了一种方式，为的是浏览器和服务器之间能互相确认是否足够安全以至于能使用跨源请求（英语：cross-origin requests）。比起纯粹的同源请求，这将更为自由和功能性的（functionality），但比纯粹的跨源请求更为安全。

## 解决方法

在本项目中，有以下`五种方式`解决本地开发时的跨域问题。

- 1. 在入口文件`main.js`中设置 `app.enableCors()`。这个是使用的 nestjs 内置的 api 实现的跨域解决。

<img src="/images/cors1.png" alt="暴力解决跨域方式一" width="auto" height="100%">

- 2. 类似于 1，在入口文件`main.js`中`create`函数传递第二个参数，`cors: true`。这个也是使用的 nestjs 内置的 api 实现的跨域解决。

<img src="/images/cors2.png" alt="暴力解决跨域方式二" width="auto" height="100%">

- 3. 后台也嵌入了 express 的[cors](https://github.com/expressjs/cors)中间件，`allowOrigin`暴力设置为`*`可解决跨域问题。

<img src="/images/cors3.png" alt="暴力解决跨域方式三" width="auto" height="100%">

- 4. 类似于 3，只不过可以精准配置允许的地址。

<img src="/images/cors4.png" alt="暴力解决跨域方式四" width="auto" height="100%">

- 5. 这个是前端配置请求代理，同时也是本项目采用的方法，也是推荐的方法。

<img src="/images/cors5.png" alt="推荐解决跨域方式" width="auto" height="100%">
