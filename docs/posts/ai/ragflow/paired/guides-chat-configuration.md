<BiRow>
<template #en>

## Dataset Configuration

</template>
<template #zh>

## 数据集配置

</template>
</BiRow>

<BiRow>
<template #en>

dataset determine the data scope that Chat can retrieve and cite. Only dataset that contain successfully parsed, available chunks can serve as valid knowledge sources.

</template>
<template #zh>

数据集决定了 Chat 可以检索和引用的数据范围。只有包含已成功解析、可正常使用的分块的数据集，才能作为有效的知识来源。

</template>
</BiRow>

<BiRow>
<template #en>

- **Select dataset**: Associate one or more dataset in the **dataset** field. New or empty dataset generally do not appear in the selection list.
- **Unavailable dataset**: If a dataset has been deleted or contains no available chunks, Chat indicates that the selected dataset is unavailable. Select another dataset.

</template>
<template #zh>

- **选择数据集**：在 **dataset** 字段中关联一个或多个数据集。新建或空的数据集通常不会出现在选择列表中。
- **不可用的数据集**：如果某个数据集已被删除或不包含可用的分块，Chat 会提示所选数据集不可用。请选择其他数据集。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
For answers grounded in retrieved knowledge, consider retaining the `{knowledge}` placeholder in the system prompt.
:::

</template>
<template #zh>

:::tip 注意
为了让回答有检索到的知识作为依据，建议在 System prompt 中保留 `{knowledge}` 占位符。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Model

</template>
<template #zh>

## Model

</template>
</BiRow>

<BiRow>
<template #en>

Select the large language model that understands questions and generates answers. Models differ in context length, reasoning capability, response speed, tool-calling capability, and cost.

</template>
<template #zh>

选择用于理解问题并生成回答的大语言模型。不同模型在上下文长度、推理能力、响应速度、工具调用能力和成本上各有差异。

</template>
</BiRow>

<BiRow>
<template #en>

Choose a model based on the use case. For routine dataset Q&A, prioritize response speed. For complex analysis or multi-document synthesis, select a model with stronger reasoning capabilities.

</template>
<template #zh>

根据使用场景选择模型。常规的数据集问答优先考虑响应速度；复杂分析或多文档综合，则选择推理能力更强的模型。

</template>
</BiRow>

<BiRow>
<template #en>

The available models depend on the models that have been added and configured in the current system.

</template>
<template #zh>

可用模型取决于当前系统中已添加并配置的模型。

</template>
</BiRow>

<BiRow>
<template #en>

## Opening Greeting

</template>
<template #zh>

## Opening Greeting

</template>
</BiRow>

<BiRow>
<template #en>

The opening greeting is the initial content shown when a user enters the Chat. Use it to briefly introduce the Chat's purpose, capability scope, usage, or example questions and help users begin a conversation.

</template>
<template #zh>

Opening greeting 是用户进入 Chat 时最初显示的内容。可以用它简要介绍 Chat 的用途、能力范围、使用方式或示例问题，帮助用户开始对话。

</template>
</BiRow>

<BiRow>
<template #en>

An opening greeting can explain:

</template>
<template #zh>

Opening greeting 可以说明：

</template>
</BiRow>

<BiRow>
<template #en>

- The types of questions the Chat can answer.
- The knowledge or business content on which its answers are based.
- How users should phrase their questions.
- Recommended examples or frequently asked questions.

</template>
<template #zh>

- Chat 能回答哪些类型的问题。
- 回答依据的知识或业务内容。
- 用户应如何组织提问。
- 推荐的示例或常见问题。

</template>
</BiRow>

<BiRow>
<template #en>

The opening greeting primarily provides an introduction and guidance; it does not control subsequent answer behavior.

</template>
<template #zh>

Opening greeting 主要起介绍和引导作用，不会控制后续回答的行为。

</template>
</BiRow>

<BiRow>
<template #en>

