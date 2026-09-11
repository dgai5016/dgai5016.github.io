<BiRow>
<template #en>

> Get started building your own server to use in Claude for Desktop and other clients.

</template>
<template #zh>

> 快速上手：构建你自己的服务器，供 Claude for Desktop 和其他客户端使用。

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we'll build a simple MCP weather server and connect it to a host, Claude for Desktop.

</template>
<template #zh>

在本教程中，我们将构建一个简单的 MCP 天气服务器，并把它连接到一个 MCP 宿主（host）——Claude for Desktop。

</template>
</BiRow>

<BiRow>
<template #en>

### What we'll be building

</template>
<template #zh>

### 我们要构建什么

</template>
</BiRow>

<BiRow>
<template #en>

We'll build a server that exposes two tools: `get_alerts` and `get_forecast`. Then we'll connect the server to an MCP host (in this case, Claude for Desktop):

</template>
<template #zh>

我们将构建一个公开两个工具的服务器：`get_alerts` 和 `get_forecast`。然后把服务器连接到一个 MCP 宿主（这里选用 Claude for Desktop）：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Servers can connect to any client. We've chosen Claude for Desktop here for simplicity, but we also have a guide on [building your own client](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client).

</template>
<template #zh>

> **注：**
> 服务器可以连接任何客户端。这里为简单起见选用了 Claude for Desktop，我们也有[构建你自己的客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)的指南。

</template>
</BiRow>

<BiRow>
<template #en>

### Core MCP Concepts

</template>
<template #zh>

### MCP 核心概念

</template>
</BiRow>

<BiRow>
<template #en>

MCP servers can provide three main types of capabilities:

</template>
<template #zh>

MCP 服务器可以提供三种主要能力：

</template>
</BiRow>

<BiRow>
<template #en>

1. **[Resources](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#resources)**: File-like data that can be read by clients (like API responses or file contents)
2. **[Tools](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#tools)**: Functions that can be called by the LLM (with user approval)
3. **[Prompts](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#prompts)**: Pre-written templates that help users accomplish specific tasks

</template>
<template #zh>

1. **[资源（Resources）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#resources)**：类文件数据，可由客户端读取（如 API 响应或文件内容）
2. **[工具（Tools）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#tools)**：可由 LLM 调用的函数（需用户批准）
3. **[提示词（Prompts）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#prompts)**：预先写好的模板，帮助用户完成特定任务

</template>
</BiRow>

<BiRow>
<template #en>

This tutorial will primarily focus on tools.

</template>
<template #zh>

本教程将主要聚焦于工具。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-python)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-python)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* Python
* LLMs like Claude

</template>
<template #zh>

* Python
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never write to stdout. Writing to stdout will corrupt the JSON-RPC messages and break your server. The `print()` function writes to stdout by default, so keep it out of a STDIO server entirely.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要向 stdout 写入。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。`print()` 函数默认写入 stdout，因此在 STDIO 服务器中要完全避免使用。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use the standard library `logging` module, which writes to stderr.
* Create one logger per module with `logging.getLogger(__name__)` and call it from your tools.

</template>
<template #zh>

* 使用标准库的 `logging` 模块，它写入 stderr。
* 用 `logging.getLogger(__name__)` 为每个模块创建一个 logger，并在你的工具中调用它。

</template>
</BiRow>

<BiRow>
<template #en>

### Quick Examples

</template>
<template #zh>

### 快速示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
import logging

logger = logging.getLogger(__name__)

# ❌ Bad (STDIO)
print("Processing request")

# ✅ Good (STDIO)
logger.info("Processing request")  # writes to stderr
```

</template>
<template #zh>

```python
import logging

logger = logging.getLogger(__name__)

# ❌ Bad (STDIO)
print("Processing request")

# ✅ Good (STDIO)
logger.info("Processing request")  # writes to stderr
```

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* Python 3.10 or higher installed.
* You must use the Python MCP SDK 2.0.0 or higher.

</template>
<template #zh>

* 已安装 Python 3.10 或更高版本。
* 必须使用 2.0.0 或更高版本的 Python MCP SDK。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install `uv` and set up our Python project and environment:

</template>
<template #zh>

首先，安装 `uv` 并搭建我们的 Python 项目和环境：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

  ```powershell title="[Windows]"
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

  ```powershell title="[Windows]"
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Make sure to restart your terminal afterwards to ensure that the `uv` command gets picked up.

</template>
<template #zh>

之后务必重启终端，确保系统能找到 `uv` 命令。

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up our project:

</template>
<template #zh>

现在，创建并配置我们的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  uv init weather
  cd weather

  # Create virtual environment and activate it
  uv venv
  source .venv/bin/activate

  # Install dependencies
  uv add "mcp[cli]"

  # Create our server file
  touch weather.py
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  uv init weather
  cd weather

  # Create virtual environment and activate it
  uv venv
  .venv\Scripts\activate

  # Install dependencies
  uv add mcp[cli]

  # Create our server file
  new-item weather.py
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  uv init weather
  cd weather

  # Create virtual environment and activate it
  uv venv
  source .venv/bin/activate

  # Install dependencies
  uv add "mcp[cli]"

  # Create our server file
  touch weather.py
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  uv init weather
  cd weather

  # Create virtual environment and activate it
  uv venv
  .venv\Scripts\activate

  # Install dependencies
  uv add mcp[cli]

  # Create our server file
  new-item weather.py
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Importing packages and setting up the instance

</template>
<template #zh>

### 导入包并初始化实例

</template>
</BiRow>

<BiRow>
<template #en>

Add these to the top of your `weather.py`:

</template>
<template #zh>

把以下内容添加到 `weather.py` 的顶部：

</template>
</BiRow>

<BiRow>
<template #en>

```python
from typing import Any

import httpx2
from mcp.server import MCPServer

# Initialize MCPServer
mcp = MCPServer("weather")

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

</template>
<template #zh>

```python
from typing import Any

import httpx2
from mcp.server import MCPServer

# Initialize MCPServer
mcp = MCPServer("weather")

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

</template>
</BiRow>

<BiRow>
<template #en>

`httpx2` is the HTTP client the SDK itself depends on, so installing `mcp` already brought it in.

</template>
<template #zh>

`httpx2` 是 SDK 自身依赖的 HTTP 客户端，所以安装 `mcp` 时已经把它一并装好了。

</template>
</BiRow>

<BiRow>
<template #en>

The MCPServer class uses Python type hints and docstrings to automatically generate tool definitions, making it easy to create and maintain MCP tools.

</template>
<template #zh>

MCPServer 类利用 Python 类型提示（type hints）和文档字符串（docstring）自动生成工具定义，让 MCP 工具的创建和维护变得简单。

</template>
</BiRow>

<BiRow>
<template #en>

### Helper functions

</template>
<template #zh>

### 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's add our helper functions for querying and formatting the data from the National Weather Service API:

</template>
<template #zh>

接下来，添加用于查询和格式化 NWS（美国国家气象局，National Weather Service）API 数据的辅助函数：

</template>
</BiRow>

<BiRow>
<template #en>

```python
async def make_nws_request(url: str) -> dict[str, Any] | None:
    """Make a request to the NWS API with proper error handling."""
    headers = {"User-Agent": USER_AGENT, "Accept": "application/geo+json"}
    async with httpx2.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None

def format_alert(feature: dict) -> str:
    """Format an alert feature into a readable string."""
    props = feature["properties"]
    return f"""
Event: {props.get("event", "Unknown")}
Area: {props.get("areaDesc", "Unknown")}
Severity: {props.get("severity", "Unknown")}
Description: {props.get("description", "No description available")}
Instructions: {props.get("instruction", "No specific instructions provided")}
"""
```

</template>
<template #zh>

```python
async def make_nws_request(url: str) -> dict[str, Any] | None:
    """Make a request to the NWS API with proper error handling."""
    headers = {"User-Agent": USER_AGENT, "Accept": "application/geo+json"}
    async with httpx2.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None

def format_alert(feature: dict) -> str:
    """Format an alert feature into a readable string."""
    props = feature["properties"]
    return f"""
Event: {props.get("event", "Unknown")}
Area: {props.get("areaDesc", "Unknown")}
Severity: {props.get("severity", "Unknown")}
Description: {props.get("description", "No description available")}
Instructions: {props.get("instruction", "No specific instructions provided")}
"""
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing tool execution

</template>
<template #zh>

### 实现工具执行

</template>
</BiRow>

<BiRow>
<template #en>

The tool execution handler is responsible for actually executing the logic of each tool. Let's add it:

</template>
<template #zh>

工具执行处理器负责实际执行每个工具的逻辑。来添加它：

</template>
</BiRow>

<BiRow>
<template #en>

```python
@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)

    if not data or "features" not in data:
        return "Unable to fetch alerts or no alerts found."

    if not data["features"]:
        return "No active alerts for this state."

    alerts = [format_alert(feature) for feature in data["features"]]
    return "\n---\n".join(alerts)

@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """Get weather forecast for a location.

    Args:
        latitude: Latitude of the location
        longitude: Longitude of the location
    """
    # First get the forecast grid endpoint
    points_url = f"{NWS_API_BASE}/points/{latitude},{longitude}"
    points_data = await make_nws_request(points_url)

    if not points_data:
        return "Unable to fetch forecast data for this location."

    # Get the forecast URL from the points response
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = await make_nws_request(forecast_url)

    if not forecast_data:
        return "Unable to fetch detailed forecast."

    # Format the periods into a readable forecast
    periods = forecast_data["properties"]["periods"]
    forecasts = []
    for period in periods[:5]:  # Only show next 5 periods
        forecast = f"""
{period["name"]}:
Temperature: {period["temperature"]}°{period["temperatureUnit"]}
Wind: {period["windSpeed"]} {period["windDirection"]}
Forecast: {period["detailedForecast"]}
"""
        forecasts.append(forecast)

    return "\n---\n".join(forecasts)
```

</template>
<template #zh>

```python
@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)

    if not data or "features" not in data:
        return "Unable to fetch alerts or no alerts found."

    if not data["features"]:
        return "No active alerts for this state."

    alerts = [format_alert(feature) for feature in data["features"]]
    return "\n---\n".join(alerts)

@mcp.tool()
async def get_forecast(latitude: float, longitude: float) -> str:
    """Get weather forecast for a location.

    Args:
        latitude: Latitude of the location
        longitude: Longitude of the location
    """
    # First get the forecast grid endpoint
    points_url = f"{NWS_API_BASE}/points/{latitude},{longitude}"
    points_data = await make_nws_request(points_url)

    if not points_data:
        return "Unable to fetch forecast data for this location."

    # Get the forecast URL from the points response
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = await make_nws_request(forecast_url)

    if not forecast_data:
        return "Unable to fetch detailed forecast."

    # Format the periods into a readable forecast
    periods = forecast_data["properties"]["periods"]
    forecasts = []
    for period in periods[:5]:  # Only show next 5 periods
        forecast = f"""
{period["name"]}:
Temperature: {period["temperature"]}°{period["temperatureUnit"]}
Wind: {period["windSpeed"]} {period["windDirection"]}
Forecast: {period["detailedForecast"]}
"""
        forecasts.append(forecast)

    return "\n---\n".join(forecasts)
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, let's initialize and run the server:

</template>
<template #zh>

最后，初始化并运行服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```python
if __name__ == "__main__":
    mcp.run(transport="stdio")
```

</template>
<template #zh>

```python
if __name__ == "__main__":
    mcp.run(transport="stdio")
```

</template>
</BiRow>

<BiRow>
<template #en>

Your server is complete! Run `uv run weather.py` to start the MCP server, which will listen for messages from MCP hosts.

</template>
<template #zh>

你的服务器已经完成！运行 `uv run weather.py` 启动 MCP 服务器，它会监听来自 MCP 宿主的消息。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version
here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里
安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "uv",
        "args": [
          "--directory",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather",
          "run",
          "weather.py"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "uv",
        "args": [
          "--directory",
          "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather",
          "run",
          "weather.py"
        ]
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "uv",
        "args": [
          "--directory",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather",
          "run",
          "weather.py"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "uv",
        "args": [
          "--directory",
          "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather",
          "run",
          "weather.py"
        ]
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> You may need to put the full path to the `uv` executable in the `command` field. You can get this by running `which uv` on macOS/Linux or `where uv` on Windows.

</template>
<template #zh>

> **注意：**
> 你可能需要在 `command` 字段中填入 `uv` 可执行文件的完整路径。在 macOS/Linux 上运行 `which uv`、在 Windows 上运行 `where uv` 即可获取。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Make sure you pass in the absolute path to your server. You can get this by running `pwd` on macOS/Linux or `cd` on Windows Command Prompt. On Windows, remember to use double backslashes (`\\`) or forward slashes (`/`) in the JSON path.

</template>
<template #zh>

> **注：**
> 务必传入你服务器的绝对路径。在 macOS/Linux 上运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`）。

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. To launch it by running `uv --directory /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather run weather.py`

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行 `uv --directory /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather run weather.py` 来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* TypeScript
* LLMs like Claude

</template>
<template #zh>

* TypeScript
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `console.log()`, as it writes to standard output (stdout) by default. Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `console.log()`，它默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use `console.error()` which writes to stderr, or use a logging library that writes to stderr or files.

</template>
<template #zh>

* 使用写入 stderr 的 `console.error()`，或使用写入 stderr 或文件的日志库。

</template>
</BiRow>

<BiRow>
<template #en>

### Quick Examples

</template>
<template #zh>

### 快速示例

</template>
</BiRow>

<BiRow>
<template #en>

```javascript
// ❌ Bad (STDIO)
console.log("Server started");

// ✅ Good (STDIO)
console.error("Server started"); // stderr is safe
```

</template>
<template #zh>

```javascript
// ❌ Bad (STDIO)
console.log("Server started");

// ✅ Good (STDIO)
console.error("Server started"); // stderr is safe
```

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

For TypeScript, make sure you have the latest version of Node installed.

</template>
<template #zh>

对于 TypeScript，请确保你安装了最新版本的 Node。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install Node.js and npm if you haven't already. You can download them from [nodejs.org](https://nodejs.org/).
Verify your Node.js installation:

</template>
<template #zh>

首先，如果还没有安装 Node.js 和 npm，先安装它们。可以从 [nodejs.org](https://nodejs.org/) 下载。
验证你的 Node.js 安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
node --version
npm --version
```

</template>
<template #zh>

```bash
node --version
npm --version
```

</template>
</BiRow>

<BiRow>
<template #en>

For this tutorial, you'll need Node.js version 20 or higher.

</template>
<template #zh>

本教程需要 Node.js 20 或更高版本。

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up our project:

</template>
<template #zh>

现在，创建并配置我们的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize a new npm project
  npm init -y

  # Install dependencies
  npm install @modelcontextprotocol/server zod
  npm install -D @types/node typescript

  # Create our files
  mkdir src
  touch src/index.ts
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize a new npm project
  npm init -y

  # Install dependencies
  npm install @modelcontextprotocol/server zod
  npm install -D @types/node typescript

  # Create our files
  md src
  new-item src\index.ts
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize a new npm project
  npm init -y

  # Install dependencies
  npm install @modelcontextprotocol/server zod
  npm install -D @types/node typescript

  # Create our files
  mkdir src
  touch src/index.ts
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize a new npm project
  npm init -y

  # Install dependencies
  npm install @modelcontextprotocol/server zod
  npm install -D @types/node typescript

  # Create our files
  md src
  new-item src\index.ts
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Update your package.json to add type: "module" and a build script:

</template>
<template #zh>

更新你的 package.json，添加 type: "module" 和一个 build 脚本：

</template>
</BiRow>

<BiRow>
<template #en>

```json title="package.json"
{
  "type": "module",
  "bin": {
    "weather": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": ["build"]
}
```

</template>
<template #zh>

```json title="package.json"
{
  "type": "module",
  "bin": {
    "weather": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": ["build"]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Create a `tsconfig.json` in the root of your project:

</template>
<template #zh>

在项目根目录创建一个 `tsconfig.json`：

</template>
</BiRow>

<BiRow>
<template #en>

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "types": ["node"],
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

</template>
<template #zh>

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "types": ["node"],
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Importing packages and setting up the instance

</template>
<template #zh>

### 导入包并初始化实例

</template>
</BiRow>

<BiRow>
<template #en>

Add these to the top of your `src/index.ts`:

</template>
<template #zh>

把以下内容添加到 `src/index.ts` 的顶部：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
```

</template>
<template #zh>

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
```

</template>
</BiRow>

<BiRow>
<template #en>

### Helper functions

</template>
<template #zh>

### 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's add our helper functions for querying and formatting the data from the National Weather Service API:

</template>
<template #zh>

接下来，添加用于查询和格式化 NWS API 数据的辅助函数：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// Helper function for making NWS API requests
async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

interface AlertFeature {
  properties: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

// Format alert data
function formatAlert(feature: AlertFeature): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

interface AlertsResponse {
  features: AlertFeature[];
}

interface PointsResponse {
  properties: {
    forecast?: string;
  };
}

interface ForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}
```

</template>
<template #zh>

```typescript
// Helper function for making NWS API requests
async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

interface AlertFeature {
  properties: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

// Format alert data
function formatAlert(feature: AlertFeature): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

interface AlertsResponse {
  features: AlertFeature[];
}

interface PointsResponse {
  properties: {
    forecast?: string;
  };
}

interface ForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing tool execution

</template>
<template #zh>

### 实现工具执行

</template>
</BiRow>

<BiRow>
<template #en>

The tool execution handler is responsible for actually executing the logic of each tool. Let's add it:

</template>
<template #zh>

工具执行处理器负责实际执行每个工具的逻辑。来添加它：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// Register weather tools

server.registerTool(
  "get_alerts",
  {
    description: "Get weather alerts for a state",
    inputSchema: z.object({
      state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)"),
    }),
  },
  async ({ state }) => {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

    if (!alertsData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve alerts data",
          },
        ],
      };
    }

    const features = alertsData.features || [];
    if (!features.length) {
      return {
        content: [
          {
            type: "text",
            text: `No active alerts for ${stateCode}`,
          },
        ],
      };
    }

    const formattedAlerts = features.map(formatAlert);
    const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: alertsText,
        },
      ],
    };
  },
);

server.registerTool(
  "get_forecast",
  {
    description: "Get weather forecast for a location",
    inputSchema: z.object({
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Latitude of the location"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
    }),
  },
  async ({ latitude, longitude }) => {
    // Get grid point data
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

    if (!pointsData) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
          },
        ],
      };
    }

    const forecastUrl = pointsData.properties?.forecast;
    if (!forecastUrl) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to get forecast URL from grid point data",
          },
        ],
      };
    }

    // Get forecast data
    const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
    if (!forecastData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve forecast data",
          },
        ],
      };
    }

    const periods = forecastData.properties?.periods || [];
    if (periods.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No forecast periods available",
          },
        ],
      };
    }

    // Format forecast periods
    const formattedForecast = periods.map((period: ForecastPeriod) =>
      [
        `${period.name || "Unknown"}:`,
        `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
        `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
        `${period.shortForecast || "No forecast available"}`,
        "---",
      ].join("\n"),
    );

    const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: forecastText,
        },
      ],
    };
  },
);
```

</template>
<template #zh>

```typescript
// Register weather tools

