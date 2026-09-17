# rules/bilibili.md：B站视频总结规则

被 [SKILL.md](../SKILL.md) 路由调用。输入 = dg 的观看笔记（必须）+ 视频 URL（可选）。产出 = `docs/posts/summary-resources/<BV号小写>.md` 一篇「N 条资料总结」博文。

## 输入

- **dg 的笔记**（必须）：看视频时记下的重点，可能零散、口语化、有错别字、顺序乱
- **视频 URL**（可选）：支持标准链（`bilibili.com/video/BVxxxx`）和短链（`b23.cc/xxx`）

## Step 1 整理 dg 的笔记

1. 逐条解读：口语化表达还原成完整意思，修正错别字，但**不改变原意**
2. 去重合并：说的同一件事合并为一条，保留更完整的表述
3. 粗排：按内容逻辑（是什么 → 为什么 → 怎么做 → 边界）排序
4. 统计有效条数 N_seed，进入 Step 3 判断补足策略

## Step 2 视频信息抓取（有 URL 时）

### 前置：yt-dlp 检查与安装

```bash
yt-dlp --version || python3 -m yt_dlp --version   # 检查是否已装
```

未装时：说明体积约 50MB，征求 dg 同意后执行 `pip install yt-dlp`（与 dg-learntime-estimate 同一约定，装一次全局复用）。

### 元数据（标题 / 时长 / UP主）

```bash
yt-dlp --print "%(title)s|%(duration)s|%(uploader)s" --no-playlist <URL>
```

输出一行 `标题|秒数|UP主名`。duration 是秒，博文里换算成「xx 分钟」。

### CC 字幕

```bash
yt-dlp --list-subs --no-playlist <URL>             # 列出可用字幕，确认有无中文字幕
yt-dlp --write-subs --sub-langs "zh-CN,zh-Hans" --sub-format "srt/json3" \
       --skip-download --no-playlist \
       -o "/tmp/dg-summarize-resources/%(id)s" <URL>
```

- 下载得到的 srt / json3 字幕文件由 Claude 直接通读，提炼有信息量的点
- 临时产物只进 `/tmp/dg-summarize-resources/`，绝不落进仓库

## Step 3 补足降级链（核心策略，按序判断）

1. **N_seed ≥ 10** → 只整理不补，从笔记里挑最有价值的 10 条
2. **N_seed < 10 且拿到了字幕** → 通读字幕，提取有信息量的点补齐到 10 条（跳过寒暄、口癖、重复内容、纯情绪表达）
3. **无字幕或没给 URL** → 深挖笔记细化补：把一条粗笔记拆成「观点 + 支撑/例子」两条、补充确定无疑的领域常识做关联——但**不为凑数稀释质量**
4. **仍不足** → 如实输出 N 条，标题写 N 条，并在交付时告知 dg「字幕不可得，只整理出 N 条」

任何情况下**绝不编造**视频里没有的内容。

## Step 4 撰写博文

- 文件：`docs/posts/summary-resources/<BV号全小写>.md`（如 `bv1xx411c7md.md`）；无 URL 时用 dg 提供的视频名音译英文 slug
- frontmatter 严格按主路由通用契约的模板；写之前先跑 `TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M"` 取真实时间
- 正文模板（精简版，无封面）：

```markdown
## 📺 来源

《视频名》 · UP主名 · [B站链接](展开后的完整链接)
时长 xx 分钟

## N 条资料总结

**1. 要点句。**
展开说明 1-3 句。

**2. 要点句。**
展开说明 1-3 句。

（……共 N 条）

## 延伸

（可选：相关阅读 / 后续行动；没有可写的就整节省略）
```

- UP主名、视频名、时长优先用 Step 2 抓到的元数据；没 URL 时用 dg 笔记里提到的名字，链接留空待 dg 后补
- dg 的笔记条目排前面，字幕补足条目自然融入，不区分标注来源

## Step 5 验收

- `npm run dev`（5173 已在跑就不换端口），让 dg 在浏览器直接看活文章
- 检查点：首页出现该文；标签页出现 `[资料总结]` 标签且能筛出该文；文章页条目渲染、TOC 正常

## 失败处理

| 失败情形 | 处理 |
| --- | --- |
| yt-dlp 未装 | 说明 ~50MB，征求同意后安装 |
| URL 失效 / 视频删除 | 报告 dg，降级为纯笔记深挖（Step 3-3 起步） |
| 无 CC 字幕 | 直接进 Step 3-3（B站「AI 字幕」需登录 cookie，v1 不碰） |
| 字幕文件乱码 | 换 `--sub-format`（srt ↔ json3）重下 |
| 命中风控（403/412） | 报告 dg，降级为纯笔记深挖 |

## 坑位清单（实战学费，别再踩）

1. b23.cc 短链 yt-dlp 会自动跟随重定向，但**博文里要放展开后的完整 bilibili.com 链接**（从 `--print "%(webpage_url)s"` 或元数据拿）
2. 本技能抓单集一律带 `--no-playlist`——与 dg-learntime-estimate 正好相反（那个要估整个合集时长所以展开所有 P，这里只要单集的字幕和元数据）
3. `%(duration)s` 输出的是**秒**，博文里要换算成分钟
4. 字幕临时文件在 `/tmp/dg-summarize-resources/`，别让任何临时产物落进仓库
5. 文件名 BV 号**全小写**（B站原始大小写混合）

## 边界

- 不下载视频本体（`--skip-download`）
- 不碰需要登录的内容（AI 字幕、会员专属视频）
- 不做逐字转录 / 翻译
- 不生成封面（v1）
- v1 只总结单集视频；整个合集的总结等未来需求再说
