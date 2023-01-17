---
title: Selenium | canvas元素的点击问题
date: 2021-04-19 11:32:41
tags: [Python, 自动化, selenium]
categories:
  - [Python, 常用库, selenium]
  - [自动化, selenium]
---

用`selenium`写自动化脚本的时候遇到的一个有趣的细节。

<!-- more -->

因为要操作的对象是`canvas`元素，所以不能直接用点击element的办法操作，只能通过坐标来操作。

但是在具体操作的过程中，发现有的点击没有触发。

经过排查，是因为`canvas`的点击有延时，而鼠标焦点在点击之后立即移开，所以点击有时没有生效。

解决方法是点击之后焦点悬停一会，示例如下：
```
action = ActionChains(driver)
size = driver.find_element_by_id('xxxx').size
print("canvas:" + str(size))
forthHeight = size['height'] * 0.25
forthWidth = size['width'] * 0.76
action.move_by_offset(forthWidth, forthHeight).pause(0.5)
action.click()
action.click().pause(0.5)
action.move_by_offset(-forthWidth, -forthHeight).perform()
```