<BiRow>
<template #en>

Search Settings allow you to configure the knowledge sources, retrieval strategy, and presentation of search results. After completing the configuration, click **Save**.

</template>
<template #zh>

搜索设置用于配置知识来源、检索策略和搜索结果的呈现方式。完成配置后，点击 **保存**。

</template>
</BiRow>

<BiRow>
<template #en>

## Datasets

</template>
<template #zh>

## 数据集

</template>
</BiRow>

<BiRow>
<template #en>

Select the knowledge bases that Search will use. When a user submits a query, the system retrieves relevant content from the selected knowledge bases.

</template>
<template #zh>

选择搜索要使用的知识库。用户提交查询时，系统会从所选知识库中检索相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

You can select one or more knowledge bases. When multiple knowledge bases are selected, Search retrieves relevant content from all of them simultaneously.

</template>
<template #zh>

你可以选择一个或多个知识库。选中多个知识库时，搜索会同时从所有知识库中检索相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

Select knowledge bases based on the intended use case of the Search. Avoid adding large numbers of knowledge bases that are unrelated to the search topic, as this may increase the number of irrelevant results.

</template>
<template #zh>

请根据搜索的预期用途选择知识库，避免添加大量与搜索主题无关的知识库，否则可能增加不相关结果的数量。

</template>
</BiRow>

<BiRow>
<template #en>

## Show chunk metadata

</template>
<template #zh>

## 显示分块元数据

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether chunk metadata is displayed in search results.

</template>
<template #zh>

控制是否在搜索结果中显示分块元数据。

</template>
</BiRow>

<BiRow>
<template #en>

When enabled, search results can display metadata associated with each chunk in addition to its text. This helps users identify the source of the content and further filter or evaluate the results.

</template>
<template #zh>

启用后，搜索结果可以在分块文本之外展示与之关联的元数据，帮助用户识别内容来源，并进一步筛选或评估结果。

</template>
</BiRow>

<BiRow>
<template #en>

If you are mainly interested in the content itself, you can leave this option disabled. Enable it if you need to inspect or verify the sources of the results.

</template>
<template #zh>

如果你主要关注内容本身，可以保持该选项关闭；需要查看或核实结果来源时再启用。

</template>
</BiRow>

<BiRow>
<template #en>

## Similarity threshold

</template>
<template #zh>

## 相似度阈值

</template>
</BiRow>

<BiRow>
<template #en>

Sets the minimum similarity threshold for search results. It is used to filter out chunks that have low relevance to the query.

</template>
<template #zh>

设置搜索结果的最低相似度阈值，用于过滤掉与查询相关度较低的分块。

</template>
</BiRow>

<BiRow>
<template #en>

Only content with a similarity score that meets or exceeds the threshold is included in the search results.

</template>
<template #zh>

只有相似度得分达到或超过该阈值的内容才会进入搜索结果。

</template>
</BiRow>

<BiRow>
<template #en>

- Increase the threshold: Filtering becomes stricter, and the results are generally more relevant, but some useful content may be omitted.
- Decrease the threshold: More content can be retrieved, but the number of irrelevant results may also increase.

</template>
<template #zh>

- 提高阈值：过滤更严格，结果总体更相关，但可能漏掉部分有用内容。
- 降低阈值：能检索到更多内容，但不相关结果也可能增多。

</template>
</BiRow>

<BiRow>
<template #en>

If there are too many results and their relevance is low, try increasing this value. If Search frequently fails to return the expected content, try decreasing it.

</template>
<template #zh>

如果结果太多且相关度低，可以尝试调高该值；如果搜索经常搜不到期望的内容，可以尝试调低。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector similarity weight

</template>
<template #zh>

## 向量相似度权重

</template>
</BiRow>

<BiRow>
<template #en>

Sets the relative weights of vector similarity and full-text search in hybrid retrieval.

</template>
<template #zh>

设置混合检索中向量相似度与全文搜索的相对权重。

</template>
</BiRow>

<BiRow>
<template #en>

For example, a value of `0.3` means:

</template>
<template #zh>

例如，取值为 `0.3` 表示：

</template>
</BiRow>

<BiRow>
<template #en>

- Vector = `0.3`
- Full-text = `0.7`

</template>
<template #zh>

- 向量 = `0.3`
- 全文 = `0.7`

</template>
</BiRow>

<BiRow>
<template #en>

Vector search focuses more on semantic similarity between the query and the document, while full-text search focuses more on matching keywords, terms, and other textual elements.

</template>
<template #zh>

向量搜索更关注查询与文档之间的语义相似度，全文搜索则更关注关键词、术语等文本要素的匹配。

</template>
</BiRow>

<BiRow>
<template #en>

Therefore:

</template>
<template #zh>

因此：

</template>
</BiRow>

<BiRow>
<template #en>

- Increase the vector weight: Gives greater priority to semantic matching. This is suitable when a user's wording differs from that of the source text.
- Decrease the vector weight: Gives greater priority to full-text matching. This is suitable for exact matches involving proper nouns, product models, identifiers, fixed terminology, and similar content.

</template>
<template #zh>

- 提高向量权重：更优先语义匹配，适合用户措辞与原文不一致的场景。
- 降低向量权重：更优先全文匹配，适合专有名词、产品型号、标识符、固定术语等内容的精确匹配。

</template>
</BiRow>

<BiRow>
<template #en>

You can generally start with the default value and adjust it based on actual search performance.

</template>
<template #zh>

通常可以先使用默认值，再根据实际搜索效果调整。

</template>
</BiRow>

