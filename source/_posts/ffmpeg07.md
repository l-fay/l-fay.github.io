---
title: FFmpeg | crf参数
date: 2021-07-14 17:07:48
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

`crf`参数是一个控制视频质量的参数。

<!-- more -->

crf(Constant Rate Factor)，恒定速率因子。

[这篇文章](https://slhck.info/video/2017/02/24/crf-guide.html)有一个比较清晰的介绍。

对于我自己使用而言，我的需求大多是h264编码为h265，默认的`-crf 28`出来的质量我个人感觉是视觉有损的，所以压制的过程中，我一般用`-crf 23`。