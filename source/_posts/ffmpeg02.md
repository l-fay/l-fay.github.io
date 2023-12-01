---
title: FFmpeg | Too many packets buffered for output stream 0:1
date: 2021-01-26 19:39:20
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---
报错
```
Too many packets buffered for output stream 0:1
```

<!-- more -->

# 复现

使用的命令为

```
ffmpeg -i "input.mp4" -map 0:1 -vcodec hevc -map 0:0 -acodec copy "output.mp4"
```

由于我是用python进行批处理，所以只有中间某一个视频报了这个错误

```
Too many packets buffered for output stream 0:1
```

所以应该是视频的原因。

# 分析

网上说原因是有些视频数据有问题，导致视频处理过快，容器封装时队列溢出。

按我个人的理解，就是有的流封装的不严谨，导致数据流的信息密度变大了。

我这也没法测试它说的对不对，就先记下这个错误，之后再遇到了就能快速解决。

# 解决方法

加上`-max_muxing_queue_size 1024`参数，增大容器封装队列的大小。

由于是`stream 0:1`出现的问题，所以是音频流的问题。把参数加到音频流后边。

我也没测这个参数是全局参数还是针对单个流的参数，所以直接把参数加到音频流后边了。

完整命令为

```
ffmpeg -i "input.mp4" -map 0:1 -vcodec hevc -map 0:0 -acodec copy -max_muxing_queue_size 1024 "output.mp4"
```