server.registerTool(
  "get_alerts",
  {
    description: "Get weather alerts for a state",
    inputSchema: z.object({
      state: z
        .string()
        .length(2)
        .describe("Two-letter state code (e.g. CA, NY)"),
    }),
  },
  async ({ state }) => {
    const stateCode = state.toUpperCase();
    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

    if (!alertsData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve alerts data",
          },
        ],
      };
    }

    const features = alertsData.features || [];
    if (!features.length) {
      return {
        content: [
          {
            type: "text",
            text: `No active alerts for ${stateCode}`,
          },
        ],
      };
    }

    const formattedAlerts = features.map(formatAlert);
    const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: alertsText,
        },
      ],
    };
  },
);

server.registerTool(
  "get_forecast",
  {
    description: "Get weather forecast for a location",
    inputSchema: z.object({
      latitude: z
        .number()
        .min(-90)
        .max(90)
        .describe("Latitude of the location"),
      longitude: z
        .number()
        .min(-180)
        .max(180)
        .describe("Longitude of the location"),
    }),
  },
  async ({ latitude, longitude }) => {
    // Get grid point data
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

    if (!pointsData) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to retrieve grid point data for coordinates: ${latitude}, ${longitude}. This location may not be supported by the NWS API (only US locations are supported).`,
          },
        ],
      };
    }

    const forecastUrl = pointsData.properties?.forecast;
    if (!forecastUrl) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to get forecast URL from grid point data",
          },
        ],
      };
    }

    // Get forecast data
    const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
    if (!forecastData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve forecast data",
          },
        ],
      };
    }

    const periods = forecastData.properties?.periods || [];
    if (periods.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No forecast periods available",
          },
        ],
      };
    }

    // Format forecast periods
    const formattedForecast = periods.map((period: ForecastPeriod) =>
      [
        `${period.name || "Unknown"}:`,
        `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}`,
        `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
        `${period.shortForecast || "No forecast available"}`,
        "---",
      ].join("\n"),
    );

    const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;

    return {
      content: [
        {
          type: "text",
          text: forecastText,
        },
      ],
    };
  },
);
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, implement the main function to run the server:

</template>
<template #zh>

最后，实现运行服务器的 main 函数：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

</template>
<template #zh>

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

</template>
</BiRow>

<BiRow>
<template #en>

Make sure to run `npm run build` to build your server! This is a very important step in getting your server to connect.

</template>
<template #zh>

