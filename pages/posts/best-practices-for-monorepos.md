---
title: 从构建到发布：Monorepo 的最佳实践 
date: 2023-03-14
---

# 从构建到发布：Monorepo 的最佳实践

本文将介绍如何使用 pnpm 及 Monorepo 实现高效的代码构建和发布流程。

## 什么是 Monorepo？

Monorepo 是一种常用的代码管理方式，它将多个相关项目放在同一个代码仓库中，以便协同开发和维护。例如，[Vue](https://github.com/vuejs/core) 就采用了 monorepo 的方式进行开发管理。

在 Vue 的 monorepo 中，代码库中包含了多个相关的子项目，例如 `reactivity`、`runtime-core`、`compiler-core` 等。每个子项目都有自己的 `package.json` 文件，这样每个子项目可以独立安装和运行。

这种方式的好处在于，不同的开发团队可以在同一个代码库中进行协作开发，而不需要每个团队都维护自己的代码库。这样可以减少代码的重复，更好地控制代码的质量和版本。此外，如果一个项目需要使用另一个项目中的代码，可以直接引用该项目，而不需要通过依赖包的方式进行引用，从而减少了开发的复杂度。

## 构建 Monorepo 项目

在使用 monorepo 管理项目时，pnpm 是一个优秀的选择，它有更快的安装速度和更少的磁盘空间占用，能够更好地处理多个项目之间的依赖关系。下面是使用 pnpm 搭建 Monorepo 项目的步骤：

1. 全局安装 `pnpm`：

``` bash
npm install pnpm -g
```

2. 创建 monorepo 仓库：

``` bash
mkdir monorepo && cd monorepo
pnpm init
```

3. 在根目录下添加 `pnpm-workspace.yaml` 文件，告诉 pnpm 哪些目录是工作区，并在安装依赖时将它们链接到一起。

``` yaml
packages:
  - 'packages/**'
```

4. 添加项目：

``` bash
mkdir packages && cd packages

# pkg-a
mkdir pkg-a && cd pkg-a
pnpm init

# pkg-b
mkdir ../pkg-b && cd ../pkg-b
pnpm init
```

5. 安装依赖：

``` bash
# 全局安装 -w: --workspace-root
pnpm add typescript -D -w

# 局部安装
pnpm add typescript -D --filter pkg-a

# 互相安装
pnpm add pkg-a -D --workspace --filter pkg-b
```

6. 写点代码：

``` ts
// packages/pkg-a/index.ts
export function sum(n: number, m: number) {
  return n + m
}
```

``` ts
// packages/pkg-b/index.ts
import { sum } from 'pkg-a'

sum(1, 2)
```

7. 在 `packages/pkg-a/package.json` 和 `packages/pkg-b/package.json` 中添加以下脚本：

``` json
{
  "scripts": {
    "build": "tsc index.ts"
  }
}
```

8. 在根目录的 `package.json` 中添加以下脚本：

``` json
{
  "scripts": {
    "build": "pnpm -r --filter=./packages/* run build"
  }
}
```

9. 根目录运行以下命令：

``` bash
pnpm run build
```

此命令将执行 `packages` 目录下所有具有 `build` 命令的包。

## 发布 npm 包

在执行以下步骤之前，请确保已经将代码推送到链接的 git 远程仓库中。

### 使用 [bumpp](https://github.com/antfu/bumpp) 进行版本控制，创建 tag 标签并推送到 远程 git 仓库

1. 安装 `bumpp`：

``` bash
pnpm add bumpp -D
```

2. 在根目录的 `package.json` 中添加以下脚本：

``` json
{
  "scripts": {
    "release": "bumpp package.json packages/**/package.json"
  }
}
```

3. 在根目录运行以下命令：

``` bash
pnpm run release
```

这个命令将自动升级你的 npm 包版本，创建 git 标签，并将更改推送到你的远程 git 存储库。

### 使用 GitHub Actions 自动发布 npm 包

1. 首先，确保 `pnpm run release` 运行成功，并将更改推送到远程 git 存储库。

2. 创建一个名为 `.github/workflows/release.yml` 的文件。

3. 在 `release.yml` 文件中添加以下代码：

``` yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          registry-url: https://registry.npmjs.org/

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - name: Install dependencies
        run: pnpm i

      - name: Build
        run: pnpm run build

      - name: Publish
        run: pnpm publish -r --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}

      - run: npx changelogithub
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

4. 接下来，在 [npm](https://www.npmjs.com) 上获取你的认证令牌。请注意，你需要拥有发布包的权限才能获得令牌。将令牌添加到 GitHub 仓库的 secrets 中。

5. 转到你的 GitHub 仓库的 “Settings” 页面，在左侧菜单中，单击 “Secrets and variables / Actions”。单击 “New repository secret” 按钮创建一个新的密钥，名称为 “NPM_TOKEN”，值为你在步骤 4 中获得的认证令牌。

6. 现在，当你推送一个带有标签的 commit 到 GitHub 仓库时，GitHub Actions 将会自动运行你的 release.yml 工作流程，并将你的 npm 包发布到 npm 官方网站。
