# Releases (Part 2)

## v0.26.1

Released on June 17, 2026.

### New features

- **Model providers**: Allows users to modify the model type of existing model configurations. [#16029](https://github.com/infiniflow/ragflow/pull/16029)
- **Chat channels**: Enables users to deploy RAGFlow assistants as chatbots within external messaging platforms like Discord and Feishu. [#15850](https://github.com/infiniflow/ragflow/pull/15850)
- **Observability**: Groups multi-turn chat traces by session within Langfuse to facilitate conversation debugging and replay. [#15679](https://github.com/infiniflow/ragflow/pull/15679)

### i18n

- Adds ~70 missing translation keys for the French UI. [#15983](https://github.com/infiniflow/ragflow/pull/15983)

### Bug fixes

- **Model provider**: Fixes inaccurate token billing, corrects embedding truncation limits to prevent indexing failures, and refactors error handling to surface root error causes. [#15424](https://github.com/infiniflow/ragflow/pull/15424)
- **API**: Adds a legacy mode to the `/chat/completions` endpoint to restore the v0.23.0 style `<think>` output for backward compatibility. [#16014](https://github.com/infiniflow/ragflow/pull/16014) See also [Converse with chat assistant](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant).

## v0.26.0

Released on June 11, 2026.

### New features

- **Model providers**
  - Implements auto-populated model lists for multiple providers, eliminating the need to type model names manually. This feature currently supports: Ollama, OpenRouter, vLLM, OpenAI-API-Compatible, LM-Studio, VolcEngine, Xinference, LocalAI, BaiduYiyan, GPUStack, and Fish Audio.
  - Allows configuring multiple API keys for the same model provider. [#14595](https://github.com/infiniflow/ragflow/pull/14595)
  - Dynamically populates model selection dropdowns in the UI by fetching the currently available models directly from remote model providers. [#15711](https://github.com/infiniflow/ragflow/pull/15711)
- **Data source connectors**: Implements new data source connectors for Outlook, OneDrive, Microsoft Teams, Slack, SharePoint, Salesforce, and Azure Blob Storage. [#15333](https://github.com/infiniflow/ragflow/pull/15333)[#15330](https://github.com/infiniflow/ragflow/pull/15330)[#15332](https://github.com/infiniflow/ragflow/pull/15332)[#15188](https://github.com/infiniflow/ragflow/pull/15188)[#15190](https://github.com/infiniflow/ragflow/pull/15190)[#15462](https://github.com/infiniflow/ragflow/pull/15462)[#15466](https://github.com/infiniflow/ragflow/pull/15466)
- **Dataset** - Implements a checkpoint and resume feature for community extraction and entity resolution, the most expensive and time-consuming parts of the GraphRAG indexing pipeline. [#15518](https://github.com/infiniflow/ragflow/issues/15518)[#15523](https://github.com/infiniflow/ragflow/pull/15523)

### Improvements

- Removes `<think>` text buffering to ensure reasoning-capable models feel faster and more transparent during interactions. [#15891](https://github.com/infiniflow/ragflow/pull/15891)
- Marks MySQL migrations as applied. [#15504](https://github.com/infiniflow/ragflow/pull/15504)

### Model Support

- Four new SiliconFlow models [#15383](https://github.com/infiniflow/ragflow/pull/15383)
- MiniMax-M3 model [#15513](https://github.com/infiniflow/ragflow/pull/15513)
- Latest Anthropic models [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Voyage 4 model family [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Cohere model list. [#15576](https://github.com/infiniflow/ragflow/pull/15576)

### i18n

- Completes Korean translation. [#15863](https://github.com/infiniflow/ragflow/pull/15863)
- Completes Italian translation. [#15729](https://github.com/infiniflow/ragflow/pull/15729)

### Bug fixes

- The thinking mode of MiniMax models was not correctly enabled. [#15496](https://github.com/infiniflow/ragflow/pull/15496)
- Infinite loops were triggered when the thinking mode was enabled for Qwen3.5 and Qwen3.6 models. [#15101](https://github.com/infiniflow/ragflow/pull/15101)
- Streamed answers were being duplicated when using the OpenAI-compatible chat completions API endpoint. [#15286](https://github.com/infiniflow/ragflow/issues/15286)[#15443](https://github.com/infiniflow/ragflow/pull/15443)
- Serialization errors were caused during chat completions when invalid numeric scores like `NaN` (Not-a-Number) or `Inf` (Infinity) were passed to the JSON encoder. [#15245](https://github.com/infiniflow/ragflow/issues/15245)[#15266](https://github.com/infiniflow/ragflow/pull/15266)
- Chat completions using LiteLLM providers were failing because unrecognized internal configuration parameters were not being filtered out before reaching the external APIs. [#15427](https://github.com/infiniflow/ragflow/issues/15427)[#15432](https://github.com/infiniflow/ragflow/pull/15432)
- The OpenAI-compatible chat completions API was defaulting to streamed responses. [#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- Empty `AND` results were incorrectly dropped during metadata filtering. [#15477](https://github.com/infiniflow/ragflow/pull/15477)
- Repetitive page chrome, such as headers and footers, was incorrectly extracted as main text by the MinerU parser. [#15335](https://github.com/infiniflow/ragflow/issues/15335)[#15387](https://github.com/infiniflow/ragflow/pull/15387)
- English chart titles were missing during document extraction in the DeepDoc module. [#15481](https://github.com/infiniflow/ragflow/pull/15481)
- Empty outputs were returned by the TitleChunker for `json` and `chunks` upstream formats [#14247](https://github.com/infiniflow/ragflow/pull/14247)[#15396](https://github.com/infiniflow/ragflow/pull/15396)
- An error message was missing when a .tsv file upload attempt failed. [#15284](https://github.com/infiniflow/ragflow/pull/15284)
- API tokens missing beta values caused token retrieval errors. [#15405](https://github.com/infiniflow/ragflow/pull/15405)
- Caps the maximum page size to fix system crashes or slowdowns from large queries. [#15292](https://github.com/infiniflow/ragflow/pull/15292)
- Client errors were caused by the OpenAI-compatible chat completion API incorrectly defaulting to streamed responses. [#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- HTTP 500 internal server errors were triggered instead of standard 4xx client errors when users attempted to download missing files from the storage backend. [#15369](https://github.com/infiniflow/ragflow/issues/15369)[#15371](https://github.com/infiniflow/ragflow/pull/15371)
- GraphRAG entity ranking was broken. [#15795](https://github.com/infiniflow/ragflow/issues/15795)[#15797](https://github.com/infiniflow/ragflow/pull/15797)

## v0.25.6

Released on May 26, 2026.

### New features

- Agent: Adds a **Browser** component that enables AI to autonomously navigate and interact with web pages. [#14888](https://github.com/infiniflow/ragflow/pull/14888)

### Improvements

- RAG: Stabilizes RAPTOR's AHC mode (Ψ-RAG), which was introduced in v0.25.3 to resolve previous semantic loss by building individual document trees and then merging them hierarchically. This new approach significantly accelerates index construction and outperforms the legacy GMM mode in Recall@5 and average F1. Users retain the option to switch between the two modes. [#14674](https://github.com/infiniflow/ragflow/issues/14674)[#14679](https://github.com/infiniflow/ragflow/pull/14679)
- Agent: Introduces lightweight `@tool` decorator to streamline Python function registration process for chat models. [#15047](https://github.com/infiniflow/ragflow/pull/15047)
- Agent: Enables agent messages to display base64-encoded images. [#15212](https://github.com/infiniflow/ragflow/pull/15212)
- Agent: Exposes **Doc Generator** component's file metadata as discrete variables. [#15080](https://github.com/infiniflow/ragflow/pull/15080)
- Agent: Allows developers to pass `chat_template_kwargs` to agent chat completion endpoint. [#14182](https://github.com/infiniflow/ragflow/issues/14182)[#14542](https://github.com/infiniflow/ragflow/pull/14542) See also [Converse with agent](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent)

### Bug fixes

- Fixes `/chat/completions` to allow sending only latest message in API payload and removes requirement to transmit full conversation history. [#15197](https://github.com/infiniflow/ragflow/pull/15197) See also [Converse with chat assistant](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant).
- Weight assigned to vector similarity was not properly applied during the retrieval phase. [#15108](https://github.com/infiniflow/ragflow/pull/15108)
- Users were unable to save parser configurations on the dataset configuration page. [#15175](https://github.com/infiniflow/ragflow/issues/15175)[#15177](https://github.com/infiniflow/ragflow/pull/15177)
- Log text on a data source's details page was truncated. [#15056](https://github.com/infiniflow/ragflow/pull/15056)
- An unresponsive "Status" filter on the document list page prevented users from filtering or managing uploaded documents by their parsing status. [#15170](https://github.com/infiniflow/ragflow/issues/15170)[#15216](https://github.com/infiniflow/ragflow/pull/15216)
- Calling `GET /agents/<agent_id>/sessions/<session_id>` with a missing or invalid session ID caused a server error. [#14989](https://github.com/infiniflow/ragflow/issues/14989)[#15011](https://github.com/infiniflow/ragflow/pull/15011)
- RAG: RAPTOR construction process halted when using the [Infinity](https://github.com/infiniflow/infinity) document engine. [#14998](https://github.com/infiniflow/ragflow/pull/14998)
- The system failed to correctly parse structured content returned by Mistral reasoning models. [#14805](https://github.com/infiniflow/ragflow/pull/14805)
- The **Parser** component in an ingestion pipeline incorrectly retained raw HTML tags in its text output. [#14831](https://github.com/infiniflow/ragflow/issues/14831)[#14920](https://github.com/infiniflow/ragflow/pull/14920)
- The table parser incorrectly extracted or attached metadata during document processing. [#15127](https://github.com/infiniflow/ragflow/pull/15127)
- Asynchronous background tasks and nested event loops were not properly handled, causing backend instability. [#14755](https://github.com/infiniflow/ragflow/issues/14755)[#14761](https://github.com/infiniflow/ragflow/pull/14761)
- Prompt variables configured in the **Agent** component disappeared after being entered. [#15218](https://github.com/infiniflow/ragflow/pull/15218)

### i18n

- Fully translates the interface into French with the addition of roughly 1,400 localization keys. [#15192](https://github.com/infiniflow/ragflow/pull/15192)

## v0.25.5

Released on May 20, 2026.

### New features

- Introduces local and SSH provider options for sandbox environment settings within the admin interface, allowing administrators to configure execution environments without editing environment variables. [#15039](https://github.com/infiniflow/ragflow/pull/15039)

### Improvements

- Elasticsearch: Accelerates the retrieval process by removing unnecessary vector fetches during the main search phase, reducing latency by 50–100%. [#14970](https://github.com/infiniflow/ragflow/pull/14970)
- Pushes metadata filters down to the [Infinity](https://github.com/infiniflow/infinity) document engine, significantly improving retrieval performance. [#14974](https://github.com/infiniflow/ragflow/pull/14974)
- Introduces Redis-based caching for Text-to-Speech model outputs, eliminating redundant API calls for identical text to reduce latency and save provider quota. [#14851](https://github.com/infiniflow/ragflow/pull/14851)
- Reduces server startup time by 5-9 seconds and saves roughly 200MB of memory by replacing heavy module-level imports with lazy runtime loading. [#14973](https://github.com/infiniflow/ragflow/pull/14973)
- Optimizes the connector dashboard. [#14979](https://github.com/infiniflow/ragflow/pull/14979)
- Increases minimum supported Python version to 3.13. [#14767](https://github.com/infiniflow/ragflow/pull/14767)

### Bug fixes

- Atomic database updates: Wraps document and dataset chunk counter updates in atomic database transactions to prevent data drift. [#14866](https://github.com/infiniflow/ragflow/issues/14866)[#14867](https://github.com/infiniflow/ragflow/pull/14867)
- Data source: the GitHub data source connector was failing to sync any content by default. [#13975](https://github.com/infiniflow/ragflow/issues/13975)[#14062](https://github.com/infiniflow/ragflow/pull/14062)
- The Tongyi-Qianwen text embedding models were hitting the wrong API endpoints when configured with international or Chinese regional URLs. [#14784](https://github.com/infiniflow/ragflow/pull/14784)
- Agent: Fully aggregates message content, reference data, and structured outputs across all generated events to fix incomplete responses in the non-streaming `/api/v1/agentbots/<agent_id>/completions` endpoint. [#13384](https://github.com/infiniflow/ragflow/issues/13384)[#14848](https://github.com/infiniflow/ragflow/pull/14848)
- Prevents the **Retrieval** component's manual metadata filters from getting stuck on the first loop's value by making a temporary copy of the filter settings to preserve the original placeholder.[#12582](https://github.com/infiniflow/ragflow/issues/12582)[#14849](https://github.com/infiniflow/ragflow/pull/14849)
- Agent: Fixed MCP tool name duplication.[#14217](https://github.com/infiniflow/ragflow/pull/14217)
- Agent: top_k passing issues [#14760](https://github.com/infiniflow/ragflow/pull/14760)
- Chat file attachment loss. [#13993](https://github.com/infiniflow/ragflow/pull/13993)
- IMAP synchronization process crashed when multiple email addresses or quoted commas were detected in "From" header. [#14963](https://github.com/infiniflow/ragflow/issues/14963)[#14964](https://github.com/infiniflow/ragflow/issues/14964)[#15006](https://github.com/infiniflow/ragflow/pull/15006)
- Langfuse integration failed to track token consumption. [#9837](https://github.com/infiniflow/ragflow/issues/9837)[#13294](https://github.com/infiniflow/ragflow/pull/13294)
- Enhances the stability and fault tolerance of the reranking module by implementing network timeouts, crash-prevention safeguards, and specific provider bug fixes. [#14264](https://github.com/infiniflow/ragflow/pull/14264)
- Increases minimum supported Nginx to 1.31.0. [#14928](https://github.com/infiniflow/ragflow/issues/14928)[#15007](https://github.com/infiniflow/ragflow/pull/15007)

## v0.25.4

Released on May 14, 2026

### New features

- Introduces a generic RESTful API connector, enabling configurable data ingestion from niche or enterprise-specific platforms into RAGFlow. [#13545](https://github.com/infiniflow/ragflow/pull/13545)
- Agent: Implements tag management to help users categorize, filter, and sort their Agent apps. [#14799](https://github.com/infiniflow/ragflow/pull/14799)

### Improvements

- Adds widget customization and persistence, allowing users to tailor their chat interface and ensure their settings are retained across sessions. [#14603](https://github.com/infiniflow/ragflow/pull/14603)

### Model support

- Adds gpt-5.4-mini and gpt-5.4-nano to the OpenAI model list [#14908](https://github.com/infiniflow/ragflow/pull/14908)

### Bug fixes

- Corrects the API endpoint for downloading original files from a specified dataset. [#14910](https://github.com/infiniflow/ragflow/pull/14910) See also [Download document](https://ragflow.io/docs/references/http_api_reference.md#download-document).

## v0.25.3

Released on May 13, 2026.

### New features

- Enables assigning specific roles like content, metadata, and primary key, to table columns. [#13710](https://github.com/infiniflow/ragflow/pull/13710)

### Improvements

- S3 connector: Implements ETag-based incremental synchronization for S3 data sources, drastically reducing sync time and AWS egress costs for users with massive-volumn S3-based datasets. [#14628](https://github.com/infiniflow/ragflow/issues/14628)[#14677](https://github.com/infiniflow/ragflow/pull/14677)
- API refactoring and security
  - Continues the transition of web APIs to RESTful conventions, ensuring backward compatibility for all legacy endpoints.
  - Binds the `user_id` in `POST /api/v1/messages` to the authenticated JWT principal. [#14745](https://github.com/infiniflow/ragflow/pull/14745)
  - Secures the sandbox executor against dynamic and indirect code execution bypasses. [#14690](https://github.com/infiniflow/ragflow/pull/14690)
  - Enforces HTTP request timeouts across the LLM integration layer. [#14313](https://github.com/infiniflow/ragflow/pull/14313)
- Refactors thread pool lifecycle management in `file_service.py` and `task_executor.py` for more efficient, lightweight resource handling. [#14668](https://github.com/infiniflow/ragflow/pull/14668)
- Agent: Enables the **Code** component to output and display file-based attachments, such as charts and images, directly in the chat. [#14787](https://github.com/infiniflow/ragflow/pull/14787)
- Reduces ingestion server boot time. [#14894](https://github.com/infiniflow/ragflow/pull/14894)

### Bug fixes

- Images in multi-sheet Excel workbooks were not scoped by sheet, causing images to be incorrectly attributed across different worksheets. [#14120](https://github.com/infiniflow/ragflow/pull/14120)
- Agent: Splits the **Message** component output into distinct 'waiting' and 'message' states when nested inside an **Iteration** component alongside a **Wait** component. [#14839](https://github.com/infiniflow/ragflow/pull/14839)
- Agent: The **Iteration** component failed to correctly pass array elements to its child components due to a naming mismatch between the expected `IterationItem` alias and the runtime `item` variable. [#14146](https://github.com/infiniflow/ragflow/pull/14146)
- Agent: Template strings in tool-type components like **Email** and **Invoke** failed to interpolate; `{{variable}}` placeholders were passed through as raw text. [#14601](https://github.com/infiniflow/ragflow/pull/14601)
- Volcengine (Doubao/Ark) endpoints were not visible in the provider list. [#14702](https://github.com/infiniflow/ragflow/pull/14702)

## v0.25.2

Released on May 11, 2026.

### Improvements

- API refactoring and unification: Continues the transition of web APIs to RESTful conventions, ensuring backward compatibility for all legacy endpoints.

### Data source

- Introduces a lightweight snapshot mechanism for synchronizing deleted files across eight data sources—including Moodle, DingTalk AI Table, and RSS—ensuring a faithful reflection of all remote data sources. [#14362](https://github.com/infiniflow/ragflow/issues/14362)[#14499](https://github.com/infiniflow/ragflow/pull/14499)

### Bug fixes

- Metadata visibility issues during v0.24.0 to v0.25.0 upgrades.
- Duplicate chat output.
- Metadata filtering was handled in-memory instead of leveraging Elasticsearch, incurring performance bottlenecks. [#14576](https://github.com/infiniflow/ragflow/pull/14576)
