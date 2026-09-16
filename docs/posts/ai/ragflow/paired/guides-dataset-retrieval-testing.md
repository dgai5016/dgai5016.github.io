<BiRow>
<template #en>

## Retrieval Testing Overview

</template>
<template #zh>

## 检索测试概览

</template>
</BiRow>

<BiRow>
<template #en>

**Retrieval Testing** is used to verify whether a dataset can recall the expected chunks based on user queries. After documents complete parsing, it is recommended to use typical questions in **Retrieval Testing** to test retrieval results first. Confirm whether the recalled chunks are correct, whether the content is complete, and whether the ranking is reasonable before using the dataset in **Chat**, **Search**, or **Agent**.

</template>
<template #zh>

**检索测试（Retrieval Testing）**用于验证数据集能否根据用户查询召回预期的分块。文档完成解析后，建议先在**检索测试**中用典型问题测试检索结果，确认召回的分块是否正确、内容是否完整、排序是否合理，再将数据集用于 **Chat**、**Search** 或 **Agent**。

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval testing can also help troubleshoot Q&A result problems. If the correct chunk can already be recalled but the final answer is still unsatisfactory, further check the model, prompt, or application configuration. If the target chunk is not recalled, continue checking document parsing, chunks, metadata, and retrieval parameters.

</template>
<template #zh>

检索测试还可用于排查问答结果的问题：如果正确的分块已能召回，但最终答案仍不理想，应进一步检查模型、提示词或应用配置；如果目标分块未被召回，则继续检查文档解析、分块、元数据和检索参数。

</template>
</BiRow>

<BiRow>
<template #en>

> Tip: Documents used for testing must have completed parsing and be enabled.

</template>
<template #zh>

> 提示：用于测试的文档必须已完成解析并处于启用状态。

</template>
</BiRow>

<BiRow>
<template #en>

## Configure Retrieval Parameters

</template>
<template #zh>

## 配置检索参数

</template>
</BiRow>

<BiRow>
<template #en>

The **Setting** area on the **Retrieval testing** page is used to adjust retrieval parameters for the current test. You can modify parameters and run tests repeatedly to compare recall results under different configurations. The main parameters include:

</template>
<template #zh>

**检索测试**页面中的**设置（Setting）**区域用于调整本次测试的检索参数。可以反复修改参数并运行测试，比较不同配置下的召回结果。主要参数包括：

</template>
</BiRow>

<BiRow>
<template #en>

- **Similarity threshold**: Candidate chunks below this threshold are filtered out. Raising the threshold narrows the recall range and makes results stricter; lowering the threshold expands the recall range. The default value is `0.2`.
- **Vector similarity weight**: The weight of vector similarity in the comprehensive similarity calculation. The other part of the weight is used for full-text or keyword similarity. For example, when this is set to `0.3`, the other part is `0.7`.
- **Rerank model**: The reranking model used to further calculate relevance and sort candidate results. If no rerank model is selected, retrieval results combine keyword similarity and vector cosine similarity. If selected, reranking results participate in the comprehensive score. Using a rerank model may increase retrieval latency.
- **Cross-language search**: Select one or more target languages so a query can match related content in other languages in the dataset. If no language is selected, retrieval is mainly performed in the current language.
- **Metadata**: Restricts the retrieval range by metadata conditions. After it is set, retrieval is performed only in content that meets the metadata conditions.
- **Top**: Sets the maximum number of candidate results returned. For example, if **Top 10** is selected, up to 10 eligible results are returned.

</template>
<template #zh>

- **相似度阈值（Similarity threshold）**：低于该阈值的候选分块会被过滤掉。调高阈值会缩小召回范围、使结果更严格；调低阈值则扩大召回范围。默认值为 `0.2`。
- **向量相似度权重（Vector similarity weight）**：向量相似度在综合相似度计算中所占的权重，剩余权重用于全文或关键词相似度。例如，该值设为 `0.3` 时，剩余部分为 `0.7`。
- **重排序模型（Rerank model）**：用于进一步计算相关性并对候选结果排序的重排序模型。未选择重排序模型时，检索结果由关键词相似度与向量余弦相似度合并得出；选择后，重排序结果会参与综合得分。使用重排序模型可能增加检索延迟。
- **跨语言搜索（Cross-language search）**：选择一个或多个目标语言，使查询能够匹配数据集中其他语言的相关内容。若不选择语言，检索主要以当前语言进行。
- **元数据（Metadata）**：通过元数据条件限制检索范围。设置后，只在满足元数据条件的内容中执行检索。
- **Top**：设置返回候选结果的最大数量。例如，选择 **Top 10** 时，最多返回 10 条符合条件的结果。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: Parameter changes in **Retrieval Testing** are only used for the current test and are not automatically synchronized to **Chat Assistant** or **Agent**. After suitable parameters are determined, configure the corresponding parameters in the application that actually uses the dataset or in the **Retrieval** component.

</template>
<template #zh>

> 注意：**检索测试**中的参数修改仅用于当前测试，不会自动同步到**对话助手（Chat Assistant）**或 **Agent**。确定合适的参数后，请在实际使用数据集的应用或**检索（Retrieval）**组件中配置相应参数。

</template>
</BiRow>

<BiRow>
<template #en>

## Execute Retrieval Testing

</template>
<template #zh>

## 执行检索测试

</template>
</BiRow>

<BiRow>
<template #en>

Enter the query to test under the **Setting** area, then click **Run** to execute retrieval. It is recommended to use questions close to real user expressions and prepare multiple types of queries to check recall for different content.

</template>
<template #zh>

