<BiRow>
<template #en>

## Discord

</template>
<template #zh>

## Discord

</template>
</BiRow>

<BiRow>
<template #en>

Users can chat with a Chat directly in Discord. This is suitable for community support, product Q&A, user feedback collection, and similar scenarios.

</template>
<template #zh>

用户可以直接在 Discord 中与对话助手交流。该渠道适用于社区支持、产品问答、用户反馈收集等场景。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Create an application and bot in the Discord Developer Portal.
- Obtain the `BotToken` on the **Bot** page.
- Generate an invitation link on the **OAuth2** page and select the `bot` scope.
- Grant the bot permissions to send messages and read message history.
- Invite the bot to the target server.

</template>
<template #zh>

- 在 Discord Developer Portal 中创建应用和机器人。
- 在 **Bot** 页面获取 `BotToken`。
- 在 **OAuth2** 页面生成邀请链接，并选择 `bot` scope（权限范围）。
- 为机器人授予发送消息和读取消息历史的权限。
- 将机器人邀请进目标服务器。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different Discord bots.
- **BotToken**: The Discord bot authentication credential. Obtain it from **Discord Developer Portal > Bot**. An incorrect value causes the bot to fail to connect to Discord.
- **ApplicationID** (optional): The Discord application identifier. Obtain it from **Discord Developer Portal > General Information**. Leaving it empty does not affect basic message receiving and replying.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的 Discord 机器人。
- **BotToken**：Discord 机器人身份验证凭证，从 **Discord Developer Portal > Bot** 获取。取值错误会导致机器人无法连接到 Discord。
- **ApplicationID**（可选）：Discord 应用标识，从 **Discord Developer Portal > General Information** 获取。留空不影响基本的消息接收与回复。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

When adding a Discord channel in RAGFlow, fill in the `BotToken` obtained from the Discord Developer Portal and connect the channel to a Chat after saving it. The bot must join the target server and have permissions to read and send messages. If `MessageContentIntent` is not enabled, the bot may appear online but fail to read the body text of user messages.

</template>
<template #zh>

在 RAGFlow 中添加 Discord 渠道时，填入从 Discord Developer Portal 获取的 `BotToken`，保存后将渠道连接到某个对话助手。机器人必须已加入目标服务器，并具备读取和发送消息的权限。若未启用 `MessageContentIntent`，机器人可能显示在线状态，却无法读取用户消息的正文。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in Discord to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在 Discord 中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## DingTalk

</template>
<template #zh>

## 钉钉（DingTalk）

</template>
</BiRow>

<BiRow>
<template #en>

The DingTalk channel is suitable for organizational collaboration scenarios. Members can complete knowledge Q&A, process consultation, and business support in DingTalk conversations.

</template>
<template #zh>

钉钉渠道适用于组织协作场景。成员可以在钉钉会话中完成知识问答、流程咨询和业务支持。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Create an application in the DingTalk Open Platform.
- Add bot capabilities to the application.
- Enable permissions related to bot message sending and cards, such as `qyapi_robot_sendmsg`, `Card.Streaming.Write`, and `Card.Instance.Write`.
- Publish the application version to make the configuration take effect.
- Obtain the `ClientID` and `ClientSecret`.

</template>
<template #zh>

- 在钉钉开放平台创建一个应用。
- 为应用添加机器人能力。
- 开通与机器人消息发送和卡片相关的权限，例如 `qyapi_robot_sendmsg`、`Card.Streaming.Write` 和 `Card.Instance.Write`。
- 发布应用版本，使配置生效。
- 获取 `ClientID` 和 `ClientSecret`。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different DingTalk bots.
- **ClientID**: The DingTalk application identity identifier. Obtain it from **DingTalk Open Platform > Application Credentials**. An incorrect value causes message connection establishment to fail.
- **ClientSecret**: The DingTalk application secret. Obtain it from **DingTalk Open Platform > Application Credentials**. An incorrect value causes DingTalk platform authentication to fail.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的钉钉机器人。
- **ClientID**：钉钉应用的身份标识，从 **钉钉开放平台 > 应用凭证** 获取。取值错误会导致消息连接建立失败。
- **ClientSecret**：钉钉应用密钥，从 **钉钉开放平台 > 应用凭证** 获取。取值错误会导致钉钉平台身份验证失败。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

