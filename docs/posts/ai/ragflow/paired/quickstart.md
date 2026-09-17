<BiRow>
<template #en>

RAGFlow is an open-source RAG (Retrieval-Augmented Generation) engine based on deep document understanding. When integrated with LLMs, it is capable of providing truthful question-answering capabilities, backed by well-founded citations from various complex formatted data.

</template>
<template #zh>

RAGFlow 是一款基于深度文档理解的开源 RAG（检索增强生成）引擎。与 LLM 集成后，它能够提供真实可信的问答能力，其回答由源自各类复杂格式数据的可靠引用支撑。

</template>
</BiRow>

<BiRow>
<template #en>

This quick start guide describes a general process from:

</template>
<template #zh>

本快速开始指南介绍以下通用流程：

</template>
</BiRow>

<BiRow>
<template #en>

- Starting up a local RAGFlow server,
- Creating a dataset,
- Intervening with file parsing, to
- Establishing an AI chat based on your datasets.

</template>
<template #zh>

- 启动本地 RAGFlow 服务器，
- 创建数据集，
- 干预文件解析，直至
- 基于你的数据集开展 AI 对话。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
We officially support x86 CPU and Nvidia GPU, and this document offers instructions on deploying RAGFlow using Docker on x86 platforms. While we also test RAGFlow on ARM64 platforms, we do not maintain RAGFlow Docker images for ARM.

