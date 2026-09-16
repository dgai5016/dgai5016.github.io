<BiRow>
<template #en>

## The Channel Is Saved Successfully but Does Not Reply

</template>
<template #zh>

## 渠道保存成功但不回复

</template>
</BiRow>

<BiRow>
<template #en>

First confirm that the channel has been connected to a Chat. If it is not connected to a Chat, RAGFlow ignores external messages and does not generate replies.

</template>
<template #zh>

首先确认渠道已连接到某个对话助手。若未连接到对话助手，RAGFlow 会忽略外部消息，不会生成回复。

</template>
</BiRow>

<BiRow>
<template #en>

## The Bot Cannot Start

</template>
<template #zh>

## 机器人无法启动

</template>
</BiRow>

<BiRow>
<template #en>

Check whether the third-party platform credentials are correct, whether the bot has been enabled, and whether message event permissions have been granted. After credentials are modified, RAGFlow automatically restarts the corresponding channel connection.

</template>
<template #zh>

检查第三方平台凭证是否正确、机器人是否已启用、消息事件权限是否已授予。凭证修改后，RAGFlow 会自动重启相应的渠道连接。

</template>
</BiRow>

<BiRow>
<template #en>

## Messages Can Be Received but Replies Fail

</template>
<template #zh>

## 能收到消息但回复失败

</template>
</BiRow>

<BiRow>
<template #en>

Check whether the bot has permission to send messages, and confirm that the bound Chat can answer normally on the RAGFlow page. For `WeCom Webhook`, also confirm that `CorpID`, `AgentID`, and `Secret` can obtain `access_token` normally.

</template>
<template #zh>

检查机器人是否有发送消息的权限，并确认绑定的对话助手能在 RAGFlow 页面上正常回答。对于 `WeCom Webhook`，还要确认 `CorpID`、`AgentID` 和 `Secret` 能正常获取 `access_token`。

</template>
</BiRow>

<BiRow>
<template #en>

## The WhatsApp QR Code Is Not Displayed

</template>
<template #zh>

## WhatsApp 二维码不显示

</template>
</BiRow>

<BiRow>
<template #en>

First confirm that the channel has been saved, then wait a few seconds to see whether the page generates a QR code. If the QR code is still not displayed, confirm that `WhatsAppGateway` has started and that the RAGFlow backend can access the gateway service. If the login state has expired or been cleared, scan the QR code again for pairing.

</template>
<template #zh>

先确认渠道已保存，再等待几秒看页面是否生成二维码。若二维码仍未显示，请确认 `WhatsAppGateway` 已启动，且 RAGFlow 后端能访问网关服务。如果登录状态已过期或被清除，请重新扫码配对。

</template>
</BiRow>
