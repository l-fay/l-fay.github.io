---
title: 'mysql根据父节点递归查询所有子节点'
date: 2023-10-28 19:16:31
tags: [SQL]
categories:
  - [SQL]
---

如题。
搬运自[这里](https://developer.aliyun.com/article/1143831)。

<!-- more -->

# 方法一

```
SELECT
  * 
FROM
  (
  SELECT
    t1.*,
  IF
    ( FIND_IN_SET( parent_id, @parent_ids ) > 0, @parent_ids := CONCAT( @parent_ids, ',', id ), '0' ) AS ischild 
  FROM
    ( SELECT * FROM blade_menu AS t WHERE t.is_deleted = 0 AND client_type = 'dianduyun_app' ORDER BY t.id ASC ) t1,
    ( SELECT @parent_ids := '1508255373140103170' ) t2 
  ) t3 
WHERE
  ischild != '0'
```

需要修改的地方:
• parent_id，改为你的父级id字段
• blade_menu ，改为你的表名称
• WHERE t.is_deleted = 0 ，改为你的查询条件
• @parent_ids := ‘1508255373140103170’，值改为你要传入的父级id

# 方法二：

```
SELECT
  rd.* 
FROM
  ( SELECT * FROM fine_authority_object WHERE parentId IS NOT NULL AND is_deleted = 0 ) rd,
  ( SELECT @pid := '2342465874553522423' ) pd 
WHERE
  FIND_IN_SET( parentId, @pid ) > 0 
  AND @pid := concat( @pid, ',', id ) 

UNION
SELECT
  * 
FROM
  fine_authority_object 
WHERE
  FIND_IN_SET( id, @pid ) > 0;
```

需要修改的地方
fine_authority_object ，改为你的表名，以及后面的查询条件进行修改。
SELECT @pid := ‘2342465874553522423’ ，值改为你要传的父id的值
FIND_IN_SET( parentId, @pid ) ，parentId改为你的父级id字段名
备注：
• 当前这条SQL是根据多个父节点查询所有子节点（包含自身）
• 如果不想查询结果包含自身，去掉后边的union