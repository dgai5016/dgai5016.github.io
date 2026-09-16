<BiRow>
<template #en>

Deploy and run local models using Ollama, Xinference, vLLM ，SGLang , GPUStack or other frameworks.

</template>
<template #zh>

使用 Ollama、Xinference、vLLM、SGLang、GPUStack 或其他框架部署并运行本地模型。

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

RAGFlow supports deploying models locally using Ollama, Xinference, IPEX-LLM, vLLM ，SGLang , GPUStack or jina. If you have locally deployed models to leverage or wish to enable GPU or CUDA for inference acceleration, you can bind Ollama or Xinference into RAGFlow and use either of them as a local "server" for interacting with your local models.

</template>
<template #zh>

RAGFlow 支持使用 Ollama、Xinference、IPEX-LLM、vLLM、SGLang、GPUStack 或 jina 在本地部署模型。如果你已有可复用的本地部署模型，或希望启用 GPU 或 CUDA 来加速推理，可以将 Ollama 或 Xinference 绑定到 RAGFlow 中，把其中之一作为与本地模型交互的本地"服务器"。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow seamlessly integrates with Ollama and Xinference, without the need for further environment configurations. You can use them to deploy two types of local models in RAGFlow: chat models and embedding models.

</template>
<template #zh>

RAGFlow 与 Ollama 和 Xinference 无缝集成，无需额外的环境配置。你可以使用它们在 RAGFlow 中部署两类本地模型：对话模型和嵌入模型。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
This user guide does not intend to cover much of the installation or configuration details of Ollama or Xinference; its focus is on configurations inside RAGFlow. For the most current information, you may need to check out the official site of Ollama or Xinference.
:::

</template>
<template #zh>

:::tip 注意
本用户指南不会过多覆盖 Ollama 或 Xinference 的安装与配置细节，重点在于 RAGFlow 内部的配置。如需最新信息，你可能需要查阅 Ollama 或 Xinference 的官方网站。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Deploy Local Models Using Ollama

</template>
<template #zh>

## 使用 Ollama 部署本地模型

</template>
</BiRow>

<BiRow>
<template #en>

