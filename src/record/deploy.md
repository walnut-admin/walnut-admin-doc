# 部署记录

## 服务器环境

- 查看 ubuntu 版本

```bash
lsb_release -a
```

### node

- 执行 NodeSource 安装脚本

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

- 安装 node(自带 npm)

```bash
sudo apt install nodejs
```

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

::: tip
阿里云的服务器，mongo 的配置文件里的 bindip，要配的是内网 ip 不是外网 ip
:::

- 配置 mongodb 的用户密码

  - [how-to-secure-mongodb-on-ubuntu-20-04][article3]

- 完整的配置 admin 用户格式

```
db.createUser({ user: "YourUserName", pwd: passwordPrompt(), roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ] })
```

## 前台部署

- 在 root 目录下建 client 文件夹，把`dist`文件夹下的所有文件扔到 client 文件夹里

- 打开`/etc/nginx/sites-enabled/default`文件，把`root /var/www/html`改成`root/client`，`localtion`下的`try_files`最后一段改成`/index.html`（因为咱们项目是 spa，所有东西都是在 index.html 下渲染的，包括 404/500 之类的页面）

- 退出保存， `nginx -t`检验语法是否正确，`systemctl reload nginx`重新加载 nginx

- 在`/etc/nginx/conf.d`下随便命名，建一个`***.conf`的文件

- 后台 app.listen 的第二个参数，暂时写了`0.0.0.0`

- 前台 api 的地址改成[***阿里云公网 IP***]:[***自定义端口***]

- 下面文件的用处，就是把后台真实的接口地址，隐藏在 nginx 的代理保护下

```nginx
upstream proxy {
	ip_hash;
        server [***阿里云内网IP***]:[***后台真实端口***];
}

server {
    listen [***自定义端口***];
    server_name _;

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

## 后台部署

- 在 root 目录下建 server 文件夹，把**dist/env/package.json**扔到 server 文件夹里，执行`npm i`，安装完成后执行`npm run start:prod`

### pm2 挂载

- 在 server 文件夹下创建`pm2.conf.json`文件

```json
{
  "apps": [
    {
      "name": "walnut-admin-nest",
      "script": "npm run start:prod",
      "cwd": "./",
      "instances": 1,
      "error_file": "./logs/error.log",
      "out_file": "./logs/out.log",
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
}
```

- script 下新建脚本

```json
  "scripts": {
    "pm2": "pm2 start pm2.conf.json"
  },
```

[doc1]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
[article4]: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
