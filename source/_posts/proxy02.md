---
title: 'CMD设置代理'
date: 2023-12-05 19:10:53
tags: [proxy]
categories: 
  - [proxy]
---

主要是我的软路由不太稳，所以需要备用的方法。

<!-- more -->

```
set http_proxy=http://127.0.0.1:7890
set https_proxy=http://127.0.0.1:7890
curl http://www.google.com
```

测试的时候用`ping`不太行，要用`curl`。

这个不是永久性的，只在当前终端生效。