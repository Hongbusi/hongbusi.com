---
title: 'Promise'
date: '2022-04-17'
duration: 30 min
---

## 异步任务的处理

以一个实际例子作为切入点：

- 调用一个函数，在这个函数中发送网络请求（这里使用定时器模拟）；
- 如果网络请求发送成功，那么告知调用者发送成功；
- 如果网络请求发送失败，那么告知调用者发送失败。

``` js
function requestData(url, successCallback, failureCallback) {
  setTimeout(() => {
    if (url === '/test') {
      // 发送成功
      successCallback('发送成功')
    } else {
      // 发送失败
      failureCallback('发送失败')
    }
  }, 1000)
}

function successCallback(res) {
  console.log(res)
}
function failureCallback(err) {
  console.log(err)
}
requestData('/test', successCallback, failureCallback)
```

在上面的解决方案中，我们确实可以解决请求函数得到结果之后，获取到对应的回调，但是它存在两个主要的问题：

- 需要自己来设计回调函数、回调函数名称、回调函数的使用等；
- 对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以便可以理解这个函数到底怎么用。

## 什么是 Promise?

我们来看一下 `Promise` 的 API 是怎么样的：

- `Promise` 是一个类，可以翻译成承诺、许诺、期约；
- 当需要给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个 `Promise` 的对象；
- 在通过 `new` 创建 `Promise` 对象时，需要传入一个回调函数，我们称之为 `executor`。
  - 这个回调函数会被立即执行，并且给传入另两个对调函数 `resolve`、`reject`；
  - 当调用 `resolve` 回调函数时，会执行 `Promise` 对象的 `then` 方法传入的回调函数；
  - 当调用 `reject` 回调函数时，会执行 `Promise` 对象的 `catch` 方法传入的回调函数。

## Promise 的代码结构

``` js
const promise = new Promise((resolve, reject) => {
  // 调用 resolve, 那么 then 传入的回调函数会被执行
  resolve('resolve')
  // 调用 reject, 那么 catch 传入的回调函数会被执行
  reject('reject')
})

promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

上面 `Promise` 使用过程，我们可以将它划分成三个状态：

- 待定（`pending`）：初始状态，既没有被兑现，也没有被拒绝，当执行 `executor` 中的代码时，处于该状态；
- 已兑现（`fulfilled`）: 意味着操作成功完成，执行了 `resolve` 时，处于该状态；
- 已拒绝（`rejected`）: 意味着操作失败，执行了 `reject` 时，处于该状态。

## Promise 重构请求

``` js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === '/test') {
        resolve('发送成功')
      } else {
        reject('发送失败')
      }
    }, 1000)
  })
}
```

## Executor

Executor 是在创建 `Promise` 时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数：

``` js
new Promise((resolve, reject) => {
  console.log('executor code')
})
```

通常我们会在 Executor 中确定我们的 `Promise` 状态：

- 通过 `resolve`，可以兑现（`fulfilled`）`Promise` 的状态，我们也可以称之为已决议（`resolved`）；
- 通过 `reject`，可以拒绝（`reject`）`Promise` 的状态。

这里需要注意：一旦状态被确定下来，`Promise` 的状态会被锁死，该 `Promise` 的状态是不可更改的。

- 在我们调用 `resolve` 的时候，如果 `resolve` 传入的值本身不是一个 `Promise`，那么会将该 `Promise` 的状态变成兑现（`fulfilled`）；
- 在之后我们去调用 `reject` 时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变 `Promise` 状
态）。

## resolve 不同值的区别

情况一：如果 `resolve` 传入一个普通的值或者对象，那么这个值会作为 `then` 回调的参数；

``` js
new Promise((resolve, reject) => {
  resolve('normal resolve')
}).then(res => {
  connsole.log(res)
})
```

情况二：如果 `resolve` 中传入的是另外一个 `Promise`，那么这个新 `Promise` 会决定原 `Promise` 的状态；

``` js
new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('第二个 Promise 的 resolve')
    }, 1000);
  }))
}).then(res => {
  console.log(res)
})
```

情况三：如果 `resolve` 中传入的是一个对象，并且这个对象有实现 `then` 方法，那么会执行该 `then` 方法，并且根据
`then` 方法的结果来决定 `Promise` 的状态。

``` js
new Promise((resolve, reject) => {
  resolve({
    then: function(resolve, reject) {
      resolve('thenable value')
    }
  })
}).then(res => {
  console.log(res)
})
```

## then 方法 - 接受两个参数

`then` 方法是 `Promise` 对象上的一个方法：它其实是放在 `Promise` 的原型上的 `Promise.prototype.then`。

`then` 方法接受两个参数：

- `fulfilled` 的回调函数：当状态变成 `fulfilled` 时会回调的函数；
- `reject` 的回调函数：当状态变成 `reject` 时会回调的函数。

``` js
promise.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
// 等价于
promise.then(res => {
  console.log(res)
}).catch(, err => {
  console.log(err)
})
```

## then 方法 - 多次调用

一个 `Promise` 的 `then` 方法是可以被多次调用的：

- 每次调用我们都可以传入对应的 `fulfilled` 回调；
- 当 `Promise` 的状态变成 `fulfilled` 的时候，这些回调函数都会被执行。

``` js
promise.then(res => {
  console.log('res1:', res)
})

