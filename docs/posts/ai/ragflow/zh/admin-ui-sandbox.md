# 配置代码执行沙箱

## 选择沙箱提供方

如果你的组织在 Agent 中使用 **Code** 组件，管理员必须在 **Sandbox settings** 中配置代码执行沙箱。

当前页面支持以下 `Provider` 选项：

| Provider | 说明 |
| --- | --- |
| `Local` | 直接在当前主机进程中执行代码。 |
| `Self-Managed` | 使用 Daytona 或 Docker 进行本地化部署。 |
| `SSH` | 通过 SSH 在远程机器上执行代码。 |
| `AliyunCodeInterpreter` | 使用阿里云函数计算 Code Interpreter。 |
| `E2B` | 使用 E2B Cloud Code Execution Sandboxes。 |
| `UCloud Agent Sandbox` | 在一次性的 UCloud 云沙箱中运行代码。 |

选择某个 `Provider` 后，页面会显示相应的配置区域。

![选择沙箱提供方](/ragflow-images/select_sandbox_provider.jpg)

**注意：** 沙箱配置不仅影响连接可用性，还关系到代码隔离、网络访问、文件访问以及运行时资源限制。在生产环境中，应优先选择 `Self-Managed`、云方案或具备隔离能力的独立远程执行方案，不建议直接使用 `Local`。

| Provider | 适用场景 | 主要特点 | 建议 |
| --- | --- | --- | --- |
| `Local` | 本地开发与功能调试 | 直接在当前主机上运行代码，配置简单。 | 仅推荐用于受控的开发和测试环境。 |
| `Self-Managed` | 企业内网与私有化部署 | 使用自管理的沙箱服务执行代码，可自主管控数据与运行环境。 | 适用于生产环境以及对数据安全要求较高的场景。 |
| `SSH` | 已有独立执行服务器 | 通过 SSH 在远程主机上执行代码。 | 适合复用现有服务器或自定义运行环境。 |
| `AliyunCodeInterpreter` | 阿里云相关服务 | 使用云服务提供代码执行环境，弹性扩缩容更方便。 | 适用于已在使用相应云服务的组织。 |
| `E2B` | 快速接入云沙箱 | 在 E2B 提供的隔离环境中执行代码。 | 适合需要即开即用、无需部署的场景。 |
| `UCloud Agent Sandbox` | 托管在 UCloud 上的 Agent 负载 | 基于包含 Python 和 Node.js 的模板创建一次性沙箱。 | 适用于使用 UCloud 的团队，或需要在中国或北美使用托管沙箱的场景。 |

## 测试并保存配置

配置沙箱时，先填写所选 `Provider` 要求的连接信息和运行参数，再通过 **Test connection** 验证可用性。测试成功后，点击 **Save**。

## 本地运行时配置

`Local configuration` 用于配置本地代码执行环境。系统在执行 Python、Node.js 等代码任务时会使用以下配置。

1. 进入 **Local Configuration**。
2. 根据实际运行环境配置各参数。
3. 点击 **Test connection**，测试配置是否正确。
4. 测试成功后，点击 **Save**。

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `Working Directory` | 代码执行时使用的工作目录，用于存放运行期间产生的临时文件。 | 保持默认，或配置一个具备读写权限的本地目录。 |
| `Python Binary` | Python 可执行文件名或路径。 | 通常为 `python3`。若使用虚拟环境，请填写完整的 Python 路径。 |
| `Node.js Binary` | Node.js 可执行文件名或路径。 | 通常为 `node`。若安装在其他位置，请填写完整路径。 |
| `Max Artifact Size (bytes)` | 单个生成文件允许的最大体积。 | 按业务需要配置。默认值通常足以满足常见用途。 |
| `Max Artifacts` | 单次运行允许生成的最大文件数。 | 保持默认，避免产生过多临时文件。 |
| `Max Memory (MB)` | 单次代码运行可用的最大内存。 | 根据服务器资源配置，资源充足时可调大。 |
| `Max Output (bytes)` | 控制台输出的最大长度。 | 保持默认，避免输出超限。 |
| `Timeout (seconds)` | 单次代码执行的最大运行时长。 | 按业务场景设置，超时后任务会自动终止。 |

如果未安装 Python 或 Node.js，或可执行文件路径有误，连接测试会失败。

