<BiRow>
<template #en>

> Learn how to extend Claude Desktop with local MCP servers to enable file system access and other powerful integrations

</template>
<template #zh>

> 了解如何用本地 MCP 服务器扩展 Claude Desktop，实现文件系统访问和其他强大的集成能力

</template>
</BiRow>

<BiRow>
<template #en>

Model Context Protocol (MCP) servers extend AI applications' capabilities by providing secure, controlled access to local resources and tools. Many clients support MCP, enabling diverse integration possibilities across different platforms and applications.

</template>
<template #zh>

模型上下文协议（Model Context Protocol，MCP）服务器通过提供对本地资源和工具的安全、受控访问来扩展 AI 应用的能力。众多客户端都支持 MCP，可跨不同平台与应用实现丰富多样的集成。

</template>
</BiRow>

<BiRow>
<template #en>

This guide demonstrates how to connect to local MCP servers using Claude Desktop as an example, one of the many clients that support MCP. While we focus on Claude Desktop's implementation, the concepts apply broadly to other MCP-compatible clients. By the end of this tutorial, Claude will be able to interact with files on your computer, create new documents, organize folders, and search through your file system—all with your explicit permission for each action.

</template>
<template #zh>

本指南以 Claude Desktop 为例演示如何连接本地 MCP 服务器——它只是支持 MCP 的众多客户端之一。虽然我们重点关注 Claude Desktop 的实现，但这些概念同样适用于其他兼容 MCP 的客户端。学完本教程后，Claude 将能与电脑上的文件交互、创建新文档、整理文件夹并搜索文件系统——每项操作都需要你的明确许可。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-filesystem.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=629d7e754dc358d71a408d6ce970c1b1" alt="Claude Desktop with filesystem integration showing file management capabilities" width="1732" height="2060" data-path="images/quickstart-filesystem.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-filesystem.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=629d7e754dc358d71a408d6ce970c1b1" alt="Claude Desktop with filesystem integration showing file management capabilities" width="1732" height="2060" data-path="images/quickstart-filesystem.png" />

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

Before starting this tutorial, ensure you have the following installed on your system:

</template>
<template #zh>

开始本教程之前，请确保系统已安装以下软件：

</template>
</BiRow>

<BiRow>
<template #en>

### Claude Desktop

</template>
<template #zh>

### Claude Desktop

</template>
</BiRow>

<BiRow>
<template #en>

