---
title: sql | MySql的upserte语句
date: 2023-04-11 19:05:49
tags: [SQL]
categories:
  - [SQL]
---

upsert是mysql的方言，其作用是数据库没有这条数据，就新增，有这条数据就修改。

<!-- more -->

# 语法

```
INSERT INTO student ( id, NAME, age, sign )
VALUES
	( '1', '张三', 18, 1 ) 
	ON DUPLICATE KEY UPDATE NAME = '李四';
```

其中`id`是唯一主键。

要注意的是，联合主键不能使用upsert。