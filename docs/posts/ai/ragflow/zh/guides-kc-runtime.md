# 知识编译运行时配置

知识编译（Knowledge Compilation）的运行时参数可通过环境变量配置。在 Docker 部署中，可在 `docker/.env` 中设置这些变量，并重启 RAGFlow 服务使其生效。

下表中的值为默认值。如果未设置某个环境变量，将使用其默认值；无效值会被替换为默认值；低于配置下限或高于配置上限的值会被钳制（clamp）到有效范围内并记录日志。

## Wiki 配置

| 环境变量 | 默认值 | 说明 |
| --- | ---: | --- |
| `WIKI_MAP_LLM_POOL_SIZE` | `20` | Wiki 任务共享 LLM 池允许的最大并发 LLM 调用数。 |
| `WIKI_MAP_MAX_PENDING` | `25` | Wiki LLM 池允许的活跃与等待中调用总数上限。实际生效值不会低于 `WIKI_MAP_LLM_POOL_SIZE`。 |
| `WIKI_REFINE_WORKERS` | `4` | 页面精炼 worker 的数量。实际 LLM 并发仍受共享池限制。 |
| `WIKI_MAP_WORKERS` | `20` | 直接 Wiki MAP 调用使用的默认 worker 数。 |
| `WIKI_MAP_TIMEOUT` | `600` 秒 | 单次 Wiki MAP 提取调用的超时时间。 |
| `WIKI_PLAN_TIMEOUT` | `600` 秒 | Wiki PLAN 调用（包括页面规划与 MAYBE 解析）的超时时间。 |
| `WIKI_REFINE_TIMEOUT` | `300` 秒 | 单次 Wiki 页面写入调用的超时时间。 |
| `WIKI_MERGE_TIMEOUT` | `600` 秒 | 将已有 Wiki 页面与新生成内容合并的超时时间。 |

`WIKI_MAP_LLM_POOL_SIZE` 是该任务的并发硬上限。触发限流后，池会降低某个模型的有效并发，因此设置该值并不能强制每个提供商都接收那么多并发请求。

## 结构编译配置

| 环境变量 | 默认值 | 说明 |
| --- | ---: | --- |
| `DOC_STRUCTURE_LLM_POOL_SIZE` | `20` | 单个文档结构编译（Structure Compile）任务允许的最大并发 LLM 调用数。 |
| `DOC_STRUCTURE_COMPILE_MAX_IN_FLIGHT` | `15` | 同时进行中的结构批处理/模板操作数量上限。 |
| `DOC_STRUCTURE_COMPILE_BATCH_CHUNKS` | `4` | 传入单个外层结构编译批处理的源分块数量。 |
| `STRUCTURE_CONTEXT_FRACTION` | `0.5` | 打包结构批处理时使用的模型上下文窗口占比，钳制到 `(0, 1]`。 |
| `STRUCTURE_DEFAULT_CONTEXT` | `100000` token | 模型未提供上下文大小时使用的回退上下文大小。 |
| `KNOWLEDGE_GRAPH_CONTEXT_FRACTION` | `0.1` | 知识图谱批处理使用的模型上下文窗口占比，钳制到 `(0, 1]`。 |
| `KNOWLEDGE_GRAPH_MIN_BATCH_TOKENS` | `2048` token | 知识图谱批处理的最小规模。 |
| `KNOWLEDGE_GRAPH_MAX_BATCH_TOKENS` | `4096` token | 知识图谱批处理的最大规模。实际生效值不会低于 `KNOWLEDGE_GRAPH_MIN_BATCH_TOKENS`。 |
| `STRUCTURE_CHAIN_CORRECTION_TIMEOUT_S` | `120` 秒 | 结构编译链式修正（chain-correction）LLM 步骤的时间限制。 |

常规的结构编译实体/关系提取路径没有独立的应用层超时。其请求超时由所配置的 LLM 提供商/客户端决定。

## LLM 池限流处理

以下变量作用于共享的自适应 LLM 池：

| 环境变量 | 默认值 | 说明 |
| --- | ---: | --- |
| `LLM_POOL_RATE_LIMIT_RETRIES` | `3` | 收到限流响应后的重试次数。 |
| `LLM_POOL_RATE_LIMIT_RETRY_BASE_DELAY` | `1.0` 秒 | 指数退避的初始延迟。 |
| `LLM_POOL_RATE_LIMIT_RETRY_MAX_DELAY` | `30.0` 秒 | 限流重试之间的最大延迟。 |

收到限流响应后，池会降低受影响模型的有效并发并重试请求。调用成功后，该模型的并发会逐步恢复，直至达到配置的池上限。

池会将 `max_pending` 归一化为不小于配置的池大小，并将重试最大延迟归一化为不小于重试基础延迟。

所有重试耗尽后，后端会在服务日志中记录详细的失败信息，而前端任务日志只会收到阶段、上下文和错误类型。提供商的响应体不会转发到前端。

## 示例

以下配置为请求配额较小的提供商降低并发，并缩短 Wiki MAP 超时时间：

```dotenv
WIKI_MAP_LLM_POOL_SIZE=8
WIKI_MAP_MAX_PENDING=10
DOC_STRUCTURE_LLM_POOL_SIZE=8
LLM_POOL_RATE_LIMIT_RETRIES=5
WIKI_MAP_TIMEOUT=300
```

修改 `docker/.env` 后请重启 RAGFlow 后端。这些设置在 Python 模块加载时读取，已在运行的任务不会被更改。
