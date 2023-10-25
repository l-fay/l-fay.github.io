---
title: Python连接Redis集群
date: 2023-10-21 19:00:37
tags: [数据库, Redis, Python]
categories: 
  - [数据库, Redis]
  - [Python, 常用库, rediscluster]
---

记录一下怎么用python连接Redis集群。

<!-- more -->

## 安装redis-py-cluster库

```
pip install redis-py-cluster
```

## 初始化集群类和连接池

为了方便，直接写了一个demo，就不多解释了，以后直接复制照搬。

```
class RedisCluster:
    def __init__(self, config):
        self.expire = 1800,
        self.redis_pool = ClusterConnectionPool(
            startup_nodes=[{"host": "192.168.xxx.xxx", "port": "6379"}],
            password="password",
            decode_responses=True,
            encodings="UTF-8",
            max_connections=10)

```
用的时候先获取链接，然后就和普通的Redis连接一样了：
```
connect = RedisCluster(connection_pool=self.redis_pool)
```

## 参考链接
[python rediscluster方法](https://wenku.baidu.com/view/8eb596869889680203d8ce2f0066f5335a8167dc.html?_wkts_=1698222924758&bdQuery=redis-py-cluster+lock)
[利用python操作redis集群](https://zhuanlan.zhihu.com/p/399126368)