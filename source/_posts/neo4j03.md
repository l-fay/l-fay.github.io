---
title: neo4j | 增加同时打开文件数
date: 2022-09-05 19:21:57
tags: [数据库, neo4j, Linux]
categories:
  - [数据库, neo4j]
  - [Linux]
---

neo4j数据库在数据量较大时需要增加同时打开文件数的上限。

<!-- more -->

主要是两种方法。

## 直接增加Linux的打开文件上限

将以下条目添加到`/etc/security/limits.conf`文件中：

```
root   soft    nofile  40000
root   hard    nofile  40000
```

然后重启服务器。

这种方法需要最终启动该服务的用户是root用户。

## 增加neo4j的打开文件数上限

自Neo4J 3.1以来,

可以在`/etc/default/neo4j`中添加一行：

```
NEO4J_ULIMIT_NOFILE=60000
```

为服务设置ulimit设置(60000个打开的文件)。

不再需要更改`/etc/security/limits.conf`。
