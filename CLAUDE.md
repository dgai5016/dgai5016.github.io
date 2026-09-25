# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

dg 的个人博客，基于 VitePress 自定义主题，部署到 GitHub Pages。内容为中文（zh-CN），主题为 AI 和编程。采用毛玻璃（glassmorphism）设计风格，全屏海洋背景图。

## 架构

### 布局系统

两种 frontmatter layout：

- `layout: page` — 首页、归档、标签、教程列表等页面，使用 Sidebar + 内容区
- `layout: post` — 文章详情页，使用 Sidebar + TutorialNav（可选）+ TOC（左）+ 文章卡片（右）+ Giscus 评论

`Layout.vue` 是核心布局组件，通过检测 frontmatter 来决定渲染哪种视图。使用 `provide/inject` 传递 `sourcePage`，实现文章页返回按钮回到来源页。

### 数据加载器（docs/.vitepress/*.data.ts）

- `posts.data.ts` — 使用 `createContentLoader` 加载所有文章，按置顶+日期排序；透传 `hidden` 字段（教程子文章标记，首页浏览态与标签计数过滤，搜索/归档仍收录）
- `tags.data.ts` — 统计所有文章标签出现次数（跳过 hidden 文章）
- `map.data.ts` — 文章地图星图数据层：build 期 fs + regex 读 frontmatter（tags 分组 + hidden 过滤），自动构建「根 → 标签分类 → 文章」两层树（叶子只到首页可见文章；零手工登记）

### 样式系统

纯 CSS，无 Tailwind 或其他 CSS 框架。所有设计 token 和组件样式在 `theme/style.css` 中定义。

- 体系：单 accent 色 `#6c63ff` + slate 三级文字灰阶；单亮色主题（无暗色模式）
- 毛玻璃效果：`.glass`、`.glass-sidebar`、`.glass-card` 使用 `backdrop-filter: blur()`，规律是「背景越不透明 blur 越轻」
- hover 语言：标题变 accent 色 / accent 泛色背景 0.05~0.06 / 关闭按钮旋转 90° 等既有八范式，不发明新效
- z-index 分层：返回钮 20 < 移动抽屉 30/40 < hamburger 50 < 右滑面板 100 系 < 全屏模态 200 系 < 书单浮层 999
- 响应式断点：640px（sm）、1024px（lg）

**全站设计规范：`.claude/rules/theme-design.md`**（token 表、圆角/阴影/过渡档位、hover 八范式、浮层范式、z-index 全表、图标规范、新增 UI 自检清单）——path-scoped rule，读到 `docs/.vitepress/theme/` 下文件时自动注入（新会话生效）；改完样式记得同步更新该文档。

### 关键组件

| 组件                                | 用途                                  |
| ----------------------------------- | ------------------------------------- |
| `Layout.vue`                      | 核心布局，区分 page/post 视图         |
| `Sidebar.vue`                     | 左侧导航栏，桌面端固定，移动端抽屉    |
| `TutorialNav.vue`                 | 教程章节导航，桌面侧边栏 + 移动端折叠 |
| `TableOfContents.vue`             | 文章目录，滚动高亮当前标题            |
| `TagCloud.vue`                    | 标签筛选按钮                          |
| `PostMap.vue`                      | 文章地图全屏星图浮层（右上角常驻圆钮唤起，径向「根→分类→文章」，点击下钻/浮层阅读/触控板手势） |
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

## iTerm2 合集

所有 iTerm2 相关内容统一收录在主文章《iTerm2 完全指南》（`docs/posts/iterm2/iterm2-guide.md`，标签 `[iTerm2]`），不再单独发文章。系列明细页在 `docs/iterm2/<slug>.md`——该目录在 `posts/` glob 之外，不进首页/归档/标签/搜索流；主文章条目用 `<PostLink to="/iterm2/<slug>">` 以右侧浮层打开（PostOverlay 已把 `/iterm2/**/*.md` 纳入懒加载）。新增 iTerm2 内容 = 明细页落 `docs/iterm2/` + 主文章加索引条目并更新「最近更新」日期。

## Claude 生态更新追踪

追踪 Claude Code whats-new 周报和 Anthropic News 增量、维护长期文章《Claude 生态更新动态》（`docs/posts/ai/claude-ecosystem-updates.md`）的技能在 `.claude/skills/dg-newsupdate-claude/`。纯手动触发（不做通知/轮询）；检查/抓取脚本和水位状态在 `scripts/newsupdate-claude/`（Python 标准库）。Anthropic 新闻的全文中文译文页落在 `docs/news-zh/<slug>.md`——该目录在 `posts/` glob 之外，不进首页文章流；主文章只放索引条目。主文章中的**内部链接（译文页链接）一律用 `<PostLink to="/news-zh/<slug>">` 组件**以右侧浮层打开（PostOverlay 已把 `/news-zh/**/*.md` 纳入懒加载），外站链接（原文、官方周报）保持普通 markdown 链接新标签行为不变。

## dg-writer 写作技能

博客写作的集大成主路由在 `.claude/skills/dg-writer/`（`SKILL.md` 按写作类型分发到 `rules/` 规则文档；未来把 dg-skills 里的 AI 写作技能逐步迁移进来）。当前已支持的类型与产出：

- **AI 论文翻译**（`rules/ai-paper-translation.md`）：arxiv 论文 → 全文中文译文页 `docs/papers-zh/<slug>.md`（公式 LaTeX 迁移、图片落地 `docs/public/papers/<slug>/`、开头带导读）+ 合集主文章《AI 论文翻译》（`docs/posts/ai/ai-papers.md`）索引条目（`<PostLink>` 浮层打开，PostOverlay 已纳入 `/papers-zh/**/*.md`）。抓取脚本在 `scripts/ai-papers/`（arxiv abs 元数据 + ar5iv 正文，按需触发无水位）。
- **AI 开源库**（`rules/ai-open-source-libs.md`）：GitHub 仓库 → 合集主文章《AI 开源库》（`docs/posts/ai/ai-open-source-libs.md`）的条目——「大类 → 小类」两级分类（H2/H3），每库一条 GitHub 链接 + 50 字左右中文简介。无站内明细页（外站链接直接跳新标签），数据层零改动自动收录；入库前必须抓 README 核实定位，不凭记忆写简介。

## 其他规则

### 代码编写规则

- 每次修改或新增代码，添加注释，以便用户更好理解代码的作用。

### 文章规则

- 每篇文章仅运行有一个标签。
- 新建文章的 date 用真实当前时间，统一为中国北京时间（写 frontmatter 前先执行 `TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M"` 获取）。

## 注意实现

- 当发现已经在5173端口运行时，不用再切换其他端口运行`npm run dev`
