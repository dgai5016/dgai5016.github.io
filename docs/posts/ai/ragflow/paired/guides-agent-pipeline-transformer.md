<BiRow>
<template #en>

The **Transformer** component is designed to bridge the "semantic gap". In general, it uses AI models to add semantic metadata, making your content easier to discover during retrieval.

</template>
<template #zh>

**转换器**（Transformer）组件旨在弥合“语义鸿沟”。总体而言，它借助 AI 模型为内容添加语义元数据，让内容在检索时更容易被发现。

</template>
</BiRow>

<BiRow>
<template #en>

It has four generation types:

</template>
<template #zh>

它有四种生成类型：

</template>
</BiRow>

<BiRow>
<template #en>

- **Summary**: Creates a concise overview.
- **Keywords**: Extracts key terms.
- **Questions**: Generates questions that each text chunk can answer.
- **Metadata**: Custom metadata extraction.

</template>
<template #zh>

- **摘要**：生成简明概览。
- **关键词**：提取关键术语。
- **问题**：生成每个文本分块可以回答的问题。
- **元数据**：自定义元数据提取。

</template>
</BiRow>

<BiRow>
<template #en>

![Select Transformer generation type](/ragflow-images/transformer2.png)

</template>
<template #zh>

![选择 Transformer 生成类型](/ragflow-images/transformer2.png)

</template>
</BiRow>

<BiRow>
<template #en>

If you have multiple **Transformer** components, make sure to separate the **Transformer** component for each function, for example, one for summaries and another for keywords.

</template>
<template #zh>

如果你使用了多个 **Transformer** 组件，请确保为每个功能单独配置一个 **Transformer** 组件，例如一个用于摘要、另一个用于关键词。

</template>
</BiRow>

<BiRow>
<template #en>

Key configurations:

</template>
<template #zh>

关键配置：

</template>
</BiRow>

<BiRow>
<template #en>

Model mode (select one):

</template>
<template #zh>

模型模式（选其一）：

</template>
</BiRow>

<BiRow>
<template #en>

- **Improvise**: More creative, suitable for question generation.
- **Precise**: Strictly faithful to the text, suitable for summary and keyword extraction.
- **Balanced**: A middle ground suitable for most scenarios.

</template>
<template #zh>

- **Improvise**（即兴）：更有创造力，适合问题生成。
- **Precise**（精确）：严格忠于原文，适合摘要和关键词提取。
- **Balanced**（均衡）：居中的折中选项，适合大多数场景。

</template>
</BiRow>

<BiRow>
<template #en>

![Configure Transformer model mode](/ragflow-images/transformer1.png)

</template>
<template #zh>

![配置 Transformer 模型模式](/ragflow-images/transformer1.png)

</template>
</BiRow>

<BiRow>
<template #en>

Prompt engineering:

</template>
<template #zh>

提示词工程：

</template>
</BiRow>

<BiRow>
<template #en>

- The system prompt for each generation type is open and customizable.

</template>
<template #zh>

- 每种生成类型的系统提示词都是开放、可自定义的。

</template>
</BiRow>

<BiRow>
<template #en>

Connection:

</template>
<template #zh>

连接：

</template>
</BiRow>

<BiRow>
<template #en>

- The **Transformer** can be connected after the **Parser** to process the entire document, or after the **Chunker** to process each chunk.

</template>
<template #zh>

- **Transformer** 可以连接在 **Parser** 之后处理整个文档，也可以连接在 **Chunker** 之后处理每个分块。

</template>
</BiRow>

<BiRow>
<template #en>

Variable reference:

</template>
<template #zh>

变量引用：

</template>
</BiRow>

<BiRow>
<template #en>

- Nodes do not automatically obtain content. In the user prompt, manually reference upstream variables by typing `/` and selecting a specific output, such as `/{Parser.output}` or `/{Chunker.output}`.

</template>
<template #zh>

- 节点不会自动获取内容。请在用户提示词中手动引用上游变量：输入 `/` 并选择具体输出，例如 `/{Parser.output}` 或 `/{Chunker.output}`。

</template>
</BiRow>

<BiRow>
<template #en>

Chained connection:

</template>
<template #zh>

链式连接：

</template>
</BiRow>

<BiRow>
<template #en>

- When chaining **Transformer** components, if variables are referenced correctly, the second **Transformer** component processes the output of the first one, for example, generating keywords from a summary.

</template>
<template #zh>

- 链接多个 **Transformer** 组件时，只要变量引用正确，第二个 **Transformer** 组件就会处理第一个的输出，例如基于摘要生成关键词。

</template>
</BiRow>

<BiRow>
<template #en>

![Chain Transformer components](/ragflow-images/transformer3.png)

</template>
<template #zh>

![链式连接 Transformer 组件](/ragflow-images/transformer3.png)

</template>
</BiRow>