## System Prompt

</template>
<template #zh>

## System Prompt

</template>
</BiRow>

<BiRow>
<template #en>

The system prompt defines the Chat's role, tasks, and answer rules, and affects model behavior throughout the conversation.

</template>
<template #zh>

System prompt 定义了 Chat 的角色、任务和回答规则，并影响整个对话过程中的模型行为。

</template>
</BiRow>

<BiRow>
<template #en>

Use it to specify the role, answer scope, language and tone, dataset usage, answer format, and how the Chat should handle missing information. For knowledge-base Q&A, explicitly instruct the model to prioritize dataset content and avoid filling in gaps or guessing when reliable evidence is unavailable.

</template>
<template #zh>

可以用它指定角色、回答范围、语言和语气、数据集的使用方式、回答格式，以及 Chat 应如何处理缺失的信息。对于知识库问答，应明确要求模型优先依据数据集内容，在缺乏可靠依据时不要填补空缺或猜测。

</template>
</BiRow>

<BiRow>
<template #en>

You can also require the Chat to:

</template>
<template #zh>

还可以要求 Chat：

</template>
</BiRow>

<BiRow>
<template #en>

- Answer in English, Chinese, or another specified language.
- Keep answers concise and professional, or use a specified format.
- State clearly when an answer cannot be confirmed from the available information.
- Decline questions outside the scope of the current Chat.

</template>
<template #zh>

- 用英文、中文或其他指定语言回答。
- 保持回答简洁专业，或使用指定格式。
- 当回答无法从现有信息中得到确认时，明确说明。
- 拒绝超出当前 Chat 范围的问题。

</template>
</BiRow>

<BiRow>
<template #en>

Clearer prompts produce more stable behavior. Refine the prompt continuously based on testing, and avoid conflicting settings or overly complex rules.

</template>
<template #zh>

提示词越清晰，行为越稳定。根据测试持续打磨提示词，避免相互冲突的设置或过于复杂的规则。

</template>
</BiRow>

<BiRow>
<template #en>

## Retrieval Configuration

</template>
<template #zh>

## 检索配置

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval configuration controls how Chat recalls, filters, and ranks chunks from dataset. Tune these settings to balance retrieval scope, relevance, and response efficiency.

</template>
<template #zh>

检索配置控制 Chat 如何从数据集召回、筛选和排序分块。调整这些设置，可以在检索范围、相关性和响应效率之间取得平衡。

</template>
</BiRow>

<BiRow>
<template #en>

- **Similarity threshold**: The minimum similarity score for retrieved content. A higher threshold is stricter and usually returns more relevant content, but may miss useful information. A lower threshold broadens recall but may introduce less relevant content.
- **Vector similarity weight**: Controls the relative weight of vector semantic similarity and full-text matching in hybrid search. A higher vector weight favors semantic similarity; a higher full-text weight favors keyword and text matching. Tune it according to the dataset content and question style.
- **Top N**: The number of candidate chunks returned by each retrieval. A larger value provides more context but increases context length, response time, and cost. Tune it according to document scale and retrieval results.
- **Rerank model**: Reranks retrieval results, calculates the relevance between candidate chunks and the question, and moves more relevant content forward for answer generation. Configure an available rerank model before using this option.
- **Metadata**: Uses document or chunk metadata to limit the retrieval scope, such as by document type, date, or source.

</template>
<template #zh>

- **Similarity threshold**：检索内容需达到的最低相似度分数。阈值越高越严格，通常返回的内容更相关，但可能遗漏有用信息；阈值越低召回越广，但可能引入不太相关的内容。
- **Vector similarity weight**：控制混合搜索中向量语义相似度与全文匹配的相对权重。向量权重更高偏向语义相似度，全文权重更高偏向关键词和文本匹配。请根据数据集内容和提问风格调整。
- **Top N**：每次检索返回的候选分块数量。值越大提供的上下文越多，但会增加上下文长度、响应时间和成本。请根据文档规模和检索结果调整。
- **Rerank model**：对检索结果重排序，计算候选分块与问题的相关性，把更相关的内容排到前面供生成回答使用。使用该选项前，请先配置一个可用的重排序模型。
- **Metadata**：利用文档或分块的元数据限定检索范围，例如按文档类型、日期或来源筛选。

