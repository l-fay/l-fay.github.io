---
title: Ubuntu网络经常掉线解决方案
date: 2022-01-07 15:07:26
tags: [Linux, Ubuntu, 远程连接]
categories: 
  - [Linux, Ubuntu]
---

症状是：每天早上起来，就不能用远程连接连Ubuntu主机，路由器里也显示主机未连接，只能插上鼠标接上显示器断开网络重新打开，很麻烦。

<!-- more -->

转载自：[这篇博客](https://www.cnblogs.com/ljxxz/p/5089863.html)

这不是疫情期间，把实验室的主机抱到寝室了，给装了个小老鼠桌面，用我Windows的远程连接去操作。经常第二天起来发现Ubuntu电脑都断网了。

用下边的方法解决了。

1、打开配置文件/etc/ppp/options
```
sudo vi /etc/ppp/options
```

2、在options文件中找到以下两行代码

```
lcp-echo-failure 4
lcp-echo-interval 30 
```

3、把`lcp-echo-failure 4`改为`lcp-echo-failure 15`

4、重启网络，完美解决。


解决了当然也要知道原因，不能好读书不求甚解嘛。

在网上找到了相关解释：

　　ppp的很多选项都是默认的，其中lcp-echo-failure次数被设为4，而lcp-echo-interval设为30秒。也就是说，如果 120秒钟之内，ADSL服务器没有给回echo-reply信号，UBuntu便会认为网络已经出了问题，就会断开网络，搞得人非常不爽。症结找到了， 问题就要解决了，打开配置文件/etc/ppp/options，将lcp-echo-failure次数设为一个较大的数值就行了，我将该值修改为 15，后面上网就比较顺利了。想想洋鬼子设为4就能用，他们得网络真他妈好，万恶的资本主义啊。