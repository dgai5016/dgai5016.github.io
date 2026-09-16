# 多模型比较

多模型比较用相同的 Chat 配置和相同的问题同时测试多个模型，并展示每个模型生成的回答。

选择要比较的模型，输入测试问题，运行比较。重点关注每个回答是否准确、是否正确使用了知识库内容，以及各模型的回答有什么差异。

![选择要比较的模型](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/multi_model_comparison_1.jpg)

![比较各模型的回答](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/multi_model_comparison_2.jpg)

不要仅凭单个问题来选模型，而要使用实际业务场景中有代表性的问题。多模型比较主要用于模型选型和调试。例如，更换模型提供商或模型版本后，可以用同样的问题快速比较新旧模型的实际表现。

# FAQ
## 你们是否支持多轮对话，即把之前的对话作为当前查询的上下文？

支持，我们可以基于进行中对话的现有上下文来增强用户查询：

1. 在 **Chat** 页面，把鼠标悬停在目标助手上，选择 **Edit**。
2. 在 **Chat Configuration** 弹窗中，点击 **Prompt engine** 标签页。
3. 打开 **Multi-turn optimization** 开关，启用该功能。