</template>
</BiRow>

<BiRow>
<template #en>

## Empty Response

</template>
<template #zh>

## Empty Response

</template>
</BiRow>

<BiRow>
<template #en>

An empty response is preset content returned when the system cannot obtain enough information from a dataset, for example:

</template>
<template #zh>

Empty response 是系统无法从数据集中获取足够信息时返回的预设内容，例如：

</template>
</BiRow>

<BiRow>
<template #en>

> No relevant content was found in the dataset. Add more information and try again.

</template>
<template #zh>

> 未在数据集中找到相关内容。请补充更多信息后重试。

</template>
</BiRow>

<BiRow>
<template #en>

When retrieval returns no usable dataset content, Chat returns the preset response instead of continuing to generate an answer. This is useful when answers must be strictly grounded in a dataset and helps reduce unreliable output.

</template>
<template #zh>

当检索没有返回可用的数据集内容时，Chat 会返回这条预设回复，而不是继续生成回答。在回答必须严格依据数据集的场景下很有用，有助于减少不可靠的输出。

</template>
</BiRow>

<BiRow>
<template #en>

If no empty response is configured, the model may continue answering from its own knowledge when the dataset contains no relevant content.

</template>
<template #zh>

如果没有配置 Empty response，当数据集中没有相关内容时，模型可能会凭自身知识继续作答。

</template>
</BiRow>

<BiRow>
<template #en>

Choose a configuration according to the scenario:

</template>
<template #zh>

请根据场景选择配置：

</template>
</BiRow>

<BiRow>
<template #en>

- **Strictly use the dataset**: Configure an empty response for internal policies, customer service, compliance, product documentation, and other scenarios that depend heavily on dataset content.
- **Allow the model to answer freely**: Leave it blank if answering from the model's own knowledge is acceptable.
- **Guide the user's next action**: Include a clear instruction, such as adding information, trying again, or contacting an administrator.

</template>
<template #zh>

- **严格使用数据集**：对内部政策、客服、合规、产品文档等高度依赖数据集内容的场景，配置 Empty response。
- **允许模型自由回答**：如果可以接受模型凭自身知识作答，留空即可。
- **引导用户的下一步操作**：写一条明确的指引，例如补充信息、重试或联系管理员。

</template>
</BiRow>

<BiRow>
<template #en>

An empty response is triggered only when retrieval finds no usable content. If any usable result exists, the system normally continues model generation; it does not decide based on whether the final answer is complete.

</template>
<template #zh>

只有当检索完全找不到可用内容时才会触发 Empty response。只要存在可用的结果，系统就会正常继续模型生成，并不会根据最终回答是否完整来决定。

</template>
</BiRow>

<BiRow>
<template #en>

The Thinking mode also affects this process. Higher Thinking modes perform more retrieval and reasoning before returning an empty response. **Low** makes a quick determination, **Medium** performs standard processing, and **High** or **Ultra** conducts multiple rounds of deeper retrieval. An empty response is returned only when the system ultimately determines that it cannot answer.

</template>
<template #zh>

Thinking 模式也会影响这一过程。Thinking 档位越高，返回 Empty response 前进行的检索和推理就越多：**Low** 快速判断，**Medium** 执行标准处理，**High** 和 **Ultra** 进行多轮更深入的检索。只有当系统最终确定无法回答时，才会返回 Empty response。

</template>
</BiRow>

<BiRow>
<template #en>

## Select a Thinking Mode

</template>
<template #zh>

## 选择 Thinking 模式

</template>
</BiRow>

