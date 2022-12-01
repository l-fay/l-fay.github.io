---
title: Java | 用HttpServletResponse实现浏览器的文件下载
date: 2022-07-01 15:46:37
tags: [Java]
categories: 
  - [Java]
---

java中用HttpServletResponse实现浏览器的文件下载

搬运自[这篇](https://blog.csdn.net/kelekele111/article/details/123681813)博客。
<!-- more -->

## 实现效果

<img src="/images/java01/img01.png" width="100%">

## 步骤

**1. 将文件放在resources文件包下**

<img src="/images/java01/img02.png" width="60%">

**2. FileServlet类实现代码**

```
public class FileServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //1.要获取下载文件的路径
        String realPath = "E:\\开源项目\\demo\\javaweb-02-servlet\\response\\src\\main\\resources\\123.png";
        System.out.println("下载文件的位置"+realPath);
        //2.下载的文件名是啥,截取文件名
        String fileName = realPath.substring(realPath.lastIndexOf("\\") + 1);
        //3.设置让浏览器支持(Content-Disposition)下载我们需要的东西,如果文件名字为中文，需要转码，URLEncoder.encode设置文件名编码
        resp.setHeader("Content-Disposition","attachment;filename="+ URLEncoder.encode(fileName,"utf-8"));
        //4.获取下载文件的输入流
        FileInputStream in = new FileInputStream(realPath);
        //5.创建缓冲区
        int len = 0;
        byte[] buffer = new byte[1024];
        //6.获取OutputStream对象
        ServletOutputStream out = resp.getOutputStream();
        //7.将FileOutputStream流写入到buffer缓冲区，使用OutputStream将缓冲区的数据输出到客户端
        while ((len = in.read(buffer)) > 0){
            out.write(buffer,0,len);
        }

        //关闭流
        in.close();
        out.close();

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

**3. web.xml设置**

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">
  
<!--  Servlet注册，下载文件-->
  <servlet>
    <servlet-name>fileDown</servlet-name>
    <servlet-class>com.hwh.servlet.FileServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>fileDown</servlet-name>
    <url-pattern>/fileDown</url-pattern>
  </servlet-mapping>
  
</web-app>
```