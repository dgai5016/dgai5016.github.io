<BiRow>
<template #en>

This chapter describes how to configure chat channels in RAGFlow, including supported platforms, the parameters required by each platform, the workflow for connecting a Chat, and connection verification methods.

</template>
<template #zh>

本章介绍如何在 RAGFlow 中配置对话渠道，包括支持的第三方平台、各平台所需的参数、连接 Chat 的流程以及连接验证方式。

</template>
</BiRow>

<BiRow>
<template #en>

With chat channels, users can chat with a Chat directly in chat applications such as Discord, Telegram, WeCom, and Feishu / Lark. User messages from third-party platforms enter RAGFlow, where the bound Chat generates replies and sends them back to the original chat window.

</template>
<template #zh>

通过对话渠道，用户可以直接在 Discord、Telegram、企业微信、飞书 / Lark 等聊天应用中与 Chat 对话。来自第三方平台的用户消息进入 RAGFlow 后，由绑定的 Chat 生成回复并发回原来的聊天窗口。

</template>
</BiRow>

<BiRow>
<template #en>

Chat channels are responsible only for platform access and message forwarding. Reply content, knowledge base scope, model capabilities, and answer quality are determined by the bound chat model.

</template>
<template #zh>

对话渠道只负责平台接入和消息转发。回复内容、知识库范围、模型能力和回答质量由绑定的对话模型决定。

</template>
</BiRow>

<BiRow>
<template #en>

**Supported channels**

</template>
<template #zh>

**支持的渠道**

</template>
</BiRow>

<BiRow>
<template #en>

| Chat channel | Access method | Requires an open platform or developer backend | Use case |
| --- | --- | --- | --- |
| Discord | `BotToken` | Yes | Suitable for Discord community support, product Q&A, and user feedback collection. |
| DingTalk | `ClientID` + `ClientSecret` | Yes | Suitable for knowledge Q&A, process consultation, and collaboration support within DingTalk organizations. |
| Feishu / Lark | `AppID` + `AppSecret` | Yes | Suitable for enterprise knowledge assistants and internal business Q&A in Feishu or Lark. |
| QQ Bot | `AppID` + `ClientSecret` | Yes | Suitable for QQ user services, community Q&A, and channel interactions. |
| Telegram | `BotToken` | Yes | Suitable for overseas user services, community operations, and real-time bot conversations. |
| WeCom | `Webhook` or `WebSocket` | Yes | Suitable for employee services, knowledge Q&A, and business bots in WeCom. |
| WhatsApp | QR pairing | No | Log in to a WhatsApp account by scanning a QR code and forward messages to a Chat. |

</template>
<template #zh>

| 对话渠道 | 接入方式 | 需要开放平台或开发者后台 | 使用场景 |
| --- | --- | --- | --- |
| Discord | `BotToken` | 是 | 适合 Discord 社区支持、产品问答和用户反馈收集。 |
| DingTalk | `ClientID` + `ClientSecret` | 是 | 适合钉钉组织内的知识问答、流程咨询和协作支持。 |
| Feishu / Lark | `AppID` + `AppSecret` | 是 | 适合飞书或 Lark 中的企业知识助手和内部业务问答。 |
| QQ Bot | `AppID` + `ClientSecret` | 是 | 适合 QQ 用户服务、社区问答和频道互动。 |
| Telegram | `BotToken` | 是 | 适合海外用户服务、社区运营和实时机器人对话。 |
| WeCom | `Webhook` 或 `WebSocket` | 是 | 适合企业微信内的员工服务、知识问答和业务机器人。 |
| WhatsApp | 扫码配对 | 否 | 扫描二维码登录 WhatsApp 账号，并把消息转发给 Chat。 |

</template>
</BiRow>

<BiRow>
<template #en>

**Enter the Chat Channels page**

</template>
<template #zh>

**进入对话渠道页面**

</template>
</BiRow>

<BiRow>
<template #en>

After logging in to RAGFlow, go to **User Settings** and click **Chat channels**. The upper part of the page displays added chat channels, and the lower part displays the channel types currently available to add.

</template>
<template #zh>

登录 RAGFlow 后，进入 **User Settings**，点击 **Chat channels**。页面上方显示已添加的对话渠道，下方显示当前可添加的渠道类型。

</template>
</BiRow>

<BiRow>
<template #en>

When using this feature for the first time, the page indicates that no chat channel has been added. You can select the platform you need from the **Available channels** area.

</template>
<template #zh>

首次使用该功能时，页面会提示尚未添加任何对话渠道。可以从 **Available channels** 区域选择所需平台。

</template>
</BiRow>

<BiRow>
<template #en>

![Enter the Chat Channels page](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/chat-channel-overview-enter-chat-channel-page.jpg)

</template>
<template #zh>