<BiRow>
<template #en>

Thinking mode determines how deeply Chat investigates available data before answering.

</template>
<template #zh>

Thinking 模式决定 Chat 在回答前对可用数据挖掘到什么程度。

</template>
</BiRow>

<BiRow>
<template #en>

Before asking a question, select **Naive**, **Low**, **Medium**, **High**, or **Ultra** from the Thinking menu near the message box.

</template>
<template #zh>

提问前，在消息框附近的 Thinking 菜单中选择 **Naive**、**Low**、**Medium**、**High** 或 **Ultra**。

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval means searching for evidence before answering. If a dataset is associated with the Chat, the system retrieves relevant chunks. If web search is enabled, or the current version provides PageIndex or Graph capabilities, those sources can also be used as supplemental evidence. The final answer should be based on the retrieved content.

</template>
<template #zh>

检索是指在回答前先搜索证据。如果 Chat 关联了数据集，系统会检索相关分块；如果启用了网页搜索，或当前版本提供 PageIndex 或 Graph 能力，这些来源也可以作为补充证据。最终回答应基于检索到的内容。

</template>
</BiRow>

<BiRow>
<template #en>

- **None**: Performs retrieval without complex analysis. Use it for straightforward factual questions when identifiers, terms, or locations are clearly present in a document. It generally uses one query and responds fastest. It can be used together with empty responses and citations.
- **Low**: Performs slightly more retrieval than **None** while remaining fast. It is suitable for enhanced basic retrieval, but not for multi-step comparisons or complex judgments.
- **Medium** (recommended starting point): Suitable for most formal dataset Q&A, questions with multiple conditions or context, and summaries of multiple paragraphs. It first clarifies or rewrites the question, then retrieves and integrates evidence.
- **High**: Suitable for complex Q&A, cross-chapter or cross-document questions, process and policy explanations, comparisons, and multi-condition judgments. It splits the problem more actively and checks whether the evidence is sufficient, so it may take longer and invoke the model more often.
- **Ultra**: Suitable for version-difference analysis, multi-document research, complex attribution, multi-hop relationships, and questions whose answers are distributed across several documents. It performs the most retrieval and analysis, generally takes the longest, and is not recommended as the default configuration for everyday Q&A.

</template>
<template #zh>

- **None**：只做检索，不做复杂分析。适用于标识符、术语或位置在文档中明确出现的简单事实性问题。通常只使用一次查询，响应最快。可以与 Empty response 和引用配合使用。
- **Low**：比 **None** 略多的检索，同时保持快速。适合增强型的基础检索，不适合多步比较或复杂判断。
- **Medium**（推荐起点）：适合大多数正式的数据集问答、含多个条件或上下文的问题，以及多段总结。它会先澄清或改写问题，再检索并整合证据。
- **High**：适合复杂问答、跨章节或跨文档问题、流程和政策解读、比较类问题以及多条件判断。它会更主动地拆解问题并检查证据是否充分，因此耗时更长、模型调用更多。
- **Ultra**：适合版本差异分析、多文档调研、复杂归因、多跳关系，以及答案分布在多份文档中的问题。它的检索和分析最多，通常耗时最长，不建议作为日常问答的默认配置。

</template>
</BiRow>

<BiRow>
<template #en>

If you are unsure which mode to choose, start with **Medium** for formal business Q&A. For simple questions or when speed is critical, use **None** or **Low**. If the answer is incomplete or requires cross-document comparison, move up to **High** or **Ultra**.

</template>
<template #zh>

如果不确定选哪档，正式业务问答先从 **Medium** 开始。简单问题或速度优先时，用 **None** 或 **Low**。回答不完整或需要跨文档比较时，再升级到 **High** 或 **Ultra**。

</template>
</BiRow>

<BiRow>
<template #en>

![Select a Thinking mode](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/select_thinking_mode.jpg)

</template>
<template #zh>

