---
title: 代理 | 开源项目proxy_pool
date: 2020-09-08 13:24:27
tags: [开源项目, 代理, Python, 爬虫]
categories: 
  - [开源项目, Python]
  - [爬虫, 代理, Python]
---
这是一个自动收集网络免费代理的项目

对很多爬虫项目来说很有用

<!-- more -->

[项目地址](https://github.com/jhao104/proxy_pool)

# 项目依赖

- Python3.7
- {% post_link redis01 Redis %}


# 配置和使用

## 克隆

	git clone https://github.com/jhao104/proxy_pool.git

## 安装依赖库

	pip install -r requirements.txt

## 配置

setting.py

	# ############### server config ###############
	HOST = "0.0.0.0" # 表示指向本机

	PORT = 5010 # 表示使用5010端口
	# 这样配置的话，访问地址为http://127.0.0.1:5010

	# ############### database config ###################
	# db connection uri
	# example:
	#      Redis: redis://:password@ip:port/db
	#      Ssdb:  ssdb://:password@ip:port
	DB_CONN = 'redis://:@127.0.0.1:6379/0'
	# 由于Redis默认是没有密码的，所以连接语句删掉了password字段

如果你有其他的代理地址，可以在fetcher/proxyFetcher.py中自行拓展

## 启动

首先启动`Redis`

	# 如果已经具备运行条件, 可用通过proxyPool.py启动。
	# 程序分为: schedule 调度程序 和 server Api服务

	# 启动调度程序
	python proxyPool.py schedule

	# 启动webApi服务
	python proxyPool.py server

## 使用
- Api
启动web服务后, 默认配置下会开启 http://127.0.0.1:5010 的api接口服务:
| Api | Method | Description | arg |
|:-----:|:-----:|:-----:|:-----:|
| / | GET | api介绍 | None |
| /get | GET | 随机获取一个代理	 | None |
| /get_all | GET | 获取所有代理 | None |
| /get_status | GET | 查看代理数量 | None |
| /delete | GET | 删除代理 | proxy=host:ip |

- Python使用

```python
proxies = requests.get("http://127.0.0.1:5010/get_all/").json()
```





















