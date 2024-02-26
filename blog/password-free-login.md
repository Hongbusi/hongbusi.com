---
title: 免密登录
date: 2022-09-20T11:55
authors: Hongbusi
tags: [ssh, 服务器]
---

服务器免密登录。

<!-- truncate -->

## 登录服务器

ssh，`secure shell protocol`，以更加安全的方式连接远程服务器。

``` bash
# root: 用户名
# 43.142.97.37：云服务器 IP 地址
$ ssh root@43.142.97.37
```

## 配置别名快速登录

在本地客户端环境配置 ssh-config，没有该文件则新建文件。对自己管理的服务器起别名，可以更方便地登录多台云服务器，以下是关于 ssh-config 的配置文件。

- `/etc/ssh/ssh_config`
- `~/.ssh/config`

以下是快速登录服务器 `Hongbusi` 的配置：

``` bash
# 修改 ssh 配置文件 ~/.ssh/config

Host Hongbusi
  HostName 43.142.97.37
  User root
```

配置成功之后就可以直接通过 `ssh <hostname>` 登录：

``` bash
$ ssh Hongbusi
```

## 免密登录

实现远程服务器的免密登录需要两个条件：

1. 两个文件：本地环境的 `~/.ssh/id_rsa.pub` 与远程服务器的 `~/.ssh/authorized_keys`
2. 一个动作：把本地文件  `~/.ssh/id_rsa.pub` 中的内容复制粘贴到远程服务器 `~/.ssh/authorized_keys`

注：如果本地没有 `~/.ssh/id_rsa.pub` 文件，则使用命令 `ssh-keygen` 进行生成。

也可以使用更加有效率的工具：`ssh-copy-id` ，自动将本地公钥复制到远程服务器的 `authorized_keys` 中。

``` bash
# 在本地环境进行操作

# 提示你输入密码，成功之后可以直接 ssh 登录，无需密码
$ ssh-copy-id Hongbusi

# 登录成功，无需密码
$ ssh Hongbusi
```

## 安全性：禁用密码登录

为了更大保障服务器的安全性，这里禁止密码登录。修改云服务器的 `sshd` 配置文件：`/etc/ssh/sshd_config`。其中 `PasswordAuthentication` 设置为 `no`，以此来禁用密码登录。

``` bash
# 编辑服务器端的 /etc/ssh/sshd_config

# 禁用密码登录
Host *
  PasswordAuthentication no
```

## 保持连接，防止断掉

除此之外，还可以通过一些配置来更好地优化我们连接服务器时的体验。

我们可以通过 `man ssh_config`，找到每一项的详细释义。

``` bash
# 编辑 ~/.ssh/config

Host *
  ServerAliveInterval 30
  TCPKeepAlive yes
  ServerAliveCountMax 6
  Compression yes
```
