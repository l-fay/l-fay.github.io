---
title: 缓存 | @Cacheable注解函数内部调用不生效
date: 2023-10-30 16:40:47
tags: [Java, Spring]
categories:
  - [Java, Spring]
---

出现问题的原因：Spring cache的实现原理是基于AOP的动态代理实现的：即都在方法调用前后去获取方法的名称、参数、返回值，然后根据方法名称、参数生成缓存的key(自定义的key例外)，进行缓存。this调用不是代理对象的调用,  所以aop失效,注解失效。

解决办法就是，我们获取当前Bean,由它来调用。

<!-- more -->

# SpringContextUtil 

```
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
 
/**
 *不依赖于Autowired而使用java代码快速获取到spring管理的bean
 */
@Component
@Lazy(false)
public class SpringContextUtil  implements ApplicationContextAware {
	 private static ApplicationContext applicationContext;
	 public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		 SpringContextUtil .applicationContext = applicationContext;
	 }
	 public static ApplicationContext getApplicationContext() {
	     return applicationContext;
	 }
	 public static Object getBean(String name) {
	     return getApplicationContext().getBean(name);
	 }
	 public static <T> T getBean(Class<T> clazz) {
	     return getApplicationContext().getBean(clazz);
	 }
	 public static <T> T getBean(String name, Class<T> clazz) {
	     return getApplicationContext().getBean(name, clazz);
	 }
}
```

# Service 调用

```
package com.mark.pay.service;
 
import com.mark.pay.bean.User;
import com.mark.pay.common.spring.SpringContextUtil;
import com.mark.pay.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;
 
@Service
@CacheConfig(cacheNames = "user",cacheManager = "cacheManager")
public class TestService {
 
    @Autowired
    UserMapper userMapper;
 
    @Cacheable( key ="#id")
    public User query(Integer id) {
        return userMapper.selectByPrimaryKey(id);
    }
 
 
    public User testCacheQuery(Integer id){
        TestService service = SpringContextUtil.getBean(TestService.class);
        return service.query(id);
    }
}
```

# 参考资料

[Springboot Cache @Cacheable 类内部调用时不生效，解决办法](https://blog.csdn.net/qq_36990177/article/details/109755106)