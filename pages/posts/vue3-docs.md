---
title: '阅读 Vue3 官方文档的收获'
date: '2022-06-02'
---

## [简介](https://staging-cn.vuejs.org/guide/introduction.html)

### Vue 的核心功能

- 声明式渲染：Vue 通过自己的模板语法扩展了标准 HTML，使得我们可以声明式地描述基于 JavaScript 状态输出的 HTML；
- 响应性：Vue 会自动跟踪 JavaScript 状态变化并在改变发生时响应式地更新 DOM。

## [创建一个应用](https://staging-cn.vuejs.org/guide/essentials/application.html#mounting-the-app)

`.mount()` 方法应该始终在整个应用配置和资源注册完成后被调用。同时请注意，不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。

当根组件没有设置 `template` 选项时，Vue 将自动使用容器的 `innerHTML` 作为模板。

## [模板语法](https://staging-cn.vuejs.org/guide/essentials/template-syntax.html)

在底层机制中，**Vue 会将模板编译成高度优化的 JavaScript 代码**。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。

如果你对虚拟 DOM 的概念比较熟悉，并且偏向于 JavaScript 的原始力量，你也可以结合可选的 JSX 支持直接手写渲染函数而不采用模板。但请注意，这将**不会享受到和模板同等级别的编译时优化**。

### 指令

当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：

``` html
<a :[someAttr]="value"> ... </a>
```

上面的例子将会在 DOM 内嵌模板中被转换为 `:[someattr]`。如果你的组件拥有 “someAttr” property 而非 “someattr”，这段代码将不会工作。

## [响应式基础](https://staging-cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)

为保证访问代理的一致性，对同一个对象调用 `reactive()` 会总是返回同样的代理，而对一个已存在代理调用 `reactive()` 也是返回同样的代理。
