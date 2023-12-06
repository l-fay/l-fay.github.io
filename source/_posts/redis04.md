---
title: Python连接Redis连接池
date: 2021-10-22 14:27:36
tags: [数据库, Redis, Python]
categories: 
  - [数据库, Redis]
  - [Python, 常用库, redis]
---

记录一下怎么用python连接Redis连接池。

<!-- more -->

## 安装依赖

```
pip install redis-py-cluster
```

## Demo

直接上demo。

```
import time
import redis
from redis.lock import Lock

class Redis:
    def __init__(self, config):
        self.expire = 1800,
        self.redis_pool = redis.ConnectionPool(
            host=config.REDIS_HOST,
            port=config.REDIS_PORT,
            password=config.REDIS_PASSWORD,
            db=config.REDIS_DB,
            decode_responses=config.REDIS_DECODE_RESPONSES,
            max_connections=config.REDIS_MAX_CONNECTIONS)

    # 从连接池中获取连接，获取不到就一直等待
    def __get_connect(self):
        while (1):
            try:
                connect = redis.Redis(connection_pool=self.redis_pool)
                return connect
            except:
                time.sleep(5)

    def get(self, key: str) -> str:
        with self.__get_connect() as redis:
            return redis.get(key)

    def set(self, key, value, expire=None):
        if expire is None:
            expire = self.expire
        with self.__get_connect() as redis:
            redis.setex(key, expire, value)

    def get_list(self, key) -> list:
        with self.__get_connect() as redis:
            return redis.lrange(key, 0, -1)

    # 加锁，拿不到锁就一直等待
    def get_lock(self, key="common_lock", timeout=5):
        with self.__get_connect() as redis:
            lock = redis.lock(key, timeout=timeout)
            locked = lock.acquire(blocking=True, blocking_timeout=1)
        if locked:
            print("获取锁" + key + "成功。")
            return lock
        else:
            print("获取锁" + key + "失败。")
            time.sleep(5)
            return self.get_lock(key, timeout)

    def release_lock(self, lock: Lock):
        try:
            lock.release()
            print("释放锁成功。")
        except Exception as e:
            print(e)
            print("释放锁失败，可能已经被释放。")

    def append(self, key: str, value: str):
        with self.__get_connect() as redis:
            redis.rpush(key, value)

    def pop(self, key: str):
        with self.__get_connect() as redis:
            return redis.lpop(key)

    def lenth(self, key: str):
        with self.__get_connect() as redis:
            redis.set(key,"空")
            redis.delete()

    def delete(self, key: str):
        with self.__get_connect() as redis:
            return redis.llen(key)

```