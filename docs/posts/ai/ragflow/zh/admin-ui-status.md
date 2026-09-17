# 查看系统状态

## 检查服务是否正常运行

进入管理后台（Admin UI）后，打开 **Service status** 页面，即可查看 RAGFlow 及其依赖服务的运行状态。页面会展示每个服务的名称、服务类型、主机、端口和当前状态，方便管理员确认系统各组件是否正常运行。

![检查服务是否正常](/ragflow-images/check_whether_services_are_normal.jpg)

当 **Status** 为 `Alive` 时，服务运行正常；出现其他状态时，可能影响对应功能。

![系统状态](/ragflow-images/system_status.jpg)

| 服务名称 | 主要用途 | 异常时可能出现的问题 | 受影响的功能 |
| --- | --- | --- | --- |
| RAGFlow Server | 核心系统服务，负责 Web UI、API、知识库、问答等业务功能。 | 系统无法访问、登录失败、页面报错，或所有功能不可用。 | 登录、知识库管理、知识应用、Agent、模型管理、系统管理及所有其他功能。 |
| MySQL | 存储用户、知识库、模型配置、系统配置等业务数据。 | 登录失败、知识库数据无法读取、配置无法保存，或业务数据异常。 | 用户管理、知识库管理、模型配置、系统配置以及业务数据读写。 |
| MinIO | 存储上传的文档、图片等对象文件。 | 文件上传失败、文档无法打开、解析失败，或图片无法显示。 | 文件上传、文档管理、文档解析、文件预览与下载。 |
| Elasticsearch | 构建全文索引与向量索引，提供知识检索能力。 | 文档无法检索、搜索不返回结果、问答无法引用知识，或知识召回异常。 | 全文检索、向量检索、混合检索、知识问答与知识引用。 |
| Redis (Valkey) | 提供缓存与任务状态管理，提升系统运行效率。 | 页面响应缓慢、会话异常，或部分功能运行异常。 | 系统缓存、会话管理、任务状态管理及部分后台功能。 |
| RabbitMQ | 管理各类后台异步任务，并把任务分发给执行器。 | 文档一直停留在 `Waiting for processing` 状态，或后台任务无法启动。 | 文档解析、知识编译、Embedding、索引构建等异步任务调度。 |
| Task Executor | 执行文档解析、OCR、Embedding、索引构建等后台任务。 | 文档一直停留在 `Parsing` 状态、知识无法导入，或索引无法构建。 | OCR、文档解析、Embedding、知识导入、索引构建等后台处理任务。 |

## 查看服务详情

在 **Service status** 页面上，管理员可以查看服务的 `ID`、`Name`、`Service type`、`Host`、`Port` 和 `Status`。当 `Status` 为 `Alive` 时，表示该服务当前存活。

管理员可以从 **Actions** 打开服务详情。不同服务展示的详情各不相同。例如，`mysql` 服务的详情会显示当前的数据库连接与进程信息，包括 `command`、`db`、`host`、`id`、`info`、`state`、`time` 和 `user`。管理员可以据此判断是否存在长时间运行的连接、等待状态或异常查询。

![查看服务详情](/ragflow-images/view_service_details_1.jpg)

![查看服务详情](/ragflow-images/view_service_details_2.jpg)

部分服务还会提供 **Extra information** 对话框，展示补充的配置信息。例如，对象存储服务可能会显示 `store_type`、`user` 等信息。这些信息主要用于确认服务配置。

![查看服务详情](/ragflow-images/view_service_details_3.jpg)

![查看服务详情](/ragflow-images/view_service_details_4.jpg)

如果某个服务的 `Status` 不是 `Alive`，请先记录该服务的 `ID`、`Name`、`Service type`、`Host`、`Port`，以及详情对话框或 **Extra information** 中可见的异常信息。

管理后台主要用于查看服务状态，并不提供针对容器、进程、网络或日志的直接排障入口。如需进一步处理，请检查相应的部署环境，包括服务运行状态、端口连通性、服务日志及相关配置。定位原因后，再按照运维流程重启服务、调整配置或执行其他恢复操作。
