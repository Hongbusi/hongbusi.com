---
title: 'Vue.js 设计与实现'
date: '2022-02-16'
duration: '10 min'
---

阅读《Vue.js 设计与实现》的收获。

## 错误处理（p23）

``` js
// utils.js
let handleError = null
export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },

  bar(fn) {
    callWithErrorHandling(fn)
  },

  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}

function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    handleError && handleError(e)
  }
}
```

``` js
// input.js
import utils from './utils.js'

// 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log(e)
})

utils.foo(() => { /*...*/ })
utils.bar(() => { /*...*/ })
```

## `WeakMap` 和 `Map` 的区别（p48）

`WeakMap` 对 `key` 是弱引用，不影响垃圾回收器的工作。据这个特性可知，一旦 `key` 被垃圾回收器回收，那么对应的键和值就访问不到了。所以 `WeakMap` 经常用于存储那些只有当 `key` 所引用的对象存在时（没有被回收）才有价值的信息，例如上面的场景中，如何 `target` 对象没有任何引用了，说明用户侧不再需要它了，这是垃圾回收器就完成回收任务。但如果使用 `Map` 来代替 `WeakMap`，那么即使用户侧的代码对 `target` 没有任何引用，这个 `target` 也不会被回收，最终可能导致内存溢出。

## `forEach` 遍历 `Set` 集合（p55）

[ECMAScript 2020 Language Specification](https://262.ecma-international.org/11.0/#sec-set.prototype.foreach)

在调用 `forEach` 遍历 `Set` 集合时，如果一个值已经被访问过了，但该值被删除并重新添加到集合，如果此时 `forEach` 遍历没有结束，那么该值会重新被访问。解决办法很简单，我们可以构造另一个 `Set` 集合并遍历它。

## 过期的副作用函数导致的竞态问题（p79）

``` js
let finalData

watch(obj, async(newValue, oldValue, onInvalidate) => {
  // 定义一个标志，代表当前副作用函数是否过期，默认为 `false`，代表没有过期
  let expired = false
  // 调用 `onInvalidate()` 函数注册一个过期回调
  onInvalidate(() => {
    // 当过期时，将 `expired` 设置为 `false`
    expired = true
  })

  // 发送网络请求
  const res = await fetch('/path/to/request')

  // 只有当该副作用函数的执行没有过期时，才会执行后续操作
  if (!expired) {
    finalData = res
  }
})
```

## 如何区分一个对象是普通对象还是函数呢？一个对象在什么情况下才能被调用呢？（p90）

通过**内部方法**和**内部槽**来区分对象，例如函数对象会部署内部方法 `[[Call]]`，而普通对象则不会。

## 什么是 Diff 算法？（p218）

当新旧 vnode 的子节点都是一个组节点时，为了以最小的性能开销完成更新操作，需要比较两组子节点，用于比较的算法就叫 Diff 算法。我们知道，操作 DOM 的性能开销通常比较大，而渲染器的核心 Diff 算法就是为了解决这个问题而诞生的。

## 组件的生命周期（p305）

``` js
function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type
  const { render, data, beforeCreate, created, beforeMount, mounted, beforeUpdate, updated } = componentOptions

  // 在这里调用 beforeCreate 钩子
  beforeCreate && beforeCreate()

  const state = reactive(data())
  
  const instance = {
    state,
    isMounted: false,
    subTree: null
  }
  vnode.component = instance

  // 在这里调用 created 钩子
  created && created.call(state)

  effect(() => {
    const subTree = render.call(state, state)
    if (!instance.isMounted) {
      // 在这里调用 beforeMount 钩子
      beforeMount && beforeMount.call(state)
      patch(null, subTree, container, anchor)
      instance.isMounted = true
      // 在这里调用 mounted 钩子
      mounted && mounted.call(state)
    } else {
      // 在这里调用 beforeUpdate 钩子
      beforeUpdate && beforeUpdate.call(state)
      patch(instance.subTree, subTree, container, anchor)
      // 在这里调用 updated 钩子
      updated && updated.call(state)
    }
    instance.subTree = subTree
  }, { scheduler: queueJob })
}
```
