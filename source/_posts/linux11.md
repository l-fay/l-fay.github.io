---
title: Linux分卷压缩与解压缩
date: 2023-10-20 21:07:34
tags: [Linux]
categories:
  - [Linux]
---

在Linux系统下，分卷压缩与解压缩的方法。

<!-- more -->

在[这篇文章](https://blog.csdn.net/qq_19320227/article/details/127967543)里提到了两种压缩方法和三种解压缩方法，搬运一下。

## 压缩

### 方法一 直接压缩

```
zip -r -s 1m log.zip log/
```

-r 代表递归子目录(如果没有加压缩出来只包含一个空目录)
-s 1m代表分卷大小(这里我进行测试所以设置的比较小,正式使用一般设置为1g)
log.zip为压缩包名
log/为待压缩的目录

### 方法二 先压缩再分卷

```
# 压缩
zip -r log.zip log
# 分卷
zip -s 5m log.zip --out new.zip
```

## 解压缩

### 方法一 先合并再解压

```
# 合并
zip -s 0 log.zip --out LOG.zip
# 解压
unzip LOG.zip
```

### 方法二 先修复再解压

```
# 修复
zip -F log.zip --out LOG.zip
# 解压
unzip LOG.zip
```
-F 后是要修复的压缩文件
–out 后是修复合并出来的用于解压缩的压缩文件

### 方法三 先合并再解压

```
# 合并
cat log.z* > LOG.zip
# 解压
unzip LOG.zip
```