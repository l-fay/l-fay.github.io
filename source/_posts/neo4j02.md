---
title: neo4j | 全属性模糊查询
date: 2022-08-26 19:06:19
tags: [数据库, neo4j, 正则表达式]
categories:
  - [数据库, neo4j]
---

不指定属性名的情况下进行模糊查询。

<!-- more -->

直接上代码
```
MATCH p=(r) WHERE ANY(k in keys(r) WHERE ANY(nn in r[k] WHERE nn =~'.*李.*')) RETURN p
```

逻辑就是先遍历所有节点，每个节点遍历所有key值，再根据key值遍历属性。