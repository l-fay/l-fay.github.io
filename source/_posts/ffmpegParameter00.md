---
title: ffmpeg | 参数记录
date: 2021-01-27 21:13:48
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

记录一些ffmpeg的参数。

<!-- more -->

# 选择流

这个是第一个输入视频的第一个流

```
-map 0:0
```

# 指定视频流编码

```
-c:v hevc
-vcodec hevc
```

## 用过的可选编码

```
hevc：属于h265标准，压缩率高，但是好像不能生成预览图
h264：属于h264标准，兼容性最好，能生成预览图
copy：复制输入流的编码
```

# 指定音频流编码

```
-c:a aac
-acodec aac
```

## 用过的可选编码

```
aac：常用的音频编码
copy：复制输入流的编码
```

# 设置容器封装队列的大小，

解决Too many packets buffered for output stream 0:1问题

```
-max_muxing_queue_size 1024
```

# 删除Chapter信息

```
-map_metadata -1

-map_chapters -1
```

相关实验：{% post_link ffmpeg03 'ffmpeg | 删除视频中的元数据' %}

# 添加封面文件
```
-disposition:0 attached_pic
```