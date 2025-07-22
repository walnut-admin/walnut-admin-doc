# MongoDB 相关记录

## 开发环境 - windows的wsl2

:::tip
前提是docker已经安装完成
:::

### 安装

- docker-compose 文件直接用的[bitnami](https://github.com/bitnami/containers/blob/main/bitnami/mongodb/docker-compose-replicaset.yml)的，很好用，配置环境变量就行

```bash
docker compose up --detach
docker compose down
docker compose ps
```

### 配置

windows主机的`hosts`(C:\Windows\System32\drivers\etc)文件需要配置一下

```txt
127.0.0.1 dev-mongodb-primary
127.0.0.1 dev-mongodb-secondary
127.0.0.1 dev-mongodb-arbiter
```

### 验证
直接用`mongodb-compass`连接尝试即可

```txt
mongodb://root:123456@127.0.0.1:27017,127.0.0.1:27027,127.0.0.1:27037/?readPreference=primary&replicaSet=replicaset
```

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
