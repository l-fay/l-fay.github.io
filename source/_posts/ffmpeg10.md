---
title: ffmpeg | 在元数据里给媒体流命名
date: 2021-11-25 14:29:59
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

最近手里有个视频，英配和中配都很好，就想都保留下来，命个名加以区别。

<!-- more -->

用到的参数主要是这个`-metadata`

```
举例：
-metadata:s:1 handler_name="汉语"

意思是编号1的流的handler_name设置为"汉语"。
```