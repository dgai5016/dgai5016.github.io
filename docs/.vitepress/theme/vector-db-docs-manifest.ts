// Vector Database 101 双语文档清单——本文件由 scripts/vector-db-docs/gen-manifest.py 生成，勿手改。
// 数据源：scripts/vector-db-docs/manifest.py（单一事实源）。
// 消费方：BilingualOverlay（头部标题/原文链接/上下篇导航）、VectorDbDocLink（href）。
export interface VectorDbDocMeta {
  slug: string      // 站内标识，对应 posts/ai/vector-db-101/paired/<slug>.md
  group: string     // 分组名（基础概念 / Milvus 入门 / 索引算法）
  titleZh: string   // 中文标题（overlay 头部主标题）
  titleEn: string   // 英文标题（副标题）
  sourceUrl: string // 官方英文原文链接（「阅读原文」入口）
}

export const vectorDbDocs: VectorDbDocMeta[] = [
  { slug: 'introduction-to-unstructured-data', group: '基础概念', titleZh: '非结构化数据导论', titleEn: 'Introduction to Unstructured Data', sourceUrl: 'https://zilliz.com/learn/introduction-to-unstructured-data' },
  { slug: 'what-is-vector-database', group: '基础概念', titleZh: '什么是向量数据库', titleEn: 'What is a Vector Database?', sourceUrl: 'https://zilliz.com/learn/what-is-vector-database' },
  { slug: 'comparing-vector-database-vector-search-library-and-vector-search-plugin', group: '基础概念', titleZh: '向量数据库、向量搜索库与向量搜索插件对比', titleEn: 'Comparing Vector Databases, Vector Search Libraries, and Vector Search Plugins', sourceUrl: 'https://zilliz.com/learn/comparing-vector-database-vector-search-library-and-vector-search-plugin' },
  { slug: 'introduction-to-milvus-vector-database', group: 'Milvus 入门', titleZh: 'Milvus 向量数据库介绍', titleEn: 'Introduction to Milvus', sourceUrl: 'https://zilliz.com/learn/introduction-to-milvus-vector-database' },
  { slug: 'milvus-vector-database-quickstart', group: 'Milvus 入门', titleZh: 'Milvus 快速上手', titleEn: 'Milvus Quickstart', sourceUrl: 'https://zilliz.com/learn/milvus-vector-database-quickstart' },
  { slug: 'vector-similarity-search', group: 'Milvus 入门', titleZh: '向量相似度搜索导论', titleEn: 'Introduction to Vector Similarity Search', sourceUrl: 'https://zilliz.com/learn/vector-similarity-search' },
  { slug: 'vector-index', group: '索引算法', titleZh: '向量索引基础与倒排文件索引', titleEn: 'Vector Index Basics and the Inverted File Index', sourceUrl: 'https://zilliz.com/learn/vector-index' },
  { slug: 'scalar-quantization-and-product-quantization', group: '索引算法', titleZh: '标量量化与乘积量化', titleEn: 'Scalar Quantization and Product Quantization', sourceUrl: 'https://zilliz.com/learn/scalar-quantization-and-product-quantization' },
  { slug: 'hierarchical-navigable-small-worlds-hnsw', group: '索引算法', titleZh: '分层可导航小世界（HNSW）', titleEn: 'Hierarchical Navigable Small Worlds (HNSW)', sourceUrl: 'https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW' },
  { slug: 'approximate-nearest-neighbor-oh-yeah-annoy', group: '索引算法', titleZh: 'ANNOY：近似最近邻搜索', titleEn: 'Approximate Nearest Neighbors Oh Yeah (ANNOY)', sourceUrl: 'https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY' },
  { slug: 'choosing-right-vector-index-for-your-project', group: '索引算法', titleZh: '如何为项目选择合适的向量索引', titleEn: 'Choosing the Right Vector Index for Your Project', sourceUrl: 'https://zilliz.com/learn/choosing-right-vector-index-for-your-project' },
  { slug: 'diskann-and-the-vamana-algorithm', group: '索引算法', titleZh: 'DiskANN 与 Vamana 算法', titleEn: 'DiskANN and the Vamana Algorithm', sourceUrl: 'https://zilliz.com/learn/DiskANN-and-the-Vamana-Algorithm' },
]
