---
title: Tkinter | 初学Tkinter
date: 2021-03-22 15:57:06
tags: [Python, 可视化]
categories: 
  - [Python, 可视化]
  - [Python, 常用库, tkinter]
---
起因是我写了一些自己用的小工具，不想每次调用的时候改里边的文件路径，也不想每次都调出命令行打一堆参数。所以就想自己做个一可视化界面，把操作封装进去，多省事。

<!-- more -->

`tkinter`的框架：

```
import tkinter as tk  # 使用Tkinter前需要先导入
from tkinter import filedialog

# 实例化object，建立窗口window
window = tk.Tk()

# 给窗口的可视化起名字
window.title('示例')

# 设定窗口的大小(长 * 宽)
window.geometry('500x300')

# 主窗口循环显示
window.mainloop()
```

在这个框架中加东西就好了：

| 方法 | 子方法 | 说明 |
|:-----:|:-----:|:-----:|
| tk.StringVar() |  | 创建一个存储string类型对象的变量。 |
|  | .set(string) | tk.StringVar()的set方法。 |
|  | .get(string) | tk.StringVar()的get方法。 |
| tk.Label(window, textvariable=video_path, bg='white', fg='black', font=('Arial', 18), height=2) |  | 创建一个存储string类型对象的变量。 |

控件：
```
from tkinter import filedialog
# Label控件，主要用来显示文字。
# 说明： bg为背景，fg为字体颜色，font为字体，width为长，height为高，这里的长和高是字符的长和高，比如height=2,就是标签有2个字符这么高。
l1 = tk.Label(window, textvariable=video_path, bg='white', fg='black', font=('Arial', 18), height=2)
# 控件要摆放后才能使用。
l1.pack() 


# 定义一个函数功能（内容自己自由编写），供点击Button按键时调用，调用命令参数command=函数名
def select_video():
    default_dir = r"F:\Downloads"
	# 获取选择到的文件的路径
    file_path = filedialog.askopenfilename(title=u'选择文件', initialdir=(os.path.expanduser(default_dir)))
    video_path.set(file_path)


b1 = tk.Button(window, text='选择视频文件', font=('Arial', 12), width=10, height=1, command=select_video)
b1.pack()

# 输入框，'show'的值为默认替换显示，值为'*'时，效果就像输密码一样。
entry = tk.Entry(window, show=None)
#对文本框内容进行打包
entry.pack()
```