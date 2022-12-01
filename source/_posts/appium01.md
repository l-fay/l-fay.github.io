---
title: Appium | Appium中implicitly_wait失效的替代方案
date: 2022-10-15 19:32:26
tags: [Python, 自动化, Appium]
categories:
  - [Python, 常用库, Appium]
  - [自动化, Appium]
---

不知道为啥，在Appium中，implicitly_wait是不起作用的，所以找了个替代方案。

<!-- more -->

在Stack Overflow上找了个方案，说用线程超时来代替implicitly_wait，这启发了我，既然implicitly_wait不起作用，那我们可以自己给它计时啊。

于是将一些超时处理的操作套了个壳，用func_timeout库中的`@func_set_timeout`注解来设定超时时间。

成功解决。