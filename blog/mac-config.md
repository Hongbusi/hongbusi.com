---
title: Mac 开发环境配置
date: 2022-11-30T11:55
authors: Hongbusi
tags: [mac, config]
---

当程序员拿到一台新 Mac，会做些什么。

<!-- truncate -->

## brew

MacOS（或 Linux）的缺失包管理器。

[Homebrew](https://brew.sh)

### 安装

``` bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 常用命令

``` bash
# 安装
brew install git

# 卸载
brew uninstall git

# 搜索
brew search git

# 更新
brew upgrade git

# 更新所有
brew update
```

## nvm

### 安装

``` bash
# https://github.com/nvm-sh/nvm#install--update-script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

### 常用命令

``` bash
# 查看列表
nvm ls
```

## iTerm2

https://iterm2.com

## oh-my-zsh

Oh My Zsh 是一个开源的、社区驱动的框架，用于管理您的 zsh 配置。

### 安装

``` bash
# https://github.com/ohmyzsh/ohmyzsh#basic-installation
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

请注意，任何以前的 `.zshrc` 都将重命名为 `.zshrc.pre-oh-my-zsh`。安装后，您可以将要保留的配置移动到新的 `.zshrc` 中。

### 常用的 plugin

#### zsh-autosuggestions

``` bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-myzsh/custom}/plugins/zsh-autosuggestions

# .zshrc
plugins=(
  zsh-autosuggestions
)

# .zshrc 修改颜色
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#ff00ff,bg=cyan,bold,underline"
```

#### zsh-syntax-highlighting

``` bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.ohmy-zsh/custom}/plugins/zsh-syntax-highlighting

# .zshrc
plugins=(
  zsh-syntax-highlighting
)
```

#### autojump

``` bash
brew install autojump

# .zshrc
plugins=(
  autojump
)
```

#### copypath

``` bash
# .zshrc
plugins=(
  copypath
)
```

#### copyfile

``` bash
# .zshrc
plugins=(
  copyfile
)
```

#### web-search

``` bash
# .zshrc
plugins=(
  web-search
)
```

## 删除自带 ABC 输入法

https://blog.zhheo.com/p/118e7ee0.html
