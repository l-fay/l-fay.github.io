---
title: Flask | flask的定时任务
date: 2023-10-22 19:32:41
tags: [Python, Flask]
categories:
  - [Python, 常用库, flask]
---

记一下flask中执行定时任务的方式

<!-- more -->

# 安装flask-apscheduler库

```
pip install flask-apscheduler
```

# 配置定时任务

## interval方式
```
from flask import Flask
import datetime
from flask_apscheduler import APScheduler

aps = APScheduler()


class Config(object):
    JOBS = [
        {
            'id': 'job1',
            'func': 'scheduler:task',
            'args': (1, 2),
            'trigger': 'interval',
            'seconds': 10
        }
    ]
    SCHEDULER_API_ENABLED = True


def task(a, b):
    print(str(datetime.datetime.now()) + ' execute task ' + '{}+{}={}'.format(a, b, a + b))


if __name__ == '__main__':
    app = Flask(__name__)
    app.config.from_object(Config())

    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    app.run(port=8000)
```

## cron方式

```
from flask import Flask
import datetime
from flask_apscheduler import APScheduler

aps = APScheduler()


class Config(object):
    JOBS = [
        {
            'id': 'job1',
            'func': 'scheduler:task',
            'args': (1, 2),
            'trigger': 'cron',
            'day': '*',
            'hour': '13',
            'minute': '16',
            'second': '20'
        }
    ]
    SCHEDULER_API_ENABLED = True


def task(a, b):
    print(str(datetime.datetime.now()) + ' execute task ' + '{}+{}={}'.format(a, b, a + b))


if __name__ == '__main__':
    app = Flask(__name__)
    app.config.from_object(Config())

    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    app.run(port=8000)
```

## 装饰器方式

这种方法需要注意的是，经过测试，被装饰的函数需要被flask管理才行。

```
from flask import Flask
from flask_apscheduler import APScheduler
import datetime


class Config(object):
    SCHEDULER_API_ENABLED = True


scheduler = APScheduler()


# interval examples
@scheduler.task('interval', id='do_job_1', seconds=30, misfire_grace_time=900)
def job1():
    print(str(datetime.datetime.now()) + ' Job 1 executed')


# cron examples
@scheduler.task('cron', id='do_job_2', minute='*')
def job2():
    print(str(datetime.datetime.now()) + ' Job 2 executed')


@scheduler.task('cron', id='do_job_3', week='*', day_of_week='sun')
def job3():
    print(str(datetime.datetime.now()) + ' Job 3 executed')


@scheduler.task('cron', id='do_job_3', day='*', hour='13', minute='26', second='05')
def job4():
    print(str(datetime.datetime.now()) + ' Job 4 executed')


if __name__ == '__main__':
    app = Flask(__name__)
    app.config.from_object(Config())

    # it is also possible to enable the API directly
    # scheduler.api_enabled = True
    scheduler.init_app(app)
    scheduler.start()

    app.run(port=8000)
```