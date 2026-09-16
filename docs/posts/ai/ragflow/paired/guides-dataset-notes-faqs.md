<BiRow>
<template #en>

## Do I Need to Parse Again After Modifying Parsing Configuration?

</template>
<template #zh>

## 修改解析配置后需要重新解析吗？

</template>
</BiRow>

<BiRow>
<template #en>

Usually yes. Parsing configuration affects how documents are converted into chunks. For parsed documents, modifying configuration does not necessarily rewrite old chunks automatically. If you want the new configuration to apply to existing documents, parse the relevant documents again.

</template>
<template #zh>

通常需要。解析配置决定了文档如何转换为分块。对于已解析的文档，修改配置并不一定会自动重写旧的分块。如果希望新配置作用于已有文档，请重新解析相关文档。

</template>
</BiRow>

<BiRow>
<template #en>

## When Do Metadata Changes Take Effect?

</template>
<template #zh>

## 元数据修改何时生效？

</template>
</BiRow>

<BiRow>
<template #en>

After metadata is manually modified, interface filters can usually use the new values directly. If metadata participates in retrieval filtering or affects indexing results, you may need to combine it with re-parsing, index refresh, or re-testing to confirm the final effect.

</template>
<template #zh>

手动修改元数据后，界面筛选器通常可以直接使用新值。如果元数据参与检索过滤或影响索引结果，则可能需要配合重新解析、刷新索引或重新测试，来确认最终效果。

</template>
</BiRow>

<BiRow>
<template #en>

## What Should I Do If Document Parsing Fails?

</template>
<template #zh>

## 文档解析失败怎么办？

</template>
</BiRow>

<BiRow>
<template #en>

It is recommended to troubleshoot in the order of **document status -> configuration -> Logs**. First confirm whether the document is still parsing or has failed, then check the parsing method, model, and data source configuration, and finally open document log details to view the error cause.

</template>
<template #zh>

建议按 **文档状态 -> 配置 -> 日志（Logs）** 的顺序排查。先确认文档是仍在解析还是已经失败，再检查解析方式、模型和数据源配置，最后打开文档日志详情查看错误原因。

</template>
</BiRow>

<BiRow>
<template #en>

## What Should I Do If Retrieval Testing Cannot Retrieve Content?

</template>
<template #zh>

## 检索测试检索不到内容怎么办？

</template>
</BiRow>

<BiRow>
<template #en>

It is recommended to troubleshoot in the order of **document status -> chunk -> metadata -> retrieval parameters**. First confirm that the document has been parsed successfully and generated usable chunks. Then check whether metadata has filter conditions that exclude related chunks. Finally, check retrieval parameters such as **Similarity threshold**, **Vector similarity weight**, and **Top K**.

</template>
<template #zh>

建议按 **文档状态 -> 分块 -> 元数据 -> 检索参数** 的顺序排查。先确认文档已成功解析并生成了可用的分块；再检查元数据过滤条件是否把相关分块排除在外；最后检查 **Similarity threshold**（相似度阈值）、**Vector similarity weight**（向量相似度权重）和 **Top K** 等检索参数。

</template>
</BiRow>

<BiRow>
<template #en>

Common causes include documents not yet parsed, no usable chunks generated, metadata filters being too strict, **Similarity threshold** being too high, or **Top K** being too small.

</template>
<template #zh>

常见原因包括：文档尚未解析、未生成可用的分块、元数据过滤条件过于严格、**Similarity threshold** 过高，或 **Top K** 过小。

</template>
</BiRow>

<BiRow>
<template #en>

## Why Can't I See Artifacts?

</template>
<template #zh>

## 为什么看不到知识工件？

</template>
</BiRow>

<BiRow>
<template #en>

Artifacts are related to knowledge compilation results. If the dataset has no usable chunks or knowledge compilation has not been completed, expected artifacts may not appear. First confirm that documents have been parsed successfully, then refer to **Knowledge Compilation** to generate or update artifacts.

