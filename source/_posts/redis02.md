---
title: Redis的哨兵模式配置
date: 2020-11-01 14:00:37
tags: [数据库, Redis]
categories: 
  - [数据库, Redis]
---

在非自用场景下，单机的redis很明显不够用。当一台服务宕机时，需要及时启用备用服务，这就是哨兵的用处。

<!-- more -->

按我的理解，哨兵模式主要有两部分组成，主从复制和哨兵节点。

## 主从复制

主从复制没有什么新鲜的，一个主节点，若干个从节点，从节点与主节点保持数据一致，很好理解。

一台服务器上可以启动多个实例，每个实例使用不同的配置文件启动即可。这时每个实例配置文件中的pidfile需要做修改，防止冲突。

如果是在多台不同的服务器上启动redis则无需修改pidfile。

### 主节点配置

配置文件就在redis安装路径的根目录下，文件名为`redis.conf`。

配置如下：
```
# 端口，一般是6379
port 6379

# 节点密码
requirepass <密码>

# 同一服务器多实例时才需要
pidfile /var/run/redis_6379.pid
```

最后启动就OK了`./src/redis-server ./redis.conf`。

### 从节点配置

从节点的端口、密码和pidfile配置和主节点一致，需要额外配置的是主节点ip，不然从节点无法找到主节点，就只是一个单独的redis服务罢了。

```
# 5.0.0版本之前：
slaveof <masterip> <masterport>

# 5.0.0版本之后：
replicaof <masterip> <masterport>
```
当主节点有密码时，需要额外配置`masterauth <主节点密码>`

## 哨兵节点

其实上述主从节点配置好之后，理论上就已经可以容灾了。但是上述模式有一个缺点，就是当主节点宕机时，需要手动切换为从节点读写数据。比较麻烦的同时，也有着时效性不高的问题。

而哨兵节点就是为了解决这个问题而存在的。

哨兵节点本身只存储主从节点的IP等数据，当主节点宕机之后，哨兵节点会计算所有从节点的权值，选出一个新的主节点，并修改主从节点的配置文件。

### 哨兵节点配置

配置文件也在redis安装路径的根目录下，文件名为`sentinel.conf`。

一般要启动多个哨兵实例。

配置如下：

```
# 哨兵端口，默认为26379
port 26379

# 不限制ip
bind 0.0.0.0
    
# 让sentinel服务后台运行
daemonize yes
 
# 配置监听的主服务器，mymaster代表服务器的名称，自定义
#2代表只有两个或两个以上的哨兵认为主服务器不可⽤的时候，才会进行failover操作。
sentinel monitor mymaster <主节点ip> <主节点端口> 2
    
# sentinel auth-pass定义服务的密码，mymaster是服务名称，123456是Redis服务器密码
sentinel auth-pass mymaster <主节点密码>
    
# 超过5秒master还没有连接上，则认为master已经停止
sentinel down-after-milliseconds mymaster 5000
    
# 如果该时间内没完成failover操作，则认为本次failover失败
sentinel failover-timeout mymaster 30000
```

然后启动哨兵节点，`./src/redis-sentinel ./sentinel.conf`

再多整几个配置文件，多起几个实例，就OK了。