---
title: Appium | 安装时遇到的一些坑
date: 2022-10-15 18:59:48
tags: [自动化, Appium]
categories:
  - [自动化, Appium]
---

背景是有一个需要自动化操作实机安卓APP的需求，研究了一下，记录一下遇到的一些坑。

<!-- more -->

## 版本

首当其冲的就是版本问题，包括实机安卓版本、Appium版本、SDK版本，反倒是JDK版本没遇到什么幺蛾子。

### 安卓版本

这个没得选，自己的手机就是安卓12，只有一点需要注意，我的手机是realme的，需要在开发者模式中打开`禁止权限监控`才能成功连接Appium。

### SDK版本

开始的时候缺少经验，死活连不上，就是因为SDK版本和安卓版本不配套。

后来我选择使用SDK31，跟安卓12配套，这里需要注意的是，SDK31没找到单独下载，所以我装了个Android Studio，用它装SDK。

### Appium版本

这个我用的是最新的，毕竟SDK和安卓版本都挺新的。

## appium-doctor

这个东西让我纠结了好久，毕竟到最后我也没过环境检查。

后来才发现，高版本的SDK文件结构变了，本来就过不了appium-doctor的检查，吐血。

## 参数

我用的参数如下：

```
{
        "platformName": "Android",
        "appium:platformVersion": "12",
        "appium:deviceName": "ff7c5db6               device",
        "appium:appPackage": "com.abchina.mmspc",
        "appium:appActivity": ".ui.activity.WelcomeActivity",
        "appium:noReset": True,                        // 防止重置
        "appium:resetKeyboard": False,                 // 脚本执行完后重置输入法
        "appium:unicodeKeyboard": False,               // 脚本是否使用原生输入法，如果需要输入中文，这里要选True
        "appium:newCommandTimeout": 6000,              // 超过60秒无操作自动断连
        "appium:automationName": "UiAutomator2"        // 高版本要指定为‘UiAutomator2’，低版本用‘UiAutomator’

    }
```
其中appPackage和appActivity是用`adb logcat>D:/log.txt`获取log之后，搜索`Displayed`查看。

由于我要测的app重置后需要手机验证码登录，所以需要`noReset`参数来防止重置。




到这应该就能连上了。