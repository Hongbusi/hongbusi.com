---
title: '项目搭建'
date: '2021-12-19'
duration: '15 min'
---

## 一、集成 `editorconfig` 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

``` yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型（lf | cr | crlf）
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

在 VSCode 中使用需要安装插件：[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)。

## 二、husky & lint-staged（为后续操作做准备）

### 1. 安装
``` bash
pnpm add husky lint-staged -D
```

### 2. 编辑 package.json，准备脚本并运行一次

``` bash
# npm version 7.x
npm set-script prepare "husky install"
npm run prepare
```

## 三、使用 `ESLint` 检测

ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

### 1. 安装

``` bash
pnpm add eslint @hongbusi/eslint-config -D
```

### 2. 创建 `.eslintrc` 配置文件

``` json
{
  "extends": "@hongbusi"
}
```

你通常不需要 `.eslintignore`，因为它已由预设提供。

### 3. 在 `package.json` 中添加 script

``` json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 4. 结合 husky & lint-staged 进行校验

在 `package.json` 中添加 lint-staged 配置：

``` json
{
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx,json,md}": "eslint --fix"
  }
}
```

使用 husky 生成 pre-commit 文件，触发 eslint：

``` bash
npx husky add .husky/pre-commit "npx lint-staged"
```

建议不要在使用 `eslint` 的时候再去使用 `prettier`。这个配置已经做了相当多的格式化 lint，把剩下的灵活性和样式留给开发人员。

在 VSCode 中使用需要安装插件 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

## 三、git commit 规范

commitlint 是一个帮助我们编写规范 commit message 的工具。

### 1. 安装

``` bash
pnpm add @commitlint/cli @commitlint/config-conventional -D
```

### 2. 添加配置文件

在根目录创建 commitlint.config.js 文件，配置 commitlint：

``` bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### 3. commit 规范

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改（white-space, formatting, missing semi colons, etc） |
| refactor | 代码重构（refactor）                                         |
| perf     | 改善性能（A code change that improves performance）          |
| test     | 测试（when adding missing tests）                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具（比如更改测试环境）                     |
| revert   | 代码回退                                                     |

### 4. 结合 husky 校验

使用 husky 生成 commit-msg 文件，验证提交信息：

``` bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

感谢阅读，下次再见。
