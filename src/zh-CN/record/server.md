# 服务器记录

## 测试环境(纯ip)

- 查看版本
```bash
lsb_release -a
```

:::warning
大部分云厂商ssh的22端口都没开，记得开一下
:::

:::tip
国内的云服务器都是配好镜像的，不会有不通的问题
:::

- 常规
```bash
apt-get update
apt-get upgrade
```

- node
看官方安装文档就行
[nodesource](https://github.com/nodesource/distributions?tab=readme-ov-file#installation-instructions-deb)

- [docker](./docker.md)
- [redis](./redis.md)
- [mongo](./mongo.md)
- [nginx](./nginx.md)
