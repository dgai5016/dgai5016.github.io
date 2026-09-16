<BiRow>
<template #en>

Sync schemas and migrate data using official RAGFlow scripts.

</template>
<template #zh>

使用 RAGFlow 官方脚本同步数据库结构（schema）并迁移数据。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow handles schema updates and migrations automatically at startup. However, for high-volume environments like Kubernetes, massive datasets can cause initialization to exceed 10 minutes, potentially triggering container timeouts or health check failures. To avoid this, you can disable the built-in auto-initialization and manually run these provided scripts to complete database upgrades before launching the service:

</template>
<template #zh>

RAGFlow 会在启动时自动处理结构更新和迁移。但在 Kubernetes 这类高负载环境中，海量数据集可能让初始化超过 10 分钟，进而触发容器超时或健康检查失败。为避免这种情况，可以禁用内置的自动初始化，改为在启动服务之前手动运行官方提供的脚本，先行完成数据库升级：

</template>
</BiRow>

<BiRow>
<template #en>

- [mysql_migration.py](#mysql_migrationpy): Migrates data between MySQL tables.
- [db_schema_sync.py](#db_schema_syncpy): Syncs database schemas and manages changes using peewee-migrate.

</template>
<template #zh>

- [mysql_migration.py](#mysql_migrationpy)：在 MySQL 表之间迁移数据。
- [db_schema_sync.py](#db_schema_syncpy)：使用 peewee-migrate 同步数据库结构并管理变更。

</template>
</BiRow>

<BiRow>
<template #en>

## Mysql_migration.py

</template>
<template #zh>

## Mysql_migration.py

</template>
</BiRow>

<BiRow>
<template #en>

The [mysql_migration.py](https://github.com/infiniflow/ragflow/blob/main/tools/scripts/mysql_migration.py) script is a specialized tool for re-organizing RAGFlow’s model-related data. It transitions data from older unified tables into a modern, multi-table structure to support advanced model management.

</template>
<template #zh>

[mysql_migration.py](https://github.com/infiniflow/ragflow/blob/main/tools/scripts/mysql_migration.py) 脚本是一款专用工具，用于重新组织 RAGFlow 的模型相关数据。它把数据从旧式的统一表迁移到现代的多表结构，以支持高级的模型管理。

</template>
</BiRow>

<BiRow>
<template #en>

### Key Functions

</template>
<template #zh>

### 核心功能

</template>
</BiRow>

<BiRow>
<template #en>

- **Sequential migration**: Moves data through three distinct stages—Provider, Instance, and Model—to maintain database integrity and satisfy dependencies.
- **Flexible setup**: Connects to MySQL using either a YAML configuration file or direct command-line arguments.
- **Execution control**: Offers three specific modes: dry-run (preview), table-only (structural setup), and execute (full data move).
- **Automated mapping**: Generates unique IDs and handles complex joins between legacy records and new table structures.
- **Batch logging**: Processes records in sets of 100 and provides a final summary of total duration and row counts.

</template>
<template #zh>

- **顺序迁移**：数据依次经过三个阶段——Provider、Instance 和 Model——以保持数据库完整性并满足依赖关系。
- **灵活配置**：既可以通过 YAML 配置文件连接 MySQL，也可以通过命令行参数直接连接。
- **执行控制**：提供三种特定模式：dry-run（预览）、table-only（仅结构设置）和 execute（完整数据迁移）。
- **自动映射**：生成唯一 ID，并处理旧记录与新表结构之间的复杂关联。
- **批量日志**：以 100 条记录为一组处理，并在最后给出总耗时与行数的汇总。

</template>
</BiRow>

<BiRow>
<template #en>

### When to Use

</template>
<template #zh>

### 使用场景

</template>
</BiRow>

<BiRow>
<template #en>

- **Version upgrades**: Essential when moving to RAGFlow v0.25 or later to ensure your models are correctly categorized in the new schema.
- **Data normalization**: Necessary when consolidating multiple API keys or LLM providers into the updated system format.
- **Kubernetes deployments**: Useful for setting up the database structure independently using the `--create-table-only` flag before main services start.
- **Migration verification**: Used in dry-run mode to identify any legacy records that still need to be moved to the new tables.

</template>
<template #zh>

- **版本升级**：升级到 RAGFlow v0.25 或更高版本时必不可少，以确保模型在新结构中正确归类。
- **数据规范化**：需要把多个 API key 或 LLM 提供商整合为更新后的系统格式时必需。
- **Kubernetes 部署**：可用 `--create-table-only` 标志在主服务启动前独立搭建数据库结构。
- **迁移校验**：以 dry-run 模式运行，找出仍需迁移到新表的旧记录。

</template>
</BiRow>

<BiRow>
<template #en>

## Db_schema_sync.py

</template>
<template #zh>

## Db_schema_sync.py

</template>
</BiRow>

<BiRow>
<template #en>

The [db_schema_sync.py](https://github.com/infiniflow/ragflow/blob/main/tools/scripts/db_schema_sync.py) script is a synchronization utility that ensures your MySQL database structure matches the Peewee ORM models defined in the RAGFlow source code.

</template>
<template #zh>

[db_schema_sync.py](https://github.com/infiniflow/ragflow/blob/main/tools/scripts/db_schema_sync.py) 脚本是一个同步工具，用于确保你的 MySQL 数据库结构与 RAGFlow 源代码中定义的 Peewee ORM 模型保持一致。

</template>
</BiRow>

<BiRow>
<template #en>

### Key Functions

</template>
<template #zh>

### 核心功能

</template>
</BiRow>

<BiRow>
<template #en>

- **Change detection**: Compares Python model definitions in `api/db/db_models.py` against the live database to identify new tables, added fields, or type mismatches.
- **Migration generation**: Automatically creates Python migration files (containing `migrate()` and `rollback()` logic) in version-specific directories (e.g., `tools/migrate/v0_27_2/`).
- **Schema auditing**: Provides a `--diff` command to view structural discrepancies without applying changes.
- **Execution management**: Applies pending migrations to the database to bring it up to date with the current software version.
- **Safety controls**: Prevents accidental data loss by requiring an explicit `--drop` flag to generate `DROP COLUMN` statements for removed fields.

</template>
<template #zh>

- **变更检测**：将 `api/db/db_models.py` 中的 Python 模型定义与实际运行中的数据库比对，找出新增的表、新增的字段或类型不匹配。
- **迁移生成**：自动在按版本划分的目录（例如 `tools/migrate/v0_27_2/`）中创建 Python 迁移文件（包含 `migrate()` 和 `rollback()` 逻辑）。
- **结构审计**：提供 `--diff` 命令，可在不应用变更的情况下查看结构差异。
- **执行管理**：把待处理的迁移应用到数据库，使其与当前软件版本保持一致。
- **安全控制**：只有显式传入 `--drop` 标志，才会为已删除的字段生成 `DROP COLUMN` 语句，以防意外丢失数据。

</template>
</BiRow>

<BiRow>
<template #en>

### When to Use

</template>
<template #zh>

### 使用场景

</template>
</BiRow>

<BiRow>
<template #en>

- **Version upgrades**: When moving to a new version of RAGFlow that introduces structural database changes.
- **Development**: When modifying `db_models.py` and needing to update your local database without manual SQL.
- **CI/CD pipelines**: To automatically prepare or apply database updates during deployment.
- **Troubleshooting**: When the application fails due to "Unknown column" or "Table not found" errors, indicating a desynchronized schema.

</template>
<template #zh>

- **版本升级**：升级到引入数据库结构变更的 RAGFlow 新版本时。
- **开发**：修改 `db_models.py` 后需要更新本地数据库、又不想手写 SQL 时。
- **CI/CD 流水线**：在部署过程中自动准备或应用数据库更新。
- **故障排查**：应用因 "Unknown column" 或 "Table not found" 错误而失败，说明结构不同步时。

</template>
</BiRow>
