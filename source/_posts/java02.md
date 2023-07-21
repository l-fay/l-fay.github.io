---
title: Java | 怎样用Java获取文件后缀
date: 2023-04-11 18:48:54
tags: [Java, 正则表达式]
categories: 
  - [Java]
  - [正则表达式]
---

有时用Java有获取文件后缀的需求，就想找一个类似Python里`os.path.splitext()`的解决方案。

<!-- more -->

## 解决

在Java中，String.split()是支持正则的，所以这就很简单了。

```
String[] tokens = fileName.split("\\.(?=[^\\.]+$)");
```