---
title: ffmpeg | 用过的参数记录
date: 2022-02-11 12:45:54
tags: [ffmpeg]
categories: 
  - [ffmpeg]
---
记录用过的参数。

<!-- more -->
<style>
table th:first-of-type {
    width: 2cm;
}
table th:nth-of-type(2) {
    width: 50pt;
}
table th:nth-of-type(3) {
    width: 8em;
}
</style>
| 参数 | 用过的值 | 解释 |
|:-----:|:-----:|:-----:|
| -c:a | aac | 转音频为aac格式 |
| -c:v | h264 | 转视频为h264格式 |
|  | hevc/h265 | 转视频为hevc格式 |
| -strict | -2 | 早期版本aac是实验格式，想用aac需要这个参数强制使用 |
| -profile:a | aac_low | 命令跟在`-c:a aac`之后，用来选择profile |
| -profile:v | main | 命令跟在`-c:a hevc`之后，用来选择profile |
| -crf | 25 | 固定码率因子，越小码率越大，18一般认为是视觉无损的，h264默认值是23，h265默认值是28，我一般都用25 |
| -map_metadata | -1 | 删除所有流的元数据 |
| -map_chapters | -1 | 删除所有章节数据 |
| -max_muxing_queue_size | 1024 | 解决`Too many packets buffered for output stream 0:0.`问题 |
| -vf | subtitles=xxx.ass | 压制字幕 |
| -filter_complex | "subtitles=xxx.ass" | 压制字幕，多个值一起用时用逗号隔开 |
|  | "crop=1920:800:0:140" | 用来将1920x1080去上下黑边为1920x800 |
|  | "crop=1280:534:0:93" | 用来将1280x720去上下黑边为1280x534 |
|  | "crop=w:h:x:y" | 以视频帧的(x,y)位置为起始，剪出宽w高h的帧 |
| -ac | 2 | 命令跟在`-c:a aac`之后，强制立体声而不是5.1 |
|  | 3 | 2.1 |
|  | 4 | 4.0 |
|  | 5 | 5.0 |
|  | 6 | 5.1 |
