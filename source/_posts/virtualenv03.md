---
title: virtualenv的使用场景
date: 2023-07-20 20:37:30
tags: [Python, Virtualenv]
categories: 
  - [Python]
---

说一下为什么用virtualenv。

<!-- more -->

我还是比较习惯用Anaconda，但在内网环境下，Anaconda创建和管理环境特别麻烦，所以转用virtualenv。

virtualenv的优势在于可以使用本地python环境，用`.tar.gz`安装包安装多个python环境后，可以实现离线创建多种不同的python版本虚拟环境。

在实际应用中，`.tar.gz`的安装包有时缺少环境，又没有root权限，所以产生了一个迂回的方案。

用Anaconda的离线安装包装Anaconda，然后用virtualenv使用本地的Anaconda的base环境创建虚拟环境。

也不是不能用.jpg