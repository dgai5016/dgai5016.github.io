# 配置转换器组件

**转换器**（Transformer）组件旨在弥合“语义鸿沟”。总体而言，它借助 AI 模型为内容添加语义元数据，让内容在检索时更容易被发现。

它有四种生成类型：

- **摘要**：生成简明概览。
- **关键词**：提取关键术语。
- **问题**：生成每个文本分块可以回答的问题。
- **元数据**：自定义元数据提取。

![选择 Transformer 生成类型](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/transformer2.png)

如果你使用了多个 **Transformer** 组件，请确保为每个功能单独配置一个 **Transformer** 组件，例如一个用于摘要、另一个用于关键词。

关键配置：

模型模式（选其一）：

- **Improvise**（即兴）：更有创造力，适合问题生成。
- **Precise**（精确）：严格忠于原文，适合摘要和关键词提取。
- **Balanced**（均衡）：居中的折中选项，适合大多数场景。

![配置 Transformer 模型模式](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/transformer1.png)

提示词工程：

- 每种生成类型的系统提示词都是开放、可自定义的。

连接：

- **Transformer** 可以连接在 **Parser** 之后处理整个文档，也可以连接在 **Chunker** 之后处理每个分块。

变量引用：

- 节点不会自动获取内容。请在用户提示词中手动引用上游变量：输入 `/` 并选择具体输出，例如 `/{Parser.output}` 或 `/{Chunker.output}`。

链式连接：

- 链接多个 **Transformer** 组件时，只要变量引用正确，第二个 **Transformer** 组件就会处理第一个的输出，例如基于摘要生成关键词。

![链式连接 Transformer 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/transformer3.png)
