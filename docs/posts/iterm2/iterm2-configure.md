---
title: iTerm2 完全指南（二）：配好 — 打造舒适高效的终端
date: 2026-06-05 02:00
tags: [iTerm2]
excerpt: 配色方案、字体、Shell 集成、Oh My Zsh + Powerlevel10k + 现代 CLI 工具箱，打造好看又好用的终端。
layout: post
---

默认终端看起来像上个世纪的产物——白底黑字、没有高亮、没有补全、跳目录全靠 `cd` 一路敲。

你可能还遇到过这些问题：

- 打开终端一片灰白，配色刺眼又难看
- 提示符只有光秃秃的用户名，看不出 git 分支、命令是否执行成功
- 敲命令全靠记忆，没有补全、没有语法检查
- 系统自带的 `ls`、`cat`、`grep` 功能弱、输出丑

这篇把终端的外观和体验配到位。

## 外观美化

### 配色方案

配色决定了终端的第一印象。目前社区里流行的主要有三款：

| 方案 | 风格 | 适合场景 |
|------|------|----------|
| **Catppuccin** | 柔和暖色调，低对比度不刺眼 | 长时间编码，追求舒适 |
| **Dracula** | 经典暗紫色调，对比鲜明 | 喜欢高对比、经典风格 |
| **Tokyo Night** | 冷色蓝调，偏科技感 | 喜欢冷色调、现代感 |

**我的推荐：Catppuccin Mocha**。暖色调久看不累，色阶区分清晰，配合后面的字体和透明度效果很好。

导入方法：

