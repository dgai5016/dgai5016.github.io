---
title: iTerm2 完全指南（四）：玩花 — 进阶与自动化
date: 2026-06-05 04:00
tags: [教程, iTerm2]
excerpt: Profile 管理、SSH 集成、触发器、Python API 自动化、tmux 远程会话，解锁终端的进阶玩法。
layout: post
tutorial:
  name: iTerm2 完全指南
  order: 4
---

前面的三篇，从安装到配置到日常操作，已经把 iTerm2 的基本盘打好了。但终端能做的事情远不止于此——

- 每次切开发环境、测试环境、生产环境都要手动改设置，经常搞混。
- 连服务器每次都要敲一长串 SSH 命令，IP 和端口根本记不住。
- 部署时盯着日志看有没有报错，眼睛都不敢眨一下。
- 每天开始工作要开一堆窗口和分屏，手动操作一堆步骤。

这篇来折腾点进阶玩法。

## 高级功能

### Profile 管理

**场景：** 开发时要连不同的环境（本地开发、测试服务器、生产服务器），每次都要手动改设置，容易出错。

Profile 是 iTerm2 里的一套完整终端配置，包含外观、Shell、启动命令、工作目录等所有设置。你可以把它理解为一个"终端人格"——切换 Profile 就是切换整套工作环境。

创建方式：Preferences → Profiles → 左下角的 **+** 按钮。

一个实用的 Profile 规划：

- **Default** — 本地开发环境，标准外观，默认 Shell
- **Dev Server** — SSH 连测试服务器，蓝色调配色方案，一眼就知道在测试环境
- **Production** — SSH 连生产服务器，红色调配色方案，视觉提醒你"小心操作"

配色方案的区别很有意义——当你在多个窗口之间切换时，红色背景的窗口就是在提醒你：这是生产环境，删库跑路的命令别乱敲。

切换 Profile 的方式：Preferences → Profiles 里直接选，或者用快捷键 **⌘O**（Open）快速切换。

每个 Profile 可以独立配置：

- 配色方案（Colors）
- 字体和字号（Text）
- 启动时执行的命令（General → Command）
- 默认工作目录（General → Working Directory）
- 窗口标题和 Badge（General → Badge）
- 触发器（Advanced → Triggers）

### SSH 集成

**场景：** 每次连服务器都要敲 `ssh user@192.168.x.x -p 2222`，记不住 IP 和端口。

最直接的办法是把 SSH 命令直接写进 Profile 里：打开 Profiles → General → Command，选择 **Command (Login Shell)**，然后输入：

```
ssh deploy@192.168.1.100 -p 2222
```

给每台服务器建一个 Profile，以后双击就连接，不用再背 IP 了。

但还有更优雅的做法——配置 SSH config 文件 `~/.ssh/config`：

```
Host dev
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/id_dev

Host prod
    HostName 10.0.0.50
    User admin
    Port 22
    IdentityFile ~/.ssh/id_prod
```

配置好之后，在终端里只需要：

```bash
ssh dev
```

就能连接了。然后 Profile 里的 Command 只需要写 `ssh dev` 三个字就够了。SSH config 文件还支持通配符、跳板机代理等高级配置，管理多台服务器非常方便。

### 触发器 Triggers

**场景：** 部署时盯日志看有没有 error，眼睛盯着屏幕不敢移开，能不能自动提醒？

触发器是 iTerm2 的一大杀手级功能：它监控终端输出的文本，匹配到特定模式后执行一个动作。

配置位置：Profiles → Advanced → Triggers → 点击 **Edit**。

添加一条触发器：

- **Regular Expression：** `error|ERROR|fail|FAIL`
- **Action：** Post Notification

这样，终端里只要出现这些关键词，macOS 就会弹出系统通知。你可以安心切到别的窗口干活，不用死盯着终端了。

触发器支持的动作很多：

- **Post Notification** — 系统通知，最常用
- **Bounce Dock Icon** — Dock 图标弹跳，吸引注意
- **Run Command** — 执行一条命令，比如播放提示音
- **Set Badge Text** — 在窗口右上角显示文字
- **Alert** — 播放提示音

实用的触发器示例：

| 匹配文本 | 动作 | 用途 |
|----------|------|------|
| `npm ERR!` | Bounce Dock Icon | 前端构建失败 |
| `build success` | Post Notification | 构建成功通知 |
| `[Pp]assword` | Alert | 检测到密码提示 |
| `git push` | Set Badge Text: "Pushed" | 标记推送状态 |

