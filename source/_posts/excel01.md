---
title: Excel | openpyxl库操作Excel表格中的超链接
date: 2023-07-14 20:25:37
tags: [Python, 办公, Office]
categories: 
  - [Python, 常用库, openpyxl]
  - [Office, Excel]
---

有时操作单元格的超链接会报错。

<!-- more -->

## 问题

```
ws[A1].hyperlink='${工作表名}!A1'
```

有时想要这样去操作单元格的超链接，让其指向另一个sheet，会不生效。

## 原理

猜测和工作表名中的特殊字符有关

## 解决方法

换为使用HYPERLINK类而不是属性。


官方参数说明如下：

HYPERLINK (link_location，\[friendly_name\])

HYPERLINK 函数语法具有下列参数：

Link_location必需。 要打开的文档的路径和文件名。 Link_location 可以指向文档中的某个更为具体的位置 ，如 Excel 工作表或工作簿中特定的单元格或命名区域，或是指向 Microsoft Word 文档中的书签。 路径可以是存储在硬盘驱动器上的文件。 路径还可以是 Microsoft Excel 中服务器 (上的通用命名约定 (UNC) Windows) 路径，或者是 Internet 或 Intranet 上的统一资源定位符 (URL) 路径。

请注意Excel 网页版 HYPERLINK 函数仅对 web 地址 (URL) 有效。 Link_location可以是用引号括起来的文本字符串，或者是对包含链接为文本字符串的单元格的引用。

如果在单元格中指定的跳转link_location不存在或无法导航，则单击单元格时会出现错误。

Friendly_name可选。 单元格中显示的跳转文本或数字值。 Friendly_name 显示为蓝色并带有下划线。 如果省略 Friendly_name，单元格会将 link_location 显示为跳转文本。

Friendly_name 可以为数值、文本字符串、名称或包含跳转文本或数值的单元格。

如果 Friendly_name 返回错误值（例如，#VALUE!），单元格将显示错误值以替代跳转文本。

包含特殊字符是sheet_name需要用单引号包起来

## 可用代码

```
link_url =f"=HYPERLINK(\"#\'{sheet_name}\'!A1\",\"{sheet_name}\")"

ws[f'A{i}'].value = link_url
```