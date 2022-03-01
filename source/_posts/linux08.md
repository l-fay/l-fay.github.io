---
title: Ubuntu安装字体
date: 2022-03-01 14:05:23
tags: [Linux, Ubuntu, ffmpeg]
categories: 
  - [Linux, Ubuntu]
  - [ffmpeg]
---

安装字体是为了用ffmpeg压制硬字幕用的。

<!-- more -->

字体文件夹：

```
/usr/share/fonts
/usr/local/share/fonts
/home/<username>/.fonts)
```
把字体文件放入字体文件夹之后更新字体缓存：

```
sudo fc-cache -fv <字体目录>
```

查看所有字体：

```
fc-list
```

找到想用的字体后，在ASS文件里用`fc-list`显示出的名字调用。