触发器用的是正则表达式，所以匹配规则可以写得很灵活。比如 `(warning|warn):` 能同时匹配 `Warning:` 和 `WARN:`。

### 语义历史 Semantic History

**场景：** 终端里输出了一个文件路径 `/src/components/App.tsx`，想打开看看，还得手动复制粘贴到编辑器。

iTerm2 的语义历史功能可以让你 **⌘+点击** 终端里出现的文件路径，直接用编辑器打开。

配置位置：Profiles → Advanced → Semantic History。

几个选项：

- **Open with default app** — 用系统默认程序打开
- **Open in editor** — 用内置编辑器打开
- **Run command** — 执行自定义命令

推荐设置：选 **Run command**，然后填入你的编辑器命令。比如 VS Code 用户填：

```
code --goto \1:\2
```

其中 `\1` 是文件路径，`\2` 是行号。这样终端里出现 `error at App.tsx:42` 这种格式时，⌘+点击就能直接跳到 VS Code 里对应文件的第 42 行。

编译报错、日志文件路径、测试失败的位置——都能一键跳转，不用再来回复制了。

### iTerm2 Python API 自动化

**场景：** 每次开始工作要开 3 个分屏：一个跑前端、一个跑后端、一个看日志。能不能一条命令搞定？

iTerm2 内置了一个 Python 运行时，可以用 Python 脚本控制 iTerm2 的几乎所有行为——新建窗口、分屏、发送命令、切换主题，等等。

首次使用时会提示下载 Python 运行时，点确认即可。

脚本存放位置：`~/Library/Application Support/iTerm2/Scripts/`。

来写一个实用的例子——一键启动开发环境：

```python
import iterm2

async def main(connection):
    app = await iterm2.async_get_app(connection)
    window = app.current_terminal_window
    if window is None:
        return

    # 新建一个标签页
    tab = await window.async_create_tab()

    # 垂直分屏
    left = tab.current_session
    right = await left.async_split_pane(vertical=True)

    # 在左右面板分别执行命令
    await left.async_send_text('cd ~/project/frontend && npm run dev\n')
    await right.async_send_text('cd ~/project/backend && npm run server\n')

iterm2.run_until_complete(main)
```

这段脚本做了什么：打开一个新标签页，垂直分屏，左边跑前端开发服务器，右边跑后端服务。一条命令，整个开发环境就绪。

脚本存放位置决定了触发方式：

- 放在 `Scripts/` 目录下：在 iTerm2 菜单栏的 **Scripts** 菜单里手动触发
- 放在 `Scripts/AutoLaunch/` 目录下：iTerm2 启动时自动执行

更多玩法：

- 根据时间自动切换亮色/暗色主题
- 批量连接多台 SSH 服务器，每个占一个分屏
- 自动化部署流程，每一步在不同面板执行

### 自动登录

**场景：** 有些服务器登录需要交互式输入密码，每次都要手动敲。

三种方案，从推荐到备用：

**方法一：SSH 密钥（推荐）**

```bash
# 生成密钥
ssh-keygen -t ed25519 -f ~/.ssh/id_dev

# 把公钥复制到服务器
ssh-copy-id -i ~/.ssh/id_dev.pub -p 2222 deploy@192.168.1.100
```

配置好之后 `ssh dev` 直接进去，不用输密码。这是最安全、最方便的方式。

**方法二：iTerm2 密码管理器**

iTerm2 内置了密码管理器：菜单栏 → Window → Password Manager。把密码存进去（会用 macOS 钥匙串加密保存），连接时从密码管理器里调用。

也可以在 Profile 里配置：Profiles → General → Password Manager，设置自动填充。

**方法三：Expect 脚本（兜底方案）**

某些场景下（比如跳板机、老旧设备）只能交互式输密码，可以用 Expect 脚本自动化：

```bash
#!/usr/bin/expect
spawn ssh deploy@192.168.1.100 -p 2222
expect "password:"
send "your_password\r"
interact
```

把这个脚本保存为文件，Profile 的 Command 指向这个脚本就行。不过注意，密码会以明文写在脚本里，只在不支持密钥的设备上使用。

## tmux 与 iTerm2 配合

### 为什么需要 tmux

**场景：** SSH 到服务器跑一个长时间任务（比如编译、训练），网络一断，任务就没了。或者同时在好几个项目间切换，每次都要重新开窗口。

tmux 是一个终端复用器，运行在服务器端。它的核心能力是：**让你的终端会话独立于网络连接存在。**

网络断了、电脑关了、终端关了——都没关系。只要服务器没重启，你的 tmux 会话就在那里。重新连上去 `tmux attach`，一切恢复原样。

