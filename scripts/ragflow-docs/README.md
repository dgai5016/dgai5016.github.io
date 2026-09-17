# RAGFlow 双语文档管线

RAGFlow 官方文档（[ragflow.io/docs](https://ragflow.io/docs/)）的抓取、清洗、翻译、配对、发布流水线。
产出《RAGFlow 学习地图》文章（`docs/posts/ai/ragflow/ragflow-docs-guide.md`）里 129 个双语阅读单元：
浮层左侧英文原文、右侧中文译文、逐段水平对齐。

- **快照版本**：2026-09-16 抓取（对应 RAGFlow v0.27.x 时期，源仓库 `infiniflow/ragflow-docs` main 分支）
- **覆盖范围**：官方文档全量 112 篇；HTTP API（231KB）切 11 片、Python API（73KB）切 4 片、更新日志（79KB）切 5 片
- **依赖**：仅 Python 标准库

## 数据流

```
GitHub 官方文档源码（raw 直链）
      │
      ▼  ① fetch-originals.py（抓取+清洗+切分）
docs/posts/ai/ragflow/en/<slug>.md   ←── ⑦ manifest.py（全链路清单/单一事实源）
      │
      ▼  ①′ localize-images.py（图片自托管：下载到 public/ragflow-images/ + 改写本地路径）
      │
      ▼  ② 精翻（baoyu-translate refined 六步，参考 shared-context.md）
docs/posts/ai/ragflow/zh/<slug>.md
      │        ↑ 过程中用 ③ check-alignment.py 校验块数 1:1
      ▼  ④ build-paired.py（逐段配对）
docs/posts/ai/ragflow/paired/<slug>.md ──→ 浮层 BilingualOverlay 懒加载渲染
      │
      ▼  ⑤⑥ 配套生成
docs/.vitepress/theme/ragflow-docs-manifest.ts / 文章里的 <RagflowDocLink> 链接
```

## 脚本清单

| 脚本 | 作用 |
|---|---|
| `manifest.py` | **单一事实源**：129 个阅读单元的清单（slug、官方路径、分组、中英标题、切分配置、插入锚点）。其他脚本全部 import 它，改清单只改这一个文件 |
| `fetch-originals.py` | 抓官方 markdown/MDX → 清洗 Docusaurus 语法（剥 frontmatter/import、`<Tabs>/<TabItem>` 转加粗小标题、`<APITable>` 拆壳、相对链接绝对化、缩进容器顶格化、容器类型映射 caution→warning / note→info）→ 巨页按 H2 切片 → 落盘 `en/`。支持过滤参数增量抓取 |
| `blocksplit.py` | 共享切块器：按空行分块，代码围栏内、`:::` 容器内、`<details>` 内不切（标签拆散会导致 Vue 编译报错）。`check-alignment` 与 `build-paired` 共用，保证两处块数口径一致 |
| `check-alignment.py` | 翻译质检：对比 en/zh 块数，MATCH 才允许发布；MISMATCH 打印首个差异块定位 |
| `build-paired.py` | en+zh 逐块包裹成 `<BiRow>`（左英右中）生成 `paired/`；丢弃文首 H1、剥残留 JSX 属性；块数失配整篇降级单行对照兜底 |
| `gen-manifest.py` | manifest.py + `en/` 实际分片 → 生成前端 `ragflow-docs-manifest.ts`（浮层标题/上下篇/原文链接的数据源）。分片按锚点插入保证翻页动线与文章板块一致 |
| `localize-images.py` | 图片本地化：把 en/zh 里热链的 raw.githubusercontent 图片（国内经常不可达，浮层裂图）下载到 `docs/public/ragflow-images/` 自托管，引用改写为 `/ragflow-images/<文件名>`。经 jsDelivr CDN 下载（raw 通道回退），增量可重跑 |
| `convert-links.py` | 把文章里编号形态的官方外链 `**N. [译名](url)**` 批量换成 `<RagflowDocLink>` 组件标签（分片条目共用 URL，需手写） |

## 官方文档更新后怎么维护（三种场景）

### 场景 A：官方改了某几篇（最常见）

```bash
# 1. 增量重抓变动的篇目（前缀匹配，只覆盖对应 en/，不动其他文件）
python3 scripts/ragflow-docs/fetch-originals.py guides-dataset-configuration
# 1′. 图片本地化（抓取引入的新图自动下载，已有图片跳过）
python3 scripts/ragflow-docs/localize-images.py

# 2. 删掉该篇旧译文和配对（旧 zh 是按旧版原文逐块对齐的，原文变了就失效）
rm docs/posts/ai/ragflow/zh/guides-dataset-configuration.md
rm docs/posts/ai/ragflow/paired/guides-dataset-configuration.md

# 3. 重新精翻这一篇：读 docs/posts/ai/ragflow/shared-context.md（共享上下文+术语表+块对齐硬约束）
#    + .baoyu-skills/baoyu-translate/ragflow-glossary.md → refined 六步
#    → check-alignment.py 校验 MATCH → 落 zh/<slug>.md → 删 en/<slug>-zh-CN/ 中间目录

# 4. 重新配对
python3 scripts/ragflow-docs/build-paired.py guides-dataset-configuration
```

### 场景 B：官方新增了文档

1. `manifest.py` 的 ENTRIES 按板块位置插一行（slug / 官方路径 / 分组 / 中英标题）
2. `python3 scripts/ragflow-docs/fetch-originals.py <新slug>` 增量抓取
3. `python3 scripts/ragflow-docs/localize-images.py` 图片本地化
4. `python3 scripts/ragflow-docs/gen-manifest.py` 重新生成前端清单
5. 文章加条目（注意后续条目编号顺延 +1）
6. 翻译 → 配对（同场景 A 的 3~4 步）

### 场景 C：大版本升级（大面积变动）

**不建议全量重做**（等于重翻全部内容）。务实做法：对照
[ragflow-docs 仓库提交记录](https://github.com/infiniflow/ragflow-docs/commits/main)
找出变动的文件，按场景 A 逐篇更新；完成后把文章里的「版本快照」日期改成新抓取日期。

## 已知问题

- **官方死链 3 张**：`guides-kc-apply-template`（应用知识编译模板）引用的 `apply-knowledge-compilation-template-*.png` 三张图**官方仓库从未提交**（GitHub 搜索确认），ragflow.io 上同样裂图——按快照原则保留原样，未本地化

## 注意事项

- **前缀是粗匹配**：`fetch-originals.py guides-dataset` 会重抓整个 dataset 板块——没变的篇重抓后内容一样（无副作用），对应 zh 不用动
- **全量重抓有风险**：不带参数运行会覆盖全部 `en/`；上游若已更新，改写的 en 与已译 zh 会块数错位——增量更新务必带前缀参数
- **图片一律自托管**：不要把 raw.githubusercontent 的图片链接留在 en/zh 里（国内不可达）；fetch 后必跑 `localize-images.py`
- **配对降级**：`build-paired.py` 输出里出现 `FALLBACK` 表示该篇块数失配、已降级为整篇对照——应修复 zh 块结构后重建
- **构建内存**：全站构建需 `NODE_OPTIONS=--max-old-space-size=4096`（已写入 package.json 的 build 脚本，勿删）
- 姊妹管线：MCP 双语文档在 `scripts/mcp-docs/`（无本 README 的维护流程，仅一次性产物）
