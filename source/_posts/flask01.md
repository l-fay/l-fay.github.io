---
title: 'Flask | RuntimeError: No application found. Either work inside a view function or push an application context.'
date: 2023-10-28 17:14:12
tags: [Python, Flask]
categories:
  - [Python, 常用库, flask]
---

问题在于调用时找不到flask的app，就算用current_app，也会在不被flask管理的模块中调用时遇到此错误。

<!-- more -->

# 解决方法

使用flask_apscheduler模块

```
pip install flask-apscheduler
```

然后新建一个`APScheduler`对象

```
from flask_apscheduler import APScheduler

scheduler = APScheduler()
```

后续遇到需要使用app的时候，按如下调用：

```
from application.scheduler import scheduler

app = scheduler.app
```

其中import的位置自己改。