Download and install [Claude Desktop](https://claude.ai/download) for your operating system. Claude Desktop is available for macOS and Windows.

</template>
<template #zh>

根据你的操作系统[下载并安装 Claude Desktop](https://claude.ai/download)。Claude Desktop 提供 macOS 和 Windows 版本。

</template>
</BiRow>

<BiRow>
<template #en>

If you already have Claude Desktop installed, verify you're running the latest version by clicking the Claude menu and selecting "Check for Updates..."

</template>
<template #zh>

如果已经安装了 Claude Desktop，请点击 Claude 菜单并选择 "Check for Updates..."（检查更新…），确认你正在运行最新版本。

</template>
</BiRow>

<BiRow>
<template #en>

### Node.js

</template>
<template #zh>

### Node.js

</template>
</BiRow>

<BiRow>
<template #en>

The Filesystem Server and many other MCP servers require Node.js to run. Verify your Node.js installation by opening a terminal or command prompt and running:

</template>
<template #zh>

文件系统服务器（Filesystem Server）和许多其他 MCP 服务器都需要 Node.js 才能运行。打开终端或命令提示符，运行以下命令验证 Node.js 是否已安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
node --version
```

</template>
<template #zh>

```bash theme={null}
node --version
```

</template>
</BiRow>

<BiRow>
<template #en>

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/). We recommend the LTS (Long Term Support) version for stability.

</template>
<template #zh>

如果尚未安装 Node.js，请从 [nodejs.org](https://nodejs.org/) 下载。为保持稳定，我们推荐 LTS（Long Term Support，长期支持）版本。

</template>
</BiRow>

<BiRow>
<template #en>

## Understanding MCP Servers

</template>
<template #zh>

## 理解 MCP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

MCP servers are programs that run on your computer and provide specific capabilities to Claude Desktop through a standardized protocol. Each server exposes tools that Claude can use to perform actions, with your approval. The Filesystem Server we'll install provides tools for:

</template>
<template #zh>

MCP 服务器是运行在你电脑上的程序，通过标准化协议为 Claude Desktop 提供特定能力。每个服务器都会暴露一组工具，Claude 经你批准后即可用它们执行操作。我们即将安装的文件系统服务器提供以下工具：

</template>
</BiRow>

<BiRow>
<template #en>

* Reading file contents and directory structures
* Creating new files and directories
* Moving and renaming files
* Searching for files by name or content

</template>
<template #zh>

* 读取文件内容和目录结构
* 创建新文件和目录
* 移动和重命名文件
* 按名称或内容搜索文件

</template>
</BiRow>

<BiRow>
<template #en>

All actions require your explicit approval before execution, ensuring you maintain full control over what Claude can access and modify.

</template>
<template #zh>

所有操作在执行前都必须获得你的明确批准，确保你能完全掌控 Claude 可以访问和修改的内容。

</template>
</BiRow>

<BiRow>
<template #en>

## Installing the Filesystem Server

</template>
<template #zh>

## 安装文件系统服务器

</template>
</BiRow>

<BiRow>
<template #en>

The process involves configuring Claude Desktop to automatically start the Filesystem Server whenever you launch the application. This configuration is done through a JSON file that tells Claude Desktop which servers to run and how to connect to them.

</template>
<template #zh>

整个过程要做的是配置 Claude Desktop，让它在每次启动应用时自动启动文件系统服务器。这份配置通过一个 JSON 文件完成，该文件告诉 Claude Desktop 要运行哪些服务器以及如何连接它们。

</template>
</BiRow>

<BiRow>
<template #en>

Start by accessing the Claude Desktop settings. Click on the Claude menu in your system's menu bar (not the settings within the Claude window itself) and select "Settings..."

</template>
<template #zh>

首先进入 Claude Desktop 的设置。点击系统菜单栏中的 Claude 菜单（注意：不是 Claude 窗口内部的设置），选择 "Settings..."（设置…）。

</template>
</BiRow>

<BiRow>
<template #en>

On macOS, this appears in the top menu bar:

</template>
<template #zh>

在 macOS 上，它会出现在屏幕顶部的菜单栏：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-menu.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0c8b57e0e17af3624b6762a3ea944c8e" width="400" alt="Claude Desktop menu showing Settings option" data-path="images/quickstart-menu.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-menu.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0c8b57e0e17af3624b6762a3ea944c8e" width="400" alt="Claude Desktop menu showing Settings option" data-path="images/quickstart-menu.png" />

</template>
</BiRow>

<BiRow>
<template #en>

This opens the Claude Desktop configuration window, which is separate from your Claude account settings.

</template>
<template #zh>

这会打开 Claude Desktop 的配置窗口，它与你的 Claude 账户设置是分开的。

</template>
</BiRow>

<BiRow>
<template #en>

In the Settings window, navigate to the "Developer" tab in the left sidebar. This section contains options for configuring MCP servers and other developer features.

</template>
<template #zh>

在设置窗口中，进入左侧边栏的 "Developer"（开发者）选项卡。这里包含配置 MCP 服务器和其他开发者功能的选项。

</template>
</BiRow>

<BiRow>
<template #en>

Click the "Edit Config" button to open the configuration file:

</template>
<template #zh>

点击 "Edit Config"（编辑配置）按钮，打开配置文件：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-developer.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0fb595490a2f9e15c0301e771a57446c" alt="Developer settings showing Edit Config button" width="1688" height="534" data-path="images/quickstart-developer.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-developer.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0fb595490a2f9e15c0301e771a57446c" alt="Developer settings showing Edit Config button" width="1688" height="534" data-path="images/quickstart-developer.png" />

</template>
</BiRow>

<BiRow>
<template #en>

This action creates a new configuration file if one doesn't exist, or opens your existing configuration. The file is located at:

</template>
<template #zh>

如果配置文件尚不存在，此操作会新建一个；否则会打开现有配置。该文件位于：

</template>
</BiRow>

<BiRow>
<template #en>

* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

</template>
<template #zh>

* **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`

</template>
</BiRow>

<BiRow>
<template #en>

Replace the contents of the configuration file with the following JSON structure. This configuration tells Claude Desktop to start the Filesystem Server with access to specific directories:

</template>
<template #zh>

将配置文件的内容替换为下面的 JSON 结构。这份配置告诉 Claude Desktop 启动文件系统服务器，并允许它访问指定目录：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Replace `username` with your actual computer username. The paths listed in the `args` array specify which directories the Filesystem Server can access. You can modify these paths or add additional directories as needed.

</template>
<template #zh>

把 `username` 替换为你电脑的实际用户名。`args` 数组中列出的路径指定了文件系统服务器可以访问哪些目录。你可以按需修改这些路径或添加更多目录。

</template>
</BiRow>

<BiRow>
<template #en>

> **提示：**
> **Understanding the Configuration**

</template>
<template #zh>

> **提示：**
> **理解这份配置**

</template>
</BiRow>

<BiRow>
<template #en>

  * `"filesystem"`: A friendly name for the server that appears in Claude Desktop
  * `"command": "npx"`: Uses Node.js's npx tool to run the server
  * `"-y"`: Automatically confirms the installation of the server package
  * `"@modelcontextprotocol/server-filesystem"`: The package name of the Filesystem Server
  * The remaining arguments: Directories the server is allowed to access

</template>
<template #zh>

  * `"filesystem"`：服务器的友好名称，会显示在 Claude Desktop 中
  * `"command": "npx"`：使用 Node.js 的 npx 工具运行服务器
  * `"-y"`：自动确认安装服务器软件包
  * `"@modelcontextprotocol/server-filesystem"`：文件系统服务器的包名
  * 其余参数：允许服务器访问的目录

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Security Consideration**

</template>
<template #zh>

> **注意：**
> **安全注意事项**

</template>
</BiRow>

<BiRow>
<template #en>

  Only grant access to directories you're comfortable with Claude reading and modifying. The server runs with your user account permissions, so it can perform any file operations you can perform manually.

</template>
<template #zh>

  只把访问权限授予你放心让 Claude 读取和修改的目录。服务器以你的用户账户权限运行，因此凡是你能手动执行的文件操作，它都能执行。

</template>
</BiRow>

<BiRow>
<template #en>

After saving the configuration file, completely quit Claude Desktop and restart it. The application needs to restart to load the new configuration and start the MCP server.

</template>
<template #zh>

保存配置文件后，完全退出 Claude Desktop 并重新启动。应用需要重启才能加载新配置并启动 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

Upon successful restart, click the "Add files, connectors, and more /" indicator <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" /> in the bottom-left corner of the conversation input box:

</template>
<template #zh>

重启成功后，点击对话输入框左下角的 "Add files, connectors, and more /"（添加文件、连接器等）指示器 <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" />：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/akpggzunDlIcY2im/images/quickstart-slider.png?fit=max&auto=format&n=akpggzunDlIcY2im&q=85&s=a1ebd4259cff2a7472171885f2edc035" alt="Claude Desktop interface showing MCP server indicator" width="1414" height="410" data-path="images/quickstart-slider.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/akpggzunDlIcY2im/images/quickstart-slider.png?fit=max&auto=format&n=akpggzunDlIcY2im&q=85&s=a1ebd4259cff2a7472171885f2edc035" alt="Claude Desktop interface showing MCP server indicator" width="1414" height="410" data-path="images/quickstart-slider.png" />

</template>
</BiRow>

<BiRow>
<template #en>

Click on this indicator, then move the mouse over "Connectors" and click "Manage connectors". Select "filesystem" from the connector list to view the Filesystem Server's available tools:

</template>
<template #zh>

点击该指示器，把鼠标移到 "Connectors"（连接器）上，再点击 "Manage connectors"（管理连接器）。在连接器列表中选择 "filesystem"，即可查看文件系统服务器的可用工具：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-tools.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=212a63d76daba170d52db0d2f6f582be" width="400" alt="Available filesystem tools in Claude Desktop" data-path="images/quickstart-tools.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-tools.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=212a63d76daba170d52db0d2f6f582be" width="400" alt="Available filesystem tools in Claude Desktop" data-path="images/quickstart-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

If the Filesystem Server doesn't connect, refer to the [Troubleshooting](#troubleshooting) section for debugging steps.

</template>
<template #zh>

如果文件系统服务器没有连接成功，请参阅[故障排除](#troubleshooting)一节，获取调试步骤。

</template>
</BiRow>

<BiRow>
<template #en>

## Using the Filesystem Server

</template>
<template #zh>

## 使用文件系统服务器

</template>
</BiRow>

<BiRow>
<template #en>

With the Filesystem Server connected, Claude can now interact with your file system. Try these example requests to explore the capabilities:

</template>
<template #zh>

文件系统服务器连接好后，Claude 就可以与你的文件系统交互了。试试下面这些示例请求，探索它能做什么：

</template>
</BiRow>

<BiRow>
<template #en>

### File Management Examples

</template>
<template #zh>

### 文件管理示例

</template>
</BiRow>

<BiRow>
<template #en>

* **"Can you write a poem and save it to my desktop?"** - Claude will compose a poem and create a new text file on your desktop
* **"What work-related files are in my downloads folder?"** - Claude will scan your downloads and identify work-related documents
* **"Please organize all images on my desktop into a new folder called 'Images'"** - Claude will create a folder and move image files into it

</template>
<template #zh>

* **「能帮我写一首诗并保存到我的桌面吗？」** - Claude 会创作一首诗，并在你的桌面新建一个文本文件
* **「我的下载文件夹里有哪些工作相关的文件？」** - Claude 会扫描下载文件夹并找出与工作相关的文档
* **「请把我桌面上的所有图片整理到一个名为 'Images' 的新文件夹里」** - Claude 会创建文件夹并把图片文件移进去

</template>
</BiRow>

<BiRow>
<template #en>

### How Approval Works

</template>
<template #zh>

### 批准如何运作

</template>
</BiRow>

<BiRow>
<template #en>

Before executing any file system operation, Claude will request your approval. This ensures you maintain control over all actions:

</template>
<template #zh>

在执行任何文件系统操作之前，Claude 都会先请求你的批准，确保所有操作都在你的掌控之下：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-approve.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=98cc6e9dfe885fbd6e9bfae40601e494" width="500" alt="Claude requesting approval to perform a file operation" data-path="images/quickstart-approve.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-approve.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=98cc6e9dfe885fbd6e9bfae40601e494" width="500" alt="Claude requesting approval to perform a file operation" data-path="images/quickstart-approve.png" />

</template>
</BiRow>

<BiRow>
<template #en>

Review each request carefully before approving. You can always deny a request if you're not comfortable with the proposed action.

</template>
<template #zh>

批准前请仔细审查每个请求。如果对要执行的操作不放心，你随时可以拒绝。

</template>
</BiRow>

<BiRow>
<template #en>

## Troubleshooting

</template>
<template #zh>

## 故障排除

</template>
</BiRow>

<BiRow>
<template #en>

If you encounter issues setting up or using the Filesystem Server, these solutions address common problems:

</template>
<template #zh>

如果在设置或使用文件系统服务器时遇到问题，以下方案覆盖常见问题：

</template>
</BiRow>

<BiRow>
<template #en>

<AccordionGroup>
  <Accordion title="Server not showing up in Claude / hammer icon missing">
1. Restart Claude Desktop completely
2. Check your `claude_desktop_config.json` file syntax
3. Make sure the file paths included in `claude_desktop_config.json` are valid and that they are absolute and not relative
4. Look at [logs](#getting-logs-from-claude-for-desktop) to see why the server is not connecting
5. In your command line, try manually running the server (replacing `username` as you did in `claude_desktop_config.json`) to see if you get any errors:

<CodeGroup>
  ```bash macOS/Linux theme={null}
  npx -y @modelcontextprotocol/server-filesystem /Users/username/Desktop /Users/username/Downloads
  ```

  ```powershell Windows theme={null}
  npx -y @modelcontextprotocol/server-filesystem C:\Users\username\Desktop C:\Users\username\Downloads
  ```
</CodeGroup>
  </Accordion>

  <Accordion title="Getting logs from Claude Desktop">
Claude.app logging related to MCP is written to log files in:

* macOS: `~/Library/Logs/Claude`
* Windows: `%APPDATA%\Claude\logs`
* `mcp.log` will contain general logging about MCP connections and connection failures.
* Files named `mcp-server-SERVERNAME.log` will contain the stderr output from the named server. Stdio servers may use stderr for all their logging, so these files are not limited to errors.

You can run the following command to list recent logs and follow along with any new ones (on Windows, it will only show recent logs):

<CodeGroup>
  ```bash macOS/Linux theme={null}
  tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
  ```

  ```powershell Windows theme={null}
  type "%APPDATA%\Claude\logs\mcp*.log"
  ```
</CodeGroup>
  </Accordion>

  <Accordion title="Tool calls failing silently">
If Claude attempts to use the tools but they fail:

1. Check Claude's logs for errors
2. Verify your server builds and runs without errors
3. Try restarting Claude Desktop
  </Accordion>

  <Accordion title="None of this is working. What do I do?">
Please refer to our [debugging guide](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging) for better debugging tools and more detailed guidance.
  </Accordion>

  <Accordion title="ENOENT error and `${APPDATA}` in paths on Windows">
If your configured server fails to load, and you see within its logs an error referring to `${APPDATA}` within a path, you may need to add the expanded value of `%APPDATA%` to your `env` key in `claude_desktop_config.json`:

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

With this change in place, launch Claude Desktop once again.

> **注意：**
> **npm should be installed globally**

  The `npx` command may continue to fail if you have not installed npm globally. If npm is already installed globally, you will find `%APPDATA%\npm` exists on your system. If not, you can install npm globally by running the following command:

  ```bash theme={null}
  npm install -g npm
  ```

  </Accordion>
</AccordionGroup>

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

## Next Steps

</template>
<template #zh>

## 后续步骤

</template>
</BiRow>

<BiRow>
<template #en>

Now that you've successfully connected Claude Desktop to a local MCP server, explore these options to expand your setup:

</template>
<template #zh>

你已成功把 Claude Desktop 连接到本地 MCP 服务器，接下来可以探索以下选项，扩展你的配置：

</template>
</BiRow>

<BiRow>
<template #en>

  - [Explore other servers](https://github.com/modelcontextprotocol/servers)：Browse our collection of official and community-created MCP servers for additional capabilities
  - [Build your own server](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：Create custom MCP servers tailored to your specific workflows and integrations
  - [Connect to remote servers](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers)：Learn how to connect Claude to remote MCP servers for cloud-based tools and services
  - [Understand the protocol](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)：Dive deeper into how MCP works and its architecture

</template>
<template #zh>

  - [探索其他服务器](https://github.com/modelcontextprotocol/servers)：浏览官方与社区创建的 MCP 服务器合集，获取更多能力
  - [构建自己的服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：创建贴合你特定工作流与集成的定制 MCP 服务器
  - [连接远程服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers)：学习如何把 Claude 连接到远程 MCP 服务器，使用云端工具与服务
  - [理解协议](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)：深入了解 MCP 的工作原理与架构

</template>
</BiRow>
