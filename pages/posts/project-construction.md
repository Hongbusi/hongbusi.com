---
title: 'Project construction'
date: '2021-12-19'
duration: '20 min'
---

## 一、代码规范

### 1.1. 集成 `editorconfig` 配置

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

VSCode 需要安装一个插件：`EditorConfig for VS Code`

### 1.2. 使用 `prettier` 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1. 安装 prettier

``` bash
yarn add prettier -D
```

2. 配置 `.prettierrc` 文件

* useTabs：使用 tab 缩进还是空格缩进，选择 false；
* tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
* printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
* singleQuote：使用单引号还是双引号，选择 true，使用单引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
* semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

``` json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3. 创建 `.prettierignore` 忽略文件

```
/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4. VSCode 需要安装 `prettier` 的插件

5. 测试 prettier 是否生效

在 package.json 中配置一个 scripts：

``` json
  "prettier": "prettier --write ."
```

### 1.3. 使用 `ESLint` 检测

1. Install

``` bash
yarn add eslint @hongbusi/eslint-config -D
```

2. Config `.eslintrc` in package.json

``` json
{
  "extends": [
    "@hongbusi"
  ]
}
```

3. Config `.eslintignore`

```
dist
public
```

4. Add script for package.json

``` json
{
  "scripts": {
    "lint": "eslint \"**/*.{vue,ts,js}\""
  }
}
```

> 建议不要在使用 eslint 的时候再去使用 prettier。这个配置已经做了相当多的格式化 lint，把剩下的灵活性和样式留给开发人员。

想要了解更多可查看 <GitHubLink repo="Hongbusi/configs" />

5. VSCode 需要安装 ESLint 插件

6. 解决 eslint 和 prettier 冲突的问题

``` bash
yarn add eslint-plugin-prettier eslint-config-prettier -D
```

添加 prettier 插件：

``` json
extends: [
  "eslint:recommended",
  "@vue/prettier",
  "plugin:prettier/recommended"
]
```

### 1.4. git Husky 和 eslint

虽然我们已经要求项目使用 eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

* 也就是我们希望保证代码仓库中的代码都是符合 eslint 规范的；
* 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合 eslint 规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过 Husky 工具：

* husky 是一个 git hook 工具，可以帮助我们触发 git 提交的各个阶段：pre-commit、commit-msg、pre-push

``` bash
npx husky-init && npm install
```
### 1.5. git commit 规范

#### 1.5.1. 代码提交风格

通常我们的 git commit 会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

* Commitizen 是一个帮助我们编写规范 commit message 的工具；

1. 安装 Commitizen

``` bash
yarn add commitizen -D
```

2. 安装 cz-conventional-changelog，并且初始化 cz-conventional-changelog

``` bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个时候我们提交代码需要使用 `npx cz`：

* 第一步是选择 type，本次更新的类型

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

#### 1.5.2. 代码提交验证

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

* 我们可以通过 commitlint 来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

``` bash
yarn add @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

``` js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息

``` bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
