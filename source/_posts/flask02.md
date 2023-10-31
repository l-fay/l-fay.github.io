---
title: 'Flask异常处理'
date: 2023-10-29 15:39:21
tags: [Python, Flask]
categories:
  - [Python, 常用库, flask]
---

在访问过程中，有两种方式可以中断请求，一是抛出错误码，二是抛出异常。

<!-- more -->

# abort中断请求

```
from flask import  abort
 
@app.route('/')
def index():
    abort(401)
```

# 抛出异常

```
raise [exceptionName [(reason)]]
```

# 异常处理

errorhandler捕捉当前蓝图错误，app_errorhandler捕捉全局错误，下边是例子：

```
from flask import Blueprint
from application.common.classes.Result import Result
from application.common.constant.HttpCode import HttpCode

handler_blu = Blueprint("handler_blu", __name__)


@handler_blu.app_errorhandler(HttpCode.UNAUTHORIZED)
def unauthorized():
    return Result.error(HttpCode.UNAUTHORIZED, "token已过期或未登陆！")


@handler_blu.app_errorhandler(Exception)
def exception():
    return Result.error(500, "未知异常")

```