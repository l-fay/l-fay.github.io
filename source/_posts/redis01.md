---
title: Redis的配置
date: 2020-10-26 18:21:17
tags: [数据库, Redis]
categories: 
  - [数据库, Redis]
---
一些相关的配置。

<!-- more -->

既然要配置，首先找一下安装目录在哪：
```
whereis redis
```

```
redis: /etc/redis
```

在这个文件夹下，有一个redis.conf，这就是配置文件了。

```
vim redis.conf
```

主要查看`port`和`bind`，分别是端口和绑定的ip。

一般默认port是6379，bind是127.0.0.1。