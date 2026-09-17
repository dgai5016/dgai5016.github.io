---
title: Vector Database 101 学习地图：Zilliz 向量数据库课程 12 篇导航与阅读顺序
date: 2026-09-17 15:04
tags: [向量数据库]
excerpt: Vector Database 101 是 Milvus 出品方 Zilliz 的向量数据库入门课程，从非结构化数据一路讲到 IVF、量化、HNSW、DiskANN 等索引算法。全部 12 篇已译成中文——点击条目即开左右对照双栏阅读，想系统学向量数据库，从这一页出发就够了。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4ODAiIGhlaWdodD0iMzQwIiB2aWV3Qm94PSIwIDAgODgwIDM0MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Y1ZjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlZGU5ZmUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI4ODAiIGhlaWdodD0iMzQwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxnIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMzUiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgIDxsaW5lIHgxPSIxMjAiIHkxPSI5MCIgeDI9IjIxMCIgeTI9IjE1MCIvPgogICAgPGxpbmUgeDE9IjIxMCIgeTE9IjE1MCIgeDI9IjE1MCIgeTI9IjIzNSIvPgogICAgPGxpbmUgeDE9IjIxMCIgeTE9IjE1MCIgeDI9IjMzMCIgeTI9IjEyMCIvPgogICAgPGxpbmUgeDE9IjMzMCIgeTE9IjEyMCIgeDI9IjMwMCIgeTI9IjIyMCIvPgogICAgPGxpbmUgeDE9IjE1MCIgeTE9IjIzNSIgeDI9IjMwMCIgeTI9IjIyMCIvPgogIDwvZz4KICA8ZyBmaWxsPSIjNmM2M2ZmIj4KICAgIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjkwIiByPSI5Ii8+CiAgICA8Y2lyY2xlIGN4PSIzMzAiIGN5PSIxMjAiIHI9IjEyIi8+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMzUiIHI9IjciLz4KICAgIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjIyMCIgcj0iNyIvPgogIDwvZz4KICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSIxNTAiIHI9IjE0IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGNpcmNsZSBjeD0iMjEwIiBjeT0iMTUwIiByPSIyNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utb3BhY2l0eT0iMC40IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIvPgogIDxnIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmIj4KICAgIDx0ZXh0IHg9IjQzMCIgeT0iMTQwIiBmb250LXNpemU9IjQ0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzEyZTgxIj5WZWN0b3IgRGF0YWJhc2UgMTAxPC90ZXh0PgogICAgPHRleHQgeD0iNDMwIiB5PSIxODUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2YzYzZmYiPlppbGxpeiDlkJHph4/mlbDmja7lupPlhaXpl6jor77nqIsgwrcg5Y+M6K+t57K+6K+7PC90ZXh0PgogICAgPHRleHQgeD0iNDMwIiB5PSIyMjIiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM3YzZmYWYiPjEyIOevh+WFqOivkSDCtyDlt6blj7Plr7nnhacgwrcg54K55Ye75Y2z6K+7PC90ZXh0PgogIDwvZz4KPC9zdmc+" alt="Vector Database 101 学习地图封面">

## 这是什么

《Vector Database 101》是 Zilliz（开源向量数据库 Milvus 的出品方）的官方入门课程，共 12 篇：前半程建立「非结构化数据 → 嵌入向量 → 相似度搜索」的世界观，后半程深入索引算法的深水区（IVF、量化、HNSW、ANNOY、DiskANN）。

全部 12 篇已抓取原文、精翻成中文。**点击下面的条目**会打开左右对照的双栏阅读层——左栏英文原文、右栏中文译文、右侧目录随滚动高亮，篇与篇之间可以直接「上一篇 / 下一篇」连着读下去。

## 基础概念
- <VectorDbDocLink slug="introduction-to-unstructured-data"><strong>1. 非结构化数据导论</strong></VectorDbDocLink>
- <VectorDbDocLink slug="what-is-vector-database"><strong>2. 什么是向量数据库</strong></VectorDbDocLink>
- <VectorDbDocLink slug="comparing-vector-database-vector-search-library-and-vector-search-plugin"><strong>3. 向量数据库、向量搜索库与向量搜索插件对比</strong></VectorDbDocLink>

## Milvus 入门
- <VectorDbDocLink slug="introduction-to-milvus-vector-database"><strong>4. Milvus 向量数据库介绍</strong></VectorDbDocLink>
- <VectorDbDocLink slug="milvus-vector-database-quickstart"><strong>5. Milvus 快速上手</strong></VectorDbDocLink>
- <VectorDbDocLink slug="vector-similarity-search"><strong>6. 向量相似度搜索导论</strong></VectorDbDocLink>

## 索引算法
- <VectorDbDocLink slug="vector-index"><strong>7. 向量索引基础与倒排文件索引</strong></VectorDbDocLink>
- <VectorDbDocLink slug="scalar-quantization-and-product-quantization"><strong>8. 标量量化与乘积量化</strong></VectorDbDocLink>
- <VectorDbDocLink slug="hierarchical-navigable-small-worlds-hnsw"><strong>9. 分层可导航小世界（HNSW）</strong></VectorDbDocLink>
- <VectorDbDocLink slug="approximate-nearest-neighbor-oh-yeah-annoy"><strong>10. ANNOY：近似最近邻搜索</strong></VectorDbDocLink>
- <VectorDbDocLink slug="choosing-right-vector-index-for-your-project"><strong>11. 如何为项目选择合适的向量索引</strong></VectorDbDocLink>
- <VectorDbDocLink slug="diskann-and-the-vamana-algorithm"><strong>12. DiskANN 与 Vamana 算法</strong></VectorDbDocLink>

## 阅读建议

零基础按编号顺序读即可，课程本身就是为此设计的。已经懂嵌入向量基础的话，可以直接从第 7 篇《向量索引基础与倒排文件索引》进入算法部分——量化、HNSW、DiskANN 三篇是全系列最硬也最有价值的部分，都配了可跑的 Python 实现。

原文出自 [Zilliz Learn](https://zilliz.com/learn/introduction-to-unstructured-data)，译文仅用于学习交流，版权归原作者所有。
