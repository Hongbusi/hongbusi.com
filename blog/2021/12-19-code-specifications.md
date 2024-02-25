---
slug: code-specifications
title: 代码规范之旅：享受自动格式化的乐趣
authors: Hongbusi
tags: [eslint]
---

## 集成 `editorconfig`

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```
# http://editorconfig.org

root = true

# 表示所有文件适用
[*]
# 设置文件字符集为 utf-8
charset = utf-8
# 缩进风格（tab | space）
indent_style = space
# 缩进大小
indent_size = 2
# 控制换行类型（lf | cr | crlf）
end_of_line = lf
# 去除行首的任意空白字符
trim_trailing_whitespace = true
# 始终在文件末尾插入一个新行
insert_final_newline = true

# 表示仅 md 文件适用以下规则
[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

在 VSCode 中使用需要安装插件：[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)。

## `husky` & `lint-staged`

为后续操作做准备。

### 1. 安装
``` bash
pnpm add husky lint-staged -D
```

### 2. 编辑 `package.json`，并运行一次

``` bash
# npm version 7.x
npm set-script prepare "husky install"
npm run prepare
```

## 使用 `eslint` 检测

ESLint 是在 `ECMAScript/JavaScript` 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

### 1. 安装

``` bash
pnpm add eslint @antfu/eslint-config -D
```

### 2. 创建配置文件
在 `package.json` 中使用 `"type": "module"`：

``` ts
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu()
```
使用 CJS：
``` ts
// eslint.config.js
const antfu = require('@antfu/eslint-config').default

module.exports = antfu()
```

想了解更多配置可见[@antfu/eslint-config](https://github.com/antfu/eslint-config)。

### 3. 在 `package.json` 中添加 script

``` json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 4. VS Code 自动修复

将以下设置添加到 `.vscode/settings.json` 中：

``` json
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml"
  ]
}
```

### 5. 结合 `husky` & `lint-staged` 进行校验

在 `package.json` 中添加 `lint-staged` 配置：

``` json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

使用 `husky` 生成 `pre-commit` 文件，触发 `eslint`：

``` bash
npx husky add .husky/pre-commit "npx lint-staged"
```

在 VSCode 中使用需要安装插件 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

> 建议不要在使用 `eslint` 的时候再去使用 `prettier`。这个配置已经做了相当多的格式化 `lint`，把剩下的灵活性和样式留给开发人员。—— Anthony Fu

## git commit 规范

`commitlint` 是一个帮助我们编写规范 commit message 的工具。

### 1. 安装

``` bash
pnpm add @commitlint/cli @commitlint/config-conventional -D
```

### 2. 添加配置文件

在根目录创建 `commitlint.config.js` 文件，配置 `commitlint`：

``` bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### 3. commit 规范

| Type     | 作用 |
| -------- | ---- |
| feat     | 新增特性 |
| fix      | 修复 Bug |
| docs     | 修改文档 |
| style    | 代码格式修改 |
| refactor | 代码重构 |
| perf     | 改善性能 |
| test     | 测试 |
| build    | 变更项目构建或外部依赖 |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令 |
| chore    | 变更构建流程或辅助工具 |
| revert   | 代码回退 |

### 4. 结合 `husky` 校验

使用 `husky` 生成 `commit-msg` 文件，验证提交信息：

``` bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

感谢阅读，下次再见。
