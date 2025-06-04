# Docker 记录

## 开发环境 - windows的wsl2

### 安装

- 看官方[安装文档](https://docs.docker.com/engine/install/ubuntu/)就行

:::tip
安装docker没啥问题，但拉镜像可能会出现网不通的情况，可以看[这里](https://www.cnblogs.com/OneSeting/p/18532166)。
:::

### 配置

#### 镜像
- 有时候镜像拉不下来，同样的也是换成国内镜像

```bash
nano /etc/docker/daemon.json
```

```json
{
  "dns": ["8.8.8.8", "8.8.4.4"],
  "registry-mirrors": [
    "https://docker.m.daocloud.io/",
    "https://huecker.io/",
    "https://dockerhub.timeweb.cloud",
    "https://noohub.ru/",
    "https://dockerproxy.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.nju.edu.cn",
    "https://xx4bwyg2.mirror.aliyuncs.com",
    "http://f1361db2.m.daocloud.io",
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com"
  ],
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  }
}
```

```bash
systemctl restart docker
```

### 验证

```bash
docker compose version
```

New-NetFirewallRule -DisplayName "WSL" -Direction Inbound -InterfaceAlias "vEthernet (WSL (Hyper-V firewall))" -Action Allow

https://stackoverflow.com/questions/60897021/wsl-2-cannot-conect-to-mongodb