<BiRow>
<template #en>

## Rerank candidates

</template>
<template #zh>

## 重排序候选数量

</template>
</BiRow>

<BiRow>
<template #en>

Sets the number of candidate chunks that enter the reranking stage.

</template>
<template #zh>

设置进入重排序阶段的候选分块数量。

</template>
</BiRow>

<BiRow>
<template #en>

The system first retrieves candidate content from the knowledge bases and then determines which results to display from among those candidates. This parameter controls the candidate pool available for subsequent ranking or reranking.

</template>
<template #zh>

系统先从知识库中检索候选内容，再从这些候选中确定要展示的结果。该参数控制可供后续排序或重排序使用的候选池。

</template>
</BiRow>

<BiRow>
<template #en>

For example, a value of `100` means that up to 100 candidate chunks are selected for subsequent processing.

</template>
<template #zh>

例如，取值为 `100` 表示最多选取 100 个候选分块进入后续处理。

</template>
</BiRow>

<BiRow>
<template #en>

- Increase the value: Expands the candidate pool and reduces the likelihood that highly relevant content will be missed during initial retrieval, but increases processing overhead.
- Decrease the value: Generally improves search speed, but the smaller candidate pool may omit some relevant content.

</template>
<template #zh>

- 提高该值：扩大候选池，降低初始检索遗漏高相关内容的可能性，但会增加处理开销。
- 降低该值：通常能提升搜索速度，但候选池变小，可能漏掉部分相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

For large knowledge bases or use cases that require broader retrieval coverage, you can increase this value as appropriate.

</template>
<template #zh>

对于大型知识库或需要更广检索覆盖的场景，可以适当调高该值。

</template>
</BiRow>

<BiRow>
<template #en>

## Rerank model

</template>
<template #zh>

## 重排序模型

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether a rerank model is used to rerank the retrieved results.

</template>
<template #zh>

控制是否使用重排序模型对检索结果进行重排序。

</template>
</BiRow>

<BiRow>
<template #en>

When enabled, you must select an available rerank model. The system uses the model to further evaluate the relevance between the query and the candidate chunks, and then reorders the search results.

</template>
<template #zh>

启用后必须选择一个可用的重排序模型。系统会使用该模型进一步评估查询与候选分块之间的相关度，然后对搜索结果重新排序。

</template>
</BiRow>

<BiRow>
<template #en>

Reranking can generally improve the quality of the final result ordering, but it introduces additional model calls and increases search latency.

</template>
<template #zh>

重排序通常能提升最终结果的排序质量，但会带来额外的模型调用，并增加搜索延迟。

</template>
</BiRow>

<BiRow>
<template #en>

Enable it if search accuracy is the priority. Leave it disabled if response speed is more important or no rerank model has been configured.

</template>
<template #zh>

如果优先考虑搜索准确性，可以启用；如果响应速度更重要，或尚未配置重排序模型，则保持关闭。

</template>
</BiRow>

<BiRow>
<template #en>

## AI summary

</template>
<template #zh>

## AI 摘要

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether an AI-generated summary is produced for the search results.

</template>
<template #zh>

控制是否为搜索结果生成 AI 摘要。

</template>
</BiRow>

<BiRow>
<template #en>

When enabled, the system uses a model to summarize the retrieved content. This helps users quickly understand the main information in the search results without reading every chunk individually.

</template>
<template #zh>

启用后，系统会使用模型对检索到的内容进行总结，帮助用户无需逐个通读分块即可快速了解搜索结果的主要信息。

</template>
</BiRow>

<BiRow>
<template #en>

This feature requires a model call and may therefore increase result-generation time and model usage costs.

</template>
<template #zh>

该功能需要调用模型，因此可能增加结果生成时间和模型使用成本。

</template>
</BiRow>

<BiRow>
<template #en>

## Enable related search

</template>
<template #zh>

## 启用相关搜索

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether related searches are generated for the current query.

</template>
<template #zh>

控制是否为当前查询生成相关搜索。

</template>
</BiRow>

<BiRow>
<template #en>

When enabled, the system can suggest related searches based on the current query and its search results, helping users continue exploring information related to the current topic.

</template>
<template #zh>

启用后，系统可以基于当前查询及其搜索结果给出相关搜索建议，帮助用户继续探索与当前主题相关的信息。

</template>
</BiRow>

<BiRow>
<template #en>

This feature is suitable for content exploration, research, and open-ended searches. If you only need to view the results for the current query, you can leave it disabled.

</template>
<template #zh>

该功能适合内容探索、研究和开放式搜索；如果只需查看当前查询的结果，可以保持关闭。

</template>
</BiRow>

<BiRow>
<template #en>

## Show query mindmap

</template>
<template #zh>

## 显示查询思维导图

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether a mind map for the current query is displayed.

</template>
<template #zh>

控制是否显示当前查询的思维导图。

</template>
</BiRow>

<BiRow>
<template #en>

When enabled, the system organizes and presents information from the query and related searches as a mind map, helping users quickly understand the relationships between topics and the overall structure of the subject.

</template>
<template #zh>

启用后，系统会把查询及相关搜索中的信息整理成思维导图，帮助用户快速了解主题之间的关系和整体结构。

</template>
</BiRow>

<BiRow>
<template #en>

This feature is more suitable for knowledge exploration and searches involving complex topics. It is generally unnecessary for simple factual queries.

</template>
<template #zh>

该功能更适合知识探索和涉及复杂主题的搜索；简单的事实性查询一般用不到。

</template>
</BiRow>