1. 到 [Catppuccin for iTerm2](https://github.com/catppuccin/iterm) 下载 `.itermcolors` 文件
2. 打开 iTerm2 → **Settings** → **Profiles** → **Colors**
3. 点击右下角 **Color Presets...** → **Import...**，选择下载的文件
4. 再次点击 **Color Presets...**，选择刚导入的方案

如果你更喜欢另外两款，导入流程完全一样，下载地址：

- Dracula：[draculatheme.com/iterm](https://draculatheme.com/iterm/)
- Tokyo Night：[github.com/enkia/tokyo-night-vscode](https://github.com/enkia/tokyo-night-vscode)（搜索 iterm 相关文件）

### 字体

终端里要用到大量图标（git 状态、文件夹图标、Powerline 分隔符），系统自带字体没有这些符号，会显示成方块或乱码。所以需要安装 **Nerd Font**——它在普通字体基础上补全了上千个图标符号。

**推荐：JetBrains Mono Nerd Font**。等宽、清晰、辨识度高，编码体验一流。

```bash
brew install --cask font-jetbrains-mono-nerd-font
```

安装后，在 iTerm2 中设置：

**Settings** → **Profiles** → **Text** → **Font**，选择 `JetBrainsMono Nerd Font`，字号建议 **14**。

备选：如果你喜欢连字效果（`=>` `!=` `===` 会显示为特殊符号），可以选 **FiraCode Nerd Font**：

```bash
brew install --cask font-fira-code-nerd-font
```

### 状态栏

iTerm2 自带状态栏，可以在窗口底部显示实时信息，不用装额外工具。

开启方法：

1. **Settings** → **Profiles** → **Session** → 勾选 **Status bar enabled**
2. 点击 **Configure Status Bar**，把需要的组件拖到上方区域

推荐组件：

- **Current Directory** — 当前路径
- **Git State** — 分支名和状态
- **CPU Usage** — CPU 占用
- **Memory Usage** — 内存占用
- **Clock** — 当前时间

位置建议选 **Bottom**（底部），不会占用编辑区空间。

### 背景透明与模糊

适当的透明和模糊能让终端融入桌面环境，视觉上更舒服。

1. **Settings** → **Profiles** → **Window** → **Transparency**：调到 **10-15%** 左右，太高会看不清文字
2. 同一页面勾选 **Blur**，模糊级别调到中等

效果是终端微微透出桌面壁纸，但文字依然清晰可读。

### 光标样式

上一篇已经设置过，这里快速回顾：**Settings** → **Profiles** → **Text** → **Cursor**，选 **Vertical Bar**，勾选 **Blink cursor**。竖线光标不遮挡字符，闪烁表示终端处于活跃状态。

## Shell 集成

### iTerm2 Shell Integration

iTerm2 提供官方 Shell Integration 脚本，安装后能解锁 Marks、Badge、命令状态标记等功能。

```bash
curl -L https://iterm2.com/shell_integration/install_shell_integration_and_utilities.sh | bash
```

安装完成后重启 iTerm2，以下功能即可使用。

### Marks

Shell Integration 安装后，每个命令提示符处会出现一个**小蓝色三角标记**，这就是 Mark。

作用类似书签——用快捷键在命令之间快速跳转：

- **⌘+Shift+↑** — 跳到上一个 Mark
- **⌘+Shift+↓** — 跳到下一个 Mark

输出很长的时候，用这个在命令之间穿梭比滚动快得多。

### Badge

Badge 是显示在终端右上角的**动态文本标签**，可以展示当前机器名、git 分支等信息。

设置方式：**Settings** → **Profiles** → **General** → **Badge**，输入你想显示的内容。支持变量，比如 `\(`user`@`hostname`。

适合管理多台服务器时区分环境。

### 命令状态标记

安装 Shell Integration 后，每条命令执行完会在左侧显示状态：

- **✓** — 命令执行成功
- **✗** — 命令执行失败

不用再靠肉眼判断上一条命令的退出码了。

### Oh My Zsh

Oh My Zsh 是 zsh 的配置框架，提供插件管理、主题切换、便捷快捷键等功能。后面装主题和插件都依赖它。

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装后会生成两个关键路径：

- `~/.oh-my-zsh/` — Oh My Zsh 主目录，插件、主题都装在这里
- `~/.zshrc` — zsh 配置文件，所有设置都在这里改

### Powerlevel10k

Powerlevel10k 是目前最流行的 zsh 主题，显示 git 分支、命令执行时间、错误码等信息，而且速度很快。

安装：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

然后在 `~/.zshrc` 中设置主题：

```zsh
ZSH_THEME="powerlevel10k/powerlevel10k"
```

重启 iTerm2 后会自动启动 **配置向导**，它会问一系列问题：

- 提示符风格（Rainbow、Classic、Unicode 等）
- 是否显示时间
- 分隔符样式
- 图标数量
- 提示符间距

跟着提示选就行，选错了随时可以重来：

```bash
p10k configure
```

### 插件推荐

Oh My Zsh 的插件机制很方便，在 `~/.zshrc` 的 `plugins=()` 里加上插件名就能启用。

**1. zsh-autosuggestions** — 命令自动建议

根据历史记录，在你输入时实时显示灰色补全建议，按 **→** 键接受。

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

在 `~/.zshrc` 中添加：

```zsh
plugins=(git zsh-autosuggestions)
```

**2. zsh-syntax-highlighting** — 命令语法高亮

实时给命令上色：有效命令显示**绿色**，无效命令显示**红色**，路径存在显示下划线。

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

在 `~/.zshrc` 中添加：

```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

**3. z** — 智能目录跳转

Oh My Zsh **自带**，不用额外安装。它会记录你访问过的目录，根据频率和最近使用时间排序。

只需要在 `plugins` 里加上 `z`：

```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting z)
```

用法示例——如果你经常访问 `~/Projects/my-app`，以后只需要：

```bash
z my-app
```

不用打完整路径。

## 现代 CLI 工具箱

macOS 自带的命令行工具都是几十年前的版本，功能少、输出丑。下面这些现代替代品用起来舒服得多。

### eza（替代 ls）

`ls` 不显示颜色、不显示 git 状态、没有图标。`eza` 全都有。

```bash
brew install eza
```

常用方式：

```bash
eza -la --icons --git
```

参数说明：`-l` 列表模式，`-a` 显示隐藏文件，`--icons` 显示文件图标，`--git` 显示 git 状态。

建议加个别名，写到 `~/.zshrc`：

```zsh
alias ll='eza -la --icons --git'
alias lt='eza -la --icons --git --tree --level=2'
```

### bat（替代 cat）

`cat` 输出纯文本，没有高亮、没有行号。`bat` 自带语法高亮、行号、git 变更标记。

```bash
brew install bat
```

用法和 `cat` 一样：

```bash
bat filename.py
```

默认就会根据文件扩展名自动选择语法高亮方案。

### ripgrep（替代 grep）

`grep` 速度慢，不自动跳过 `.gitignore` 里的文件。`ripgrep`（命令名 `rg`）快得多，而且默认尊重 `.gitignore`。

```bash
brew install ripgrep
```

搜索当前目录下所有包含某个字符串的文件：

```bash
rg "search term"
```

只搜索特定类型：

```bash
rg "def " -t py
```

### fd（替代 find）

`find` 的语法又长又难记。`fd` 默认就忽略隐藏文件和 `.gitignore` 中的文件，语法更简洁。

```bash
brew install fd
```

查找所有 Python 文件：

```bash
fd "\.py$"
```

查找文件名包含 "config" 的文件：

```bash
fd config
```

### fzf（模糊搜索）

`fzf` 是通用模糊搜索器，可以搜索文件、历史命令、进程等任何列表。

```bash
brew install fzf
$(brew --prefix)/opt/fzf/install
```

第二行的 install 脚本会配置快捷键绑定。

常用快捷键：

- **Ctrl+R** — 模糊搜索命令历史
- **Ctrl+T** — 模糊搜索文件名

高级用法——带预览的文件搜索：

```bash
fzf --preview 'bat --style=numbers --color=always {}'
```

选中文件的同时能在右侧看到文件内容预览。

### zoxide（智能目录跳转）

`zoxide` 比 Oh My Zsh 自带的 `z` 插件更强，算法更智能，还支持交互式选择。

```bash
brew install zoxide
```

在 `~/.zshrc` 中初始化：

```zsh
eval "$(zoxide init zsh)"
```

用法和 `z` 插件类似，但多了交互模式：

```bash
z my-app      # 跳转到最匹配的目录
zi my-app     # 用 fzf 交互式选择匹配的目录
```

## 完整 .zshrc 配置参考

下面是一份整合了本文所有内容的 `~/.zshrc`，可以直接使用：

```zsh
# ──────────────────────────────────────
# Path
# ──────────────────────────────────────
export PATH="$HOME/bin:/usr/local/bin:$PATH"

# ──────────────────────────────────────
# Proxy（按需取消注释）
# ──────────────────────────────────────
# export http_proxy=http://127.0.0.1:7890
# export https_proxy=http://127.0.0.1:7890

# ──────────────────────────────────────
# Oh My Zsh
# ──────────────────────────────────────
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"

plugins=(
  git
  z
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh

# ──────────────────────────────────────
# iTerm2 Shell Integration
# ──────────────────────────────────────
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"

# ──────────────────────────────────────
# Aliases
# ──────────────────────────────────────
alias ll='eza -la --icons --git'
alias lt='eza -la --icons --git --tree --level=2'
alias cat='bat'
alias find='fd'
alias grep='rg'

# ──────────────────────────────────────
# Tools Init
# ──────────────────────────────────────
eval "$(zoxide init zsh)"

# ──────────────────────────────────────
# Powerlevel10k 即时提示（必须放最后）
# ──────────────────────────────────────
# [[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
```

保存后重启 iTerm2，或者执行 `source ~/.zshrc` 使配置生效。

> 现在你的终端已经又好看又好用了。不过光配好还不够，下一篇我们来讲怎么用得更快。
