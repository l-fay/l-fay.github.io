---
title: ffmpeg | 删除视频中的章节数据
date: 2021-02-05 23:03:29
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

在将收藏的视频转为h265过程中，遇到的问题。


<!-- more -->

# 问题

首先用`ffprobe`命令来查看视频信息

```
ffprobe version git-2020-02-25-36451f9 Copyright (c) 2007-2020 the FFmpeg develo
pers
  built with gcc 9.2.1 (GCC) 20200122
  configuration: --enable-gpl --enable-version3 --enable-sdl2 --enable-fontconfi
g --enable-gnutls --enable-iconv --enable-libass --enable-libdav1d --enable-libb
luray --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enab
le-libopencore-amrwb --enable-libopenjpeg --enable-libopus --enable-libshine --e
nable-libsnappy --enable-libsoxr --enable-libtheora --enable-libtwolame --enable
-libvpx --enable-libwavpack --enable-libwebp --enable-libx264 --enable-libx265 -
-enable-libxml2 --enable-libzimg --enable-lzma --enable-zlib --enable-gmp --enab
le-libvidstab --enable-libvorbis --enable-libvo-amrwbenc --enable-libmysofa --en
able-libspeex --enable-libxvid --enable-libaom --enable-libmfx --enable-ffnvcode
c --enable-cuda-llvm --enable-cuvid --enable-d3d11va --enable-nvenc --enable-nvd
ec --enable-dxva2 --enable-avisynth --enable-libopenmpt --enable-amf
  libavutil      56. 42.100 / 56. 42.100
  libavcodec     58. 73.102 / 58. 73.102
  libavformat    58. 39.101 / 58. 39.101
  libavdevice    58.  9.103 / 58.  9.103
  libavfilter     7. 77.100 /  7. 77.100
  libswscale      5.  6.100 /  5.  6.100
  libswresample   3.  6.100 /  3.  6.100
  libpostproc    55.  6.100 / 55.  6.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '1.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf58.39.101
  Duration: 02:22:59.79, start: 0.000000, bitrate: 813 kb/s
    Chapter #0:0: start 0.000000, end 675.966000
    Metadata:
      title           : Chapter 1
    Chapter #0:1: start 675.966000, end 1200.449000
    Metadata:
      title           : Chapter 2
    Chapter #0:2: start 1200.449000, end 1808.473000
    Metadata:
      title           : Chapter 3
    Chapter #0:3: start 1808.473000, end 2360.608000
    Metadata:
      title           : Chapter 4
    Chapter #0:4: start 2360.608000, end 2936.642000
    Metadata:
      title           : Chapter 5
    Chapter #0:5: start 2936.642000, end 3542.413000
    Metadata:
      title           : Chapter 6
    Chapter #0:6: start 3542.413000, end 4136.882000
    Metadata:
      title           : Chapter 7
    Chapter #0:7: start 4136.882000, end 4654.107000
    Metadata:
      title           : Chapter 8
    Chapter #0:8: start 4654.107000, end 5315.184000
    Metadata:
      title           : Chapter 9
    Chapter #0:9: start 5315.184000, end 6046.790000
    Metadata:
      title           : Chapter 10
    Chapter #0:10: start 6046.790000, end 6654.856000
    Metadata:
      title           : Chapter 11
    Chapter #0:11: start 6654.856000, end 7252.578000
    Metadata:
      title           : Chapter 12
    Chapter #0:12: start 7252.578000, end 7812.554000
    Metadata:
      title           : Chapter 13
    Chapter #0:13: start 7812.554000, end 7968.919000
    Metadata:
      title           : Chapter 14
    Chapter #0:14: start 7968.919000, end 8579.785000
    Metadata:
      title           : Chapter 15
    Stream #0:0(und): Video: hevc (Main 10) (hev1 / 0x31766568), yuv420p10le(tv,
 progressive), 1920x800 [SAR 1:1 DAR 12:5], 811 kb/s, 23.98 fps, 23.98 tbr, 24k
tbn, 23.98 tbc (default)
    Metadata:
      handler_name    : VideoHandler
    Stream #0:1(eng): Data: bin_data (text / 0x74786574)
    Metadata:
      handler_name    : SubtitleHandler
```

可以看到视频的元数据区有Chapter信息，还有一个Subtitle流，是之前的软字幕流，虽然这个流里边已经没有东西了，但就是去不掉。

# 尝试解决

在[论坛](https://trac.ffmpeg.org/ticket/6016)中找到了可能的方法：

```
ffmpeg -i persistant-subtitle-stream.mp4 -c:v copy -c:a copy -map_metadata -1 output.mp4
```

但是只去除了`Stream #0:1`，并没有像作者说的那样连Chapter也去掉。

于是继续寻找

在[另一个论坛](https://video.stackexchange.com/questions/20270/ffmpeg-delete-chapters)中找到了另一个解决方法

```
Try adding this ffmpeg parameter:

-map_chapters -1
```

经过测试，这个参数不仅删除了Chapter信息，还把Subtitle流顺道删除了，记录一下。

# 猜测

讲道理，看参数名，一个是`-map_metadata`，另一个是`-map_chapters`，怎么想怎么觉得这俩参数都应该删除不了`Stream #0:1`才对。

反倒是我之前尝试过的`-sn`参数才应该删除`Stream #0:1`。

再结合上边论坛的发帖时间和第一个帖子内容与我测试结果不同，推断操作元数据的一些参数在近几年进行了更新，导致适用范围和帖子描述出现一定的出入。

先总结到这，一会去更新下ffmpeg参数的那篇博客。

{% post_link ffmpegParameter 'ffmpeg | 参数记录' %}
