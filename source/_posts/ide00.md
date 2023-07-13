---
title: JetBrains全家桶无法打开Terminals问题解决
date: 2023-07-10 20:03:02
tags: [IDE]
categories:
  - [IDE]
---

在arm架构的linux机上用JetBrains全家桶如PyCharm和Idea会有打不开Terminals的问题。

<!-- more -->

[解决办法](https://github.com/JetBrains/pty4j/issues/82)

最终解决就是用的这个issue里的方法，编译一个`libpty.so`，放到`ide安装路径/lib/pty4j-native/linux/x86/`

其中`linux`文件夹下有很多子文件夹，保险起见我每个子文件夹都放了一个`libpty.so`，问题解决。