![进入对话渠道页面](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/chat-channel-overview-enter-chat-channel-page.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**General configuration and operation workflow**

</template>
<template #zh>

**通用配置与操作流程**

</template>
</BiRow>

<BiRow>
<template #en>

Before completing chat channel configuration, select the appropriate platform based on your actual use case, then create the channel and complete the connection configuration. After configuration, users can connect the chat channel to a Chat and interact with the bot through a third-party platform.

</template>
<template #zh>

完成对话渠道配置前，先根据实际使用场景选择合适的平台，然后创建渠道并完成连接配置。配置完成后，用户就可以把对话渠道连接到 Chat，并通过第三方平台与机器人交互。

</template>
</BiRow>

<BiRow>
<template #en>

Operation steps:

</template>
<template #zh>

操作步骤：

</template>
</BiRow>

<BiRow>
<template #en>

1. Enter the **Chat channels** page.
2. Select the platform you need from the **Available channels** area.
3. Create the channel and fill in its name.
4. Fill in the corresponding credentials or complete QR pairing based on the selected platform.
5. Save the channel configuration.
6. Connect the chat channel to a Chat.
7. Send a test message to the bot in the corresponding third-party platform.

</template>
<template #zh>

1. 进入 **Chat channels** 页面。
2. 在 **Available channels** 区域选择所需平台。
3. 创建渠道并填写名称。
4. 根据所选平台填写相应的凭证，或完成扫码配对。
5. 保存渠道配置。
6. 把对话渠道连接到 Chat。
7. 在对应的第三方平台上向机器人发送测试消息。

</template>
</BiRow>

<BiRow>
<template #en>

![General configuration and operation workflow](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/chat-channel-overview-general-configuration-and-workflow.jpg)

</template>
<template #zh>

![通用配置与操作流程](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/chat-channel-overview-general-configuration-and-workflow.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

For some platforms, after saving, it may take a few seconds before the page displays the connection status, QR code, or follow-up operation prompts. Follow the page prompts and do not repeatedly create channels before the QR code or status has been generated.

</template>
<template #zh>

部分平台在保存后，页面可能要过几秒钟才会显示连接状态、二维码或后续操作提示。请按页面提示操作，在二维码或状态生成之前不要反复创建渠道。

</template>
</BiRow>

<BiRow>
<template #en>

After adding a channel, you need to connect it to a Chat. If the channel is enabled but not connected to a Chat, RAGFlow can receive external messages but will not generate replies.

</template>
<template #zh>

添加渠道后，需要把它连接到 Chat。如果渠道已启用但没有连接 Chat，RAGFlow 能接收外部消息，但不会生成回复。

</template>
</BiRow>

<BiRow>
<template #en>

After you modify bot credentials or the channel type, RAGFlow automatically restarts the corresponding channel connection. If the credentials are incorrect, the channel may fail to start. Return to the third-party platform to confirm whether the bot status, permissions, and keys are valid.

</template>
<template #zh>

修改机器人凭证或渠道类型后，RAGFlow 会自动重启对应的渠道连接。如果凭证不正确，渠道可能启动失败。请回到第三方平台确认机器人状态、权限和密钥是否有效。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration result:

</template>
<template #zh>

配置结果：

</template>
</BiRow>

<BiRow>
<template #en>

After configuration is complete and the channel is connected to a Chat, the bot in the third-party platform becomes available. When a user sends a message in the corresponding chat application, the bot calls the bound Chat to generate an answer and returns the answer to the original chat window.

</template>
<template #zh>

配置完成并把渠道连接到 Chat 后，第三方平台上的机器人即可使用。用户在对应的聊天应用中发送消息时，机器人会调用绑定的 Chat 生成回答，并把回答返回到原来的聊天窗口。

</template>
</BiRow>

<BiRow>
<template #en>

After successful configuration, you can usually see the following results:

</template>
<template #zh>

配置成功后，通常可以看到以下结果：

</template>
</BiRow>

<BiRow>
<template #en>

- The bot is online or can be invoked normally in the corresponding platform.
- User messages can be received by RAGFlow.
- Answers generated by the Chat are returned to the same chat window.

</template>
<template #zh>

- 机器人在对应平台上在线，或可以正常调用。
- 用户消息能被 RAGFlow 接收。
- Chat 生成的回答会返回到同一个聊天窗口。

</template>
</BiRow>

<BiRow>
<template #en>

For example, after completing Discord channel configuration, users can send messages directly to the bot in Discord. The bot calls the bound Chat and returns replies. For the WhatsApp channel, after filling in the name and saving it, the page generates a QR code after a few seconds. After QR pairing is complete and the channel is connected to a Chat, other users who send messages to that WhatsApp account can receive Chat replies.

</template>
<template #zh>

例如，完成 Discord 渠道配置后，用户可以直接在 Discord 中给机器人发消息。机器人会调用绑定的 Chat 并返回回复。WhatsApp 渠道则是填写名称并保存后，页面过几秒生成二维码。扫码配对完成并把渠道连接到 Chat 后，其他用户给该 WhatsApp 账号发消息就能收到 Chat 的回复。

</template>
</BiRow>
