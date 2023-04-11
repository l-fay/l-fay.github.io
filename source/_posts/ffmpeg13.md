---
title: ffmpeg | 如何将视频内封图片字幕压为硬字幕
date: 2023-04-11 16:54:20
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

作为一个电影仓鼠党，喜欢将字幕压制为硬字幕，这样不管什么设备都能正常播放。

<!-- more -->

有的时候没有合适的ass文件，但是却有内封的图片字幕比如HXXX字幕，所以需要一个将视频内封图片字幕压为硬字幕的方法。

## 解决

在[这篇博客](https://blog.csdn.net/feiyu5323/article/details/103331975)找到了方法，很像机翻的文档，我也懒得找了，这就挺好的。

```
ffmpeg -i input.mkv -filter_complex "[0:v:0][0:s:0]overlay[v]" -map "[v]" -map 0:a:0 <output options> output.mkv
```

命令的核心在于

```
-filter_complex "[0:v:0][0:s:0]overlay[v]" -map "[v]"
```
逻辑大致就是通过视频滤镜将字幕叠加到视频上。

很完美。