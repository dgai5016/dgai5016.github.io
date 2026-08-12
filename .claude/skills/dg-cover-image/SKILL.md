---
name: dg-cover-image
description: Generates flat-vector polished SVG cover images (16:9) for articles with pure SVG string concatenation (zero dependencies, no bitmap API). Reuses svg-helpers from dg-article-illustrator-svg. Aligned with blog cover aesthetic. Use when user asks to "生成封面", "做封面图", "cover image", "文章封面", or wants a flat-vector SVG cover. Requires bun + dg-article-illustrator-svg (shared svg-helpers).
version: 1.0.0
metadata:
  openclaw:
    homepage: https://github.com/dgai5016/dg-skills#dg-cover-image
    requires:
      anyBins:
        - bun
---

# dg-cover-image（扁平矢量精致风 SVG 文章封面）

读文章标题/主题，用**纯 SVG**（`scripts/cover-helpers.cjs`，复用 `dg-article-illustrator-svg` 的 svg-helpers）生成 16:9 扁平矢量风封面——渐变背景 + 装饰几何 + 大标题 + 副标题 + 标签。**零依赖、不调任何位图 API、矢量、文字锐利、可缩放**。

和 baoyu-cover-image（位图 API）的区别：本 skill 用纯 SVG 代码画，零额度，风格和正文配图（dg-article-illustrator-svg）统一。

**职责边界：**
- ✅ **做**：读文章标题/主题、选 palette + 装饰变体、生成 16:9 SVG 封面、替换/插入文章封面引用
- ❌ **不做**：调任何位图 API（glm-image/DALL·E/codex）、生成位图、正文配图（那是 dg-article-illustrator-svg 的活）

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., `AskUserQuestion`, `request_user_input`, `clarify`, `ask_user`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into one call.

## Cover Generation（cover-helpers）

本 skill 用 `scripts/cover-helpers.cjs` 生成 16:9 封面（1728×960）。cover-helpers 复用 `dg-article-illustrator-svg/scripts/svg-helpers.cjs`（共享组件库，单一源）。完整 API + 装饰变体 + gen 脚本模板见 [references/cover-usage.md](references/cover-usage.md)。

**依赖：零依赖。** 只需 bun（跑 `.cjs`）。cover-helpers 通过 robust require 找 dg-article-illustrator-svg 的 svg-helpers（见 cover-usage.md），无需手动设 NODE_PATH、无需安装任何包。

**硬规则：**
- ✅ 用 `coverWrap({palette, title, subtitle, tag, decor})` 一行拼完整封面。
- ✅ 文字用 cover-helpers 的 `coverTitle/coverSubtitle/coverTag`（自带无衬线栈 + XML 转义，中文 PingFang SC）。
- ✅ 渐变用 svg-helpers 的 `linearGradient`，投影用 `feDropShadow`。
- ✅ 输出 `.svg`（矢量），16:9（1728×960）。
- ✅ 文字溢出/坐标错 → 改 gen 脚本重跑（即时反馈，无需重调 API）。

## 封面参数

| 参数 | 取值 | 说明 |
|---|---|---|
| `palette` | tech / soft / vibrant / mono | 配色（默认 tech，和正文图统一） |
| `decor` | dots / waves / grid / shapes | 装饰变体（按主题或轮换，避免多封面雷同） |
| `title` | 文章标题（中文） | 大标题，居中 |
| `subtitle` | 副标题（可选） | 英文名 / 一句话描述 |
| `tag` | 顶部标签（可选） | 如「AI · 深度学习」「Skill 指南」 |

## Confirmation Policy

Default behavior: **confirm before generation**.

- 被用户直接调用时默认确认；被 agent（skill-post-publisher / ai-post-publisher）调用时通常「直接生成」跳过确认。
- Skip confirmation only when the request explicitly says "直接生成", "不用确认", "跳过确认", or equivalent.
- 跳过时在下条消息声明假定的 palette / decor / title / subtitle / tag。

## Workflow

```
- [ ] Step 1: 读文章标题/主题
- [ ] Step 2: 选 palette + 装饰变体
- [ ] Step 3: 确认（或「直接生成」跳过）
- [ ] Step 4: 写 gen 脚本 + bun run 生成 16:9 SVG
- [ ] Step 5: 替换/插入文章封面引用
```

### Step 1: 读标题/主题

从 frontmatter `title`（或文件名）取主标题；从 `excerpt` / `tags` 提炼 `subtitle`（英文/一句话）和 `tag`（分类，如「AI · 深度学习」「Skill 指南」「编程 · 工具」）。

### Step 2: 选 palette + decor

- **palette**：默认 `tech`（和正文图统一）；文章主题强信号可换（暖系/生活 → soft，活力/产品 → vibrant，极简/对比 → mono）。
- **decor**：多张封面轮换避免雷同——`dots`（科技感）/ `waves`（流动感）/ `grid`（工程感）/ `shapes`（概念感）。详见 [cover-usage.md](references/cover-usage.md) 装饰变体表。

### Step 3: 确认

ONE AskUserQuestion（max 2 Q）：Q1 palette、Q2 decor（title/subtitle/tag 已从文章确定）。或「直接生成」跳过。

### Step 4: 生成 SVG

写 gen 脚本 `gen/cover-<slug>.cjs`（参考 [cover-usage.md](references/cover-usage.md) + `examples/cover-attention.cjs`），`bun run gen/cover-<slug>.cjs <output>.svg`。

### Step 5: 替换/插入封面引用

封面输出到 `docs/public/covers/<slug>.svg`，文章顶部用：
```html
<img src="/covers/<slug>.svg" alt="<标题> 封面" />
```
若文章已有旧封面（base64 内联 / 位图 png），替换之。

## Output Directory

| 位置 | 输出路径 | 文章引用 |
|---|---|---|
| 默认（public） | `docs/public/covers/<slug>.svg` | `/covers/<slug>.svg` |
| 文章旁 | `{article-dir}/cover.svg` | `cover.svg`（相对） |

## References

| File | Content |
|---|---|
| [references/cover-usage.md](references/cover-usage.md) | cover-helpers API + 4 装饰变体 + gen 脚本模板 |
| `examples/cover-attention.cjs` | 可跑示例（注意力机制封面，tech + shapes） |
