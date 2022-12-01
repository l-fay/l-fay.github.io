---
title: Selenium | 配置Chrome的option
date: 2021-04-19 11:50:58
tags: [Python, 自动化, Selenium]
categories:
  - [Python, 常用库, Selenium]
  - [自动化, Selenium]
---

有的网站会检测Chrome配置，所以为了规避检测，大抵有两种方法。

<!-- more -->

## 方法一
```
chrome_options.add_argument("user-data-dir=path_to_userdata\\User Data")
# chrome_options.add_argument("--profile-directory=Profile 1")
chrome_options.add_experimental_option('useAutomationExtension', True)
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
```
这个方法主要是掩藏了一部分特征，但还是建议用下一个方法。

## 方法二
```
drive = webdriver.Chrome(options=chrome_options)
with open('stealth.min.js') as f:
	js = f.read()
drive.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": js})
```

直接加载现成的js文件。

至于这个文件怎么获得，我这也不贴现成的了，因为它一直在更新，就自己百度文件名`stealth.min.js`找吧。