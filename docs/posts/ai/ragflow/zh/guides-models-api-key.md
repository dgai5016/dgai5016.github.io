# 配置模型 API Key

RAGFlow 的模型提供商管理支持将在线模型、本地模型和 OpenAI 兼容模型接入 RAGFlow，供知识库、对话、搜索和 Agent 使用。

## 获取模型 API Key

RAGFlow 支持大多数主流 LLM。完整支持列表请参阅[支持的模型](https://ragflow.io/docs/guides/models/supported_models)。你需要在线申请相应的模型 API key。

:::note
如果你发现自己的在线 LLM 不在列表中，也不必灰心。该列表正在持续扩充，你可以向我们[提交功能请求](https://github.com/infiniflow/ragflow/issues/new?assignees=&labels=feature+request&projects=&template=feature_request.yml&title=%5BFeature+Request%5D%3A+)！另外，如果你有自定义或本地部署的模型，也可以[使用 Ollama、Xinference 或 LocalAI 将其绑定到 RAGFlow](https://ragflow.io/docs/guides/models/deploy_local_llm)。
:::

## 添加模型提供商实例

### 选择模型提供商

进入 **User settings**（用户设置）**>** **Model providers**（模型提供商）。在 **Available models**（可用模型）中选择一个提供商并完成配置。配置成功后，该提供商会标记为 **Configured**（已配置）。

![选择模型提供商](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/select_model_provider.jpeg)

### 创建模型提供商实例并配置连接信息

实例用于保存某个提供商下的一组连接配置。你可以为测试环境、生产环境、本地模型或代理网关分别创建实例，避免不同用途的配置混在一起。
首次配置某个提供商时，右侧窗格会提示你先创建实例。实例保存后，即可继续填写 **API Key** 和 **Base URL** 并添加模型。

**API Key** 用于身份验证。**Base URL** 指定模型服务端点。

对于官方提供商，大多数情况下保持默认 **Base URL** 即可。对于代理、网关、本地模型或兼容 API，请填写实际的服务地址。

配置模型提供商的步骤：

1. 选择要配置的提供商。
2. 输入实例名称。
3. 输入 **API Key** 和 **Base URL**。
4. 保存实例。

![创建实例](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_instance.jpeg)

:::caution
请勿泄露你的 API Key。Base URL 不正确会导致连接验证或模型调用失败。使用兼容 API 时，请确认路径是否必须包含 `/v1`。
:::

#### Amazon Bedrock API key

对于 **Bedrock**，选择 **API Key**，输入 Bedrock API key 和 AWS Region，然后列出并选择该 key 可用的模型。RAGFlow 会将该 key 的作用范围限定在此提供商实例内，并且仅在该实例的请求中将其作为 Bearer token 发送。

Bedrock API key 身份验证不支持重排序模型。

生产环境请尽量使用短期 Bedrock API key。长期 key 在过期或被删除之前始终有效，因此请将其作为机密妥善存储、将访问权限限定在 RAGFlow 实例范围内，并定期轮换。

### 验证连接

填写 **API Key** 和 **Base URL** 后，请先验证连接。如果验证失败，请检查 API Key、Base URL、网络连接、账户额度以及模型可用性。

![验证连接](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/verify_connection.png)

## 向实例添加模型

添加模型提供商实例且连接验证成功后，即可为该实例添加并配置模型。请按业务需要添加所需的模型类型，例如大语言模型（LLM）、嵌入模型、视觉语言模型（VLM）、自动语音识别模型（ASR）、重排序模型和文本转语音模型（TTS）。

添加模型后，你可以将其设为对应模型类型的默认模型。

### 从列表添加模型

模型实例连接成功后，RAGFlow 会自动显示该模型提供商支持的部分模型。你可以搜索并逐个添加所需模型，也可以批量添加当前列表中的模型。

![从列表添加模型](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/add_models_from_list.png)

### 添加自定义模型

如果所需模型未显示在列表中，但模型提供商实际支持该模型，你可以手动将其添加为自定义模型。添加自定义模型时，需填写模型名称并选择模型类型。

模型名称必须与模型提供商 API 对外提供的模型 ID 一致。否则，RAGFlow 可能在调用时无法正确识别该模型。

添加自定义模型的步骤：

1. 进入已配置的提供商实例，点击 **Add custom model**。
2. 输入模型名称。该名称必须与提供商实际提供的模型标识符一致。
3. 选择对应的模型类型。
4. 根据模型能力填写 **Max tokens**。该值设置模型单次调用可生成的最大 token 数。
5. 如果模型支持工具调用，请启用 **Tool call**。启用后，模型可以在对话或 Agent 运行过程中调用外部工具或函数，例如知识检索或 API 请求。不支持该能力的模型请勿启用。
6. 点击 **Confirm** 保存模型，并通过实际调用验证该模型是否可用。

![添加自定义模型 1](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/add_custom_model_1.png)

![添加自定义模型 2](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/add_custom_model_2.png)
## 设置默认模型

默认模型用于 RAGFlow 需要自动选择模型、且未单独指定模型的场景。请在添加并验证模型之后设置默认模型，以避免在业务页面选中不可用的模型。

至少设置以下默认模型：

1. 默认 LLM。
2. 默认嵌入模型。

如果你已配置重排序模型，也建议设置默认重排序模型。VLM、ASR、TTS 和 OCR 的默认模型可按业务需要配置。

![设置默认模型](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/set_default_models.jpeg)

## 模型类型与用途

| 模型类型 | 全称 | 主要功能 | 输入 | 输出 | 典型场景 |
| --- | --- | --- | --- | --- | --- |
| LLM | 大语言模型 | 理解、推理并生成文本 | 文本提示词 | 文本 | 智能问答、内容生成、摘要和信息抽取 |
| Embedding | 嵌入模型 | 将文本转换为向量表示 | 文本 | 向量 | 语义检索、相似度计算和知识库索引 |
| Rerank | 重排序模型 | 按相关性对初步检索到的候选结果打分并重新排序 | 查询文本和候选文本 | 相关性得分和排序结果 | 优化检索结果、提升知识库问答准确性 |
| VLM | 视觉语言模型 | 理解图像以及图像中的文本、物体和场景信息 | 图像、文本或图文结合内容 | 文本 | 图像问答、图表理解和视觉内容分析 |
| ASR | 自动语音识别模型 | 将语音转换为文本 | 音频 | 文本 | 语音转写、会议记录和实时字幕 |
| TTS | 文本转语音模型 | 将文本转换为语音 | 文本 | 音频 | 语音播放、音频内容和语音交互 |
| OCR | 光学字符识别模型 | 识别图像或扫描文档中的文本 | 图像或扫描文档 | 识别出的文本 | 扫描文档识别和票据识别 |

以下模型类型通常在检索和生成中协同工作：

1. **Embedding**、**Rerank** 和 **LLM**：嵌入模型将查询和知识分块转换为向量，系统基于向量相似度召回候选分块。重排序模型按相关性对候选分块打分并重新排序。LLM 基于选定的知识内容理解问题并生成答案。
2. **VLM**、**ASR**、**TTS** 和 **OCR**：VLM 用于理解图像和图文信息。OCR 识别图像或扫描文档中的文本。ASR 将语音转换为文本。TTS 将文本转换为语音。不同模型类型共同支持图像理解、文档识别和语音交互等多模态场景。
3. **Moderation**：Moderation（内容审核）模型用于识别文本或图像中不合规、有害或敏感的内容。它可以审查用户输入和模型输出，降低生成或传播不合规内容的风险。

## 支持的模型列表

参见[支持的模型](https://ragflow.io/docs/guides/models/supported_models)。
