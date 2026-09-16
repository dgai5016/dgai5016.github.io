<BiRow>
<template #en>

## Log Overview

</template>
<template #zh>

## 日志概览

</template>
</BiRow>

<BiRow>
<template #en>

**Logs** is used to view execution records of tasks related to the current dataset. The top of the page displays statistics such as **Total files**, **Processing**, and **Downloading**. The lower area is divided into document logs and dataset-level logs by log type. Document logs focus on the processing process of a single document. Dataset-level logs focus on tasks within the entire dataset scope. When troubleshooting, first determine whether the problem occurs in a single document or the entire dataset, then go to the corresponding logs to view details.

</template>
<template #zh>

**日志（Logs）** 用于查看与当前数据集相关的任务执行记录。页面顶部展示 **Total files**（总文件数）、**Processing**（处理中）、**Downloading**（下载中）等统计信息；下方区域按日志类型分为文档日志和数据集级日志。文档日志关注单个文档的处理过程，数据集级日志关注整个数据集范围内的任务。排查问题时，先判断问题发生在单个文档还是整个数据集，再前往对应的日志查看详情。

</template>
</BiRow>

<BiRow>
<template #en>

## Document Logs

</template>
<template #zh>

## 文档日志

</template>
</BiRow>

<BiRow>
<template #en>

Document logs are used to view and trace task execution related to a single document, such as document parsing, task cancellation, and task success or failure. When a document has not completed parsing for a long time, parsing fails, or the number of generated chunks is abnormal, use document logs to view task status and execution details.

</template>
<template #zh>

文档日志用于查看和追踪与单个文档相关的任务执行情况，例如文档解析、任务取消、任务成功或失败。当某个文档长时间未完成解析、解析失败或生成的分块数量异常时，可通过文档日志查看任务状态和执行详情。

</template>
</BiRow>

<BiRow>
<template #en>

Document logs mainly include:

</template>
<template #zh>

文档日志主要包括：

</template>
</BiRow>

<BiRow>
<template #en>

- **ID**: The unique identifier of the log record or task.
- **Filename**: The name of the document executing the current task.
- **Source**: The document source.
- **Ingestion pipeline**: The parsing method or pipeline used when processing the document.
- **Start date**: The task start time.
- **Task**: The task type, such as **Parse**.
- **Status**: The current task execution status.
- **Operations**: Operation entry. You can view log details for the current task, including execution process and error information.

</template>
<template #zh>

- **ID**：日志记录或任务的唯一标识。
- **Filename**：正在执行当前任务的文档名称。
- **Source**：文档来源。
- **Ingestion pipeline**：处理该文档时使用的解析方式或摄取管道。
- **Start date**：任务开始时间。
- **Task**：任务类型，如 **Parse**（解析）。
- **Status**：当前任务的执行状态。
- **Operations**：操作入口。可查看当前任务的日志详情，包括执行过程和错误信息。

</template>
</BiRow>

<BiRow>
<template #en>

If parsing fails for only one document, a document stays processing for a long time, or the number of chunks is abnormal, it is recommended to check that document's logs first.

</template>
<template #zh>

如果只有单个文档解析失败、某个文档长时间处于处理中，或分块数量异常，建议先查看该文档的日志。

</template>
</BiRow>

<BiRow>
<template #en>

## Dataset-Level Logs

</template>
<template #zh>

## 数据集级日志

</template>
</BiRow>

<BiRow>
<template #en>

Dataset-level logs are used to view task execution records whose processing object is the entire dataset. Unlike document logs for single-document parsing tasks, dataset-level logs mainly record dataset-level processing tasks, such as **Knowledge Compilation**.

</template>
<template #zh>

数据集级日志用于查看处理对象为整个数据集的任务执行记录。与面向单文档解析任务的文档日志不同，数据集级日志主要记录数据集级的处理任务，例如**知识编译（Knowledge Compilation）**。

</template>
</BiRow>

<BiRow>
<template #en>

Dataset-level logs mainly include:

</template>
<template #zh>

数据集级日志主要包括：

</template>
</BiRow>

<BiRow>
<template #en>

