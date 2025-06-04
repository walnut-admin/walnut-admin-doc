# MongoDB 相关记录

## 开发环境 - windows的wsl2

:::tip
前提是docker已经安装完成
:::

### 安装

- docker-compose 文件直接用的[bitnami](https://github.com/bitnami/containers/blob/main/bitnami/mongodb/docker-compose-replicaset.yml)的，很好用，配置环境变量就行

```yml
services:
  dev-mongodb-primary:
    image: docker.io/bitnami/mongodb:8.0
    restart: always
    container_name: dev-mongodb-primary
    environment:
      - MONGODB_ADVERTISED_HOSTNAME=dev-mongodb-primary
      - MONGODB_REPLICA_SET_MODE=primary
      - MONGODB_ROOT_USER=root
      - MONGODB_ROOT_PASSWORD=123456
      - MONGODB_REPLICA_SET_KEY=replicasetkey123
    volumes:
      - 'mongodb_master_data:/bitnami/mongodb'
    ports:
      - 27017:27017

  dev-mongodb-secondary:
    image: docker.io/bitnami/mongodb:8.0
    restart: always
    container_name: dev-mongodb-secondary
    depends_on:
      - dev-mongodb-primary
    environment:
      - MONGODB_REPLICA_SET_MODE=secondary
      - MONGODB_ADVERTISED_HOSTNAME=dev-mongodb-secondary
      - MONGODB_INITIAL_PRIMARY_HOST=dev-mongodb-primary
      - MONGODB_INITIAL_PRIMARY_ROOT_USER=root
      - MONGODB_INITIAL_PRIMARY_ROOT_PASSWORD=123456
      - MONGODB_INITIAL_PRIMARY_PORT_NUMBER=27017
      - MONGODB_REPLICA_SET_KEY=replicasetkey123
    ports:
      - 27027:27017

  dev-mongodb-arbiter:
    image: docker.io/bitnami/mongodb:8.0
    restart: always
    container_name: dev-mongodb-arbiter
    depends_on:
      - dev-mongodb-primary
    environment:
      - MONGODB_REPLICA_SET_MODE=arbiter
      - MONGODB_ADVERTISED_HOSTNAME=dev-mongodb-arbiter
      - MONGODB_INITIAL_PRIMARY_HOST=dev-mongodb-primary
      - MONGODB_INITIAL_PRIMARY_ROOT_USER=root
      - MONGODB_INITIAL_PRIMARY_ROOT_PASSWORD=123456
      - MONGODB_INITIAL_PRIMARY_PORT_NUMBER=27017
      - MONGODB_REPLICA_SET_KEY=replicasetkey123
    ports:
      - 27037:27017

volumes:
  mongodb_master_data:
    driver: local
```

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

```string
mongodb://root:123456@127.0.0.1:27017,127.0.0.1:27027,127.0.0.1:27037/?readPreference=primary&replicaSet=replicaset
```

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

[article0]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
