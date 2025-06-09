# 部署记录

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
// eslint-disable-block style/no-tabs
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

[article4]: https://ubuntu.com/tutorials/install-and-configure-nginx
[article5]: https://linuxhint.com/enable-brotli-compression-nginx/
[article6]: https://www.cnblogs.com/-wenli/p/13594882.html
