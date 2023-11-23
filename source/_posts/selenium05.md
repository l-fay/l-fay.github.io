---
title: 'Selenium | 操作Docker里的Chrome浏览器'
date: 2023-11-22 18:18:45
tags: [Python, 自动化, Selenium]
categories:
  - [Python, 常用库, Selenium]
  - [自动化, Selenium]
---

主要是在Nas里用Docker布了一个Chrome，用来执行爬虫。

<!-- more -->

## 镜像选择

能用Selenium调用的Chrome镜像有两个，`selenium/standalone-chrome`和`selenium/standalone-chrome-debug`，后者能在执行Selenium代码的时候启动一个VNC服务，能用VNC看看执行过程是否符合预期。VNC的默认端口是5900，默认密码是secret。

具体镜像怎么怎么启动就不展开了，我是用Nas的图形界面启动的，没用命令行，所以不太了解。

## 连接

使用Selenium连接的时候和Appium比较像，使用远程地址进行连接。

```
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
###
# 在这添加各种配置
###

# 普通的浏览器调用方式
# browser = webdriver.Chrome(chrome_options=chrome_options)

# 远程浏览器调用方式，后边的/wd/hub不能省略
browser = webdriver.Remote("http://192.168.50.150:9516/wd/hub", options=chrome_options)
```
连接起来之后就和正常调用没区别了，正常Selenium代码就行。