务必运行 `npm run build` 来构建你的服务器！这是让服务器成功连接的关键一步。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version
here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里
安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "node",
        "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js"]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "node",
        "args": ["C:\\PATH\\TO\\PARENT\\FOLDER\\weather\\build\\index.js"]
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "node",
        "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js"]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "node",
        "args": ["C:\\PATH\\TO\\PARENT\\FOLDER\\weather\\build\\index.js"]
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running `node /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js`

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行 `node /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js` 来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> This is a quickstart demo based on Spring AI MCP auto-configuration and boot starters.
  To learn how to create sync and async MCP Servers, manually, consult the [Java SDK Server](https://java.sdk.modelcontextprotocol.io/) documentation.

</template>
<template #zh>

> **注：**
> 这是一个基于 Spring AI MCP 自动配置和 boot starter 的快速入门演示。
  要学习如何手动创建同步和异步 MCP 服务器，请查阅 [Java SDK Server](https://java.sdk.modelcontextprotocol.io/) 文档。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server!
[You can find the complete code for what we'll be building here.](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-stdio-server)

</template>
<template #zh>

让我们开始构建天气服务器吧！
[我们要构建的完整代码在这里。](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-stdio-server)

</template>
</BiRow>

<BiRow>
<template #en>

For more information, see the [MCP Server Boot Starter](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) reference documentation.
For manual MCP Server implementation, refer to the [MCP Server Java SDK documentation](https://java.sdk.modelcontextprotocol.io/).

</template>
<template #zh>

更多信息请参阅 [MCP Server Boot Starter](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) 参考文档。
如需手动实现 MCP 服务器，请参阅 [MCP Server Java SDK 文档](https://java.sdk.modelcontextprotocol.io/)。

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `System.out.println()` or `System.out.print()`, as they write to standard output (stdout). Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `System.out.println()` 或 `System.out.print()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use a logging library that writes to stderr or files.
* Ensure any configured logging library will not write to stdout.

</template>
<template #zh>

* 使用写入 stderr 或文件的日志库。
* 确保配置的任何日志库都不会写入 stdout。

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* Java 17 or higher installed.
* [Spring Boot 3.3.x](https://docs.spring.io/spring-boot/installing.html) or higher

</template>
<template #zh>

* 已安装 Java 17 或更高版本。
* [Spring Boot 3.3.x](https://docs.spring.io/spring-boot/installing.html) 或更高版本

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

Use the [Spring Initializer](https://start.spring.io/) to bootstrap the project.

</template>
<template #zh>

使用 [Spring Initializer](https://start.spring.io/) 引导创建项目。

</template>
</BiRow>

<BiRow>
<template #en>

You will need to add the following dependencies:

</template>
<template #zh>

你需要添加以下依赖：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```xml title="[Maven]"
  <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-starter-mcp-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
        </dependency>
  </dependencies>
  ```

  ```groovy title="[Gradle]"
  dependencies {
    implementation platform("org.springframework.ai:spring-ai-starter-mcp-server")
    implementation platform("org.springframework:spring-web")
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```xml title="[Maven]"
  <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-starter-mcp-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
        </dependency>
  </dependencies>
  ```

  ```groovy title="[Gradle]"
  dependencies {
    implementation platform("org.springframework.ai:spring-ai-starter-mcp-server")
    implementation platform("org.springframework:spring-web")
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Then configure your application by setting the application properties:

</template>
<template #zh>

然后通过设置应用属性来配置你的应用：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[application.properties]"
  spring.main.bannerMode=off
  logging.pattern.console=
  ```

  ```yaml title="[application.yml]"
  logging:
    pattern:
      console:
  spring:
    main:
      banner-mode: off
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[application.properties]"
  spring.main.bannerMode=off
  logging.pattern.console=
  ```

  ```yaml title="[application.yml]"
  logging:
    pattern:
      console:
  spring:
    main:
      banner-mode: off
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

The [Server Configuration Properties](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html#_configuration_properties) documents all available properties.

</template>
<template #zh>

[Server Configuration Properties](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html#_configuration_properties) 文档列出了所有可用属性。

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Weather Service

</template>
<template #zh>

### 天气服务

</template>
</BiRow>

<BiRow>
<template #en>

Let's implement a [WeatherService.java](https://github.com/spring-projects/spring-ai-examples/blob/main/model-context-protocol/weather/starter-stdio-server/src/main/java/org/springframework/ai/mcp/sample/server/WeatherService.java) that uses a REST client to query the data from the National Weather Service API:

</template>
<template #zh>

我们来实现一个 [WeatherService.java](https://github.com/spring-projects/spring-ai-examples/blob/main/model-context-protocol/weather/starter-stdio-server/src/main/java/org/springframework/ai/mcp/sample/server/WeatherService.java)，它用 REST 客户端查询 NWS API 的数据：

</template>
</BiRow>

<BiRow>
<template #en>

```java
@Service
public class WeatherService {

	private final RestClient restClient;

	public WeatherService() {
		this.restClient = RestClient.builder()
			.baseUrl("https://api.weather.gov")
			.defaultHeader("Accept", "application/geo+json")
			.defaultHeader("User-Agent", "WeatherApiClient/1.0 (your@email.com)")
			.build();
	}

  @Tool(description = "Get weather forecast for a specific latitude/longitude")
  public String getWeatherForecastByLocation(
      double latitude,   // Latitude coordinate
      double longitude   // Longitude coordinate
  ) {
      // Returns detailed forecast including:
      // - Temperature and unit
      // - Wind speed and direction
      // - Detailed forecast description
  }

  @Tool(description = "Get weather alerts for a US state")
  public String getAlerts(
      @ToolParam(description = "Two-letter US state code (e.g. CA, NY)") String state
  ) {
      // Returns active alerts including:
      // - Event type
      // - Affected area
      // - Severity
      // - Description
      // - Safety instructions
  }

  // ......
}
```

</template>
<template #zh>

```java
@Service
public class WeatherService {

	private final RestClient restClient;

	public WeatherService() {
		this.restClient = RestClient.builder()
			.baseUrl("https://api.weather.gov")
			.defaultHeader("Accept", "application/geo+json")
			.defaultHeader("User-Agent", "WeatherApiClient/1.0 (your@email.com)")
			.build();
	}

  @Tool(description = "Get weather forecast for a specific latitude/longitude")
  public String getWeatherForecastByLocation(
      double latitude,   // Latitude coordinate
      double longitude   // Longitude coordinate
  ) {
      // Returns detailed forecast including:
      // - Temperature and unit
      // - Wind speed and direction
      // - Detailed forecast description
  }

  @Tool(description = "Get weather alerts for a US state")
  public String getAlerts(
      @ToolParam(description = "Two-letter US state code (e.g. CA, NY)") String state
  ) {
      // Returns active alerts including:
      // - Event type
      // - Affected area
      // - Severity
      // - Description
      // - Safety instructions
  }

  // ......
}
```

</template>
</BiRow>

<BiRow>
<template #en>

The `@Service` annotation will auto-register the service in your application context.
The Spring AI `@Tool` annotation makes it easy to create and maintain MCP tools.

</template>
<template #zh>

`@Service` 注解会自动把该服务注册到你的应用上下文中。
Spring AI 的 `@Tool` 注解让 MCP 工具的创建和维护变得简单。

</template>
</BiRow>

<BiRow>
<template #en>

The auto-configuration will automatically register these tools with the MCP server.

</template>
<template #zh>

自动配置会自动把这些工具注册到 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

### Create your Boot Application

</template>
<template #zh>

### 创建你的 Boot 应用

</template>
</BiRow>

<BiRow>
<template #en>

```java
@SpringBootApplication
public class McpServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(McpServerApplication.class, args);
	}

	@Bean
	public ToolCallbackProvider weatherTools(WeatherService weatherService) {
		return  MethodToolCallbackProvider.builder().toolObjects(weatherService).build();
	}
}
```

</template>
<template #zh>

```java
@SpringBootApplication
public class McpServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(McpServerApplication.class, args);
	}

	@Bean
	public ToolCallbackProvider weatherTools(WeatherService weatherService) {
		return  MethodToolCallbackProvider.builder().toolObjects(weatherService).build();
	}
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Uses the `MethodToolCallbackProvider` utils to convert the `@Tools` into actionable callbacks used by the MCP server.

</template>
<template #zh>

它使用 `MethodToolCallbackProvider` 工具类，把 `@Tools` 转换为 MCP 服务器使用的可调用回调。

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, let's build the server:

</template>
<template #zh>

最后，构建服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
./mvnw clean install
```

</template>
<template #zh>

```bash
./mvnw clean install
```

</template>
</BiRow>

<BiRow>
<template #en>

This will generate an `mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar` file within the `target` folder.

</template>
<template #zh>

这会在 `target` 目录中生成一个 `mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar` 文件。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed.
[You can install the latest version here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。
[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use.
To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor.
Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。
为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。
如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key.
The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。
只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "spring-ai-mcp-weather": {
        "command": "java",
        "args": [
          "-Dspring.ai.mcp.server.stdio=true",
          "-jar",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "spring-ai-mcp-weather": {
        "command": "java",
        "args": [
          "-Dspring.ai.mcp.server.transport=STDIO",
          "-jar",
          "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar"
        ]
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "spring-ai-mcp-weather": {
        "command": "java",
        "args": [
          "-Dspring.ai.mcp.server.stdio=true",
          "-jar",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "spring-ai-mcp-weather": {
        "command": "java",
        "args": [
          "-Dspring.ai.mcp.server.transport=STDIO",
          "-jar",
          "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar"
        ]
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Make sure you pass in the absolute path to your server.

</template>
<template #zh>

> **注：**
> 务必传入你服务器的绝对路径。

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "my-weather-server"
2. To launch it by running `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar`

</template>
<template #zh>

1. 存在一个名为 "my-weather-server" 的 MCP 服务器
2. 通过运行 `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar` 来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Java client

</template>
<template #zh>

## 用 Java 客户端测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Create an MCP Client manually

</template>
<template #zh>

### 手动创建 MCP 客户端

</template>
</BiRow>

<BiRow>
<template #en>

Use the `McpClient` to connect to the server:

</template>
<template #zh>

使用 `McpClient` 连接服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```java
var stdioParams = ServerParameters.builder("java")
  .args("-jar", "/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar")
  .build();

var stdioTransport = new StdioClientTransport(stdioParams);

var mcpClient = McpClient.sync(stdioTransport).build();

mcpClient.initialize();

ListToolsResult toolsList = mcpClient.listTools();

CallToolResult weather = mcpClient.callTool(
  new CallToolRequest("getWeatherForecastByLocation",
      Map.of("latitude", "47.6062", "longitude", "-122.3321")));

CallToolResult alert = mcpClient.callTool(
  new CallToolRequest("getAlerts", Map.of("state", "NY")));

mcpClient.closeGracefully();
```

</template>
<template #zh>

```java
var stdioParams = ServerParameters.builder("java")
  .args("-jar", "/ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar")
  .build();

var stdioTransport = new StdioClientTransport(stdioParams);

var mcpClient = McpClient.sync(stdioTransport).build();

mcpClient.initialize();

ListToolsResult toolsList = mcpClient.listTools();

CallToolResult weather = mcpClient.callTool(
  new CallToolRequest("getWeatherForecastByLocation",
      Map.of("latitude", "47.6062", "longitude", "-122.3321")));

CallToolResult alert = mcpClient.callTool(
  new CallToolRequest("getAlerts", Map.of("state", "NY")));

mcpClient.closeGracefully();
```

</template>
</BiRow>

<BiRow>
<template #en>

### Use MCP Client Boot Starter

</template>
<template #zh>

### 使用 MCP Client Boot Starter

</template>
</BiRow>

<BiRow>
<template #en>

Create a new boot starter application using the `spring-ai-starter-mcp-client` dependency:

</template>
<template #zh>

用 `spring-ai-starter-mcp-client` 依赖创建一个新的 boot starter 应用：

</template>
</BiRow>

<BiRow>
<template #en>

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>
```

</template>
<template #zh>

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-mcp-client</artifactId>
</dependency>
```

</template>
</BiRow>

<BiRow>
<template #en>

and set the `spring.ai.mcp.client.stdio.servers-configuration` property to point to your `claude_desktop_config.json`.
You can reuse the existing Anthropic Desktop configuration:

</template>
<template #zh>

并把 `spring.ai.mcp.client.stdio.servers-configuration` 属性指向你的 `claude_desktop_config.json`。
你可以复用现有的 Anthropic Desktop 配置：

</template>
</BiRow>

<BiRow>
<template #en>

```properties
spring.ai.mcp.client.stdio.servers-configuration=file:PATH/TO/claude_desktop_config.json
```

</template>
<template #zh>

```properties
spring.ai.mcp.client.stdio.servers-configuration=file:PATH/TO/claude_desktop_config.json
```

</template>
</BiRow>

<BiRow>
<template #en>

When you start your client application, the auto-configuration will automatically create MCP clients from the claude\_desktop\_config.json.

</template>
<template #zh>

启动客户端应用时，自动配置会自动根据 claude\_desktop\_config.json 创建 MCP 客户端。

</template>
</BiRow>

<BiRow>
<template #en>

For more information, see the [MCP Client Boot Starters](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-client-docs.html) reference documentation.

</template>
<template #zh>

更多信息请参阅 [MCP Client Boot Starters](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-client-docs.html) 参考文档。

</template>
</BiRow>

<BiRow>
<template #en>

## More Java MCP Server examples

</template>
<template #zh>

## 更多 Java MCP 服务器示例

</template>
</BiRow>

<BiRow>
<template #en>

The [starter-webflux-server](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-webflux-server) demonstrates how to create an HTTP-based MCP server with the WebFlux starter.
Set the `spring.ai.mcp.server.protocol=STREAMABLE` property to serve it over Streamable HTTP.
It showcases how to define and register MCP Tools, Resources, and Prompts, using the Spring Boot's auto-configuration capabilities.

</template>
<template #zh>

[starter-webflux-server](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-webflux-server) 演示了如何用 WebFlux starter 创建基于 HTTP 的 MCP 服务器。
设置 `spring.ai.mcp.server.protocol=STREAMABLE` 属性即可让它以 Streamable HTTP 方式提供服务。
它展示了如何利用 Spring Boot 的自动配置能力来定义并注册 MCP 工具、资源和提示词。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/kotlin-sdk/tree/main/samples/weather-stdio-server)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/kotlin-sdk/tree/main/samples/weather-stdio-server)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* Kotlin
* LLMs like Claude

</template>
<template #zh>

* Kotlin
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `println()`, as it writes to standard output (stdout) by default. Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `println()`，它默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use a logging library that writes to stderr or files.

</template>
<template #zh>

* 使用写入 stderr 或文件的日志库。

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* JDK 11 or higher installed.

</template>
<template #zh>

* 已安装 JDK 11 或更高版本。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install `java` and `gradle` if you haven't already.
You can download `java` from [official Oracle JDK website](https://www.oracle.com/java/technologies/downloads/).
Verify your `java` installation:

</template>
<template #zh>

首先，如果还没有安装 `java` 和 `gradle`，先安装它们。
`java` 可以从 [Oracle JDK 官网](https://www.oracle.com/java/technologies/downloads/)下载。
验证你的 `java` 安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
java --version
```

</template>
<template #zh>

```bash
java --version
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up your project:

</template>
<template #zh>

现在，创建并配置你的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize a new kotlin project
  gradle init
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize a new kotlin project
  gradle init
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize a new kotlin project
  gradle init
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize a new kotlin project
  gradle init
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

After running `gradle init`, select **Application** as the project type, **Kotlin** as the programming language.

</template>
<template #zh>

运行 `gradle init` 后，项目类型选择 **Application**，编程语言选择 **Kotlin**。

</template>
</BiRow>

<BiRow>
<template #en>

Alternatively, you can create a Kotlin application using the [IntelliJ IDEA project wizard](https://kotlinlang.org/docs/jvm-get-started.html).

</template>
<template #zh>

你也可以用 [IntelliJ IDEA 项目向导](https://kotlinlang.org/docs/jvm-get-started.html)创建 Kotlin 应用。

</template>
</BiRow>

<BiRow>
<template #en>

After creating the project, replace the contents of your `build.gradle.kts` with:

</template>
<template #zh>

创建项目后，把 `build.gradle.kts` 的内容替换为：

</template>
</BiRow>

<BiRow>
<template #en>

```kotlin title="build.gradle.kts"
// Check latest versions at https://github.com/modelcontextprotocol/kotlin-sdk/releases
val mcpVersion = "0.9.0"
val ktorVersion = "3.2.3"
val slf4jVersion = "2.0.17"

plugins {
    kotlin("jvm") version "2.3.20"
    kotlin("plugin.serialization") version "2.3.20"
    id("com.gradleup.shadow") version "8.3.9"
    application
}

application {
    mainClass.set("MainKt")
}

dependencies {
    implementation("io.modelcontextprotocol:kotlin-sdk:$mcpVersion")
    implementation("io.ktor:ktor-client-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    implementation("io.ktor:ktor-client-cio:$ktorVersion")
    implementation("org.slf4j:slf4j-simple:$slf4jVersion")
}
```

</template>
<template #zh>

```kotlin title="build.gradle.kts"
// Check latest versions at https://github.com/modelcontextprotocol/kotlin-sdk/releases
val mcpVersion = "0.9.0"
val ktorVersion = "3.2.3"
val slf4jVersion = "2.0.17"

plugins {
    kotlin("jvm") version "2.3.20"
    kotlin("plugin.serialization") version "2.3.20"
    id("com.gradleup.shadow") version "8.3.9"
    application
}

application {
    mainClass.set("MainKt")
}

dependencies {
    implementation("io.modelcontextprotocol:kotlin-sdk:$mcpVersion")
    implementation("io.ktor:ktor-client-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktorVersion")
    implementation("io.ktor:ktor-client-cio:$ktorVersion")
    implementation("org.slf4j:slf4j-simple:$slf4jVersion")
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Verify that everything is set up correctly:

</template>
<template #zh>

验证一切都配置正确：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
./gradlew build
```

</template>
<template #zh>

```bash
./gradlew build
```

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Setting up the instance

</template>
<template #zh>

### 初始化实例

</template>
</BiRow>

<BiRow>
<template #en>

Add a server initialization function:

</template>
<template #zh>

添加一个服务器初始化函数：

</template>
</BiRow>

<BiRow>
<template #en>

```kotlin
fun runMcpServer() {
    val server = Server(
        Implementation(
            name = "weather",
            version = "1.0.0",
        ),
        ServerOptions(
            capabilities = ServerCapabilities(tools = ServerCapabilities.Tools(listChanged = true)),
        ),
    )

    // register tools on server here

    val transport = StdioServerTransport(
        System.`in`.asInput(),
        System.out.asSink().buffered(),
    )

    runBlocking {
        val session = server.createSession(transport)
        val done = Job()
        session.onClose {
            done.complete()
        }
        done.join()
    }
}
```

</template>
<template #zh>

```kotlin
fun runMcpServer() {
    val server = Server(
        Implementation(
            name = "weather",
            version = "1.0.0",
        ),
        ServerOptions(
            capabilities = ServerCapabilities(tools = ServerCapabilities.Tools(listChanged = true)),
        ),
    )

    // register tools on server here

    val transport = StdioServerTransport(
        System.`in`.asInput(),
        System.out.asSink().buffered(),
    )

    runBlocking {
        val session = server.createSession(transport)
        val done = Job()
        session.onClose {
            done.complete()
        }
        done.join()
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Weather API helper functions

</template>
<template #zh>

### 天气 API 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's add functions and data classes for querying and converting responses from the National Weather Service API:

</template>
<template #zh>

接下来，添加用于查询 NWS API 并转换其响应的函数和数据类：

</template>
</BiRow>

<BiRow>
<template #en>

```kotlin
val httpClient = HttpClient(CIO) {
    defaultRequest {
        url("https://api.weather.gov")
        headers {
            append("Accept", "application/geo+json")
            append("User-Agent", "WeatherApiClient/1.0")
        }
        contentType(ContentType.Application.Json)
    }
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}

// Extension function to fetch weather alerts for a given state
suspend fun HttpClient.getAlerts(state: String): List<String> {
    val alerts = this.get("/alerts/active/area/$state").body<AlertsResponse>()
    return alerts.features.map { feature ->
        """
            Event: ${feature.properties.event}
            Area: ${feature.properties.areaDesc}
            Severity: ${feature.properties.severity}
            Status: ${feature.properties.status}
            Headline: ${feature.properties.headline}
        """.trimIndent()
    }
}

// Extension function to fetch forecast information for given latitude and longitude
suspend fun HttpClient.getForecast(latitude: Double, longitude: Double): List<String> {
    val points = this.get("/points/$latitude,$longitude").body<PointsResponse>()
    val forecastUrl = points.properties.forecast ?: error("No forecast URL available")
    val forecast = this.get(forecastUrl).body<ForecastResponse>()
    return forecast.properties.periods.map { period ->
        """
            ${period.name}:
            Temperature: ${period.temperature}°${period.temperatureUnit}
            Wind: ${period.windSpeed} ${period.windDirection}
            ${period.shortForecast}
        """.trimIndent()
    }
}

@Serializable
data class PointsResponse(val properties: PointsProperties)

@Serializable
data class PointsProperties(val forecast: String? = null)

@Serializable
data class ForecastResponse(val properties: ForecastProperties)

@Serializable
data class ForecastProperties(val periods: List<ForecastPeriod> = emptyList())

@Serializable
data class ForecastPeriod(
    val name: String? = null,
    val temperature: Int? = null,
    val temperatureUnit: String? = null,
    val windSpeed: String? = null,
    val windDirection: String? = null,
    val shortForecast: String? = null,
)

@Serializable
data class AlertsResponse(val features: List<AlertFeature> = emptyList())

@Serializable
data class AlertFeature(val properties: AlertProperties)

@Serializable
data class AlertProperties(
    val event: String? = null,
    val areaDesc: String? = null,
    val severity: String? = null,
    val status: String? = null,
    val headline: String? = null,
)
```

</template>
<template #zh>

```kotlin
val httpClient = HttpClient(CIO) {
    defaultRequest {
        url("https://api.weather.gov")
        headers {
            append("Accept", "application/geo+json")
            append("User-Agent", "WeatherApiClient/1.0")
        }
        contentType(ContentType.Application.Json)
    }
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}

// Extension function to fetch weather alerts for a given state
suspend fun HttpClient.getAlerts(state: String): List<String> {
    val alerts = this.get("/alerts/active/area/$state").body<AlertsResponse>()
    return alerts.features.map { feature ->
        """
            Event: ${feature.properties.event}
            Area: ${feature.properties.areaDesc}
            Severity: ${feature.properties.severity}
            Status: ${feature.properties.status}
            Headline: ${feature.properties.headline}
        """.trimIndent()
    }
}

// Extension function to fetch forecast information for given latitude and longitude
suspend fun HttpClient.getForecast(latitude: Double, longitude: Double): List<String> {
    val points = this.get("/points/$latitude,$longitude").body<PointsResponse>()
    val forecastUrl = points.properties.forecast ?: error("No forecast URL available")
    val forecast = this.get(forecastUrl).body<ForecastResponse>()
    return forecast.properties.periods.map { period ->
        """
            ${period.name}:
            Temperature: ${period.temperature}°${period.temperatureUnit}
            Wind: ${period.windSpeed} ${period.windDirection}
            ${period.shortForecast}
        """.trimIndent()
    }
}

@Serializable
data class PointsResponse(val properties: PointsProperties)

@Serializable
data class PointsProperties(val forecast: String? = null)

@Serializable
data class ForecastResponse(val properties: ForecastProperties)

@Serializable
data class ForecastProperties(val periods: List<ForecastPeriod> = emptyList())

@Serializable
data class ForecastPeriod(
    val name: String? = null,
    val temperature: Int? = null,
    val temperatureUnit: String? = null,
    val windSpeed: String? = null,
    val windDirection: String? = null,
    val shortForecast: String? = null,
)

@Serializable
data class AlertsResponse(val features: List<AlertFeature> = emptyList())

@Serializable
data class AlertFeature(val properties: AlertProperties)

@Serializable
data class AlertProperties(
    val event: String? = null,
    val areaDesc: String? = null,
    val severity: String? = null,
    val status: String? = null,
    val headline: String? = null,
)
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing tool execution

</template>
<template #zh>

### 实现工具执行

</template>
</BiRow>

<BiRow>
<template #en>

The tool execution handler is responsible for actually executing the logic of each tool. Let's add it:

</template>
<template #zh>

工具执行处理器负责实际执行每个工具的逻辑。来添加它：

</template>
</BiRow>

<BiRow>
<template #en>

```kotlin
// Register weather tools

server.addTool(
    name = "get_alerts",
    description = "Get weather alerts for a US state. Input is a two-letter US state code (e.g. CA, NY)",
    inputSchema = ToolSchema(
        properties = buildJsonObject {
            putJsonObject("state") {
                put("type", "string")
                put("description", "Two-letter US state code (e.g. CA, NY)")
            }
        },
        required = listOf("state"),
    ),
) { request ->
    val state = request.arguments?.get("state")?.jsonPrimitive?.content
        ?: return@addTool CallToolResult(
            content = listOf(TextContent("The 'state' parameter is required.")),
        )

    val alerts = httpClient.getAlerts(state)
    CallToolResult(content = alerts.map { TextContent(it) })
}

server.addTool(
    name = "get_forecast",
    description = "Get weather forecast for a location. Note: only US locations are supported by the NWS API.",
    inputSchema = ToolSchema(
        properties = buildJsonObject {
            putJsonObject("latitude") {
                put("type", "number")
                put("description", "Latitude of the location")
            }
            putJsonObject("longitude") {
                put("type", "number")
                put("description", "Longitude of the location")
            }
        },
        required = listOf("latitude", "longitude"),
    ),
) { request ->
    val latitude = request.arguments?.get("latitude")?.jsonPrimitive?.doubleOrNull
    val longitude = request.arguments?.get("longitude")?.jsonPrimitive?.doubleOrNull
    if (latitude == null || longitude == null) {
        return@addTool CallToolResult(
            content = listOf(TextContent("The 'latitude' and 'longitude' parameters are required.")),
        )
    }

    val forecast = httpClient.getForecast(latitude, longitude)
    CallToolResult(content = forecast.map { TextContent(it) })
}
```

</template>
<template #zh>

```kotlin
// Register weather tools

server.addTool(
    name = "get_alerts",
    description = "Get weather alerts for a US state. Input is a two-letter US state code (e.g. CA, NY)",
    inputSchema = ToolSchema(
        properties = buildJsonObject {
            putJsonObject("state") {
                put("type", "string")
                put("description", "Two-letter US state code (e.g. CA, NY)")
            }
        },
        required = listOf("state"),
    ),
) { request ->
    val state = request.arguments?.get("state")?.jsonPrimitive?.content
        ?: return@addTool CallToolResult(
            content = listOf(TextContent("The 'state' parameter is required.")),
        )

    val alerts = httpClient.getAlerts(state)
    CallToolResult(content = alerts.map { TextContent(it) })
}

server.addTool(
    name = "get_forecast",
    description = "Get weather forecast for a location. Note: only US locations are supported by the NWS API.",
    inputSchema = ToolSchema(
        properties = buildJsonObject {
            putJsonObject("latitude") {
                put("type", "number")
                put("description", "Latitude of the location")
            }
            putJsonObject("longitude") {
                put("type", "number")
                put("description", "Longitude of the location")
            }
        },
        required = listOf("latitude", "longitude"),
    ),
) { request ->
    val latitude = request.arguments?.get("latitude")?.jsonPrimitive?.doubleOrNull
    val longitude = request.arguments?.get("longitude")?.jsonPrimitive?.doubleOrNull
    if (latitude == null || longitude == null) {
        return@addTool CallToolResult(
            content = listOf(TextContent("The 'latitude' and 'longitude' parameters are required.")),
        )
    }

    val forecast = httpClient.getForecast(latitude, longitude)
    CallToolResult(content = forecast.map { TextContent(it) })
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, implement the main function to run the server:

</template>
<template #zh>

最后，实现运行服务器的 main 函数：

</template>
</BiRow>

<BiRow>
<template #en>

```kotlin
fun main() = runMcpServer()
```

</template>
<template #zh>

```kotlin
fun main() = runMcpServer()
```

</template>
</BiRow>

<BiRow>
<template #en>

You can run the server directly during development:

</template>
<template #zh>

开发期间可以直接运行服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
./gradlew run
```

</template>
<template #zh>

```bash
./gradlew run
```

</template>
</BiRow>

<BiRow>
<template #en>

For production use, build the shadow JAR:

</template>
<template #zh>

生产环境请构建 shadow JAR：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
./gradlew build
java -jar build/libs/weather-0.1.0-all.jar
```

</template>
<template #zh>

```bash
./gradlew build
java -jar build/libs/weather-0.1.0-all.jar
```

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version
here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里
安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use.
To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor.
Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。
为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。
如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key.
The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。
只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "java",
        "args": [
          "-jar",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "java",
        "args": [
          "-jar",
          "C:\\PATH\\TO\\PARENT\\FOLDER\\weather\\build\\libs\\weather-0.1.0-all.jar"
        ]
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "java",
        "args": [
          "-jar",
          "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar"
        ]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "java",
        "args": [
          "-jar",
          "C:\\PATH\\TO\\PARENT\\FOLDER\\weather\\build\\libs\\weather-0.1.0-all.jar"
        ]
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar`

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行 `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar` 来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/csharp-sdk/tree/main/samples/QuickstartWeatherServer)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/csharp-sdk/tree/main/samples/QuickstartWeatherServer)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* C#
* LLMs like Claude
* .NET 8 or higher

</template>
<template #zh>

* C#
* Claude 之类的 LLM
* .NET 8 或更高版本

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `Console.WriteLine()` or `Console.Write()`, as they write to standard output (stdout). Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `Console.WriteLine()` 或 `Console.Write()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use a logging library that writes to stderr or files.

</template>
<template #zh>

* 使用写入 stderr 或文件的日志库。

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or higher installed.

</template>
<template #zh>

* 已安装 [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) 或更高版本。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install `dotnet` if you haven't already. You can download `dotnet` from [official Microsoft .NET website](https://dotnet.microsoft.com/download/). Verify your `dotnet` installation:

</template>
<template #zh>

首先，如果还没有安装 `dotnet`，先安装它。`dotnet` 可以从 [微软 .NET 官网](https://dotnet.microsoft.com/download/)下载。验证你的 `dotnet` 安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
dotnet --version
```

</template>
<template #zh>

```bash
dotnet --version
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up your project:

</template>
<template #zh>

现在，创建并配置你的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather
  # Initialize a new C# project
  dotnet new console
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  mkdir weather
  cd weather
  # Initialize a new C# project
  dotnet new console
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather
  # Initialize a new C# project
  dotnet new console
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  mkdir weather
  cd weather
  # Initialize a new C# project
  dotnet new console
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

After running `dotnet new console`, you will be presented with a new C# project.
You can open the project in your favorite IDE, such as [Visual Studio](https://visualstudio.microsoft.com/) or [Rider](https://www.jetbrains.com/rider/).
Alternatively, you can create a C# application using the [Visual Studio project wizard](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2022).
After creating the project, add NuGet package for the Model Context Protocol SDK and hosting:

</template>
<template #zh>

运行 `dotnet new console` 后，你会得到一个新的 C# 项目。
可以用你喜欢的 IDE 打开该项目，比如 [Visual Studio](https://visualstudio.microsoft.com/) 或 [Rider](https://www.jetbrains.com/rider/)。
你也可以用 [Visual Studio 项目向导](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2022)创建 C# 应用。
创建项目后，为模型上下文协议（Model Context Protocol）SDK 和托管（hosting）添加 NuGet 包：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
# Add the Model Context Protocol SDK NuGet package
dotnet add package ModelContextProtocol --prerelease
# Add the .NET Hosting NuGet package
dotnet add package Microsoft.Extensions.Hosting
```

</template>
<template #zh>

```bash
# Add the Model Context Protocol SDK NuGet package
dotnet add package ModelContextProtocol --prerelease
# Add the .NET Hosting NuGet package
dotnet add package Microsoft.Extensions.Hosting
```

</template>
</BiRow>

<BiRow>
<template #en>

Now let’s dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

Open the `Program.cs` file in your project and replace its contents with the following code:

</template>
<template #zh>

打开项目中的 `Program.cs` 文件，把它的内容替换为以下代码：

</template>
</BiRow>

<BiRow>
<template #en>

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ModelContextProtocol;
using System.Net.Http.Headers;

var builder = Host.CreateEmptyApplicationBuilder(settings: null);

builder.Services.AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();

builder.Services.AddSingleton(_ =>
{
    var client = new HttpClient() { BaseAddress = new Uri("https://api.weather.gov") };
    client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("weather-tool", "1.0"));
    return client;
});

var app = builder.Build();

await app.RunAsync();
```

</template>
<template #zh>

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ModelContextProtocol;
using System.Net.Http.Headers;

var builder = Host.CreateEmptyApplicationBuilder(settings: null);

builder.Services.AddMcpServer()
    .WithStdioServerTransport()
    .WithToolsFromAssembly();

builder.Services.AddSingleton(_ =>
{
    var client = new HttpClient() { BaseAddress = new Uri("https://api.weather.gov") };
    client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("weather-tool", "1.0"));
    return client;
});

var app = builder.Build();

await app.RunAsync();
```

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> When creating the `ApplicationHostBuilder`, ensure you use `CreateEmptyApplicationBuilder` instead of `CreateDefaultBuilder`. This ensures that the server does not write any additional messages to the console. This is only necessary for servers using STDIO transport.

</template>
<template #zh>

> **注：**
> 创建 `ApplicationHostBuilder` 时，务必使用 `CreateEmptyApplicationBuilder` 而不是 `CreateDefaultBuilder`。这能确保服务器不会向控制台写入任何多余的消息。这一点只对使用 STDIO 传输的服务器有必要。

</template>
</BiRow>

<BiRow>
<template #en>

This code sets up a basic console application that uses the Model Context Protocol SDK to create an MCP server with standard I/O transport.

</template>
<template #zh>

这段代码搭建了一个基础控制台应用，使用模型上下文协议 SDK 创建一个采用标准输入输出（stdio）传输的 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

### Weather API helper functions

</template>
<template #zh>

### 天气 API 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Create an extension class for `HttpClient` which helps simplify JSON request handling:

</template>
<template #zh>

为 `HttpClient` 创建一个扩展类，帮助简化 JSON 请求处理：

</template>
</BiRow>

<BiRow>
<template #en>

```csharp
using System.Text.Json;

internal static class HttpClientExt
{
    public static async Task<JsonDocument> ReadJsonDocumentAsync(this HttpClient client, string requestUri)
    {
        using var response = await client.GetAsync(requestUri);
        response.EnsureSuccessStatusCode();
        return await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
    }
}
```

</template>
<template #zh>

```csharp
using System.Text.Json;

internal static class HttpClientExt
{
    public static async Task<JsonDocument> ReadJsonDocumentAsync(this HttpClient client, string requestUri)
    {
        using var response = await client.GetAsync(requestUri);
        response.EnsureSuccessStatusCode();
        return await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Next, define a class with the tool execution handlers for querying and converting responses from the National Weather Service API:

</template>
<template #zh>

接下来，定义一个类，包含用于查询 NWS API 并转换其响应的工具执行处理器：

</template>
</BiRow>

<BiRow>
<template #en>

```csharp
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Globalization;
using System.Text.Json;

namespace QuickstartWeatherServer.Tools;

[McpServerToolType]
public static class WeatherTools
{
    [McpServerTool, Description("Get weather alerts for a US state code.")]
    public static async Task<string> GetAlerts(
        HttpClient client,
        [Description("The US state code to get alerts for.")] string state)
    {
        using var jsonDocument = await client.ReadJsonDocumentAsync($"/alerts/active/area/{state}");
        var jsonElement = jsonDocument.RootElement;
        var alerts = jsonElement.GetProperty("features").EnumerateArray();

        if (!alerts.Any())
        {
            return "No active alerts for this state.";
        }

        return string.Join("\n--\n", alerts.Select(alert =>
        {
            JsonElement properties = alert.GetProperty("properties");
            return $"""
                    Event: {properties.GetProperty("event").GetString()}
                    Area: {properties.GetProperty("areaDesc").GetString()}
                    Severity: {properties.GetProperty("severity").GetString()}
                    Description: {properties.GetProperty("description").GetString()}
                    Instruction: {properties.GetProperty("instruction").GetString()}
                    """;
        }));
    }

    [McpServerTool, Description("Get weather forecast for a location.")]
    public static async Task<string> GetForecast(
        HttpClient client,
        [Description("Latitude of the location.")] double latitude,
        [Description("Longitude of the location.")] double longitude)
    {
        var pointUrl = string.Create(CultureInfo.InvariantCulture, $"/points/{latitude},{longitude}");
        using var jsonDocument = await client.ReadJsonDocumentAsync(pointUrl);
        var forecastUrl = jsonDocument.RootElement.GetProperty("properties").GetProperty("forecast").GetString()
            ?? throw new Exception($"No forecast URL provided by {client.BaseAddress}points/{latitude},{longitude}");

        using var forecastDocument = await client.ReadJsonDocumentAsync(forecastUrl);
        var periods = forecastDocument.RootElement.GetProperty("properties").GetProperty("periods").EnumerateArray();

        return string.Join("\n---\n", periods.Select(period => $"""
                {period.GetProperty("name").GetString()}
                Temperature: {period.GetProperty("temperature").GetInt32()}°F
                Wind: {period.GetProperty("windSpeed").GetString()} {period.GetProperty("windDirection").GetString()}
                Forecast: {period.GetProperty("detailedForecast").GetString()}
                """));
    }
}
```

</template>
<template #zh>

```csharp
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Globalization;
using System.Text.Json;

namespace QuickstartWeatherServer.Tools;

[McpServerToolType]
public static class WeatherTools
{
    [McpServerTool, Description("Get weather alerts for a US state code.")]
    public static async Task<string> GetAlerts(
        HttpClient client,
        [Description("The US state code to get alerts for.")] string state)
    {
        using var jsonDocument = await client.ReadJsonDocumentAsync($"/alerts/active/area/{state}");
        var jsonElement = jsonDocument.RootElement;
        var alerts = jsonElement.GetProperty("features").EnumerateArray();

        if (!alerts.Any())
        {
            return "No active alerts for this state.";
        }

        return string.Join("\n--\n", alerts.Select(alert =>
        {
            JsonElement properties = alert.GetProperty("properties");
            return $"""
                    Event: {properties.GetProperty("event").GetString()}
                    Area: {properties.GetProperty("areaDesc").GetString()}
                    Severity: {properties.GetProperty("severity").GetString()}
                    Description: {properties.GetProperty("description").GetString()}
                    Instruction: {properties.GetProperty("instruction").GetString()}
                    """;
        }));
    }

    [McpServerTool, Description("Get weather forecast for a location.")]
    public static async Task<string> GetForecast(
        HttpClient client,
        [Description("Latitude of the location.")] double latitude,
        [Description("Longitude of the location.")] double longitude)
    {
        var pointUrl = string.Create(CultureInfo.InvariantCulture, $"/points/{latitude},{longitude}");
        using var jsonDocument = await client.ReadJsonDocumentAsync(pointUrl);
        var forecastUrl = jsonDocument.RootElement.GetProperty("properties").GetProperty("forecast").GetString()
            ?? throw new Exception($"No forecast URL provided by {client.BaseAddress}points/{latitude},{longitude}");

        using var forecastDocument = await client.ReadJsonDocumentAsync(forecastUrl);
        var periods = forecastDocument.RootElement.GetProperty("properties").GetProperty("periods").EnumerateArray();

        return string.Join("\n---\n", periods.Select(period => $"""
                {period.GetProperty("name").GetString()}
                Temperature: {period.GetProperty("temperature").GetInt32()}°F
                Wind: {period.GetProperty("windSpeed").GetString()} {period.GetProperty("windDirection").GetString()}
                Forecast: {period.GetProperty("detailedForecast").GetString()}
                """));
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, run the server using the following command:

</template>
<template #zh>

最后，用以下命令运行服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
dotnet run
```

</template>
<template #zh>

```bash
dotnet run
```

</template>
</BiRow>

<BiRow>
<template #en>

This will start the server and listen for incoming requests on standard input/output.

</template>
<template #zh>

这会启动服务器，并通过标准输入输出监听传入的请求。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version
here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**
We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.
For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里
安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**
我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。
例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.
In this case, we'll add our single weather server like so:

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。
本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "dotnet",
        "args": ["run", "--project", "/ABSOLUTE/PATH/TO/PROJECT", "--no-build"]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "dotnet",
        "args": [
          "run",
          "--project",
          "C:\\ABSOLUTE\\PATH\\TO\\PROJECT",
          "--no-build"
        ]
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "dotnet",
        "args": ["run", "--project", "/ABSOLUTE/PATH/TO/PROJECT", "--no-build"]
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "dotnet",
        "args": [
          "run",
          "--project",
          "C:\\ABSOLUTE\\PATH\\TO\\PROJECT",
          "--no-build"
        ]
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running `dotnet run /ABSOLUTE/PATH/TO/PROJECT`
   Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行 `dotnet run /ABSOLUTE/PATH/TO/PROJECT` 来启动它
   保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-ruby)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-ruby)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* Ruby
* LLMs like Claude

</template>
<template #zh>

* Ruby
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `puts` or `print`, as they write to standard output (stdout) by default. Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `puts` 或 `print`，它们默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use a logging library that writes to stderr or files.

</template>
<template #zh>

* 使用写入 stderr 或文件的日志库。

</template>
</BiRow>

<BiRow>
<template #en>

### Quick Examples

</template>
<template #zh>

### 快速示例

</template>
</BiRow>

<BiRow>
<template #en>

```ruby
# ❌ Bad (STDIO)
puts "Processing request"

# ✅ Good (STDIO)
require "logger"
logger = Logger.new($stderr)
logger.info("Processing request")
```

</template>
<template #zh>

```ruby
# ❌ Bad (STDIO)
puts "Processing request"

# ✅ Good (STDIO)
require "logger"
logger = Logger.new($stderr)
logger.info("Processing request")
```

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* Ruby 2.7 or higher installed.

</template>
<template #zh>

* 已安装 Ruby 2.7 或更高版本。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's make sure you have Ruby installed. You can check by running:

</template>
<template #zh>

首先，确认你已经安装了 Ruby。可以运行以下命令检查：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
ruby --version
```

</template>
<template #zh>

```bash
ruby --version
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up our project:

</template>
<template #zh>

现在，创建并配置我们的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Create a Gemfile
  bundle init

  # Add the MCP SDK dependency
  bundle add mcp

  # Create our server file
  touch weather.rb
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Create a Gemfile
  bundle init

  # Add the MCP SDK dependency
  bundle add mcp

  # Create our server file
  new-item weather.rb
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Create a Gemfile
  bundle init

  # Add the MCP SDK dependency
  bundle add mcp

  # Create our server file
  touch weather.rb
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Create a Gemfile
  bundle init

  # Add the MCP SDK dependency
  bundle add mcp

  # Create our server file
  new-item weather.rb
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Importing packages and setting up constants

</template>
<template #zh>

### 导入包并设置常量

</template>
</BiRow>

<BiRow>
<template #en>

Open `weather.rb` and add these requires and constants at the top:

</template>
<template #zh>

打开 `weather.rb`，在顶部添加这些 require 和常量：

</template>
</BiRow>

<BiRow>
<template #en>

```ruby
require "json"
require "mcp"
require "net/http"
require "uri"

NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

</template>
<template #zh>

```ruby
require "json"
require "mcp"
require "net/http"
require "uri"

NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"
```

</template>
</BiRow>

<BiRow>
<template #en>

The `mcp` gem provides the Model Context Protocol SDK for Ruby, with classes for server implementation and stdio transport.

</template>
<template #zh>

`mcp` gem 提供了 Ruby 版模型上下文协议 SDK，包含实现服务器和 stdio（标准输入输出）传输所需的类。

</template>
</BiRow>

<BiRow>
<template #en>

### Helper methods

</template>
<template #zh>

### 辅助方法

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's add helper methods for querying and formatting data from the National Weather Service API:

</template>
<template #zh>

接下来，添加用于查询和格式化 NWS API 数据的辅助方法：

</template>
</BiRow>

<BiRow>
<template #en>

```ruby
module HelperMethods
  def make_nws_request(url)
    uri = URI(url)
    request = Net::HTTP::Get.new(uri)
    request["User-Agent"] = USER_AGENT
    request["Accept"] = "application/geo+json"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end

    raise "HTTP #{response.code}: #{response.message}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)
  end

  def format_alert(feature)
    properties = feature["properties"]

    <<~ALERT
      Event: #{properties["event"] || "Unknown"}
      Area: #{properties["areaDesc"] || "Unknown"}
      Severity: #{properties["severity"] || "Unknown"}
      Description: #{properties["description"] || "No description available"}
      Instructions: #{properties["instruction"] || "No specific instructions provided"}
    ALERT
  end
end
```

</template>
<template #zh>

```ruby
module HelperMethods
  def make_nws_request(url)
    uri = URI(url)
    request = Net::HTTP::Get.new(uri)
    request["User-Agent"] = USER_AGENT
    request["Accept"] = "application/geo+json"

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end

    raise "HTTP #{response.code}: #{response.message}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body)
  end

  def format_alert(feature)
    properties = feature["properties"]

    <<~ALERT
      Event: #{properties["event"] || "Unknown"}
      Area: #{properties["areaDesc"] || "Unknown"}
      Severity: #{properties["severity"] || "Unknown"}
      Description: #{properties["description"] || "No description available"}
      Instructions: #{properties["instruction"] || "No specific instructions provided"}
    ALERT
  end
end
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing tool execution

</template>
<template #zh>

### 实现工具执行

</template>
</BiRow>

<BiRow>
<template #en>

Now let's define our tool classes. Each tool subclasses `MCP::Tool` and implements the tool logic:

</template>
<template #zh>

现在来定义我们的工具类。每个工具都是 `MCP::Tool` 的子类，并实现工具逻辑：

</template>
</BiRow>

<BiRow>
<template #en>

```ruby
class GetAlerts < MCP::Tool
  extend HelperMethods

  tool_name "get_alerts"
  description "Get weather alerts for a US state"
  input_schema(
    properties: {
      state: {
        type: "string",
        description: "Two-letter US state code (e.g. CA, NY)"
      }
    },
    required: ["state"]
  )

  def self.call(state:)
    url = "#{NWS_API_BASE}/alerts/active/area/#{state.upcase}"
    data = make_nws_request(url)

    if data["features"].empty?
      return MCP::Tool::Response.new([{
        type: "text",
        text: "No active alerts for this state."
      }])
    end

    alerts = data["features"].map { |feature| format_alert(feature) }
    MCP::Tool::Response.new([{
      type: "text",
      text: alerts.join("\n---\n")
    }])
  end
end

class GetForecast < MCP::Tool
  extend HelperMethods

  tool_name "get_forecast"
  description "Get weather forecast for a location"
  input_schema(
    properties: {
      latitude: {
        type: "number",
        description: "Latitude of the location"
      },
      longitude: {
        type: "number",
        description: "Longitude of the location"
      }
    },
    required: ["latitude", "longitude"]
  )

  def self.call(latitude:, longitude:)
    # First get the forecast grid endpoint.
    points_url = "#{NWS_API_BASE}/points/#{latitude},#{longitude}"
    points_data = make_nws_request(points_url)

    # Get the forecast URL from the points response.
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = make_nws_request(forecast_url)

    # Format the periods into a readable forecast.
    periods = forecast_data["properties"]["periods"]
    forecasts = periods.first(5).map do |period|
      <<~FORECAST
        #{period["name"]}:
        Temperature: #{period["temperature"]}°#{period["temperatureUnit"]}
        Wind: #{period["windSpeed"]} #{period["windDirection"]}
        Forecast: #{period["detailedForecast"]}
      FORECAST
    end

    MCP::Tool::Response.new([{
      type: "text",
      text: forecasts.join("\n---\n")
    }])
  end
end
```

</template>
<template #zh>

```ruby
class GetAlerts < MCP::Tool
  extend HelperMethods

  tool_name "get_alerts"
  description "Get weather alerts for a US state"
  input_schema(
    properties: {
      state: {
        type: "string",
        description: "Two-letter US state code (e.g. CA, NY)"
      }
    },
    required: ["state"]
  )

  def self.call(state:)
    url = "#{NWS_API_BASE}/alerts/active/area/#{state.upcase}"
    data = make_nws_request(url)

    if data["features"].empty?
      return MCP::Tool::Response.new([{
        type: "text",
        text: "No active alerts for this state."
      }])
    end

    alerts = data["features"].map { |feature| format_alert(feature) }
    MCP::Tool::Response.new([{
      type: "text",
      text: alerts.join("\n---\n")
    }])
  end
end

class GetForecast < MCP::Tool
  extend HelperMethods

  tool_name "get_forecast"
  description "Get weather forecast for a location"
  input_schema(
    properties: {
      latitude: {
        type: "number",
        description: "Latitude of the location"
      },
      longitude: {
        type: "number",
        description: "Longitude of the location"
      }
    },
    required: ["latitude", "longitude"]
  )

  def self.call(latitude:, longitude:)
    # First get the forecast grid endpoint.
    points_url = "#{NWS_API_BASE}/points/#{latitude},#{longitude}"
    points_data = make_nws_request(points_url)

    # Get the forecast URL from the points response.
    forecast_url = points_data["properties"]["forecast"]
    forecast_data = make_nws_request(forecast_url)

    # Format the periods into a readable forecast.
    periods = forecast_data["properties"]["periods"]
    forecasts = periods.first(5).map do |period|
      <<~FORECAST
        #{period["name"]}:
        Temperature: #{period["temperature"]}°#{period["temperatureUnit"]}
        Wind: #{period["windSpeed"]} #{period["windDirection"]}
        Forecast: #{period["detailedForecast"]}
      FORECAST
    end

    MCP::Tool::Response.new([{
      type: "text",
      text: forecasts.join("\n---\n")
    }])
  end
end
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, initialize and run the server:

</template>
<template #zh>

最后，初始化并运行服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```ruby
server = MCP::Server.new(
  name: "weather",
  version: "1.0.0",
  tools: [GetAlerts, GetForecast]
)

transport = MCP::Server::Transports::StdioTransport.new(server)
transport.open
```

</template>
<template #zh>

```ruby
server = MCP::Server.new(
  name: "weather",
  version: "1.0.0",
  tools: [GetAlerts, GetForecast]
)

transport = MCP::Server::Transports::StdioTransport.new(server)
transport.open
```

</template>
</BiRow>

<BiRow>
<template #en>

Your server is complete! Run `bundle exec ruby weather.rb` to start the MCP server, which will listen for messages from MCP hosts.

</template>
<template #zh>

你的服务器已经完成！运行 `bundle exec ruby weather.rb` 启动 MCP 服务器，它会监听来自 MCP 宿主的消息。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "bundle",
        "args": ["exec", "ruby", "weather.rb"],
        "cwd": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "bundle",
        "args": ["exec", "ruby", "weather.rb"],
        "cwd": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather"
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "bundle",
        "args": ["exec", "ruby", "weather.rb"],
        "cwd": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "bundle",
        "args": ["exec", "ruby", "weather.rb"],
        "cwd": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather"
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Make sure you pass in the absolute path to your project directory in the `cwd` field. You can get this by running `pwd` on macOS/Linux or `cd` on Windows Command Prompt from your project directory. On Windows, remember to use double backslashes (`\\`) or forward slashes (`/`) in the JSON path.

</template>
<template #zh>

> **注：**
> 务必在 `cwd` 字段中传入你项目目录的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`）。

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running `bundle exec ruby weather.rb` in the specified directory

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 在指定目录中通过运行 `bundle exec ruby weather.rb` 来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-rust)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-rust)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* Rust programming language
* Async/await in Rust
* LLMs like Claude

</template>
<template #zh>

* Rust 编程语言
* Rust 中的 async/await
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `println!()` or `print!()`, as they write to standard output (stdout). Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `println!()` 或 `print!()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use a logging library that writes to stderr or files, such as `tracing` or `log` in Rust.
* Configure your logging framework to avoid stdout output.

</template>
<template #zh>

* 使用写入 stderr 或文件的日志库，例如 Rust 中的 `tracing` 或 `log`。
* 配置你的日志框架，避免输出到 stdout。

</template>
</BiRow>

<BiRow>
<template #en>

### Quick Examples

</template>
<template #zh>

### 快速示例

</template>
</BiRow>

<BiRow>
<template #en>

```rust
// ❌ Bad (STDIO)
println!("Processing request");

// ✅ Good (STDIO)
eprintln!("Processing request"); // writes to stderr
```

</template>
<template #zh>

```rust
// ❌ Bad (STDIO)
println!("Processing request");

// ✅ Good (STDIO)
eprintln!("Processing request"); // writes to stderr
```

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* Rust 1.70 or higher installed.
* Cargo (comes with Rust installation).

</template>
<template #zh>

* 已安装 Rust 1.70 或更高版本。
* Cargo（随 Rust 安装附带）。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install Rust if you haven't already. You can install Rust from [rust-lang.org](https://www.rust-lang.org/tools/install):

</template>
<template #zh>

首先，如果还没有安装 Rust，先安装它。可以从 [rust-lang.org](https://www.rust-lang.org/tools/install) 安装 Rust：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

  ```powershell title="[Windows]"
  # Download and run rustup-init.exe from https://rustup.rs/
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

  ```powershell title="[Windows]"
  # Download and run rustup-init.exe from https://rustup.rs/
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Verify your Rust installation:

</template>
<template #zh>

验证你的 Rust 安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
rustc --version
cargo --version
```

</template>
<template #zh>

```bash
rustc --version
cargo --version
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up our project:

</template>
<template #zh>

现在，创建并配置我们的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new Rust project
  cargo new weather
  cd weather
  ```

  ```powershell title="[Windows]"
  # Create a new Rust project
  cargo new weather
  cd weather
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new Rust project
  cargo new weather
  cd weather
  ```

  ```powershell title="[Windows]"
  # Create a new Rust project
  cargo new weather
  cd weather
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Update your `Cargo.toml` to add the required dependencies:

</template>
<template #zh>

更新你的 `Cargo.toml`，添加所需的依赖：

</template>
</BiRow>

<BiRow>
<template #en>

```toml title="Cargo.toml"
[package]
name = "weather"
version = "0.1.0"
edition = "2024"

[dependencies]
rmcp = { version = "0.3", features = ["server", "macros", "transport-io"] }
tokio = { version = "1.46", features = ["full"] }
reqwest = { version = "0.12", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
anyhow = "1.0"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "std", "fmt"] }
```

</template>
<template #zh>

```toml title="Cargo.toml"
[package]
name = "weather"
version = "0.1.0"
edition = "2024"

[dependencies]
rmcp = { version = "0.3", features = ["server", "macros", "transport-io"] }
tokio = { version = "1.46", features = ["full"] }
reqwest = { version = "0.12", features = ["json"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
anyhow = "1.0"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter", "std", "fmt"] }
```

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Importing packages and constants

</template>
<template #zh>

### 导入包与常量

</template>
</BiRow>

<BiRow>
<template #en>

Open `src/main.rs` and add these imports and constants at the top:

</template>
<template #zh>

打开 `src/main.rs`，在顶部添加这些导入和常量：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
use anyhow::Result;
use rmcp::{
    ServerHandler, ServiceExt,
    handler::server::{router::tool::ToolRouter, tool::Parameters},
    model::*,
    schemars, tool, tool_handler, tool_router,
};
use serde::Deserialize;
use serde::de::DeserializeOwned;

const NWS_API_BASE: &str = "https://api.weather.gov";
const USER_AGENT: &str = "weather-app/1.0";
```

</template>
<template #zh>

```rust
use anyhow::Result;
use rmcp::{
    ServerHandler, ServiceExt,
    handler::server::{router::tool::ToolRouter, tool::Parameters},
    model::*,
    schemars, tool, tool_handler, tool_router,
};
use serde::Deserialize;
use serde::de::DeserializeOwned;

const NWS_API_BASE: &str = "https://api.weather.gov";
const USER_AGENT: &str = "weather-app/1.0";
```

</template>
</BiRow>

<BiRow>
<template #en>

The `rmcp` crate provides the Model Context Protocol SDK for Rust, with features for server implementation, procedural macros, and stdio transport.

</template>
<template #zh>

`rmcp` crate 提供了 Rust 版模型上下文协议 SDK，涵盖服务器实现、过程宏与 stdio 传输特性。

</template>
</BiRow>

<BiRow>
<template #en>

### Data structures

</template>
<template #zh>

### 数据结构

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's define the data structures for deserializing responses from the National Weather Service API:

</template>
<template #zh>

接下来，定义用于反序列化 NWS API 响应的数据结构：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
#[derive(Debug, Deserialize)]
struct AlertsResponse {
    features: Vec<AlertFeature>,
}

#[derive(Debug, Deserialize)]
struct AlertFeature {
    properties: AlertProperties,
}

#[derive(Debug, Deserialize)]
struct AlertProperties {
    event: Option<String>,
    #[serde(rename = "areaDesc")]
    area_desc: Option<String>,
    severity: Option<String>,
    description: Option<String>,
    instruction: Option<String>,
}

#[derive(Debug, Deserialize)]
struct PointsResponse {
    properties: PointsProperties,
}

#[derive(Debug, Deserialize)]
struct PointsProperties {
    forecast: String,
}

#[derive(Debug, Deserialize)]
struct ForecastResponse {
    properties: ForecastProperties,
}

#[derive(Debug, Deserialize)]
struct ForecastProperties {
    periods: Vec<ForecastPeriod>,
}

#[derive(Debug, Deserialize)]
struct ForecastPeriod {
    name: String,
    temperature: i32,
    #[serde(rename = "temperatureUnit")]
    temperature_unit: String,
    #[serde(rename = "windSpeed")]
    wind_speed: String,
    #[serde(rename = "windDirection")]
    wind_direction: String,
    #[serde(rename = "detailedForecast")]
    detailed_forecast: String,
}
```

</template>
<template #zh>

```rust
#[derive(Debug, Deserialize)]
struct AlertsResponse {
    features: Vec<AlertFeature>,
}

#[derive(Debug, Deserialize)]
struct AlertFeature {
    properties: AlertProperties,
}

#[derive(Debug, Deserialize)]
struct AlertProperties {
    event: Option<String>,
    #[serde(rename = "areaDesc")]
    area_desc: Option<String>,
    severity: Option<String>,
    description: Option<String>,
    instruction: Option<String>,
}

#[derive(Debug, Deserialize)]
struct PointsResponse {
    properties: PointsProperties,
}

#[derive(Debug, Deserialize)]
struct PointsProperties {
    forecast: String,
}

#[derive(Debug, Deserialize)]
struct ForecastResponse {
    properties: ForecastProperties,
}

#[derive(Debug, Deserialize)]
struct ForecastProperties {
    periods: Vec<ForecastPeriod>,
}

#[derive(Debug, Deserialize)]
struct ForecastPeriod {
    name: String,
    temperature: i32,
    #[serde(rename = "temperatureUnit")]
    temperature_unit: String,
    #[serde(rename = "windSpeed")]
    wind_speed: String,
    #[serde(rename = "windDirection")]
    wind_direction: String,
    #[serde(rename = "detailedForecast")]
    detailed_forecast: String,
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Now define the request types that MCP clients will send:

</template>
<template #zh>

现在定义 MCP 客户端将发送的请求类型：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
#[derive(serde::Deserialize, schemars::JsonSchema)]
pub struct MCPForecastRequest {
    latitude: f32,
    longitude: f32,
}

#[derive(serde::Deserialize, schemars::JsonSchema)]
pub struct MCPAlertRequest {
    state: String,
}
```

</template>
<template #zh>

```rust
#[derive(serde::Deserialize, schemars::JsonSchema)]
pub struct MCPForecastRequest {
    latitude: f32,
    longitude: f32,
}

#[derive(serde::Deserialize, schemars::JsonSchema)]
pub struct MCPAlertRequest {
    state: String,
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Helper functions

</template>
<template #zh>

### 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Add helper functions for making API requests and formatting responses:

</template>
<template #zh>

添加用于发起 API 请求和格式化响应的辅助函数：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
async fn make_nws_request<T: DeserializeOwned>(url: &str) -> Result<T> {
    let client = reqwest::Client::new();
    let rsp = client
        .get(url)
        .header(reqwest::header::USER_AGENT, USER_AGENT)
        .header(reqwest::header::ACCEPT, "application/geo+json")
        .send()
        .await?
        .error_for_status()?;
    Ok(rsp.json::<T>().await?)
}

fn format_alert(feature: &AlertFeature) -> String {
    let props = &feature.properties;
    format!(
        "Event: {}\nArea: {}\nSeverity: {}\nDescription: {}\nInstructions: {}",
        props.event.as_deref().unwrap_or("Unknown"),
        props.area_desc.as_deref().unwrap_or("Unknown"),
        props.severity.as_deref().unwrap_or("Unknown"),
        props
            .description
            .as_deref()
            .unwrap_or("No description available"),
        props
            .instruction
            .as_deref()
            .unwrap_or("No specific instructions provided")
    )
}

fn format_period(period: &ForecastPeriod) -> String {
    format!(
        "{}:\nTemperature: {}°{}\nWind: {} {}\nForecast: {}",
        period.name,
        period.temperature,
        period.temperature_unit,
        period.wind_speed,
        period.wind_direction,
        period.detailed_forecast
    )
}
```

</template>
<template #zh>

```rust
async fn make_nws_request<T: DeserializeOwned>(url: &str) -> Result<T> {
    let client = reqwest::Client::new();
    let rsp = client
        .get(url)
        .header(reqwest::header::USER_AGENT, USER_AGENT)
        .header(reqwest::header::ACCEPT, "application/geo+json")
        .send()
        .await?
        .error_for_status()?;
    Ok(rsp.json::<T>().await?)
}

fn format_alert(feature: &AlertFeature) -> String {
    let props = &feature.properties;
    format!(
        "Event: {}\nArea: {}\nSeverity: {}\nDescription: {}\nInstructions: {}",
        props.event.as_deref().unwrap_or("Unknown"),
        props.area_desc.as_deref().unwrap_or("Unknown"),
        props.severity.as_deref().unwrap_or("Unknown"),
        props
            .description
            .as_deref()
            .unwrap_or("No description available"),
        props
            .instruction
            .as_deref()
            .unwrap_or("No specific instructions provided")
    )
}

fn format_period(period: &ForecastPeriod) -> String {
    format!(
        "{}:\nTemperature: {}°{}\nWind: {} {}\nForecast: {}",
        period.name,
        period.temperature,
        period.temperature_unit,
        period.wind_speed,
        period.wind_direction,
        period.detailed_forecast
    )
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing the Weather server and tools

</template>
<template #zh>

### 实现天气服务器与工具

</template>
</BiRow>

<BiRow>
<template #en>

Now let's implement the main Weather server struct with the tool handlers:

</template>
<template #zh>

现在来实现包含工具处理器的 Weather 服务器主结构体：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
pub struct Weather {
    tool_router: ToolRouter<Weather>,
}

#[tool_router]
impl Weather {
    fn new() -> Self {
        Self {
            tool_router: Self::tool_router(),
        }
    }

    #[tool(description = "Get weather alerts for a US state.")]
    async fn get_alerts(
        &self,
        Parameters(MCPAlertRequest { state }): Parameters<MCPAlertRequest>,
    ) -> String {
        let url = format!(
            "{}/alerts/active/area/{}",
            NWS_API_BASE,
            state.to_uppercase()
        );

        match make_nws_request::<AlertsResponse>(&url).await {
            Ok(data) => {
                if data.features.is_empty() {
                    "No active alerts for this state.".to_string()
                } else {
                    data.features
                        .iter()
                        .map(format_alert)
                        .collect::<Vec<_>>()
                        .join("\n---\n")
                }
            }
            Err(_) => "Unable to fetch alerts or no alerts found.".to_string(),
        }
    }

    #[tool(description = "Get weather forecast for a location.")]
    async fn get_forecast(
        &self,
        Parameters(MCPForecastRequest {
            latitude,
            longitude,
        }): Parameters<MCPForecastRequest>,
    ) -> String {
        let points_url = format!("{NWS_API_BASE}/points/{latitude},{longitude}");
        let Ok(points_data) = make_nws_request::<PointsResponse>(&points_url).await else {
            return "Unable to fetch forecast data for this location.".to_string();
        };

        let forecast_url = points_data.properties.forecast;

        let Ok(forecast_data) = make_nws_request::<ForecastResponse>(&forecast_url).await else {
            return "Unable to fetch forecast data for this location.".to_string();
        };

        let periods = &forecast_data.properties.periods;
        let forecast_summary: String = periods
            .iter()
            .take(5) // Next 5 periods only
            .map(format_period)
            .collect::<Vec<String>>()
            .join("\n---\n");
        forecast_summary
    }
}
```

</template>
<template #zh>

```rust
pub struct Weather {
    tool_router: ToolRouter<Weather>,
}

#[tool_router]
impl Weather {
    fn new() -> Self {
        Self {
            tool_router: Self::tool_router(),
        }
    }

    #[tool(description = "Get weather alerts for a US state.")]
    async fn get_alerts(
        &self,
        Parameters(MCPAlertRequest { state }): Parameters<MCPAlertRequest>,
    ) -> String {
        let url = format!(
            "{}/alerts/active/area/{}",
            NWS_API_BASE,
            state.to_uppercase()
        );

        match make_nws_request::<AlertsResponse>(&url).await {
            Ok(data) => {
                if data.features.is_empty() {
                    "No active alerts for this state.".to_string()
                } else {
                    data.features
                        .iter()
                        .map(format_alert)
                        .collect::<Vec<_>>()
                        .join("\n---\n")
                }
            }
            Err(_) => "Unable to fetch alerts or no alerts found.".to_string(),
        }
    }

    #[tool(description = "Get weather forecast for a location.")]
    async fn get_forecast(
        &self,
        Parameters(MCPForecastRequest {
            latitude,
            longitude,
        }): Parameters<MCPForecastRequest>,
    ) -> String {
        let points_url = format!("{NWS_API_BASE}/points/{latitude},{longitude}");
        let Ok(points_data) = make_nws_request::<PointsResponse>(&points_url).await else {
            return "Unable to fetch forecast data for this location.".to_string();
        };

        let forecast_url = points_data.properties.forecast;

        let Ok(forecast_data) = make_nws_request::<ForecastResponse>(&forecast_url).await else {
            return "Unable to fetch forecast data for this location.".to_string();
        };

        let periods = &forecast_data.properties.periods;
        let forecast_summary: String = periods
            .iter()
            .take(5) // Next 5 periods only
            .map(format_period)
            .collect::<Vec<String>>()
            .join("\n---\n");
        forecast_summary
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

The `#[tool_router]` macro automatically generates the routing logic, and the `#[tool]` attribute marks methods as MCP tools.

</template>
<template #zh>

`#[tool_router]` 宏会自动生成路由逻辑，`#[tool]` 属性则把方法标记为 MCP 工具。

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing the ServerHandler

</template>
<template #zh>

### 实现 ServerHandler

</template>
</BiRow>

<BiRow>
<template #en>

Implement the `ServerHandler` trait to define server capabilities:

</template>
<template #zh>

实现 `ServerHandler` trait 来定义服务器能力：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
#[tool_handler]
impl ServerHandler for Weather {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}
```

</template>
<template #zh>

```rust
#[tool_handler]
impl ServerHandler for Weather {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, implement the main function to run the server with stdio transport:

</template>
<template #zh>

最后，实现以 stdio 传输运行服务器的主函数：

</template>
</BiRow>

<BiRow>
<template #en>

```rust
#[tokio::main]
async fn main() -> Result<()> {
    let transport = (tokio::io::stdin(), tokio::io::stdout());
    let service = Weather::new().serve(transport).await?;
    service.waiting().await?;
    Ok(())
}
```

</template>
<template #zh>

```rust
#[tokio::main]
async fn main() -> Result<()> {
    let transport = (tokio::io::stdin(), tokio::io::stdout());
    let service = Weather::new().serve(transport).await?;
    service.waiting().await?;
    Ok(())
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Build your server with:

</template>
<template #zh>

用以下命令构建你的服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
cargo build --release
```

</template>
<template #zh>

```bash
cargo build --release
```

</template>
</BiRow>

<BiRow>
<template #en>

The compiled binary will be in `target/release/weather`.

</template>
<template #zh>

编译出的二进制文件位于 `target/release/weather`。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/target/release/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\target\\release\\weather.exe"
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/target/release/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\target\\release\\weather.exe"
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Make sure you pass in the absolute path to your compiled binary. You can get this by running `pwd` on macOS/Linux or `cd` on Windows Command Prompt from your project directory. On Windows, remember to use double backslashes (`\\`) or forward slashes (`/`) in the JSON path, and add the `.exe` extension.

</template>
<template #zh>

> **注：**
> 务必传入编译产物的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`），并加上 `.exe` 扩展名。

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running the compiled binary at the specified path

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行指定路径上的编译产物来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

Let's get started with building our weather server! [You can find the complete code for what we'll be building here.](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-go)

</template>
<template #zh>

让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-go)

</template>
</BiRow>

<BiRow>
<template #en>

### Prerequisite knowledge

</template>
<template #zh>

### 前置知识

</template>
</BiRow>

<BiRow>
<template #en>

This quickstart assumes you have familiarity with:

</template>
<template #zh>

本快速入门假设你熟悉以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

* Go
* LLMs like Claude

</template>
<template #zh>

* Go
* Claude 之类的 LLM

</template>
</BiRow>

<BiRow>
<template #en>

### Logging in MCP Servers

</template>
<template #zh>

### MCP 服务器中的日志

</template>
</BiRow>

<BiRow>
<template #en>

When implementing MCP servers, be careful about how you handle logging:

</template>
<template #zh>

实现 MCP 服务器时，要谨慎处理日志：

</template>
</BiRow>

<BiRow>
<template #en>

**For STDIO-based servers:** Never use `fmt.Println()` or `fmt.Printf()`, as they write to standard output (stdout). Writing to stdout will corrupt the JSON-RPC messages and break your server.

</template>
<template #zh>

**对于基于 STDIO 的服务器：** 千万不要使用 `fmt.Println()` 或 `fmt.Printf()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

</template>
</BiRow>

<BiRow>
<template #en>

**For HTTP-based servers:** Standard output logging is fine since it doesn't interfere with HTTP responses.

</template>
<template #zh>

**对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

</template>
</BiRow>

<BiRow>
<template #en>

### Best Practices

</template>
<template #zh>

### 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

* Use `log.Println()` (which defaults to stderr) or a logging library that writes to stderr or files.
* Use `fmt.Fprintf(os.Stderr, ...)` to write to stderr explicitly.

</template>
<template #zh>

* 使用 `log.Println()`（默认输出到 stderr），或使用写入 stderr 或文件的日志库。
* 用 `fmt.Fprintf(os.Stderr, ...)` 显式写入 stderr。

</template>
</BiRow>

<BiRow>
<template #en>

### Quick Examples

</template>
<template #zh>

### 快速示例

</template>
</BiRow>

<BiRow>
<template #en>

```go
// ❌ Bad (STDIO)
fmt.Println("Processing request")

// ✅ Good (STDIO)
log.Println("Processing request") // defaults to stderr

// ✅ Good (STDIO)
fmt.Fprintln(os.Stderr, "Processing request")
```

</template>
<template #zh>

```go
// ❌ Bad (STDIO)
fmt.Println("Processing request")

// ✅ Good (STDIO)
log.Println("Processing request") // defaults to stderr

// ✅ Good (STDIO)
fmt.Fprintln(os.Stderr, "Processing request")
```

</template>
</BiRow>

<BiRow>
<template #en>

### System requirements

</template>
<template #zh>

### 系统要求

</template>
</BiRow>

<BiRow>
<template #en>

* Go 1.24 or higher installed.

</template>
<template #zh>

* 已安装 Go 1.24 或更高版本。

</template>
</BiRow>

<BiRow>
<template #en>

### Set up your environment

</template>
<template #zh>

### 配置环境

</template>
</BiRow>

<BiRow>
<template #en>

First, let's install Go if you haven't already. You can download and install Go from [go.dev](https://go.dev/dl/).

</template>
<template #zh>

首先，如果还没有安装 Go，先安装它。可以从 [go.dev](https://go.dev/dl/) 下载并安装 Go。

</template>
</BiRow>

<BiRow>
<template #en>

Verify your Go installation:

</template>
<template #zh>

验证你的 Go 安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
go version
```

</template>
<template #zh>

```bash
go version
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's create and set up our project:

</template>
<template #zh>

现在，创建并配置我们的项目：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize Go module
  go mod init weather

  # Install dependencies
  go get github.com/modelcontextprotocol/go-sdk/mcp

  # Create our server file
  touch main.go
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize Go module
  go mod init weather

  # Install dependencies
  go get github.com/modelcontextprotocol/go-sdk/mcp

  # Create our server file
  new-item main.go
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS/Linux]"
  # Create a new directory for our project
  mkdir weather
  cd weather

  # Initialize Go module
  go mod init weather

  # Install dependencies
  go get github.com/modelcontextprotocol/go-sdk/mcp

  # Create our server file
  touch main.go
  ```

  ```powershell title="[Windows]"
  # Create a new directory for our project
  md weather
  cd weather

  # Initialize Go module
  go mod init weather

  # Install dependencies
  go get github.com/modelcontextprotocol/go-sdk/mcp

  # Create our server file
  new-item main.go
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

Now let's dive into building your server.

</template>
<template #zh>

现在开始深入构建你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Building your server

</template>
<template #zh>

## 构建你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

### Importing packages and constants

</template>
<template #zh>

### 导入包与常量

</template>
</BiRow>

<BiRow>
<template #en>

Add these to the top of your `main.go`:

</template>
<template #zh>

把以下内容添加到 `main.go` 的顶部：

</template>
</BiRow>

<BiRow>
<template #en>

```go
package main

import (
	"cmp"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

const (
	NWSAPIBase = "https://api.weather.gov"
	UserAgent  = "weather-app/1.0"
)
```

</template>
<template #zh>

```go
package main

import (
	"cmp"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

const (
	NWSAPIBase = "https://api.weather.gov"
	UserAgent  = "weather-app/1.0"
)
```

</template>
</BiRow>

<BiRow>
<template #en>

### Data structures

</template>
<template #zh>

### 数据结构

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's define the data structures used by our tools:

</template>
<template #zh>

接下来，定义我们的工具会用到的数据结构：

</template>
</BiRow>

<BiRow>
<template #en>

```go
type PointsResponse struct {
	Properties struct {
		Forecast string `json:"forecast"`
	} `json:"properties"`
}

type ForecastResponse struct {
	Properties struct {
		Periods []ForecastPeriod `json:"periods"`
	} `json:"properties"`
}

type ForecastPeriod struct {
	Name             string `json:"name"`
	Temperature      int    `json:"temperature"`
	TemperatureUnit  string `json:"temperatureUnit"`
	WindSpeed        string `json:"windSpeed"`
	WindDirection    string `json:"windDirection"`
	DetailedForecast string `json:"detailedForecast"`
}

type AlertsResponse struct {
	Features []AlertFeature `json:"features"`
}

type AlertFeature struct {
	Properties AlertProperties `json:"properties"`
}

type AlertProperties struct {
	Event       string `json:"event"`
	AreaDesc    string `json:"areaDesc"`
	Severity    string `json:"severity"`
	Description string `json:"description"`
	Instruction string `json:"instruction"`
}

type ForecastInput struct {
	Latitude  float64 `json:"latitude" jsonschema:"Latitude of the location"`
	Longitude float64 `json:"longitude" jsonschema:"Longitude of the location"`
}

type AlertsInput struct {
	State string `json:"state" jsonschema:"Two-letter US state code (e.g. CA, NY)"`
}
```

</template>
<template #zh>

```go
type PointsResponse struct {
	Properties struct {
		Forecast string `json:"forecast"`
	} `json:"properties"`
}

type ForecastResponse struct {
	Properties struct {
		Periods []ForecastPeriod `json:"periods"`
	} `json:"properties"`
}

type ForecastPeriod struct {
	Name             string `json:"name"`
	Temperature      int    `json:"temperature"`
	TemperatureUnit  string `json:"temperatureUnit"`
	WindSpeed        string `json:"windSpeed"`
	WindDirection    string `json:"windDirection"`
	DetailedForecast string `json:"detailedForecast"`
}

type AlertsResponse struct {
	Features []AlertFeature `json:"features"`
}

type AlertFeature struct {
	Properties AlertProperties `json:"properties"`
}

type AlertProperties struct {
	Event       string `json:"event"`
	AreaDesc    string `json:"areaDesc"`
	Severity    string `json:"severity"`
	Description string `json:"description"`
	Instruction string `json:"instruction"`
}

type ForecastInput struct {
	Latitude  float64 `json:"latitude" jsonschema:"Latitude of the location"`
	Longitude float64 `json:"longitude" jsonschema:"Longitude of the location"`
}

type AlertsInput struct {
	State string `json:"state" jsonschema:"Two-letter US state code (e.g. CA, NY)"`
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Helper functions

</template>
<template #zh>

### 辅助函数

</template>
</BiRow>

<BiRow>
<template #en>

Next, let's add our helper functions for querying and formatting the data from the National Weather Service API:

</template>
<template #zh>

接下来，添加用于查询和格式化 NWS API 数据的辅助函数：

</template>
</BiRow>

<BiRow>
<template #en>

```go
func makeNWSRequest[T any](ctx context.Context, url string) (*T, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("User-Agent", UserAgent)
	req.Header.Set("Accept", "application/geo+json")

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to make request to %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP error %d: %s", resp.StatusCode, string(body))
	}

	var result T
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

func formatAlert(alert AlertFeature) string {
	props := alert.Properties
	event := cmp.Or(props.Event, "Unknown")
	areaDesc := cmp.Or(props.AreaDesc, "Unknown")
	severity := cmp.Or(props.Severity, "Unknown")
	description := cmp.Or(props.Description, "No description available")
	instruction := cmp.Or(props.Instruction, "No specific instructions provided")

	return fmt.Sprintf(`
Event: %s
Area: %s
Severity: %s
Description: %s
Instructions: %s
`, event, areaDesc, severity, description, instruction)
}

func formatPeriod(period ForecastPeriod) string {
	return fmt.Sprintf(`
%s:
Temperature: %d°%s
Wind: %s %s
Forecast: %s
`, period.Name, period.Temperature, period.TemperatureUnit,
		period.WindSpeed, period.WindDirection, period.DetailedForecast)
}
```

</template>
<template #zh>

```go
func makeNWSRequest[T any](ctx context.Context, url string) (*T, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("User-Agent", UserAgent)
	req.Header.Set("Accept", "application/geo+json")

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to make request to %s: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP error %d: %s", resp.StatusCode, string(body))
	}

	var result T
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

func formatAlert(alert AlertFeature) string {
	props := alert.Properties
	event := cmp.Or(props.Event, "Unknown")
	areaDesc := cmp.Or(props.AreaDesc, "Unknown")
	severity := cmp.Or(props.Severity, "Unknown")
	description := cmp.Or(props.Description, "No description available")
	instruction := cmp.Or(props.Instruction, "No specific instructions provided")

	return fmt.Sprintf(`
Event: %s
Area: %s
Severity: %s
Description: %s
Instructions: %s
`, event, areaDesc, severity, description, instruction)
}

func formatPeriod(period ForecastPeriod) string {
	return fmt.Sprintf(`
%s:
Temperature: %d°%s
Wind: %s %s
Forecast: %s
`, period.Name, period.Temperature, period.TemperatureUnit,
		period.WindSpeed, period.WindDirection, period.DetailedForecast)
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Implementing tool execution

</template>
<template #zh>

### 实现工具执行

</template>
</BiRow>

<BiRow>
<template #en>

The tool execution handler is responsible for actually executing the logic of each tool. Let's add it:

</template>
<template #zh>

工具执行处理器负责实际执行每个工具的逻辑。来添加它：

</template>
</BiRow>

<BiRow>
<template #en>

```go
func getForecast(ctx context.Context, req *mcp.CallToolRequest, input ForecastInput) (
	*mcp.CallToolResult, any, error,
) {
	// Get points data
	pointsURL := fmt.Sprintf("%s/points/%f,%f", NWSAPIBase, input.Latitude, input.Longitude)
	pointsData, err := makeNWSRequest[PointsResponse](ctx, pointsURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch forecast data for this location."},
			},
		}, nil, nil
	}

	// Get forecast data
	forecastURL := pointsData.Properties.Forecast
	if forecastURL == "" {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch forecast URL."},
			},
		}, nil, nil
	}

	forecastData, err := makeNWSRequest[ForecastResponse](ctx, forecastURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch detailed forecast."},
			},
		}, nil, nil
	}

	// Format the periods
	periods := forecastData.Properties.Periods
	if len(periods) == 0 {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "No forecast periods available."},
			},
		}, nil, nil
	}

	// Show next 5 periods
	var forecasts []string
	for i := range min(5, len(periods)) {
		forecasts = append(forecasts, formatPeriod(periods[i]))
	}

	result := strings.Join(forecasts, "\n---\n")

	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: result},
		},
	}, nil, nil
}

func getAlerts(ctx context.Context, req *mcp.CallToolRequest, input AlertsInput) (
	*mcp.CallToolResult, any, error,
) {
	// Build alerts URL
	stateCode := strings.ToUpper(input.State)
	alertsURL := fmt.Sprintf("%s/alerts/active/area/%s", NWSAPIBase, stateCode)

	alertsData, err := makeNWSRequest[AlertsResponse](ctx, alertsURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch alerts or no alerts found."},
			},
		}, nil, nil
	}

	// Check if there are any alerts
	if len(alertsData.Features) == 0 {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "No active alerts for this state."},
			},
		}, nil, nil
	}

	// Format alerts
	var alerts []string
	for _, feature := range alertsData.Features {
		alerts = append(alerts, formatAlert(feature))
	}

	result := strings.Join(alerts, "\n---\n")

	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: result},
		},
	}, nil, nil
}
```

</template>
<template #zh>

```go
func getForecast(ctx context.Context, req *mcp.CallToolRequest, input ForecastInput) (
	*mcp.CallToolResult, any, error,
) {
	// Get points data
	pointsURL := fmt.Sprintf("%s/points/%f,%f", NWSAPIBase, input.Latitude, input.Longitude)
	pointsData, err := makeNWSRequest[PointsResponse](ctx, pointsURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch forecast data for this location."},
			},
		}, nil, nil
	}

	// Get forecast data
	forecastURL := pointsData.Properties.Forecast
	if forecastURL == "" {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch forecast URL."},
			},
		}, nil, nil
	}

	forecastData, err := makeNWSRequest[ForecastResponse](ctx, forecastURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch detailed forecast."},
			},
		}, nil, nil
	}

	// Format the periods
	periods := forecastData.Properties.Periods
	if len(periods) == 0 {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "No forecast periods available."},
			},
		}, nil, nil
	}

	// Show next 5 periods
	var forecasts []string
	for i := range min(5, len(periods)) {
		forecasts = append(forecasts, formatPeriod(periods[i]))
	}

	result := strings.Join(forecasts, "\n---\n")

	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: result},
		},
	}, nil, nil
}

func getAlerts(ctx context.Context, req *mcp.CallToolRequest, input AlertsInput) (
	*mcp.CallToolResult, any, error,
) {
	// Build alerts URL
	stateCode := strings.ToUpper(input.State)
	alertsURL := fmt.Sprintf("%s/alerts/active/area/%s", NWSAPIBase, stateCode)

	alertsData, err := makeNWSRequest[AlertsResponse](ctx, alertsURL)
	if err != nil {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "Unable to fetch alerts or no alerts found."},
			},
		}, nil, nil
	}

	// Check if there are any alerts
	if len(alertsData.Features) == 0 {
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				&mcp.TextContent{Text: "No active alerts for this state."},
			},
		}, nil, nil
	}

	// Format alerts
	var alerts []string
	for _, feature := range alertsData.Features {
		alerts = append(alerts, formatAlert(feature))
	}

	result := strings.Join(alerts, "\n---\n")

	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: result},
		},
	}, nil, nil
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Running the server

</template>
<template #zh>

### 运行服务器

</template>
</BiRow>

<BiRow>
<template #en>

Finally, implement the main function to run the server:

</template>
<template #zh>

最后，实现运行服务器的 main 函数：

</template>
</BiRow>

<BiRow>
<template #en>

```go
func main() {
	// Create MCP server
	server := mcp.NewServer(&mcp.Implementation{
		Name:    "weather",
		Version: "1.0.0",
	}, nil)

	// Add get_forecast tool
	mcp.AddTool(server, &mcp.Tool{
		Name:        "get_forecast",
		Description: "Get weather forecast for a location",
	}, getForecast)

	// Add get_alerts tool
	mcp.AddTool(server, &mcp.Tool{
		Name:        "get_alerts",
		Description: "Get weather alerts for a US state",
	}, getAlerts)

	// Run server on stdio transport
	if err := server.Run(context.Background(), &mcp.StdioTransport{}); err != nil {
		log.Fatal(err)
	}
}
```

</template>
<template #zh>

```go
func main() {
	// Create MCP server
	server := mcp.NewServer(&mcp.Implementation{
		Name:    "weather",
		Version: "1.0.0",
	}, nil)

	// Add get_forecast tool
	mcp.AddTool(server, &mcp.Tool{
		Name:        "get_forecast",
		Description: "Get weather forecast for a location",
	}, getForecast)

	// Add get_alerts tool
	mcp.AddTool(server, &mcp.Tool{
		Name:        "get_alerts",
		Description: "Get weather alerts for a US state",
	}, getAlerts)

	// Run server on stdio transport
	if err := server.Run(context.Background(), &mcp.StdioTransport{}); err != nil {
		log.Fatal(err)
	}
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Build your server with:

</template>
<template #zh>

用以下命令构建你的服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
go build -o weather .
```

</template>
<template #zh>

```bash
go build -o weather .
```

</template>
</BiRow>

<BiRow>
<template #en>

The compiled binary will be in `./weather`.

</template>
<template #zh>

编译出的二进制文件位于 `./weather`。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now test your server from an existing MCP host, Claude for Desktop.

</template>
<template #zh>

现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing your server with Claude for Desktop

</template>
<template #zh>

## 在 Claude for Desktop 中测试你的服务器

</template>
</BiRow>

<BiRow>
<template #en>

First, make sure you have Claude for Desktop installed. [You can install the latest version here.](https://claude.ai/download) If you already have Claude for Desktop, **make sure it's updated to the latest version.**

</template>
<template #zh>

首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

</template>
</BiRow>

<BiRow>
<template #en>

We'll need to configure Claude for Desktop for whichever MCP servers you want to use. To do this, open your Claude for Desktop App configuration at `~/Library/Application Support/Claude/claude_desktop_config.json` in a text editor. Make sure to create the file if it doesn't exist.

</template>
<template #zh>

我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if you have [VS Code](https://code.visualstudio.com/) installed:

</template>
<template #zh>

例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[Linux]"
  code ~/.config/Claude/claude_desktop_config.json
  ```

  ```bash title="[macOS]"
  code ~/Library/Application\ Support/Claude/claude_desktop_config.json
  ```

  ```powershell title="[Windows]"
  code $env:AppData\Claude\claude_desktop_config.json
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

You'll then add your servers in the `mcpServers` key. The MCP UI elements will only show up in Claude for Desktop if at least one server is properly configured.

</template>
<template #zh>

然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, we'll add our single weather server like so:

</template>
<template #zh>

本例中，我们像下面这样添加这个唯一的天气服务器：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\weather.exe"
      }
    }
  }
  ```
:::

</template>
<template #zh>

::: code-group
  ```json title="[macOS/Linux]"
  {
    "mcpServers": {
      "weather": {
        "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/weather"
      }
    }
  }
  ```

  ```json title="[Windows]"
  {
    "mcpServers": {
      "weather": {
        "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\weather.exe"
      }
    }
  }
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Make sure you pass in the absolute path to your compiled binary. You can get this by running `pwd` on macOS/Linux or `cd` on Windows Command Prompt from your project directory. On Windows, remember to use double backslashes (`\\`) or forward slashes (`/`) in the JSON path, and add the `.exe` extension.

</template>
<template #zh>

> **注：**
> 务必传入编译产物的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`），并加上 `.exe` 扩展名。

</template>
</BiRow>

<BiRow>
<template #en>

This tells Claude for Desktop:

</template>
<template #zh>

这会告诉 Claude for Desktop：

</template>
</BiRow>

<BiRow>
<template #en>

1. There's an MCP server named "weather"
2. Launch it by running the compiled binary at the specified path

</template>
<template #zh>

1. 存在一个名为 "weather" 的 MCP 服务器
2. 通过运行指定路径上的编译产物来启动它

</template>
</BiRow>

<BiRow>
<template #en>

Save the file, and restart **Claude for Desktop**.

</template>
<template #zh>

保存文件，然后重启 **Claude for Desktop**。

</template>
</BiRow>

<BiRow>
<template #en>

### Test with commands

</template>
<template #zh>

### 用命令测试

</template>
</BiRow>

<BiRow>
<template #en>

Let's make sure Claude for Desktop is picking up the two tools we've exposed in our `weather` server. You can do this by looking for the "Add files, connectors, and more /" <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" /> icon:

</template>
<template #zh>

先确认 Claude for Desktop 是否识别到了我们在 `weather` 服务器中公开的两个工具。方法是找到 "Add files, connectors, and more /"（添加文件、连接器等）<img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" /> 图标：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/visual-indicator-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=1bf23a2cfc5f6dd3dac1c7574cceebc9" width="684" height="133" data-path="images/visual-indicator-mcp-tools.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/visual-indicator-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=1bf23a2cfc5f6dd3dac1c7574cceebc9" width="684" height="133" data-path="images/visual-indicator-mcp-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

After clicking on the plus icon, hover over the "Connectors" menu. You should see the `weather` servers listed:

</template>
<template #zh>

点击加号图标后，把鼠标悬停在 "Connectors"（连接器）菜单上。你应该能看到列出的 `weather` 服务器：

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" width="437" height="244" data-path="images/available-mcp-tools.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" width="437" height="244" data-path="images/available-mcp-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

If your server isn't being picked up by Claude for Desktop, proceed to the [Troubleshooting](#troubleshooting) section for debugging tips.

</template>
<template #zh>

如果你的服务器没有被 Claude for Desktop 识别，请前往[故障排查](#troubleshooting)小节查看调试提示。

</template>
</BiRow>

<BiRow>
<template #en>

If the server has shown up in the "Connectors" menu, you can now test your server by running the following commands in Claude for Desktop:

</template>
<template #zh>

如果服务器已经出现在 "Connectors"（连接器）菜单中，现在就可以在 Claude for Desktop 中运行以下命令来测试你的服务器：

</template>
</BiRow>

<BiRow>
<template #en>

* What's the weather in Sacramento?
* What are the active weather alerts in Texas?

</template>
<template #zh>

* What's the weather in Sacramento?（萨克拉门托的天气怎么样？）
* What are the active weather alerts in Texas?（得克萨斯州有哪些生效的天气警报？）

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/weather-alerts.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c4762bf2bd84a8781846d2965af3e4a4" width="2809" height="1850" data-path="images/weather-alerts.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/weather-alerts.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c4762bf2bd84a8781846d2965af3e4a4" width="2809" height="1850" data-path="images/weather-alerts.png" />

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Since this is the US National Weather service, the queries will only work for US locations.

</template>
<template #zh>

> **注：**
> 由于这是美国国家气象局（NWS）的服务，这些查询只对美国境内的地点有效。

</template>
</BiRow>

<BiRow>
<template #en>

## What's happening under the hood

</template>
<template #zh>

## 背后发生了什么

</template>
</BiRow>

<BiRow>
<template #en>

When you ask a question:

</template>
<template #zh>

当你提问时：

</template>
</BiRow>

<BiRow>
<template #en>

1. The client sends your question to Claude
2. Claude analyzes the available tools and decides which one(s) to use
3. The client executes the chosen tool(s) through the MCP server
4. The results are sent back to Claude
5. Claude formulates a natural language response
6. The response is displayed to you!

</template>
<template #zh>

1. 客户端把你的问题发送给 Claude
2. Claude 分析可用的工具，并决定使用哪一个（或哪几个）
3. 客户端通过 MCP 服务器执行选定的工具
4. 结果回传给 Claude
5. Claude 组织出一段自然语言回答
6. 回答展示给你！

</template>
</BiRow>

<BiRow>
<template #en>

## Troubleshooting

</template>
<template #zh>

## 故障排查

</template>
</BiRow>

<BiRow>
<template #en>

<AccordionGroup>
  <Accordion title="Claude for Desktop Integration Issues">
**Getting logs from Claude for Desktop**

Claude.app logging related to MCP is written to log files in `~/Library/Logs/Claude` (macOS) or `~/.config/Claude/logs/` (Linux):

* `mcp.log` will contain general logging about MCP connections and connection failures.
* Files named `mcp-server-SERVERNAME.log` will contain the stderr output from the named server. Stdio servers may use stderr for all their logging, so these files are not limited to errors.

You can run the following command to list recent logs and follow along with any new ones:

```bash title="macOS"
# Check Claude's logs for errors
tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
```

```bash title="Linux"
# Check Claude's logs for errors
tail -n 20 -f ~/.config/Claude/logs/mcp*.log
```

**Server not showing up in Claude**

1. Check your `claude_desktop_config.json` file syntax
2. Make sure the path to your project is absolute and not relative
3. Restart Claude for Desktop completely

> **注意：**
> To properly restart Claude for Desktop, you must fully quit the application:

  * **Windows**: Right-click the Claude icon in the system tray (which may be hidden in the "hidden icons" menu) and select "Quit" or "Exit".
  * **macOS**: Use Cmd+Q or select "Quit Claude" from the menu bar.
  * **Linux**: Right-click the Claude icon in the system tray and select "Quit", or run `pkill -f claude-desktop` from a terminal.

  Simply closing the window does not fully quit the application, and your MCP server configuration changes will not take effect.

**Tool calls failing silently**

If Claude attempts to use the tools but they fail:

1. Check Claude's logs for errors
2. Verify your server builds and runs without errors
3. Try restarting Claude for Desktop

**None of this is working. What do I do?**

Please refer to our [debugging guide](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging) for better debugging tools and more detailed guidance.
  </Accordion>

  <Accordion title="Weather API Issues">
**Error: Failed to retrieve grid point data**

This usually means either:

1. The coordinates are outside the US
2. The NWS API is having issues
3. You're being rate limited

Fix:

* Verify you're using US coordinates
* Add a small delay between requests
* Check the NWS API status page

**Error: No active alerts for \[STATE]**

This isn't an error - it just means there are no current weather alerts for that state. Try a different state or check during severe weather.
  </Accordion>
</AccordionGroup>

</template>
<template #zh>

<AccordionGroup>
  <Accordion title="Claude for Desktop 集成问题">
**从 Claude for Desktop 获取日志**

Claude.app 中与 MCP 相关的日志会写入 `~/Library/Logs/Claude`（macOS）或 `~/.config/Claude/logs/`（Linux）下的日志文件：

* `mcp.log` 包含有关 MCP 连接及连接失败的常规日志。
* 名为 `mcp-server-SERVERNAME.log` 的文件包含对应服务器的 stderr 输出。stdio 服务器可能把所有日志都写到 stderr，因此这些文件并不只包含错误信息。

你可以运行以下命令来列出最近的日志并持续跟踪新增日志：

```bash title="macOS"
# Check Claude's logs for errors
tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
```

```bash title="Linux"
# Check Claude's logs for errors
tail -n 20 -f ~/.config/Claude/logs/mcp*.log
```

**服务器没有出现在 Claude 中**

1. 检查你的 `claude_desktop_config.json` 文件语法
2. 确保项目路径是绝对路径而不是相对路径
3. 完全重启 Claude for Desktop

> **注意：**
> 要正确重启 Claude for Desktop，必须完全退出该应用：

  * **Windows**：右键点击系统托盘（可能藏在「隐藏的图标」菜单里）中的 Claude 图标，选择 "Quit" 或 "Exit"。
  * **macOS**：按 Cmd+Q，或从菜单栏选择 "Quit Claude"。
  * **Linux**：右键点击系统托盘中的 Claude 图标并选择 "Quit"，或在终端运行 `pkill -f claude-desktop`。

  仅仅关闭窗口并不能完全退出应用，你对 MCP 服务器配置的修改也不会生效。

**工具调用静默失败**

如果 Claude 尝试使用工具但调用失败：

1. 检查 Claude 的日志中是否有错误
2. 确认服务器能正常构建和运行、不报错
3. 尝试重启 Claude Desktop

**这些方法都不管用，我该怎么办？**

请参阅我们的[调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)，获取更好用的调试工具和更详细的指导。
  </Accordion>

  <Accordion title="天气 API 问题">
**错误：Failed to retrieve grid point data**

这通常意味着以下某种情况：

1. 坐标在美国境外
2. NWS API 出了问题
3. 你被限流了

解决办法：

* 确认你使用的是美国境内的坐标
* 在请求之间加一点延迟
* 查看 NWS API 状态页

**错误：No active alerts for \[STATE]**

这不是错误——只是该州当前没有天气警报。换个州试试，或在恶劣天气期间再查。
  </Accordion>
</AccordionGroup>

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> For more advanced troubleshooting, check out our guide on [Debugging MCP](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)

</template>
<template #zh>

> **注：**
> 如需更深入的故障排查，请参阅我们的 [Debugging MCP](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging) 指南。

</template>
</BiRow>

<BiRow>
<template #en>

## Next steps

</template>
<template #zh>

## 后续步骤

</template>
</BiRow>

<BiRow>
<template #en>

  - [Building a client](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)：Learn how to build your own MCP client that can connect to your server
  - [Example servers](https://modelcontextprotocol.io/examples)：Check out our gallery of official MCP servers and implementations
  - [Debugging Guide](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：Learn how to effectively debug MCP servers and integrations
  - [Build with Agent Skills](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills)：Use agent skills to guide AI coding assistants through server design

</template>
<template #zh>

  - [构建客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)：学习如何构建能连接你服务器的 MCP 客户端
  - [示例服务器](https://modelcontextprotocol.io/examples)：浏览我们的官方 MCP 服务器与实现合集
  - [调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：学习如何高效调试 MCP 服务器与集成
  - [用 Agent Skills 构建](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills)：用 Agent Skills 指导 AI 编码助手完成服务器设计

</template>
</BiRow>
