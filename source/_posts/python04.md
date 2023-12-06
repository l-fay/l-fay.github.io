---
title: 'Python | 单例模式的实现'
date: 2023-12-04 21:13:56
tags: [Python]
categories: 
  - [Python]
---

单例模式应用场景就不多说了。

<!-- more -->

## 存入配置（只是像单例）

这是我之前自己捣鼓的。

我是在Flask中实例化数据库client的时候用单例，在启动项目的时候实例化一个对象，然后存进app中，再写个函数根据key去取这个对象。

你就说能不能用吧！

## 使用函数装饰器实现单例

由于装饰器函数的作用域是全局，所以装饰器函数中定义的变量也算是全局变量，所以可以在装饰器中存储对象信息。

```
def singleton(cls):
    _instance = {}
 
    def inner():
        if cls not in _instance:
            _instance[cls] = cls()
        return _instance[cls]
    return inner
    
@singleton
class Cls(object):
    def __init__(self):
        pass
 
cls1 = Cls()
cls2 = Cls()
print(id(cls1) == id(cls2)) # True
```

这种方法跟我的思路一样，区别是把类的id当做key，不用自己构建，用的时候直接创建就好，比我的方便。

## 使用类装饰器实现单例

```
class Singleton(object):
    def __init__(self, cls):
        self._cls = cls
        self._instance = {}
    def __call__(self):
        if self._cls not in self._instance:
            self._instance[self._cls] = self._cls()
        return self._instance[self._cls]
 
@Singleton
class Cls2(object):
    def __init__(self):
        pass
 
cls1 = Cls2()
cls2 = Cls2()
print(id(cls1) == id(cls2)) # True
```

这种和上一种很相似。

## 使用`__new__`关键字实现单例模式

所有的类在实例化时，都是通过`__new__`方法来完成的。

所以在`__new__`方法中应用上边的思路也可以实现单例。

```
class Single(object):
    _instance = None
    def __new__(cls, *args, **kw):
        if cls._instance is None:
            cls._instance = object.__new__(cls, *args, **kw)
        return cls._instance
    def __init__(self):
        pass
 
single1 = Single()
single2 = Single()
print(id(single1) == id(single2)) # True
```

## 优劣

类装饰器和函数装饰器适合封装后调用，在类比较多的时候很方便。

`__new__`关键字适合应用一两个类的情况。