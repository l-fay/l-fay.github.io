---
title: 'FFmpeg | Failed to inject frame into filter network: Invalid argument'
date: 2020-12-19 14:11:44
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---
今天在给看的剧压字幕的时候遇到了错误。

<!-- more -->

我用的命令是这样：
```
cmd = 'ffmpeg -i ' + filePath + ' -map 0:0 -map 0:1 -vcodec h264 -acodec aac -vf subtitles=\'' + assPath + '\' -strict -2 ' + newFilePath + ' -y'
```

运行时的命令是：

```
ffmpeg -i F:\Downloads\IDM下载\S01\S01E01_老友记.mkv -map 0:0 -map 0:1 -vcodec h264 -acodec aac -vf subtitles='F:\Downloads\IDM下载\老友记字幕\S01\S01E01_老友记字幕.ass' -strict -2 F:\Downloads\IDM下载\S01\haveSubtitle\S01E01_老友记.mp4 -y
```

报的错是：
```
[subtitles @ 00000228ffe5f740] Unable to parse option value "DownloadsIDM下载老友记字幕S01S01E01_老友记字幕.ass" as image size
    Last message repeated 1 times
[subtitles @ 00000228ffe5f740] Error setting option original_size to value DownloadsIDM下载老友记字幕S01S01E01_老友记字幕.ass.
[Parsed_subtitles_0 @ 00000228ffe61f40] Error applying options to the filter.
[AVFilterGraph @ 00000228801f9ac0] Error initializing filter 'subtitles' with args 'F:\Downloads\IDM下载\老友记字幕\S01\S01E01_老友记字幕.ass'
Error reinitializing filters!
Failed to inject frame into filter network: Invalid argument
Error while processing the decoded data for stream #0:0
```

可以看出来命令在执行过程中，盘符没了。

WTF！？

在经过面向搜索引擎的编程之后，MD果然是盘符问题。

在Windows系统中视频滤波器之后跟的参数的等号后面不能有盘符，也就是说只能用相对路径，更改了以后用命令行试了一下，就通了。

<img src="/images/ffmpeg00/img0.png" width="60%">

搭嘎扣头哇路！

每次都要用命令行手动处理？这也太麻烦了，我写脚本就是为了批量处理，不能本末倒置。

所以我想了个解决办法。

由于我的工作目录和下载东西的目录不在一个盘符下，不能直接对比路径把绝对路径换成相对路径。

于是我决定每次压制的时候直接把ass文件复制到我的工作目录下。

由于我是用python来批量压制的，所以把ass文件复制到工作目录下，使用后再删除的操作都可以全自动实现。

一个ass文件100k都不到，感觉这个思路是可行的。

试了一下，完美运行，问题解决！