When adding a DingTalk channel in RAGFlow, fill in the `ClientID` and `ClientSecret` from the DingTalk Open Platform and connect the channel to a Chat after saving it. DingTalk replies depend on the conversation `Webhook` returned in message events. Therefore, the user must first send a message to the bot in DingTalk before RAGFlow can return a reply in the corresponding conversation.

</template>
<template #zh>

在 RAGFlow 中添加钉钉渠道时，填入来自钉钉开放平台的 `ClientID` 和 `ClientSecret`，保存后将渠道连接到某个对话助手。钉钉的回复依赖消息事件中返回的会话 `Webhook`，因此用户必须先在钉钉中向机器人发一条消息，RAGFlow 才能在相应会话中返回回复。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in DingTalk to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在钉钉中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## Feishu / Lark

</template>
<template #zh>

## 飞书 / Lark

</template>
</BiRow>

<BiRow>
<template #en>

The Feishu / Lark channel helps organization members use knowledge assistants in daily chat windows. It is suitable for enterprise knowledge Q&A, customer service collaboration, and internal business assistants.

</template>
<template #zh>

飞书 / Lark 渠道让组织成员在日常聊天窗口中使用知识助手，适用于企业知识问答、客服协作和内部业务助手等场景。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Create an application in the Feishu Open Platform or Lark Developer Console.
- Enable bot capabilities.
- Configure long connections or event subscriptions.
- Enable permissions related to user IDs, messages, and groups.
- Obtain the `AppID` and `AppSecret`.

</template>
<template #zh>

- 在飞书开放平台或 Lark Developer Console 创建一个应用。
- 开启机器人能力。
- 配置长连接或事件订阅。
- 开通与用户 ID、消息和群组相关的权限。
- 获取 `AppID` 和 `AppSecret`。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different Feishu / Lark bots.
- **AppID**: The Feishu / Lark application identifier. Obtain it from **Feishu Open Platform / Lark Developer Console > Application Credentials**. An incorrect value causes the bot to fail to establish a connection.
- **AppSecret**: The Feishu / Lark application secret. Obtain it from **Feishu Open Platform / Lark Developer Console > Application Credentials**. An incorrect value causes the bot to fail to receive or send messages.
- **Domain**: The platform region setting. Select **Feishu(mainland)** for mainland China Feishu, and select **Lark(international)** for the international Lark version. An incorrect selection causes authentication or API calls to fail.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的飞书 / Lark 机器人。
- **AppID**：飞书 / Lark 应用标识，从 **飞书开放平台 / Lark Developer Console > 应用凭证** 获取。取值错误会导致机器人无法建立连接。
- **AppSecret**：飞书 / Lark 应用密钥，从 **飞书开放平台 / Lark Developer Console > 应用凭证** 获取。取值错误会导致机器人无法收发消息。
- **Domain**：平台区域设置。中国大陆飞书选择 **Feishu(mainland)**，国际版 Lark 选择 **Lark(international)**。选择错误会导致身份验证或 API 调用失败。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

When adding a Feishu / Lark channel in RAGFlow, fill in the `AppID` and `AppSecret` from the open platform and select the `Domain` based on the platform where the application is located. After saving the configuration, connect the channel to a Chat and add the bot to the Feishu / Lark conversation where it will be used.

</template>
<template #zh>

在 RAGFlow 中添加飞书 / Lark 渠道时，填入来自开放平台的 `AppID` 和 `AppSecret`，并根据应用所在平台选择 `Domain`。保存配置后，将渠道连接到某个对话助手，并把机器人加入实际使用的飞书 / Lark 会话。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in Feishu or Lark to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在飞书或 Lark 中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## QQ Bot

</template>
<template #zh>

## QQ 机器人（QQ Bot）

</template>
</BiRow>

<BiRow>
<template #en>

The QQ Bot channel is suitable for providing automatic Q&A services to QQ users. It can cover one-on-one chats, group chats, channels, private messages, and other conversation scenarios.

