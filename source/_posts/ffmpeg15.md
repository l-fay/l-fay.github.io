---
title: 'FFmpeg | 添加空音轨'
date: 2023-11-30 19:21:56
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

有的文件没有音轨，想添加一个空音轨。

<!-- more -->

示例：

```
ffmpeg -i input.mp4 -f lavfi -t 5 -i anullsrc=cl=stereo:r=48000 -map 0:0 -map 1:0 -c:v copy output.mp4
```

主要是把`anullsrc=cl=stereo:r=48000`当做一个正常的输入文件就可以。