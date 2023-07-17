---
title: Excel | 用openpyxl库操作Excel表格
date: 2021-01-10 16:26:55
tags: [Python, 办公, Office]
categories: 
  - [Python, 常用库, openpyxl]
  - [Office, Excel]
---
首先这个库只支持xlsx格式的文件操作，其他的8行。

xlsx是EXCEL 2007以上版本的扩展名。

<!-- more -->

# 安装


```
pip install openpyxl
```

# 创建对象

## 新建

```
from openpyxl import Workbook 
# 实例化
wb = Workbook()
# 激活 worksheet
sheet = wb.active
```

## 打开已有文件

```
from openpyxl import load_workbook
wb = load_workbook('文件名称.xlsx')
```

# 访问表

## 新建表

```
# 方式一：插入到最后(default)
sheet1 = wb.create_sheet("Mysheet") 
# 方式二：插入到最开始的位置
sheet2 = wb.create_sheet("Mysheet", 0)
```

## 选择已有的表

```
# sheet 名称可以作为 key 进行索引
sheet3 = wb["工具表1"]
sheet4 = wb.get_sheet_by_name("工具表1")
```

这俩是一样的

## 查看表名

```
# 显示所有表名
print(wb.sheetnames)
# 遍历所有表
for sheet in wb:
```

## 删除表

```
# 方式一
wb.remove(sheet)
# 方式二
del wb[sheet]
```

# 单元格操作

## 访问单元格

```
# 方法一
c = sheet['A4']
# 方法二：row 行；column 列
d = sheet.cell(row=4, column=2)
d = sheet.cell(4, 2)
# 方法三：只要访问就创建
min_row = 3
max_row = 43
min_column = 1
max_column = 9
for i in range(min_row, max_row + 1):
   for j in range(min_column, max_column + 1):
      sheet.cell(row=i, column=j)
```
从我个人体验来说，访问单一单元格用方法一最舒服，循环访问单元格用方法三最舒服。

## 修改单元格数据

```
# 方法一，返回值为cell对象
sheet.cell(row=4, column=2, value=10)
# 方法二
sheet['A1'] = 42
# 方法三
sheet.cell(6, 7).value = "哈哈"
```
方法二适合单一单元格赋值，方法一三适合循环赋值。

# 保存文件

```
wb.save('文件名称.xlsx')
```

# 其他命令

## 获取最大列和最大行

```
print(sheet.max_row)
print(sheet.max_column)
```
不太准，可能是我的数据规模太小了。

## 遍历单元格

```
sheet.rows为生成器, 里面是每一行的数据，每一行又由一个tuple包裹。
sheet.columns类似，不过里面是每个tuple是每一列的单元格。
# 因为按行，所以返回A1, B1, C1这样的顺序
for row in sheet.rows:
  for cell in row:
    print(cell.value)
 
# A1, A2, A3这样的顺序
for column in sheet.columns:
  for cell in column:
    print(cell.value)
```

还是上边的问题，因为行列最大值不准，所以会有很多None单元格。

## 根据数字得到字母，根据字母得到数字

```
from openpyxl.utils import get_column_letter, column_index_from_string
 
# 根据列的数字返回字母
print(get_column_letter(2)) # B
# 根据字母返回列的数字
print(column_index_from_string('D')) # 4
```

至此都是数据操作，风格操作我还没用上，之后用上再说。