</template>
<template #zh>

QQ 机器人渠道适合面向 QQ 用户提供自动问答服务，可覆盖单聊、群聊、频道、私信等会话场景。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Create a bot in the QQ Open Platform or QQ Bot Open Platform.
- Obtain the bot `AppID`.
- Obtain the bot `ClientSecret`.
- Enable the message event permissions required for use.
- Add the bot to the QQ conversation scope it needs to serve.

</template>
<template #zh>

- 在 QQ 开放平台或 QQ 机器人开放平台创建一个机器人。
- 获取机器人 `AppID`。
- 获取机器人 `ClientSecret`。
- 开通使用所需的消息事件权限。
- 将机器人加入其需要服务的 QQ 会话范围。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different QQ bots.
- **AppID**: The QQ bot application identifier. Obtain it from **QQ Bot Platform > Application Information**. An incorrect value causes the bot to fail to connect to the gateway.
- **ClientSecret**: The QQ bot application secret. Obtain it from **QQ Bot Platform > Application Credentials**. An incorrect value causes authentication to fail.
- **BaseURL** (optional): The base address of the QQ Bot API. Keep the default value in ordinary environments. Fill it in only when using a proxy or a specified API address. An incorrect value causes gateway address retrieval or message sending to fail.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的 QQ 机器人。
- **AppID**：QQ 机器人应用标识，从 **QQ 机器人平台 > 应用信息** 获取。取值错误会导致机器人无法连接网关。
- **ClientSecret**：QQ 机器人应用密钥，从 **QQ 机器人平台 > 应用凭证** 获取。取值错误会导致身份验证失败。
- **BaseURL**（可选）：QQ 机器人 API 的基础地址。普通环境下保持默认值，仅在使用代理或指定 API 地址时才填写。取值错误会导致网关地址获取或消息发送失败。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

When adding a QQ Bot channel in RAGFlow, fill in the `AppID` and `ClientSecret` obtained from the QQ platform and connect the channel to a Chat after saving it. In ordinary public network environments, keep `BaseURL` empty and use the system default address. Fill in this parameter only when the platform requires another API domain name, a proxy gateway, or a private forwarding address.

</template>
<template #zh>

在 RAGFlow 中添加 QQ 机器人渠道时，填入从 QQ 平台获取的 `AppID` 和 `ClientSecret`，保存后将渠道连接到某个对话助手。在普通公网环境下，`BaseURL` 保持为空并使用系统默认地址；仅当平台要求使用其他 API 域名、代理网关或私有转发地址时才填写该参数。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in QQ to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在 QQ 中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## Telegram

</template>
<template #zh>

## Telegram

</template>
</BiRow>

<BiRow>
<template #en>

The Telegram channel supports real-time conversations with users through a bot. It is suitable for overseas user services, community operations, and lightweight message bot scenarios.

</template>
<template #zh>

Telegram 渠道支持通过机器人与用户实时对话，适用于海外用户服务、社区运营和轻量级消息机器人场景。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Use BotFather to create a Telegram bot.
- Obtain the `BotToken`.
- If using the bot in a group, add it to the target group.
- Check the bot privacy mode and group permissions.

</template>
<template #zh>

- 使用 BotFather 创建一个 Telegram 机器人。
- 获取 `BotToken`。
- 若要在群组中使用机器人，先将其加入目标群组。
- 检查机器人的隐私模式和群组权限。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different Telegram bots.
- **BotToken**: The Telegram bot authentication credential. Obtain it from **Telegram > BotFather**. An incorrect value causes the bot to fail to start.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的 Telegram 机器人。
- **BotToken**：Telegram 机器人身份验证凭证，从 **Telegram > BotFather** 获取。取值错误会导致机器人无法启动。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

If you need to use the bot in a group, add it to the target group and confirm that it can receive the messages that need to be processed. Group privacy mode may affect whether the bot can read ordinary messages.

</template>
<template #zh>

