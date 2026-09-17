# 快速开始

RAGFlow 是一款基于深度文档理解的开源 RAG（检索增强生成）引擎。与 LLM 集成后，它能够提供真实可信的问答能力，其回答由源自各类复杂格式数据的可靠引用支撑。

本快速开始指南介绍以下通用流程：

- 启动本地 RAGFlow 服务器，
- 创建数据集，
- 干预文件解析，直至
- 基于你的数据集开展 AI 对话。

:::danger 重要
我们官方支持 x86 CPU 和 Nvidia GPU，本文档提供的是在 x86 平台上使用 Docker 部署 RAGFlow 的说明。虽然我们也在 ARM64 平台上测试 RAGFlow，但并不为 ARM 维护 RAGFlow Docker 镜像。

如果你使用的是 ARM 平台，请按照[本指南](https://ragflow.io/docs/develop/build_docker_image)构建 RAGFlow Docker 镜像。
:::

## 前提条件

- CPU &ge; 4 核（x86）；
- 内存 &ge; 16 GB；
- 磁盘 &ge; 50 GB；
- Docker &ge; 24.0.0 且 Docker Compose &ge; v2.26.1；
- Python &ge; 3.13；
- [gVisor](https://gvisor.dev/docs/user_guide/install/)：仅当你打算使用 RAGFlow 的代码执行器（[sandbox](https://github.com/infiniflow/ragflow/tree/main/agent/sandbox)）功能时才需要。

:::tip 注意
如果你的本地机器（Windows、Mac 或 Linux）尚未安装 Docker，请参阅[安装 Docker Engine](https://docs.docker.com/engine/install/)。
:::

## 启动服务器

本节提供在 Linux 上搭建 RAGFlow 服务器的说明。如果你使用的是其他操作系统，也不必担心，大多数步骤都是类似的。

1. 确保 `vm.max_map_count` &ge; 262144。

<details>
  <summary>展开查看详情：</summary>

   `vm.max_map_count`. 该值设定一个进程可拥有的内存映射区域数量的上限，默认值为 65530。虽然大多数应用程序需要的映射区域不到一千个，但调低该值可能导致异常行为；当进程达到这一上限时，系统会抛出内存不足（out-of-memory）错误。

   RAGFlow v0.27.2 使用 Elasticsearch 或 [Infinity](https://github.com/infiniflow/infinity) 进行多路召回。正确设置 `vm.max_map_count` 的值对 Elasticsearch 组件的正常运行至关重要。

**Linux：**

1.1. 查看 `vm.max_map_count` 的值：

```bash
$ sysctl vm.max_map_count
```

1.2. 如果该值不足 262144，请将 `vm.max_map_count` 重置为不低于 262144 的值。

```bash
$ sudo sysctl -w vm.max_map_count=262144
```

:::warning 警告
这一修改会在系统重启后被重置。如果下次启动服务器时忘记更新该值，你可能会遇到 `Can't connect to ES cluster` 异常。
:::

1.3. 要让修改永久生效，请在 **/etc/sysctl.conf** 中相应地添加或更新 `vm.max_map_count` 的值：

```bash
vm.max_map_count=262144
```

**macOS：**

如果你在 macOS 上使用 Docker Desktop，请运行以下命令更新 `vm.max_map_count`：

```bash
docker run --rm --privileged --pid=host alpine sysctl -w vm.max_map_count=262144
```

:::warning 警告
这一修改会在系统重启后被重置。如果下次启动服务器时忘记更新该值，你可能会遇到 `Can't connect to ES cluster` 异常。
:::

要让修改持久生效，请创建一个包含相应设置的文件：

1.1. 创建文件：

```shell
sudo nano /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

1.2. 打开文件：

```shell
sudo launchctl load /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

1.3. 添加设置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.user.vmmaxmap</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/sbin/sysctl</string>
        <string>-w</string>
        <string>vm.max_map_count=262144</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

1.4. 保存文件后，加载新的守护进程：

```shell
sudo launchctl load /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

:::info
如果上述步骤不起作用，可以考虑使用[这个替代方案](https://github.com/docker/for-mac/issues/7047#issuecomment-1791912053)，它借助一个容器实现，无需手动修改 macOS 设置。
:::

**Windows：**

#### 如果你在 Windows 上使用 Docker Desktop，那么你*必须*使用 docker-machine 来设置 `vm.max_map_count`：

```bash
$ docker-machine ssh
$ sudo sysctl -w vm.max_map_count=262144
```
#### 如果你在 Windows 上使用 Docker Desktop 的 WSL 2 后端，请使用 docker-desktop 来设置 `vm.max_map_count`：

1.1. 在 WSL 中运行以下命令：
```bash
$ wsl -d docker-desktop -u root
$ sysctl -w vm.max_map_count=262144
```

:::warning 警告
这一修改会在重启 Docker 后被重置。如果下次启动服务器时忘记更新该值，你可能会遇到 `Can't connect to ES cluster` 异常。
:::

1.2. 如果你不想每次重启 Docker 都重新运行这些命令，可以按如下方式更新 `%USERPROFILE%.wslconfig`，让修改对所有 WSL 发行版永久且全局生效：

```bash
[wsl2]
kernelCommandLine = "sysctl.vm.max_map_count=262144"
```
*这会使所有 WSL2 虚拟机在启动时都带上该设置。*

:::info
如果你使用的是 Windows 11 或 Windows 10 22H2 版本，并且安装了 Microsoft Store 版的 WSL，也可以更新 docker-desktop WSL 发行版内的 **/etc/sysctl.conf** 来让修改永久生效：

```bash
$ wsl -d docker-desktop -u root
$ vi /etc/sysctl.conf
```

```bash
# Append a line, which reads:
vm.max_map_count = 262144
```
:::

</details>

2. 克隆仓库：

   ```bash
   $ git clone https://github.com/infiniflow/ragflow.git
   $ cd ragflow/docker
   ```

3. 切换到当前版本：

   ```bash
   $ git checkout -f v0.27.2
   ```
4. 使用预构建的 Docker 镜像并启动服务器：

   ```bash
   # Use CPU for DeepDoc tasks:
   $ docker compose -f docker-compose.yml up -d
   ```

   ```mdx-code-block
   
   ```

   | RAGFlow 镜像标签   | 镜像大小（GB）  | 是否稳定                 |
   | ------------------- | --------------- | ------------------------ |
   | v0.27.2             | &approx;2       | 稳定版本                 |
   | nightly             | &approx;2       | _不稳定的_每夜构建版本   |

   ```mdx-code-block
   
   ```

:::tip 注意
   这里显示的镜像大小指的是*已下载*的 Docker 镜像的大小（经过压缩）。Docker 运行镜像时会将其解包，因此磁盘占用会大得多。Docker 镜像解包后会膨胀到约 7 GB。
:::

5. 服务器启动并运行后，检查服务器状态：

   ```bash
   $ docker logs -f docker-ragflow-cpu-1
   ```

   _以下输出确认系统成功启动：_

   ```bash
        ____   ___    ______ ______ __
       / __ \ /   |  / ____// ____// /____  _      __
      / /_/ // /| | / / __ / /_   / // __ \| | /| / /
     / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
    /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/

    * Running on all addresses (0.0.0.0)
   ```

:::danger 重要
   如果你跳过这一确认步骤直接登录 RAGFlow，浏览器可能会提示 `network anomaly` 错误，因为此时你的 RAGFlow 可能尚未完全初始化。
:::

6. 在浏览器中输入服务器的 IP 地址并登录 RAGFlow。

:::warning 警告
   在默认设置下，你只需输入 `http://IP_OF_YOUR_MACHINE`（**不带**端口号），因为使用默认配置时，默认的 HTTP 服务端口 `80` 可以省略。
:::

## 配置 LLM

RAGFlow 是一个 RAG 引擎，需要与 LLM 配合才能提供有依据、无幻觉的问答能力。RAGFlow 支持大多数主流 LLM。完整的支持模型列表请参阅[支持的模型](https://ragflow.io/docs/guides/models/supported_models)。

:::info
RAGFlow 也支持使用 Ollama、Xinference 或 LocalAI 在本地部署 LLM，但这部分内容不在本快速开始指南的范围内。
:::

添加并配置 LLM 的步骤如下：

1. 点击页面右上角你的头像 **>** **Model providers**。
2. 点击所需的 LLM，并相应更新 API key。
3. 点击 **System Model Settings** 选择默认模型：
   - 对话模型，
   - 嵌入模型，
   - 图生文模型，
   - 等等。

> 某些模型（如图生文模型 **qwen-vl-max**）从属于特定的 LLM，访问这类模型可能需要更新你的 API key。

## 创建你的第一个数据集

在 RAGFlow 中，你可以向数据集上传文件并将其解析进去。数据集实际上是一组数据集的集合。RAGFlow 中的问答可以基于某个特定的数据集，也可以基于多个数据集。RAGFlow 支持的文件格式包括：文档（PDF、DOC、DOCX、TXT、MD、MDX）、表格（CSV、XLSX、XLS）、图片（JPEG、JPG、PNG、TIF、GIF）和幻灯片（PPT、PPTX）。

创建你的第一个数据集：

1. 点击页面顶部中间的 **Dataset** 标签页 **>** **Create dataset**。
2. 输入数据集的名称，点击 **OK** 确认你的更改。

   _你将进入该数据集的 **Configuration** 页面。_

   ![数据集配置](/ragflow-images/configure_knowledge_base.jpg)

3. RAGFlow 提供多种分块模板，以适配不同的文档布局和文件格式。请为你的数据集选择嵌入模型和分块方法（模板）。

:::danger 重要
   一旦选定某个嵌入模型并用它解析过文件，就不允许再更换。原因显而易见：必须确保同一数据集中的所有文件都使用*同一个*嵌入模型解析（确保它们在同一嵌入空间中进行比较）。
:::

   _你将进入该数据集的 **Dataset** 页面。_

4. 点击 **+ Add file** **>** **Local files**，开始向该数据集上传文件。
5. 在已上传文件的条目中，点击播放按钮开始解析文件：

   ![解析文件](/ragflow-images/parse_file.jpg)

:::warning 注意
   - 如果文件解析卡在 1% 以下，请参阅[此 FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-document-parsing-stall-at-under-one-percent)。
   - 如果文件解析卡在即将完成之处，请参阅[此 FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-pdf-parsing-stall-near-completion-while-the-log-does-not-show-any-error)。
:::

## 干预文件解析

RAGFlow 具备可见性与可解释性，允许你查看分块结果并在必要时进行干预。操作方法如下：

1. 点击完成文件解析的文件，查看分块结果：

   _你将进入 **Chunk** 页面：_

   ![分块](/ragflow-images/file_chunks.jpg)

2. 将鼠标悬停在每个快照上，快速查看每个分块。
3. 双击分块文本，在必要时添加关键词或进行*手动*修改：

   ![更新分块](/ragflow-images/add_keyword_question.jpg)

:::warning 注意
   可以为文件分块添加关键词或问题，以提升它在包含这些关键词的查询中的排名。该操作会增加该分块的关键词权重，进而提升它在搜索列表中的位置。
:::

4. 在检索测试（Retrieval testing）中，在 **Test text** 里快速提一个问题，再次确认你的配置是否有效：

   _如下所示，RAGFlow 会给出真实可信的引用。_

   ![检索测试](/ragflow-images/retrieval_test.jpg)

## 建立 AI 对话

RAGFlow 中的对话基于某个特定的数据集或多个数据集。创建好数据集并完成文件解析后，你就可以开始 AI 对话了。

1. 点击页面顶部中间的 **Chat** 标签页 **>** **Create chat**，创建一个对话助手。
2. 点击创建好的聊天应用，进入其配置页面。
   > RAGFlow 支持为每次对话选择不同的对话模型，同时允许你在 **System Model Settings** 中设置默认模型。

2. 在配置页面右侧更新 **Chat setting**：
   - 为你的助手命名，并指定你的数据集。
   - **Empty response**：
     - 如果你希望将 RAGFlow 的回答*限定*在你的数据集之内，请在此处填写一段回复。这样，当它没有检索到答案时，会*统一*以你在此设置的内容作答。
     - 如果你希望 RAGFlow 在未能从你的数据集检索到答案时*即兴发挥*，请将其留空，但这可能引发幻觉。
3. 更新 **System prompt**，或者起步阶段先保持原样。
4. 在 **Model** 下拉列表中选择一个对话模型。
5. 现在，好戏开场：

   ![chat_thermal_solution](/ragflow-images/chat_thermal_solution.jpg)

:::tip 注意
RAGFlow 还提供 HTTP 和 Python API，供你将 RAGFlow 的能力集成到自己的应用中。更多信息请阅读以下文档：

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)
:::
