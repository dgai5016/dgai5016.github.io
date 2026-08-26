---
name: dg-add-book
description: 给博客书单页（docs/books/*.yaml）添加一本书的完整流程：查豆瓣元数据（作者/译者/出版社/出版年）、下载处理封面图（防盗链下载/方图分诊裁剪/144px 压缩）、解析京东商品页 SKU 链接、按规范填 yaml（jd/douban/weread 三胶囊字段，缺哪个平台不写哪个）、本地 dev 验收。Use when 用户说「加本书 X」「书单加书」「把 X 加到书单」「X 加到人工智能书单」「add book」或要在书单页新增书目（支持一次多本）。京东链接的唯一稳定来源是豆瓣购买区联盟跳转链的 ReturnUrl 解析（京东搜索/商品页直访会触发登录墙/风控）；京东没有的书不写 jd，绝不拿豆瓣链接充数（豆瓣是独立 douban 字段）。豆瓣未收录的新书走冷启动路径（出版社官网 + 当当）。Does NOT 改阅读状态（status）、删书、建新主题 yaml、commit/push（提交走 dg-git-push）。
---

# dg-add-book：书单加书流程

输入「书名（+可选作者）」，产出书单页上可直接验收的一本书：封面缩略图、元信息行（作者 著 / 译者 译 · 出版社 · 出版时间）、「京东」购买胶囊、「豆瓣」评分胶囊、「微信读书」阅读胶囊（哪个平台缺就不渲染哪个）。所有命令在**博客仓库根目录**执行。

## 前置条件

- 本仓库 node_modules 里有 playwright（脚本从仓库根解析，无需额外安装）
- python3 带 PIL（处理封面用，系统自带）
- dev 服务器（`npm run dev`，5173 已在跑就不用重启）

## 流程

### Step 0 解析输入

从用户话里拿：书名、作者（可选）、目标主题。主题对应 `docs/books/` 下的 yaml 文件（`ai.yaml`=人工智能、`howtoread.yaml`=如何阅读）。**分类判断走三级规则**：

1. **用户指定（最优先）**：指令里带了主题（如「加到人工智能书单」）直接用
2. **没指定 → 按书的内容推断**：推断依据按可靠性排序——豆瓣信息区的**丛书名/出品方**（异步图书、图灵出品 → 基本是 AI/编程书）> **内容简介/标签关键词** > 书名本身。别只看书名就定
3. **推断不了（主题模糊）→ 停下来问用户**，别硬塞。比如「卡片笔记写作法」跟阅读沾边但不算阅读方法书

**特殊情况：书不属于任何现有主题**（如经济、历史类）——停下来明确告知「现有主题都不合适」，由用户决定：先手动建新主题 yaml（建新主题不归本技能管），还是就近放进某个现有主题。绝不擅自新建 yaml。

### Step 1 找豆瓣条目

1. WebSearch `书名 作者 豆瓣 book.douban.com/subject` 拿 subject ID（链接里的数字）
2. 搜不到 → 调 `dg-douban-book` skill（Playwright 搜豆瓣）拿 Douban URL
3. 还没有（新书未收录）→ 走 Step 2' 冷启动路径

注意：同名书多个版本时选**中文版**条目（看作者/译者/出版社）。

### Step 2 抓豆瓣数据（有条目时）

```bash
node .claude/skills/dg-add-book/scripts/fetch-douban.cjs <subjectId>
```

输出（stdout + /tmp/douban-fetch.json）：书名、封面大图 URL、信息区文本（作者/译者/出版社/出版年）、京东联盟链解析出的 SKU。多本书空格分隔一次传入（脚本串行 + 2.5s 间隔防限流）。

### Step 2' 冷启动路径（豆瓣无条目的新书）

1. WebSearch 书名找**出版社官网**页拿元数据（作者/出版时间；GBK 编码页面用 python 解码，参照蓝本：`open(p,'rb').read().decode('gbk',errors='ignore')`）
2. **当当搜索页** WebFetch 拿封面图：`http://search.dangdang.com/?key=<书名>`（服务端渲染可直接抓；封面 URL 是 `img*.ddimg.cn`，`_b_` 缩略图换 `_u_` 拿大图）
3. 京东 SKU：WebSearch `书名 京东 jiage` 找京东价格聚合页，WebFetch 该页提取 `item.jd.com/<sku>.html`（选**自营**、评论多的那个）

### Step 3 处理封面

```bash
python3 .claude/skills/dg-add-book/scripts/process-cover.py --url <图片URL> --slug <slug>
```

脚本自动按域名带 referer 防盗链、方图分诊（白底书自动裁白边）、**输出双规格**：

- `docs/public/covers/books/<slug>.jpg` — 列表缩略图（144px 高，yaml 的 cover 字段指它）
- `docs/public/covers/books/<slug>-full.jpg` — 灯箱高清图（600px 高，页面点封面放大时按命名约定加载，**必须两份都有**）

**退出码 2 = 非白底设计方图，脚本拒绝乱裁**（乱裁会切书名，真实案例：《读书变现》方形封面）。此时：先用视觉能力/analyze_image 分析原图书名和主视觉的位置，再用 `--box "x1,y1,x2,y2"` 指定裁剪区重跑。

**slug 命名**：小写英文连字符；书有英文主标题用之（AI Engineering→ai-engineering）；书有 dir 字段的保持同名；拼音或意译（统驭工程→harness-engineering）。

### Step 4 京东链接兜底 + 豆瓣胶囊

正常情况 Step 2 已拿到 SKU。没有时按序降级：

1. Step 2' 的第 3 步（京东价格聚合页）
2. 仍无 → **不写 `jd` 字段**（绝不把豆瓣链接塞进 jd——页面会渲染成误导的「京东」胶囊），并**明确告知用户**这本书没有京东链接
3. 链接格式统一 `https://item.jd.com/<sku>.html`

**`douban` 字段（豆瓣胶囊）**：只要 Step 1/2 找到了豆瓣条目就必须写（`https://book.douban.com/subject/<id>/`，Step 2 输出的 subjectId 直接拼）；豆瓣未收录（微信读书原创/自媒体电子书）不写，页面自动不渲染豆瓣胶囊。京东和豆瓣是两个独立胶囊，有京东链接的书两个都写。

### Step 4.5 微信读书链接（weread，可选）

未登录可用的搜索 API（curl 直接调，返回 JSON）：

```bash
curl -sS -A "<Chrome UA>" "https://weread.qq.com/web/search/global?keyword=<书名URL编码>&maxIdx=0&fragmentSize=1200000"
```

- 链接构造：候选项 `books[].bookInfo.deepLink`（形如 `...book-detail?type=1&v=<hash>`）取 `v` 参数 → `https://weread.qq.com/web/reader/<hash>#outline?noScroll=1`（锚点让打开页直接定位到书籍信息/目录）
- **必须双核对**（title 前缀匹配 + 作者名核心部分 或 出版社匹配）：同名书极多（《如何阅读一本书》第一名是「轻阅读编写组」的山寨版，正确的是商务印书馆艾德勒版）；微信读书书名可能带丛书前缀（《阅读 7 堂课》在微信读书叫《秋叶特训营：阅读7堂课》），按作者+出版社核对
- 未上架（搜不到可靠匹配）→ **不写 weread 字段**，页面自动不渲染胶囊，并告知用户
- 不做下架判断：微信读书的下架书对已加书架/已购用户仍可读（访客视角才报「本书已下架」），链接是否保留由用户自己决定，技能只负责搜索 API 里能找到的版本（2026-08 定）

### Step 5 填 yaml

按下方规范速查把字段填进目标主题 yaml 的 books 数组（追加到末尾），并**给新书标 `level` 难度等级**（见下方「排序设计」）。新书一般不写 `status`（读完才写）。

## 排序设计（由易到难）

主题内排序规则（`books.data.ts` 的 `sortBooks`）：**简单 → 中等 → 困难**，未标 level 排最后；同级内保持 yaml 书写顺序；「读完」只是状态标签**不影响排序**（书单顺序 = 推荐阅读路径）。level 不在页面显示。

**level 判断标准**（新书必标，按优先级）：

| level | 特征 | 关键词信号 | 例子 |
|-------|------|-----------|------|
| 简单 | 零基础可读，科普/方法论，几乎不要代码基础 | 零基础、入门、科普、图解×+无代码要求 | 零基础学机器学习、这就是ChatGPT、鱼书 |
| 中等 | 需要编程/前置知识，系统学原理或工具 | 原理、进阶、图解×+动手代码、工具链 | GPT图解、从零构建大模型、图解Skill |
| 困难 | 工程实战/架构/面试/深度专题 | 实战、架构、工程、面试、Agent 开发 | RAG实战课、统驭工程、AI工程 |

拿不准时看豆瓣内容简介判断；两可之间取低的（简单侧）——书单是给读者由易到难爬坡用的。

**写入位置**：`level` 放 title 行后。想微调同级内顺序直接挪 yaml 条目顺序。

### Step 6 验证 + 交付

```bash
node .claude/skills/dg-add-book/scripts/verify-books.cjs   # DOM 全检 + 桌面/375px 截图
npm run build                                              # 生产构建确认
```

dev 热更新即时生效，把 `http://localhost:5173/pages/books` 交给用户验收。**不主动 commit**，等用户说「提交」走 dg-git-push。

## yaml 字段规范速查

```yaml
  - title: 《书名：副标题》        # 全角冒号不用引号；半角「: 」必须引号包整个值
    level: 简单                   # 难度等级：简单/中等/困难，只影响排序（由易到难），页面不显示
    author: "[越] 奇普·萱"        # 翻译书写原作者；多人用「、」；[国] 前缀的值必须加引号（否则 YAML 解析成数组）
    translator: 宝玉              # 可选；多人用「、」；中文原创书不写
    publisher: 人民邮电出版社      # 可选
    pubDate: "2026-02"            # 可选；必须带引号！只有年份写 "2020"
    pages: 254                    # 可选；页数（数字），豆瓣 info 有就顺手抄；缺了可 WebSearch「书名 出版社 页数」补（人邮官网/图书馆书目可靠）；纯电子书（微信读书原创）没有则不填
    cover: /covers/books/<slug>.jpg  # 站点绝对路径
    jd: https://item.jd.com/<sku>.html  # 京东商品页；没有京东链接就不写，别填别的链接
    douban: https://book.douban.com/subject/<id>/  # 豆瓣条目页（豆瓣胶囊）；豆瓣未收录不写
    weread: https://weread.qq.com/web/reader/<hash>#outline?noScroll=1  # 可选；未上架不写；锚点必须带（打开直接看书的信息）
    status: 读完                  # 可选；只认「读完」
    dir: <目录名>                 # 可选；docs/books/ 下子目录，挂读书笔记
```

出版年规范化：豆瓣 `2023-12-1` → `"2023-12"`；`2020` → `"2020"`。

## 坑位清单（实战学费，别再踩）

1. **京东搜索页/商品页直接访问 = 登录墙/风控验证**（PC 和移动版都一样，Playwright 带 UA 也挡）。别浪费时间试，唯一稳定路径：豆瓣购买区联盟链 → Playwright 打开 → 从落地 URL（哪怕跳登录页）的 ReturnUrl 参数里正则提 `item.jd.com/(\d+).html`
2. **豆瓣 WebFetch 并行必限流**（503/超时），一次一本或用脚本串行；脚本有 cookie 持久化（/tmp/douban-state.json）降低风控概率
3. **封面方图两类**：白底居中书（脚本自动裁白边 ✓）；设计方图（非白底，如《读书变现》）→ 脚本会拒绝并要求视觉分析后 --box 手动裁
4. **豆瓣/当当图片有 referer 防盗链**：curl/下载必须带对应站点 referer（脚本已内置映射）
5. 豆瓣作者写法和用户说的不一致（奇谱 vs 奇普）→ 以豆瓣条目为准，但**明确告知用户**差异
6. 临时产物（原图/脚本输出）只进 /tmp，不进仓库
7. 豆瓣信息区可能缺出版年（《读书变现》）→ WebSearch 书名+ISBN 补
8. 当当搜索页返回的封面可能是占位图（url_none.png），要挑真实图；`_b_` 后缀换 `_u_` 拿 800px 大图（部分书只有方图）
9. 微信读书搜索 API 免登录可用但**同名书多**：必须作者/出版社双核对，别拿第一名；书名可能带丛书前缀（阅读7堂课→秋叶特训营：阅读7堂课）
10. **`jd` 字段只放京东链接**：历史上曾把豆瓣链接塞 jd 兜底，页面渲染出假「京东」胶囊误导点击；2026-08 起拆出独立 `douban` 字段，老 yaml 里 jd 塞豆瓣链接的已全部迁移
11. **verify-books 报「封面未加载/破图」先想懒加载**：书单页封面是 `loading="lazy"`，首屏外的图不滚不动——脚本已内置整页滚动，但自写检查代码时记得先滚再查 naturalWidth，否则满屏误报（85 本时踩过：39 本误报破图，实际 curl 全 200）

## 边界

不做（description 已声明）：改阅读状态、删书、建新主题、commit/push。前三个是改一行 yaml 的事，直接编辑即可；提交统一走 dg-git-push。