![选择 Thinking 模式](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/select_thinking_mode.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Retrieval Augmentation Options

</template>
<template #zh>

## 检索增强选项

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval augmentation options further optimize queries or expand information retrieval beyond basic dataset retrieval. Enable them according to the actual question-answering scenario; you do not need to enable every option.

</template>
<template #zh>

检索增强选项在基础数据集检索之上进一步优化查询或扩展信息来源。根据实际问答场景按需启用，不必全部打开。

</template>
</BiRow>

<BiRow>
<template #en>

- **Keyword analysis**: Analyzes the user's question and uses the extracted keywords to assist retrieval. It is suitable for questions with distinctive keywords, such as product names, technical terms, and reference numbers.
- **Multi-turn conversation optimization**: Uses the conversation history to optimize the current retrieval query, helping the system understand context, references, and omitted information in a continuous conversation. It is suitable for multi-turn conversations about the same topic.
- **Cross-language search**: Improves retrieval across languages. When the question language differs from the language of the dataset documents, this option can improve the recall of cross-language content.

</template>
<template #zh>

- **Keyword analysis**：分析用户的提问，利用提取出的关键词辅助检索。适合带鲜明关键词的问题，如产品名称、技术术语、编号。
- **Multi-turn conversation optimization**：利用对话历史优化当前检索查询，帮助系统理解连续对话中的上下文、指代和省略信息。适合围绕同一主题的多轮对话。
- **Cross-language search**：改善跨语言检索。当提问语言与数据集文档语言不一致时，该选项可以提升跨语言内容的召回。

</template>
</BiRow>

<BiRow>
<template #en>

<img
  src="https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/retrieval_augmentation_options_1.jpg"
  alt="Retrieval augmentation options"
  width="700"
/>

</template>
<template #zh>

<img
  src="https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/retrieval_augmentation_options_1.jpg"
  alt="Retrieval augmentation options"
  width="700"
/>

</template>
</BiRow>

<BiRow>
<template #en>

![Additional retrieval augmentation settings](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/retrieval_augmentation_options_2.jpg)

</template>
<template #zh>

![更多检索增强设置](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/retrieval_augmentation_options_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Answer and Display Settings

</template>
<template #zh>

## 回答与显示设置

</template>
</BiRow>

<BiRow>
<template #en>

Answer and display settings control how generated content is presented and output. They generally do not change the dataset retrieval scope, but affect how citations, metadata, and voice content are presented to users.

</template>
<template #zh>

回答与显示设置控制生成内容的呈现和输出方式。它们通常不会改变数据集的检索范围，但会影响引用、元数据和语音内容向用户展示的方式。

</template>
</BiRow>

<BiRow>
<template #en>

- **Show citations**: When enabled, Chat displays the dataset content cited in the answer and its source, allowing users to inspect the evidence and trace it to the original document. When disabled, citation information is not shown.
- **Show chunk metadata**: When enabled, citations display metadata for the corresponding chunk, such as the source, author, and date fields configured for the document. This supplements citation context and helps users understand the source and attributes of the cited content.
- **Text-to-speech**: Select the model used to convert text answers to speech. Once configured, Chat can output generated text as speech. Leave it disabled if voice output is not needed. Before using this feature, configure an available text-to-speech (TTS) model.

</template>
<template #zh>

- **Show citations**：启用后，Chat 会展示回答中引用的数据集内容及其来源，方便用户核查依据并追溯到原始文档；禁用后不显示引用信息。
- **Show chunk metadata**：启用后，引用会展示对应分块的元数据，例如为文档配置的来源、作者和日期字段。这可以补充引用上下文，帮助用户了解被引用内容的来源和属性。
- **Text-to-speech**：选择用于把文字回答转成语音的模型。配置后，Chat 可以把生成的文字以语音输出。不需要语音输出时保持禁用。使用该功能前，请先配置一个可用的文字转语音（TTS）模型。

</template>
</BiRow>