- **ID**: The unique identifier of the task record.
- **Start date**: The task start time.
- **Processing type**: The processing type, used to indicate the current dataset-level task, such as **Wiki**.
- **Status**: The current task execution status.
- **Operations**: Operation entry. You can view log details and execution information for the current task.

</template>
<template #zh>

- **ID**：任务记录的唯一标识。
- **Start date**：任务开始时间。
- **Processing type**：处理类型，用于标明当前的数据集级任务，如 **Wiki**。
- **Status**：当前任务的执行状态。
- **Operations**：操作入口。可查看当前任务的日志详情和执行信息。

</template>
</BiRow>

<BiRow>
<template #en>

When a dataset-level processing task fails, does not complete for a long time, or needs execution confirmation, view the corresponding task record and log details here.

</template>
<template #zh>

当数据集级处理任务失败、长时间未完成或需要确认执行情况时，可在此查看对应的任务记录和日志详情。

</template>
</BiRow>

<BiRow>
<template #en>

> Tip: For tasks executed on a single document, such as document parsing, view document logs. For tasks executed on the entire dataset, such as **Knowledge Compilation**, view dataset-level logs.

</template>
<template #zh>

> 提示：对于在单个文档上执行的任务（如文档解析），查看文档日志；对于在整个数据集上执行的任务（如**知识编译**），查看数据集级日志。

</template>
</BiRow>

<BiRow>
<template #en>

## Log Troubleshooting Suggestions

</template>
<template #zh>

## 日志排查建议

</template>
</BiRow>

<BiRow>
<template #en>

When task execution is abnormal or does not complete for a long time, first select the corresponding logs based on task type, then troubleshoot based on task status and log details.

</template>
<template #zh>

当任务执行异常或长时间未完成时，先根据任务类型选择对应的日志，再结合任务状态和日志详情进行排查。

</template>
</BiRow>

<BiRow>
<template #en>

- **Document processing tasks**: View document logs. Document logs record processing tasks for specific documents. Use information such as **Filename**, **Source**, **Ingestion pipeline**, **Task**, and **Status** to confirm which document and processing flow has the exception. For documents processed with **Data Pipeline**, you can also use the entry in **Operations** to view the corresponding pipeline execution result.
- **Dataset-level processing tasks**: View dataset-level logs. Dataset-level tasks such as **Knowledge Compilation** are recorded here. Use **Processing type** and **Status** to find the corresponding task, and view log details through **Operations**.
- **Task execution failed**: When **Status** is **Failed**, open the corresponding task log details and view the specific error information.
- **Task does not complete for a long time**: When a task stays in **Pending**, **Running**, or **Schedule** for a long time, first confirm the current task status and start time, then view log details to determine whether the task is still running normally.

</template>
<template #zh>

- **文档处理任务**：查看文档日志。文档日志记录针对具体文档的处理任务。利用 **Filename**、**Source**、**Ingestion pipeline**、**Task**、**Status** 等信息确认异常发生在哪个文档、哪个处理流程。对于通过 **Data Pipeline**（数据管道）处理的文档，还可通过 **Operations** 中的入口查看对应管道的执行结果。
- **数据集级处理任务**：查看数据集级日志。**知识编译**等数据集级任务都记录在这里。利用 **Processing type** 和 **Status** 找到对应任务，并通过 **Operations** 查看日志详情。
- **任务执行失败**：当 **Status**（状态）为 **Failed**（失败）时，打开对应任务的日志详情，查看具体错误信息。
- **任务长时间未完成**：当任务长时间停留在 **Pending**（等待中）、**Running**（运行中）或 **Schedule**（调度）状态时，先确认任务当前状态和开始时间，再查看日志详情，判断任务是否仍在正常运行。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: Document logs and dataset-level logs record different types of processing tasks. They are not parent-child logs or summary logs. When troubleshooting, select the corresponding log based on the actual task.

</template>
<template #zh>

> 注意：文档日志和数据集级日志记录的是不同类型的处理任务，二者并非父子日志或汇总日志。排查问题时，请根据实际任务选择对应的日志。

</template>
</BiRow>
