# <WPageTitle></WPageTitle>

## 需求

:::info
本地开发可以直接使用主机上的vpn让wsl内通网，云服务就是换镜像地址了
:::

- windows本地开发，把数据库和redis都塞到wsl中用docker管理，方便使用和更新。
- 新版windows都内置了wsl，应该就是linux虚拟机，用起来很方便，开发环境下可以把redis和数据库扔到虚拟机里，还可以导出镜像，换电脑开发直接安装导出的镜像就好了，感觉很方便。

## wsl安装

- 查看可安装的镜像版本
```bash
wsl --list --online
```

![Demo](/images/record/server1.png)

- 安装
```bash
wsl --install Ubuntu-24.04
```

![Demo](/images/record/server2.png)

- 切换root
```bash
sudo su root
```

![Demo](/images/record/server3.png)

- 查看版本
```bash
lsb_release -a
```

![Demo](/images/record/server4.png)

- 常规
```bash
apt-get update
apt-get upgrade
```

::: tip
如果update不通，那就切换国内镜像，因为我在北方就用的[清华镜像](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)。同时注意24.04开始用的是DEB822格式，即需要修改这个文件`/etc/apt/sources.list.d/ubuntu.sources`。
:::

:::warning
清华镜像默认安全的链接没改，建议还是勾选一下安全那个框，要不更新的时候关于安全的都会失效
:::

- 切换镜像
```bash
nano /etc/apt/sources.list.d/ubuntu.sources
```

## docker

- 直接看[这里](./docker.md)，按照官方文档安装就行

- 安装完成复制docker-compose.dev.yml到wsl中，准备拉取镜像

:::warning
镜像现在都会很难拉取，建议直接win上vpn+局域网，wsl内部直接vpn拉取
:::

- 下面是wsl全局配置

```bash
# 编辑bash配置（zsh改~/.zshrc）
nano ~/.bashrc

# 末尾添加（自动获取Windows IP，永不失效）
export WIN_IP=$(ip route show default | awk '/default/ {print $3}')
export HTTP_PROXY=http://$WIN_IP:7897
export HTTPS_PROXY=http://$WIN_IP:7897
export NO_PROXY=localhost,127.0.0.1,.local,.internal,172.0.0.0/8,10.0.0.0/8,192.168.0.0/16,.docker.internal

# 生效配置
source ~/.bashrc

# 验证
echo $HTTP_PROXY
```

- 下面是docker单独配置

```bash
# 创建配置目录
sudo mkdir -p /etc/systemd/system/docker.service.d

# 编辑配置文件
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf

# 粘贴内容（自动获取Windows IP）
[Service]
Environment="HTTP_PROXY=http://$(ip route show default | awk '/default/ {print $3}'):7897"
Environment="HTTPS_PROXY=http://$(ip route show default | awk '/default/ {print $3}'):7897"
Environment="NO_PROXY=localhost,127.0.0.1,.docker.internal,172.0.0.0/8"

# 生效配置
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证配置
docker info | grep Proxy
```

:::warning
还是不行有可能是防火墙的问题，需要win上开管理员powershell暂时执行下
```bash
netsh advfirewall set allprofiles state off
```

测试wsl内是不是和win的vpn通了
```bash
# 自动获取Windows主机IP（永远正确，不会变）
WIN_IP=$(ip route show default | awk '/default/ {print $3}')
echo "Windows主机IP：$WIN_IP"

# 测试1：用代理访问Google（核心验证）
curl -x http://$WIN_IP:7897 -I https://www.google.com
```
:::

## redis

- 使用bitnami的redis镜像了，直接配环境变量就好了，看[这里](https://github.com/bitnami/containers/blob/main/bitnami/redis/README.md)

## mongodb

- 同理，bitnami的replicaset镜像，提供好的环境变量直接使用就行，看[这里](https://github.com/bitnami/containers/blob/main/bitnami/mongodb/README.md)

- 连接串

```bash
mongodb://root:123456@127.0.0.1:27017,127.0.0.1:27027,127.0.0.1:27037/?readPreference=primary&replicaSet=replicaset
```

:::warning
windows主机的`hosts`(C:\Windows\System32\drivers\etc)文件需要配置一下

```txt
127.0.0.1 dev-mongodb-primary
127.0.0.1 dev-mongodb-secondary
127.0.0.1 dev-mongodb-arbiter
```
:::

## 完整docker-compose.yml

```yml
services:
  dev-mongodb-primary:
    image: docker.io/bitnami/mongodb:latest
    restart: always
    container_name: dev-mongodb-primary
    environment:
      - MONGODB_ADVERTISED_HOSTNAME=dev-mongodb-primary
      - MONGODB_REPLICA_SET_MODE=primary
      - MONGODB_ROOT_USER=root
      - MONGODB_ROOT_PASSWORD=123456
      - MONGODB_REPLICA_SET_KEY=replicaset
    volumes:
      - 'mongodb_master_data:/bitnami/mongodb'
    ports:
      - 27017:27017

  dev-mongodb-secondary:
    image: docker.io/bitnami/mongodb:latest
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
      - MONGODB_REPLICA_SET_KEY=replicaset
      - MONGODB_INITIAL_PRIMARY_PORT_NUMBER=27017
    ports:
      - 27027:27017

  dev-mongodb-arbiter:
    image: docker.io/bitnami/mongodb:latest
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
      - MONGODB_REPLICA_SET_KEY=replicaset
      - MONGODB_INITIAL_PRIMARY_PORT_NUMBER=27017
    ports:
      - 27037:27017

  redis:
    restart: always
    container_name: dev-single-redis
    image: docker.io/bitnami/redis:latest
    environment:
      - ALLOW_EMPTY_PASSWORD=no
      - REDIS_DISABLE_COMMANDS=FLUSHDB,FLUSHALL
      - REDIS_PASSWORD=123456
    ports:
      - 6379:6379
    volumes:
      - redis_data:/bitnami/redis/data

volumes:
  mongodb_master_data:
    driver: local
  redis_data:
    driver: local
```
