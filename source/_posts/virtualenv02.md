---
title: Python多环境 | 安装virtualenv的步骤
date: 2023-07-20 20:05:42
tags: [Python, Virtualenv]
categories: 
  - [Python]
---

这篇博客记一下安装virtualenv的通常步骤。

<!-- more -->

## 安装

### 检查python版本

低版本（3.5）有问题，详见{% post_link virtualenv01 这里 %}，下边的操作都是在3.9上进行的。

### 检查pip版本

安装之前确保pip版本不能太低，最少不能是8这么离谱。

```
pip install --upgrade pip
```

### 安装virtualenv

```
pip install virtualenv
```

### 安装virtualenvwrapper

```
pip install virtualenvwrapper
```

### 编辑环境变量

这一步总共需要编辑4个路径，
`WORKON_HOME`是虚拟环境目录，这个是自己想放哪就放哪。

`VIRTUALENVWRAPPER_PYTHON`是调用virtualenvwrapper的python路径，就填安装virtualenvwrapper的那个python路径。
可以用`which python`查看你当前的`python`位置。

`VIRTUALENVWRAPPER_VIRTUALENV`是virtualenv的路径。
可以用`find / -name virtualenv 2>/dev/null`查找virtualenv的路径。

最后是`virtualenvwrapper.sh`脚本位置。
可以用`find / -name virtualenvwrapper.sh 2>/dev/null`查找脚本位置。

用`vim ~/.bashrc`编辑用户环境变量。

```
export WORKON_HOME=/xxx/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/xxx/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/xxx/virtualenv
# virtualenvwrapper.sh所在目录
source /xxx/virtualenvwrapper.sh
```

编辑完记得重新读取生效。

```
source ~/.bashrc
```

### 创建虚拟环境测试

使用上一步配置的默认python版本创建新环境

```
mkvirtualenv env_name
```

指定本地python版本创建新环境

```
mkvirtualenv --python=/xxx/bin/python env_name
```

## 常用命令

查看所有环境

```
workon
```

激活某个虚拟环境

```
workon env_name
```

退出当前虚拟环境

```
deactivate
```


删除某个虚拟环境

```
rmvirtualenv env_name
```


进入当前虚拟环境目录

```
cdvirtualenv
```

## 常见问题
有时装了多个python时，会出现`python`和`pip`命令指向的不是用一个环境的问题。

这时可以用`python -m pip`去代替`pip`，这样装上的包一定是和`python`同一个环境。