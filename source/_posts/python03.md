---
title: 'Python | 在程序中查找当前解释器路径'
date: 2023-12-04 19:13:56
tags: [Python]
categories: 
  - [Python]
---

主要应用场景是在py文件中调用命令行，想确保用的是当前虚拟环境。

<!-- more -->

```
import sys
path = sys.executable
```

值得一提的是，`sys.executable`是个常量，不是个函数，在pycharm中查看这个常量，可以看到在`sys.py`中有很多其他的常量，都是跟虚拟环境有关的。