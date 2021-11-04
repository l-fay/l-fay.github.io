---
title: 在实验室集群上新建用户
date: 2021-01-13 15:27:19
tags: [Linux]
categories: 
  - [Linux]
---

这个只适用于实验室老区集群。

<!-- more -->

# 创建用户

```
adduser 用户名

passwd 用户名
```

# 添加环境变量

```
su 用户名

vim ~/.bashrc

source ~/.bashrc
```

添加 `export PATH=/data/anaconda3/bin:$PATH`

# 更改conda默认文件夹

把conda文件夹移到data下

这一步参考{% post_link anaconda01 迁移虚拟环境 %}

最后`conda info`确认目录更改是否成功。