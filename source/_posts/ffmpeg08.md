---
title: FFmpeg | preset参数
date: 2021-07-14 17:16:36
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

这是一个用编码时间来换视频质量的参数。

<!-- more -->

`-preset`的所有的预设按照编码速度降序排列为：
`ultrafast`,`superfast`,`veryfast`,`faster`,`fast`,`medium`,`slow`,`slower`,`veryslow`,`placebo`
默认为`medium`。

根据[这篇文章](https://blog.csdn.net/vblittleboy/article/details/8982857)的说法，设置为`-preset veryslow`比较理想。