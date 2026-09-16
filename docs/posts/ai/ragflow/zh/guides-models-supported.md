# 模型提供商

RAGFlow 支持的模型提供商完整列表，该列表将持续扩充。

```mdx-code-block

```

| 提供商 | URL |
| --- | --- |
| 302.AI | `https://302.ai` |
| aimlapi.com | `https://aimlapi.com` |
| AnonRouter | `https://anonrouter.ai` |
| API-Route | `https://www.api-route.com` |
| Anthropic | `https://www.anthropic.com` |
| Astraflow | `https://astraflow.ucloud-global.com/en-us` |
| Astraflow-CN | `https://astraflow.ucloud.cn/` |
| Avian | `https://www.avian.io` |
| Azure-OpenAI | `https://azure.microsoft.com/en-us/products/ai-services/openai-service` |
| BaiChuan | `https://www.baichuan-ai.com` |
| BaiduYiyan | `https://yiyan.baidu.com` |
| Bedrock | `https://aws.amazon.com/bedrock/` |
| Cohere | `https://cohere.com` |
| CometAPI | `https://cometapi.com` |
| DaoXE | `https://daoxe.com` |
| DeepInfra | `https://deepinfra.com` |
| DeepSeek | `https://www.deepseek.com` |
| DeerAPI | `https://deerapi.com` |
| Fish Audio | `https://fish.audio` |
| FunASR | `https://github.com/modelscope/FunASR` |
| FuturMix | `https://futurmix.ai` |
| Gemini | `https://gemini.google.com` |
| GiteeAI | — |
| Google Cloud | `https://cloud.google.com` |
| GPUStack | `https://gpustack.ai` |
| GreenPT | `https://greenpt.ai` |
| Groq | `https://groq.com` |
| Hubris | `https://hubris.pw` |
| HuggingFace | `https://huggingface.co` |
| Jiekou.AI | `https://jiekou.ai` |
| Jina | `https://jina.ai` |
| llmman | `https://github.com/llmmanorg/llmman` |
| LM-Studio | `https://lmstudio.ai` |
| LocalAI | `https://localai.io` |
| LongCat | `https://longcat.chat` |
| MiniMax | `https://www.minimaxi.com` |
| MinerU | `https://mineru.net/` |
| Mistral | `https://mistral.ai` |
| Mistral OCR | — |
| ModelScope | `https://www.modelscope.cn` |
| Moonshot | `https://www.moonshot.cn` |
| MWS | `https://mws.ru/docs/cloud-platform/gpt.html` |
| n1n | — |
| New API | — |
| NVIDIA | `https://www.nvidia.com` |
| NovitaAI | `https://novita.ai` |
| Ollama | `https://ollama.com` |
| OpenAI | `https://openai.com` |
| OpenAI-API-Compatible | N/A |
| OpenDataLoader | — |
| OpenRouter | `https://openrouter.ai` |
| PaddleOCR | — |
| Perplexity | `https://www.perplexity.ai` |
| PPIO | `https://ppio.com` |
| RAGcon | — |
| Replicate | `https://replicate.com` |
| SILICONFLOW | `https://siliconflow.cn` |
| SoMark | — |
| StepFun | `https://www.stepfun.com` |
| Synthorai             | `https://synthorai.io`                         |
| Tencent Cloud | `https://cloud.tencent.com` |
| Tencent Hunyuan | `https://hunyuan.tencent.com` |
| TogetherAI | `https://www.together.ai` |
| TokenPony | `https://tokenpony.cn` |
| Tongyi-Qianwen | `https://tongyi.aliyun.com` |
| Upstage | `https://www.upstage.ai` |
| VLLM | `https://vllm.ai` |
| VolcEngine | `https://www.volcengine.com` |
| Voyage AI | `https://www.voyageai.com` |
| xAI | `https://x.ai` |
| Xiaomi | — |
| Xinference | `https://github.com/xorbitsai/inference` |
| XunFei Spark | `https://xinghuo.xfyun.cn` |
| ZHIPU-AI | `https://www.zhipuai.cn` |

```mdx-code-block

```

:::danger 重要
如果你的模型未在此处列出，但其 API 与 OpenAI 的 API 兼容，请在 **Model providers**（模型提供商）页面上点击 **OpenAI-API-Compatible** 来配置你的模型。
:::

## 示例：AI Badgr（OpenAI 兼容）

你可以通过现有的 OpenAI-API-Compatible 提供商在 RAGFlow 中使用 **AI Badgr**。

配置 AI Badgr：

- **Provider**（提供商）：`OpenAI-API-Compatible`
- **Base URL**：`https://aibadgr.com/api/v1`
- **API Key**：你的 AI Badgr API key（来自 AI Badgr 控制面板）
- **Model**（模型）：即 AI Badgr 通过其 OpenAI 兼容 API 暴露的任一对话或嵌入模型 ID

AI Badgr 实现了 `/v1/chat/completions`、`/v1/embeddings` 和 `/v1/models` 的 OpenAI 兼容端点，因此无需在 RAGFlow 中做任何额外的代码改动。

:::note
支持的模型列表提取自[这个源文件](https://github.com/infiniflow/ragflow/blob/main/rag/llm/__init__.py)，可能不是最新的。如需最新的支持模型列表，请查阅该 Python 文件。
:::