</template>
<template #zh>

知识工件（Artifacts）与知识编译的结果相关。如果数据集没有可用的分块，或知识编译（Knowledge Compilation）尚未完成，可能就不会出现预期的知识工件。请先确认文档已成功解析，再参考**知识编译**生成或更新知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

## Run Retrieval Testing

</template>
<template #zh>

## 运行检索测试

</template>
</BiRow>

<BiRow>
<template #en>

Run retrieval testing on your dataset to check whether the expected chunks can be retrieved.

</template>
<template #zh>

在你的数据集上运行检索测试，检查能否检索到预期的分块。

</template>
</BiRow>

<BiRow>
<template #en>

After files are uploaded and parsed, it is recommended to run retrieval testing before configuring a chat assistant. Running retrieval testing is never unnecessary or redundant. Like fine-tuning a precision instrument, RAGFlow requires careful adjustment to deliver the best Q&A performance. Your dataset settings, chat assistant configuration, and specified small and large models all significantly affect the final result. Running retrieval testing can verify whether expected chunks can be retrieved, allowing you to quickly identify areas that need improvement or locate issues that need to be resolved. For example, when debugging a Q&A system, if you know that the correct chunks can be retrieved, you can focus elsewhere. In issue #5627, the issue was found to be caused by LLM limitations.

</template>
<template #zh>

文件上传并解析完成后，建议先运行检索测试，再配置对话助手。检索测试永远不会是多余或无用的。正如校准精密仪器，RAGFlow 需要精心调校才能交付最佳的问答性能。你的数据集设置、对话助手配置，以及指定的小模型和大模型，都会显著影响最终结果。运行检索测试可以验证能否检索到预期的分块，帮你快速发现需要改进的地方，或定位需要解决的问题。例如，调试问答系统时，只要你已确认能检索到正确的分块，就可以把精力放到其他环节。在 issue #5627 中，问题最终定位为 LLM 的能力限制所致。

</template>
</BiRow>

<BiRow>
<template #en>

During retrieval testing, hybrid search is used to retrieve chunks created by the chunking method you specified. This search combines weighted keyword similarity with weighted vector cosine similarity or weighted rerank score, depending on your settings:

</template>
<template #zh>

检索测试期间，系统通过混合搜索检索由你指定的分块方法生成的分块。根据你的设置，这种搜索会将加权关键词相似度与加权向量余弦相似度或加权重排序得分相结合：

</template>
</BiRow>

<BiRow>
<template #en>

- If no rerank model is selected, weighted keyword similarity is combined with weighted vector cosine similarity.
- If a rerank model is selected, weighted keyword similarity is combined with weighted vector rerank score.
- By contrast, chunks created by knowledge graph construction are retrieved using only vector cosine similarity.

</template>
<template #zh>

- 若未选择重排序模型，加权关键词相似度与加权向量余弦相似度相结合。
- 若选择了重排序模型，加权关键词相似度与加权向量重排序得分相结合。
- 相比之下，由知识图谱构建生成的分块仅通过向量余弦相似度检索。

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisites

</template>
<template #zh>

### 前提条件

</template>
</BiRow>

<BiRow>
<template #en>

- Your files have been uploaded and successfully parsed before running retrieval testing.
- A knowledge graph must be successfully built before **Use Knowledge Graph** is enabled.

</template>
<template #zh>

- 运行检索测试前，你的文件已上传并成功解析。
- 启用 **Use Knowledge Graph**（使用知识图谱）前，必须已成功构建知识图谱。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration

</template>
<template #zh>

### 配置

</template>
</BiRow>

<BiRow>
<template #en>

#### Similarity Threshold

</template>
<template #zh>

#### 相似度阈值（Similarity Threshold）

</template>
</BiRow>

<BiRow>
<template #en>

