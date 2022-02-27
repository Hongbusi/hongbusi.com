---
title: '`uni-app` 初体验'
date: '2022-02-24'
duration: 5 min
---

公司业务发展需要，近期要开发一个小程序，需要支持**微信小程序**和**头条小程序**。结合公司 **Vue.js** 的技术栈，目前最高效的方法就是使用 `uni-app` 去开发。

先介绍一下什么是 `uni-app`：

[uni-app](https://github.com/dcloudio/uni-app) 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。

以下是在技术调研的过程中，遇到的一些问题，或者说是抉择。

## 一、编辑器：`VS Code` 与 `HBuilderX` 如何选择？

看起来只是一个开发工具，但是对于程序员来说，无不是自己闯荡江湖的一件利器。特别是像我这种，先入为主，是不情愿花时间去熟悉其他的编辑器（当前最重要的是，VS Code 用起来确实很 nice）。

那么使用两个编译器有什么区别呢？这就要引出创建一个 uni-app 项目的两种方式：

- 通过 HBuilderX 可视化界面
- 通过 vue-cli 命令行

两种创建方式的区别：

- cli 创建的项目，编译器安装在项目下，更接近 Vue 项目的开发方式。
- HBuilderX 创建的项目，编译器会随着 HBuilderX 升级，而且预设了一系类的可视化操作（运行、发版等），降低了开发人员的上手难度。

如果是个人开发的项目，我更偏向通过 cli 去创建项目，用 VS Code 去开发。但是一个多人合作开发的项目，本着尽量降低上手难度的原则，建议选择 HBuilderX 去创建项目。

但是你也可以选择在 `VS Code` 中编写代码，用 `HBuilderX` 预览效果。

## 二、`uni-app` 对 `Vue3` 的支持如何？

Vue3 新增的 `compositon api` 让代码更加灵活，维护性更好，直呼真香。

在 `HBuilderX 3.3.0+` 版本中更新 `uni-app` 编辑器，不仅全平台支持 `Vue3.0` 开发，且全平台支持 `Vite` 编译器。

除支持 `Vue3` 语法特性外，`uni-app` 特有的生命周期钩子支持 `Composition API`，如 `onLaunch`，`onShow`，`onLoad`...

另外：`uni-app` 会保持 Vue 的版本更新，按最新的使用即可。

## 三、如何在 `<script setup>` 中使用 `uni-app` 的生命周期钩子？

``` js
<script setup>
import { onLoad, onShow } from '@dcloudio/uni-app'

onLoad(() => {
  console.log('onLoad')
})

onShow(() => {
  console.log('onShow')
})
</script>
```

## 四、`uni-app` 的维护性如何？遇到 bug 怎么办？

在通过 `cli` 创建项目的时候，看了下 `npm` 上对 [@dcloudio/uvm](https://www.npmjs.com/package/@dcloudio/uvm) 的周下载量，几乎没什么人使用，也让我多了几分担忧。

但是在使用 `uni-app` 写了一个 [demo](https://www.github.com/Hongbusi/uni-app-demo) 的过程中，遇到了一个 bug，向官方提了一个 [issues](https://github.com/dcloudio/uni-app/issues/3277)，几分钟就有人响应，并帮助解决，当然还有让我选择使用 `HBuilderX` 开发的决定（也解释了为什么 `npm` 的下载量这么少），也是打消了我的顾虑，让我对 `uni-app` 充满了期待。
