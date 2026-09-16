# baoyu-translate 项目偏好（dg 博客仓库）
# 用途：MCP 官方文档汉化等博客翻译任务；模式/受众/文风按 dg 2026-09-11 的选择固化
target_language: zh-CN

# 精翻流水线：分析 → 初译 → 评审 → 修订 → 润色
default_mode: refined

# 读者是懂编程的开发者：少加解释性译者注，术语直接用
audience: technical

# 文档风：精确、克制、贴合官方技术文档语体
style: technical

chunk_threshold: 4000
chunk_max_words: 5000

# MCP / RAGFlow 文档专用术语表（与内置术语表叠加，本表优先级更高）
glossary_files:
  - ./mcp-glossary.md
  - ./ragflow-glossary.md
