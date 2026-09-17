# 应用知识编译模板

## 配置摄取管道

创建模板后，需要在摄取管道（Ingestion Pipeline）中引用该模板。

配置步骤：

1. 创建或打开一个摄取管道。
2. 添加并连接解析器（Parser）、分块器（Chunker）、编译器（Compiler）和索引器（Indexer）。
3. 打开 CompilerOperator，从模板列表中选择目标 CompilationTemplate。
4. 检查节点连接和必填参数，然后保存管道。

![用 CompilerOperator 配置摄取管道](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/apply-knowledge-compilation-template-configure-ingestion-pipeline.png)

说明：CompilationTemplate 只定义「如何编译」。只有当模板在 CompilerOperator 中被引用、且文档实际执行了该管道之后，才会生成 KnowledgeArtifact。

## 在数据集中应用管道

1. 进入数据集页面，创建或打开一个数据集。
2. 上传要处理的文档。
3. 在文件列表中选择 Configure Ingestion Pipeline（配置摄取管道）。
4. 选择包含 CompilerOperator 的摄取管道。
5. 启动解析，并在任务日志中检查解析器、分块器、编译器和索引器是否依次完成。

![创建数据集并选择管道](/ragflow-images/connect_the_pipeline_to_a_knowledge_base_1.jpg)

![在数据集中配置摄取管道](/ragflow-images/connect_the_pipeline_to_a_knowledge_base_2.jpg)

如果修改了 CompilationTemplate，已完成的文档不会自动重新编译。需要按照产品当前提供的操作重新解析或重新运行管道，新配置才能生效。

## 查看知识工件

知识编译（Knowledge Compilation）完成后，进入对应的知识库，在左侧栏选择 **Artifacts**（知识工件）。在 Artifacts 页面右上角的下拉列表中选择要查看的工件类型，如 **Wiki**、**To Skills**、**Tree/Page index**、**Graph**、**Mind map** 或 **Timeline**，即可查看相应的生成结果。

按生成范围，知识工件可分为文档级和知识库级两类：

- **文档级知识工件**：Graph、Tree、PageIndex、MindMap 和 Timeline 可生成相应的文档级结果。在文件列表中点击文件名，即可查看该文件的知识工件。
- **知识库级知识工件**：部分知识工件支持基于知识库中的文档进一步生成知识库级结果。执行知识库级生成任务后，即可在 Artifacts 中查看生成的结果。Wiki 以知识库级工件的形式生成：相关文档完成知识编译后，需要进入知识库的 Artifacts 页面并点击生成，系统随后会基于当前知识库中的编译结果生成 Wiki。

![从知识工件生成 Wiki](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/apply-knowledge-compilation-template-view-knowledge-artifacts.png)

执行知识库级知识工件生成任务时，系统会生成相应的知识库级日志。可通过日志查看任务执行状态及相关运行时信息。当生成任务失败或结果异常时，可结合日志信息进行排查。

## 将知识工件转换为技能（To Skills）

查看知识工件后，可以使用 **To Skills**（转为技能）功能，将工件进一步整理并转换为可复用的**技能（Skills）**，供 Agent 使用。

**步骤：**

- 进入知识库的 **Artifacts** 页面，打开要转换的知识工件。
- 在页面右上角的下拉菜单中选择 **To Skills**。
- 系统会从当前知识工件中提取并整理相关内容，生成相应的**技能**。
- 生成完成后，生成的技能会显示在 **Skills** 列表中。点击某个技能，即可在右侧查看其详情。

生成的技能通常包含名称、描述，以及从知识工件中提取并整理的规则、方法或指令，可供 Agent 在执行相关任务时使用。

> **注意**
>
> **To Skills** 不会修改原始知识工件，而是基于现有知识工件生成可复用的技能。

## 知识工件检查

知识工件生成后，请根据所使用的模板检查生成结果，确认内容和结构是否符合预期。

针对不同类型的知识工件，重点检查以下方面：

| 类型 | 检查重点 |
| --- | --- |
| Graph | 实体是否重复；关系方向是否正确；是否存在不受支持的节点或边。 |
| Tree | 层级是否清晰；同层节点的抽象程度是否相近；摘要是否准确。 |
| PageIndex | 章节层级是否保留；事实和结论是否来自对应章节。 |
| MindMap | 中心主题是否清晰；分支是否重复或交叉；节点命名是否简洁。 |
| Timeline | 时间是否准确；事件顺序是否正确；相对时间是否被误读。 |
| Wiki | 页面主题是否合理；页面间链接是否有效；事实是否与来源一致。 |

## 更新知识工件

知识工件生成后，系统会持续检测知识库中的文档变化。当知识库新增或删除文档时，相应的知识工件不会自动重新生成，而是显示更新提示，提醒用户同步最新的知识库内容。

检测到文档变化时，知识工件页面左上角会出现**更新（Update）**按钮，按钮旁会显示待更新文档的数量。

![更新知识工件提示](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/apply-knowledge-compilation-template-update-knowledge-artifacts.png)

将鼠标悬停在更新提示区域，可查看具体的文档变化：

- **新增文档**：知识工件生成后上传到知识库、且尚未纳入当前知识工件的文档。
- **移除文档**：知识工件生成后从知识库删除、但其相关内容尚未从当前知识工件中同步移除的文档。
- **数量指示**：指示当前检测到的待更新文档数量。

确认需要同步后，点击**更新**。系统会根据知识库当前的文档变化更新知识工件，使其与知识库中的最新文档保持一致。

说明：仅上传或删除知识库文档不会立即更新已有的知识工件。更新提示出现后，需要手动点击**更新**才能完成同步。
