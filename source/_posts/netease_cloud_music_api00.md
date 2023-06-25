---
title: 网易云音乐Api
date: 2021-01-06 18:44:11
tags: [开源项目, NodeJs]
categories: 
  - [开源项目, NodeJs]
---
在这搜集一下网易云音乐的一些Api。

<!-- more -->

## ID

首先确认歌曲的ID。

下边是网易云音乐的官方地址。

https://music.163.com/#/song?id={{id}}。

id=后边的数字就是id。

## 163官方接口

### 音乐

```
https://music.163.com/song/media/outer/url?id={{id}}.mp3
```

### lrc
```
http://music.163.com/api/song/media?id={{id}}
```

## NeteaseCloudMusicApi

可以用这个开源项目

[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

[文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/)