## Self-Managed 配置

`Self-Managed` 配置用于连接已部署的 `SandboxExecutorManager` 服务，实现远程沙箱执行。如果代码执行服务部署在独立服务器或容器中，请完成本节配置。

1. 进入 **Self-Managed Configuration**。
2. 配置代码执行服务的连接信息。
3. 点击 **Test connection**，测试连接是否正常。
4. 测试成功后，点击 **Save**。

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `Executor Manager Endpoint` | `SandboxExecutorManager` 服务的访问地址。 | 填写代码执行服务的 HTTP 地址，例如 `http://sandbox-executor-manager:9385` 或 `http://<SERVER_IP>:9385`，并确保 RAGFlow 能够访问该地址。 |
| `Request Timeout (seconds)` | 请求代码执行服务的超时时间。 | 根据网络环境和代码执行时长配置。默认 30 秒足以应对大多数场景，任务较大时可调大。 |

`Executor Manager Endpoint` 必须是已部署且正常运行中的 `SandboxExecutorManager` 服务地址。

`Deployment Defaults` 会显示 `SandboxExecutorManager` 当前的默认部署参数。

## SSH 配置

`SSH` 配置用于连接远程 Linux 主机，并在远程服务器上执行 Python、Node.js 等代码任务。配置完成后，系统会通过 SSH 登录指定服务器，并在远程工作目录中执行代码。

1. 进入 **System management > Model service > SSH Configuration**。
2. 填写远程服务器的连接信息。
3. 选择认证方式：密码认证或私钥认证。
4. 配置远程代码运行环境。
5. 点击 **Test connection**，测试连接是否正常。
6. 测试成功后，点击 **Save**。

### SSH 连接配置

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `SSH Host` | 远程服务器的 IP 地址或主机名。 | 例如 `192.168.1.10` 或 `server.example.com`。 |
| `SSH Username` | 登录远程服务器所用的用户名。 | 填写具有代码执行权限的用户，如 `root`、`ubuntu` 或 `ragflow`。 |
| `SSH Port` | SSH 服务监听的端口。 | 默认为 `22`。如果服务器使用其他 SSH 端口，请填写实际端口。 |

### 认证

系统支持 `Password` 和 `PrivateKey` 两种认证方式。

| 认证方式 | 说明 | 建议 |
| --- | --- | --- |
| `Password` | 使用 SSH 用户密码进行认证。 | 填写 `SSH Password`。 |
| `PrivateKey` | 使用 SSH 私钥进行认证。 | 填写 SSH 私钥内容；若私钥设有密码，还需填写相应的 `Passphrase`。生产环境推荐使用私钥认证。 |

### 执行

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `Remote Workspace Root` | 远程服务器上的工作目录，用于存放代码运行期间产生的临时文件。 | 配置一个具备读写权限的目录，例如 `/tmp` 或 `/home/ragflow/workspace`。 |
| `Python Binary` | Python 可执行文件名或完整路径。 | 通常为 `python3`。若使用虚拟环境，请填写完整的 Python 路径。 |
| `Node.js Binary` | Node.js 可执行文件名或完整路径。 | 通常为 `node`。若安装在其他位置，请填写完整路径。 |
| `Max Artifact Bytes` | 单个生成文件允许的最大体积。 | 保持默认，或按业务需要调整。 |
| `Max Artifacts` | 单次运行允许生成的最大文件数。 | 保持默认配置。 |
| `Max Output Bytes` | 控制台输出的最大长度。 | 保持默认。超出限制的输出会被截断。 |
| `Timeout (seconds)` | 单次代码执行的最大运行时长。 | 默认为 30 秒，执行时间较长时可调大。 |

请确保远程服务器已启用 SSH，并允许当前用户登录。所配置的用户必须对远程工作目录具备读写权限，并具备执行 Python、Node.js 等代码的运行环境。使用私钥认证时，请确保私钥与服务器配置匹配。

## 阿里云 CodeInterpreter 配置

阿里云 `CodeInterpreter` 配置用于连接阿里云 CodeInterpreter，系统会通过该服务执行代码任务。

