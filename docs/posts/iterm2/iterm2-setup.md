---
title: iTerm2 完全指南（一）：装好 — 基础安装与环境搭建
date: 2026-06-05 01:00
tags: [iTerm2]
excerpt: 从零开始搭建 iTerm2 终端环境，涵盖安装、代理配置、环境变量管理、Homebrew 加速和版本管理工具。
layout: post
---

macOS 自带的 Terminal.app 够用吗？想想这些场景：

- 想同时看日志和执行命令，只能开两个窗口手动切换
- 在一堆输出里找个关键词，得复制到编辑器里搜
- 配个代理要自己写一堆 alias，换个机器又得重来
- 终端长相千篇一律，想换个配色都费劲

这篇从零开始，把这些问题一个个解决掉。

## 为什么选择 iTerm2

macOS 自带的 Terminal.app 功能非常基础：没有分屏、没有全局搜索、自定义选项也很少。对于日常开发来说，这些缺失会越来越明显。

**iTerm2 的核心优势：**

- **分屏（Split Panes）**：水平和垂直分屏，一个窗口搞定多任务
- **全局搜索**：`Cmd + F` 直接搜索终端内容，支持正则
- **自动补全**：基于历史记录的智能补全
- **Shell Integration**：和 zsh 深度集成，提供跳转、下载等功能
- **Profiles**：不同项目用不同的配置、配色、启动命令

如果你每天都要开终端，iTerm2 是 macOS 上最稳的选择。

## 安装与初次配置

### 安装

**方式一：Homebrew（推荐）**

```bash
brew install --cask iterm2
```

**方式二：官网下载**

