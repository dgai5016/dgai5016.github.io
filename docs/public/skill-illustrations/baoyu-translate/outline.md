---
article: docs/posts/skill/baoyu-translate.md
preset: tech-handdrawn
type: mixed (infographic / comparison / flowchart)
density: per-section
style: sketch
palette: default
roughness: 1.6
fill_style: hachure
font: cursive
image_count: 5
language: zh
---

# baoyu-translate 配图 outline

文章核心：三档模式翻译 skill（quick / normal / refined），术语表 + 长文分块并行。per-section 密度挑 5 个信息密集、视觉化的位置。

## Illustration 1
**Position**: `## 它解决什么问题 / 什么时候用` 段后
**Purpose**: 把「翻译腔 / 术语不一致 / 长文丢语境」三大翻译痛点可视化
**Visual Content**: 三张并排痛点卡片：翻译腔（生硬波浪句）/ 术语漂移（Transformer 三种译法分叉）/ 长文丢语境（卷轴后半段褪色）
**Type**: infographic
**Filename**: 01-infographic-translate-pain-points.svg

## Illustration 2
**Position**: `## 怎么调用` 的「模式自动识别」段后
**Purpose**: 三列对比 quick / normal / refined 三档模式（速度 ↔ 质量）
**Visual Content**: 三列对比：quick（1 步直译，闪电，最快）/ normal（分析→翻译，平衡，焦点紫）/ refined（5 步流水线，出版级）
**Type**: comparison
**Filename**: 02-comparison-three-modes.svg

## Illustration 3
**Position**: `### 示例 1` 的「**会发生什么**」段后
**Purpose**: normal 模式标准翻译流程
**Visual Content**: 横向 5 步：抓取源文 → 物化+建目录 → 分析全文（焦点）→ 组装+翻译 → translation.md
**Type**: flowchart
**Filename**: 03-flowchart-normal-mode.svg

## Illustration 4
**Position**: `### 示例 2` 的「**会发生什么**」段后
**Purpose**: refined 5 阶段流水线 + 长文分块并行机制
**Visual Content**: 上层 5 阶段（分析→初译→评审→修订→润色，评审「只诊断不重写」）+ 下层 >4000 词分块并行（文档→3 chunks→子代理→合并，虚线连回初译）
**Type**: flowchart
**Filename**: 04-flowchart-refined-pipeline.svg

## Illustration 5
**Position**: `## 内部工作流概览` 列表后
**Purpose**: 5 步内部工作流纵向总览
**Visual Content**: 纵向 5 步带编号圆：加载偏好 / 物化源+建目录 / 评估长度 / 按模式翻译（焦点，含三模式小标签）/ 收尾
**Type**: flowchart
**Filename**: 05-flowchart-internal-workflow.svg