如果需要在群组中使用机器人，请将其加入目标群组，并确认它能收到需要处理的消息。群组隐私模式可能会影响机器人能否读取普通消息。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in Telegram to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在 Telegram 中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## WeCom

</template>
<template #zh>

## 企业微信（WeCom）

</template>
</BiRow>

<BiRow>
<template #en>

The WeCom channel is suitable for providing knowledge Q&A, employee services, and business bot capabilities inside an enterprise. You can select `Webhook` or `WebSocket` access based on the deployment environment.

</template>
<template #zh>

企业微信渠道适合在企业内部提供知识问答、员工服务和业务机器人能力。你可以根据部署环境选择 `Webhook` 或 `WebSocket` 接入方式。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Create a WeCom application or smart bot based on the access method.
- When using `Webhook`, prepare the enterprise ID, application ID, application secret, and callback configuration.
- When using `WebSocket`, create a smart bot through the WeCom API.
- Obtain the `BotID` and `Secret` required by the `WebSocket` method.
- Confirm that the bot has been enabled in WeCom.

</template>
<template #zh>

- 根据接入方式创建企业微信应用或智能机器人。
- 使用 `Webhook` 时，准备好企业 ID、应用 ID、应用密钥和回调配置。
- 使用 `WebSocket` 时，通过企业微信 API 创建智能机器人。
- 获取 `WebSocket` 方式所需的 `BotID` 和 `Secret`。
- 确认机器人已在企业微信中启用。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

WeCom supports two connection methods: `Webhook` and `WebSocket`. Different parameters are required for different methods.

</template>
<template #zh>

企业微信支持 `Webhook` 和 `WebSocket` 两种连接方式，不同方式需要填写不同参数。

</template>
</BiRow>

<BiRow>
<template #en>

Parameters required by the `Webhook` method:

</template>
<template #zh>

`Webhook` 方式所需参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different WeCom bots.
- **ConnectionType**: Select `Webhook`. After selecting it, you need to fill in `CorpID`, `AgentID`, `Secret`, `Token`, and `AESKey`.
- **Secret**: The WeCom application secret. Obtain it from **WeCom Admin Console > Application Management**. An incorrect value causes WeCom messages to fail to send.
- **CorpID**: The enterprise subject identifier. Obtain it from **WeCom Admin Console > Enterprise Information**. An incorrect value causes callback verification or API authentication to fail.
- **AgentID**: The WeCom application identifier. Obtain it from **WeCom Admin Console > Application Management**. An incorrect value causes application message sending to fail.
- **Token**: The callback signature verification credential. Obtain it from **WeCom Admin Console > Callback Configuration**. An incorrect value causes callback verification to fail.
- **AESKey**: The message encryption and decryption key. Obtain it from **WeCom Admin Console > Callback Configuration**. An incorrect value causes messages to fail to decrypt.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的企业微信机器人。
- **ConnectionType**：选择 `Webhook`。选择后需填写 `CorpID`、`AgentID`、`Secret`、`Token` 和 `AESKey`。
- **Secret**：企业微信应用密钥，从 **企业微信管理后台 > 应用管理** 获取。取值错误会导致企业微信消息发送失败。
- **CorpID**：企业主体标识，从 **企业微信管理后台 > 企业信息** 获取。取值错误会导致回调验证或 API 身份验证失败。
- **AgentID**：企业微信应用标识，从 **企业微信管理后台 > 应用管理** 获取。取值错误会导致应用消息发送失败。
- **Token**：回调签名验证凭证，从 **企业微信管理后台 > 回调配置** 获取。取值错误会导致回调验证失败。
- **AESKey**：消息加解密密钥，从 **企业微信管理后台 > 回调配置** 获取。取值错误会导致消息解密失败。

</template>
</BiRow>

<BiRow>
<template #en>

Parameters required by the `WebSocket` method:

</template>
<template #zh>

