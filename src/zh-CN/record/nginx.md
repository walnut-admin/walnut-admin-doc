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
    listen 页面访问端口;
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
        root 前端文件夹路径;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://公网IP:代理后的端口;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_redirect default;
        proxy_set_header X-Nginx-Proxy true;
        proxy_http_version 1.1;
        add_header Access-Control-Allow-Credentials "true" always;
    }
    location /socket/ {
        proxy_pass http://公网IP:代理后的端口;
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
    server 后台socket真实地址 max_fails=3 fail_timeout=30s;
}
server {
    listen socket的代理端口;
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
    server 后台真实地址;
}
server {
    listen 后台的代理端口;
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
