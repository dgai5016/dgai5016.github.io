<BiRow>
<template #en>

After you hover over a file row, the **Operations** column displays the available operation buttons. The available operations for folders and regular files are slightly different. For files from external data sources, some operations, such as moving, renaming, or deleting, may be restricted by the data source permissions.

</template>
<template #zh>

将鼠标悬停在文件行上后，**Operations**（操作）列会显示可用的操作按钮。文件夹和普通文件可用的操作略有不同。对于来自外部数据源的文件，移动、重命名、删除等部分操作可能受数据源权限的限制。

</template>
</BiRow>

<BiRow>
<template #en>

![File operations](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/file_operations.jpg)

</template>
<template #zh>

![文件操作](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/file_operations.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**Add to Knowledge Base**: Applies to files. Associates the file with one or more knowledge bases, allowing the knowledge base to use the file as a data source.

</template>
<template #zh>

**Add to Knowledge Base**（添加到知识库）：适用于文件。将文件关联到一个或多个知识库，使知识库可以把该文件用作数据源。

</template>
</BiRow>

<BiRow>
<template #en>

**Move**: Applies to files or folders. After selecting a target folder and saving, the system moves the selected item to the target directory.

</template>
<template #zh>

**Move**（移动）：适用于文件或文件夹。选择目标文件夹并保存后，系统会将所选项移动到目标目录。

</template>
</BiRow>

<BiRow>
<template #en>

**Rename**: Applies to files or folders. When renaming, it is recommended to retain information that identifies the file format and source to avoid name confusion within the same directory.

</template>
<template #zh>

**Rename**（重命名）：适用于文件或文件夹。重命名时建议保留能标识文件格式和来源的信息，避免同一目录内的名称混淆。

</template>
</BiRow>

<BiRow>
<template #en>

**Download**: Applies to files. Downloads the original file. Folder rows usually do not provide a download button.

</template>
<template #zh>

**Download**（下载）：适用于文件。下载原始文件。文件夹行通常不提供下载按钮。

</template>
</BiRow>

<BiRow>
<template #en>

**Preview or View**: Applies to previewable files. Some document types display a view entry, allowing you to open or preview the file content within the page.

</template>
<template #zh>

**Preview or View**（预览或查看）：适用于可预览的文件。部分文档类型会显示查看入口，允许你在页面内打开或预览文件内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Delete**: Applies to files or folders. A confirmation dialog appears before deletion. After confirmation, the file is removed from the current directory.

</template>
<template #zh>

**Delete**（删除）：适用于文件或文件夹。删除前会弹出确认对话框，确认后文件即从当前目录移除。

</template>
</BiRow>

<BiRow>
<template #en>

Deleting files or folders may affect knowledge base data sources that are already associated with them. Before deleting, confirm that the file is no longer used by business workflows, knowledge base parsing, or agent retrieval.

</template>
<template #zh>

删除文件或文件夹可能影响已与之关联的知识库数据源。删除前，请确认该文件不再被业务流程、知识库解析或 Agent 检索使用。

</template>
</BiRow>
