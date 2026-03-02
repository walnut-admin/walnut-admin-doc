# Docker 记录

## 开发环境 - windows的wsl2

### 安装

#### 本地wsl开发环境

:::info
直接proxy更快更方便
:::

:::warning
wsl不通vpn大概率是防火墙问题。管理员powershell 执行一下 `netsh advfirewall set allprofiles state off` 暂时关闭防火墙就好了，测试就用 `curl -I https://www.google.com`
:::

1. 确保vpn开始了局域网模式
2. 打开 `/etc/systemd/system/docker.service.d/http-proxy.conf`
3. 在 `[SERVICE]` 下直接添加下面几行
```txt
Environment="HTTP_PROXY=http://{{wsl的ip}}:{{vpn设置的端口，一般是7890或者7897}}"
Environment="HTTPS_PROXY=http://{{wsl的ip}}:{{vpn设置的端口，一般是7890或者7897}}"
Environment="NO_PROXY=localhost,127.0.0.1"
```

#### 云服务器
- 看官方[安装文档](https://docs.docker.com/engine/install/ubuntu/)就行

:::warning
现在docker镜像是越来越难拉取了，可以看[这里](https://www.cnblogs.com/OneSeting/p/18532166)。
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
