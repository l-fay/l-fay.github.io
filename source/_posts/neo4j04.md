---
title: neo4j | 索引相关的cypher语句
date: 2022-12-01 16:27:20
tags:
categories:
---

在数据量大的时候，需要在neo4j数据库中建立索引，不然搜的特别慢。

<!-- more -->

## 创建索引
给 Label 为 Person 的节点的 name 属性上创建索引，CQL语句如下所示：

```
CREATE INDEX ON :Person(name)
```

重复执行上述CQL语句，再次创建索引，不会报错，但是没有再创建索引。

## 删除索引

删除刚才创建的索引，CQL语句如下所示：

```
DROP INDEX ON :Person(name)
```

## 查询索引

```
:schema
```