1. 进入 **AliyunCodeInterpreter Configuration**。
2. 填写阿里云 CodeInterpreter 的连接信息。
3. 点击 **Test connection**，测试连接是否正常。
4. 测试成功后，点击 **Save**。

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `AccessKeyID` | 用于认证的阿里云账号 `AccessKeyID`。 | 填写有权访问 CodeInterpreter 服务的 `AccessKeyID`。 |
| `AccessKeySecret` | 与 `AccessKeyID` 对应的密钥。 | 填写相应的 `AccessKeySecret`，并妥善保管以防泄露。 |
| `AccountID` | 阿里云账号 ID。 | 填写当前阿里云账号 ID。 |
| `Region` | CodeInterpreter 服务所在地域。 | 填写实际部署地域，例如 `cn-hangzhou`。 |
| `TemplateName` | CodeInterpreter 使用的模板名称。 | 填写已创建的模板名称，例如 `my-interpreter`。 |
| `ExecutionTimeout (seconds)` | 单次代码执行允许的最大运行时长。 | 默认为 30 秒，可按业务需要调整。 |

## E2B 配置

`E2B` 配置用于连接 E2B Cloud 代码执行服务。配置完成后，系统会通过 E2B 云沙箱执行代码任务。

1. 进入 **E2B**。
2. 填写 E2B 服务的连接信息。
3. 点击 **Test connection**，测试连接是否正常。
4. 测试成功后，点击 **Save**。

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `API Key` | E2B Cloud 提供的 API key，用于认证。 | 登录 E2B 平台，创建相应的 API key 后填入。 |
| `Region` | E2B 服务所在地域。 | 填写实际地域，例如 `us`。 |
| `Request Timeout (seconds)` | 请求 E2B 服务的超时时间。 | 默认为 30 秒。网络较慢或执行时间较长时可调大。 |

## UCloud Agent Sandbox 配置

`UCloud Agent Sandbox` 会为每次代码执行创建一个全新的云沙箱，执行结束后即销毁。RAGFlow 使用 UCloud 原生 SDK，并通过内置的 `base` 模板支持 Python 和 JavaScript。

1. 从 [UCloud ModelVerse API Keys](https://astraflow.ucloud.cn/modelverse/api-keys) 获取 API key。
2. 进入 **UCloud Agent Sandbox Configuration**。
3. 输入 API key 并选择所需地域。
4. 点击 **Test connection**，测试成功后点击 **Save**。

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| `API Key` | 用于认证的 UCloud Agent Sandbox API key。 | 注意保密，并按组织的凭据策略轮换。 |
| `Region` | 沙箱地域。支持的取值包括 `cn-wlcb` 和 `us-ca`。 | 除非工作负载需要运行在北美，否则保持 `cn-wlcb`。 |
| `Domain` | 可选的沙箱域名覆盖项。 | 留空时，系统会根据 `Region` 推导出 `<region>.sandbox.ucloudai.com`。 |
| `API URL` | 可选的控制面端点覆盖项。 | 留空时使用公共服务端点。 |
| `Template` | UCloud 沙箱模板。 | 使用 `base`，该模板同时包含 Python 和 Node.js。 |
| `Allow Internet Access` | 允许被执行的代码发起出站网络请求。 | 默认关闭。仅当代码需要访问外部服务或下载依赖包时开启。 |
| `Use Insecure HTTP` | 使用 HTTP 而非 HTTPS。 | 除可信的私有测试部署外，保持关闭。 |
| `Execution Timeout` | 单次代码执行的最大时长。 | 默认为 30 秒。 |
| `Sandbox Lifetime` | 一次性沙箱的最长存活时间。 | 默认为 300 秒，获准的执行需要更长时间时会自动延长。 |
| 输出与产物限制 | 限制控制台输出以及从 `artifacts/` 目录返回的文件。 | 除非工作负载明确需要更大的结果，否则保持默认。 |

写入执行工作区 `artifacts/` 目录下的文件会返回给 RAGFlow。支持的产物扩展名包括 `.csv`、`.html`、`.jpeg`、`.jpg`、`.json`、`.pdf`、`.png` 和 `.svg`。

服务侧的详细信息请参阅 [UCloud Agent Sandbox 前置条件](https://astraflow.ucloud.cn/docs/agent-sandbox/product/prerequisites) 与 [地域文档](https://astraflow.ucloud.cn/docs/agent-sandbox/product/region)。
