---
title: 'Python连接MySQL连接池'
date: 2021-10-21 20:53:30
tags: [数据库, MySQL, Python]
categories: 
  - [数据库, MySQL]
  - [Python, 常用库, mysql-connector-python]
---

记录一下怎么用python连接MySQL连接池。

<!-- more -->

## 安装依赖

```
pip install mysql-connector-python
```

## Demo

直接上demo。

```
import time
from mysql.connector.pooling import MySQLConnectionPool

class MySql:

    def __init__(self, config):
        self.expire = 1800
        self.mysql_pool = MySQLConnectionPool(
            host=config.MYSQL_HOST,
            port=config.MYSQL_PORT,
            user=config.MYSQL_USER,
            passwd=config.MYSQL_PASSWORD,
            database=config.MYSQL_DATABASE,
            ssl_disabled=config.SSL_DISABLED,
            pool_size=config.MYSQL_MAX_CONNECTIONS
        )

    def __get_connection(self):
        try:
            conn = self.mysql_pool.get_connection()
            return conn
        except:
            time.sleep(5)

    def select(self, sql: str, arg=None):
        if not arg == None and not isinstance(arg, tuple):
            arg = (arg,)
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(sql, arg)
                result = cur.fetchall()
                return result

    def insert(self, sql: str, arg=None):
        if not arg == None and not isinstance(arg, tuple):
            arg = (arg,)
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(sql, arg)
                    conn.commit()
                    return True
                except Exception as e:
                    print(e)
                    conn.rollback()
                    return False

    def update(self, sql: str, arg=None):
        if not arg == None and not isinstance(arg, tuple):
            arg = (arg,)
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(sql, arg)
                    conn.commit()
                    return True
                except Exception as e:
                    print(e)
                    conn.rollback()
                    return False

    def alter(self, sql: str, arg=None):
        if not arg == None and not isinstance(arg, tuple):
            arg = (arg,)
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(sql, arg)
                    conn.commit()
                    return True
                except Exception as e:
                    print(e)
                    conn.rollback()
                    return False

    def get_index(self, table: str):
        sql = """
        show 
        INDEX 
        from 
        """ + table + """
         
        where 
        not Key_name = 'PRIMARY'
        """
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(sql)
                    result = cur.fetchall()
                    index_names = []
                    for i in result:
                        index_names.append(i[2])
                    return index_names
                except Exception as e:
                    print(e)
                    conn.rollback()
                    return []

    def truncate(self, sql: str, arg=None):
        if not arg == None and not isinstance(arg, tuple):
            arg = (arg,)
        with self.__get_connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(sql, arg)
                    conn.commit()
                    return True
                except Exception as e:
                    print(e)
                    conn.rollback()
                    return False
```