### 基础概念

tmux 有三层结构：

- **Session（会话）**：一组窗口的集合，相当于一个工作区
- **Window（窗口）**：会话内的一个标签页
- **Pane（面板）**：窗口内的一个分屏区域

层级关系：

```
Session "project"
├── Window 1 "frontend"
│   ├── Pane 1 (running vim)
│   └── Pane 2 (running npm test --watch)
└── Window 2 "backend"
    └── Pane 1 (running python manage.py runserver)
```

一个 Session 里可以有多个 Window，一个 Window 里可以有多个 Pane。你可以把不同项目放在不同 Session 里，随时切换。

### 安装

```bash
brew install tmux
```

验证：

```bash
tmux -V
# tmux 3.5
```

### tmux.conf 核心配置

tmux 的默认快捷键不太友好，需要改一下配置。创建或编辑 `~/.tmux.conf`：

```bash
# 改前缀键为 Ctrl+a（更顺手，Ctrl+b 太远了）
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# 分屏快捷键（更直观）
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# 新窗口保持当前路径
bind c new-window -c "#{pane_current_path}"

# 用 Vim 风格切换面板
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 快速重载配置
bind r source-file ~/.tmux.conf \; display "配置已重载"

# 开启鼠标支持（可以用鼠标切面板、调整大小、滚动）
set -g mouse on

# 状态栏美化
set -g status-style 'bg=#1a1b26 fg=#a9b1d6'
set -g status-left '#[fg=#7aa2f7]#S '  # 显示 session 名
set -g status-right '#[fg=#565f89]%H:%M'

# 窗口编号从 1 开始（0 在键盘太远了）
set -g base-index 1
setw -g pane-base-index 1

# 减少延迟（Vim 用户必配，否则 ESC 键有卡顿）
set -sg escape-time 0
```

改完之后，在 tmux 里按 `C-a` 然后 `r` 就能重载配置。

### 核心操作速查

下面这张表建议保存，刚上手时随时查：

| 操作 | 快捷键 |
|------|--------|
| 新建 session | `tmux new -s name` |
| 分离 session | `C-a d` |
| 重新连接 | `tmux attach -t name` |
| 列出 sessions | `tmux ls` |
| 杀掉 session | `tmux kill-session -t name` |
| 水平分屏 | `C-a -` |
| 垂直分屏 | `C-a \|` |
| 切换面板 | `C-a h/j/k/l` |
| 新建窗口 | `C-a c` |
| 切换窗口 | `C-a n/p` |
| 关闭当前面板 | `C-a x` |

其中 `C-a` 指的是先按 `Ctrl+a`，松开，再按后面的键。

### 实战：远程开发工作流

走一遍完整的远程开发流程，感受 tmux 的价值。

**1. 连接服务器并创建 session**

```bash
ssh dev
tmux new -s project
```

如果 session 已存在（上次忘了关），用 `tmux attach -t project` 重新连接。

**2. 在 session 中工作**

按 `C-a |` 垂直分屏，左边跑前端，右边跑后端。再按 `C-a c` 新建一个窗口，用来看日志。

在多个项目间切换？给每个项目建一个 session：`tmux new -s projectB`，然后用 `C-a s` 列出所有 session 并切换。

**3. 断开但保留现场**

要下班了，按 `C-a d` 分离 session。或者直接关闭终端、合上电脑、网络断开——都没事，tmux 在服务器端运行，跟你的本地连接无关。

**4. 恢复工作**

第二天到了公司：

```bash
ssh dev
tmux attach -t project
```

所有窗口、分屏、正在运行的进程——全部恢复原样，就像什么都没发生过。

**5. 本地 iTerm2 + 远程 tmux 的搭配**

一个常见的困惑是：iTerm2 有分屏，tmux 也有分屏，到底用哪个？

答案很简单：

- **本地用 iTerm2** — iTerm2 的分屏更流畅、更好看，支持拖拽调整大小、原生复制粘贴
- **远程用 tmux** — 关键是要会话持久化，这是 iTerm2 做不到的（iTerm2 是本地应用，网络断了它也断了）

别在本地跑 tmux，那是多此一举。iTerm2 自带的 tmux 集成（Preferences → General → tmux）可以把 tmux 会话映射为 iTerm2 原生窗口，听起来很酷但实际用下来问题不少，不建议折腾。基础方案足够好用。

> 到这里整个系列就结束了。如果中途有哪篇想回顾，用左侧的系列导航随时跳转。
