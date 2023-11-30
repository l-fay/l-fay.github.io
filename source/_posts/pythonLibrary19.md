---
title: 'Faker | 生成各种类型的随机数据'
date: 2023-11-29 20:31:50
tags: [Faker, Python]
categories: 
  - [Python, 常用库, Faker]
---

这是一个可以用来生成各种随机信息的库，可以用于测试、开发和原型设计等场景。

<!-- more -->

## 安装

```
pip install faker
```

## 使用

直接上示例代码

```
from faker import Faker
from faker.providers import internet  # 导入 internet

# faker = Faker(locale='en')
faker = Faker(locale='zh_CN')
faker.add_provider(internet)

for i in range(10):
    # 随机名字
    name = faker.name()
    # 随机地址
    address = faker.address()
    # 随机email
    email = faker.email(domain="aaa.com")
    # 随机密码
    password = faker.password()
    # 随机手机号
    phone_number = faker.phone_number()
    # 随机ipv4地址
    ipv4_private = faker.ipv4_private()
    print(name + ',' + address + ',' + email + ',' + password + ',' + phone_number + ',' + ipv4_private)

```

## 官方文档

[文档地址](https://faker.readthedocs.io/en/stable/)