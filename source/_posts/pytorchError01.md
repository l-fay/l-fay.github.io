---
title: "RuntimeError: All input tensors must be on the same device. Received cuda:0 and cpu"
date: 2021-03-22 15:49:10
tags: [报错, Python, PyTorch]
categories: 
  - [Python, PyTorch, 报错]
---
昨天遇到了这个错误，查询后发现原因是有一个变量创建之后没有发给GPU，导致运算的时候出错。

解决方法：

在出错的变量创建后，在参与计算之前发给GPU。

```
data = torch.zeros(1)
data = data.cuda()
```