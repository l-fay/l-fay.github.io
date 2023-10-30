---
title: Nexus | Not authorized for requested path xxxx
date: 2023-10-28 16:30:32
tags: [Nexus]
categories:
  - [Nexus]
---

上传组件失败报错。

<!-- more -->

经过检查，发现是上传者的账号没有上传包的权限，在账号的roles中增加下权限就好了。

```
nx-repository-view-maven2-仓库名-edit

nx-repository-view-maven2-仓库名-add
```