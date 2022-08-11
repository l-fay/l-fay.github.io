---
title: neo4j | 基本用法
date: 2022-08-11 20:37:36
tags: [数据库, neo4j]
categories:
  - [数据库, neo4j]
---

neo4j基本用法。

<!-- more -->
## 一、安装
安装包：[官网下载](https://neo4j.com/download/?ref=get-started-dropdown-cta)，[简中（代理商）](https://we-yun.com/index.php/blog/releases-56.html)

## 二、创建

（重要）首先创建约束，按我目前的理解，目的是使约束属性唯一。并且根据我在创建索引时的报错信息，被约束的属性会自动创建索引。下边第一句的意思是，给Movie标签的title属性创建约束。

```
CREATE CONSTRAINT ON (n:Movie) ASSERT (n.title) IS UNIQUE
CREATE CONSTRAINT ON (n:Person) ASSERT (n.name) IS UNIQUE
```

（重要）然后是创建索引，目的是提高查询速度。下边命令的意思是给Movie标签的released属性创建索引。
```
CREATE INDEX ON :Movie(released)
```

这里需要注意，官方给出的示例为：
```
CREATE INDEX FOR (m:Movie) ON (m.released)
```
这条命令运行会报错，原因是版问问题。
官方说明：
```
On neo4j version 4.X
CREATE INDEX [optionalName] FOR (p:Person) ON (p.name)

On neo4j version 3.X
CREATE INDEX ON :Person(name)
```



## 三、查询

### 1、简单查询

查询名为"Tom Hanks"的演员。
```
MATCH (tom:Person {name: "Tom Hanks"}) 
RETURN tom
```
`MATCH`是关键字，表示这是个查询语句，相当于SQL语句中的`SELECT`。
`tom`是变量名，自己随便定义，将冒号后边的查询结果暂存。
`Person{name:"Tom Hanks"}`表示在Person标签下寻找name属性为Tom Hanks的节点。
`RETURN`返回查询结果。

查询10个人并返回他们的名字。
```
MATCH (people:Person) 
RETURN people.name LIMIT 10
```
`LIMIT`限制查询结果数量。

查找上世纪90年代的电影并返回电影名。
```
MATCH (nineties:Movie) 
WHERE nineties.released >= 1990 AND nineties.released < 2000 
RETURN nineties.title
```
`WHERE`是条件语句，限制`MATCH`的查询结果。


### 2、复合查询
Tom Hanks演过什么电影？
由于示例是英文版，“参演”这个关系标签在数据库中是“ACTED_IN”。
```
MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) 
RETURN tom,tomHanksMovies
```
首先在Person标签中查找name属性为Tom Hanks的节点，然后顺着ACTED_IN关系查找另一头的节点。
这里需要注意的是，关系是有方向的`-[:ACTED_IN]->`表示了关系的指向，如果不加箭头，只用两个减号，就表示查询的时候不限定方向。

谁和Tom Hanks合作过？
```
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors) 
RETURN DISTINCT coActors.name
```
`DISTINCT`限定结果只返回一次，即使有重复，也只返回第一个。

哪些人和Cloud Atlas有关？
```
MATCH (people:Person)-[relatedTo]-(:Movie {title: "Cloud Atlas"}) 
RETURN people.name, Type(relatedTo), relatedTo.roles
```
这里边的`relatedTo`是个局部变量，改成`a`也是一样的。


### 3、距离查询
查找和Kevin Bacon距离4跳以内的电影和演员。
```
MATCH (bacon:Person {name:"Kevin Bacon"})-[*1..4]-(hollywood)
RETURN DISTINCT hollywood
```
`[*1..4]`表示不定长的路径，最小为1，最大为4。


使用自带函数shortestPath()寻找从Bacon Path到Meg Ryan的最短路径。
```
MATCH p=shortestPath(
(bacon:Person {name:"Kevin Bacon"})-[*]-(meg:Person {name:"Meg Ryan"})
)
RETURN p
```
这个就没啥好说的，记录一下shortestPath()函数。


### 4、查询并计数
寻找没和Tom Hanks合作过、但和Tom Hanks合作者合作过的演员。
```
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors),
(coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cocoActors)
WHERE NOT (tom)-[:ACTED_IN]->()<-[:ACTED_IN]-(cocoActors) AND tom <> cocoActors
RETURN cocoActors.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC
```
这里有两点需要注意，一是`<>`表示不等，二是count(*)表示对所有变量进行计算。
关于count()函数，原文如下：
```
Assume we have the following return statement:
RETURN n, count(*)
We have two return expressions: n, and count(). The first, n, is not an aggregate function, and so it will be the grouping key. The latter, count() is an aggregate expression. The matching subgraphs will be divided into different buckets, depending on the grouping key. The aggregate function will then be run on these buckets, calculating an aggregate value per bucket.
To use aggregations to sort the result set, the aggregation must be included in the RETURN to be used in the ORDER BY.
```

## 四、删除

删除所有节点和关系：
```
MATCH (n) DETACH DELETE n
```
其中`DETACH DELETE`代表删除节点及关系