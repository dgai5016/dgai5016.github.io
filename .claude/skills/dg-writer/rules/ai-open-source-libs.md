# rules/ai-open-source-libs.md：AI 开源库

把 AI 相关开源仓库收录进合集主文章《AI 开源库》（`docs/posts/ai/ai-open-source-libs.md`）。主文章是分类体系的唯一事实源：**分类只到二级**（H2 大类 → H3 小类），每个仓库一条目 = GitHub 链接 + 50 字左右中文简介。

## 输入

GitHub 仓库链接（或 owner/repo 仓库名）。典型触发语：「帮我把这个 AI 开源库加到文章里」。

## 操作步骤

### Step 1：抓取仓库信息

**简介必须基于仓库现状写，不凭记忆**（项目会改名、转型、迭代，记忆里的定位可能过期）。抓取顺序：

1. `mcp__github__get_file_contents`（owner/repo, path=`README.md`）——首选，能拿到完整 README
2. 不可用时 `WebFetch` 抓 `https://raw.githubusercontent.com/<owner>/<repo>/main/README.md`（master 分支再试一次）
3. 还不行 WebSearch 搜仓库名

从 README 提取：项目定位（一句话理解）、核心能力（最有区分度的 1~2 个点）、维护方（公司/组织，写简介时可带）。

### Step 2：判断归类

对照主文章现有的「大类 → 小类」体系，按顺序决策：

1. **现有大类 + 现有小类都放得下** → 放进该小类，条目加到小类列表**最前**（同小类新的在上）
2. **有放得下的大类、没有合适小类** → 在该大类的最后一个现有小类**之后**新建 `### <小类名>` 再放条目
3. **大类都没有** → 文章**末尾**新建 `## <大类名>` + `### <小类名>` 再放条目

小类命名参考既有粒度：RAG 大类下有「框架」「文档解析」「检索引擎」，提示工程下有「学习指南」「提示词库」。新小类名保持名词短语、和同大类兄弟小类同一抽象层级。

### Step 3：插入条目

条目格式（**标题段 + 简介段两段结构**，与 ai-papers 条目同构：标题段 = 项目名加粗且本身是 GitHub 直链；空一行再缩进两空格起简介段）：

```markdown
- **[<项目名>](https://github.com/<owner>/<repo>)**

  <50 字左右简介>
```

- **项目名**用 README 里的展示名（RAGFlow、pdfplumber），不用 owner/repo 全名
- **链接用用户提供的仓库地址原样**，不改写、不「纠正」成自己记忆里的路径（项目常有改名史，用户给的才是他要的）
- 外站链接用普通 markdown 链接（主题已配置新标签打开），**不用 PostLink 浮层**——本类型没有站内明细页

### Step 4：更新维护信息

同步更新主文章顶部「最近更新：YYYY-MM-DD」行为当天日期。

### Step 5：本地验收

`npm run dev` 让用户浏览器验收（5173 已跑就不重启）。检查点：新条目渲染、链接可点、目录（TOC）出现新建的小类/大类标题。

## 简介写作规范

- **50 字左右**（40~60 字弹性），超出先砍形容词再砍次要功能点
- 结构：**是什么（定位）+ 核心能力/特点（最有区分度的 1~2 个点）**，例如「微软开源的知识图谱增强 RAG 框架」+「擅长回答需要全局理解的问题」
- **客观陈述**，不照抄 README 的宣传话术（"best/ultimate/revolutionary" 类词不进简介），不堆砌形容词
- 术语：RAG、LLM、ChatGPT 等通用缩写保留原文；库名、公司名（微软、上海人工智能实验室）不译
- 维护方有价值时带上（「微软开源的」「上海人工智能实验室 OpenDataLab 开源的」），知名到无需说明的（Elasticsearch）可不带

## 首次建合集（一次性，已完成）

- 建主文章 `docs/posts/ai/ai-open-source-libs.md`（frontmatter：标签 `开源库`，layout: post）
- 开头一句话说明合集定位 +「最近更新」行，**不写任何制作工艺描述**（见 SKILL.md 产出物边界）
- 无站内明细页 → 不需要动 PostOverlay 的 glob，数据层零改动自动进首页/归档/标签页
- CLAUDE.md 的「dg-writer 写作技能」节确认已覆盖本类型条目

## 坑位清单（实战学费）

1. **WebFetch 对 github.com 会被网络策略拦截**（"Unable to verify if domain github.com is safe to fetch"）——改用 GitHub MCP 的 `get_file_contents` 抓 README，这是首选路径。
2. **简介不凭记忆写**——同论文规则「不凭记忆猜 arxiv ID」一个道理：仓库定位随版本漂移，以 README 现状为准（2026-09 建 harness-engineering 条目时，README 实际是围绕 OpenAI 驭缰工程的系统学习档案，与仓库名直觉印象有出入）。
3. **每篇文章仅一个标签**，本合集固定用 `开源库`，追加条目时不动 frontmatter 的 tags（只有 date 与「最近更新」行变）。
