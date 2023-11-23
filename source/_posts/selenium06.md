---
title: 'Selenium | Docker里的Chrome浏览器自动化过程报错'
date: 2023-11-22 18:37:43
tags: [Python, 自动化, Selenium]
categories:
  - [Python, 常用库, Selenium]
  - [自动化, Selenium]
---

记录下Docker里的Chrome浏览器自动化过程报错以及解决方法。

<!-- more -->

## session deleted because of page crash

用Docker启动的Chrome容器，可用空间默认只有64M，太小了容易崩溃。

在创建容器时设置shm-size为500M即可，如果是命令行启动，加上`--shm-size="500M"`。

## 'WebDriver' object has no attribute 'execute_cdp_cmd'

在{% post_link selenium05 连接远程Chrome %}的情况下，调用`execute_cdp_cmd`执行cdp命令（比如{% post_link selenium02 隐藏Selenium特征 %}）时会报这个错，应该是远程浏览器不支持此函数直接执行cdp命令，一切行为都要通过url进行。

可以自己封装一个函数来在远程浏览器上执行cdp命令：

```
def execute_cdp_cmd(driver, cmd, params={}):
    resource = "/session/%s/chromium/send_command_and_get_result" % driver.session_id
    url = driver.command_executor._url + resource
    body = json.dumps({'cmd': cmd, 'params': params})
    response = driver.command_executor._request('POST', url, body)
    return response.get('value')
with open('resource/stealth.min.js') as f:
    js = f.read()
```
对比：
```
# 本地函数
drive.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {"source": js})

# 远程函数
execute_cdp_cmd(browser, "Page.addScriptToEvaluateOnNewDocument", {"source": js})
```

结构还是比较相似的。