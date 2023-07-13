---
title: ReportLab | 文本排列问题
date: 2023-07-11 21:21:16
tags: [ReportLab, Python]
categories: 
  - [Python, 常用库, ReportLab]
---

在使用ReportLab生成PDF时，遇到了大字号的文本段在换行后，上下行相互覆盖的问题。

<!-- more -->

最后解决方法是

```
p = ParagraphStyle('test')
p.leading = 120
```

简单理解就是行间距。