---
title: 'Selenium | 修改元素属性'
date: 2023-11-05 15:45:33
tags: [Python, 自动化, Selenium]
categories:
  - [Python, 常用库, Selenium]
  - [自动化, Selenium]
---

Selenium修改元素属性是通过执行js语句进行的。

<!-- more -->

示例：

```
ele = browser.find_element_by_xpath("//button")
browser.execute_script("arguments[0].innerHTML = '新的文本'", ele)
```
其中`arguments[0]`可以看做起到了传参的作用。

可以先在浏览器控制台里测试好js代码，再用`execute_script()`方法加载进去。