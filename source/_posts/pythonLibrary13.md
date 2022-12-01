---
title: Selenium | iframe的操作
date: 2021-06-05 15:01:59
tags: [Python, 自动化, Selenium]
categories:
  - [Python, 常用库, Selenium]
  - [自动化, Selenium]
---

在selenium中，不能用`find_element`对iframe内元素进行直接操作

<!-- more -->

解决方法是先切换到对应的iframe，再继续操作。

```
driver.switch_to.frame("e_iframe")
```
其中，传入的参数可以是id也可以是name。

但是如果id和name都不唯一，我没测试会定位到哪，不过还可以先用`find_elements`的诸多方法定位，再切换。

```
iframe = driver.find_elements_by_tag_name('iframe')[0]
driver.switch_to.frame(iframe)
```