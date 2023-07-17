---
title: ReportLab | 生成表格
date: 2023-07-11 21:25:37
tags: [ReportLab, Python]
categories: 
  - [Python, 常用库, ReportLab]
---

在用ReportLab生成PDF时有加入表格的需求。

<!-- more -->

[参考文章](https://blog.csdn.net/cloveses/article/details/79667247)

具体的见上文，这里就写下我自己用到的部分代码。

```
from reportlab.platypus import Table

    def append_table(self, table_data_list, style=""):
        if style == "":
            style_list = [
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),  # 字的颜色
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # 水平对齐
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),  # 垂直对齐
                ('GRID', (0, 0), (-1, -1), 1, colors.black),  # 边框颜色
                ('FONTSIZE', (0, 0), (-1, -1), 23),  # 字体大小
                ('FONT', (0, 0), (-1, -1), '汉语'),  # 字体
                ('BOTTOMPADDING', (0, 0), (-1, -1), 20),  # 单元格下方距离
                ('TOPPADDING', (0, 0), (-1, -1), 2)  # 单元格上方距离
            ]
            style = TableStyle(style_list)
        # lishu.alignment = 1
        table = Table(table_data_list)
        table.setStyle(style)
        self.elements.append(table)
```