#!/usr/bin/env python3
"""
Vector Database 101 双语文档清单（单一事实源）。

来源：Zilliz Learn 官网《Vector Database 101》系列课程，共 12 篇。
字段：(slug, url_path, group, title_zh, title_en)
- slug：站内标识（小写），对应 en/zh/paired/<slug>.md 与浮层路由
- url_path：zilliz.com/learn/ 下的路径（注意部分含大写，原样保留）
- group：分组（学习地图与浮层徽标用）
- title_zh / title_en：中英标题（浮层头部主/副标题）

用途：fetch-originals.py（抓取）、gen-manifest.py（生成前端 TS 清单）都从这里取数。
"""

SITE_BASE = "https://zilliz.com/learn/"


def site_url(url_path: str) -> str:
    """拼出官方原文完整链接。"""
    return SITE_BASE + url_path


# (slug, url_path, group, title_zh, title_en)
ENTRIES = [
    # ── 基础概念 ──────────────────────────────────────────────
    ("introduction-to-unstructured-data", "introduction-to-unstructured-data",
     "基础概念", "非结构化数据导论", "Introduction to Unstructured Data"),
    ("what-is-vector-database", "what-is-vector-database",
     "基础概念", "什么是向量数据库", "What is a Vector Database?"),
    ("comparing-vector-database-vector-search-library-and-vector-search-plugin",
     "comparing-vector-database-vector-search-library-and-vector-search-plugin",
     "基础概念", "向量数据库、向量搜索库与向量搜索插件对比",
     "Comparing Vector Databases, Vector Search Libraries, and Vector Search Plugins"),
    # ── Milvus 入门 ───────────────────────────────────────────
    ("introduction-to-milvus-vector-database", "introduction-to-milvus-vector-database",
     "Milvus 入门", "Milvus 向量数据库介绍", "Introduction to Milvus"),
    ("milvus-vector-database-quickstart", "milvus-vector-database-quickstart",
     "Milvus 入门", "Milvus 快速上手", "Milvus Quickstart"),
    ("vector-similarity-search", "vector-similarity-search",
     "Milvus 入门", "向量相似度搜索导论", "Introduction to Vector Similarity Search"),
    # ── 索引算法 ──────────────────────────────────────────────
    ("vector-index", "vector-index",
     "索引算法", "向量索引基础与倒排文件索引", "Vector Index Basics and the Inverted File Index"),
    ("scalar-quantization-and-product-quantization", "scalar-quantization-and-product-quantization",
     "索引算法", "标量量化与乘积量化", "Scalar Quantization and Product Quantization"),
    ("hierarchical-navigable-small-worlds-hnsw", "hierarchical-navigable-small-worlds-HNSW",
     "索引算法", "分层可导航小世界（HNSW）", "Hierarchical Navigable Small Worlds (HNSW)"),
    ("approximate-nearest-neighbor-oh-yeah-annoy", "approximate-nearest-neighbor-oh-yeah-ANNOY",
     "索引算法", "ANNOY：近似最近邻搜索", "Approximate Nearest Neighbors Oh Yeah (ANNOY)"),
    ("choosing-right-vector-index-for-your-project", "choosing-right-vector-index-for-your-project",
     "索引算法", "如何为项目选择合适的向量索引", "Choosing the Right Vector Index for Your Project"),
    ("diskann-and-the-vamana-algorithm", "DiskANN-and-the-Vamana-Algorithm",
     "索引算法", "DiskANN 与 Vamana 算法", "DiskANN and the Vamana Algorithm"),
]
