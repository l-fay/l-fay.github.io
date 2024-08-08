---
title: pip换源的注意事项
date: 2020-11-27 18:15:46
tags: [Anaconda, pip]
categories: 
  - [Anaconda, pip]
---

之前把pip换源了，现在要装opencv-python的3.4.11.43版本，清华源没有，就把默认源加上了`https://pypi.python.org/simple/`，顺便记一下pip换源的方法。

<!-- more -->

## 位置

linux:

修改 ~/.config/pip/pip.conf (没有就创建一个)。

windows:

直接在user目录中创建一个pip目录，如：C:\Users\xx\pip，新建文件pip.ini。

## 内容

``` bash
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
extra-index-url=
	https://pypi.mirrors.ustc.edu.cn/simple/
	https://pypi.douban.com/simple/
	https://pypi.python.org/simple/
[install]
trusted-host = tuna.tsinghua.edu.cn
	pypi.douban.com
	mirrors.ustc.edu.cn
	python.org
```

另外记一个错误写法：

``` bash
[global]
index-url=http://pypi.douban.com/simple
extra-index-url=http://mirrors.aliyun.com/pypi/simple/
extra-index-url=https://pypi.tuna.tsinghua.edu.cn/simple/
extra-index-url=http://pypi.mirrors.ustc.edu.cn/simple/
[install]
trusted-host=pypi.douban.com
trusted-host=mirrors.aliyun.com
trusted-host=pypi.tuna.tsinghua.edu.cn
trusted-host=pypi.mirrors.ustc.edu.cn
```

这样会报错：`option 'extra-index-url' in section 'global' already exists.`

## 进阶

`pip`命令不止一个配置文件地址，并且配置文件有不同的覆盖范围和加载顺序，可以用`pip -v config list`或`pip config debug`查看。