This setting is the threshold for retrieving chunks. Chunks with similarity below the threshold are filtered out. By default, the threshold is set to `0.2`. This means only chunks with a hybrid similarity score of 20 or higher are retrieved.

</template>
<template #zh>

该设置是检索分块的阈值。相似度低于该阈值的分块会被过滤掉。默认情况下，该阈值为 `0.2`，即只有混合相似度得分不低于 20 的分块才会被检索出来。

</template>
</BiRow>

<BiRow>
<template #en>

#### Vector Similarity Weight

</template>
<template #zh>

#### 向量相似度权重（Vector Similarity Weight）

</template>
</BiRow>

<BiRow>
<template #en>

This setting controls the weight of vector similarity in the comprehensive similarity score, whether it is combined with vector cosine similarity or rerank score. By default, it is set to `0.3`, so the other component's weight is `0.7` (`1 - 0.3`).

</template>
<template #zh>

该设置控制向量相似度在综合相似度得分中的权重，无论组合对象是向量余弦相似度还是重排序得分。默认值为 `0.3`，因此另一部分的权重为 `0.7`（`1 - 0.3`）。

</template>
</BiRow>

<BiRow>
<template #en>

#### Rerank Model

</template>
<template #zh>

#### 重排序模型（Rerank Model）

</template>
</BiRow>

<BiRow>
<template #en>

- If left empty, RAGFlow uses a combination of weighted keyword similarity and weighted vector cosine similarity.
- If a rerank model is selected, weighted keyword similarity is combined with weighted vector rerank score.

</template>
<template #zh>

- 若留空，RAGFlow 会将加权关键词相似度与加权向量余弦相似度结合使用。
- 若选择了重排序模型，则将加权关键词相似度与加权向量重排序得分相结合。

</template>
</BiRow>

<BiRow>
<template #en>

> Important: Using a rerank model significantly increases the time required to receive a response.

</template>
<template #zh>

> 重要：使用重排序模型会显著增加收到响应所需的时间。

</template>
</BiRow>

<BiRow>
<template #en>

#### Use Knowledge Graph

</template>
<template #zh>

#### 使用知识图谱（Use Knowledge Graph）

</template>
</BiRow>

<BiRow>
<template #en>

In a knowledge graph, entity descriptions, relationship descriptions, or community reports each exist as independent chunks. This switch indicates whether these chunks are added to retrieval. By default, this switch is disabled. After it is enabled, RAGFlow performs the following operations during retrieval testing:

</template>
<template #zh>

在知识图谱中，实体描述、关系描述和社区报告各自作为独立的分块存在。该开关决定是否将这些分块加入检索。默认情况下，该开关处于关闭状态。启用后，RAGFlow 会在检索测试期间执行以下操作：

</template>
</BiRow>

<BiRow>
<template #en>

1. Uses the LLM to extract entities and entity types from your query.
2. Based on the extracted entity types, retrieves the top N entities from the graph according to their PageRank values.
3. Uses embeddings of the extracted query entities to find similar entities and their N-hop relationships in the graph.
4. Uses the query embedding to retrieve similar relationships from the graph.
5. Sorts the retrieved entities and relationships by multiplying each entity's PageRank value by its similarity score with the query, and returns the top n as the final retrieval results.
6. Retrieves reports for communities involving most entities in the final retrieval.
7. Sends the retrieved entity descriptions, relationship descriptions, and top 1 community report to the LLM for content generation.

</template>
<template #zh>

1. 使用 LLM 从你的查询中提取实体及实体类型。
2. 根据提取出的实体类型，按 PageRank 值从图谱中检索前 N 个实体。
3. 使用查询实体的嵌入向量，在图谱中查找相似实体及其 N 跳关系。
4. 使用查询嵌入向量从图谱中检索相似的关系。
5. 将每个实体的 PageRank 值与其和查询的相似度得分相乘，据此对检索到的实体和关系排序，返回前 n 个作为最终检索结果。
6. 为最终检索结果中涉及多数实体的社区检索报告。
7. 将检索到的实体描述、关系描述和排名第一的社区报告发送给 LLM，用于生成内容。