`WebSocket` 方式所需参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different WeCom bots.
- **ConnectionType**: Select `WebSocket`. After selecting it, you only need to fill in `BotID` and `Secret`.
- **BotID**: The WeCom smart bot identifier. Obtain it from **WeCom Admin Console > Smart Bot**. An incorrect value causes long-connection subscription to fail.
- **Secret**: The long-connection subscription secret. Obtain it from **WeCom Admin Console > Smart Bot**. An incorrect value causes `WebSocket` authentication to fail.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的企业微信机器人。
- **ConnectionType**：选择 `WebSocket`。选择后只需填写 `BotID` 和 `Secret`。
- **BotID**：企业微信智能机器人标识，从 **企业微信管理后台 > 智能机器人** 获取。取值错误会导致长连接订阅失败。
- **Secret**：长连接订阅密钥，从 **企业微信管理后台 > 智能机器人** 获取。取值错误会导致 `WebSocket` 身份验证失败。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

The credentials for `Webhook` and `WebSocket` cannot be mixed. When selecting `WebSocket`, first create a smart bot in WeCom, then fill the obtained `BotID` and `Secret` into RAGFlow. When selecting `Webhook`, fill in `CorpID`, `AgentID`, `Secret`, `Token`, and `AESKey` according to the WeCom application callback configuration.

</template>
<template #zh>

`Webhook` 与 `WebSocket` 的凭证不能混用。选择 `WebSocket` 时，先在企业微信中创建智能机器人，再将获取到的 `BotID` 和 `Secret` 填入 RAGFlow；选择 `Webhook` 时，按照企业微信应用的回调配置填写 `CorpID`、`AgentID`、`Secret`、`Token` 和 `AESKey`。

</template>
</BiRow>

<BiRow>
<template #en>

After saving the channel, connect the WeCom channel to a Chat, or bind it to a custom Agent (see below). After the connection succeeds, users can send messages to the bot in WeCom, and the bot calls the bound Chat or Agent to return replies.

</template>
<template #zh>

保存渠道后，将企业微信渠道连接到某个对话助手，或绑定到自定义 Agent（见下文）。连接成功后，用户在企业微信中向机器人发消息，机器人会调用绑定的对话助手或 Agent 返回回复。

</template>
</BiRow>

<BiRow>
<template #en>

### Binding a custom Agent

</template>
<template #zh>

### 绑定自定义 Agent

</template>
</BiRow>

<BiRow>
<template #en>

Besides a Chat, a WeCom channel can be bound to a custom Flow Agent, so inbound messages are answered by the workflow you designed on the **Agent** canvas instead of a regular Chat.

</template>
<template #zh>

除对话助手外，企业微信渠道还可以绑定到自定义 Flow Agent，让收到的消息由你在 **Agent** 画布上设计的工作流来回答，而不是普通的对话助手。

</template>
</BiRow>

<BiRow>
<template #en>

Prerequisites:

</template>
<template #zh>

前提条件：

</template>
</BiRow>

<BiRow>
<template #en>

- Design a Flow Agent in RAGFlow (**Agent > Flow agents**) and make sure the models used by its components are configured for the tenant (for example, the LLM node must point to a valid model of the tenant that owns the channel).
- The agent must be owned by, or shared (permission `team`) with, the tenant that owns the WeCom channel.
- Complete the WeCom channel connection first (`Webhook` or `WebSocket`), as described above.

</template>
<template #zh>

- 在 RAGFlow 中设计一个 Flow Agent（**Agent > Flow agents**），并确保其组件所用的模型已为租户配置好（例如 LLM 节点必须指向渠道所属租户的某个有效模型）。
- 该 Agent 必须属于企业微信渠道所属租户，或以 `team` 权限共享给该租户。
- 按上文说明先完成企业微信渠道连接（`Webhook` 或 `WebSocket`）。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Target**: The connect dialog shows a single dropdown whose entries are prefixed with their type. Entries labeled `[Chat assistant]` are the Chats of the current tenant; entries labeled `[Agent]` are the Flow Agents (canvas category `agent_canvas`) accessible to the current tenant. The stored value is the selected Chat id or Agent id, which is filled in automatically when you pick an entry, so no external credential is required. If you need the Agent id explicitly, open the Agent in **Agent > Flow agents** and copy the id from the browser URL. A channel can be bound to exactly one target at a time: picking another target replaces the previous binding, and clearing the selection disconnects the channel. If the selected agent has components without a configured model, the runtime replies with an error message.

