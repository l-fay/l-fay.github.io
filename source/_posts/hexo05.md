---
title: Hexo | 新电脑上使用之前的博客文件夹
date: 2022-07-04 23:07:57
tags: [Hexo]
categories: 
  - [Hexo]
---

本教程旨在自用，针对的是已有Hexo的博客文件夹的群体，新配置的不要看这个，跳过了很多新配置的必须步骤。

<!-- more -->

## 安装Git
在官网下载安装，此处不展开。
配置环境变量：
`D:\Git\bin（记得换成实际安装位置）`
`git --version` 验证安装。

## 安装NodeJs
在官网下载长期维护版安装。
`node -v` 验证安装。

## 安装Hexo
在博客文件夹下运行 `npm install hexo-cli -g` 。
`hexo -v` 验证安装。

到这一步，之前自己改的scripts啥的都能保留，但是需要修改js文件里的路径配置，自己检查下。

## 连接GitHub上的已有仓库
输入 `git config --global user.name "你GitHub账号的名字"` 。
注：由于我也是小白，不知道这名字有啥用，我输入的是GitHub里 `Setting - Public profile - Name` 的值。
再输入 `git config --global user.email "你GitHub账号的邮箱"` 。
再输入 `ssh-keygen -t rsa -C "你GitHub账号的邮箱"` 生成SSH Key，什么也不用输入，直接按三次回车确定。
看下上一步命令行中提示的路径，进入相应文件夹打开 `id_rsa.pub` 文件，将里边的内容复制一下。
然后在GitHub里 `Setting - SSH and GPG keys - SSH keys` 点击 `new SSH key` ，输入名字和刚复制的key，名字主要是为了区分这是哪个电脑的key，自己取一下作区分就好。
然后把旧的不用的key清理一下。
在博客文件夹下运行 `npm install hexo-deployer-git --save` 安装GitHub推送插件。

## 安装next主题
```
git clone git@github.com:gonghs/hexo-theme-next.git themes/next
```
如果有自己的配置文件的话，再将配置文件覆盖掉。

到这就大功告成了，试试 `hexo g` 和 `hexo d` 吧！