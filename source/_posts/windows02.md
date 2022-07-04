---
title: WindowsServer2008R2安装
date: 2022-05-16 13:57:59
tags: [Windows]
categories: 
  - [Windows]
---

因为一些特殊需求，受人委托装WindowsServer2008R2系统，记录一下。

<!-- more -->

首先，这个系统的ISO里是wim文件，而不是gho文件，所以一些装机软件用不了，当然我用的老毛桃，也还行。

其次，装下来之后发现不能外接U盘，但是我没有这需求，也就没管。

最后，没有网卡驱动，这个还是费了点事，先去[英特尔官网](https://www.intel.cn/content/www/cn/zh/download/15591/intel-network-adapter-driver-for-windows-server-2008-r2-final-release.html?wapkw=windows%20server%202008%20r2%E7%9A%84%E7%BD%91%E5%8D%A1%E9%A9%B1%E5%8A%A8)下载驱动。

在PE里拷到电脑上后安装，总共三个电脑，有两个直接装就成功了，还有一个安装出错，显示没找到英特尔显卡。

于是在网上找方法，在这篇[博客](https://blog.csdn.net/weixin_36044301/article/details/118472862)里找到了能用的解决方法。

在安装过程中需要手动选择网卡型号，我在已经装好的两台设备上查看了型号之后选了一样的型号，装完就好了。

总结下装网卡驱动时的难点在于找到相应的网卡型号，因为在没装驱动前设备管理器中的显示五花八门，不能直接用，直接装驱动出问题的原因应该也是网卡名称不对。