---
title: Windows 每天第一次开机执行的批处理脚本模板
date: 2022-07-10 12:03:08
tags: [Windows, 批处理]
categories: 
  - [Windows, 批处理]
---

如题。

<!-- more -->

```
@echo off
set dir=%~dp0
set time=%date:~5,5%
SET cache=%dir%\cache\1.cache
if not exist %cache% (
    echo init > %cache%
)
set /p a= < %cache%
if %a%==%time% (
    SET isExecuted=1
) else (
    SET isExecuted=0
)
if %isExecuted%==0 (
    :: 把这行注释换成想执行的任务，并且替换一下1.cache文件名
    echo %time% > %cache%
    pause
    exit
) else (
    echo 今日已执行过此任务！直接跳过。
    exit
)
```