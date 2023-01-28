---
title:  ffmpeg | 字体文件的抽取
date: 2023-01-17 18:05:01
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

在压字幕的过程中，发现一些mkv中自带了字体文件，于是就找了一下提取字体的方法。毕竟直接从mkv中提取的字幕一是方便，不用在网上到处找；二是不用担心找的不对。

<!-- more -->

## 存储形式

字体文件不像视频、音频或字幕那样有自己的分类，字体文件被算作附件。

所以理论上mkv里可以封装任何东西。

## 提取方法

-attach filename

将附件添加到输出文件，诸如Matroska之类的几种格式对此提供了支持。 用于呈现字幕的字体。 附件被实现为特定类型的流，因此此选项会将新的流添加到文件中。

然后可以按通常方式在此流上使用per-stream选项。 使用此选项创建的附件流将在所有其他流（即使用-map或自动映射创建的附件流）之后创建。

注意，对于Matroska，您还必须设置mimetype元数据标记：

```
ffmpeg -i INPUT -attach DejaVuSans.ttf -metadata:s:2 mimetype=application/x-truetype-font out.mkv
```
假设附件流在输出文件中排在第三位。