直接去 [iterm2.com](https://iterm2.com) 下载 dmg，拖进 Applications 即可。

装好之后打开 iTerm2，第一次启动会问你是否加载 Shell Integration，先跳过，后面专门讲。

### 设为默认终端

打开 iTerm2，菜单栏点击：

**iTerm2 → Make iTerm2 Default Term**

这样以后用 `open` 命令或者点击 `.command` 文件时，都会用 iTerm2 打开。

### 基础偏好设置

按 `Cmd + ,` 打开 Preferences，按下面的顺序调整：

**外观**

1. **Appearance → General → Theme**：选择 **Minimal**
2. 这样标题栏会和终端内容融为一体，视觉上更干净

**窗口透明度**

1. **Profiles → Window → Transparency**：拉到大约 **10%~15%**
2. 能微微透出后面的内容就行，太多会看不清文字

**光标**

1. **Profiles → Text → Cursor**：选择 **Vertical Bar**
2. 勾选 **Blinking cursor**

**滚动缓冲**

1. **Profiles → Terminal → Scrollback Lines**：勾选 **Unlimited scrollback**
2. 这样长时间运行的日志不会丢失

这些是基础设置，调完你的终端就已经比 Terminal.app 好用不少了。后面的配色、字体美化在第二篇讲。

## 终端代理配置

在国内开发，终端能走代理是刚需。git clone、curl、brew 这些命令都需要代理才能正常工作。

### 设置代理环境变量

打开 `~/.zshrc`，添加以下内容：

```bash
# 终端代理配置
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
export all_proxy="socks5://127.0.0.1:7891"
```

保存后执行：

```bash
source ~/.zshrc
```

**注意**：端口号取决于你用的代理工具。Clash 默认 HTTP 端口是 7890，SOCKS5 是 7891；V2rayU 可能是 1087/1086。去你的代理工具设置里确认一下。

### 快捷开关代理

一直开着代理有时候反而麻烦（比如访问内网服务）。加两个函数，随时切换：

```bash
proxy_on() {
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy="http://127.0.0.1:7890"
  export all_proxy="socks5://127.0.0.1:7891"
  echo "代理已开启"
}

proxy_off() {
  unset http_proxy https_proxy all_proxy
  echo "代理已关闭"
}
```

把这段加到 `~/.zshrc` 里，然后 `source ~/.zshrc`。

使用方法：

```bash
proxy_on    # 开启代理
proxy_off   # 关闭代理
```

### 验证代理

```bash
curl -I https://www.google.com
```

如果返回 `HTTP/2 200`，说明代理生效了。如果超时或报错，检查代理工具是否在运行、端口号是否正确。

## 环境变量统一管理

配置文件越写越长、越写越乱是迟早的事。搞清楚 Zsh 的配置文件加载顺序，能帮你少踩很多坑。

### Zsh 配置文件加载顺序

Zsh 启动时按以下顺序加载配置文件：

1. **.zshenv** — 所有 shell 实例都会加载，放最基础的变量
2. **.zprofile** — 仅登录 shell 加载（一般不用管）
3. **.zshrc** — 每次打开新终端窗口都会加载，放交互式配置
4. **.zlogin** — 仅登录 shell 加载，在 .zshrc 之后（很少用）

### 推荐的组织方式

**`~/.zshenv`** — PATH 和基础环境变量

```bash
# 基础 PATH 配置
typeset -U PATH
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

# 编辑器
export EDITOR="vim"
```

**`~/.zprofile`** — 通常留空，或放只需要执行一次的命令

**`~/.zshrc`** — 交互式配置，按功能分区管理

```bash
# ========== 代理配置 ==========
proxy_on() {
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy="http://127.0.0.1:7890"
  export all_proxy="socks5://127.0.0.1:7891"
  echo "代理已开启"
}

proxy_off() {
  unset http_proxy https_proxy all_proxy
  echo "代理已关闭"
}

# ========== Homebrew 配置 ==========
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"

# ========== Alias ==========
alias ll="ls -lah"
alias gs="git status"
alias gp="git push"

# ========== 工具初始化 ==========
# asdf、nvm 等工具的初始化放在这里
```

用注释把不同功能的配置隔开，以后维护起来一目了然。

## Homebrew 加速配置

Homebrew 在国内默认源非常慢，替换镜像源是装完系统后第一件要做的事。

### 替换镜像源

这里用清华 TUNA 镜像源，稳定且更新及时。把以下内容加到 `~/.zshrc`：

```bash
# Homebrew 镜像加速
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
```

如果你用中科大镜像，把 `tuna.tsinghua.edu.cn` 换成 `mirrors.ustc.edu.cn` 即可。

保存后执行：

```bash
source ~/.zshrc
brew update
```

如果 `brew update` 能在几秒内完成，说明镜像源生效了。

### 常用命令速查

| 命令 | 作用 |
|------|------|
| `brew install <pkg>` | 安装命令行工具 |
| `brew install --cask <app>` | 安装 GUI 应用 |
| `brew update` | 更新 Homebrew 自身和配方 |
| `brew upgrade` | 升级所有已安装的包 |
| `brew cleanup` | 清理旧版本缓存 |
| `brew list` | 列出已安装的包 |
| `brew info <pkg>` | 查看包的详细信息 |

**日常维护**：

```bash
brew update && brew upgrade && brew cleanup
```

建议隔一两周跑一次，保持工具链更新。

## 版本管理工具

开发项目经常需要在不同版本的 Node.js、Python 之间切换。选对版本管理工具能省不少事。

### asdf：多语言统一管理

asdf 用一套机制管理所有语言的版本，不用为每种语言装一个管理器。

**安装**：

```bash
brew install asdf
```

**添加到 shell**，在 `~/.zshrc` 末尾加一行：

```bash
. /opt/homebrew/opt/asdf/libexec/asdf.sh
```

保存后 `source ~/.zshrc`。

**基本使用**：

```bash
# 添加语言插件
asdf plugin add nodejs
asdf plugin add python

# 安装指定版本
asdf install nodejs 20.11.0
asdf install python 3.12.2

# 设置全局默认版本
asdf global nodejs 20.11.0
asdf global python 3.12.2

# 在某个项目里用特定版本（在项目根目录执行）
asdf local nodejs 18.19.0
```

asdf 会在项目根目录创建一个 `.tool-versions` 文件记录版本，提交到 git 后团队其他人也能用同一个版本。

### nvm / pyenv：专用工具

如果你只用一种语言，专用工具更轻量。

**nvm（Node.js 版本管理）**：

```bash
brew install nvm
```

在 `~/.zshrc` 中添加：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
```

常用命令：

```bash
nvm install 20        # 安装 Node.js 20
nvm use 20            # 切换到 Node.js 20
nvm alias default 20  # 设置默认版本
```

**pyenv（Python 版本管理）**：

```bash
brew install pyenv
```

在 `~/.zshrc` 中添加：

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

常用命令：

```bash
pyenv install 3.12.2     # 安装 Python 3.12.2
pyenv global 3.12.2      # 设置全局版本
pyenv local 3.11.8       # 在当前目录设置版本
```

### 如何选择

- 同时用 **2 种以上语言** → 选 **asdf**，一套工具搞定
- 只用 **Node.js** → 选 **nvm**，生态成熟，社区资源多
- 只用 **Python** → 选 **pyenv**，对 C 扩展编译支持最好

不需要纠结，后面想换也随时可以迁移。

> 到这里你的终端环境已经完全可用了。如果你觉得终端还差点颜值和体验，继续看下一篇。
