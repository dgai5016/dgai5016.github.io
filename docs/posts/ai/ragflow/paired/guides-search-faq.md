<BiRow>
<template #en>

**What are the main differences between Search and Chat?**

</template>
<template #zh>

**搜索（Search）和对话助手（Chat）的主要区别是什么？**

</template>
</BiRow>

<BiRow>
<template #en>

Search is designed for knowledge retrieval. It retrieves and displays relevant content from selected knowledge bases based on the user's query, helping users quickly locate the information they need.

</template>
<template #zh>

搜索面向知识检索设计：根据用户查询从所选知识库中检索并展示相关内容，帮助用户快速定位所需信息。

</template>
</BiRow>

<BiRow>
<template #en>

Chat is designed for knowledge-based question answering. In addition to retrieving relevant knowledge, it uses an LLM to understand questions and generate answers. It also supports multi-turn conversations and capabilities such as Agentic Retrieval, making it suitable for scenarios that require information synthesis, reasoning, and natural-language responses.

</template>
<template #zh>

对话助手面向基于知识的问答设计：除检索相关知识外，还借助 LLM 理解问题并生成回答，同时支持多轮对话以及 Agentic Retrieval 等能力，适合需要信息综合、推理和自然语言回复的场景。

</template>
</BiRow>

<BiRow>
<template #en>

**Why can't I find content that already exists in the knowledge base?**

</template>
<template #zh>

**为什么知识库里已有的内容搜不到？**

</template>
</BiRow>

<BiRow>
<template #en>

The relevant chunks may not meet the **Similarity threshold**, or the query may differ significantly from the wording in the source content. Try lowering the similarity threshold, adjusting the **Vector similarity weight**, or using more specific keywords.

</template>
<template #zh>

相关分块可能未达到 **相似度阈值**，或查询与源内容措辞差异过大。可以尝试调低相似度阈值、调整 **向量相似度权重**，或使用更具体的关键词。

</template>
</BiRow>

<BiRow>
<template #en>

Also make sure that the target knowledge base has been added to the current Search and that the relevant documents have been successfully parsed and indexed.

</template>
<template #zh>

同时确认目标知识库已添加到当前搜索，且相关文档已成功解析并建立索引。

</template>
</BiRow>

<BiRow>
<template #en>

**Why do my search results contain a lot of irrelevant content?**

</template>
<template #zh>

**为什么搜索结果里有大量不相关内容？**

</template>
</BiRow>

<BiRow>
<template #en>

Try increasing the **Similarity threshold** to filter out less relevant results.

</template>
<template #zh>

尝试调高 **相似度阈值**，过滤掉相关度较低的结果。

</template>
</BiRow>

<BiRow>
<template #en>

If your query relies mainly on keywords, proper nouns, or identifiers, you can also decrease the **Vector similarity weight** to give full-text retrieval more weight in hybrid retrieval.

</template>
<template #zh>

如果查询主要依赖关键词、专有名词或标识符，还可以调低 **向量相似度权重**，让混合检索中全文检索的权重更高。

</template>
</BiRow>

<BiRow>
<template #en>

**How should I set the Vector similarity weight?**

</template>
<template #zh>

**向量相似度权重应该怎么设置？**

</template>
</BiRow>

<BiRow>
<template #en>

This parameter controls the balance between vector retrieval and full-text retrieval.

</template>
<template #zh>

该参数控制向量检索与全文检索之间的平衡。

</template>
</BiRow>

<BiRow>
<template #en>

For semantic search scenarios, you can increase the Vector weight. If you mainly search for product names, identifiers, technical terms, or other content that requires exact matching, you can increase the Full-text weight. In most cases, it is recommended to start with the default value and adjust it based on actual search results.

</template>
<template #zh>

语义搜索场景可以调高向量权重；如果主要搜索产品名、标识符、技术术语等需要精确匹配的内容，可以调高全文权重。多数情况下，建议从默认值开始，再根据实际搜索结果调整。

</template>
</BiRow>

<BiRow>
<template #en>

**Why does Search become slower after I enable the Rerank model?**

</template>
<template #zh>

**启用重排序模型后搜索为什么变慢了？**

</template>
</BiRow>

<BiRow>
<template #en>

When the **Rerank model** is enabled, the system uses the rerank model to further evaluate the relevance of retrieved candidates and reorder them. This introduces additional model calls and processing time.

</template>
<template #zh>

启用 **重排序模型** 后，系统会用重排序模型进一步评估检索候选的相关度并重新排序，这会带来额外的模型调用和处理时间。

</template>
</BiRow>

<BiRow>
<template #en>

If result ranking quality is more important, you can enable Rerank. If response speed is more important, you can disable it or reduce **Rerank candidates**.

</template>
<template #zh>

如果更看重结果排序质量，可以启用重排序；如果更看重响应速度，可以关闭它或调低 **重排序候选数量**。

</template>
</BiRow>

<BiRow>
<template #en>

**Is a higher Similarity threshold always better?**

</template>
<template #zh>

**相似度阈值是不是越高越好？**

</template>
</BiRow>

<BiRow>
<template #en>

No. A higher threshold can reduce less relevant results, but it may also filter out useful content, resulting in fewer or even no search results.

</template>
<template #zh>

不是。阈值越高，不相关结果会减少，但也可能过滤掉有用内容，导致搜索结果变少甚至为空。

</template>
</BiRow>

<BiRow>
<template #en>

Adjust the threshold according to your knowledge base and actual search results to achieve a balance between retrieval coverage and result relevance.

</template>
<template #zh>

请结合你的知识库和实际搜索结果调整阈值，在检索覆盖面与结果相关度之间取得平衡。

</template>
</BiRow>
