---
title: rpm格式cuda安装
date: 2023-07-12 20:44:10
tags: [CUDA]
categories: 
  - [CUDA]
---

遇到的问题就不说了，反正最后的需求是用一个rpm格式的安装包去离线安装cuda。

<!-- more -->

```
# 安装存储库
sudo rpm -i cuda-xxx.rpm
# 更新软件包缓存
sudo yum update
# 安装CUDA
sudo yum install cuda
```

刚开始以为类似于`apt-get install`，只用执行上边第一步就完事了，后来发现根本没装上。