#!/usr/bin/env python3
"""
RAGFlow 双语文档清单（单一事实源）

作用：全管线的文档清单只有这一份，其他环节全部从这里派生——
- fetch-originals.py 按它抓取 GitHub 上的官方文档源码
- gen-manifest.py 按它生成 docs/.vitepress/theme/ragflow-docs-manifest.ts
- convert-links.py 按它把文章里的官方外链改写成 <RagflowDocLink>

清单与官方文档站（https://ragflow.io/docs/，源码仓库 infiniflow/ragflow-docs
的 main 分支，v0.27.x 时期快照，抓取日期 2026-09-16）对齐：
- 巨页按 H2 切分：http_api_reference.md（231KB）→ 11 份、python_api_reference.md
  （73KB）→ 4 份、release_notes.md（79KB 更新日志）→ 约 4 份——
  精翻与浮层单页渲染都扛不住整页巨文件

条目顺序 = 文章编号顺序 = 浮层「上一篇/下一篇」顺序。
"""

# 文档源码仓库（raw 直链基座）：main 分支 + 文档目录前缀
RAW_BASE = "https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/website/docs/"
# 官方文档站基座（sourceUrl 用）
SITE_BASE = "https://ragflow.io/docs/"

# 普通条目：(slug, 仓库内路径(website/docs/ 相对), 分组, 中文标题, 英文标题)
# slug 全部带板块前缀，保证全库唯一（官方有 4 个 faq.md、3 个 index.md 重名）
ENTRIES = [
    # —— 快速开始 ——
    ("quickstart", "quickstart.mdx", "快速开始", "快速开始", "Quickstart"),
    # —— 基础概念 ——
    ("basics-rag", "basics/rag.md", "基础概念", "RAG 是什么？", "What Is Retrieval-Augmented Generation (RAG)?"),
    ("basics-agent-context-engine", "basics/agent_context_engine.md", "基础概念", "Agent 上下文引擎是什么？", "What Is Agent Context Engine?"),
    # —— 指南 · 数据集 ——
    ("guides-dataset-overview", "guides/dataset/dataset_overview.md", "指南 · 数据集", "数据集概览", "Dataset Overview"),
    ("guides-dataset-list-creation", "guides/dataset/dataset_list_and_creation.md", "指南 · 数据集", "数据集列表与创建", "Dataset List and Creation"),
    ("guides-dataset-configuration", "guides/dataset/configuration.md", "指南 · 数据集", "数据集配置", "Dataset Configuration"),
    ("guides-dataset-files", "guides/dataset/files_dataset_document_management.md", "指南 · 数据集", "文件：数据集文档管理", "Files: Dataset Document Management"),
    ("guides-dataset-retrieval-testing", "guides/dataset/retrieval_testing.md", "指南 · 数据集", "检索测试", "Retrieval Testing"),
    ("guides-dataset-chunk-management", "guides/dataset/chunk_parsing_results_and_knowledge_fragment_management.md", "指南 · 数据集", "分块：解析结果与知识片段管理", "Chunk: Parsing Results and Knowledge Fragment Management"),
    ("guides-dataset-metadata", "guides/dataset/metadata_management.md", "指南 · 数据集", "元数据管理", "Metadata Management"),
    ("guides-dataset-logs", "guides/dataset/logs.md", "指南 · 数据集", "日志", "Logs"),
    ("guides-dataset-notes-faqs", "guides/dataset/notes_and_faqs.md", "指南 · 数据集", "注意事项与常见问题", "Notes and FAQs"),
    ("guides-dataset-artifacts", "guides/dataset/artifacts_knowledge_artifact_generation_and_management.md", "指南 · 数据集", "知识工件生成与管理", "Artifacts: Knowledge Artifact Generation and Management"),
    ("guides-dataset-accelerate", "guides/dataset/best_practices/accelerate_doc_indexing.mdx", "指南 · 数据集", "最佳实践：加速索引", "Accelerate Indexing"),
    # —— 指南 · 文件 ——
    ("guides-file-overview", "guides/file/file.md", "指南 · 文件", "文件与文件夹", "Files and Folders"),
    ("guides-file-operations", "guides/file/file_operations.md", "指南 · 文件", "文件操作", "File Operations"),
    ("guides-file-batch", "guides/file/batch_move_and_delete.md", "指南 · 文件", "批量移动与删除", "Batch Move and Delete"),
    ("guides-file-link-dataset", "guides/file/link_dataset.md", "指南 · 文件", "关联知识库", "Link Knowledge Base"),
    # —— 指南 · 数据源 ——
    ("guides-data-source-overview", "guides/data_source/overview_and_page_management.md", "指南 · 数据源", "数据源概览与页面管理", "Data Source Overview and Page Management"),
    ("guides-data-source-categories", "guides/data_source/data_source_categories_and_selection.md", "指南 · 数据源", "数据源分类与选择", "Data Source Categories and Selection"),
    ("guides-data-source-configuration", "guides/data_source/data_source_configuration.md", "指南 · 数据源", "数据源配置", "Data Source Configuration"),
    ("guides-data-source-sync", "guides/data_source/add_to_knowledge_base_and_sync.md", "指南 · 数据源", "加入知识库并同步", "Add to Knowledge Base and Sync"),
    # —— 指南 · 对话 ——
    ("guides-chat-overview", "guides/chat/feature_overview_and_creation.md", "指南 · 对话", "功能概览与创建", "Feature Overview and Creation"),
    ("guides-chat-configuration", "guides/chat/chat_configuration.md", "指南 · 对话", "对话配置", "Chat Configuration"),
    ("guides-chat-sessions", "guides/chat/using_chat_sessions.md", "指南 · 对话", "使用对话会话", "Using Chat Sessions"),
    ("guides-chat-multimodel-faq", "guides/chat/Mutimodel_comparison_and_FAQ.md", "指南 · 对话", "多模型对比", "Multi-model Comparison"),
    # —— 指南 · 对话渠道 ——
    ("guides-chatchannel-overview", "guides/chatchannel/chat_channels_overview.md", "指南 · 对话渠道", "对话渠道概览", "Chat Channels Overview"),
    ("guides-chatchannel-access", "guides/chatchannel/channel_access_and_configuration.md", "指南 · 对话渠道", "渠道接入与配置", "Channel Access and Configuration"),
    ("guides-chatchannel-connect", "guides/chatchannel/connect_chat.md", "指南 · 对话渠道", "连接对话渠道", "Connect Chat"),
    ("guides-chatchannel-faq", "guides/chatchannel/faq.md", "指南 · 对话渠道", "对话渠道常见问题", "FAQ"),
    # —— 指南 · 搜索 ——
    ("guides-search-create", "guides/search/create_search.md", "指南 · 搜索", "创建搜索", "Create a Search"),
    ("guides-search-settings", "guides/search/search_settings.md", "指南 · 搜索", "搜索设置", "Search Settings"),
    ("guides-search-faq", "guides/search/faq.md", "指南 · 搜索", "搜索常见问题", "FAQ"),
    # —— 指南 · Agent ——
    ("guides-agent-overview", "guides/agent/agent_overview.md", "指南 · Agent", "Agent 概览", "Agent Overview"),
    ("guides-agent-creation", "guides/agent/creation_and_management.md", "指南 · Agent", "Agent 的创建与管理", "Agent Creation and Management"),
    ("guides-agent-canvas", "guides/agent/understand_the_canvas.md", "指南 · Agent", "理解画布", "Understand the Canvas"),
    ("guides-agent-import-export", "guides/agent/import_and_export_agents.md", "指南 · Agent", "导入与导出 Agent", "Import and Export Agents"),
    ("guides-agent-embed", "guides/agent/embed_into_web_pages.md", "指南 · Agent", "嵌入网页", "Embed into Web Pages"),
    ("guides-agent-flow-components", "guides/agent/agent_workflow/flow_components.md", "指南 · Agent 工作流", "流程组件", "Flow Components"),
    ("guides-agent-dialogue", "guides/agent/agent_workflow/dialogue_component.md", "指南 · Agent 工作流", "对话组件", "Dialogue Component"),
    ("guides-agent-basic-components", "guides/agent/agent_workflow/basic_component.md", "指南 · Agent 工作流", "基础组件", "Basic Components"),
    ("guides-agent-data-components", "guides/agent/agent_workflow/data_manipulation_components.md", "指南 · Agent 工作流", "数据操作组件", "Data Manipulation Components"),
    ("guides-agent-tool-components", "guides/agent/agent_workflow/tool_components.md", "指南 · Agent 工作流", "工具组件", "Tool Components"),
    ("guides-agent-pipeline-create", "guides/agent/ingestion_pipeline/create_ingestion_pipeline.md", "指南 · 摄取管道", "创建摄取管道", "Create an Ingestion Pipeline"),
    ("guides-agent-pipeline-components", "guides/agent/ingestion_pipeline/understand_core_ingestion_pipeline_components.md", "指南 · 摄取管道", "理解核心摄取管道组件", "Understand the Core Ingestion Pipeline Components"),
    ("guides-agent-pipeline-parser", "guides/agent/ingestion_pipeline/configure_parser_component.md", "指南 · 摄取管道", "配置解析器组件", "Configure the Parser Component"),
    ("guides-agent-pipeline-chunker", "guides/agent/ingestion_pipeline/configure_chunker_component.md", "指南 · 摄取管道", "配置分块器组件", "Configure the Chunker Component"),
    ("guides-agent-pipeline-transformer", "guides/agent/ingestion_pipeline/configure_transformer_component.md", "指南 · 摄取管道", "配置转换器组件", "Configure the Transformer Component"),
    ("guides-agent-pipeline-indexer", "guides/agent/ingestion_pipeline/configure_indexer_component.md", "指南 · 摄取管道", "配置索引器组件", "Configure the Indexer Component"),
    ("guides-agent-pipeline-connect", "guides/agent/ingestion_pipeline/connect_the_pipeline_to_a_knowledge_base.md", "指南 · 摄取管道", "管道接入知识库", "Connect the Pipeline to a Knowledge Base"),
    ("guides-agent-pipeline-test", "guides/agent/ingestion_pipeline/test_run.md", "指南 · 摄取管道", "测试运行", "Test Run"),
    # —— 指南 · 记忆 ——
    ("guides-memory-create", "guides/memory/create_memory.md", "指南 · 记忆", "创建记忆", "Create Memory"),
    ("guides-memory-configure", "guides/memory/configure_memory.md", "指南 · 记忆", "配置记忆", "Configure Memory"),
    ("guides-memory-connect", "guides/memory/connect_to_an_agent.md", "指南 · 记忆", "连接到 Agent", "Connect to an Agent"),
    ("guides-memory-messages", "guides/memory/message_page.md", "指南 · 记忆", "消息页面", "Message Page"),
    # —— 指南 · 知识编译 ——
    ("guides-kc-overview", "guides/knowledge_compilation/overview.md", "指南 · 知识编译", "知识编译概览", "Knowledge Compilation Overview"),
    ("guides-kc-basic-info", "guides/knowledge_compilation/basic_information_configuration.md", "指南 · 知识编译", "基本信息配置", "Basic Information Configuration"),
    ("guides-kc-runtime", "guides/knowledge_compilation/runtime_configuration.md", "指南 · 知识编译", "知识编译运行时配置", "Knowledge Compilation Runtime Configuration"),
    ("guides-kc-apply-template", "guides/knowledge_compilation/apply_knowledge_compilation_template.md", "指南 · 知识编译", "应用知识编译模板", "Apply a Knowledge Compilation Template"),
    ("guides-kc-built-in", "guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md", "指南 · 知识编译", "内置模板与专用配置", "Built-in Templates and Dedicated Configuration"),
    ("guides-kc-faq", "guides/knowledge_compilation/faq.md", "指南 · 知识编译", "知识编译常见问题", "FAQ"),
    # —— 指南 · 模型 ——
    ("guides-models-api-key", "guides/models/llm_api_key_setup.md", "指南 · 模型", "配置模型 API Key", "Configure Model API Key"),
    ("guides-models-local", "guides/models/deploy_local_llm.mdx", "指南 · 模型", "本地部署模型", "Deploy Local Models"),
    ("guides-models-supported", "guides/models/supported_models.mdx", "指南 · 模型", "模型提供商", "Model Providers"),
    # —— 指南 · 团队：权限系统概览 ——
    ("guides-team-permission-index", "guides/team/permission_system_overview/index.md", "指南 · 团队", "权限系统概览", "Permission System Overview"),
    ("guides-team-permission-team-resource", "guides/team/permission_system_overview/team_and_resource_permissions.md", "指南 · 团队", "团队与资源权限", "Team and Resource Permissions"),
    ("guides-team-permission-member", "guides/team/permission_system_overview/team_member_management.md", "指南 · 团队", "团队成员管理", "Team Member Management"),
    ("guides-team-permission-sharing", "guides/team/permission_system_overview/resource_sharing_scope.md", "指南 · 团队", "资源共享范围", "Resource Sharing Scope"),
    ("guides-team-permission-operation", "guides/team/permission_system_overview/resource_operation_permissions.md", "指南 · 团队", "资源操作权限", "Resource Operation Permissions"),
    ("guides-team-permission-rules", "guides/team/permission_system_overview/permission_effective_rules.md", "指南 · 团队", "权限生效规则", "Permission Effective Rules"),
    # —— 指南 · 团队：共享范围配置 ——
    ("guides-team-sharing-index", "guides/team/sharing_scope_configuration/index.md", "指南 · 团队", "共享范围配置", "Sharing Scope Configuration"),
    ("guides-team-sharing-opensource", "guides/team/sharing_scope_configuration/open_source_edition_sharing_scope_configuration.md", "指南 · 团队", "开源版共享范围配置", "Open-source Edition Sharing Scope Configuration"),
    ("guides-team-sharing-agents", "guides/team/sharing_scope_configuration/share_agents.md", "指南 · 团队", "共享 Agent", "Share Agents"),
    ("guides-team-sharing-kb", "guides/team/sharing_scope_configuration/share_knowledge_bases.md", "指南 · 团队", "共享知识库", "Share Knowledge Bases"),
    ("guides-team-sharing-memories", "guides/team/sharing_scope_configuration/share_memories.md", "指南 · 团队", "共享记忆", "Share Memories"),
    # —— 指南 · 团队：团队管理 ——
    ("guides-team-mgmt-index", "guides/team/team_management/index.md", "指南 · 团队", "团队管理", "Team Management"),
    ("guides-team-mgmt-enter", "guides/team/team_management/enter_the_team_page.md", "指南 · 团队", "进入团队页面", "Enter the Team Page"),
    ("guides-team-mgmt-view-members", "guides/team/team_management/view_current_workspace_members.md", "指南 · 团队", "查看当前工作区成员", "View Current Workspace Members"),
    ("guides-team-mgmt-invite", "guides/team/team_management/invite_members.md", "指南 · 团队", "邀请成员", "Invite Members"),
    ("guides-team-mgmt-accept", "guides/team/team_management/accept_or_decline_an_invitation.md", "指南 · 团队", "接受或拒绝邀请", "Accept or Decline an Invitation"),
    ("guides-team-mgmt-remove", "guides/team/team_management/remove_members.md", "指南 · 团队", "移除成员", "Remove Members"),
    ("guides-team-mgmt-leave", "guides/team/team_management/leave_a_joined_team.md", "指南 · 团队", "退出已加入的团队", "Leave a Joined Team"),
    ("guides-team-mgmt-view-teams", "guides/team/team_management/view_joined_teams.md", "指南 · 团队", "查看已加入的团队", "View Joined Teams"),
    ("guides-team-mgmt-share", "guides/team/team_management/resource_sharing_from_the_team_perspective.md", "指南 · 团队", "团队视角的资源共享", "Resource Sharing from the Team Perspective"),
    ("guides-team-mgmt-faq", "guides/team/team_management/faq.md", "指南 · 团队", "团队管理常见问题", "FAQ"),
    # —— 参考资料 ——
    ("references-glossary", "references/glossary.mdx", "参考资料", "术语表", "Glossary"),
    # —— 开发 ——
    ("develop-api-key", "develop/acquire_ragflow_api_key.md", "开发", "获取 RAGFlow API Key", "Acquire RAGFlow API Key"),
    ("develop-launch-source", "develop/launch_ragflow_from_source.md", "开发", "从源码启动服务", "Launch Service from Source"),
    ("develop-build-docker", "develop/build_docker_image.mdx", "开发", "构建 RAGFlow Docker 镜像", "Build RAGFlow Docker Image"),
    ("develop-switch-engine", "develop/switch_doc_engine.md", "开发", "切换文档引擎", "Switch Document Engine"),
    ("develop-deepwiki", "develop/deepwiki.md", "开发", "在 DeepWiki 上探索 RAGFlow", "Explore RAGFlow on DeepWiki"),
    ("develop-contributing", "develop/contributing.md", "开发", "贡献指南", "Contribution Guidelines"),
    # —— 开发 · MCP ——
    ("develop-mcp-server", "develop/mcp/launch_mcp_server.md", "开发 · MCP", "启动 RAGFlow MCP 服务器", "Launch RAGFlow MCP Server"),
    ("develop-mcp-tools", "develop/mcp/mcp_tools.md", "开发 · MCP", "RAGFlow MCP 工具", "RAGFlow MCP Tools"),
    ("develop-mcp-client", "develop/mcp/mcp_client_example.md", "开发 · MCP", "RAGFlow MCP 客户端示例", "RAGFlow MCP Client Examples"),
    # —— 管理 ——
    ("admin-tracing", "administrator/tracing.mdx", "管理", "链路追踪", "Tracing"),
    ("admin-upgrade", "administrator/upgrade_ragflow.mdx", "管理", "升级 RAGFlow", "Upgrade RAGFlow"),
    ("admin-service", "administrator/admin/admin_service.md", "管理", "管理服务", "Admin Service"),
    ("admin-cli", "administrator/admin/ragflow_cli.md", "管理", "RAGFlow CLI", "RAGFlow CLI"),
    ("admin-ui-begin", "administrator/admin/admin_ui/before_you_begin.md", "管理 · 后台界面", "开始之前", "Before You Begin"),
    ("admin-ui-status", "administrator/admin/admin_ui/check_system_status.md", "管理 · 后台界面", "查看系统状态", "Check System Status"),
    ("admin-ui-users", "administrator/admin/admin_ui/manage_user_accounts.md", "管理 · 后台界面", "管理用户账户", "Manage User Accounts"),
    ("admin-ui-sandbox", "administrator/admin/admin_ui/configure_code_execution_sandbox.md", "管理 · 后台界面", "配置代码执行沙箱", "Configure Code Execution Sandbox"),
    ("admin-config-general", "administrator/configurations/configurations.md", "管理 · 配置", "系统配置", "Configurations"),
    ("admin-config-ssl", "administrator/configurations/config_ssl_cert.md", "管理 · 配置", "配置 SSL 证书", "Configure SSL Certificates"),
    ("admin-config-sandbox", "administrator/configurations/sandbox_quickstart.md", "管理 · 配置", "沙箱快速开始", "Sandbox Quickstart"),
    ("admin-migration-backup", "administrator/migration/backup_and_migration.md", "管理 · 迁移", "备份与迁移", "Backup and Migration"),
    ("admin-migration-schema", "administrator/migration/database_schema_and_migration.md", "管理 · 迁移", "数据库结构与迁移", "Database Schema and Migration"),
    # —— 常见问题 ——
    ("faq", "faq.mdx", "常见问题", "常见问题", "FAQ"),
]

