---
title: Appium | Appium中一些注意事项
date: 2022-10-15 19:57:18
tags: [Python, 自动化, Appium]
categories:
  - [Python, 常用库, Appium]
  - [自动化, Appium]
---

这是在我写脚本的时候遇到的一些问题。

<!-- more -->

## XPATH

用XPATH定位经常出现找不到的问题

解决方法：换用ID定位，在`Appium Inspector`中叫`resource-id`

## 屏幕遮挡

有时用父模块去判断某个逻辑后，去获取子模块卡住，经过排查，发现是父模块能在屏幕上看到，但子模块在屏幕外，这是就无法获取子模块。

解决方法：直接用find_elements获得子模块的集合做逻辑判断

## 连接性

Appium服务的连接性有点差，所以在代码中要最小化连接次数。

基于这个原则，在条件允许的情况下，用driver.tap做点击比先find再点击要好。



总之就是能用ID不要用XPATH，能用子模块不要用父模块，能少操作就少操作。