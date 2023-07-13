---
title: no CUDA-capable device is detected
date: 2020-12-16 16:01:13
tags: [CUDA,  Python, PyTorch]
categories: 
  - [CUDA]
  - [Python, PyTorch]
---

这个错误可能由以下几个原因引起：

<!-- more -->

## 显卡驱动与CUDA驱动不匹配

这种情况推荐用Ubuntu自带的驱动更新功能解决。

可以参考我的这篇博客{% post_link linux01 Ubuntu安装驱动及CUDA %}。

## Python代码问题

在使用GPU运算的时候会使用下边这句话来设置使用的GPU是哪个：

```
os.environ["CUDA_VISIBLE_DEVICES"] = "0"
```

有的时候只有一块卡，但在代码里设置了3，就会出现这种错误，改一下就好了。