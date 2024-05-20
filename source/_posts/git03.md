---
title: 'Git | 同时提交到两个git地址'
date: 2024-05-19 20:56:17
tags: [Git]
categories: 
  - [Git]
---

需要给同一个项目设置两个远程git地址，主要是为了灾备。

<!-- more -->

## 增加一个git地址
添加地址：
```
git remote set-url --add origin xxxxxxxx.git
```
查看地址：
```
git remote -v
```

然后就OK了。