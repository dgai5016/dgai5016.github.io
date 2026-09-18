# 博客翻译统一偏好（baoyu-translate 项目级配置）
# 本文件由 dg-writer / dg-newsupdate-claude 等技能调用 baoyu-translate 翻译时自动加载
# 术语表只放跨内容通用的核心条目，各技能规则文档里有更完整的领域术语

target_language: zh-CN
default_mode: refined
audience: technical
style: technical

glossary:
  # AI 核心术语（论文/新闻通用）
  - from: "attention"
    to: "注意力"
  - from: "self-attention"
    to: "自注意力"
  - from: "fine-tuning"
    to: "微调"
  - from: "retrieval"
    to: "检索"
  - from: "Retrieval-Augmented Generation"
    to: "检索增强生成"
  - from: "RAG"
    to: "RAG"
    note: "保留缩写，首次出现括注「检索增强生成」"
  - from: "alignment"
    to: "对齐"
  - from: "hallucination"
    to: "幻觉"
  - from: "in-context learning"
    to: "上下文学习"
  - from: "embedding"
    to: "嵌入"
  - from: "knowledge injection"
    to: "知识注入"
  - from: "interpretability"
    to: "可解释性"
  - from: "red-teaming"
    to: "红队测试"
  - from: "evaluation"
    to: "评估"
  - from: "research preview"
    to: "研究预览版"
  - from: "credits"
    to: "额度"
  - from: "dual-use"
    to: "两用性"
  - from: "safeguards"
    to: "安全防护"
  # 保持英文的品牌与模型名
  - from: "Claude Code"
    to: "Claude Code"
    note: "产品名不译"
  - from: "Claude"
    to: "Claude"
    note: "产品名不译"
  - from: "Anthropic"
    to: "Anthropic"
    note: "公司名不译"
  - from: "Transformer"
    to: "Transformer"
    note: "模型架构名不译"
