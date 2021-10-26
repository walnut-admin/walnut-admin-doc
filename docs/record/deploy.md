# 部署记录

## 后台部署

- 查看 ubuntu 版本

```bash
lsb_release -a
```

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

- 安装 mongodb，具体看官方文档即可

  - [install-mongodb-on-ubuntu][doc1]

- 安装完，需要配置远程连接的信任 ip，这两篇文章介绍的很详细

  - [how-to-install-mongodb-on-ubuntu-20-04][article1]

  - [how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04][article2]

- 配置 mongodb 的用户密码

  - [how-to-secure-mongodb-on-ubuntu-20-04][article3]

- 完整的配置 admin 用户格式

```
db.createUser({ user: "YourUserName", pwd: passwordPrompt(), roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ] })
```

[doc1]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
[article1]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
[article2]: https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04
[article3]: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
