# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

dg 的个人博客，基于 VitePress 自定义主题，部署到 GitHub Pages。内容为中文（zh-CN），主题为 AI 和编程。采用毛玻璃（glassmorphism）设计风格，全屏海洋背景图。

## 架构

### 布局系统

两种 frontmatter layout：

- `layout: page` — 首页、归档、标签、教程列表等页面，使用 Sidebar + 内容区
- `layout: post` — 文章详情页，使用 Sidebar + TutorialNav（可选）+ 文章卡片 + TOC + Giscus 评论

`Layout.vue` 是核心布局组件，通过检测 frontmatter 来决定渲染哪种视图。使用 `provide/inject` 传递 `sourcePage`，实现文章页返回按钮回到来源页。

### 数据加载器（docs/.vitepress/*.data.ts）

- `posts.data.ts` — 使用 `createContentLoader` 加载所有文章，读取 `tutorial.yaml` 解析教程信息，按置顶+日期排序
- `tags.data.ts` — 统计所有文章标签出现次数
- `tutorial.data.ts` — 加载教程文章，从 YAML 配置解析章节列表

### 样式系统

纯 CSS，无 Tailwind 或其他 CSS 框架。所有设计 token 和组件样式在 `theme/style.css` 中定义。

- 主色调：`#6c63ff`
- 毛玻璃效果：`.glass`、`.glass-sidebar`、`.glass-card` 使用 `backdrop-filter: blur()`
- 响应式断点：640px（sm）、1024px（lg）

### 关键组件

| 组件                                | 用途                                  |
| ----------------------------------- | ------------------------------------- |
| `Layout.vue`                      | 核心布局，区分 page/post 视图         |
| `Sidebar.vue`                     | 左侧导航栏，桌面端固定，移动端抽屉    |
| `TutorialNav.vue`                 | 教程章节导航，桌面侧边栏 + 移动端折叠 |
| `TableOfContents.vue`             | 文章目录，滚动高亮当前标题            |
| `TagCloud.vue`                    | 标签筛选按钮                          |
| `PostList.vue` / `PostCard.vue` | 文章列表和卡片                        |
| `CommentGiscus.vue`               | Giscus 评论组件，懒加载               |

## 部署

GitHub Actions（`.github/workflows/deploy.yml`）：push 到 `main` 触发构建并部署到 GitHub Pages。Node 20，`npm ci && npm run build`。

## 常用命令

```bash
npm run dev       # 启动开发服务器（vitepress dev docs）
npm run build     # 生产构建（输出到 docs/.vitepress/dist）
npm run preview   # 本地预览生产构建
npm run test:e2e  # Playwright 截图测试（先构建再截图）
```

## 双语文档管线

MCP / RAGFlow / Vector Database 101 三套双语文档（浮层左右对照阅读）的抓取、翻译、配对管线：`scripts/ragflow-docs/`（RAGFlow，129 个阅读单元）、`scripts/mcp-docs/`（MCP）、`scripts/vector-db-docs/`（Zilliz 向量数据库课程 12 篇，合集目录 `docs/posts/ai/vector-db-101/`）。官方文档更新后的维护流程（增量抓取 / 新增篇目 / 大版本升级三场景）见 `scripts/ragflow-docs/README.md`。

## 资料总结技能

外部资料（当前支持 B站视频，规则文档可扩展）→「N 条资料总结」博文的技能在 `.claude/skills/dg-summarize-resources/`（`SKILL.md` 主路由，按资料类型分发到 `rules/` 下规则文档）。产出落在 `docs/posts/summary-resources/`，统一标签 `[资料总结]`，数据层零改动自动收录。

## Claude 生态更新追踪

追踪 Claude Code whats-new 周报和 Anthropic News 增量、维护长期文章《Claude 生态更新动态》（`docs/posts/ai/claude-ecosystem-updates.md`）的技能在 `.claude/skills/dg-newsupdate-claude/`。纯手动触发（不做通知/轮询）；检查/抓取脚本和水位状态在 `scripts/newsupdate-claude/`（Python 标准库）。Anthropic 新闻的全文中文译文页落在 `docs/news-zh/<slug>.md`——该目录在 `posts/` glob 之外，不进首页文章流；主文章只放索引条目。主文章中的**内部链接（译文页链接）一律用 `<PostLink to="/news-zh/<slug>">` 组件**以右侧浮层打开（PostOverlay 已把 `/news-zh/**/*.md` 纳入懒加载），外站链接（原文、官方周报）保持普通 markdown 链接新标签行为不变。

## 其他规则

### 代码编写规则

- 每次修改或新增代码，添加注释，以便用户更好理解代码的作用。

### 文章规则

- 每篇文章仅运行有一个标签。
- 新建文章的 date 用真实当前时间，统一为中国北京时间（写 frontmatter 前先执行 `TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M"` 获取）。

## 注意实现

- 当发现已经在5173端口运行时，不用再切换其他端口运行`npm run dev`
