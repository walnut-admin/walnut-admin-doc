# Docker 记录

## 开发环境 - windows的wsl2

### 安装

- 看官方[安装文档](https://docs.docker.com/engine/install/ubuntu/)就行

:::tip
安装docker没啥问题，但拉镜像可能会出现网不通的情况，可以看[这里](https://www.cnblogs.com/OneSeting/p/18532166)。
:::

### 配置

#### 镜像
- 有时候镜像拉不下来，同样的也是换成[国内清华镜像](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/)

```bash
systemctl restart docker
```

### 验证

```bash
docker compose version
```

## 测试环境(纯ip)

:::tip
如果不行就reboot一下，apt update/upgrade后还是需要重启的
:::

:::tip
docker镜像也得配哈
:::

- 和开发环境的wsl差不多