</template>
</BiRow>

<BiRow>
<template #en>

> Important: Using the knowledge graph in retrieval testing significantly increases the time required to receive a response.

</template>
<template #zh>

> 重要：在检索测试中使用知识图谱会显著增加收到响应所需的时间。

</template>
</BiRow>

<BiRow>
<template #en>

#### Cross-Language Search

</template>
<template #zh>

#### 跨语言搜索（Cross-Language Search）

</template>
</BiRow>

<BiRow>
<template #en>

To perform cross-language search, select one or more target languages from the drop-down menu. Then the system's default chat model translates the query you entered in the test text field into the selected target languages. This translation ensures accurate cross-language semantic matching, allowing you to retrieve relevant results regardless of language differences.

</template>
<template #zh>

要执行跨语言搜索，请在下拉菜单中选择一个或多个目标语言。随后，系统默认的对话模型会把你在测试文本框中输入的查询翻译成所选的目标语言。这一翻译确保了准确的跨语言语义匹配，让你能够检索到相关结果，而不受语言差异影响。

</template>
</BiRow>

<BiRow>
<template #en>

> Tip: When selecting target languages, make sure these languages exist in the dataset to ensure effective search. If no target language is selected, the system searches only in the language of your query, which may cause relevant information in other languages to be missed.

</template>
<template #zh>

> 提示：选择目标语言时，请确保数据集中存在这些语言，以保证搜索有效。若不选择任何目标语言，系统将只以你的查询所用的语言进行搜索，这可能导致遗漏其他语言中的相关信息。

</template>
</BiRow>

<BiRow>
<template #en>

#### Test Text

</template>
<template #zh>

#### 测试文本（Test Text）

</template>
</BiRow>

<BiRow>
<template #en>

This field is used to enter your test query.

</template>
<template #zh>

该字段用于输入你的测试查询。

</template>
</BiRow>

<BiRow>
<template #en>

### Operation Steps

</template>
<template #zh>

### 操作步骤

</template>
</BiRow>

<BiRow>
<template #en>

1. Navigate to the dataset's **Retrieval Testing** page, enter your query in **Test text**, and click **Test** to run the test.
2. If the results are unsatisfactory, adjust the options listed in the configuration section and run the test again.

</template>
<template #zh>

1. 进入数据集的 **Retrieval Testing**（检索测试）页面，在 **Test text**（测试文本）中输入查询，点击 **Test**（测试）运行测试。
2. 如果结果不理想，调整配置部分列出的选项，然后再次运行测试。

</template>
</BiRow>

<BiRow>
<template #en>

The following screenshot shows retrieval testing without using the knowledge graph. It demonstrates hybrid search that combines weighted keyword similarity and weighted vector cosine similarity. The overall hybrid similarity score is 28.56, calculated as `25.17` term similarity score multiplied by `0.7` plus `36.49` vector similarity score multiplied by `0.3`.

</template>
<template #zh>

下面的截图展示的是不使用知识图谱的检索测试，演示了将加权关键词相似度与加权向量余弦相似度相结合的混合搜索。整体混合相似度得分为 28.56，计算方式为：`25.17` 的词项相似度得分乘以 `0.7`，加上 `36.49` 的向量相似度得分乘以 `0.3`。

</template>
</BiRow>

<BiRow>
<template #en>

The following screenshot shows retrieval testing using the knowledge graph. It shows that chunks generated by the knowledge graph use only vector similarity.

</template>
<template #zh>

下面的截图展示的是使用知识图谱的检索测试，可以看到知识图谱生成的分块仅使用向量相似度。

</template>
</BiRow>

<BiRow>
<template #en>

> Warning: If you adjusted default settings, such as keyword similarity weight or similarity threshold, to obtain the best results, note that these changes are not saved automatically. You must apply them to your chat assistant settings or the **Retrieval Agent** component settings.

