---
title: 'FFmpeg | pcm格式音频转换'
date: 2023-11-22 19:12:34
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

在对接一个语音服务时，发现他们用的是pcm格式的音频做处理，所以需要把手中的其他格式音频处理成pcm格式。

<!-- more -->

直接上代码：

```
ffmpeg -i 1.mp3 -c:a pcm_s16le -f s16le -ac 1 -ar 16000 1.pcm
```