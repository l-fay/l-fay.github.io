---
title: FFmpeg | 删除视频中的元数据
date: 2021-06-07 19:27:46
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

补充{% post_link ffmpeg03 "FFmpeg | 删除视频中的章节数据" %}

<!-- more -->

在上边那篇博客中，我提到了一个参数`-map_metadata -1`，当时觉得没有用，后来想想不太对，我之前操作的并不是元数据区，这个参数肯定没啥用。

现在我想把元数据区也清了，有些视频里有一些描述、标题啥的，看着烦，就又把这个参数捡回来了。

这个参数确实可以删除元数据，不过只能创建新文件去删除，不能直接在源文件上修改。