---
title: Shadowsocks | 在Linux上部署Shadowsocks服务端
date: 2021-01-09 18:40:37
tags: [Linux, Proxy, Shadowsocks]
categories: 
  - [Linux, Proxy]
  - [Proxy, Shadowsocks]
---

因为校园网限流，所以想整个代理，让宿舍的网络下载东西的时候走实验室电脑，曲线实现免流。

<!-- more -->
{% blockquote %}
主要参考：https://www.zlxian.com/index.php/archives/170/
{% endblockquote %}

由于实验室有个刚买的服务器，就想在这个服务器上搭一下。

前几天刚把服务器装了Ubuntu 18.04 LTS。

所以后边的全都是基于这个环境。

## 安装Shadowsocks

```
pip install shadowsocks
```

## 启动服务

两种启动方式，分别记录一下。

不管哪种方式运行，都可能会出现这个错误：

```
AttributeError: /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanup
```

原因在于Shadowsocks函数名的改动。

解决方法：{% post_link proxy00 解决方法 %}

### 命令配置运行

```
ssserver -p 443 -k password -m aes-256-cfb  // ssserver -p 服务器端口 -k 密码 -m 加密方法
ssserver -p 443 -k password -m aes-256-cfb -d start // -d start 代表后台运行

```

### 配置文件运行

一、首先创建/etc/shadowsocks/目录。

二、然后在/etc/shadowsocks/目录下创建配置文件：

```
vim /etc/shadowsocks/conf.json
```

如果是用当前服务器做vpn，`your_server_ip`填写`0.0.0.0`

单用户配置：
```
/ 单用户配置
{ 
  "server":"your_server_ip",     // 你的服务器ip
  "server_port":8388,            // 端口号（每一个账号都不能重复）
  "local_address": "127.0.0.1",  // 本地地址，一般不变
  "local_port":1080,             // 本地端口，一般不变
  "password":"*********",        // 连接密码
  "timeout":300,                 // 相应超时时间
  "method":"aes-256-cfb",        // 加密方式
  "fast_open": false             //  使用TCP_FASTOPEN, 参数选项true   false，一般保持默认即可
}
```

多用户配置：

```
// 多用户配置  
{ 
    "server":"your_server_ip", 
    "local_address": "127.0.0.1", 
    "local_port":"1080", 
    "port_password":{      
         "8989":"password0",           
         "9001":"password1",      
         "9002":"password2",      
         "9003":"password3",      
         "9004":"password4"
     }, 
     "timeout":"300", 
     "method":"aes-256-cfb", 
     "fast_open": false
}
```

如果手机连接 配置如下

加密方法 aes-256-cfb

协议origin

混淆方式

plain

```
配置说明：
 
字段  说明
server          ss服务监听地址
server_port     ss服务监听端口
local_address   本地的监听地址
local_port      本地的监听端口
password        密码
timeout         超时时间，单位秒
method          加密方法，默认是aes-256-cfb
fast_open       使用TCP_FASTOPEN, true / false
workers         workers数，只支持Unix/Linux系统

```

三、根据配置文件启动

```
ssserver -c /etc/shadowsocks/conf.json start // 前台运行
ssserver -c /etc/shadowsocks/conf.json -d start // 后台运行
ssserver -c /etc/shadowsocks/conf.json -d stop // 停止服务
```

ps：如果出现错误的话，就先杀死进程，重新启动就可以了。

```
pkill ssserver
```

客户端安装

windows下载

https://github.com/shadowsocks/shadowsocks-windows

安卓版下载

https://github.com/shadowsocks/shadowsocks-android