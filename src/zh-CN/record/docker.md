# Docker 记录

## 安装
- 看官方[安装文档](https://docs.docker.com/engine/install/ubuntu/)就行

:::warning
现在docker镜像是越来越难拉取了，可以看[这里](https://www.cnblogs.com/OneSeting/p/18532166)。
:::

## 配置

### 镜像
- 有时候镜像拉不下来，同样的也是换成[国内清华镜像](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/)

```bash
systemctl restart docker
```

### 验证

```bash
docker compose version
```

:::tip
如果不行就reboot一下，apt update/upgrade后还是需要重启的
:::

:::tip
docker镜像也得配哈
:::
