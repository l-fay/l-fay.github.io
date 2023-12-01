---
title: FFmpeg | hevc (Main 10) 转 hevc (Main)
date: 2022-07-07 23:40:47
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---

大部分情况下可以不指定profile直接转hevc，转完就是profile`main`，但有时默认的profile就是`main10`，更改为`main`就会报错，记录一下解决方法。

<!-- more -->

出现这种情况的原因是像素格式的问题。

像这种转不了的，一般是因为像素格式就是10bit的位深，例如`yuv420p10le`。

```
ffmpeg -i 1.mp4
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '1.mp4':
  Metadata:
    major_brand     : iso4
    minor_version   : 1
    compatible_brands: iso4hvc1iso6
    creation_time   : 2019-11-12T12:43:43.000000Z
  Duration: 03:35:25.15, start: 0.000000, bitrate: 2575 kb/s
    Stream #0:0(und): Video: hevc (Main 10) (hvc1 / 0x31637668), yuv420p10le(tv), 1920x1080 [SAR 1:1 DAR 16:9], 2349 kb/s, 23.98 fps, 23.98 tbr, 24k tbn, 23.98 tbc (default)
    Metadata:
      creation_time   : 2019-11-12T12:43:43.000000Z
    Stream #0:1(und): Audio: ac3 (ac-3 / 0x332D6361), 48000 Hz, stereo, fltp, 224 kb/s (default)
    Metadata:
      creation_time   : 2019-11-12T12:44:46.000000Z
    Side data:
      audio service type: main
```

只改变编码，不改变像素格式的话，只能转成`hevc (Main 10)`。

所以要将10bit的`yuv420p10le`改成8bit的`yuv420p`，使用`-pix_fmt`参数，如：

```
ffmpeg -i 1.mp4 -map 0:0 -c:v hevc -map 0:1 -c:a aac -pix_fmt yuv420p 2.mp4
```