在**设置**区域下方输入要测试的查询，然后点击**运行（Run）**执行检索。建议使用贴近真实用户表达的问题，并准备多种类型的查询，以检查不同内容的召回情况。

</template>
</BiRow>

<BiRow>
<template #en>

After the test is executed, chunks matching the current retrieval parameters are displayed in the **Results** area on the right.

</template>
<template #zh>

测试执行后，符合当前检索参数的分块会显示在右侧的**结果（Results）**区域。

</template>
</BiRow>

<BiRow>
<template #en>

## View Retrieval Results

</template>
<template #zh>

## 查看检索结果

</template>
</BiRow>

<BiRow>
<template #en>

After executing a test, recalled chunks are displayed in the **Results** area on the right, together with the total number of results for the test. Each result mainly displays the recalled chunk content, relevance information, and source document, and is sorted according to the current retrieval configuration.

</template>
<template #zh>

执行测试后，召回的分块会连同本次测试的结果总数一起显示在右侧的**结果**区域。每条结果主要展示召回的分块内容、相关性信息和来源文档，并按当前检索配置排序。

</template>
</BiRow>

<BiRow>
<template #en>

When viewing retrieval results, focus on:

</template>
<template #zh>

查看检索结果时，重点关注：

</template>
</BiRow>

<BiRow>
<template #en>

- Whether the target chunk is successfully recalled.
- Whether the recalled chunk comes from the correct document.
- Whether the chunk content is related to the query and contains the information needed to answer the question.
- Whether highly relevant content appears near the top.
- Whether many chunks unrelated to the query are recalled.
- Whether required content is excluded by metadata or other filter conditions.

</template>
<template #zh>

- 目标分块是否被成功召回。
- 召回的分块是否来自正确的文档。
- 分块内容是否与查询相关，是否包含回答问题所需的信息。
- 相关性高的内容是否排在靠前位置。
- 是否召回了大量与查询无关的分块。
- 所需内容是否被元数据或其他筛选条件排除。

</template>
</BiRow>

<BiRow>
<template #en>

The upper-right corner of **Results** provides a **File** filter. You can select a specified document and view only retrieval results from that document. When a dataset contains many documents, this helps check recall for a specific document.

</template>
<template #zh>

**结果**区域右上角提供**文件（File）**筛选。可以选择指定文档，只查看来自该文档的检索结果。数据集包含大量文档时，这有助于检查某个特定文档的召回情况。

</template>
</BiRow>

<BiRow>
<template #en>

The focus of retrieval testing is not to compare a single score in isolation, but to confirm whether the needed chunks can be accurately recalled and reasonably ranked under the current retrieval configuration.

</template>
<template #zh>

检索测试的重点不是孤立地比较单个分数，而是确认在当前检索配置下，所需分块能否被准确召回并合理排序。

</template>
</BiRow>

<BiRow>
<template #en>

## Adjust Retrieval Results

</template>
<template #zh>

## 调整检索结果

</template>
</BiRow>

<BiRow>
<template #en>

If retrieval results do not meet expectations, first determine whether the problem is a content problem or a retrieval configuration problem, then adjust accordingly.

</template>
<template #zh>

如果检索结果不符合预期，先判断问题出在内容还是检索配置，再针对性地调整。

</template>
</BiRow>

<BiRow>
<template #en>

If the target content does not appear in retrieval results at all, check whether the document was parsed successfully, whether the target content has generated corresponding chunks, and whether metadata conditions exclude the related content.

</template>
<template #zh>

如果目标内容完全没有出现在检索结果中，检查文档是否解析成功、目标内容是否已生成相应分块、元数据条件是否排除了相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

If the target chunk can be recalled but many irrelevant results also appear, raise **Similarity threshold** appropriately to narrow the recall range. If retrieval results rely more on semantic expression or keyword matching, adjust **Vector similarity weight** to rebalance vector retrieval and full-text retrieval. If the target chunk can already be recalled but ranking is unsatisfactory, try configuring **Rerank model** to rerank candidate results.

</template>
<template #zh>

如果目标分块能够召回，但也出现了大量无关结果，可适当调高**相似度阈值**，缩小召回范围。如果检索结果更依赖语义表达或关键词匹配，可调整**向量相似度权重**，重新平衡向量检索与全文检索。如果目标分块已能召回但排序不理想，可尝试配置**重排序模型**，对候选结果重排序。

</template>
</BiRow>

<BiRow>
<template #en>

If you need to see more or fewer candidate results, adjust **Top**. For cross-language datasets, also check whether **Cross-language search** includes the target languages to retrieve. It is recommended to use multiple representative queries for repeated testing and determine final parameters based on the overall recall result instead of adjusting configuration based only on a single test.

</template>
<template #zh>

如果需要看到更多或更少的候选结果，可调整 **Top**。对于跨语言数据集，还要检查**跨语言搜索**是否包含要检索的目标语言。建议使用多个有代表性的查询反复测试，根据整体召回结果确定最终参数，而不要仅凭单次测试调整配置。

</template>
</BiRow>

<BiRow>
<template #en>

Debugging suggestion: when retrieval results are unsatisfactory, troubleshoot in the order of document parsing -> chunk -> metadata -> retrieval parameters. First confirm that the knowledge content itself has correctly entered the dataset, then adjust retrieval parameters. This helps locate the problem faster.

</template>
<template #zh>

调试建议：当检索结果不理想时，按「文档解析 -> 分块 -> 元数据 -> 检索参数」的顺序排查。先确认知识内容本身已正确进入数据集，再调整检索参数，这有助于更快定位问题。

</template>
</BiRow>
