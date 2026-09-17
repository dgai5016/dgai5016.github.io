# Vector Database 101 双语翻译共享上下文（shared-context）

> 本文件是给翻译者（baoyu-translate refined 模式）的统一指令。
> 适用于《Vector Database 101》全系列 12 篇：`en/<slug>.md` → `zh/<slug>.md`。

## 内容背景

- 来源：Zilliz Learn 官网《Vector Database 101》向量数据库入门课程（Milvus 出品方）
- 体裁：科普型技术教程，口语化、轻幽默（作者会开玩笑着说「这不性感」「比线性代数可怕多了」），不是严肃论文
- 受众：中文技术读者——会写代码、懂基本编程概念，但**不一定**懂向量数据库 / 机器学习数学

## 语体要求

- 自然流畅的中文技术科普腔，保留原文的轻松幽默感，不要翻译腔
- 「you」在泛指读者时可译「你」，口语感优先
- 轻幽默处（如 "hello, Skynet"）照译并保留味道（→「你好啊，天网」）

## 术语表（全系列统一）

| 英文 | 中文 |
| --- | --- |
| vector database | 向量数据库 |
| unstructured data | 非结构化数据 |
| semi-structured data | 半结构化数据 |
| embedding / embedding vector | 嵌入向量（首次出现标注英文） |
| approximate nearest neighbor (ANN) search | 近似最近邻搜索（ANN） |
| inverted file (IVF) index | 倒排文件索引（IVF） |
| scalar quantization | 标量量化 |
| product quantization | 乘积量化 |
| recall | 召回率 |
| flat indexing | 暴力索引 / Flat 索引 |
| HNSW / ANNOY / DiskANN | 保留英文（首次给中文全称） |
| graph traversal | 图遍历 |
| centroid | 质心 |
| subspace | 子空间 |
| Milvus / FAISS / Zilliz | 保留英文 |
| deterministic / probabilistic | 确定性 / 概率性 |
| relational algebra | 关系代数 |

产品与技术名词（MySQL、NoSQL、pymongo、kmeans2 等）保留英文原样。

## 块对齐硬约束（最重要）

zh 译文的**空行块数必须与 en 原文严格 1:1**（脚本 `scripts/vector-db-docs/check-alignment.py <slug>` 校验）：

1. 逐块翻译：en 的第 N 块 ↔ zh 的第 N 块，标题对标题、段落对段落、列表对列表、表格对表格、代码块对代码块
2. **代码块原样复制**（不翻译、不改动内容，包括 `>>>` 提示符与输出）
3. **图片行原样复制**：`![alt](/vector-db-images/...)` 整行不动（alt 也不动）
4. **表格**：结构与行列数保持一致，单元格内容翻译
5. **数学公式**：`$...$` 与 `$$...$$` 块**逐字符原样保留**，绝不翻译公式内部，**中文绝不能进 $ 数学块**（KaTeX 会渲染报错）
6. 文首 `# H1 标题` 也要翻译成中文（保持是 H1）
7. 脚注段落（形如 "1In essence, ..." 的独立段落）照常翻译成独立段落
8. 块内换行结构尽量保持（列表条数一致）

## 落盘安全

- 产出文件：`docs/posts/ai/vector-db-101/zh/<slug>.md`
- **文件内容含 `$` 符号时，必须用 bash heredoc（`<<'EOF'` 带引号定界符）或 python 写入**，不要用会损坏 `$` 序列的写法
- 落盘后必须跑 `python3 scripts/vector-db-docs/check-alignment.py <slug>`，MISMATCH 就修到 MATCH

## 完成标准

每篇：check-alignment MATCH + 抽读首尾两块语义完整。
