# 服务器记录

## 开发环境 - windows的wsl2

新版windows都内置了wsl，应该就是linux虚拟机，用起来很方便，开发环境下可以把redis和数据库扔到虚拟机里，还可以导出镜像，换电脑开发直接安装导出的镜像就好了，感觉很方便。

### 安装 ubuntu24.04

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