</template>
<template #zh>

- **Target**：连接对话框中只有一个下拉框，其条目均带有类型前缀。标有 `[Chat assistant]` 的条目是当前租户的对话助手；标有 `[Agent]` 的条目是当前租户可访问的 Flow Agent（画布类别 `agent_canvas`）。实际存储的值是所选对话助手 id 或 Agent id，选中条目后自动填入，无需外部凭证。如果确实需要用到 Agent id，可在 **Agent > Flow agents** 中打开该 Agent，并从浏览器 URL 中复制 id。一个渠道同一时间只能绑定一个目标：选择其他目标会替换原有绑定，清空选择则断开渠道。如果所选 Agent 存在未配置模型的组件，运行时会回复错误消息。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

1. Open **User settings > Chat channels**, find the WeCom channel, and click the link icon to open the connect dialog.
2. In the connect dialog, pick the `[Agent]` entry of the Flow Agent (or a `[Chat assistant]` entry to bind a Chat) from the **Select an assistant or Agent** dropdown.
3. Click confirm; reopening the dialog shows the currently bound target.
4. Send a test message to the bot in WeCom and verify the reply.

</template>
<template #zh>

1. 打开 **用户设置 > 对话渠道**，找到企业微信渠道，点击链接图标打开连接对话框。
2. 在连接对话框中，从 **Select an assistant or Agent** 下拉框里选择 Flow Agent 对应的 `[Agent]` 条目（或选择 `[Chat assistant]` 条目以绑定对话助手）。
3. 点击确认；重新打开对话框即可看到当前绑定的目标。
4. 在企业微信中向机器人发送一条测试消息并验证回复。

</template>
</BiRow>

<BiRow>
<template #en>

### Thinking placeholder

</template>
<template #zh>

### 思考占位消息

</template>
</BiRow>

<BiRow>
<template #en>

To keep the end user informed while a completion is still running, the WeCom channel first sends a short `🤔 开始思考...` placeholder for every accepted, non-empty inbound message, and then sends a second message with the final answer once the Chat or Agent has produced a result. Blank messages are ignored, and if a completion produces no result, no final reply is sent. This applies to both Chat and custom Agent bindings.

</template>
<template #zh>

为了让最终用户在补全（completion）运行期间仍能了解进展，企业微信渠道会对每条接收成功且非空的入站消息先发送一条简短的 `🤔 开始思考...` 占位消息，待对话助手或 Agent 产出结果后，再发送第二条消息给出最终答案。空白消息会被忽略；若补全没有产出结果，则不发送最终回复。该行为同时适用于对话助手绑定和自定义 Agent 绑定。

</template>
</BiRow>

<BiRow>
<template #en>

The placeholder is only sent on the WeCom channel. The final reply is also cleaned up before it is sent: reasoning content (the `<think>` blocks produced by the model) is removed, so end users only see the final answer instead of the internal thinking process.

</template>
<template #zh>

该占位消息仅在企业微信渠道上发送。最终回复在发送前也会被清理：推理内容（模型生成的 `<think>` 块）会被移除，最终用户只能看到最终答案，看不到内部思考过程。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing configuration, send a test message to the bot in WeCom to verify whether replies are received normally.

</template>
<template #zh>

完成配置后，在企业微信中向机器人发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

## WhatsApp

</template>
<template #zh>

## WhatsApp

</template>
</BiRow>

<BiRow>
<template #en>

The WhatsApp channel connects an account through QR pairing. It is suitable for service scenarios that use WhatsApp to stay in contact with external users. This method does not require open platform keys to be filled in on the page.

</template>
<template #zh>

WhatsApp 渠道通过扫码配对连接账号，适用于需要用 WhatsApp 与外部用户保持联系的服务场景。这种方式无需在页面上填写开放平台密钥。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration prerequisites:

</template>
<template #zh>

配置前提：

</template>
</BiRow>

<BiRow>
<template #en>

