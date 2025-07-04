# nignx记录

## 安装

-  [install-and-configure-nginx](https://ubuntu.com/tutorials/install-and-configure-nginx)

## 预生产

:::tip
权限: /etc/nginx/nginx.conf 头部的user

校验: nginx -t

sites-*: cp default default.bak
:::

- 前端

- `/etc/nginx/client.conf`

```nginx
server {
    listen 443 ssl;

    # 填写证书绑定的域名。多域名配置示例：server_name example.com www.example.com doc.example.com;
    server_name [*前端域名*];

    # 填写证书文件绝对路径
    ssl_certificate /[*证书路径*]/[*前端域名*].pem;
    #填写证书私钥文件绝对路径
    ssl_certificate_key /[*证书路径*]/[*前端域名*].key;

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;

    # 自定义设置使用的TLS协议的类型以及加密套件（以下为配置示例，请您自行评估是否需要配置）
    # TLS协议版本越高，HTTPS通信的安全性越高，但是相较于低版本TLS协议，高版本TLS协议对浏览器的兼容性较差。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

    # 表示优先使用服务端加密套件。默认开启
    ssl_prefer_server_ciphers on;

    location / {
        root /root/vue;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass https://[*后端域名*];
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect default;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        add_header Access-Control-Allow-Credentials "true" always;
    }
    location /socket/ {
        proxy_pass http://[*公网IP*]:[*socket假端口*]/[*socket path*]/;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    # 填写证书绑定的域名
    server_name [*前端域名*];
    # 将所有HTTP请求通过rewrite指令重定向到HTTPS。
    rewrite ^(.*)$ https://$host$1;
    location / {
        index index.html index.htm;
    }
}

server {
    listen [*前端访问端口*];
    server_name _;
    access_log /var/log/nginx/client.access.log;
    error_log /var/log/nginx/client.error.log;
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 10240;
    gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;
    location / {
        root /root/vue;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://[*公网IP*]:[*后端假端口*];
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect default;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        add_header Access-Control-Allow-Credentials "true" always;
    }
    location /socket/ {
        proxy_pass http://[*公网IP*]:[*socket假端口*]/[*socket path*]/;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

- socket

- `/etc/nginx/socket.conf`

```nginx
upstream socketio {
    ip_hash;
    server [*socket真实url*] max_fails=3 fail_timeout=30s;
}
server {
    listen [*socket假端口*];
    server_name walnut-socket;
    access_log /var/log/nginx/socketio.access.log;
    error_log /var/log/nginx/socketio.error.log;
    gzip on;
    gzip_types application/json text/plain text/css application/javascript;
    gzip_min_length 1024;
    location / {
        proxy_pass http://socketio;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400s; # 长连接超时
        proxy_send_timeout 86400s;
        proxy_connect_timeout 15s;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- 后端

- `/etc/nginx/server.conf`

```nginx
upstream walnut-backend-nestjs {
    ip_hash;
    server [*内网IP*]:[*后端端口*];
}
server {
    listen 443 ssl;
    server_name [*后端域名*];

    ssl_certificate /root/cert/nestjs/[*后端域名*].pem;
    ssl_certificate_key /root/cert/nestjs/[*后端域名*].key;

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;

    # 自定义设置使用的TLS协议的类型以及加密套件（以下为配置示例，请您自行评估是否需要配置）
    # TLS协议版本越高，HTTPS通信的安全性越高，但是相较于低版本TLS协议，高版本TLS协议对浏览器的兼容性较差。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

    # 表示优先使用服务端加密套件。默认开启
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://walnut-backend-nestjs;
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
server {
    listen [*后端假端口*];
    server_name walnut-admin-nest;
    access_log /var/log/nginx/server.access.log;
    error_log /var/log/nginx/server.error.log;
    location / {
        proxy_pass http://walnut-backend-nestjs;
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
