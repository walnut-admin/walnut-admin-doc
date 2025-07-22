# redis 记录

## 最新

- 使用bitnami的redis镜像了，直接配环境变量就好了，看[这里](https://github.com/bitnami/containers/blob/main/bitnami/redis/8.0/debian-12/docker-compose.yml)

- 下面的内容，就当记录了

## 开发环境 - windows的wsl2

### 安装
- 直接看[官网](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-windows/)

### 配置

```bash
nano /etc/redis/redis.conf
```

- `ctrl + w` 查找 `requirePass`, 打开注释添加密码

### 验证

直接用redis连接工具测试就行，应该不会有啥问题，可以直接连上。

:::tip
我这个是最简单的redis配置哈，复杂的集群或者一些安全配置需要自己再去研究了。
:::

## 非开发环境

- 直接看[官网](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-linux/)

- 改密码，同开发环境

- bind ip，ctrl + w 找bind，打开后绑定云服务器内网IP
