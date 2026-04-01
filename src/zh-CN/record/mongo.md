# MongoDB 相关记录

## 非开发环境

- 和开发环境的wsl基本一样

- 本机测试云服务器端口通不通
```powershell
Test-NetConnection -ComputerName 公网IP -Port 27017
```

- 查看容器内mongo日志
```bash
docker compose logs -f stage-mongodb-primary
```

## ~~~单一数据库~~~

- 安装 mongodb，具体看官方文档即可

  - [install-mongodb-on-ubuntu][article0]

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

[article0]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
