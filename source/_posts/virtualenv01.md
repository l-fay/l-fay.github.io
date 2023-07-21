---
title: Python多环境 | python3.5上使用virtualenv创建虚拟环境的坑
date: 2023-07-15 22:45:12
tags: [Python, Virtualenv]
categories: 
  - [Python]
---

python3.5上使用virtualenv的一些问题。

<!-- more -->

搬运自[这里](https://www.cnblogs.com/Se7eN-HOU/p/16175633.html)

## 一、坑一：安装的virtualenv版本太高

显示使用virtualenv 安装虚拟环境报错　　

<img src="/images/virtualenv01/img1.png" width="60%">

出现这个问题就是说明你的virtualev安装的版本太高，降低一下版本重新安装即可，我这里使用的是15这个版本

```
pip install virtualenv==15.0.0 
```

## 二、坑2：pip的版本太高

<img src="/images/virtualenv01/img2.png" width="60%">

如果出现上面的错误，说明你的pip的版本太高，没办法，只能说是python3.5的版本太低了，工作历史遗留问题，没办法，必须要使用python3.5，只能乖乖将pip的版本

python3.5最高支持pip=20的版本

所以解决方案：将本机的pip版本降到20或20一下。

## 解决方案优化

这篇博客后边的解决方案我没用，因为手头有pip的tar安装包，直接`python setup.py install`装一下pip和对应的setuptools就好了。
