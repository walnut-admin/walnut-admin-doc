# MongoDB 相关记录

:::warning
下面这一部分是旧的，新的已经采用docker-compose + replicaset的模式了，看下面第二部分
:::

## 单一数据库

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

## docker-compose + replicaset

### 搭建

- docker-compose 文件直接用的[bitnami](https://github.com/bitnami/containers/blob/main/bitnami/mongodb/docker-compose-replicaset.yml)的，很好用，配置环境变量就行

- 服务器上建一个文件夹，文件夹里建一个`docker-compose.yml`文件，然后把你改好的`bitnami`的文件内容粘进去，直接`docker compose up --detach`，等待一会就应该看到成功了。
  `docker compose ps`查看状态。

### windows + mongodb compass 连接

- 找到window的`hosts`文件，添加三行

```
[公网IP] [主MONGODB_ADVERTISED_HOSTNAME]
[公网IP] [从MONGODB_ADVERTISED_HOSTNAME]
[公网IP] [副MONGODB_ADVERTISED_HOSTNAME]
```

- 直接给你们一个url导入compass就行

```
mongodb://root:[MONGODB_ROOT_PASSWORD]@[服务器公网IP]:[映射端口],[服务器公网IP]:[映射端口],[服务器公网IP]:[映射端口]/admin?readPreference=primary&replicaSet=[MONGODB_REPLICA_SET_KEY]&authSource=admin&tls=false
```

暂未写完...

[article0]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