promise.then(res => {
  console.log('res2:', res)
})
```

## then 方法 – 返回值

`then` 方法本身是有返回值的。它的返回值是一个 `Promise`，但是 `then` 方法返回的 `Promise` 到底处于什么样的状态呢？

`Promise` 有三种状态，那么这个 `Promise` 处于什么状态呢？

- 当 `then` 方法中的回调函数本身在执行的时候，那么它处于 `pending` 状态；
- 当 `then` 方法中的回调函数返回一个结果时，那么它处于 `fulfilled` 状态，并且会将结果作为 `resolve` 的参数；
  - 情况一：返回一个普通的值；
  - 情况二：返回一个 `Promise`；
  - 情况三：返回一个 `thenable` 值。
- 当 `then` 方法抛出一个异常时，那么它处于 `reject` 状态。

## catch 方法 - 多次调用

`catch` 方法也是 `Promise` 对象上的一个方法：它也是放在 `Promise` 的原型上的 `Promise.prototype.catch`。

一个 `Promise` 的 `catch` 方法是可以被多次调用的：

- 每次调用我们都可以传入对应的 `reject` 回调；
- 当 `Promise` 的状态变成 `reject` 的时候，这些回调函数都会被执行。

``` js
promise.catch(err => {
  console.log('err1:', err)
})

promise.catch(err => {
  console.log('err2:', err)
})
```

## catch 方法 - 返回值

事实上 `catch` 方法也是会返回一个 `Promise` 对象的，所以 `catch` 方法后面我们可以继续调用 `then` 方法或者 `catch` 方法。

下面的代码，后续是 `res` 打印，这是因为 `catch` 传入的回调在执行完后，默认状态依然会是 `fulfilled` 的。

``` js
promise.catch(err => {
  console.log(err)
}).then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})
```

那么如果我们希望后续继续执行 `catch`，那么需要抛出一个异常。

``` js
promise.catch(err => {
  console.log(err)
  throw new Error('error')
}).then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})
```

## finally 方法

`finally` 是在 ES9（ES2018）中新增的一个特性：表示无论 `Promise` 对象无论变成 `fulfilled` 还是 `reject` 状态，最终都会被执行的代码。

`finally` 方法是不接收参数的，因为无论前面是 `fulfilled` 状态，还是 `reject` 状态，它都会执行。

``` js
const promise = new Promise((resolve, reject) => {
  resolve('fulfilled')
  reject('reject')
})

