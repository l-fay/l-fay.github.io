---
title: 'Shadowsocks | AttributeError: /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanup'
date: 2021-01-09 18:32:32
tags: [Linux, Proxy, Shadowsocks]
categories: 
  - [Linux, Proxy]
  - [Proxy, Shadowsocks]
---
在Linux上部署Shadowsocks的时候遇到的问题：

错误：
```
AttributeError: /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanup
```

<!-- more -->

转载：
[解决方法](https://www.idcyunwei.org/post/220.html)

本文适用于解决openssl升级到1.1.0以上版本，导致shadowsocks2.8.2启动报undefined symbol: EVP_CIPHER_CTX_cleanup错误。
最近将kali升级到了最新版本，编译之后shadowsocks无法启动，报错如下：

INFO: loading config from ss.json
2016-12-14 22:47:50 INFO loading libcrypto from libcrypto.so.1.1
Traceback (most recent call last):
File “/usr/local/bin/sslocal”, line 11, in
sys.exit(main())
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/local.py”, line 39, in main
config = shell.get_config(True)
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/shell.py”, line 262, in get_config
check_config(config, is_local)
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/shell.py”, line 124, in check_config
encrypt.try_cipher(config[‘password’], config[‘method’])
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/encrypt.py”, line 44, in try_cipher
Encryptor(key, method)
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/encrypt.py”, line 83, in init
random_string(self._method_info[1]))
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/encrypt.py”, line 109, in get_cipher
return m[2](method, key, iv, op)
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/crypto/openssl.py”, line 76, in init
load_openssl()
File “/usr/local/lib/python2.7/dist-packages/shadowsocks/crypto/openssl.py”, line 52, in load_openssl
libcrypto.EVP_CIPHER_CTX_cleanup.argtypes = (c_void_p,)
File “/usr/lib/python2.7/ctypes/init.py”, line 375, in getattr
func = self.getitem(name)
File “/usr/lib/python2.7/ctypes/init.py”, line 380, in getitem
func = self._FuncPtr((name_or_ordinal, self))
AttributeError: /usr/lib/x86_64-Linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanup

这个问题是由于在openssl1.1.0版本中，废弃了EVP_CIPHER_CTX_cleanup函数，如官网中所说：

EVP_CIPHER_CTX was made opaque in OpenSSL 1.1.0. As a result, EVP_CIPHER_CTX_reset() appeared and EVP_CIPHER_CTX_cleanup() disappeared.
EVP_CIPHER_CTX_init() remains as an alias for EVP_CIPHER_CTX_reset().

修改方法：

用vim打开文件：vim /usr/local/lib/python2.7/dist-packages/shadowsocks/crypto/openssl.py (该路径请根据自己的系统情况自行修改，如果不知道该文件在哪里的话，可以使用find命令查找文件位置)
跳转到52行（shadowsocks2.8.2版本，其他版本搜索一下cleanup 全替换成 reset）
进入编辑模式
将第52行libcrypto.EVP_CIPHER_CTX_cleanup.argtypes = (c_void_p,)
改为libcrypto.EVP_CIPHER_CTX_reset.argtypes = (c_void_p,)
再次搜索cleanup（全文件共2处，此处位于111行），将libcrypto.EVP_CIPHER_CTX_cleanup(self._ctx)
改为libcrypto.EVP_CIPHER_CTX_reset(self._ctx)
保存并退出
启动shadowsocks服务：service shadowsocks start 或 sslocal -c ss配置文件目录
问题解决