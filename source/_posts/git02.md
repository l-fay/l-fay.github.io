---
title: 'Git | 给SSH克隆设置代理'
date: 2023-12-06 19:39:17
tags: [Git, proxy]
categories: 
  - [Git]
  - [proxy]
---

在`git clone`时设置代理。

<!-- more -->

编辑`~/.ssh/config`：

```
ProxyCommand nc -x 127.0.0.1:7890 %h %p
```

不想用代理就删了。