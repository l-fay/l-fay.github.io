---
title: Electron | 无网络的服务器怎么下载依赖
date: 2022-9-15 19:03:15
tags: [Electron, NodeJs]
categories: 
  - [Electron]
  - [NodeJs]
---

如题。

<!-- more -->

首先下载想安装的包，可以在[淘宝源](https://npm.taobao.org/mirrors)下载。

下载完放到cache文件夹，以electron包为例，注意分层。

Linux：$XDG_CACHE_HOME 或 ~/.cache/electron/

macOS：~/Library/Caches/electron/

Windows：~/AppData/local/electron/Cache

最后重新运行`npm install`。