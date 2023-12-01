---
title: FFmpeg | attached_pic参数添加封面
date: 2021-09-08 16:34:37
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

添加封面图片的参数。

<!-- more -->

```
ffmpeg -i pic.jpg -i video.mp4 -map 1:0 -map 1:1 -map 0:0 -c copy -disposition:2 attached_pic output.mp4
```

其中`-disposition:2 attached_pic`中的参数`2`指的是视频中的第几个流，我个人习惯是视频、音频、封面这样的顺序。