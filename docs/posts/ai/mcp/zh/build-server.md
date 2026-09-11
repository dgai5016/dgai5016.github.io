# 构建 MCP 服务器

> 快速上手：构建你自己的服务器，供 Claude for Desktop 和其他客户端使用。

在本教程中，我们将构建一个简单的 MCP 天气服务器，并把它连接到一个 MCP 宿主（host）——Claude for Desktop。

### 我们要构建什么

我们将构建一个公开两个工具的服务器：`get_alerts` 和 `get_forecast`。然后把服务器连接到一个 MCP 宿主（这里选用 Claude for Desktop）：

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

> **注：**
> 服务器可以连接任何客户端。这里为简单起见选用了 Claude for Desktop，我们也有[构建你自己的客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)的指南。

### MCP 核心概念

MCP 服务器可以提供三种主要能力：

1. **[资源（Resources）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#resources)**：类文件数据，可由客户端读取（如 API 响应或文件内容）
2. **[工具（Tools）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#tools)**：可由 LLM 调用的函数（需用户批准）
3. **[提示词（Prompts）](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts#prompts)**：预先写好的模板，帮助用户完成特定任务

本教程将主要聚焦于工具。

  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-python)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * Python
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要向 stdout 写入。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。`print()` 函数默认写入 stdout，因此在 STDIO 服务器中要完全避免使用。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用标准库的 `logging` 模块，它写入 stderr。
    * 用 `logging.getLogger(__name__)` 为每个模块创建一个 logger，并在你的工具中调用它。

    ### 快速示例

    ```python theme={null}
    import logging

    logger = logging.getLogger(__name__)

    # ❌ Bad (STDIO)
    print("Processing request")

    # ✅ Good (STDIO)
    logger.info("Processing request")  # writes to stderr
    ```

    ### 系统要求

    * 已安装 Python 3.10 或更高版本。
    * 必须使用 2.0.0 或更高版本的 Python MCP SDK。

    ### 配置环境

    首先，安装 `uv` 并搭建我们的 Python 项目和环境：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      curl -LsSf https://astral.sh/uv/install.sh | sh
      ```

      ```powershell Windows theme={null}
      powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
      ```
    </CodeGroup>

    之后务必重启终端，确保系统能找到 `uv` 命令。

    现在，创建并配置我们的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
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

      ```powershell Windows theme={null}
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
    </CodeGroup>

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 导入包并初始化实例

    把以下内容添加到 `weather.py` 的顶部：

    ```python theme={null}
    from typing import Any

    import httpx2
    from mcp.server import MCPServer

    # Initialize MCPServer
    mcp = MCPServer("weather")

    # Constants
    NWS_API_BASE = "https://api.weather.gov"
    USER_AGENT = "weather-app/1.0"
    ```

    `httpx2` 是 SDK 自身依赖的 HTTP 客户端，所以安装 `mcp` 时已经把它一并装好了。

    MCPServer 类利用 Python 类型提示（type hints）和文档字符串（docstring）自动生成工具定义，让 MCP 工具的创建和维护变得简单。

    ### 辅助函数

    接下来，添加用于查询和格式化 NWS（美国国家气象局，National Weather Service）API 数据的辅助函数：

    ```python theme={null}
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

    ### 实现工具执行

    工具执行处理器负责实际执行每个工具的逻辑。来添加它：

    ```python theme={null}
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

    ### 运行服务器

    最后，初始化并运行服务器：

    ```python theme={null}
    if __name__ == "__main__":
        mcp.run(transport="stdio")
    ```

    你的服务器已经完成！运行 `uv run weather.py` 启动 MCP 服务器，它会监听来自 MCP 宿主的消息。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里
    安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
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

      ```json Windows theme={null}
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
    </CodeGroup>

    > **注意：**
> 你可能需要在 `command` 字段中填入 `uv` 可执行文件的完整路径。在 macOS/Linux 上运行 `which uv`、在 Windows 上运行 `where uv` 即可获取。

    > **注：**
> 务必传入你服务器的绝对路径。在 macOS/Linux 上运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`）。

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行 `uv --directory /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather run weather.py` 来启动它

    保存文件，然后重启 **Claude for Desktop**。
  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * TypeScript
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `console.log()`，它默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 的 `console.error()`，或使用写入 stderr 或文件的日志库。

    ### 快速示例

    ```javascript theme={null}
    // ❌ Bad (STDIO)
    console.log("Server started");

    // ✅ Good (STDIO)
    console.error("Server started"); // stderr is safe
    ```

    ### 系统要求

    对于 TypeScript，请确保你安装了最新版本的 Node。

    ### 配置环境

    首先，如果还没有安装 Node.js 和 npm，先安装它们。可以从 [nodejs.org](https://nodejs.org/) 下载。
    验证你的 Node.js 安装：

    ```bash theme={null}
    node --version
    npm --version
    ```

    本教程需要 Node.js 20 或更高版本。

    现在，创建并配置我们的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
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

      ```powershell Windows theme={null}
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
    </CodeGroup>

    更新你的 package.json，添加 type: "module" 和一个 build 脚本：

    ```json package.json theme={null}
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

    在项目根目录创建一个 `tsconfig.json`：

    ```json tsconfig.json theme={null}
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

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 导入包并初始化实例

    把以下内容添加到 `src/index.ts` 的顶部：

    ```typescript theme={null}
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

    ### 辅助函数

    接下来，添加用于查询和格式化 NWS API 数据的辅助函数：

    ```typescript theme={null}
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

    ### 实现工具执行

    工具执行处理器负责实际执行每个工具的逻辑。来添加它：

    ```typescript theme={null}
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

    ### 运行服务器

    最后，实现运行服务器的 main 函数：

    ```typescript theme={null}
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

    务必运行 `npm run build` 来构建你的服务器！这是让服务器成功连接的关键一步。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里
    安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "node",
            "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js"]
          }
        }
      }
      ```

      ```json Windows theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "node",
            "args": ["C:\\PATH\\TO\\PARENT\\FOLDER\\weather\\build\\index.js"]
          }
        }
      }
      ```
    </CodeGroup>

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行 `node /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/index.js` 来启动它

    保存文件，然后重启 **Claude for Desktop**。
  
  
    > **注：**
> 这是一个基于 Spring AI MCP 自动配置和 boot starter 的快速入门演示。
      要学习如何手动创建同步和异步 MCP 服务器，请查阅 [Java SDK Server](https://java.sdk.modelcontextprotocol.io/) 文档。

    让我们开始构建天气服务器吧！
    [我们要构建的完整代码在这里。](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-stdio-server)

    更多信息请参阅 [MCP Server Boot Starter](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) 参考文档。
    如需手动实现 MCP 服务器，请参阅 [MCP Server Java SDK 文档](https://java.sdk.modelcontextprotocol.io/)。

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `System.out.println()` 或 `System.out.print()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 或文件的日志库。
    * 确保配置的任何日志库都不会写入 stdout。

    ### 系统要求

    * 已安装 Java 17 或更高版本。
    * [Spring Boot 3.3.x](https://docs.spring.io/spring-boot/installing.html) 或更高版本

    ### 配置环境

    使用 [Spring Initializer](https://start.spring.io/) 引导创建项目。

    你需要添加以下依赖：

    <CodeGroup>
      ```xml Maven theme={null}
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

      ```groovy Gradle theme={null}
      dependencies {
        implementation platform("org.springframework.ai:spring-ai-starter-mcp-server")
        implementation platform("org.springframework:spring-web")
      }
      ```
    </CodeGroup>

    然后通过设置应用属性来配置你的应用：

    <CodeGroup>
      ```bash application.properties theme={null}
      spring.main.bannerMode=off
      logging.pattern.console=
      ```

      ```yaml application.yml theme={null}
      logging:
        pattern:
          console:
      spring:
        main:
          banner-mode: off
      ```
    </CodeGroup>

    [Server Configuration Properties](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html#_configuration_properties) 文档列出了所有可用属性。

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 天气服务

    我们来实现一个 [WeatherService.java](https://github.com/spring-projects/spring-ai-examples/blob/main/model-context-protocol/weather/starter-stdio-server/src/main/java/org/springframework/ai/mcp/sample/server/WeatherService.java)，它用 REST 客户端查询 NWS API 的数据：

    ```java theme={null}
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

    `@Service` 注解会自动把该服务注册到你的应用上下文中。
    Spring AI 的 `@Tool` 注解让 MCP 工具的创建和维护变得简单。

    自动配置会自动把这些工具注册到 MCP 服务器。

    ### 创建你的 Boot 应用

    ```java theme={null}
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

    它使用 `MethodToolCallbackProvider` 工具类，把 `@Tools` 转换为 MCP 服务器使用的可调用回调。

    ### 运行服务器

    最后，构建服务器：

    ```bash theme={null}
    ./mvnw clean install
    ```

    这会在 `target` 目录中生成一个 `mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar` 文件。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。
    [你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。
    为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。
    如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。
    只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
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

      ```json Windows theme={null}
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
    </CodeGroup>

    > **注：**
> 务必传入你服务器的绝对路径。

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "my-weather-server" 的 MCP 服务器
    2. 通过运行 `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-weather-stdio-server-0.0.1-SNAPSHOT.jar` 来启动它

    保存文件，然后重启 **Claude for Desktop**。

    ## 用 Java 客户端测试你的服务器

    ### 手动创建 MCP 客户端

    使用 `McpClient` 连接服务器：

    ```java theme={null}
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

    ### 使用 MCP Client Boot Starter

    用 `spring-ai-starter-mcp-client` 依赖创建一个新的 boot starter 应用：

    ```xml theme={null}
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-starter-mcp-client</artifactId>
    </dependency>
    ```

    并把 `spring.ai.mcp.client.stdio.servers-configuration` 属性指向你的 `claude_desktop_config.json`。
    你可以复用现有的 Anthropic Desktop 配置：

    ```properties theme={null}
    spring.ai.mcp.client.stdio.servers-configuration=file:PATH/TO/claude_desktop_config.json
    ```

    启动客户端应用时，自动配置会自动根据 claude\_desktop\_config.json 创建 MCP 客户端。

    更多信息请参阅 [MCP Client Boot Starters](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-client-docs.html) 参考文档。

    ## 更多 Java MCP 服务器示例

    [starter-webflux-server](https://github.com/spring-projects/spring-ai-examples/tree/main/model-context-protocol/weather/starter-webflux-server) 演示了如何用 WebFlux starter 创建基于 HTTP 的 MCP 服务器。
    设置 `spring.ai.mcp.server.protocol=STREAMABLE` 属性即可让它以 Streamable HTTP 方式提供服务。
    它展示了如何利用 Spring Boot 的自动配置能力来定义并注册 MCP 工具、资源和提示词。

  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/kotlin-sdk/tree/main/samples/weather-stdio-server)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * Kotlin
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `println()`，它默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 或文件的日志库。

    ### 系统要求

    * 已安装 JDK 11 或更高版本。

    ### 配置环境

    首先，如果还没有安装 `java` 和 `gradle`，先安装它们。
    `java` 可以从 [Oracle JDK 官网](https://www.oracle.com/java/technologies/downloads/)下载。
    验证你的 `java` 安装：

    ```bash theme={null}
    java --version
    ```

    现在，创建并配置你的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      # Create a new directory for our project
      mkdir weather
      cd weather

      # Initialize a new kotlin project
      gradle init
      ```

      ```powershell Windows theme={null}
      # Create a new directory for our project
      md weather
      cd weather

      # Initialize a new kotlin project
      gradle init
      ```
    </CodeGroup>

    运行 `gradle init` 后，项目类型选择 **Application**，编程语言选择 **Kotlin**。

    你也可以用 [IntelliJ IDEA 项目向导](https://kotlinlang.org/docs/jvm-get-started.html)创建 Kotlin 应用。

    创建项目后，把 `build.gradle.kts` 的内容替换为：

    ```kotlin build.gradle.kts theme={null}
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

    验证一切都配置正确：

    ```bash theme={null}
    ./gradlew build
    ```

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 初始化实例

    添加一个服务器初始化函数：

    ```kotlin theme={null}
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

    ### 天气 API 辅助函数

    接下来，添加用于查询 NWS API 并转换其响应的函数和数据类：

    ```kotlin theme={null}
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

    ### 实现工具执行

    工具执行处理器负责实际执行每个工具的逻辑。来添加它：

    ```kotlin theme={null}
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

    ### 运行服务器

    最后，实现运行服务器的 main 函数：

    ```kotlin theme={null}
    fun main() = runMcpServer()
    ```

    开发期间可以直接运行服务器：

    ```bash theme={null}
    ./gradlew run
    ```

    生产环境请构建 shadow JAR：

    ```bash theme={null}
    ./gradlew build
    java -jar build/libs/weather-0.1.0-all.jar
    ```

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里
    安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。
    为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。
    如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。
    只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
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

      ```json Windows theme={null}
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
    </CodeGroup>

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行 `java -jar /ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/build/libs/weather-0.1.0-all.jar` 来启动它

    保存文件，然后重启 **Claude for Desktop**。
  
  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/csharp-sdk/tree/main/samples/QuickstartWeatherServer)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * C#
    * Claude 之类的 LLM
    * .NET 8 或更高版本

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `Console.WriteLine()` 或 `Console.Write()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 或文件的日志库。

    ### 系统要求

    * 已安装 [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) 或更高版本。

    ### 配置环境

    首先，如果还没有安装 `dotnet`，先安装它。`dotnet` 可以从 [微软 .NET 官网](https://dotnet.microsoft.com/download/)下载。验证你的 `dotnet` 安装：

    ```bash theme={null}
    dotnet --version
    ```

    现在，创建并配置你的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      # Create a new directory for our project
      mkdir weather
      cd weather
      # Initialize a new C# project
      dotnet new console
      ```

      ```powershell Windows theme={null}
      # Create a new directory for our project
      mkdir weather
      cd weather
      # Initialize a new C# project
      dotnet new console
      ```
    </CodeGroup>

    运行 `dotnet new console` 后，你会得到一个新的 C# 项目。
    可以用你喜欢的 IDE 打开该项目，比如 [Visual Studio](https://visualstudio.microsoft.com/) 或 [Rider](https://www.jetbrains.com/rider/)。
    你也可以用 [Visual Studio 项目向导](https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-console?view=vs-2022)创建 C# 应用。
    创建项目后，为模型上下文协议（Model Context Protocol）SDK 和托管（hosting）添加 NuGet 包：

    ```bash theme={null}
    # Add the Model Context Protocol SDK NuGet package
    dotnet add package ModelContextProtocol --prerelease
    # Add the .NET Hosting NuGet package
    dotnet add package Microsoft.Extensions.Hosting
    ```

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    打开项目中的 `Program.cs` 文件，把它的内容替换为以下代码：

    ```csharp theme={null}
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

    > **注：**
> 创建 `ApplicationHostBuilder` 时，务必使用 `CreateEmptyApplicationBuilder` 而不是 `CreateDefaultBuilder`。这能确保服务器不会向控制台写入任何多余的消息。这一点只对使用 STDIO 传输的服务器有必要。

    这段代码搭建了一个基础控制台应用，使用模型上下文协议 SDK 创建一个采用标准输入输出（stdio）传输的 MCP 服务器。

    ### 天气 API 辅助函数

    为 `HttpClient` 创建一个扩展类，帮助简化 JSON 请求处理：

    ```csharp theme={null}
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

    接下来，定义一个类，包含用于查询 NWS API 并转换其响应的工具执行处理器：

    ```csharp theme={null}
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

    ### 运行服务器

    最后，用以下命令运行服务器：

    ```bash theme={null}
    dotnet run
    ```

    这会启动服务器，并通过标准输入输出监听传入的请求。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里
    安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**
    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。
    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。
    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "dotnet",
            "args": ["run", "--project", "/ABSOLUTE/PATH/TO/PROJECT", "--no-build"]
          }
        }
      }
      ```

      ```json Windows theme={null}
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
    </CodeGroup>

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行 `dotnet run /ABSOLUTE/PATH/TO/PROJECT` 来启动它
       保存文件，然后重启 **Claude for Desktop**。

  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-ruby)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * Ruby
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `puts` 或 `print`，它们默认写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 或文件的日志库。

    ### 快速示例

    ```ruby theme={null}
    # ❌ Bad (STDIO)
    puts "Processing request"

    # ✅ Good (STDIO)
    require "logger"
    logger = Logger.new($stderr)
    logger.info("Processing request")
    ```

    ### 系统要求

    * 已安装 Ruby 2.7 或更高版本。

    ### 配置环境

    首先，确认你已经安装了 Ruby。可以运行以下命令检查：

    ```bash theme={null}
    ruby --version
    ```

    现在，创建并配置我们的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
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

      ```powershell Windows theme={null}
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
    </CodeGroup>

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 导入包并设置常量

    打开 `weather.rb`，在顶部添加这些 require 和常量：

    ```ruby theme={null}
    require "json"
    require "mcp"
    require "net/http"
    require "uri"

    NWS_API_BASE = "https://api.weather.gov"
    USER_AGENT = "weather-app/1.0"
    ```

    `mcp` gem 提供了 Ruby 版模型上下文协议 SDK，包含实现服务器和 stdio（标准输入输出）传输所需的类。

    ### 辅助方法

    接下来，添加用于查询和格式化 NWS API 数据的辅助方法：

    ```ruby theme={null}
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

    ### 实现工具执行

    现在来定义我们的工具类。每个工具都是 `MCP::Tool` 的子类，并实现工具逻辑：

    ```ruby theme={null}
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

    ### 运行服务器

    最后，初始化并运行服务器：

    ```ruby theme={null}
    server = MCP::Server.new(
      name: "weather",
      version: "1.0.0",
      tools: [GetAlerts, GetForecast]
    )

    transport = MCP::Server::Transports::StdioTransport.new(server)
    transport.open
    ```

    你的服务器已经完成！运行 `bundle exec ruby weather.rb` 启动 MCP 服务器，它会监听来自 MCP 宿主的消息。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
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

      ```json Windows theme={null}
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
    </CodeGroup>

    > **注：**
> 务必在 `cwd` 字段中传入你项目目录的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`）。

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 在指定目录中通过运行 `bundle exec ruby weather.rb` 来启动它

    保存文件，然后重启 **Claude for Desktop**。
  
  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-rust)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * Rust 编程语言
    * Rust 中的 async/await
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `println!()` 或 `print!()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用写入 stderr 或文件的日志库，例如 Rust 中的 `tracing` 或 `log`。
    * 配置你的日志框架，避免输出到 stdout。

    ### 快速示例

    ```rust theme={null}
    // ❌ Bad (STDIO)
    println!("Processing request");

    // ✅ Good (STDIO)
    eprintln!("Processing request"); // writes to stderr
    ```

    ### 系统要求

    * 已安装 Rust 1.70 或更高版本。
    * Cargo（随 Rust 安装附带）。

    ### 配置环境

    首先，如果还没有安装 Rust，先安装它。可以从 [rust-lang.org](https://www.rust-lang.org/tools/install) 安装 Rust：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
      ```

      ```powershell Windows theme={null}
      # Download and run rustup-init.exe from https://rustup.rs/
      ```
    </CodeGroup>

    验证你的 Rust 安装：

    ```bash theme={null}
    rustc --version
    cargo --version
    ```

    现在，创建并配置我们的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
      # Create a new Rust project
      cargo new weather
      cd weather
      ```

      ```powershell Windows theme={null}
      # Create a new Rust project
      cargo new weather
      cd weather
      ```
    </CodeGroup>

    更新你的 `Cargo.toml`，添加所需的依赖：

    ```toml Cargo.toml theme={null}
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

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 导入包与常量

    打开 `src/main.rs`，在顶部添加这些导入和常量：

    ```rust theme={null}
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

    `rmcp` crate 提供了 Rust 版模型上下文协议 SDK，涵盖服务器实现、过程宏与 stdio 传输特性。

    ### 数据结构

    接下来，定义用于反序列化 NWS API 响应的数据结构：

    ```rust theme={null}
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

    现在定义 MCP 客户端将发送的请求类型：

    ```rust theme={null}
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

    ### 辅助函数

    添加用于发起 API 请求和格式化响应的辅助函数：

    ```rust theme={null}
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

    ### 实现天气服务器与工具

    现在来实现包含工具处理器的 Weather 服务器主结构体：

    ```rust theme={null}
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

    `#[tool_router]` 宏会自动生成路由逻辑，`#[tool]` 属性则把方法标记为 MCP 工具。

    ### 实现 ServerHandler

    实现 `ServerHandler` trait 来定义服务器能力：

    ```rust theme={null}
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

    ### 运行服务器

    最后，实现以 stdio 传输运行服务器的主函数：

    ```rust theme={null}
    #[tokio::main]
    async fn main() -> Result<()> {
        let transport = (tokio::io::stdin(), tokio::io::stdout());
        let service = Weather::new().serve(transport).await?;
        service.waiting().await?;
        Ok(())
    }
    ```

    用以下命令构建你的服务器：

    ```bash theme={null}
    cargo build --release
    ```

    编译出的二进制文件位于 `target/release/weather`。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/target/release/weather"
          }
        }
      }
      ```

      ```json Windows theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\target\\release\\weather.exe"
          }
        }
      }
      ```
    </CodeGroup>

    > **注：**
> 务必传入编译产物的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`），并加上 `.exe` 扩展名。

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行指定路径上的编译产物来启动它

    保存文件，然后重启 **Claude for Desktop**。
  
  
    让我们开始构建天气服务器吧！[我们要构建的完整代码在这里。](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-go)

    ### 前置知识

    本快速入门假设你熟悉以下内容：

    * Go
    * Claude 之类的 LLM

    ### MCP 服务器中的日志

    实现 MCP 服务器时，要谨慎处理日志：

    **对于基于 STDIO 的服务器：** 千万不要使用 `fmt.Println()` 或 `fmt.Printf()`，它们会写入标准输出（stdout）。写入 stdout 会破坏 JSON-RPC 消息，导致服务器无法工作。

    **对于基于 HTTP 的服务器：** 标准输出日志没有问题，因为它不会干扰 HTTP 响应。

    ### 最佳实践

    * 使用 `log.Println()`（默认输出到 stderr），或使用写入 stderr 或文件的日志库。
    * 用 `fmt.Fprintf(os.Stderr, ...)` 显式写入 stderr。

    ### 快速示例

    ```go theme={null}
    // ❌ Bad (STDIO)
    fmt.Println("Processing request")

    // ✅ Good (STDIO)
    log.Println("Processing request") // defaults to stderr

    // ✅ Good (STDIO)
    fmt.Fprintln(os.Stderr, "Processing request")
    ```

    ### 系统要求

    * 已安装 Go 1.24 或更高版本。

    ### 配置环境

    首先，如果还没有安装 Go，先安装它。可以从 [go.dev](https://go.dev/dl/) 下载并安装 Go。

    验证你的 Go 安装：

    ```bash theme={null}
    go version
    ```

    现在，创建并配置我们的项目：

    <CodeGroup>
      ```bash macOS/Linux theme={null}
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

      ```powershell Windows theme={null}
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
    </CodeGroup>

    现在开始深入构建你的服务器。

    ## 构建你的服务器

    ### 导入包与常量

    把以下内容添加到 `main.go` 的顶部：

    ```go theme={null}
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

    ### 数据结构

    接下来，定义我们的工具会用到的数据结构：

    ```go theme={null}
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

    ### 辅助函数

    接下来，添加用于查询和格式化 NWS API 数据的辅助函数：

    ```go theme={null}
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

    ### 实现工具执行

    工具执行处理器负责实际执行每个工具的逻辑。来添加它：

    ```go theme={null}
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

    ### 运行服务器

    最后，实现运行服务器的 main 函数：

    ```go theme={null}
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

    用以下命令构建你的服务器：

    ```bash theme={null}
    go build -o weather .
    ```

    编译出的二进制文件位于 `./weather`。

    现在，让我们在一个现成的 MCP 宿主——Claude for Desktop——里测试你的服务器。

    ## 在 Claude for Desktop 中测试你的服务器

    首先，确保你已经安装了 Claude for Desktop。[你可以在这里安装最新版本。](https://claude.ai/download) 如果已经有了 Claude for Desktop，**请务必把它更新到最新版本。**

    我们需要为想使用的 MCP 服务器配置 Claude for Desktop。为此，用文本编辑器打开 Claude for Desktop 的应用配置文件 `~/Library/Application Support/Claude/claude_desktop_config.json`。如果该文件不存在，先创建它。

    例如，如果你安装了 [VS Code](https://code.visualstudio.com/)：

    <CodeGroup>
      ```bash Linux theme={null}
      code ~/.config/Claude/claude_desktop_config.json
      ```

      ```bash macOS theme={null}
      code ~/Library/Application\ Support/Claude/claude_desktop_config.json
      ```

      ```powershell Windows theme={null}
      code $env:AppData\Claude\claude_desktop_config.json
      ```
    </CodeGroup>

    然后把你的服务器添加到 `mcpServers` 键下。只有至少正确配置了一个服务器，MCP 的 UI 元素才会出现在 Claude for Desktop 中。

    本例中，我们像下面这样添加这个唯一的天气服务器：

    <CodeGroup>
      ```json macOS/Linux theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/weather/weather"
          }
        }
      }
      ```

      ```json Windows theme={null}
      {
        "mcpServers": {
          "weather": {
            "command": "C:\\ABSOLUTE\\PATH\\TO\\PARENT\\FOLDER\\weather\\weather.exe"
          }
        }
      }
      ```
    </CodeGroup>

    > **注：**
> 务必传入编译产物的绝对路径。在 macOS/Linux 上于项目目录运行 `pwd`、在 Windows 命令提示符中运行 `cd` 即可获取。在 Windows 上，记得 JSON 路径中要使用双反斜杠（`\\`）或正斜杠（`/`），并加上 `.exe` 扩展名。

    这会告诉 Claude for Desktop：

    1. 存在一个名为 "weather" 的 MCP 服务器
    2. 通过运行指定路径上的编译产物来启动它

    保存文件，然后重启 **Claude for Desktop**。

### 用命令测试

先确认 Claude for Desktop 是否识别到了我们在 `weather` 服务器中公开的两个工具。方法是找到 "Add files, connectors, and more /"（添加文件、连接器等）<img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" style={{display: 'inline', margin: 0, height: '1.3em', width: 'auto'}} width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" /> 图标：

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/visual-indicator-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=1bf23a2cfc5f6dd3dac1c7574cceebc9" width="684" height="133" data-path="images/visual-indicator-mcp-tools.png" />

点击加号图标后，把鼠标悬停在 "Connectors"（连接器）菜单上。你应该能看到列出的 `weather` 服务器：

  <img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" width="437" height="244" data-path="images/available-mcp-tools.png" />

如果你的服务器没有被 Claude for Desktop 识别，请前往[故障排查](#troubleshooting)小节查看调试提示。

如果服务器已经出现在 "Connectors"（连接器）菜单中，现在就可以在 Claude for Desktop 中运行以下命令来测试你的服务器：

* What's the weather in Sacramento?（萨克拉门托的天气怎么样？）
* What are the active weather alerts in Texas?（得克萨斯州有哪些生效的天气警报？）

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/current-weather.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=dce7b2f8a06c20ba358e4bd2e75fa4c7" width="2780" height="1849" data-path="images/current-weather.png" />

  <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/weather-alerts.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=c4762bf2bd84a8781846d2965af3e4a4" width="2809" height="1850" data-path="images/weather-alerts.png" />

> **注：**
> 由于这是美国国家气象局（NWS）的服务，这些查询只对美国境内的地点有效。

## 背后发生了什么

当你提问时：

1. 客户端把你的问题发送给 Claude
2. Claude 分析可用的工具，并决定使用哪一个（或哪几个）
3. 客户端通过 MCP 服务器执行选定的工具
4. 结果回传给 Claude
5. Claude 组织出一段自然语言回答
6. 回答展示给你！

## 故障排查

<AccordionGroup>
  <Accordion title="Claude for Desktop 集成问题">
    **从 Claude for Desktop 获取日志**

    Claude.app 中与 MCP 相关的日志会写入 `~/Library/Logs/Claude`（macOS）或 `~/.config/Claude/logs/`（Linux）下的日志文件：

    * `mcp.log` 包含有关 MCP 连接及连接失败的常规日志。
    * 名为 `mcp-server-SERVERNAME.log` 的文件包含对应服务器的 stderr 输出。stdio 服务器可能把所有日志都写到 stderr，因此这些文件并不只包含错误信息。

    你可以运行以下命令来列出最近的日志并持续跟踪新增日志：

    ```bash macOS theme={null}
    # Check Claude's logs for errors
    tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
    ```

    ```bash Linux theme={null}
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

> **注：**
> 如需更深入的故障排查，请参阅我们的 [Debugging MCP](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging) 指南。

## 后续步骤

  - [构建客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)：学习如何构建能连接你服务器的 MCP 客户端
  - [示例服务器](https://modelcontextprotocol.io/examples)：浏览我们的官方 MCP 服务器与实现合集
  - [调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：学习如何高效调试 MCP 服务器与集成
  - [用 Agent Skills 构建](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills)：用 Agent Skills 指导 AI 编码助手完成服务器设计
