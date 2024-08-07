---
title: 'Proxy | 代理分类'
date: 2024-01-20 19:17:06
tags: [Proxy]
categories: 
  - [Proxy]
---

记一下代理的几种分类。

<!-- more -->

首先放一个检测网站[网址](http://httpbin.org/ip)，可以在这个网站上检测代理的分类，下文细说。

## 透明代理
透明代理仅仅是对原始的网络请求做了转发，请求IP没变。
应用范围很小，约等于掩耳盗铃。
透明代理在检测网站里显示的还是你的原始IP。

## 普匿代理
又叫匿名代理、普通代理。
普匿代理可以将请求IP换成代理IP，但是服务端仍然能从请求中获知真实IP。
应用范围是需要简单的IP替换行为，例如简单访问有网络限制的站点、登录海外社媒平台等，只是解决“能不能用”的问题，对于隐藏IP没啥用。
普匿代理在检测网站里显示的是原始IP+代理IP。

## 高匿代理
高匿代理是将请求IP换成代理IP，并且服务端无法从请求中获知真实IP。
应用范围就比较广了，所有有代理需求的场景都能用高匿代理。
高匿代理在检测网站里显示的是代理IP。

## 住宅代理（存疑）
又叫真人代理、高匿真人代理、高匿住宅代理。是一个新兴概念，不是一种严格分类，也有可能是炒作的商业概念。
住宅代理本质上也是高匿代理，区别在于来源不同。高匿代理可能被网站识别为机房或已经在黑名单中。住宅代理来源于运行商，遵循运营商的IP分配逻辑。
反正我感觉是卖代理的人编的。