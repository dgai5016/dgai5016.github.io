# 部署本地模型

使用 Ollama、Xinference、vLLM、SGLang、GPUStack 或其他框架部署并运行本地模型。

---

RAGFlow 支持使用 Ollama、Xinference、IPEX-LLM、vLLM、SGLang、GPUStack 或 jina 在本地部署模型。如果你已有可复用的本地部署模型，或希望启用 GPU 或 CUDA 来加速推理，可以将 Ollama 或 Xinference 绑定到 RAGFlow 中，把其中之一作为与本地模型交互的本地"服务器"。

RAGFlow 与 Ollama 和 Xinference 无缝集成，无需额外的环境配置。你可以使用它们在 RAGFlow 中部署两类本地模型：对话模型和嵌入模型。

:::tip 注意
本用户指南不会过多覆盖 Ollama 或 Xinference 的安装与配置细节，重点在于 RAGFlow 内部的配置。如需最新信息，你可能需要查阅 Ollama 或 Xinference 的官方网站。
:::

## 使用 Ollama 部署本地模型

[Ollama](https://github.com/ollama/ollama) 让你能够运行本地部署的开源大语言模型。它把模型权重、配置和数据打包成由 Modelfile 定义的单个包，并优化了包括 GPU 使用在内的安装与配置。

:::info
- 关于下载 Ollama 的信息，见[这里](https://github.com/ollama/ollama?tab=readme-ov-file#ollama)。
- 关于支持的模型和变体的完整列表，见 [Ollama 模型库](https://ollama.com/library)。
:::

### 1. 使用 Docker 部署 Ollama

Ollama 可以[从二进制文件安装](https://ollama.com/download)，也可以[用 Docker 部署](https://hub.docker.com/r/ollama/ollama)。以下是使用 Docker 部署的说明：

```bash
$ sudo docker run --name ollama -p 11434:11434 ollama/ollama
> time=2024-12-02T02:20:21.360Z level=INFO source=routes.go:1248 msg="Listening on [::]:11434 (version 0.4.6)"
> time=2024-12-02T02:20:21.360Z level=INFO source=common.go:49 msg="Dynamic LLM libraries" runners="[cpu cpu_avx cpu_avx2 cuda_v11 cuda_v12]"
```

确认 Ollama 正在监听所有 IP 地址：
```bash
$ sudo ss -tunlp | grep 11434
> tcp   LISTEN 0      4096                  0.0.0.0:11434      0.0.0.0:*    users:(("docker-proxy",pid=794507,fd=4))
> tcp   LISTEN 0      4096                     [::]:11434         [::]::*    users:(("docker-proxy",pid=794513,fd=4))
```

按需拉取模型。我们建议你从 `llama3.2`（3B 对话模型）和 `bge-m3`（567M 嵌入模型）开始：
```bash
$ sudo docker exec ollama ollama pull llama3.2
> pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB
> success
```

```bash
$ sudo docker exec ollama ollama pull bge-m3
> pulling daec91ffb5dd... 100% ▕████████████████▏ 1.2 GB
> success
```

### 2. 找到 Ollama URL 并确认其可访问

- 如果 RAGFlow 运行在 Docker 中，localhost 在 RAGFlow Docker 容器内被映射为 `host.docker.internal`。如果 Ollama 运行在同一台宿主机上，Ollama 使用的正确 URL 是 `http://host.docker.internal:11434/`，你应当通过以下命令确认 RAGFlow 容器内部可以访问 Ollama：
```bash
$ sudo docker exec -it docker-ragflow-cpu-1 bash
$ curl http://host.docker.internal:11434/
> Ollama is running
```

- 如果 RAGFlow 从源代码启动，且 Ollama 与 RAGFlow 运行在同一台宿主机上，确认可以从 RAGFlow 所在宿主机访问 Ollama：
```bash
$ curl http://localhost:11434/
> Ollama is running
```

- 如果 RAGFlow 和 Ollama 运行在不同的机器上，确认可以从 RAGFlow 所在宿主机访问 Ollama：
```bash
$ curl http://${IP_OF_OLLAMA_MACHINE}:11434/
> Ollama is running
```

### 3. 添加 Ollama

在 RAGFlow 中，点击页面右上角你的头像 **>** **Model providers**（模型提供商），将 Ollama 添加到 RAGFlow：

### 4. 完成 Ollama 基本设置

在弹窗中完成 Ollama 的基本设置：

1. 确认模型名称和类型与第 1 步（使用 Docker 部署 Ollama）中拉取的一致，例如（`llama3.2` 和 `chat`）或（`bge-m3` 和 `embedding`）。
2. 填入 Ollama base URL，即 `http://host.docker.internal:11434`、`http://localhost:11434` 或 `http://${IP_OF_OLLAMA_MACHINE}:11434`。
3. 可选：如果你的模型包含图生文模型，打开 **Does it support Vision?**（是否支持视觉？）下的开关。

:::warning 警告
base URL 设置不当会触发以下错误：
```bash
Max retries exceeded with url: /api/chat (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0xffff98b81ff0>: Failed to establish a new connection: [Errno 111] Connection refused'))
```
:::

### 5. 更新系统模型设置

点击你的头像 **>** **Model providers** **>** **System Model Settings**（系统模型设置）来更新你的模型：

- *你现在应该能在 **Chat model**（对话模型）下的下拉列表中找到 **llama3.2**，在 **Embedding model**（嵌入模型）下的下拉列表中找到 **bge-m3**。*

### 6. 更新对话配置

在 **Chat Configuration**（对话配置）中相应地更新你的模型。

## 使用 Xinference 部署本地模型

Xorbits Inference（[Xinference](https://github.com/xorbitsai/inference)）帮助你充分发挥前沿 AI 模型的潜力。

:::info
- 关于安装 Xinference 的信息，见[这里](https://inference.readthedocs.io/en/latest/getting_started/)。
- 关于支持的模型的完整列表，见 [Builtin Models](https://inference.readthedocs.io/en/latest/models/builtin/)。
:::

要使用 Xinference 部署一个本地模型（例如 **Mistral**）：

### 1. 检查防火墙设置

确认宿主机防火墙允许 9997 端口的入站连接。

### 2. 启动一个 Xinference 实例

```bash
$ xinference-local --host 0.0.0.0 --port 9997
```

### 3. 启动你的本地模型

启动你的本地模型（**Mistral**），注意把 `${quantization}` 替换为你选择的量化方法：

```bash
$ xinference launch -u mistral --model-name mistral-v0.1 --size-in-billions 7 --model-format pytorch --quantization ${quantization}
```
### 4. 添加 Xinference

在 RAGFlow 中，点击页面右上角你的头像 **>** **Model providers**，将 Xinference 添加到 RAGFlow：

### 5. 完成 Xinference 基本设置

输入一个可访问的 base URL，例如 `http://<your-xinference-endpoint-domain>:9997/v1`。
> 重排序模型请使用 `http://<your-xinference-endpoint-domain>:9997/v1/rerank` 作为 base URL。

### 6. 更新系统模型设置

点击你的头像 **>** **Model providers** **>** **System Model Settings** 来更新你的模型。

*你现在应该能在 **Chat model** 下的下拉列表中找到 **mistral**。*

### 7. 更新对话配置

在 **Chat Configuration** 中相应地更新你的对话模型：

## 使用 IPEX-LLM 部署本地模型

[IPEX-LLM](https://github.com/intel-analytics/ipex-llm) 是一个 PyTorch 库，用于在本地 Intel CPU 或 GPU（包括 iGPU 或 Arc、Flex、Max 等独立 GPU）上低延迟地运行 LLM。它在 Linux 和 Windows 系统上支持 Ollama。

要使用 IPEX-LLM 加速的 Ollama 部署一个本地模型（例如 **Qwen2**）：

### 1. 检查防火墙设置

确认宿主机防火墙允许 11434 端口的入站连接。例如：

```bash
sudo ufw allow 11434/tcp
```

### 2. 使用 IPEX-LLM 启动 Ollama 服务

#### 2.1 为 Ollama 安装 IPEX-LLM

:::tip 注意
IPEX-LLM 在 Linux 和 Windows 系统上支持 Ollama。
:::

关于为 Ollama 安装 IPEX-LLM 的详细信息，见 [Run llama.cpp with IPEX-LLM on Intel GPU Guide](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md)：
- [前提条件](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#0-prerequisites)
- [使用 Ollama 二进制文件安装 IPEX-LLM cpp](https://github.com/intel-analytics/ipex-llm/blob/main/docs/mddocs/Quickstart/llama_cpp_quickstart.md#1-install-ipex-llm-for-llamacpp)

*安装完成后，你应该已经创建了一个 Conda 环境（例如 `llm-cpp`），用于通过 IPEX-LLM 运行 Ollama 命令。*

#### 2.2 初始化 Ollama

1. 激活 `llm-cpp` Conda 环境并初始化 Ollama：

**Linux：**

```bash
conda activate llm-cpp
init-ollama
```

**Windows：**

在 *Miniforge Prompt* 中以*管理员权限*运行以下命令：

```cmd
conda activate llm-cpp
init-ollama.bat
```

2. 如果安装的 `ipex-llm[cpp]` 需要升级 Ollama 二进制文件，请删除旧的二进制文件，并使用 `init-ollama`（Linux）或 `init-ollama.bat`（Windows）重新初始化 Ollama。

   *当前目录中会出现一个指向 Ollama 的符号链接，你可以按照标准 Ollama 命令的方式使用这个可执行文件。*

#### 2.3 启动 Ollama 服务

1. 将环境变量 `OLLAMA_NUM_GPU` 设置为 `999`，确保模型的所有层都运行在 Intel GPU 上；否则，某些层可能默认运行在 CPU 上。
2. 若要在 Linux 系统（内核 6.2）搭配 Intel Arc™ A-Series 显卡时获得最佳性能，请在启动 Ollama 服务前设置以下环境变量：

   ```bash
   ```
3. 启动 Ollama 服务：

**Linux：**

```bash
source /opt/intel/oneapi/setvars.sh

./ollama serve
```

**Windows：**

在 *Miniforge Prompt* 中运行以下命令：

```cmd
set OLLAMA_NUM_GPU=999
set no_proxy=localhost,127.0.0.1
set ZES_ENABLE_SYSMAN=1
set SYCL_CACHE_PERSISTENT=1

ollama serve
```

:::tip 注意
要让 Ollama 服务接受来自所有 IP 地址的连接，请使用 `OLLAMA_HOST=0.0.0.0 ./ollama serve`，而不是简单地用 `./ollama serve`。
:::

控制台会显示服务启动消息。

### 3. 拉取并运行 Ollama 模型

#### 3.1 拉取 Ollama 模型

在 Ollama 服务运行的情况下，打开一个新终端，运行 `./ollama pull <model_name>`（Linux）或 `ollama.exe pull <model_name>`（Windows）拉取所需的模型，例如 `qwen2:latest`：

#### 3.2 运行 Ollama 模型

**Linux：**

```bash
./ollama run qwen2:latest
```

**Windows：**

```cmd
ollama run qwen2:latest
```

### 4. 配置 RAGFlow

要在 RAGFlow 中启用 IPEX-LLM 加速的 Ollama，你还必须完成 RAGFlow 中的配置。这些步骤与*使用 Ollama 部署本地模型*一节中给出的完全相同：

1. [添加 Ollama](#3-add-ollama)
2. [完成 Ollama 基本设置](#4-complete-basic-ollama-settings)
3. [更新系统模型设置](#6-update-system-model-settings)
4. [更新对话配置](#7-update-chat-configuration)

### 5. 部署 vLLM

ubuntu 22.04/24.04

```bash
pip install vllm
```
### 5.1 以最佳实践运行 vLLM

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

进入 **Settings**（设置）→ **Model Providers** → **Search**（搜索）→ **vLLM** → **Add**（添加），按如下配置：

![add vllm](/ragflow-images/ragflow_vllm.png)

选择 vLLM 对话模型作为默认 LLM 模型：
![chat](/ragflow-images/ragflow_vllm1.png)
### 5.3 使用 vLLM 对话模型进行对话
创建一个对话，并按如下方式开始会话：
![chat](/ragflow-images/ragflow_vllm2.png)

### 6. 部署 GPUStack

ubuntu 22.04/24.04

### 6.1 以最佳实践运行 GPUStack

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

依次进入 设置 -> 模型提供商 -> 搜索 -> gpustack -> 添加，按如下配置：

![add vllm](/ragflow-images/ragflow-gpustack11.png)

按如下方式将 gpustack 对话模型选为默认 LLM 模型：
![chat](/ragflow-images/ragflow-gpustack22.png)
