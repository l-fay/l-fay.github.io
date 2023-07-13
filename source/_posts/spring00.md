---
title: 异步 | @Async注解配置线程池
date: 2023-07-08 20:01:34
tags: [Java, Spring]
categories:
  - [Java, Spring]
---

[参考文档](https://blog.csdn.net/dyc87112/article/details/120326353)

<!-- more -->

省流版：

## 配置默认线程池
默认线程池的配置很简单，只需要在配置文件中完成即可，主要有以下这些参数：

```
spring.task.execution.pool.core-size=2
spring.task.execution.pool.max-size=5
spring.task.execution.pool.queue-capacity=10
spring.task.execution.pool.keep-alive=60s
spring.task.execution.pool.allow-core-thread-timeout=true
spring.task.execution.shutdown.await-termination=false
spring.task.execution.shutdown.await-termination-period=
spring.task.execution.thread-name-prefix=task-
```

具体配置含义如下：

```
spring.task.execution.pool.core-size：线程池创建时的初始化线程数，默认为8
spring.task.execution.pool.max-size：线程池的最大线程数，默认为int最大值
spring.task.execution.pool.queue-capacity：用来缓冲执行任务的队列，默认为int最大值
spring.task.execution.pool.keep-alive：线程终止前允许保持空闲的时间
spring.task.execution.pool.allow-core-thread-timeout：是否允许核心线程超时
spring.task.execution.shutdown.await-termination：是否等待剩余任务完成后才关闭应用
spring.task.execution.shutdown.await-termination-period：等待剩余任务完成的最大时间
spring.task.execution.thread-name-prefix：线程名的前缀，设置好了之后可以方便我们在日志中查看处理任务所在的线程池
```

亲测可用