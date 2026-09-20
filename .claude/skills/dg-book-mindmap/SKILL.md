---
name: dg-book-mindmap
description: 把书籍的 markdown 电子版整理成思维导图并发布到博客书单页：解析章节结构 → 分章提炼知识要点 → 生成层级化 mindmap.md（存 public/books/<slug>/）→ yaml 标 mindmap 字段 → 书单页预览卡出现「思维导图」按钮，点开全屏 Markmap 工作台复习（点击折叠/缩放/拖拽）。Use when 用户说「给 X 生成思维导图」「X 做导图」「mindmap X」「把这本书整理成导图」或提供某本书的 markdown 电子版要求出思维导图。Does NOT 支持 epub/pdf/azw3 直接输入（当前仅 markdown；其他格式先转 md 再来）、不自动加书到书单（书不在 yaml 里先走 dg-add-book）、不 commit/push（提交走 dg-git-push）。
---

# dg-book-mindmap：书籍 markdown → 思维导图

输入书籍的 markdown 电子版，产出一份**结合章节规划、涵盖所有知识要点**的思维导图，挂到博客书单页对应书籍上（预览卡「🧠 思维导图」按钮 → 全屏 Markmap 工作台）。

## 前端渲染链路（理解产出物被谁消费）

- 产物：`docs/public/books/<slug>/mindmap.md`（public 静态资源，前端 `fetch('/books/<slug>/mindmap.md')` 拿原文）
- yaml 书条目加 `mindmap: <slug>` 字段 → 书单预览卡出现「思维导图」按钮
- 渲染：`docs/.vitepress/theme/components/BookMindmap.vue`（markmap-lib 的 Transformer + markmap-view；初始展开到章，节点旁小圆点点击折叠，顶栏有展开全部/收起到章/适配屏宽）

## 工作流程

### Step 0 输入解析

从用户话里拿：**书名**（必填）、**md 电子版路径**（必填）。slug 取该书 yaml 条目的 `dir`/`mindmap` 已有值；没有则按封面 slug 惯例（小写英文连字符，拼音或意译）。

书不在书单 yaml 里 → 停下提示用户先走 dg-add-book 加书（导图按钮依赖 yaml 条目）。

### Step 1 章节骨架

```bash
grep -nE "^#{1,3} |^第[0-9一二三四五六七八九十]+章" <md路径> | head -80
```

生成全书章节清单（章 → 节）。目录结构不清晰（无标题层级）时读文件头 200 行人工判断章节边界，和用户确认后再继续。

### Step 2 分章提炼（核心）

**全书 md 往往 5-20 万字，远超单次上下文**——必须分章处理，禁止试图一次读完全书再总结：

1. 按章节清单**逐章**读正文（每章单独 Read 对应行区间）
2. 每章产出该章的导图子树（按下方「导图内容规范」）
3. 章数 > 12 或单章极长时，可并行子代理分章处理（每个子代理负责几章，产出落 /tmp 分片再汇总）；注意子代理 Write 落盘的已知坑（`$$` 数学块损坏、中文进 `$` 块）

### Step 3 汇总落盘

拼装完整 mindmap.md（规范见下），写入 `docs/public/books/<slug>/mindmap.md`。

### Step 4 yaml 标记

目标书条目加一行 `mindmap: <slug>`（放 `finishedDate` 之后、`dir` 之前的位置惯例）。dev 热更新自动生效。

### Step 5 验证 + 交付

- `docs/public/books/<slug>/mindmap.md` 存在且 fetch 200（dev 下 `curl --noproxy '*' http://localhost:5173/books/<slug>/mindmap.md`）
- dev 打开 `/pages/books` → hover 该书 → 预览卡有「🧠 思维导图」按钮 → 点击全屏渲染
- **不主动 commit**，等用户说「提交」走 dg-git-push

## 导图内容规范（硬性）

```markdown
# 《书名》              ← 根（唯一 H1）

## 第 1 章 章名          ← 章（H2，严格跟书的章节规划）

### 1.x 节名/主题组      ← 节（H3，书有小节用小节名，没有则按主题归组）

- 知识点                ← 叶子（列表项）
```

**层级与粒度**：
- 固定 4 层：书 → 章 → 节 → 知识点；不再更深（导图层级深了复习时迷失）
- **例外**：内容极密的章（如《GPT图解》第6章 Transformer 十大组件）可用嵌套子列表（叶子下再缩进一级子项）——markmap 渲染为更深节点、可折叠，比平铺 30 个叶子复习体验好
- 叶子 = **最小复习单元**：一个概念 / 一个方法 / 一个公式 / 一个实验结论——看到标题能回忆起内容的粒度
- **覆盖所有知识要点**（用户核心诉求）：逐章逐节过，不跳过自认为「不重要」的内容；书的序章/前言/后记有独立知识价值也收录

**节点文案**：
- 叶子 ≤ 20 字短句；章节名沿用原书（可去掉修辞性副标题）
- 关键词用 `**加粗**`；代码/术语用 \`反引号\`；公式内联写（如 `P(w|context)`）
- 解释性长文本**不进导图**（导图是复习索引不是笔记替代品）

**示例**（格式参考，禁止照抄内容）：

```markdown
# 《GPT图解》

## 第5章 注意力机制

### Q/K/V 三元组
- **Query** 查询 · **Key** 键 · **Value** 值
- `Attention(Q,K,V) = softmax(QKᵀ/√d)V`
- **缩放因子 √d**：防内积过大 softmax 饱和

### 核心思想
- 解码每步**回看**整个输入序列
```

## 坑位清单

1. **一次读完全书再总结必炸上下文**——Step 2 的分章处理是硬性流程，不是优化项
2. mindmap.md 存 `public/books/`（不是 `docs/books/`）：public 原样拷贝供 fetch 原文；docs/books/ 的 md 会被 VitePress 编译成页面（那是 dir 文档机制的领地）
3. yaml 字段名是 `mindmap`（目录名），不是布尔——前端按 `mindmap: <slug>` fetch
4. markmap 对 `#` 前的 frontmatter 不友好——mindmap.md **不要写 frontmatter**，直接 H1 开头
5. 节点里慎用 markdown 链接/图片（渲染成小按钮很难点）；加粗/代码/行内公式安全
6. 公式用 Unicode/内联代码写法（`wₙ`、`√d`），不要用 LaTeX 块（markmap 不渲染 KaTeX 块）
7. 公开内容红线：mindmap.md 是公开资源，不含个人路径/标识
