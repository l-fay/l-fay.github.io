---
title: re库处理正则表达式
date: 2021-01-10 17:48:39
tags: [Python, 正则表达式]
categories: 
  - [Python, 常用库, re]
---
记录一下我用的比较多的re库中的函数。

<!-- more -->

pattern是正则表达式，string是待处理的字符串。

# re.match(pattern,string)

从第一个字符开始匹配模式，如果第一个字符匹配失败，就结束运行。

总体上，这个函数用的不多。

# re.search(pattern,string)

搜索第一个满足条件的字符串，查找到第一个停止。

返回值是re对象，需要用group(0)来获取匹配结果。

没有匹配到返回值就是None。

# re.findall(pattern,string)

搜索所有满足条件的字符串。

返回值是所有符合要求的匹配结果的列表。

没有匹配到返回值就是空列表。

这个我用的最多。

# re.sub(pattern, repl, string, count=0)

类似于str.replace()，用来替换字符串中的一部分。

repl是替换结果，一般是字符串或者是返回字符串的方法。

string是待操作的字符串。

count是替换执行次数，默认为0，也就是不限次数。

# re.split(pattern,string)

在这个方法中，pattern是分割标识符，以满足这个正则表达式的字符串做分割符。

返回值是个列表。

# re.compile(pattern)

该函数根据包含的正则表达式的字符串创建模式对象。可以实现更有效率的匹配。在直接使用字符串表示的正则表达式进行search,match和findall操作时，python会将字符串转换为正则表达式对象。而使用compile完成一次转换之后，在每次使用模式的时候就不用重复转换。当然，使用re.compile()函数进行转换后，re.search(pattern, string)的调用方式就转换为 pattern.search(string)的调用方式。

```
import re
some_text = 'a,b,,,,c d'
reObj = re.compile('[, ]+')
reObj.split(some_text)
['a', 'b', 'c', 'd']
```

当然，不使用re.compile()的好处也是有的，就是理解起来更加直观。

```
import re
some_text = 'a,b,,,,c d'
re.split('[, ]+',some_text)
['a', 'b', 'c', 'd']
```

总之，re.compile()的作用表现在，使用同一正则表达式做重复匹配的时候，re.compile()可以提高匹配效率。