If you are on an ARM platform, follow [this guide](https://ragflow.io/docs/develop/build_docker_image) to build a RAGFlow Docker image.
:::

</template>
<template #zh>

:::danger 重要
我们官方支持 x86 CPU 和 Nvidia GPU，本文档提供的是在 x86 平台上使用 Docker 部署 RAGFlow 的说明。虽然我们也在 ARM64 平台上测试 RAGFlow，但并不为 ARM 维护 RAGFlow Docker 镜像。

如果你使用的是 ARM 平台，请按照[本指南](https://ragflow.io/docs/develop/build_docker_image)构建 RAGFlow Docker 镜像。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Prerequisites

</template>
<template #zh>

## 前提条件

</template>
</BiRow>

<BiRow>
<template #en>

- CPU &ge; 4 cores (x86);
- RAM &ge; 16 GB;
- Disk &ge; 50 GB;
- Docker &ge; 24.0.0 & Docker Compose &ge; v2.26.1;
- Python &ge; 3.13;
- [gVisor](https://gvisor.dev/docs/user_guide/install/): Required only if you intend to use the code executor ([sandbox](https://github.com/infiniflow/ragflow/tree/main/agent/sandbox)) feature of RAGFlow.

</template>
<template #zh>

- CPU &ge; 4 核（x86）；
- 内存 &ge; 16 GB；
- 磁盘 &ge; 50 GB；
- Docker &ge; 24.0.0 且 Docker Compose &ge; v2.26.1；
- Python &ge; 3.13；
- [gVisor](https://gvisor.dev/docs/user_guide/install/)：仅当你打算使用 RAGFlow 的代码执行器（[sandbox](https://github.com/infiniflow/ragflow/tree/main/agent/sandbox)）功能时才需要。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
If you have not installed Docker on your local machine (Windows, Mac, or Linux), see [Install Docker Engine](https://docs.docker.com/engine/install/).
:::

</template>
<template #zh>

:::tip 注意
如果你的本地机器（Windows、Mac 或 Linux）尚未安装 Docker，请参阅[安装 Docker Engine](https://docs.docker.com/engine/install/)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Start up the server

</template>
<template #zh>

## 启动服务器

</template>
</BiRow>

<BiRow>
<template #en>

This section provides instructions on setting up the RAGFlow server on Linux. If you are on a different operating system, no worries. Most steps are alike.

</template>
<template #zh>

本节提供在 Linux 上搭建 RAGFlow 服务器的说明。如果你使用的是其他操作系统，也不必担心，大多数步骤都是类似的。

</template>
</BiRow>

<BiRow>
<template #en>

1. Ensure `vm.max_map_count` &ge; 262144.

</template>
<template #zh>

1. 确保 `vm.max_map_count` &ge; 262144。

</template>
</BiRow>

<BiRow>
<template #en>

<details>
  <summary>Expand to show details:</summary>

   `vm.max_map_count`. This value sets the maximum number of memory map areas a process may have. Its default value is 65530. While most applications require fewer than a thousand maps, reducing this value can result in abnormal behaviors, and the system will throw out-of-memory errors when a process reaches the limitation.

   RAGFlow v0.27.2 uses Elasticsearch or [Infinity](https://github.com/infiniflow/infinity) for multiple recall. Setting the value of `vm.max_map_count` correctly is crucial to the proper functioning of the Elasticsearch component.

**Linux：**

1.1. Check the value of `vm.max_map_count`:

```bash
$ sysctl vm.max_map_count
```

1.2. Reset `vm.max_map_count` to a value at least 262144 if it is not.

```bash
$ sudo sysctl -w vm.max_map_count=262144
```

:::warning WARNING
This change will be reset after a system reboot. If you forget to update the value the next time you start up the server, you may get a `Can't connect to ES cluster` exception.
:::

1.3. To ensure your change remains permanent, add or update the `vm.max_map_count` value in **/etc/sysctl.conf** accordingly:

```bash
vm.max_map_count=262144
```

**macOS：**

If you are on macOS with Docker Desktop, run the following command to update `vm.max_map_count`:

```bash
docker run --rm --privileged --pid=host alpine sysctl -w vm.max_map_count=262144
```

:::warning WARNING
This change will be reset after a system reboot. If you forget to update the value the next time you start up the server, you may get a `Can't connect to ES cluster` exception.
:::

To make your change persistent, create a file with proper settings:

1.1. Create a file:

```shell
sudo nano /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

1.2. Open the file:

```shell
sudo launchctl load /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

1.3. Add settings:

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

1.4. After saving the file, load the new daemon:

```shell
sudo launchctl load /Library/LaunchDaemons/com.user.vmmaxmap.plist
```

:::info
If the above steps do not work, consider using [this workaround](https://github.com/docker/for-mac/issues/7047#issuecomment-1791912053), which employs a container and does not require manual editing of the macOS settings.
:::

**Windows：**

#### If you are on Windows with Docker Desktop, then you *must* use docker-machine to set `vm.max_map_count`:

```bash
$ docker-machine ssh
$ sudo sysctl -w vm.max_map_count=262144
```
#### If you are on Windows with Docker Desktop WSL 2 backend, then use docker-desktop to set `vm.max_map_count`:

1.1. Run the following in WSL:
```bash
$ wsl -d docker-desktop -u root
$ sysctl -w vm.max_map_count=262144
```

:::warning WARNING
This change will be reset after you restart Docker. If you forget to update the value the next time you start up the server, you may get a `Can't connect to ES cluster` exception.
:::

1.2. If you prefer not to run those commands every time you restart Docker, you can update your `%USERPROFILE%.wslconfig` as follows to keep your change permanent and global for all WSL distributions:

```bash
[wsl2]
kernelCommandLine = "sysctl.vm.max_map_count=262144"
```
*This causes all WSL2 virtual machines to have that setting assigned when they start.*

:::info
If you are on Windows 11 or Windows 10 version 22H2, and have installed the Microsoft Store version of WSL, you can also update the **/etc/sysctl.conf** within the docker-desktop WSL distribution to keep your change permanent:

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

2. Clone the repo:

</template>
<template #zh>

2. 克隆仓库：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   $ git clone https://github.com/infiniflow/ragflow.git
   $ cd ragflow/docker
   ```

</template>
<template #zh>

   ```bash
   $ git clone https://github.com/infiniflow/ragflow.git
   $ cd ragflow/docker
   ```

</template>
</BiRow>

<BiRow>
<template #en>

3. Switch to the current version:

</template>
<template #zh>

3. 切换到当前版本：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   $ git checkout -f v0.27.2
   ```
4. Use the pre-built Docker images and start up the server:

</template>
<template #zh>

   ```bash
   $ git checkout -f v0.27.2
   ```
4. 使用预构建的 Docker 镜像并启动服务器：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   # Use CPU for DeepDoc tasks:
   $ docker compose -f docker-compose.yml up -d
   ```

</template>
<template #zh>

   ```bash
   # Use CPU for DeepDoc tasks:
   $ docker compose -f docker-compose.yml up -d
   ```

</template>
</BiRow>

<BiRow>
<template #en>

   ```mdx-code-block
   
   ```

</template>
<template #zh>

   ```mdx-code-block
   
   ```

</template>
</BiRow>

<BiRow>
<template #en>

   | RAGFlow image tag   | Image size (GB) | Stable?                  |
   | ------------------- | --------------- | ------------------------ |
   | v0.27.2             | &approx;2       | Stable release           |
   | nightly             | &approx;2       | _Unstable_ nightly build |

</template>
<template #zh>

   | RAGFlow 镜像标签   | 镜像大小（GB）  | 是否稳定                 |
   | ------------------- | --------------- | ------------------------ |
   | v0.27.2             | &approx;2       | 稳定版本                 |
   | nightly             | &approx;2       | _不稳定的_每夜构建版本   |

</template>
</BiRow>

<BiRow>
<template #en>

   ```mdx-code-block
   
   ```

</template>
<template #zh>

   ```mdx-code-block
   
   ```

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
   The image size shown refers to the size of the *downloaded* Docker image, which is compressed. When Docker runs the image, it unpacks it, resulting in significantly greater disk usage. A Docker image will expand to around 7 GB once unpacked.
:::

</template>
<template #zh>

:::tip 注意
   这里显示的镜像大小指的是*已下载*的 Docker 镜像的大小（经过压缩）。Docker 运行镜像时会将其解包，因此磁盘占用会大得多。Docker 镜像解包后会膨胀到约 7 GB。
:::

</template>
</BiRow>

<BiRow>
<template #en>

5. Check the server status after having the server up and running:

</template>
<template #zh>

5. 服务器启动并运行后，检查服务器状态：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   $ docker logs -f docker-ragflow-cpu-1
   ```

</template>
<template #zh>

   ```bash
   $ docker logs -f docker-ragflow-cpu-1
   ```

</template>
</BiRow>

<BiRow>
<template #en>

   _The following output confirms a successful launch of the system:_

</template>
<template #zh>

   _以下输出确认系统成功启动：_

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
        ____   ___    ______ ______ __
       / __ \ /   |  / ____// ____// /____  _      __
      / /_/ // /| | / / __ / /_   / // __ \| | /| / /
     / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
    /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/

    * Running on all addresses (0.0.0.0)
   ```

</template>
<template #zh>

   ```bash
        ____   ___    ______ ______ __
       / __ \ /   |  / ____// ____// /____  _      __
      / /_/ // /| | / / __ / /_   / // __ \| | /| / /
     / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
    /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/

    * Running on all addresses (0.0.0.0)
   ```

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
   If you skip this confirmation step and directly log in to RAGFlow, your browser may prompt a `network anomaly` error because, at that moment, your RAGFlow may not be fully initialized.
:::

</template>
<template #zh>

:::danger 重要
   如果你跳过这一确认步骤直接登录 RAGFlow，浏览器可能会提示 `network anomaly` 错误，因为此时你的 RAGFlow 可能尚未完全初始化。
:::

</template>
</BiRow>

<BiRow>
<template #en>

6. In your web browser, enter the IP address of your server and log in to RAGFlow.

</template>
<template #zh>

6. 在浏览器中输入服务器的 IP 地址并登录 RAGFlow。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning WARNING
   With the default settings, you only need to enter `http://IP_OF_YOUR_MACHINE` (**sans** port number) as the default HTTP serving port `80` can be omitted when using the default configurations.
:::

</template>
<template #zh>

:::warning 警告
   在默认设置下，你只需输入 `http://IP_OF_YOUR_MACHINE`（**不带**端口号），因为使用默认配置时，默认的 HTTP 服务端口 `80` 可以省略。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Configure LLMs

</template>
<template #zh>

## 配置 LLM

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow is a RAG engine and needs to work with an LLM to offer grounded, hallucination-free question-answering capabilities. RAGFlow supports most mainstream LLMs. For a complete list of supported models, please refer to [Supported Models](https://ragflow.io/docs/guides/models/supported_models).

</template>
<template #zh>

RAGFlow 是一个 RAG 引擎，需要与 LLM 配合才能提供有依据、无幻觉的问答能力。RAGFlow 支持大多数主流 LLM。完整的支持模型列表请参阅[支持的模型](https://ragflow.io/docs/guides/models/supported_models)。

</template>
</BiRow>

<BiRow>
<template #en>

:::info
RAGFlow also supports deploying LLMs locally using Ollama, Xinference, or LocalAI, but this part is not covered in this quick start guide.
:::

</template>
<template #zh>

:::info
RAGFlow 也支持使用 Ollama、Xinference 或 LocalAI 在本地部署 LLM，但这部分内容不在本快速开始指南的范围内。
:::

</template>
</BiRow>

<BiRow>
<template #en>

To add and configure an LLM:

</template>
<template #zh>

添加并配置 LLM 的步骤如下：

</template>
</BiRow>

<BiRow>
<template #en>

1. Click on your logo on the top right of the page **>** **Model providers**.
2. Click on the desired LLM and update the API key accordingly.
3. Click **System Model Settings** to select the default models:
   - Chat model,
   - Embedding model,
   - Image-to-text model,
   - and more.

</template>
<template #zh>

1. 点击页面右上角你的头像 **>** **Model providers**。
2. 点击所需的 LLM，并相应更新 API key。
3. 点击 **System Model Settings** 选择默认模型：
   - 对话模型，
   - 嵌入模型，
   - 图生文模型，
   - 等等。

</template>
</BiRow>

<BiRow>
<template #en>

> Some models, such as the image-to-text model **qwen-vl-max**, are subsidiary to a specific LLM. And you may need to update your API key to access these models.

</template>
<template #zh>

> 某些模型（如图生文模型 **qwen-vl-max**）从属于特定的 LLM，访问这类模型可能需要更新你的 API key。

</template>
</BiRow>

<BiRow>
<template #en>

## Create your first dataset

</template>
<template #zh>

## 创建你的第一个数据集

</template>
</BiRow>

<BiRow>
<template #en>

You are allowed to upload files to a dataset in RAGFlow and parse them into datasets. A dataset is virtually a collection of datasets. Question answering in RAGFlow can be based on a particular dataset or multiple datasets. File formats that RAGFlow supports include documents (PDF, DOC, DOCX, TXT, MD, MDX), tables (CSV, XLSX, XLS), pictures (JPEG, JPG, PNG, TIF, GIF), and slides (PPT, PPTX).

</template>
<template #zh>

在 RAGFlow 中，你可以向数据集上传文件并将其解析进去。数据集实际上是一组数据集的集合。RAGFlow 中的问答可以基于某个特定的数据集，也可以基于多个数据集。RAGFlow 支持的文件格式包括：文档（PDF、DOC、DOCX、TXT、MD、MDX）、表格（CSV、XLSX、XLS）、图片（JPEG、JPG、PNG、TIF、GIF）和幻灯片（PPT、PPTX）。

</template>
</BiRow>

<BiRow>
<template #en>

To create your first dataset:

</template>
<template #zh>

创建你的第一个数据集：

</template>
</BiRow>

<BiRow>
<template #en>

1. Click the **Dataset** tab in the top middle of the page **>** **Create dataset**.
2. Input the name of your dataset and click **OK** to confirm your changes.

</template>
<template #zh>

1. 点击页面顶部中间的 **Dataset** 标签页 **>** **Create dataset**。
2. 输入数据集的名称，点击 **OK** 确认你的更改。

</template>
</BiRow>

<BiRow>
<template #en>

   _You are taken to the **Configuration** page of your dataset._

</template>
<template #zh>

   _你将进入该数据集的 **Configuration** 页面。_

</template>
</BiRow>

<BiRow>
<template #en>

   ![dataset configuration](/ragflow-images/configure_knowledge_base.jpg)

</template>
<template #zh>

   ![数据集配置](/ragflow-images/configure_knowledge_base.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

3. RAGFlow offers multiple chunk templates that cater to different document layouts and file formats. Select the embedding model and chunking method (template) for your dataset.

</template>
<template #zh>

3. RAGFlow 提供多种分块模板，以适配不同的文档布局和文件格式。请为你的数据集选择嵌入模型和分块方法（模板）。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
   Once you have selected an embedding model and used it to parse a file, you are no longer allowed to change it. The obvious reason is that we must ensure that all files in a specific dataset are parsed using the *same* embedding model (ensure that they are being compared in the same embedding space).
:::

</template>
<template #zh>

:::danger 重要
   一旦选定某个嵌入模型并用它解析过文件，就不允许再更换。原因显而易见：必须确保同一数据集中的所有文件都使用*同一个*嵌入模型解析（确保它们在同一嵌入空间中进行比较）。
:::

</template>
</BiRow>

<BiRow>
<template #en>

   _You are taken to the **Dataset** page of your dataset._

</template>
<template #zh>

   _你将进入该数据集的 **Dataset** 页面。_

</template>
</BiRow>

<BiRow>
<template #en>

4. Click **+ Add file** **>** **Local files** to start uploading a particular file to the dataset.
5. In the uploaded file entry, click the play button to start file parsing:

</template>
<template #zh>

4. 点击 **+ Add file** **>** **Local files**，开始向该数据集上传文件。
5. 在已上传文件的条目中，点击播放按钮开始解析文件：

</template>
</BiRow>

<BiRow>
<template #en>

   ![parse file](/ragflow-images/parse_file.jpg)

</template>
<template #zh>

   ![解析文件](/ragflow-images/parse_file.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

:::warning NOTE
   - If your file parsing gets stuck at below 1%, see [this FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-document-parsing-stall-at-under-one-percent).
   - If your file parsing gets stuck at near completion, see [this FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-pdf-parsing-stall-near-completion-while-the-log-does-not-show-any-error)
:::

</template>
<template #zh>

:::warning 注意
   - 如果文件解析卡在 1% 以下，请参阅[此 FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-document-parsing-stall-at-under-one-percent)。
   - 如果文件解析卡在即将完成之处，请参阅[此 FAQ](https://ragflow.io/docs/faq.mdx#why-does-my-pdf-parsing-stall-near-completion-while-the-log-does-not-show-any-error)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Intervene with file parsing

</template>
<template #zh>

## 干预文件解析

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow features visibility and explainability, allowing you to view the chunking results and intervene where necessary. To do so:

</template>
<template #zh>

RAGFlow 具备可见性与可解释性，允许你查看分块结果并在必要时进行干预。操作方法如下：

</template>
</BiRow>

<BiRow>
<template #en>

1. Click on the file that completes file parsing to view the chunking results:

</template>
<template #zh>

1. 点击完成文件解析的文件，查看分块结果：

</template>
</BiRow>

<BiRow>
<template #en>

   _You are taken to the **Chunk** page:_

</template>
<template #zh>

   _你将进入 **Chunk** 页面：_

</template>
</BiRow>

<BiRow>
<template #en>

   ![chunks](/ragflow-images/file_chunks.jpg)

</template>
<template #zh>

   ![分块](/ragflow-images/file_chunks.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

2. Hover over each snapshot for a quick view of each chunk.
3. Double click the chunked texts to add keywords or make *manual* changes where necessary:

</template>
<template #zh>

2. 将鼠标悬停在每个快照上，快速查看每个分块。
3. 双击分块文本，在必要时添加关键词或进行*手动*修改：

</template>
</BiRow>

<BiRow>
<template #en>

   ![update chunk](/ragflow-images/add_keyword_question.jpg)

</template>
<template #zh>

   ![更新分块](/ragflow-images/add_keyword_question.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

:::warning NOTE
   You can add keywords or questions to a file chunk to improve its ranking for queries containing those keywords. This action increases its keyword weight and can improve its position in search list.
:::

</template>
<template #zh>

:::warning 注意
   可以为文件分块添加关键词或问题，以提升它在包含这些关键词的查询中的排名。该操作会增加该分块的关键词权重，进而提升它在搜索列表中的位置。
:::

</template>
</BiRow>

<BiRow>
<template #en>

4. In Retrieval testing, ask a quick question in **Test text** to double check if your configurations work:

</template>
<template #zh>

4. 在检索测试（Retrieval testing）中，在 **Test text** 里快速提一个问题，再次确认你的配置是否有效：

</template>
</BiRow>

<BiRow>
<template #en>

   _As you can tell from the following, RAGFlow responds with truthful citations._

</template>
<template #zh>

   _如下所示，RAGFlow 会给出真实可信的引用。_

</template>
</BiRow>

<BiRow>
<template #en>

   ![retrieval test](/ragflow-images/retrieval_test.jpg)

</template>
<template #zh>

   ![检索测试](/ragflow-images/retrieval_test.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Set up an AI chat

</template>
<template #zh>

## 建立 AI 对话

</template>
</BiRow>

<BiRow>
<template #en>

Conversations in RAGFlow are based on a particular dataset or multiple datasets. Once you have created your dataset and finished file parsing, you can go ahead and start an AI conversation.

</template>
<template #zh>

RAGFlow 中的对话基于某个特定的数据集或多个数据集。创建好数据集并完成文件解析后，你就可以开始 AI 对话了。

</template>
</BiRow>

<BiRow>
<template #en>

1. Click the **Chat** tab in the middle top of the page **>** **Create chat** to create a chat assistant.
2. Click the created chat app to enter its configuration page.
   > RAGFlow offer the flexibility of choosing a different chat model for each dialogue, while allowing you to set the default models in **System Model Settings**.

</template>
<template #zh>

1. 点击页面顶部中间的 **Chat** 标签页 **>** **Create chat**，创建一个对话助手。
2. 点击创建好的聊天应用，进入其配置页面。
   > RAGFlow 支持为每次对话选择不同的对话模型，同时允许你在 **System Model Settings** 中设置默认模型。

</template>
</BiRow>

<BiRow>
<template #en>

2. Update **Chat setting** on the right of the configuration page:
   - Name your assistant and specify your datasets.
   - **Empty response**:
     - If you wish to *confine* RAGFlow's answers to your datasets, leave a response here. Then when it doesn't retrieve an answer, it *uniformly* responds with what you set here.
     - If you wish RAGFlow to *improvise* when it doesn't retrieve an answer from your datasets, leave it blank, which may give rise to hallucinations.
3. Update **System prompt** or leave it as is for the beginning.
4. Select a chat model in the **Model** dropdown list.
5. Now, let's start the show:

</template>
<template #zh>

2. 在配置页面右侧更新 **Chat setting**：
   - 为你的助手命名，并指定你的数据集。
   - **Empty response**：
     - 如果你希望将 RAGFlow 的回答*限定*在你的数据集之内，请在此处填写一段回复。这样，当它没有检索到答案时，会*统一*以你在此设置的内容作答。
     - 如果你希望 RAGFlow 在未能从你的数据集检索到答案时*即兴发挥*，请将其留空，但这可能引发幻觉。
3. 更新 **System prompt**，或者起步阶段先保持原样。
4. 在 **Model** 下拉列表中选择一个对话模型。
5. 现在，好戏开场：

</template>
</BiRow>

<BiRow>
<template #en>

   ![chat_thermal_solution](/ragflow-images/chat_thermal_solution.jpg)

</template>
<template #zh>

   ![chat_thermal_solution](/ragflow-images/chat_thermal_solution.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
RAGFlow also offers HTTP and Python APIs for you to integrate RAGFlow's capabilities into your applications. Read the following documents for more information:

- [Acquire a RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API reference](https://ragflow.io/docs/references/http_api_reference)
- [Python API reference](https://ragflow.io/docs/references/python_api_reference)
:::

</template>
<template #zh>

:::tip 注意
RAGFlow 还提供 HTTP 和 Python API，供你将 RAGFlow 的能力集成到自己的应用中。更多信息请阅读以下文档：

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)
:::

</template>
</BiRow>