# 切分条目：巨页按 H2 章节切成多份
# (slug 基名, 仓库内路径, 分组, 中文标题基名, 英文标题基名, 目标份数, 插入锚点 slug)
# 锚点 = gen-manifest 展开分片时的插入位置（该 slug 条目之后）；实际份数由 fetch
# 时按章节大小决定，gen-manifest 以磁盘上实际生成的 en/<基名>-NN.md 为准
SPLIT_ENTRIES = [
    ("references-http-api", "references/http_api_reference.md", "参考资料", "HTTP API 参考", "HTTP API Reference", 10, "references-glossary"),
    ("references-python-api", "references/python_api_reference.md", "参考资料", "Python API 参考", "Python API Reference", 3, "references-glossary"),
    ("release-notes", "release_notes.md", "更新日志", "更新日志", "Releases", 4, "faq"),
]


def site_url(path: str) -> str:
    """仓库内路径 → 官方文档站 URL。
    规则：去掉扩展名即路由路径；quickstart 的 frontmatter slug 是 /（站点首页）；
    Docusaurus 惯例 index.md 用父目录作路由。"""
    route = path.rsplit(".", 1)[0]
    if route == "quickstart":
        return SITE_BASE  # https://ragflow.io/docs/
    if route.endswith("/index"):
        route = route[: -len("/index")]
    return SITE_BASE + route


# 展开后的全量清单（含切分条目的占位——真实份数以 en/ 目录为准，见 gen-manifest.py）
def all_slugs() -> list[str]:
    slugs = [e[0] for e in ENTRIES]
    for base, _p, _g, _z, _e, n in SPLIT_ENTRIES:
        slugs += ["%s-%02d" % (base, i) for i in range(1, n + 1)]
    return slugs
