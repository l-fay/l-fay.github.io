---
title: Linux | Linux服务器上配置域和DNS
date: 2022-12-01 16:30:30
tags: [Linux, DNS]
categories: 
  - [Linux, DNS]
---

给Linux机器配置DNS的方法。

<!-- more -->

1、使用以下指令打开resolv.conf配置文件：

```
vim /etc/resolv.conf
```

2、在打开的文件中输入指定的域和DNS，可以配置多个域和DNS。

```
search xxx.example.com xxx.example2.com 
nameserver XXX.XXX.XXX.XXX
nameserver XXX.XXX.XXX.XXX
```

3、退出并保存即可。