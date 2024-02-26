---
title: Nginx 服务器 SSL 证书安装
date: 2024-01-28T11:55
authors: Hongbusi
tags: [nginx, 服务器]
---

本文将介绍如何为 Nginx 服务器安装 SSL 证书，并包含了一些常见问题的简便解决方案。

<!-- truncate -->

## 操作环境

- 操作系统：CentOS 8.4 64 位 SCC 版
- Nginx 版本：nginx/1.14.1
- 证书名称：以 `hongbusi.com` 为例

## 证书安装

我这里使用的是阿里云领取的免费版 SSL 证书。可以登录阿里云，搜索并前往 `数字证书管理服务（SSL 证书）` 购买、创建证书。

1. 下载证书文件

选择需要安装的证书，点击下载，在证书下载窗口中，选择服务器类型为 Nginx，下载并解压缩，得到以下文件：

- `hongbusi.com.key`
- `hongbusi.com.pem`

2. 上传证书文件到服务器

使用 `rsync` 命令将证书文件上传到服务器。

``` bash
$ rsync -lahzv ./ Hongbusi:/etc/nginx/cert
```

注意：确保已配置免密登录和安装了 rsync。

3. 编辑 Nginx 配置文件

登录服务器，编辑 `/etc/nginx/conf.d/hongbusi.com.conf` 文件，将其内容修改如下：

```
server {
    listen 80;
    server_name hongbusi.com;

    rewrite ^(.*)$ https://$server_name$1 permanent;
}

server {
    listen 443 ssl;
    server_name hongbusi.com;

    ssl_certificate /etc/nginx/cert/hongbusi.com.pem;
    ssl_certificate_key /etc/nginx/cert/hongbusi.com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://172.19.0.4:3000;
    }
}
```

4. 校验 Nginx 配置文件正确性

``` bash
$ nginx t
```
5. 重启 Nginx

``` bash
$ nginx -s reload
```

6. 开启 HTTPS 默认端口 443

至此，配置完成。现在可以通过 `https://hongbusi.com` 进行访问。