[Ollama](https://github.com/ollama/ollama) enables you to run open-source large language models that you deployed locally. It bundles model weights, configurations, and data into a single package, defined by a Modelfile, and optimizes setup and configurations, including GPU usage.

</template>
<template #zh>

[Ollama](https://github.com/ollama/ollama) 让你能够运行本地部署的开源大语言模型。它把模型权重、配置和数据打包成由 Modelfile 定义的单个包，并优化了包括 GPU 使用在内的安装与配置。

</template>
</BiRow>

<BiRow>
<template #en>

:::note
- For information about downloading Ollama, see [here](https://github.com/ollama/ollama?tab=readme-ov-file#ollama).
- For a complete list of supported models and variants, see the [Ollama model library](https://ollama.com/library).
:::

</template>
<template #zh>

:::note
- 关于下载 Ollama 的信息，见[这里](https://github.com/ollama/ollama?tab=readme-ov-file#ollama)。
- 关于支持的模型和变体的完整列表，见 [Ollama 模型库](https://ollama.com/library)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

### 1. Deploy Ollama Using Docker

</template>
<template #zh>

### 1. 使用 Docker 部署 Ollama

</template>
</BiRow>

<BiRow>
<template #en>

Ollama can be [installed from binaries](https://ollama.com/download) or [deployed with Docker](https://hub.docker.com/r/ollama/ollama). Here are the instructions to deploy with Docker:

</template>
<template #zh>

Ollama 可以[从二进制文件安装](https://ollama.com/download)，也可以[用 Docker 部署](https://hub.docker.com/r/ollama/ollama)。以下是使用 Docker 部署的说明：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
$ sudo docker run --name ollama -p 11434:11434 ollama/ollama
> time=2024-12-02T02:20:21.360Z level=INFO source=routes.go:1248 msg="Listening on [::]:11434 (version 0.4.6)"
> time=2024-12-02T02:20:21.360Z level=INFO source=common.go:49 msg="Dynamic LLM libraries" runners="[cpu cpu_avx cpu_avx2 cuda_v11 cuda_v12]"
```

</template>
<template #zh>

```bash
$ sudo docker run --name ollama -p 11434:11434 ollama/ollama
> time=2024-12-02T02:20:21.360Z level=INFO source=routes.go:1248 msg="Listening on [::]:11434 (version 0.4.6)"
> time=2024-12-02T02:20:21.360Z level=INFO source=common.go:49 msg="Dynamic LLM libraries" runners="[cpu cpu_avx cpu_avx2 cuda_v11 cuda_v12]"
```

</template>
</BiRow>

<BiRow>
<template #en>

Ensure Ollama is listening on all IP address:
```bash
$ sudo ss -tunlp | grep 11434
> tcp   LISTEN 0      4096                  0.0.0.0:11434      0.0.0.0:*    users:(("docker-proxy",pid=794507,fd=4))
> tcp   LISTEN 0      4096                     [::]:11434         [::]:*    users:(("docker-proxy",pid=794513,fd=4))
```

</template>
<template #zh>

确认 Ollama 正在监听所有 IP 地址：
```bash
$ sudo ss -tunlp | grep 11434
> tcp   LISTEN 0      4096                  0.0.0.0:11434      0.0.0.0:*    users:(("docker-proxy",pid=794507,fd=4))
> tcp   LISTEN 0      4096                     [::]:11434         [::]::*    users:(("docker-proxy",pid=794513,fd=4))
```

</template>
</BiRow>

<BiRow>
<template #en>

Pull models as you need. We recommend that you start with `llama3.2` (a 3B chat model) and `bge-m3` (a 567M embedding model):
```bash
$ sudo docker exec ollama ollama pull llama3.2
> pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB
> success
```

</template>
<template #zh>

按需拉取模型。我们建议你从 `llama3.2`（3B 对话模型）和 `bge-m3`（567M 嵌入模型）开始：
```bash
$ sudo docker exec ollama ollama pull llama3.2
> pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB
> success
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
$ sudo docker exec ollama ollama pull bge-m3
> pulling daec91ffb5dd... 100% ▕████████████████▏ 1.2 GB
> success
```

</template>
<template #zh>

```bash
$ sudo docker exec ollama ollama pull bge-m3
> pulling daec91ffb5dd... 100% ▕████████████████▏ 1.2 GB
> success
```

</template>
</BiRow>

<BiRow>
<template #en>

### 2. Find Ollama URL and Ensure It Is Accessible

</template>
<template #zh>

### 2. 找到 Ollama URL 并确认其可访问

</template>
</BiRow>

<BiRow>
<template #en>

- If RAGFlow runs in Docker, the localhost is mapped within the RAGFlow Docker container as `host.docker.internal`. If Ollama runs on the same host machine, the right URL to use for Ollama would be `http://host.docker.internal:11434/' and you should check that Ollama is accessible from inside the RAGFlow container with:
```bash
$ sudo docker exec -it docker-ragflow-cpu-1 bash
$ curl http://host.docker.internal:11434/
> Ollama is running
```

</template>
<template #zh>

- 如果 RAGFlow 运行在 Docker 中，localhost 在 RAGFlow Docker 容器内被映射为 `host.docker.internal`。如果 Ollama 运行在同一台宿主机上，Ollama 使用的正确 URL 是 `http://host.docker.internal:11434/`，你应当通过以下命令确认 RAGFlow 容器内部可以访问 Ollama：
```bash
$ sudo docker exec -it docker-ragflow-cpu-1 bash
$ curl http://host.docker.internal:11434/
> Ollama is running
```

</template>
</BiRow>

<BiRow>
<template #en>

- If RAGFlow is launched from source code and Ollama runs on the same host machine as RAGFlow, check if Ollama is accessible from RAGFlow's host machine:
```bash
$ curl http://localhost:11434/
> Ollama is running
```

</template>
<template #zh>

- 如果 RAGFlow 从源代码启动，且 Ollama 与 RAGFlow 运行在同一台宿主机上，确认可以从 RAGFlow 所在宿主机访问 Ollama：
```bash
$ curl http://localhost:11434/
> Ollama is running
```

</template>
</BiRow>

<BiRow>
<template #en>

- If RAGFlow and Ollama run on different machines, check if Ollama is accessible from RAGFlow's host machine:
```bash
$ curl http://${IP_OF_OLLAMA_MACHINE}:11434/
> Ollama is running
```

</template>
<template #zh>

- 如果 RAGFlow 和 Ollama 运行在不同的机器上，确认可以从 RAGFlow 所在宿主机访问 Ollama：
```bash
$ curl http://${IP_OF_OLLAMA_MACHINE}:11434/
> Ollama is running
```

</template>
</BiRow>

<BiRow>
<template #en>

### 3. Add Ollama

</template>
<template #zh>

### 3. 添加 Ollama

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, click on your logo on the top right of the page **>** **Model providers** and add Ollama to RAGFlow:

</template>
<template #zh>

在 RAGFlow 中，点击页面右上角你的头像 **>** **Model providers**（模型提供商），将 Ollama 添加到 RAGFlow：

</template>
</BiRow>

<BiRow>
<template #en>

### 4. Complete Basic Ollama Settings

</template>
<template #zh>

### 4. 完成 Ollama 基本设置

</template>
</BiRow>

<BiRow>
<template #en>

In the popup window, complete basic settings for Ollama:

</template>
<template #zh>

在弹窗中完成 Ollama 的基本设置：

</template>
</BiRow>

<BiRow>
<template #en>

1. Ensure that your model name and type match those been pulled at step 1 (Deploy Ollama using Docker). For example, (`llama3.2` and `chat`) or (`bge-m3` and `embedding`).
2. Put in the Ollama base URL, i.e. `http://host.docker.internal:11434`, `http://localhost:11434` or `http://${IP_OF_OLLAMA_MACHINE}:11434`.
3. OPTIONAL: Switch on the toggle under **Does it support Vision?** if your model includes an image-to-text model.

</template>
<template #zh>

1. 确认模型名称和类型与第 1 步（使用 Docker 部署 Ollama）中拉取的一致，例如（`llama3.2` 和 `chat`）或（`bge-m3` 和 `embedding`）。
2. 填入 Ollama base URL，即 `http://host.docker.internal:11434`、`http://localhost:11434` 或 `http://${IP_OF_OLLAMA_MACHINE}:11434`。
3. 可选：如果你的模型包含图生文模型，打开 **Does it support Vision?**（是否支持视觉？）下的开关。

</template>
</BiRow>

<BiRow>
<template #en>

:::caution WARNING
Improper base URL settings will trigger the following error:
```bash
Max retries exceeded with url: /api/chat (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0xffff98b81ff0>: Failed to establish a new connection: [Errno 111] Connection refused'))
```
:::

</template>
<template #zh>

:::caution 警告
base URL 设置不当会触发以下错误：
```bash
Max retries exceeded with url: /api/chat (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0xffff98b81ff0>: Failed to establish a new connection: [Errno 111] Connection refused'))
```
:::

</template>
</BiRow>

<BiRow>
<template #en>

### 5. Update System Model Settings

</template>
<template #zh>

### 5. 更新系统模型设置

</template>
</BiRow>

<BiRow>
<template #en>

Click on your logo **>** **Model providers** **>** **System Model Settings** to update your model:

</template>
<template #zh>

点击你的头像 **>** **Model providers** **>** **System Model Settings**（系统模型设置）来更新你的模型：

</template>
</BiRow>

<BiRow>
<template #en>

- *You should now be able to find **llama3.2** from the dropdown list under **Chat model**, and **bge-m3** from the dropdown list under **Embedding model**.*

</template>
<template #zh>

- *你现在应该能在 **Chat model**（对话模型）下的下拉列表中找到 **llama3.2**，在 **Embedding model**（嵌入模型）下的下拉列表中找到 **bge-m3**。*

</template>
</BiRow>

<BiRow>
<template #en>

### 6. Update Chat Configuration

</template>
<template #zh>

### 6. 更新对话配置

</template>
</BiRow>

<BiRow>
<template #en>

Update your model(s) accordingly in **Chat Configuration**.

</template>
<template #zh>

在 **Chat Configuration**（对话配置）中相应地更新你的模型。

</template>
</BiRow>

<BiRow>
<template #en>

## Deploy a Local Model Using Xinference

</template>
<template #zh>

## 使用 Xinference 部署本地模型

</template>
</BiRow>

<BiRow>
<template #en>

Xorbits Inference ([Xinference](https://github.com/xorbitsai/inference)) enables you to unleash the full potential of cutting-edge AI models.

</template>
<template #zh>

Xorbits Inference（[Xinference](https://github.com/xorbitsai/inference)）帮助你充分发挥前沿 AI 模型的潜力。

</template>
</BiRow>

<BiRow>
<template #en>

:::note
- For information about installing Xinference Ollama, see [here](https://inference.readthedocs.io/en/latest/getting_started/).
- For a complete list of supported models, see the [Builtin Models](https://inference.readthedocs.io/en/latest/models/builtin/).
:::

</template>
<template #zh>

:::note
- 关于安装 Xinference 的信息，见[这里](https://inference.readthedocs.io/en/latest/getting_started/)。
- 关于支持的模型的完整列表，见 [Builtin Models](https://inference.readthedocs.io/en/latest/models/builtin/)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

To deploy a local model, e.g., **Mistral**, using Xinference:

</template>
<template #zh>

要使用 Xinference 部署一个本地模型（例如 **Mistral**）：

</template>
</BiRow>

<BiRow>
<template #en>

### 1. Check Firewall Settings

</template>
<template #zh>

### 1. 检查防火墙设置

</template>
</BiRow>

<BiRow>
<template #en>

Ensure that your host machine's firewall allows inbound connections on port 9997.

</template>
<template #zh>

确认宿主机防火墙允许 9997 端口的入站连接。

</template>
</BiRow>

<BiRow>
<template #en>

### 2. Start an Xinference Instance

</template>
<template #zh>

### 2. 启动一个 Xinference 实例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
$ xinference-local --host 0.0.0.0 --port 9997
```

</template>
<template #zh>

```bash
$ xinference-local --host 0.0.0.0 --port 9997
```

</template>
</BiRow>

<BiRow>
<template #en>

### 3. Launch Your Local Model

</template>
<template #zh>

### 3. 启动你的本地模型

</template>
</BiRow>

<BiRow>
<template #en>

Launch your local model (**Mistral**), ensuring that you replace `${quantization}` with your chosen quantization method:

</template>
<template #zh>

启动你的本地模型（**Mistral**），注意把 `${quantization}` 替换为你选择的量化方法：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
$ xinference launch -u mistral --model-name mistral-v0.1 --size-in-billions 7 --model-format pytorch --quantization ${quantization}
```
### 4. Add Xinference

</template>
<template #zh>

```bash
$ xinference launch -u mistral --model-name mistral-v0.1 --size-in-billions 7 --model-format pytorch --quantization ${quantization}
```
### 4. 添加 Xinference

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, click on your logo on the top right of the page **>** **Model providers** and add Xinference to RAGFlow:

</template>
<template #zh>

在 RAGFlow 中，点击页面右上角你的头像 **>** **Model providers**，将 Xinference 添加到 RAGFlow：

</template>
</BiRow>

<BiRow>
<template #en>

### 5. Complete Basic Xinference Settings

</template>
<template #zh>

### 5. 完成 Xinference 基本设置

</template>
</BiRow>

<BiRow>
<template #en>

Enter an accessible base URL, such as `http://<your-xinference-endpoint-domain>:9997/v1`.
> For rerank model, please use the `http://<your-xinference-endpoint-domain>:9997/v1/rerank` as the base URL.

</template>
<template #zh>

输入一个可访问的 base URL，例如 `http://<your-xinference-endpoint-domain>:9997/v1`。
> 重排序模型请使用 `http://<your-xinference-endpoint-domain>:9997/v1/rerank` 作为 base URL。

</template>
</BiRow>

<BiRow>
<template #en>

### 6. Update System Model Settings

</template>
<template #zh>

### 6. 更新系统模型设置

</template>
</BiRow>

<BiRow>
<template #en>

Click on your logo **>** **Model providers** **>** **System Model Settings** to update your model.

</template>
<template #zh>

点击你的头像 **>** **Model providers** **>** **System Model Settings** 来更新你的模型。

</template>
</BiRow>

<BiRow>
<template #en>

*You should now be able to find **mistral** from the dropdown list under **Chat model**.*

</template>
<template #zh>

*你现在应该能在 **Chat model** 下的下拉列表中找到 **mistral**。*

</template>
</BiRow>

<BiRow>
<template #en>

### 7. Update Chat Configuration

</template>
<template #zh>

### 7. 更新对话配置

</template>
</BiRow>

<BiRow>
<template #en>

Update your chat model accordingly in **Chat Configuration**:

</template>
<template #zh>

在 **Chat Configuration** 中相应地更新你的对话模型：

</template>
</BiRow>

<BiRow>
<template #en>

## Deploy a Local Model Using IPEX-LLM

</template>
<template #zh>

## 使用 IPEX-LLM 部署本地模型

</template>
</BiRow>

<BiRow>
<template #en>

[IPEX-LLM](https://github.com/intel-analytics/ipex-llm) is a PyTorch library for running LLMs on local Intel CPUs or GPUs (including iGPU or discrete GPUs like Arc, Flex, and Max) with low latency. It supports Ollama on Linux and Windows systems.

</template>
<template #zh>

[IPEX-LLM](https://github.com/intel-analytics/ipex-llm) 是一个 PyTorch 库，用于在本地 Intel CPU 或 GPU（包括 iGPU 或 Arc、Flex、Max 等独立 GPU）上低延迟地运行 LLM。它在 Linux 和 Windows 系统上支持 Ollama。

</template>
</BiRow>

<BiRow>
<template #en>

To deploy a local model, e.g., **Qwen2**, using IPEX-LLM-accelerated Ollama:

</template>
<template #zh>

要使用 IPEX-LLM 加速的 Ollama 部署一个本地模型（例如 **Qwen2**）：

</template>
</BiRow>

<BiRow>
<template #en>

### 1. Check Firewall Settings

</template>
<template #zh>

### 1. 检查防火墙设置

</template>
</BiRow>

<BiRow>
<template #en>

Ensure that your host machine's firewall allows inbound connections on port 11434. For example:

</template>
<template #zh>

确认宿主机防火墙允许 11434 端口的入站连接。例如：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
sudo ufw allow 11434/tcp
```

</template>
<template #zh>

```bash
sudo ufw allow 11434/tcp
```

</template>
</BiRow>

<BiRow>
<template #en>

### 2. Launch Ollama Service Using IPEX-LLM

</template>
<template #zh>

### 2. 使用 IPEX-LLM 启动 Ollama 服务

</template>
</BiRow>

<BiRow>
<template #en>

#### 2.1 Install IPEX-LLM for Ollama

</template>
<template #zh>

#### 2.1 为 Ollama 安装 IPEX-LLM

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
IPEX-LLM's supports Ollama on Linux and Windows systems.
:::

</template>
<template #zh>

:::tip 注意
IPEX-LLM 在 Linux 和 Windows 系统上支持 Ollama。
:::

</template>
</BiRow>

<BiRow>
<template #en>

For detailed information about installing IPEX-LLM for Ollama, see [Run llama.cpp with IPEX-LLM on Intel GPU Guide](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md):
- [Prerequisites](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#0-prerequisites)
- [Install IPEX-LLM cpp with Ollama binaries](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#1-install-ipex-llm-for-llamacpp)

</template>
<template #zh>

关于为 Ollama 安装 IPEX-LLM 的详细信息，见 [Run llama.cpp with IPEX-LLM on Intel GPU Guide](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md)：
- [前提条件](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#0-prerequisites)
- [使用 Ollama 二进制文件安装 IPEX-LLM cpp](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#1-install-ipex-llm-for-llamacpp)

</template>
</BiRow>

<BiRow>
<template #en>

*After the installation, you should have created a Conda environment, e.g., `llm-cpp`, for running Ollama commands with IPEX-LLM.*

</template>
<template #zh>

*安装完成后，你应该已经创建了一个 Conda 环境（例如 `llm-cpp`），用于通过 IPEX-LLM 运行 Ollama 命令。*

</template>
</BiRow>

<BiRow>
<template #en>

#### 2.2 Initialize Ollama

</template>
<template #zh>

#### 2.2 初始化 Ollama

</template>
</BiRow>

<BiRow>
<template #en>

1. Activate the `llm-cpp` Conda environment and initialize Ollama:

</template>
<template #zh>

1. 激活 `llm-cpp` Conda 环境并初始化 Ollama：

</template>
</BiRow>

<BiRow>
<template #en>

**Linux：**

</template>
<template #zh>

**Linux：**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
conda activate llm-cpp
init-ollama
```

</template>
<template #zh>

```bash
conda activate llm-cpp
init-ollama
```

</template>
</BiRow>

<BiRow>
<template #en>

**Windows：**

</template>
<template #zh>

**Windows：**

</template>
</BiRow>

<BiRow>
<template #en>

Run these commands with *administrator privileges in Miniforge Prompt*:

</template>
<template #zh>

在 *Miniforge Prompt* 中以*管理员权限*运行以下命令：

</template>
</BiRow>

<BiRow>
<template #en>

```cmd
conda activate llm-cpp
init-ollama.bat
```

</template>
<template #zh>

```cmd
conda activate llm-cpp
init-ollama.bat
```

</template>
</BiRow>

<BiRow>
<template #en>

2. If the installed `ipex-llm[cpp]` requires an upgrade to the Ollama binary files, remove the old binary files and reinitialize Ollama using `init-ollama` (Linux) or `init-ollama.bat` (Windows).

</template>
<template #zh>

2. 如果安装的 `ipex-llm[cpp]` 需要升级 Ollama 二进制文件，请删除旧的二进制文件，并使用 `init-ollama`（Linux）或 `init-ollama.bat`（Windows）重新初始化 Ollama。

</template>
</BiRow>

<BiRow>
<template #en>

   *A symbolic link to Ollama appears in your current directory, and you can use this executable file following standard Ollama commands.*

</template>
<template #zh>

   *当前目录中会出现一个指向 Ollama 的符号链接，你可以按照标准 Ollama 命令的方式使用这个可执行文件。*

</template>
</BiRow>

<BiRow>
<template #en>

#### 2.3 Launch Ollama Service

</template>
<template #zh>

#### 2.3 启动 Ollama 服务

</template>
</BiRow>

<BiRow>
<template #en>

1. Set the environment variable `OLLAMA_NUM_GPU` to `999` to ensure that all layers of your model run on the Intel GPU; otherwise, some layers may default to CPU.
2. For optimal performance on Intel Arc™ A-Series Graphics with Linux OS (Kernel 6.2), set the following environment variable before launching the Ollama service:

</template>
<template #zh>

1. 将环境变量 `OLLAMA_NUM_GPU` 设置为 `999`，确保模型的所有层都运行在 Intel GPU 上；否则，某些层可能默认运行在 CPU 上。
2. 若要在 Linux 系统（内核 6.2）搭配 Intel Arc™ A-Series 显卡时获得最佳性能，请在启动 Ollama 服务前设置以下环境变量：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   ```
3. Launch the Ollama service:

</template>
<template #zh>

   ```bash
   ```
3. 启动 Ollama 服务：

</template>
</BiRow>

<BiRow>
<template #en>

**Linux：**

</template>
<template #zh>

**Linux：**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
source /opt/intel/oneapi/setvars.sh

./ollama serve
```

</template>
<template #zh>

```bash
source /opt/intel/oneapi/setvars.sh

./ollama serve
```

</template>
</BiRow>

<BiRow>
<template #en>

**Windows：**

</template>
<template #zh>

**Windows：**

</template>
</BiRow>

<BiRow>
<template #en>

Run the following command *in Miniforge Prompt*:

</template>
<template #zh>

在 *Miniforge Prompt* 中运行以下命令：

</template>
</BiRow>

<BiRow>
<template #en>

```cmd
set OLLAMA_NUM_GPU=999
set no_proxy=localhost,127.0.0.1
set ZES_ENABLE_SYSMAN=1
set SYCL_CACHE_PERSISTENT=1

ollama serve
```

</template>
<template #zh>

```cmd
set OLLAMA_NUM_GPU=999
set no_proxy=localhost,127.0.0.1
set ZES_ENABLE_SYSMAN=1
set SYCL_CACHE_PERSISTENT=1

ollama serve
```

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
To enable the Ollama service to accept connections from all IP addresses, use `OLLAMA_HOST=0.0.0.0 ./ollama serve` rather than simply `./ollama serve`.
:::

</template>
<template #zh>

:::tip 注意
要让 Ollama 服务接受来自所有 IP 地址的连接，请使用 `OLLAMA_HOST=0.0.0.0 ./ollama serve`，而不是简单地用 `./ollama serve`。
:::

</template>
</BiRow>

<BiRow>
<template #en>

The console displays service startup messages.

</template>
<template #zh>

控制台会显示服务启动消息。

</template>
</BiRow>

<BiRow>
<template #en>

### 3. Pull and Run Ollama Model

</template>
<template #zh>

### 3. 拉取并运行 Ollama 模型

</template>
</BiRow>

<BiRow>
<template #en>

#### 3.1 Pull Ollama Model

</template>
<template #zh>

#### 3.1 拉取 Ollama 模型

</template>
</BiRow>

<BiRow>
<template #en>

With the Ollama service running, open a new terminal and run `./ollama pull <model_name>` (Linux) or `ollama.exe pull <model_name>` (Windows) to pull the desired model. e.g., `qwen2:latest`:

</template>
<template #zh>

在 Ollama 服务运行的情况下，打开一个新终端，运行 `./ollama pull <model_name>`（Linux）或 `ollama.exe pull <model_name>`（Windows）拉取所需的模型，例如 `qwen2:latest`：

</template>
</BiRow>

<BiRow>
<template #en>

#### 3.2 Run Ollama Model

</template>
<template #zh>

#### 3.2 运行 Ollama 模型

</template>
</BiRow>

<BiRow>
<template #en>

**Linux：**

</template>
<template #zh>

**Linux：**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
./ollama run qwen2:latest
```

</template>
<template #zh>

```bash
./ollama run qwen2:latest
```

</template>
</BiRow>

<BiRow>
<template #en>

**Windows：**

</template>
<template #zh>

**Windows：**

</template>
</BiRow>

<BiRow>
<template #en>

```cmd
ollama run qwen2:latest
```

</template>
<template #zh>

```cmd
ollama run qwen2:latest
```

</template>
</BiRow>

<BiRow>
<template #en>

### 4. Configure RAGFlow

</template>
<template #zh>

### 4. 配置 RAGFlow

</template>
</BiRow>

<BiRow>
<template #en>

To enable IPEX-LLM accelerated Ollama in RAGFlow, you must also complete the configurations in RAGFlow. The steps are identical to those outlined in the *Deploy a local model using Ollama* section:

</template>
<template #zh>

要在 RAGFlow 中启用 IPEX-LLM 加速的 Ollama，你还必须完成 RAGFlow 中的配置。这些步骤与*使用 Ollama 部署本地模型*一节中给出的完全相同：

</template>
</BiRow>

<BiRow>
<template #en>

1. [Add Ollama](#3-add-ollama)
2. [Complete basic Ollama settings](#4-complete-basic-ollama-settings)
3. [Update System Model Settings](#6-update-system-model-settings)
4. [Update Chat Configuration](#7-update-chat-configuration)

</template>
<template #zh>

1. [添加 Ollama](#3-add-ollama)
2. [完成 Ollama 基本设置](#4-complete-basic-ollama-settings)
3. [更新系统模型设置](#6-update-system-model-settings)
4. [更新对话配置](#7-update-chat-configuration)

</template>
</BiRow>

<BiRow>
<template #en>

### 5. Deploy vLLM

</template>
<template #zh>

### 5. 部署 vLLM

</template>
</BiRow>

<BiRow>
<template #en>

ubuntu 22.04/24.04

</template>
<template #zh>

ubuntu 22.04/24.04

</template>
</BiRow>

<BiRow>
<template #en>

```bash
pip install vllm
```
### 5.1 Run vLLM with Best Practise

</template>
<template #zh>

```bash
pip install vllm
```
### 5.1 以最佳实践运行 vLLM

</template>
</BiRow>

<BiRow>
<template #en>

```bash
nohup vllm serve /data/Qwen3-8B --served-model-name Qwen3-8B-FP8 --dtype auto --port 1025 --gpu-memory-utilization 0.90 --tool-call-parser hermes --enable-auto-tool-choice  > /var/log/vllm_startup1.log 2>&1 &
```
you can get log info
```bash
tail -f -n 100 /var/log/vllm_startup1.log
```
when see the follow ,it means vllm engine is ready for access
```bash
Starting vLLM API server 0 on http://0.0.0.0:1025
Started server process [19177]
Application startup complete.
```
### 5.2 Intergrateing RAGFlow with vLLM Chat/Em/Rerank LLM with WebUI

</template>
<template #zh>

```bash
nohup vllm serve /data/Qwen3-8B --served-model-name Qwen3-8B-FP8 --dtype auto --port 1025 --gpu-memory-utilization 0.90 --tool-call-parser hermes --enable-auto-tool-choice  > /var/log/vllm_startup1.log 2>&1 &
```
你可以通过以下命令查看日志信息：
```bash
tail -f -n 100 /var/log/vllm_startup1.log
```
看到以下输出时，说明 vLLM 引擎已就绪、可以访问：
```bash
Starting vLLM API server 0 on http://0.0.0.0:1025
Started server process [19177]
Application startup complete.
```
### 5.2 通过 WebUI 将 RAGFlow 与 vLLM 的对话/嵌入/重排序 LLM 集成

</template>
</BiRow>

<BiRow>
<template #en>

Go to **Settings** → **Model Providers** → **Search** → **vLLM** → **Add**; configure as follows:

</template>
<template #zh>

进入 **Settings**（设置）→ **Model Providers** → **Search**（搜索）→ **vLLM** → **Add**（添加），按如下配置：

</template>
</BiRow>

<BiRow>
<template #en>

![add vllm](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm.png)

</template>
<template #zh>

![add vllm](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm.png)

</template>
</BiRow>

<BiRow>
<template #en>

Select the vLLM chat model as the default LLM model:
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm1.png)
### 5.3 Chat with vLLM Chat Model
Create a chat and start a conversation as follows:
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm2.png)

</template>
<template #zh>

选择 vLLM 对话模型作为默认 LLM 模型：
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm1.png)
### 5.3 使用 vLLM 对话模型进行对话
创建一个对话，并按如下方式开始会话：
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow_vllm2.png)

</template>
</BiRow>

<BiRow>
<template #en>

### 6. Deploy GPUStack

</template>
<template #zh>

### 6. 部署 GPUStack

</template>
</BiRow>

<BiRow>
<template #en>

ubuntu 22.04/24.04

</template>
<template #zh>

ubuntu 22.04/24.04

</template>
</BiRow>

<BiRow>
<template #en>

### 6.1 Run GPUStack with Best Practise

</template>
<template #zh>

### 6.1 以最佳实践运行 GPUStack

</template>
</BiRow>

<BiRow>
<template #en>

```bash
sudo docker run -d --name gpustack \
    --restart unless-stopped \
    -p 80:80 \
    -p 10161:10161 \
    --volume gpustack-data:/var/lib/gpustack \
    gpustack/gpustack
```
you can get docker info
```bash
docker ps
```
when see the follow ,it means vllm engine is ready for access
```bash
root@gpustack-prod:~# docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED       STATUS       PORTS                                                                                  NAMES
abf59be84b1a   gpustack/gpustack   "/usr/bin/entrypoint…"   6 hours ago   Up 6 hours   0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:10161->10161/tcp, [::]:10161->10161/tcp   gpustack
```
### 6.2 Intergrateing RAGFlow with GPUStack Chat/Em/Rerank LLM with WebUI

</template>
<template #zh>

```bash
sudo docker run -d --name gpustack \
    --restart unless-stopped \
    -p 80:80 \
    -p 10161:10161 \
    --volume gpustack-data:/var/lib/gpustack \
    gpustack/gpustack
```
你可以通过以下命令查看 Docker 信息：
```bash
docker ps
```
看到以下输出时，说明 vLLM 引擎已就绪、可以访问：
```bash
root@gpustack-prod:~# docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED       STATUS       PORTS                                                                                  NAMES
abf59be84b1a   gpustack/gpustack   "/usr/bin/entrypoint…"   6 hours ago   Up 6 hours   0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:10161->10161/tcp, [::]:10161->10161/tcp   gpustack
```
### 6.2 通过 WebUI 将 RAGFlow 与 GPUStack 的对话/嵌入/重排序 LLM 集成

</template>
</BiRow>

<BiRow>
<template #en>

setting->model providers->search->gpustack->add ,configure as follow:

</template>
<template #zh>

依次进入 设置 -> 模型提供商 -> 搜索 -> gpustack -> 添加，按如下配置：

</template>
</BiRow>

<BiRow>
<template #en>

![add vllm](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow-gpustack11.png)

</template>
<template #zh>

![add vllm](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow-gpustack11.png)

</template>
</BiRow>

<BiRow>
<template #en>

select gpustack chat model as default llm model as follow:
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow-gpustack22.png)

</template>
<template #zh>

按如下方式将 gpustack 对话模型选为默认 LLM 模型：
![chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/ragflow-gpustack22.png)

</template>
</BiRow>
