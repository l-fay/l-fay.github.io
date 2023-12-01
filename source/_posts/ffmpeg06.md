---
title: FFmpeg | 元数据之creation_time
date: 2021-06-07 20:53:36
tags: [ffmpeg, Python]
categories: 
  - [Python, 常用库, mutagen]
  - [ffmpeg]
---

用mutagen无法处理元数据中的creation_time，根本就读不到这个数据。

<!-- more -->

测试之后，参数`-map_metadata -1`是有用的。

那么只用之后在将视频从h264转为h265的过程中添加参数`-map_metadata -1`，在添加封面的时候丢弃包括encoder在内的其他所有元数据就好了。