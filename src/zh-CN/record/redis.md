# redis 记录

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
