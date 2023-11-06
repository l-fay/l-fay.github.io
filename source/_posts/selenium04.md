---
title: 'Selenium | 修改元素属性'
date: 2023-11-05 15:45:33
tags: [Python, 自动化, selenium]
categories:
  - [Python, 常用库, selenium]
  - [自动化, selenium]
---

Selenium修改元素属性是通过执行js语句进行的。

<!-- more -->

示例：

```
JS = 'return document.getElementsByTagName("canvas")[0].toDataURL("image/png");'
# 执行 JS 代码并拿到图片 base64 数据
im_info1 = browser.execute_script(JS1)



ele = browser.find_element_by_xpath("//button")
browser.execute_script("arguments[0].innerHTML = '新的文本'", ele)
```
其中`arguments[0]`可以看做起到了传参的作用。

可以先在浏览器控制台里测试好js代码，再用`execute_script()`方法加载进去。