promise.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
}).finally(() => {
  console.log('finally')
})
```

## resolve 方法

前面我们学习的 `then`、`catch`、`finally` 方法都属于 `Promise` 的实例方法，都是存放在 `Promise` 的 `prototype` 上的。下面我们再来学习一下 `Promise` 的类方法。

有时候我们已经有一个现成的内容了，希望将其转成 `Promise` 来使用，这个时候我们可以使用 `Promise.resolve` 方
法来完成。

`Promise.resolve` 的用法相当于 `new Promise`，并且执行 `resolve` 操作。

``` js
Promise.resolve('Hongbusi')
// 等价于
new Promise((resolve) => resolve('Hongbusi'))
```

`resolve` 参数的形态：

- 情况一：参数是一个普通的值或者对象；
- 情况二：参数本身是 `Promise`；
- 情况三：参数是一个 `thenable`。

## reject 方法

`reject` 方法类似于 `resolve` 方法，只是会将 `Promise` 对象的状态设置为 `reject` 状态。

`Promise.reject` 的用法相当于 `new Promise`，只是会调用 `reject`。

``` js
Promise.reject('Hongbusi')
// 等价于
new Promise((resolve, reject) => reject('Hongbusi'))
```

`Promise.reject` 传入的参数无论是什么形态，都会直接作为 `reject` 状态的参数传递到 `catch` 的。

## all 方法

还有一个类方法是 `Promise.all`。它的作用是将多个 `Promise` 包裹在一起形成一个新的 `Promise`。

新的 `Promise` 状态由包裹的所有 `Promise` 共同决定：

- 当所有的 `Promise` 状态变成 `fulfilled` 状态时，新的 `Promise` 状态为 `fulfilled`，并且会将所有 `Promise` 的返回值组成一个数组；
- 当有一个 `Promise` 状态为 `reject` 时，新的 `Promise` 状态为 `reject`，并且会将第一个 `reject` 的返回值作为参数。

``` js
const p1 = new Promise((resolve, reject) => {
  // resolve('resolve1')
  // reject('reject1')
})
const p2 = new Promise((resolve, reject) => {
  // resolve('resolve2')
  // reject('reject2')
})
const p3 = new Promise((resolve, reject) => {
  // resolve('resolve3')
  // reject('reject3')
})

Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

## allSettled 方法

`all` 方法有一个缺陷：当有其中一个 `Promise` 变成 `reject` 状态时，新 `Promise` 就会立即变成对应的 `reject` 状态。那么对于 `resolved` 的，以及依然处于 `pending` 状态的 `Promise`，我们是获取不到对应的结果的；

在 ES11（ES2020）中，添加了新的 API `Promise.allSettled`：

- 该方法会在所有的 `Promise` 都有结果（`settled`），无论是 `fulfilled`，还是 `reject` 时，才会有最终的状态；
- 并且这个 `Promise` 的结果一定是 `fulfilled` 的。

``` js
const p1 = new Promise((resolve, reject) => {
  resolve('resolve1')
})
const p2 = new Promise((resolve, reject) => {
  reject('reject2')
})
const p3 = new Promise((resolve, reject) => {
  resolve('resolve3')
})
Promise.allSettled([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

我们来看一下打印的结果：

- `allSettled` 的结果是一个数组，数组中存放着每一个 `Promise` 的结果，并且是对应一个对象的；
- 这个对象中包含 `status` 状态，以及对应的 `value` 值。

``` js
[
  { status: 'fulfilled', value: 'resolve1' },
  { status: 'rejected', reason: 'reject2' },
  { status: 'fulfilled', value: 'resolve3' }
]
```

## race 方法

如果有一个 `Promise` 有了结果，我们就希望决定最终新 `Promise` 的状态，那么可以使用 `race` 方法。`prace` 是竞技、竞赛的意思，表示多个 `Promise` 相互竞争，谁先有结果，那么就使用谁的结果。

``` js
Promise.race([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

## any 方法

`any` 方法是 ES12 中新增的方法，和 `race` 方法是类似的：

- `any` 方法会等到一个 `fulfilled` 状态，才会决定新 `Promise` 的状态；
- 如果所有的 `Promise` 都是 `reject` 的，那么也会等到所有的 `Promise` 都变成 `rejected` 状态。

``` js
Promise.any([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

如果所有的 `Promise` 都是 `reject` 的，那么会报一个 `AggregateError` 的错误。

## 手写 Promise

``` js
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  }
  catch (err) {
    reject(err)
  }
}

class HbsPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn()
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach((fn) => {
            fn()
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    }
    catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = (err) => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = (value) => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HbsPromise((resolve, reject) => {
      // 1. 如果在 then 调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }

      if (this.status === PROMISE_STATUS_REJECTED) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2. 将成功回调和失败回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HbsPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new HbsPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new HbsPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise, index) => {
        promise.then((res) => {
          values[index] = res
          if (values.length === promises.length) {
            resolve(values)
          }
        }, (err) => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    return new HbsPromise((resolve) => {
      const values = []
      promises.forEach((promise, index) => {
        promise.then((res) => {
          values[index] = {
            status: PROMISE_STATUS_FULFILLED,
            value: res
          }

          if (values.length === promises.length) {
            resolve(values)
          }
        }, (err) => {
          values[index] = {
            status: PROMISE_STATUS_REJECTED,
            reason: err
          }
          if (values.length === promises.length) {
            resolve(values)
          }
        })
      })
    })
  }

  static race(promises) {
    return new HbsPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    return new HbsPromise((resolve, reject) => {
      const reasons = []
      promises.forEach((promise, index) => {
        promise.then(resolve, (err) => {
          reasons[index] = err
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }
}
```

## 简单总结手写 Promise

### 一. Promise 规范

[Promises/A+](https://promisesaplus.com)

### 二. Promise 类设计

``` js
class HbsPromise {}
```

``` js
function HbsPromise() {}
```

### 三. 构造函数的规划

``` js
class HbsPromise {
  constructor(executor) {
   	// 定义状态
    // 定义 resolve、reject 回调
    // resolve 执行微任务队列：改变状态、获取 value、then 传入执行成功回调
    // reject 执行微任务队列：改变状态、获取 reason、then 传入执行失败回调
    
    // try catch
    executor(resolve, reject)
  }
}
```

### 四. then 方法的实现

```js
class HbsPromise {
  then(onFulfilled, onRejected) {
    // this.onFulfilled = onFulfilled
    // this.onRejected = onRejected
    
    // 1.判断 onFulfilled、onRejected，会给默认值
    
    // 2.返回 Promise resolve/reject
    
    // 3.判断之前的 promise 状态是否确定
    // onFulfilled/onRejected 直接执行（捕获异常）
    
    // 4.添加到数组中 push(() => { 执行 onFulfilled/onRejected 直接执行代码 })
  }
}
```

### 五. catch 方法

``` js
class HbsPromise {
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
```

### 六. finally

``` js
class HbsPromise {
  finally(onFinally) {
    return this.then(() => { onFinally() }, () => { onFinally() })
  }
}
```

### 七. resolve/reject

``` js
class HbsPromise {
  static resolve(value) {
    return new HbsPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new HbsPromise((resolve, reject) => reject(reason))
  }
}
```

### 八. all/allSettled

核心：要知道 `new Promise` 的 `resolve、reject` 在什么情况下执行。

all：

- 情况一：所有的都有结果；
- 情况二：有一个 `reject`。

allSettled：

- 情况：所有都有结果，并且一定执行 `resolve`。

### 九. race/any

race:

- 情况：只要有结果。

any:

- 情况一：必须等到一个 `resolve` 结果；
- 情况二：都没有 `resolve`，所有的都是 `reject`。
