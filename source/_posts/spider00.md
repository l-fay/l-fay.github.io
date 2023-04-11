---
title: 爬取微博数据
date: 2020-08-21 14:42:19
tags: [Python, 爬虫]
categories: 
  - [爬虫, Python, 微博]
---
这个就简单写写，不详细展开了。

<!-- more -->

微博有一个叫做“Sina Visitor System”的系统，如果不做任何处理，只能爬到这个系统的一些内容，无法获得想要的信息。

绕过系统的方法可参考这篇文章：

[微博爬虫——自动获取访客Cookie](https://blog.thinker.ink/passage/28/)

如果数据量比较大的话，需要使用代理，可以看下这篇文章：

{% post_link proxy_pool00 开源项目proxy_pool %}

我使用的是requests + beautifulsoup + openpyxl的组合，将数据存入excel表格。

这是openpyxl库的介绍：{% post_link pythonLibrary03 openpyxl库 %}
