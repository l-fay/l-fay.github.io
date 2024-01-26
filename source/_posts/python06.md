---
title: 'Python | 不同场景下使用代理的方法'
date: 2024-01-02 16:21:27
tags: [Python, Proxy]
categories: 
  - [Python, Proxy]
---

两种使用代理的方法。

<!-- more -->
## requests使用代理
```
import requests

url="xxx"
requests.get(url,proxies={"https": "xxx.xxx.xxx.xxx:xxxx","http": "xxx.xxx.xxx.xxx:xxxx"})
```
这种方式是我用的最多的，因为自己做的小项目基本上也都是用requests去做请求的。

## 设置全局变量

后来发现，requests的能力是有极限的，我从短暂的人生中学到……咳咳，串台了。

主要是用第三方包的时候，看源码里边封装了requests的请求，我也不想改源码，于是就想迂回一下找个代码里的全局代理方法。

还真被我找到了，[传送门](https://stackoverflow.com/questions/31639742/how-to-pass-all-pythons-traffics-through-a-http-proxy)。

太长不看版：

```
import requests
import os

url="xxx"
proxy='xxx.xxx.xxx.xxx:xxxx'
os.environ['http_proxy'] = proxy
os.environ['HTTP_PROXY'] = proxy
os.environ['https_proxy'] = proxy
os.environ['HTTPS_PROXY'] = proxy
requests.get(url)
```

经过测试，这个改动只对当前程序生效，并且也确实起到了代理作用，所以想封装一个函数先改全局变量，发送请求后再改回来，其实也就加几行：

```
os.environ['http_proxy'] = ""
os.environ['HTTP_PROXY'] = ""
os.environ['https_proxy'] = ""
os.environ['HTTPS_PROXY'] = ""
```
