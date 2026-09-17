<BiRow>
<template #en>

Switch your doc engine from Elasticsearch to Infinity.

</template>
<template #zh>

把你的文档引擎从 Elasticsearch 切换到 Infinity。

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

RAGFlow uses Elasticsearch by default for storing full text and vectors. To switch to [Infinity](https://github.com/infiniflow/infinity/), follow these steps:

</template>
<template #zh>

RAGFlow 默认使用 Elasticsearch 存储全文和向量。要切换到 [Infinity](https://github.com/infiniflow/infinity/)，请按以下步骤操作：

</template>
</BiRow>

<BiRow>
<template #en>

:::warning WARNING
Switching to Infinity on a Linux/arm64 machine is not yet officially supported.
:::

</template>
<template #zh>

:::warning 警告
在 Linux/arm64 机器上切换到 Infinity 尚未获得官方支持。
:::

</template>
</BiRow>

<BiRow>
<template #en>

1. Stop all running containers:

</template>
<template #zh>

1. 停止所有正在运行的容器：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   $ docker compose -f docker/docker-compose.yml down -v
   ```

</template>
<template #zh>

   ```bash
   $ docker compose -f docker/docker-compose.yml down -v
   ```

</template>
</BiRow>

<BiRow>
<template #en>

:::warning WARNING
`-v` will delete the docker container volumes, and the existing data will be cleared.
:::

</template>
<template #zh>

:::warning 警告
`-v` 会删除 Docker 容器卷，现有数据将被清空。
:::

</template>
</BiRow>

<BiRow>
<template #en>

2. Set `DOC_ENGINE` in **docker/.env** to `infinity`.
3. Start the containers:

</template>
<template #zh>

2. 将 **docker/.env** 中的 `DOC_ENGINE` 设置为 `infinity`。
3. 启动容器：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   $ docker compose -f docker-compose.yml up -d
   ```

</template>
<template #zh>

   ```bash
   $ docker compose -f docker-compose.yml up -d
   ```

</template>
</BiRow>
