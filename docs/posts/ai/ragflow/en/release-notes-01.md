# Releases (Part 1)

Key features, improvements and bug fixes in the latest releases.

## v0.27.2

Released on Sep 10, 2026.

### New features
- Agentic RAG: Refactored the Agentic RAG retrieval framework, significantly improving reasoning speed and benchmark performance. ([#19046](https://github.com/infiniflow/ragflow/pull/19046), [#19112](https://github.com/infiniflow/ragflow/pull/19112), [#19172](https://github.com/infiniflow/ragflow/pull/19172), [#19209](https://github.com/infiniflow/ragflow/pull/19209), [#19424](https://github.com/infiniflow/ragflow/pull/19424), [#19459](https://github.com/infiniflow/ragflow/pull/19459))
- Knowledge compilation runtime settings ([#19254](https://github.com/infiniflow/ragflow/pull/19254))
- Enforce a rate limit on the knowledge compilation pipeline ([#19156](https://github.com/infiniflow/ragflow/pull/19156))
- Knowledge graph shows total and current node counts ([#19142](https://github.com/infiniflow/ragflow/pull/19142),[#19095](https://github.com/infiniflow/ragflow/pull/19095), [#19114](https://github.com/infiniflow/ragflow/pull/19114))
- Graph search highlights the node when pressing Enter on an entity name ([#19320](https://github.com/infiniflow/ragflow/pull/19320))
- New Sitemap data source for sitemap.xml-based web ingestion ([#19344](https://github.com/infiniflow/ragflow/pull/19344))
- WebDAV connector supports custom CA certificates ([#16901](https://github.com/infiniflow/ragflow/pull/16901))
- MonkeyOCRv2 parsing support ([#18887](https://github.com/infiniflow/ragflow/pull/18887))
- Self-hosted PaddleOCR-VL deployment support ([#19011](https://github.com/infiniflow/ragflow/pull/19011))
- New Sofya search tool for agent ([#19323](https://github.com/infiniflow/ragflow/pull/19323))
- EPUB document preview ([#19242](https://github.com/infiniflow/ragflow/pull/19242))
- Excel citation sources located in document preview ([#18853](https://github.com/infiniflow/ragflow/pull/18853))

### Model Support
- New Hubris model provider ([#19341](https://github.com/infiniflow/ragflow/pull/19341))
- New llmman model provider ([#19030](https://github.com/infiniflow/ragflow/pull/19030))

### Improvements
- New RERANK_TOKEN_LIMIT_MODE configuration ([#19404](https://github.com/infiniflow/ragflow/pull/19404))
- Highlight in retrieval testing and search ([#18981](https://github.com/infiniflow/ragflow/pull/18981))
- Similarity threshold displayed as a percentage ([#18974](https://github.com/infiniflow/ragflow/pull/18974))

### UI/UX
- Completed Turkish locale ([#19009](https://github.com/infiniflow/ragflow/pull/19009))
- Search match highlighting in Team settings tables ([#15985](https://github.com/infiniflow/ragflow/pull/15985))

### Bug fixes
- Fixed images uploaded in chat being ignored by vision models ([#18884](https://github.com/infiniflow/ragflow/pull/18884))
- Fixed non-UTF-8 encodings in CSV/TXT preview and document decoding ([#19222](https://github.com/infiniflow/ragflow/pull/19222), [#19253](https://github.com/infiniflow/ragflow/pull/19253))

## v0.27.1

Released on Aug 28, 2026.

### New features
- New Azure DevOps connector for data sources ([#18715](https://github.com/infiniflow/ragflow/pull/18715))
- New You.com web search provider for chat and agent ([#18478](https://github.com/infiniflow/ragflow/pull/18478))
- New Serply web search provider for chat ([#18475](https://github.com/infiniflow/ragflow/pull/18475))

### Model Support
- New Synthorai model provider ([#18830](https://github.com/infiniflow/ragflow/pull/18830))
- Missing DeepSeek models added ([#18678](https://github.com/infiniflow/ragflow/pull/18678))
- AWS Bedrock API key authentication support ([#18301](https://github.com/infiniflow/ragflow/pull/18301))

### Improvements
- Retrieval API exposes rerank_candidates_count, knn top_k, and num_candidates ([#18768](https://github.com/infiniflow/ragflow/pull/18768), [#18737](https://github.com/infiniflow/ragflow/pull/18737))
- Metadata filters pushed down to the metadata index for faster retrieval ([#18219](https://github.com/infiniflow/ragflow/pull/18219))
- Chat settings form auto-scrolls to the error location on save ([#18811](https://github.com/infiniflow/ragflow/pull/18811))
- Search page validates deleted knowledge bases ([#18522](https://github.com/infiniflow/ragflow/pull/18522))

### Bug fixes
- Fixed PDF parsing failure in chat ([#18860](https://github.com/infiniflow/ragflow/pull/18860))
- Fixed wiki compilation accepting LLM error responses ([#18857](https://github.com/infiniflow/ragflow/pull/18857))
- Fixed MinerU rendering stability, error visibility, and code block parsing ([#18617](https://github.com/infiniflow/ragflow/pull/18617))
- Fixed 0-chunk datasets not showing, preventing scrolling to fetch more datasets ([#18810](https://github.com/infiniflow/ragflow/pull/18810))
- Fixed QA Excel parser dropping rows whose answer is zero ([#17902](https://github.com/infiniflow/ragflow/pull/17902))
- Fixed naive parser treating an empty upload as a missing binary ([#18826](https://github.com/infiniflow/ragflow/pull/18826))
- Fixed encoding detection discarding confident detection results ([#15793](https://github.com/infiniflow/ragflow/pull/15793))
- Fixed reasoning-enabled chat ignoring the dialog system prompt ([#18842](https://github.com/infiniflow/ragflow/pull/18842))
- Fixed knowledge compilation using the default tenant LLM instead of the pipeline LLM ([#18572](https://github.com/infiniflow/ragflow/pull/18572))
- Fixed chat network search service not allowed to be null ([#18791](https://github.com/infiniflow/ragflow/pull/18791))
- Fixed Firefox chat auto-scroll not pinned to the bottom ([#18736](https://github.com/infiniflow/ragflow/pull/18736))
- Fixed chat auto-scroll not following streamed answers ([#18570](https://github.com/infiniflow/ragflow/pull/18570))
- Fixed parsing progress not visible after selecting upload ([#18741](https://github.com/infiniflow/ragflow/pull/18741))
- Fixed BigQuery connector constructing SQL queries incorrectly ([#17500](https://github.com/infiniflow/ragflow/pull/17500))
- Fixed WebDAV listing errors not propagated, causing prune data loss ([#18694](https://github.com/infiniflow/ragflow/pull/18694))
- Fixed cross-KB document ID collision in data source sync ([#18244](https://github.com/infiniflow/ragflow/pull/18244))
- Fixed GPUStack model discovery and audio support ([#18599](https://github.com/infiniflow/ragflow/pull/18599))
- Fixed Kimi K3 temperature ([#18564](https://github.com/infiniflow/ragflow/pull/18564))
- Fixed OCR text lost when no image2text model is configured ([#18012](https://github.com/infiniflow/ragflow/pull/18012))
- Fixed hierarchical Wiki topic navigation ([#18721](https://github.com/infiniflow/ragflow/pull/18721))

## v0.27.0

Released on Aug 19, 2026.

### New features
- Brand new document level and dataset level knowledge compilation, supporting Wiki, Graph, Tree, Page Index, Mind Map, Timeline, and To Skills ([#16777](https://github.com/infiniflow/ragflow/pull/16777), [#17546](https://github.com/infiniflow/ragflow/pull/17546), [#16797](https://github.com/infiniflow/ragflow/pull/16797), [#16749](https://github.com/infiniflow/ragflow/pull/16749), [#16899](https://github.com/infiniflow/ragflow/pull/16899), [#17996](https://github.com/infiniflow/ragflow/pull/17996))
   - The previous GraphRAG and RAPTOR features have been deprecated and are no longer available in the UI. Their replacements, Graph and Tree, are now integrated into Knowledge Compilation. Previously generated GraphRAG and RAPTOR content remains searchable.
- Brand new Agentic RAG with four thinking modes when answering - Low, Medium, High, and Ultra ([#18303](https://github.com/infiniflow/ragflow/pull/18303), [#18138](https://github.com/infiniflow/ragflow/pull/18138), [#17342](https://github.com/infiniflow/ragflow/pull/17342), [#17444](https://github.com/infiniflow/ragflow/pull/17444))

### Improvements
- Fully revamped model provider system for easier model configuration and management ([#16604](https://github.com/infiniflow/ragflow/pull/16604))

### Model Support
- Qwen 3.8 series ([#18368](https://github.com/infiniflow/ragflow/pull/18368))
- Kimi K3 ([#17106](https://github.com/infiniflow/ragflow/pull/17106))
- AIMLAPI ([#17311](https://github.com/infiniflow/ragflow/pull/17311))
- GreenPT models ([#17447](https://github.com/infiniflow/ragflow/pull/17447))
- AWS Bedrock Reranker ([#16960](https://github.com/infiniflow/ragflow/pull/16960))
- OpenRouter Embedding ([#17213](https://github.com/infiniflow/ragflow/pull/17213))
- FunASR/SenseVoice STT ([#16473](https://github.com/infiniflow/ragflow/pull/16473))
- Fun-ASR-Flash support for Tongyi-Qianwen ([#16844](https://github.com/infiniflow/ragflow/pull/16844))
- Mistral OCR document parser ([#17057](https://github.com/infiniflow/ragflow/pull/17057))

### Infrastructure
- New GaussDB database adapter ([#17703](https://github.com/infiniflow/ragflow/pull/17703))
- SereneDB document storage engine support ([#17375](https://github.com/infiniflow/ragflow/pull/17375))
- Tenki sandbox provider support ([#17305](https://github.com/infiniflow/ragflow/pull/17305))
- Upgraded Infinity integration to 0.7.3 ([#18137](https://github.com/infiniflow/ragflow/pull/18137))

### Tools
- New Querit web search tool ([#17813](https://github.com/infiniflow/ragflow/pull/17813))

### UI/UX
- Markdown typography improvements ([#16752](https://github.com/infiniflow/ragflow/pull/16752))
- Search/chat filters ([#16707](https://github.com/infiniflow/ragflow/pull/16707))

### Bug fixes
- Fixed server hang when parsing large files ([#17936](https://github.com/infiniflow/ragflow/pull/17936))
- Fixed document upload hanging the whole service ([#17537](https://github.com/infiniflow/ragflow/pull/17537))
- Fixed multi-model chat ignoring the passed model ([#18439](https://github.com/infiniflow/ragflow/pull/18439))
- Fixed rerank model switch failing to save on the chat page ([#18357](https://github.com/infiniflow/ragflow/pull/18357))
- Fixed preview failure for PDFs with Chinese filenames ([#18422](https://github.com/infiniflow/ragflow/pull/18422))
- Fixed CID-font PDF preview ([#18249](https://github.com/infiniflow/ragflow/pull/18249))
- Fixed invalid query strings breaking search ([#18217](https://github.com/infiniflow/ragflow/pull/18217))
- Fixed dataset/document deletion blocking other API requests ([#17800](https://github.com/infiniflow/ragflow/pull/17800))
- Fixed default delimiter stored as an escaped string instead of a real newline ([#17591](https://github.com/infiniflow/ragflow/pull/17591))
- Fixed shared page language affecting the original website ([#18043](https://github.com/infiniflow/ragflow/pull/18043))
- Fixed stale messages on session switch ([#18140](https://github.com/infiniflow/ragflow/pull/18140))
- Fixed new sessions carrying over previous session messages ([#18078](https://github.com/infiniflow/ragflow/pull/18078))
- Fixed SSE stream interruption when switching conversations ([#18037](https://github.com/infiniflow/ragflow/pull/18037))
- Fixed overlapping Chinese text lines in DOCX preview ([#17693](https://github.com/infiniflow/ragflow/pull/17693))
- Fixed admin password update crash for SSO users ([#16914](https://github.com/infiniflow/ragflow/pull/16914))
- Fixed QA DOCX table parser dropping cells ([#17497](https://github.com/infiniflow/ragflow/pull/17497))
- Fixed Q&A CSV parsing of fields starting with quotes ([#16881](https://github.com/infiniflow/ragflow/pull/16881))
- Fixed tag CSV parser ignoring TAB delimiters ([#17496](https://github.com/infiniflow/ragflow/pull/17496))
- Fixed incorrect task time display ([#18453](https://github.com/infiniflow/ragflow/pull/18453))
- Fixed duplicate logs on PDF parse cancel ([#18435](https://github.com/infiniflow/ragflow/pull/18435))

## v0.26.4

Released on July 7, 2026.

### New features

- NLP/Tokenization: Adds a language-aware Snowball stemmer supporting 16 languages, integrates the dataset `language` parameter across the tokenization pipeline, and adds Dutch to the frontend. [#14140](https://github.com/infiniflow/ragflow/pull/14140)

### Bug fixes

- The system crashed with a `ValueError` when parsing LM-Studio model names containing an '@' symbol. [#16467](https://github.com/infiniflow/ragflow/pull/16467)
- The MCP server crashed because the list_chats function expected a list from the `/chats` API but received a paginated dictionary instead. [#16639](https://github.com/infiniflow/ragflow/pull/16639)
- The Docling parser silently dropped mathematical formulas from documents instead of extracting them. [#16645](https://github.com/infiniflow/ragflow/pull/16645)
- The system failed to persist inline edits made to metadata values to the backend. [#16655](https://github.com/infiniflow/ragflow/pull/16655)
- The system removed existing links when bulk-linking files to datasets. [#16587](https://github.com/infiniflow/ragflow/pull/16587)
- The filter failed to use Chinese. [#16673](https://github.com/infiniflow/ragflow/pull/16673)
- The system failed to enforce that tag weights must be greater than zero. [#16657](https://github.com/infiniflow/ragflow/pull/16657)
- The layout of the agent prompt dropdown menu rendered incorrectly. [#16653](https://github.com/infiniflow/ragflow/pull/16653)
- The Laws chunker incorrectly classified dotted-number cross-references as headings. [#16626](https://github.com/infiniflow/ragflow/pull/16626)
- The system failed to prevent users from saving duplicate MCP server names during the editing process. [#16588](https://github.com/infiniflow/ragflow/pull/16588)
- The system allowed users to export an empty MCP server selection. [#16589](https://github.com/infiniflow/ragflow/pull/16589)

## v0.26.3

Released on July 2, 2026.

### New features

- Data source connector: Introduces Google BigQuery as a data source connector for document ingestion and incremental syncing. [#15871](https://github.com/infiniflow/ragflow/pull/15871)
- MCP: Adds two MCP tools `ragflow_list_datasets` and `ragflow_list_chats` to the RAGFlow MCP server. [#15384](https://github.com/infiniflow/ragflow/pull/15384)
- File ingestion
  - Integrates the layout-aware SoMark OCR parser into the system for extracting and indexing complex document elements like tables and figures. [#16482](https://github.com/infiniflow/ragflow/pull/16482)
  - API: Exposes the [Ingest documents](https://ragflow.io/docs/references/http_api_reference.md#ingest-documents) endpoint for processing documents using a customized pipeline. [#16395](https://github.com/infiniflow/ragflow/pull/16395)

### Improvements

- Backend: Introduces partial success handling for batch document uploads, ensuring that a single failed file no longer causes the entire batch to be discarded. [#16438](https://github.com/infiniflow/ragflow/pull/16438)
- UI/UX: Refactors the global header to dynamically switch between a full desktop navigation bar and a mobile-friendly side drawer based on available screen space, resolving overlapping issues and significantly improving the mobile user experience. [#15984](https://github.com/infiniflow/ragflow/pull/15984)

### Bug fixes

- After setting up the Ollama provider, the system returned the error: 'Failed to access model(name) using this api key'. [#16519](https://github.com/infiniflow/ragflow/pull/16519)
- Deleting a user/assistant chat message pair mistakenly removed the previous conversation turn's reference due to an index misalignment. [#16436](https://github.com/infiniflow/ragflow/pull/16436)

## v0.26.2

Released on June 29, 2026.

### New features

- Chat channels:
  - Integrates WhatsApp via a QR code scan. [#16238](https://github.com/infiniflow/ragflow/pull/16238)
  - Integrates DingTalk via bot API credentials. [#16183](https://github.com/infiniflow/ragflow/pull/16183)
  - Integrates WeCom via WebSocket connection. [#16175](https://github.com/infiniflow/ragflow/pull/16175)
- File parsing: Adds fallback logic for PP-OCRv6 and similar text recognition models, and integrates image parsing within the PaddleOCR pipeline. [#16150](https://github.com/infiniflow/ragflow/pull/16150)

### Improvements

- Datasets
  - Adds an edge-case check to the file ingestion logic to safely link empty folders to a dataset. [#16296](https://github.com/infiniflow/ragflow/pull/16296)
  - Adds pagination to the `get_flatted_meta_by_kbs()` method to prevent CRUD failures relating to datasets with more than 10,000 documents. [#16095](https://github.com/infiniflow/ragflow/pull/16095)
- Chat channels: Ensures end-user conversation histories persist across restarts but still separate when a channel is bound to a new dialog. [#16274](https://github.com/infiniflow/ragflow/pull/16274)

### i18n

- Expands i18n coverage and refines translations for the Korean UI. [#16203](https://github.com/infiniflow/ragflow/pull/16203)；
- Adds missing French translations for chat channels, username validation, and model editing. [#16217](https://github.com/infiniflow/ragflow/pull/16217)

### Bug fixes

- File parsing:
  - A `ValueError` was raised during `.docx` parsing on 'Heading' styles. [#16284](https://github.com/infiniflow/ragflow/pull/16284)
  - Tables in `.docx` files were silently removed by the laws document parser. [#16155](https://github.com/infiniflow/ragflow/pull/16155)
  - Lone Markdown headers were separated from their subsequent sections when a DeepDoc delimiter was set. [#16109](https://github.com/infiniflow/ragflow/pull/16109)
  - Markdown tables appeared twice in chunk results, once as a standalone chunk and again within a regular text chunk. [#16143](https://github.com/infiniflow/ragflow/pull/16143)
- MCP
  - The MCP server hung indefinitely when encountering empty document pages; the final page of documents was silently dropped due to flawed pagination. [#16285](https://github.com/infiniflow/ragflow/pull/16285)
  - The MCP connection and dataset discovery process failed because the server's hardcoded fetch limit exceeded the introduced `page_size` restriction. [#16148](https://github.com/infiniflow/ragflow/pull/16148)
- Dataflow
  - Restores the dataflow rerun endpoint and ensures the ingestion response includes the DSL payload to reliably render the timeline and parser views. [#16292](https://github.com/infiniflow/ragflow/pull/16292)
  - Restores dataflow parser defaults and returns the actual SSE payload, ensuring pipeline runs correctly surface message IDs and log updates. [#16290](https://github.com/infiniflow/ragflow/pull/16290)
- LLM: Failed to use the new `gemini-3.5-flash` model via the Google Cloud (Vertex AI) provider using `eu` or `us` region endpoint. This is resolved by explicitly routing multi-region requests to the required `aiplatform.<region>.rep.googleapis.com` domains instead of the synthesized `<region>-aiplatform.googleapis.com` hosts. [#15990](https://github.com/infiniflow/ragflow/pull/15990)
- UI/UX: The metadata add modal sent empty values to the backend. [#15229](https://github.com/infiniflow/ragflow/pull/15229)