</template>
<template #zh>

> 警告：如果你为获得最佳结果而调整了默认设置（如关键词相似度权重或相似度阈值），请注意这些修改不会自动保存，你必须把它们应用到对话助手设置或 **Retrieval Agent**（检索 Agent）组件的设置中。

</template>
</BiRow>

<BiRow>
<template #en>

### FAQ

</template>
<template #zh>

### 常见问题

</template>
</BiRow>

<BiRow>
<template #en>

#### Is an LLM Used When the Use Knowledge Graph Switch Is Enabled?

</template>
<template #zh>

#### 启用 Use Knowledge Graph 开关后会使用 LLM 吗？

</template>
</BiRow>

<BiRow>
<template #en>

Yes. Your LLM participates in analyzing your query and extracting relevant entities and relationships from the knowledge graph. This also explains why extra tokens and time are consumed.

</template>
<template #zh>

会。你的 LLM 会参与分析查询，并从知识图谱中提取相关的实体和关系。这也解释了为什么会消耗额外的 token 和时间。

</template>
</BiRow>

<BiRow>
<template #en>

#### Why does it take longer for RAGFlow to parse a document than LangChain?

</template>
<template #zh>

#### 为什么 RAGFlow 解析文档比 LangChain 花费更长时间？

</template>
</BiRow>

<BiRow>
<template #en>

We put painstaking effort into document pre-processing tasks like layout analysis, table structure recognition, and OCR (Optical Character Recognition) using our vision models. This contributes to the additional time required.

</template>
<template #zh>

我们在文档预处理任务上投入了大量精力，例如使用视觉模型进行版面分析、表格结构识别和 OCR（光学字符识别）。这也是解析耗时更长的原因之一。

</template>
</BiRow>

<BiRow>
<template #en>

## Best Practices: Index Acceleration

</template>
<template #zh>

## 最佳实践：索引加速

</template>
</BiRow>

<BiRow>
<template #en>

A checklist for accelerating document parsing and indexing.

</template>
<template #zh>

一份用于加速文档解析与索引的检查清单。

</template>
</BiRow>

<BiRow>
<template #en>

Please note that some of your settings may consume a large amount of time. If you often find document parsing time-consuming, use the following checklist:

</template>
<template #zh>

请注意，某些设置可能会消耗大量时间。如果你经常觉得文档解析耗时过长，可以参考下面的检查清单：

</template>
</BiRow>

<BiRow>
<template #en>

- On the dataset configuration page, turn off **Use RAPTOR to enhance retrieval**.
- Extracting the knowledge graph (GraphRAG) is time-consuming.
- On the dataset configuration page, disable **Auto keyword** and **Auto question**, because both depend on the LLM.
- v0.17.0+: If all PDFs in your dataset are pure text and do not require GPU-intensive processing such as OCR (optical character recognition), TSR (table structure recognition), or DLA (document layout analysis), select **Naive** instead of **DeepDoc** or other time-consuming large model options in the **Document parser** drop-down menu. This significantly reduces document parsing time.

</template>
<template #zh>

- 在数据集配置页关闭 **Use RAPTOR to enhance retrieval**（使用 RAPTOR 增强检索）。
- 抽取知识图谱（GraphRAG）非常耗时。
- 在数据集配置页禁用 **Auto keyword**（自动关键词）和 **Auto question**（自动问题），因为二者都依赖 LLM。
- v0.17.0+：如果数据集中的所有 PDF 都是纯文本，不需要 OCR（光学字符识别）、TSR（表格结构识别）或 DLA（文档版面分析）等高 GPU 消耗的处理，请在 **Document parser**（文档解析器）下拉菜单中选择 **Naive**，而不是 **DeepDoc** 或其他耗时的大模型选项。这可以显著缩短文档解析时间。

</template>
</BiRow>
