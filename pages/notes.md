---
title: 'Notes - Hongbusi'
display: 'Notes'
subtitle: 'Quick notes / tips.'
description: 'Quick notes / tips.'
---

## `commit-msg` 钩子被忽略

_2021/12/20_

``` bash
提示：因为没有将钩子 '.husky/commit-msg' 设置为可执行，钩子被忽略。
提示：您可以通过配置 `git config advice.ignoredHook false` 来关闭这条警告。
```

原因是 `commit-msg` 自定义的钩子在执行中权限不足，无法被执行。

增加文件的执行权限 `chmod +x commit-msg`。

## `.gitignore` 不生效

_2021/10/26_

在项目开发过程中，一般都会添加 `.gitignore` 文件，规则很简单，但有时会发现，规则不生效。

原因是 `.gitignore` 只能忽略那些原来没有被 `track` 的文件，如果某些文件已经被纳入了版本管理中，则修改 `.gitignore` 是无效的。

把本地缓存删除（改变成未 track 状态），然后再提交。

``` bash
git rm -r --cached .

git add .

git commit -m 'update .gitignore'
```

## `Charles` proxy

_2021/03/17_

[Charles](https://www.charlesproxy.com)

Step: `Help` -> `SSL Proxying` -> `Install Charles Root Certificate on a Mobile Device or Remote Browser`

## View `key`

_2021/02/24_

Mac: `cat ~/.ssh/id_rsa.pub`
