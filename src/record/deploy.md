# 部署记录

:::info
篇章最后有完整的 nginx 配置文件
:::

:::info
此项目服务器是在腾讯买的，服务器系统装的是 ubuntu 20.04 LTS focal 版本，nginx 是 1.18.0（ubuntu） 版本。所以以下配置均是在此环境下的实现，其他环境可能会略有不同，如有出处请自行解决。
:::

## 服务器环境

- 查看 ubuntu 版本

```bash
lsb_release -a
```

### node

- 文章

看官方安装文档就行
[nodesource](https://github.com/nodesource/distributions)

- 检查版本

```bash
node -v
```

```bash
npm -v
```

### nignx

- 安装 [how-to-install-nginx-on-ubuntu-20-04][article4]

- 卸载

  - 保留配置文件

  ```bash
  sudo apt-get remove nginx nginx-common
  ```

  - 完全卸载

  ```bash
  sudo apt-get purge nginx nginx-common
  ```

## 数据库

- 安装 mongodb，具体看官方文档即可

  - [install-mongodb-on-ubuntu][doc1]

- 安装完，需要配置远程连接的信任 ip，这两篇文章介绍的很详细

  - [how-to-install-mongodb-on-ubuntu-20-04][article1]

  - [how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04][article2]

:::warning
mongo6.0 开始不再是直接 mongo 了，而是 mongosh
:::

::: tip
云服务器，mongo 的配置文件里的 bindip，要配的是内网 ip 不是外网 ip
:::

::: tip
同时如果要在本机连接数据库，需要在云服务器的安全组中打开 27017 的端口
:::

- 配置 mongodb 的用户密码

  - [how-to-secure-mongodb-on-ubuntu-20-04][article3]

  - [还是看官网的把](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/)

- 完整的配置 admin 用户格式

```js
db.createUser({
  user: 'myUserAdmin',
  pwd: passwordPrompt(), // or cleartext password
  roles: [
    { role: 'userAdminAnyDatabase', db: 'admin' },
    { role: 'readWriteAnyDatabase', db: 'admin' },
  ],
})
```

## redis

### 安装

[redis-ubuntu-22-04](https://www.howtoforge.com/redis-ubuntu-22-04/)

### 配置

```bash
nano /etc/redis/redis.conf
```

- 找到`bind`的那行，在最后面添加[***云服务器内网IP***]

- 使劲往下拉，找到`requirePass`那行，解开注释，添加redis的密码

- `rename-command` 安全起见可以把一些指令重命名，上面文章里也有写


## 第一阶段：预生产环境，纯ip+正反向代理

### 后台部署

- 在 `当前用户` 目录下建 `server` 文件夹，把**dist，env，package.json，lock文件**扔到 `server` 文件夹里，执行`pnpm i -P`，安装完成后执行`npm run start:test`检查是否能正常启动

- pm2

  - 安装
    ```bash
    sudo npm i pm2 -g
    ```

  - 用 pm2 跑 node 进程

    ```bash
    sudo pnpm run pm2:test
    ```

  - 保存 pm2 进程

    ```bash
    sudo pm2 save
    ```

  - 开机自启 pm2 进程

    ```bash
    sudo pm2 startup
    ```

- nginx

  - 配置文件
  
    就是简单的给后台配置一个假端口

    ```bash
    upstream [***一个随意的字符串***] {
      ip_hash;
      server [***云服务器内网IP***]:[***后台真实端口***];
    }

    server {
        listen [***自定义端口***];
        server_name [***随便的一个名称***];

        location / {
            proxy_pass http://[***一个随意的字符串***];

            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection keep-alive;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```

  - socket

  - 测试

    1. 先看nginx语法有没有问题

        ```bash
        sudo nginx -t
        ```

    2. reload配置文件

        ```bash
        sudo systemctl reload nginx
        ```

    3. reload配置文件

        ```bash
        sudo systemctl reload nginx
        ```

    4. 查看nginx是否正常运行中

        ```bash
        sudo systemctl status nginx
        ```

    5. 测试接口，我用的是postman，测试一下最基础的接口就行

- 总结
 
  简单来说预生产环境下后端接口就是套了一层nginx，把真实接口隐藏掉

### 前台部署

- 在 `当前用户` 目录下建 `client` 文件夹，把`dist`文件夹下的所有文件扔到 `client` 文件夹里

- 打开`/etc/nginx/sites-enabled/default`文件，把`root /var/www/html`改成`root/client`，`localtion`下的`try_files`最后一段改成`/index.html`（因为咱们项目是 spa，所有东西都是在 index.html 下渲染的，包括 404/500 之类的页面）

- 退出保存， `nginx -t`检验语法是否正确，`systemctl reload nginx`重新加载 nginx

- 在`/etc/nginx/conf.d`下随便命名，建一个`***.conf`的文件

- 前台 api 的地址改成[***云服务器公网 IP***]:[***自定义端口***]

- 下面文件的用处，就是把后台真实的接口地址，隐藏在 nginx 的代理保护下



## 第二阶段：域名+https，前台配置 brotli 压缩

### 证书申请和域名备案

- 此处省略一万字，此项目的域名是在阿里买的，服务器和证书还有备案是在腾讯云做的。过程中如遇到问题可以百度，基本都可以解答。

- 证书文件位置：为了方便管理，在 `server` 和 `client` 同级目录下建了一个 `cert` 文件夹，进去后再建 `server` 和 `client` 文件夹，把对应证书都扔进去。

### brotli 压缩

:::warning
brotli 压缩必须在 https 环境下，所以如果真的想要配置 brotli 压缩的话，先把证书部分弄好再说
:::

- 具体查看[这里][article5]和[这里][article6]这两篇文章就行。我第一次弄就一遍过了，还是很顺利的。遇到的最大困难就是从 github 上拉 brotli 的代码那步了，实在太慢了。

## 完整 nginx 配置文件

- 为了方便管理，后续我把前台的和后台的 nginx 文件都放在了`/etc/nginx/conf.d`文件夹下

- 最后 `/etc/nginx` 文件夹下结构大致是这样：（下面就列举了重要的几个文件）

```
├── /etc/nginx/
│   ├── conf.d
│   │   ├── xxx.com.conf
│   │   └── api.xxx.com.conf
│   ├── modules
│   │   ├── ngx_http_brotli_static_module.so
│   │   └── ngx_http_brotli_filter_module.so
│   ├── nginx.conf
│   └── modules.conf
```

:::warning
下面给出的配置文件为了好看做了格式调整，如果真要使用请一定要在服务器上打开文件查看缩进并修改
:::

:::info
nginx 文件的缩进，必须是空格；每一条语句后要加分号
:::

:::info
建议每次修改 nginx 配置文件后都执行一下 `nginx -t`
:::

### xxx.com.conf

```nginx
server {
    listen 443 ssl;

    server_name 你的域名，例如 www.xxx.com;

    # 证书
    ssl_certificate 全路径/xxx.com_bundle.crt;
    ssl_certificate_key 全路径/xxx.com.key;
    ssl_session_timeout 5m;

    # 请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3;

    # 请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root 前台文件夹全路径;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}

server {
  listen 80;
  server_name www.xxx.com;
  # http 强制重写到 https
  return 301 https://$host$request_uri;
}
```

### api.xxx.com.conf

```nginx
upstream proxy {
    ip_hash;
    server [云服务器内网IP]:[后台真实端口];
}

server {
    listen 443 ssl;

    server_name 你的后台域名，例如 api.xxx.com;

    ssl_certificate 全路径/api.xxx.com_bundle.crt;
    ssl_certificate_key 全路径/api.xxx.com.key;
    ssl_session_timeout 5m;

    # 请按照以下协议配置
    ssl_protocols TLSv1.2 TLSv1.3;

    # 请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://proxy;

        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### modules.conf

- 这个文件就是单独处理 brotli 压缩的，如果不用 brotli 压缩的话可以忽略此部分

```nginx
load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;
```

### nginx.conf

- 这个文件应该算一个入口

```nginx
user root;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
# 引入brotli模块
include /etc/nginx/modules.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

    # gzip
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 32k;
    gzip_http_version 1.1;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript;
    gzip_vary on;
    gzip_proxied any;
    gzip_disable "MSIE [1-6]\.";

    # brotli
    brotli on;
    brotli_comp_level 6;
    brotli_buffers 16 8k;
    brotli_min_length 20;
    brotli_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript image/svg+xml;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
```

- 到此配置全部完成，执行`nginx -t`无误后执行`systemctl restart nginx`重启 nginx。浏览器打开域名应该就可以看到 https 配置完成，打开控制台，js 文件也都是以 br 格式请求的。（需要前台打包时也生成对应的 br 文件，具体看项目用的什么技术和插件）

## 写在最后

- 当然稍微懂点的都知道现在部署相关的技术越来越成熟了，就比如 docker。其实也可以直接上 docker，部署会更加方便。但这样从零开始配置服务器和 nginx 或许是每位开发者必须要经历的一段过程。有收获也有心得，这样对自己也是一次成长。

[doc1]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
[article4]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
[article5]: https://linuxhint.com/enable-brotli-compression-nginx/
[article6]: https://www.cnblogs.com/-wenli/p/13594882.html
