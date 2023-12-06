---
title: 'Python | 获取资源文件夹路径'
date: 2023-12-05 22:36:32
tags: [Python]
categories: 
  - [Python]
---

不管什么编程语言，相对路径和绝对路径的问题都很让人头疼。

<!-- more -->

## 问题

在写代码的时候，我比较倾向于使用相对路径，因为谁知道这个项目会布置到哪台服务器上，每次部署要么改代码，要么该服务器路径，太麻烦了。

但是相对路径也有自己的问题，比如在函数中获取上层甚至上上层路径就是很大的问题。

## 解决方案

上代码：

```
import os
import importlib.resources as res

def get_resources_path() -> str:
    with res.path("resources", "__init__.py") as path:
        resources_path = os.path.split(str(path))[0]
        return resources_path
```

其中`resources`是程序根目录下的一个文件夹，文件夹中有`__init__.py`文件。