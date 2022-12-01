---
title: Hexo | 添加搜索框
date: 2022-07-05 15:37:34
tags: [Hexo]
categories: 
  - [Hexo]
---

Hexo本身就支持搜索框，下个插件，改改设置就好。

<!-- more -->

## 装插件

```
npm install hexo-generator-searchdb --save
```

## 改站点配置

在根目录的`_config.yml`添加

```
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```

加哪都一样，我添加到了`#Site`。

## 改主题配置

在主题目录的`_config.yml`查找`local_search`，启用。

----------------------------

到这就OK了。