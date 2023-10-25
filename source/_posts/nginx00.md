---
title: Nginx | 限制上传速度
date: 2023-05-20 15:30:03
tags: [Nginx]
categories: 
  - [Nginx]
---

使用nginx限制上传速度的配置。

<!-- more -->

资料来自[Stack Overflow](https://stackoverflow.com/questions/65275764/nginx-limit-upload-speed)

没啥好写的，搬运一下。

首先要确保Nginx是支持stream的，不然只能重装。

```
static:

$ ./configure --with-stream
$ make && sudo make install
dynamic

$ ./configure --with-stream=dynamic
https://www.nginx.com/blog/compiling-dynamic-modules-nginx-plus/
```

然后就是改Nginx配置做限速。

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1;
}

# 1)
# Add a stream
# This stream is used to limit upload speed
stream {

    upstream site {
        server your.upload-api.domain1:8080;
        server your.upload-api.domain1:8080;
    }

    server {

        listen    12345;

        # 19 MiB/min = ~332k/s
        proxy_upload_rate 332k;

        proxy_pass site;

        # you can use directly without upstream
        # your.upload-api.domain1:8080;
    }
}

http {

  server {
    
    # 2)
    # Proxy to the stream that limits upload speed
    location = /upload {
        
        # It will proxy the data immediately if off
        proxy_request_buffering off;
        
        # It will pass to the stream
        # Then the stream passes to your.api.domain1:8080/upload?$args
        proxy_pass http://127.0.0.1:12345/upload?$args;
   
    }

    # You see? limit the download speed is easy, no stream
    location /download {
        keepalive_timeout  28800s;
        proxy_read_timeout 28800s;
        proxy_buffering off;

        # 75MiB/min = ~1300kilobytes/s
        proxy_limit_rate 1300k;

        proxy_pass your.api.domain1:8080;
    }

  }

}
```