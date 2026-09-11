# 连接本地 MCP 服务器

> 了解如何用本地 MCP 服务器扩展 Claude Desktop，实现文件系统访问和其他强大的集成能力

模型上下文协议（Model Context Protocol，MCP）服务器通过提供对本地资源和工具的安全、受控访问来扩展 AI 应用的能力。众多客户端都支持 MCP，可跨不同平台与应用实现丰富多样的集成。

本指南以 Claude Desktop 为例演示如何连接本地 MCP 服务器——它只是支持 MCP 的众多客户端之一。虽然我们重点关注 Claude Desktop 的实现，但这些概念同样适用于其他兼容 MCP 的客户端。学完本教程后，Claude 将能与电脑上的文件交互、创建新文档、整理文件夹并搜索文件系统——每项操作都需要你的明确许可。

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-filesystem.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=629d7e754dc358d71a408d6ce970c1b1" alt="Claude Desktop with filesystem integration showing file management capabilities" width="1732" height="2060" data-path="images/quickstart-filesystem.png" />

## 前提条件

开始本教程之前，请确保系统已安装以下软件：

### Claude Desktop

根据你的操作系统[下载并安装 Claude Desktop](https://claude.ai/download)。Claude Desktop 提供 macOS 和 Windows 版本。

如果已经安装了 Claude Desktop，请点击 Claude 菜单并选择 "Check for Updates..."（检查更新…），确认你正在运行最新版本。

### Node.js

文件系统服务器（Filesystem Server）和许多其他 MCP 服务器都需要 Node.js 才能运行。打开终端或命令提示符，运行以下命令验证 Node.js 是否已安装：

```bash theme={null}
node --version
```

如果尚未安装 Node.js，请从 [nodejs.org](https://nodejs.org/) 下载。为保持稳定，我们推荐 LTS（Long Term Support，长期支持）版本。

## 理解 MCP 服务器

MCP 服务器是运行在你电脑上的程序，通过标准化协议为 Claude Desktop 提供特定能力。每个服务器都会暴露一组工具，Claude 经你批准后即可用它们执行操作。我们即将安装的文件系统服务器提供以下工具：

* 读取文件内容和目录结构
* 创建新文件和目录
* 移动和重命名文件
* 按名称或内容搜索文件

所有操作在执行前都必须获得你的明确批准，确保你能完全掌控 Claude 可以访问和修改的内容。

## 安装文件系统服务器

整个过程要做的是配置 Claude Desktop，让它在每次启动应用时自动启动文件系统服务器。这份配置通过一个 JSON 文件完成，该文件告诉 Claude Desktop 要运行哪些服务器以及如何连接它们。

    首先进入 Claude Desktop 的设置。点击系统菜单栏中的 Claude 菜单（注意：不是 Claude 窗口内部的设置），选择 "Settings..."（设置…）。

    在 macOS 上，它会出现在屏幕顶部的菜单栏：


      <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-menu.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0c8b57e0e17af3624b6762a3ea944c8e" width="400" alt="Claude Desktop menu showing Settings option" data-path="images/quickstart-menu.png" />


    这会打开 Claude Desktop 的配置窗口，它与你的 Claude 账户设置是分开的。


    在设置窗口中，进入左侧边栏的 "Developer"（开发者）选项卡。这里包含配置 MCP 服务器和其他开发者功能的选项。

    点击 "Edit Config"（编辑配置）按钮，打开配置文件：


      <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-developer.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0fb595490a2f9e15c0301e771a57446c" alt="Developer settings showing Edit Config button" width="1688" height="534" data-path="images/quickstart-developer.png" />


    如果配置文件尚不存在，此操作会新建一个；否则会打开现有配置。该文件位于：

    * **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
    * **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`


    将配置文件的内容替换为下面的 JSON 结构。这份配置告诉 Claude Desktop 启动文件系统服务器，并允许它访问指定目录：

    <CodeGroup>
      ```json macOS theme={null}
      {
        "mcpServers": {
          "filesystem": {
            "command": "npx",
            "args": [
              "-y",
              "@modelcontextprotocol/server-filesystem",
              "/Users/username/Desktop",
              "/Users/username/Downloads"
            ]
          }
        }
      }
      ```

      ```json Windows theme={null}
      {
        "mcpServers": {
          "filesystem": {
            "command": "npx",
            "args": [
              "-y",
              "@modelcontextprotocol/server-filesystem",
              "C:\\Users\\username\\Desktop",
              "C:\\Users\\username\\Downloads"
            ]
          }
        }
      }
      ```
    </CodeGroup>

    把 `username` 替换为你电脑的实际用户名。`args` 数组中列出的路径指定了文件系统服务器可以访问哪些目录。你可以按需修改这些路径或添加更多目录。

    > **提示：**
    > **理解这份配置**

      * `"filesystem"`：服务器的友好名称，会显示在 Claude Desktop 中
      * `"command": "npx"`：使用 Node.js 的 npx 工具运行服务器
      * `"-y"`：自动确认安装服务器软件包
      * `"@modelcontextprotocol/server-filesystem"`：文件系统服务器的包名
      * 其余参数：允许服务器访问的目录

    > **注意：**
    > **安全注意事项**

      只把访问权限授予你放心让 Claude 读取和修改的目录。服务器以你的用户账户权限运行，因此凡是你能手动执行的文件操作，它都能执行。


    保存配置文件后，完全退出 Claude Desktop 并重新启动。应用需要重启才能加载新配置并启动 MCP 服务器。

    重启成功后，点击对话输入框左下角的 "Add files, connectors, and more /"（添加文件、连接器等）指示器 <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" style={{display: 'inline', margin: 0, height: '1.3em', width: 'auto'}} width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" />：


      <img src="https://mintcdn.com/mcp/akpggzunDlIcY2im/images/quickstart-slider.png?fit=max&auto=format&n=akpggzunDlIcY2im&q=85&s=a1ebd4259cff2a7472171885f2edc035" alt="Claude Desktop interface showing MCP server indicator" width="1414" height="410" data-path="images/quickstart-slider.png" />


    点击该指示器，把鼠标移到 "Connectors"（连接器）上，再点击 "Manage connectors"（管理连接器）。在连接器列表中选择 "filesystem"，即可查看文件系统服务器的可用工具：


      <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-tools.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=212a63d76daba170d52db0d2f6f582be" width="400" alt="Available filesystem tools in Claude Desktop" data-path="images/quickstart-tools.png" />


    如果文件系统服务器没有连接成功，请参阅[故障排除](#troubleshooting)一节，获取调试步骤。


## 使用文件系统服务器

文件系统服务器连接好后，Claude 就可以与你的文件系统交互了。试试下面这些示例请求，探索它能做什么：

### 文件管理示例

* **「能帮我写一首诗并保存到我的桌面吗？」** - Claude 会创作一首诗，并在你的桌面新建一个文本文件
* **「我的下载文件夹里有哪些工作相关的文件？」** - Claude 会扫描下载文件夹并找出与工作相关的文档
* **「请把我桌面上的所有图片整理到一个名为 'Images' 的新文件夹里」** - Claude 会创建文件夹并把图片文件移进去

### 批准如何运作

在执行任何文件系统操作之前，Claude 都会先请求你的批准，确保所有操作都在你的掌控之下：

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-approve.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=98cc6e9dfe885fbd6e9bfae40601e494" width="500" alt="Claude requesting approval to perform a file operation" data-path="images/quickstart-approve.png" />

批准前请仔细审查每个请求。如果对要执行的操作不放心，你随时可以拒绝。

## 故障排除

如果在设置或使用文件系统服务器时遇到问题，以下方案覆盖常见问题：

  <AccordionGroup>
  <Accordion title="服务器未在 Claude 中显示 / 缺少锤子图标">
    1. 完全重启 Claude Desktop
    2. 检查 `claude_desktop_config.json` 文件的语法
    3. 确认 `claude_desktop_config.json` 中包含的文件路径有效，且为绝对路径而非相对路径
    4. 查看[日志](#getting-logs-from-claude-for-desktop)，了解服务器未连接的原因
    5. 在命令行中尝试手动运行服务器（像在 `claude_desktop_config.json` 中那样替换 `username`），看是否报错：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      npx -y @modelcontextprotocol/server-filesystem /Users/username/Desktop /Users/username/Downloads
      ```

      ```powershell Windows theme={null}
      npx -y @modelcontextprotocol/server-filesystem C:\Users\username\Desktop C:\Users\username\Downloads
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="获取 Claude Desktop 的日志">
    Claude.app 中与 MCP 相关的日志会写入以下日志文件：

    * macOS：`~/Library/Logs/Claude`
    * Windows：`%APPDATA%\Claude\logs`
    * `mcp.log` 包含有关 MCP 连接及连接失败的常规日志。
    * 名为 `mcp-server-SERVERNAME.log` 的文件包含对应服务器的 stderr 输出。stdio（标准输入输出）服务器可能把所有日志都写到 stderr，因此这些文件并不只包含错误信息。

    你可以运行以下命令来列出最近的日志并持续跟踪新增日志（在 Windows 上只会显示最近的日志）：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
      ```

      ```powershell Windows theme={null}
      type "%APPDATA%\Claude\logs\mcp*.log"
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="工具调用静默失败">
    如果 Claude 尝试使用工具但调用失败：

    1. 检查 Claude 的日志中是否有错误
    2. 确认服务器能正常构建和运行、不报错
    3. 尝试重启 Claude Desktop
  </Accordion>

  <Accordion title="这些方法都不管用，我该怎么办？">
    请参阅我们的[调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)，获取更好用的调试工具和更详细的指导。
  </Accordion>

  <Accordion title="ENOENT 错误与 Windows 路径中的 `${APPDATA}`">
    如果你配置的服务器加载失败，并在其日志中看到路径中含 `${APPDATA}` 的报错，可能需要在 `claude_desktop_config.json` 的 `env` 键里加入 `%APPDATA%` 展开后的值：

    ```json theme={null}
    {
      "brave-search": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-brave-search"],
        "env": {
          "APPDATA": "C:\\Users\\user\\AppData\\Roaming\\",
          "BRAVE_API_KEY": "..."
        }
      }
    }
    ```

    完成这项修改后，再次启动 Claude Desktop。

    > **注意：**
    > **npm 应当全局安装**

      如果没有全局安装 npm，`npx` 命令可能仍会失败。若 npm 已全局安装，你的系统中会存在 `%APPDATA%\npm`；若不存在，可以运行以下命令来全局安装 npm：

      ```bash theme={null}
      npm install -g npm
      ```

  </Accordion>
</AccordionGroup>

## 后续步骤

你已成功把 Claude Desktop 连接到本地 MCP 服务器，接下来可以探索以下选项，扩展你的配置：

  - [探索其他服务器](https://github.com/modelcontextprotocol/servers)：浏览官方与社区创建的 MCP 服务器合集，获取更多能力
  - [构建自己的服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：创建贴合你特定工作流与集成的定制 MCP 服务器
  - [连接远程服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers)：学习如何把 Claude 连接到远程 MCP 服务器，使用云端工具与服务
  - [理解协议](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)：深入了解 MCP 的工作原理与架构
