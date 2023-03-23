---
title: '键盘侠养成计划'
description: ''
publishDate: 'Jun 01 2022'
---

## 准备工作

在 vscode 中安装 [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)。

## 第一天

| 快捷键        | 描述               |
| ------------ | ----------------- |
| `k`          | 上                 |
| `j`          | 下                 |
| `h`          | 左                 |
| `l`          | 右                 |
| `i`          | 光标前插入（insert） |
| `a`          | 光标后插入（append） |
| `esc`        | 退出 insert 模式    |
| `ctrl` + `[` | 退出 insert 模式    |

1. 在终端中使用 vim 如何退出

`:wq` 或 `:q!`。

2. `ctrl` 和 `caps` 调换位置

修改键盘设置：系统偏好设置 -> 键盘 -> 修饰键。

不过更建议直接使用 `Karabiner` 统一进行改键操作。

3. 如何可以快速的移动

- 配置：[https://github.com/VSCodeVim/Vim#mac](https://github.com/VSCodeVim/Vim#mac)；
- 修改键盘设置：系统偏好设置 -> 键盘 -> 按键重复 & 重复前延迟都调到最大。

## 第二天

| 快捷键 | 描述                               |
| ----- | --------------------------------- |
| `0`   | 移动到行首                          |
| `^`   | 移动到本行第一个不是 blank 字符的位置  |
| `$`   | 移动到行尾                          |
| `g_`  | 移动到本行最后一个不是 blank 字符的位置 |
| `I`   | 行首插入                            |
| `A`   | 行尾插入                            |
| `O`   | 行前插入                            |
| `o`   | 行后插入                            |
| `yy`  | 复制当前行                          |
| `p`   | 粘贴                               |
| `dd`  | 删除当前行                          |

对 `^` 和 `g_` 进行改键：

``` json
"vim.normalModeKeyBindings": [
  {
    "before": ["H"],
    "after": ["^"]
  },
  {
    "before": ["L"],
    "after": ["g", "_"]
  } 
]
```

## 第三天

vim 语法：操作符（operation） + 动作（区域范围）

| 快捷键 | 描述                                 |
| ----- | ----------------------------------- |
| `d`   | 操作：删除                            |
| `c`   | 操作：删除并且进入 insert 模式          |
| `y`   | 操作：复制                            |
| `e`   | 基于单词/字串的移动：移动到单词的结尾      |
| `b`   | 基于单词/字串的移动：移动到上一个单词的开头 |
| `w`   | 基于单词/字串的移动：移动到单词的开头      |
| `ge`  | 基于单词/字串的移动：移动到上一个单词的结尾 |
| `cw`  | 组合：删除当前单词                      |
| `ea`  | 组合：在当前单词结尾处添加               |

对 `^` 和 `g_` 进行改键：

``` json
"vim.operatorPendingModeKeyBindings": [
  {
    "before": ["H"],
    "after": ["^"]
  },
  {
    "before": ["L"],
    "after": ["g", "_"]
  } 
]
```

## 第四天

| 快捷键        | 描述                             |
| ------------ | ------------------------------- |
| `x`          | 删除光标所在的字符                 |
| `X`          | 删除光标前的字符                   |
| `s`          | 删除当前光标的字符并进入 insert 模式 |
| `S`          | 删除当前光标所在行并进入 insert 模式 |
| `r`          | 替换一个字符                      |
| `R`          | 替换多个字符                      |
| `u`          | 撤消上一次更改                    |
| `1` + `u`    | 撤消上 1 次更改                   |
| `ctrl` + `r` | 反转撤消                         |

## 第五天

可视化模式语法：选中 + 操作

| 快捷键        | 描述                        |
| ------------ | -------------------------- |
| `v`          | 可视化模式：字符（再按一次退出） |
| `V`          | 可视化模式：行（再按一次退出）  |
| `ctrl` + `v` | 可视化模式：块               |
| `esc`        | 退出可视化模式               |
| `ctrl` + `[` | 退出可视化模式               |
| `o`          | 导航：切换可视区的光标位置     |
| `gv`         | 导航：回到上一次选择的选择区域  |
| `A` 或 `I`   | 跨多行编辑                   |

## 第六天

语法：

- operator + （内部 / 外部） + 文本对象
- 可视化模式 + （内部 / 外部） + 文本对象

| 快捷键 | 描述 |
| ----- | --- |
| `i`   | 内部 |
| `a`   | 外部 |

| 快捷键        | 描述                                 |
| ------------ | ----------------------------------- |
| `w`       | ⼀个单词                                |
| `(` 或 `)` | ⼀对 ()                                |
| `b`       | ⼀对 ()                                 |
| `[` 或 `]` | ⼀对 []                                |
| `{` 或 `}` | ⼀对 {}                                |
| `B`       | ⼀对块 {}                               |
| `<` 或 `>` | ⼀对 \<\>                              |
| `t`       | XML标签                                 |
| `'`       | ⼀对 '                                  |
| `"`       | 一对 "                                  |
| `\``      | ⼀对 \`                                  |
| `S`       | ⼀个句⼦                                 |
| `P`       | ⼀个段落                                 |
| `ia`      | 不包含分隔符                              |
| `aa`      | 包含分隔符                                |
| `daa`     | 删除⼀个参数                              |
| `cia`     | 修改⼀个参数                              |
| `ae`      | 删除当前⽂本所有内容                        |
| `ie`      | 删除当前⽂本所有内容，但是不包含前⾯和后⾯的空格 |

## 第七天

| 快捷键        | 描述              |
| ------------ | ---------------- |
| `ctrl` + `f` | 向下滚动⼀屏       |
| `ctrl` + `b` | 向上滚动⼀屏       |
| `ctrl` + `d` | 向下滚动半屏       |
| `ctrl` + `u` | 向上滚动半屏       |
| `ctrl` + `e` | 向下滚动⼀⾏       |
| `ctrl` + `y` | 想上滚动⼀⾏       |
| `K`          | 基于配置：上 5 行  |
| `J`          | 基于配置：下 5 行  |
| `zz`         | 将当前⾏置于屏幕中央 |
| `zt`         | 将当前⾏置于屏幕顶部 |
| `zb`         | 将当前⾏置于屏幕底部 |
| `gg`         | 跳到⽂件尾         |
| `G`          | 跳到⽂件尾         |
| 行数 + `gg`   | 跳到指定⾏         |
| 行数 + `G`    | 跳到指定⾏         |

对 `K` 和 `j` 进行改键：

``` json
"vim.visualModeKeyBindings": [
  {
    "before": ["J"],
    "after": ["5", "j"]
  },
  {
    "before": ["K"],
    "after": ["5", "k"]
  }
],
"vim.normalModeKeyBindings": [
  {
    "before": ["J"],
    "after": ["5", "j"]
  },
  {
    "before": ["K"],
    "after": ["5", "k"]
  }
]
```

## 第八天

| 快捷键       | 描述                                         |
| ----------- | -------------------------------------------- |
| `f`         | 单行：正向移动到下⼀个 {char} 所在之处            |
| `F`         | 单行：反向移动到上⼀个 {char} 所在之处            |
| `t`         | 单行：正向移动到下⼀个 {char} 所在之处的前⼀个字符上 |
| `T`         | 单行：反向移动到上⼀个 {char} 所在之处的后⼀个字符上 |
| `;`         | 单行：重复上次的字符查找命令                      |
| `,`         | 单行：反转⽅向查找上次的字符查找命令               |
| `/`         | 全局：向后查                                   |
| `?`         | 全局：向前查                                   |
| `n`         | 全局：下一个                                   |
| `N`         | 全局：上一个                                   |
| `/` + 方向键 | 全局：查看搜索历史                              |
| `/` + `#`   | 全局：向上查（严格）                             |
| `/` + `*`   | 全局：向下查（严格）                             |

## 第十一天

| 快捷键        | 描述                          |
| ------------ | ---------------------------- |
| `mm`         | 定位：标记单文件                |
| `mM`         | 定位：标记多文件                |
| `'`          | 定位：跳转到标记行              |
| `\``         | 定位：跳转到标记的行和列（更精准） |
| `gd`         | 跳转到定位                     |
| `ctrl` + `i` | 跳转：向后跳                   |
| `ctrl` + `o` | 跳转：向前跳                   |

## 第十二天

vim-surround

| 快捷键                                  | 描述                                                     |
| -------------------------------------- | -------------------------------------------------------- |
| `c` + `s` + `<existing>` + `<desired>` | Change existing surround to desired                      |
| `y` + `s` + `<motion>` + `<desired>`   | Add desired surround around text defined by              |
| `d` + `s` + `<existing>`               | Delete existing surround                                 |
| `S` + `<desired>`                      | Surround when in visual modes (surrounds full selection) |

## 第十三天

1. 替换命令 `:substitute`：

- 公式：`:[range]s[substitute]/{pattern}/{string}/[flags]`
- rang（范围）:
    - `$` 到尾部
    - `%` 全文
    - `number, number`
- flag：`g` | `c`
- 可视化模式下：全部替换

2. 多选操作：`gb`

Adds another cursor on the next word it finds which is the same as the word under the cursor.

## 第十四天

| 快捷键 | 描述          |
| ----- | ------------ |
| `gh`  | 悬浮显示 hover |
| `gu`  | Normal：小写  |
| `gU`  | Normal：大写  |
| `u`   | 可视化：小写   |
| `U`   | 可视化：大写   |
| `~`   | 大小写互换     |
| `gc`  | 单行注释       |
| `gC`  | 多行注释       |

## 第十五天

| 快捷键                 | 描述                         |
| --------------------- | ---------------------------  |
| `ctrl` + `w` + `v`    | 新建窗口：左右                 |
| `ctrl` + `w` + `s`    | 新建窗口：上下                 |
| `ctrl` + `w` + `hjkl` | 窗口切换                      |
| `ctrl` + `w` + `w`    | 窗口切换                      |
| `ctrl` + `w` + `c`    | 关闭窗口                      |
| `ctrl` + `w` + `o`    | 只保留当前窗口，关闭其他所有的窗口 |

## 第十六天

删除一个函数：

| 快捷键  | 描述                  |
| ------ | -------------------  |
| `%`    | 匹配括号               |
| `dap`  | 基于段落 text-object   |
| `dal`  | 基于 vim-indent-object |
| `V$%d` | 参数多个的话 那么使⽤两次 |