- Prepare a WhatsApp account that can be connected.
- Confirm that the mobile WhatsApp app can scan QR codes.
- Confirm that the mobile app can access **Linked devices**.
- Confirm that the RAGFlow backend `WhatsAppGateway` is running normally.

</template>
<template #zh>

- 准备一个可以正常连接的 WhatsApp 账号。
- 确认手机上的 WhatsApp 应用可以扫描二维码。
- 确认手机应用可以访问 **关联设备（Linked devices）**。
- 确认 RAGFlow 后端的 `WhatsAppGateway` 正常运行。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The channel name displayed in RAGFlow, used to distinguish different WhatsApp connections.

</template>
<template #zh>

- **Name**：在 RAGFlow 中显示的渠道名称，用于区分不同的 WhatsApp 连接。

</template>
</BiRow>

<BiRow>
<template #en>

WhatsApp completes account connection through QR pairing. You do not need to fill in open platform keys on the page. After filling in the name and saving the channel, wait a few seconds until the page generates the QR code used for pairing.

</template>
<template #zh>

WhatsApp 通过扫码配对完成账号连接，你无需在页面上填写开放平台密钥。填好名称并保存渠道后，稍等几秒，页面会生成用于配对的二维码。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

用法：

</template>
</BiRow>

<BiRow>
<template #en>

When adding a WhatsApp channel, fill in the name first and save it. After saving, the page may first display prompt information. Wait a few seconds and use the mobile phone to scan the QR code after it is generated.

</template>
<template #zh>

添加 WhatsApp 渠道时，先填写名称并保存。保存后页面可能先显示提示信息，稍等几秒，待二维码生成后再用手机扫描。

</template>
</BiRow>

<BiRow>
<template #en>

Complete the scanning operation in the mobile WhatsApp app: go to settings, click **Linked devices**, select **Link a device**, and then scan the QR code on the RAGFlow page. After successful scanning, subsequent messages sent by users to this WhatsApp account enter RAGFlow.

</template>
<template #zh>

在手机的 WhatsApp 应用中完成扫码：进入设置，点击 **关联设备（Linked devices）**，选择 **关联设备（Link a device）**，然后扫描 RAGFlow 页面上的二维码。扫码成功后，用户后续发送给该 WhatsApp 账号的消息都会进入 RAGFlow。

</template>
</BiRow>

<BiRow>
<template #en>

WhatsApp depends on the `WhatsAppGateway` in the RAGFlow backend. By default, RAGFlow connects to the local gateway service and stores the login state in the gateway data directory. Ordinary users do not need to fill in these gateway parameters on the page. If the administrator has separately configured the gateway address, access token, or session directory for the deployment environment, use the runtime environment provided by the administrator.

</template>
<template #zh>

WhatsApp 依赖 RAGFlow 后端的 `WhatsAppGateway`。默认情况下，RAGFlow 连接本地网关服务，并将登录状态存储在网关数据目录中。普通用户无需在页面上填写这些网关参数；如果管理员已为部署环境单独配置了网关地址、访问令牌（access token）或会话目录，请使用管理员提供的运行时环境。

</template>
</BiRow>

<BiRow>
<template #en>

Connection verification:

</template>
<template #zh>

连接验证：

</template>
</BiRow>

<BiRow>
<template #en>

After completing QR scanning and connecting the channel to a Chat, use another WhatsApp account to send a test message to this account and verify whether replies are received normally.

</template>
<template #zh>

完成扫码并将渠道连接到某个对话助手后，用另一个 WhatsApp 账号向该账号发送一条测试消息，验证能否正常收到回复。

</template>
</BiRow>

<BiRow>
<template #en>

:::caution NOTE

After deleting a WhatsApp channel or clearing the gateway login state, you may need to scan the QR code again for pairing. If the QR code is not displayed for a long time, confirm that `WhatsAppGateway` has started and check network connectivity between the backend service and the gateway.

:::

</template>
<template #zh>

:::caution 注意

删除 WhatsApp 渠道或清除网关登录状态后，可能需要重新扫码配对。如果二维码长时间未显示，请确认 `WhatsAppGateway` 已启动，并检查后端服务与网关之间的网络连通性。

:::

</template>
</BiRow>
