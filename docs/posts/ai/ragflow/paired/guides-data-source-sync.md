<BiRow>
<template #en>

## Add a Data Source to a Knowledge Base

</template>
<template #zh>

## 向知识库添加数据源

</template>
</BiRow>

<BiRow>
<template #en>

Creating a data source connection only saves the access configuration for the external system. To bring external content into a knowledge base, you also need to add that data source in the target knowledge base and start synchronization.

</template>
<template #zh>

创建数据源连接只是保存了外部系统的访问配置。要把外部内容接入知识库，还需要在目标知识库中添加该数据源并启动同步。

</template>
</BiRow>

<BiRow>
<template #en>

1. Enter the knowledge base page.
2. Open the target knowledge base that needs to synchronize external content.
3. In the data import or data source settings entry of the knowledge base, select the created data source connection.
4. Follow the prompts on the knowledge base page to select the synchronization scope, parsing method, or chunking parameters.
5. Save and start synchronization, then wait for the synchronization task to complete.

</template>
<template #zh>

1. 进入知识库页面。
2. 打开需要同步外部内容的目标知识库。
3. 在知识库的数据导入或数据源设置入口中，选择已创建的数据源连接。
4. 按照知识库页面上的提示，选择同步范围、解析方式或分块参数。
5. 保存并启动同步，等待同步任务完成。

</template>
</BiRow>

<BiRow>
<template #en>

## Synchronization and Updates

</template>
<template #zh>

## 同步与更新

</template>
</BiRow>

<BiRow>
<template #en>

After synchronization starts, RAGFlow reads content from the external system and writes parseable content to the knowledge base index.

</template>
<template #zh>

同步启动后，RAGFlow 会从外部系统读取内容，并把可解析的内容写入知识库索引。

</template>
</BiRow>

<BiRow>
<template #en>

After synchronization is complete, users can retrieve and ask questions about this content in the knowledge base. Synchronization results can be understood according to the following rules:

</template>
<template #zh>

同步完成后，用户就可以在知识库中检索并就该内容提问。同步结果可以按照以下规则理解：

</template>
</BiRow>

<BiRow>
<template #en>

- The first synchronization imports the existing content in the current synchronization scope.
- Content newly added or modified in the external system is usually synchronized to the knowledge base when the next refresh interval arrives.
- If sync deleted files is enabled, content deleted from the external system is removed from the knowledge base index during subsequent synchronization or cleanup tasks.

</template>
<template #zh>

- 第一次同步会导入当前同步范围内已有的内容。
- 外部系统中新增或修改的内容，通常要等到下一个刷新间隔到来时才会同步到知识库。
- 如果启用了同步删除文件，外部系统中删除的内容会在后续同步或清理任务中从知识库索引里移除。

</template>
</BiRow>

<BiRow>
<template #en>

If changes to external content do not appear in the knowledge base immediately, first check the refresh interval, synchronization status, and data source logs.

</template>
<template #zh>

如果外部内容的变更没有立即出现在知识库中，请先检查刷新间隔、同步状态和数据源日志。

</template>
</BiRow>

<BiRow>
<template #en>

Some data sources support the test connection feature. After saving or modifying a connection, you can test the connection first to confirm that account permissions, connection parameters, and data access are normal, and then start synchronization in the knowledge base.

</template>
<template #zh>

部分数据源支持测试连接功能。保存或修改连接后，可以先测试连接，确认账号权限、连接参数和数据访问都正常，然后在知识库中启动同步。

</template>
</BiRow>

<BiRow>
<template #en>

![Synchronization and Updates](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/Synchronization_and_Updates.jpg)

</template>
<template #zh>

![同步与更新](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/Synchronization_and_Updates.jpg)

</template>
</BiRow>
