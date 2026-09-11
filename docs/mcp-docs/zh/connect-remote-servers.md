# 连接远程 MCP 服务器

> 了解如何将 Claude 连接到远程 MCP 服务器，并借助托管在互联网上的工具和数据源扩展其能力

远程 MCP 服务器把 AI 应用的能力延伸到本地环境之外，提供对托管在互联网上的工具、服务和数据源的访问。连接远程 MCP 服务器后，AI 助手将从好用的工具转变为掌握充分信息的队友——能实时访问外部资源，胜任复杂的多步骤项目。

如今许多客户端都支持远程 MCP 服务器，带来了丰富多样的集成可能。本指南以 [Claude](https://claude.ai/) 为例演示如何连接远程 MCP 服务器——Claude 是众多支持 MCP 的客户端之一。虽然本文聚焦 Claude 通过自定义连接器（Custom Connectors）实现的方案，但相关概念同样适用于其他兼容 MCP 的客户端。

## 理解远程 MCP 服务器

远程 MCP 服务器的运作方式与本地 MCP 服务器相似，区别在于它们托管在互联网上，而不是你的本地机器上。它们对外暴露工具、提示词和资源，Claude 可以借助它们替你执行任务。这类服务器可以与各种服务集成，例如项目管理工具、文档系统、代码仓库，以及其他任何提供 API 的服务。

远程 MCP 服务器最关键的优势是随处可用。本地服务器需要在每台设备上安装和配置，而远程服务器可以从任何有网络连接的 MCP 客户端访问。因此，它们特别适合基于 Web 的 AI 应用、注重易用性的集成方案，以及需要服务器端处理或认证的服务。

## 什么是自定义连接器？

自定义连接器充当 Claude 与远程 MCP 服务器之间的桥梁。它让你把 Claude 直接连接到与你的工作流最相关的工具和数据源，使 Claude 能够在你常用的软件中开展工作，并从外部工具的完整上下文中获取洞察。

通过自定义连接器，你可以：

* [将 Claude 连接到现有的远程 MCP 服务器](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)（由第三方开发者提供）
* [构建你自己的远程 MCP 服务器，连接任何工具](https://support.anthropic.com/en/articles/11503834-building-custom-connectors-via-remote-mcp-servers)

## 连接到远程 MCP 服务器

将 Claude 连接到远程 MCP 服务器的过程，就是通过 [Claude 界面](https://claude.ai/) 添加一个自定义连接器。这会在 Claude 与你选定的远程服务器之间建立安全连接。

  
    打开 Claude Desktop 或浏览器中的 Claude，然后进入设置页面：

    * **桌面版**：使用键盘快捷键 `Ctrl+Comma`，或点击左上角的菜单图标 <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-desktop-hamburger-menu-icon.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=66e498f668362c79f829a07b5ce863c8" style={{display: 'inline', margin: 0, height: '1.3em', width: 'auto'}} width="33" height="33" data-path="images/claude-desktop-hamburger-menu-icon.png" />，将鼠标悬停在 "File" 上并选择 "Settings"
    * **浏览器版**：使用键盘快捷键 `⌘⇧,`（*macOS*），或点击你的头像图标，然后从菜单中选择 "Settings"

    进入设置页面后，点击侧边栏中的 "Connectors"。页面会显示你当前已配置的连接器，并提供添加新连接器的选项。
  

  
    在 Connectors 区域，点击窗口右上角的 "Add" 按钮，再从下拉菜单中选择 "Add custom connector"，开始连接流程。要跟着本指南操作，请复制/粘贴下面的 URL：

    ```text Example Remote Server theme={null}
    https://example-server.modelcontextprotocol.io/mcp
    ```

    
      <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-remote/1-add-connector.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=b5ae9b23164875bbaa3aff4c178cdc64" alt="Add custom connector button in Claude settings" width="1038" height="809" data-path="images/quickstart-remote/1-add-connector.png" />
    

    随后会弹出一个对话框，提示你输入远程 MCP 服务器的 URL。这个 URL 应由服务器开发者或管理员提供。请输入完整的 URL，确保包含正确的协议（https\://）以及必要的路径部分。

    
      <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-remote/2-connect.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=0934f16d8e016cade8e560c8f89d011b" alt="Dialog for entering remote MCP server URL" width="1616" height="282" data-path="images/quickstart-remote/2-connect.png" />
    

    输入 URL 后，点击 "Add" 继续连接流程。
  

  
    大多数远程 MCP 服务器要求认证，以确保对其资源的安全访问。认证流程因服务器实现而异，常见方式包括 OAuth、API 密钥或用户名/密码组合。

    
      <img src="https://mintcdn.com/mcp/4ZXF1PrDkEaJvXpn/images/quickstart-remote/3-auth.png?fit=max&auto=format&n=4ZXF1PrDkEaJvXpn&q=85&s=89af6e1b85718637231388697cc7b015" alt="Authentication screen for remote MCP server" width="490" height="806" data-path="images/quickstart-remote/3-auth.png" />
    

    按照服务器给出的认证提示操作。这一过程可能会将你重定向到第三方认证提供商，也可能在 Claude 内显示一个表单。认证完成后，Claude 会与远程服务器建立安全连接。
  

  
    连接成功后，远程服务器的资源和提示词就可以在你的 Claude 对话中使用了。点击消息输入区左下角的 "Add files, connectors, and more /" 指示器 <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/claude-add-files-connectors-and-more.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=53acf21f6807dd5323b70b84b5d98d8a" style={{display: 'inline', margin: 0, height: '1.3em', width: 'auto'}} width="33" height="33" data-path="images/claude-add-files-connectors-and-more.png" /> 即可访问它们。接着，把鼠标悬停在 "Connectors" 上，再将光标移到 "Add to Example Remote Server" 上，悬停时会展开附件菜单。

    
      <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-remote/4-select-resources-menu.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=e5fa85174f8acbadbd709bac66f42d5c" alt="Attachment menu showing available resources" width="735" height="378" data-path="images/quickstart-remote/4-select-resources-menu.png" />
    

    菜单会显示已连接服务器上所有可用的资源和提示词。选择你希望加入对话的条目。这些资源为 Claude 提供了来自你外部工具的上下文和信息。

    
      <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-remote/5-select-prompts-resources.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=68722669d9e18252756885c703e4f221" alt="Selecting specific resources and prompts from the menu" width="648" height="529" data-path="images/quickstart-remote/5-select-prompts-resources.png" />
    
  

  
    远程 MCP 服务器通常暴露多个能力各异的工具。你可以在连接器设置中配置权限，控制允许 Claude 使用哪些工具，从而确保 Claude 只执行你明确授权过的操作。

    
      <img src="https://mintcdn.com/mcp/cpXzQjUOzyH0mCNH/images/quickstart-remote/6-configure-tools.png?fit=max&auto=format&n=cpXzQjUOzyH0mCNH&q=85&s=5cfd8b2c5d06e7e3699eac24c68d090e" alt="Tool permission configuration interface" width="604" height="745" data-path="images/quickstart-remote/6-configure-tools.png" />
    

    返回 Connectors 设置，点击你已连接的服务器。在这里，你可以启用或禁用特定工具、设置使用限额，还可以按需配置其他安全参数。
  

## 使用远程 MCP 服务器的最佳实践

使用远程 MCP 服务器时，不妨参考以下建议，以获得安全、高效的体验：

**安全考量**：连接前务必核实远程 MCP 服务器的真实性。只连接来自可信来源的服务器，并仔细审查认证过程中请求的权限。向敏感数据或系统授予访问权限时要格外谨慎。

**管理多个连接器**：你可以同时连接多个远程 MCP 服务器。按用途或项目整理连接器，保持条理清晰。定期检查并移除不再使用的连接器，让工作区保持整洁、安全。

## 后续步骤

现在，你已经把 Claude 连接到远程 MCP 服务器，可以在对话中探索它的能力了。试着用已连接的工具自动执行任务、访问外部数据，或与你现有的工作流集成。

  - [构建你自己的远程服务器](https://support.anthropic.com/en/articles/11503834-building-custom-connectors-via-remote-mcp-servers)：创建自定义远程 MCP 服务器，与专有工具和服务集成
  - [探索可用的服务器](https://github.com/modelcontextprotocol/servers)：浏览我们收集的官方与社区创建的 MCP 服务器
  - [连接本地服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：了解如何将 Claude Desktop 连接到本地 MCP 服务器，以便直接访问系统
  - [理解架构](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)：深入理解 MCP 的工作原理与架构

远程 MCP 服务器为扩展 Claude 的能力解锁了强大的可能性。随着你对这些集成越来越熟悉，你会不断发现精简工作流、更高效完成复杂任务的新方法。
