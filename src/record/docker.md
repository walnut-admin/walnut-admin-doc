# Docker 相关记录

:::info
此部分是在 `ubuntu 20.04 focal` 版本上的相关记录
:::

## docker 安装

- 文章[源地址](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)

## docker compose 安装

- 文章[源地址](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)

- [这里](https://github.com/docker/compose/releases)查看最新版本。下面我用的是 2.5.1，记得替换成自己的版本

```bash
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.5.1/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
```

- 设置权限

```bash
chmod +x ~/.docker/cli-plugins/docker-compose
```

- 验证

看到版本号，第一步就成功了

```bash
docker compose version
```
