<BiRow>
<template #en>

> Learn how to implement secure authorization for MCP servers using OAuth 2.1 to protect sensitive resources and operations

</template>
<template #zh>

> 了解如何使用 OAuth 2.1 为 MCP 服务器实现安全的授权，以保护敏感资源与操作

</template>
</BiRow>

<BiRow>
<template #en>

Authorization in the Model Context Protocol (MCP) secures access to sensitive resources and operations exposed by MCP servers. If your MCP server handles user data or administrative actions, authorization ensures only permitted users can access its endpoints.

</template>
<template #zh>

模型上下文协议（Model Context Protocol，MCP）中的授权，保护的是对 MCP 服务器所暴露敏感资源和操作的访问。如果你的 MCP 服务器处理用户数据或管理操作，授权可以确保只有获准的用户才能访问其端点。

</template>
</BiRow>

<BiRow>
<template #en>

MCP uses standardized authorization flows to build trust between MCP clients and MCP servers. Its design doesn't focus on one specific authorization or identity system, but rather follows the conventions outlined for [OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13). For detailed information, see the [Authorization specification](https://modelcontextprotocol.io/specification/latest/basic/authorization).

</template>
<template #zh>

MCP 使用标准化的授权流程，在 MCP 客户端与 MCP 服务器之间建立信任。它的设计并不绑定某个特定的授权或身份系统，而是遵循 [OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13) 所概述的惯例。详细信息请参阅[授权规范](https://modelcontextprotocol.io/specification/latest/basic/authorization)。

</template>
</BiRow>

<BiRow>
<template #en>

## When Should You Use Authorization?

</template>
<template #zh>

## 何时应使用授权？

</template>
</BiRow>

<BiRow>
<template #en>

While authorization for MCP servers is **optional**, it is strongly recommended when:

</template>
<template #zh>

对 MCP 服务器来说，授权是**可选的**，但在以下情况中强烈建议启用：

</template>
</BiRow>

<BiRow>
<template #en>

* Your server accesses user-specific data (emails, documents, databases)
* You need to audit who performed which actions
* Your server grants access to its APIs that require user consent
* You're building for enterprise environments with strict access controls
* You want to implement rate limiting or usage tracking per user

</template>
<template #zh>

* 你的服务器访问用户特定的数据（邮件、文档、数据库）
* 你需要审计谁执行了哪些操作
* 你的服务器提供的 API 需要用户同意才能访问
* 你在为具有严格访问控制的企业环境构建应用
* 你想按用户实现限流或用量跟踪

</template>
</BiRow>

<BiRow>
<template #en>

> **提示：**
> **Authorization for Local MCP Servers**

</template>
<template #zh>

> **提示：**
> **本地 MCP 服务器的授权**

</template>
</BiRow>

<BiRow>
<template #en>

  For MCP servers using the [STDIO transport](https://modelcontextprotocol.io/specification/latest/basic/transports#stdio), you can use environment-based credentials or credentials provided by third-party libraries embedded directly in the MCP server instead. Because a STDIO-built MCP server runs locally, it has access to a range of flexible options when it comes to acquiring user credentials that may or may not rely on in-browser authentication and authorization flows.

</template>
<template #zh>

  对于使用 [STDIO 传输](https://modelcontextprotocol.io/specification/latest/basic/transports#stdio)（标准输入输出）的 MCP 服务器，可以改用基于环境变量的凭据，或由直接内嵌在 MCP 服务器中的第三方库提供的凭据。由于基于 STDIO 构建的 MCP 服务器在本地运行，它在获取用户凭据时有一系列灵活的选择，这些方式可以依赖、也可以不依赖浏览器内的认证与授权流程。

</template>
</BiRow>

<BiRow>
<template #en>

  OAuth flows, in turn, are designed for HTTP-based transports where the MCP server is remotely-hosted and the client uses OAuth to establish that a user is authorized to access said remote server.

</template>
<template #zh>

  而 OAuth 流程则是为基于 HTTP 的传输设计的：MCP 服务器托管在远程，客户端借助 OAuth 确认用户已获授权访问这台远程服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## The Authorization Flow: Step by Step

</template>
<template #zh>

## 授权流程：分步详解

</template>
</BiRow>

<BiRow>
<template #en>

Let's walk through what happens when a client wants to connect to your protected MCP server:

</template>
<template #zh>

我们来看一下，当客户端想要连接你受保护的 MCP 服务器时，会发生什么：

</template>
</BiRow>

<BiRow>
<template #en>

When your MCP client first tries to connect, your server responds with a `401 Unauthorized` and tells the client where to find authorization information, captured in a [Protected Resource Metadata (PRM) document](https://datatracker.ietf.org/doc/html/rfc9728). The document is hosted by the MCP server, follows a predictable path pattern, and is provided to the client in the `resource_metadata` parameter within the `WWW-Authenticate` header.

</template>
<template #zh>

当 MCP 客户端第一次尝试连接时，你的服务器会返回 `401 Unauthorized`，并告诉客户端到哪里获取授权信息——这些信息记录在[受保护资源元数据（Protected Resource Metadata，PRM）文档](https://datatracker.ietf.org/doc/html/rfc9728)里。该文档由 MCP 服务器托管，路径模式可预测，并通过 `WWW-Authenticate` 头中的 `resource_metadata` 参数提供给客户端。

</template>
</BiRow>

<BiRow>
<template #en>

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="mcp",
  resource_metadata="https://your-server.com/.well-known/oauth-protected-resource"
```

</template>
<template #zh>

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="mcp",
  resource_metadata="https://your-server.com/.well-known/oauth-protected-resource"
```

</template>
</BiRow>

<BiRow>
<template #en>

This tells the client that authorization is required for the MCP server and where to get the necessary information to kickstart the authorization flow.

</template>
<template #zh>

这是在告诉客户端：访问该 MCP 服务器需要授权，以及到哪里获取启动授权流程所需的信息。

</template>
</BiRow>

<BiRow>
<template #en>

With the URI pointer to the PRM document, the client will fetch the metadata to learn about the authorization server, supported scopes, and other resource information. The data is typically encapsulated in a JSON blob, similar to the one below.

</template>
<template #zh>

拿到指向 PRM 文档的 URI 后，客户端会获取这份元数据，了解授权服务器、支持的作用域（scope）以及其他资源信息。这些数据通常封装成一段 JSON，类似于下面这样：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "resource": "https://your-server.com/mcp",
  "authorization_servers": ["https://auth.your-server.com"],
  "scopes_supported": ["mcp:tools", "mcp:resources"]
}
```

</template>
<template #zh>

```json
{
  "resource": "https://your-server.com/mcp",
  "authorization_servers": ["https://auth.your-server.com"],
  "scopes_supported": ["mcp:tools", "mcp:resources"]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

You can see a more comprehensive example in [RFC 9728 Section 3.2](https://datatracker.ietf.org/doc/html/rfc9728#name-protected-resource-metadata-r).

</template>
<template #zh>

更完整的示例见 [RFC 9728 第 3.2 节](https://datatracker.ietf.org/doc/html/rfc9728#name-protected-resource-metadata-r)。

</template>
</BiRow>

<BiRow>
<template #en>

Next, the client discovers what the authorization server can do by fetching its metadata. If the PRM document lists more than one authorization server, the client can decide which one to use.

</template>
<template #zh>

接下来，客户端通过获取授权服务器的元数据，了解这台授权服务器能做什么。如果 PRM 文档列出的授权服务器不止一个，客户端可以自行决定用哪一个。

</template>
</BiRow>

<BiRow>
<template #en>

With an authorization server selected, the client will then construct a standard metadata URI and issue a request to the [OpenID Connect (OIDC) Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) or [OAuth 2.0 Auth Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414) endpoints (depending on authorization server support)
and retrieve another set of metadata properties that will allow it to know the endpoints it needs to complete the authorization flow.

</template>
<template #zh>

选定授权服务器后，客户端会构造一个标准的元数据 URI，向 [OpenID Connect（OIDC）Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html) 或 [OAuth 2.0 Auth Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414) 端点发出请求（视授权服务器的支持而定），
并取回另一组元数据属性，从中得知完成授权流程所需的各个端点。

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "issuer": "https://auth.your-server.com",
  "authorization_endpoint": "https://auth.your-server.com/authorize",
  "token_endpoint": "https://auth.your-server.com/token",
  "registration_endpoint": "https://auth.your-server.com/register"
}
```

</template>
<template #zh>

```json
{
  "issuer": "https://auth.your-server.com",
  "authorization_endpoint": "https://auth.your-server.com/authorize",
  "token_endpoint": "https://auth.your-server.com/token",
  "registration_endpoint": "https://auth.your-server.com/register"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

With all the metadata out of the way, the client now needs to make sure that it's registered with the authorization server. This can be done in two ways.

</template>
<template #zh>

元数据都就绪之后，客户端接下来要确保自己已经在授权服务器上注册。注册有两种方式。

</template>
</BiRow>

<BiRow>
<template #en>

First, the client can be **pre-registered** with a given authorization server, in which case it can have embedded client registration information that it uses to complete the authorization flow.

</template>
<template #zh>

其一，客户端可以在某个给定的授权服务器上**预注册（pre-registered）**，此时它可以内嵌客户端注册信息，并用这些信息完成授权流程。

</template>
</BiRow>

<BiRow>
<template #en>

Alternatively, the client can use **Dynamic Client Registration** (DCR) to dynamically register itself with the authorization server. The latter scenario requires the authorization server to support DCR. If the authorization server does support DCR, the client will send a request to the `registration_endpoint` with its information:

</template>
<template #zh>

其二，客户端可以使用**动态客户端注册（Dynamic Client Registration，DCR）**向授权服务器动态注册自身。后一种方式要求授权服务器支持 DCR。如果授权服务器确实支持 DCR，客户端就会向 `registration_endpoint` 发送一个携带自身信息的请求：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "client_name": "My MCP Client",
  "redirect_uris": ["http://localhost:3000/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

</template>
<template #zh>

```json
{
  "client_name": "My MCP Client",
  "redirect_uris": ["http://localhost:3000/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

If the registration succeeds, the authorization server will return a JSON blob with client registration information.

</template>
<template #zh>

注册成功后，授权服务器会返回一段包含客户端注册信息的 JSON。

</template>
</BiRow>

<BiRow>
<template #en>

> **提示：**
> **No DCR or Pre-Registration**

</template>
<template #zh>

> **提示：**
> **无 DCR 或预注册**

</template>
</BiRow>

<BiRow>
<template #en>

  In case an MCP client connects to an MCP server that doesn't use an authorization server that supports DCR and the client is not pre-registered with said authorization server, it's the responsibility of the client developer to provide an affordance for the end-user to enter client information manually.

</template>
<template #zh>

  如果 MCP 客户端连接的 MCP 服务器所使用的授权服务器不支持 DCR，而客户端又没有在该授权服务器上预注册，就需要由客户端开发者提供一种途径，让最终用户手动录入客户端信息。

</template>
</BiRow>

<BiRow>
<template #en>

The client will now need to open a browser to the `/authorize` endpoint, where the user can log in and grant the required permissions. The authorization server will then redirect back to the client with an authorization code that the client exchanges for tokens:

</template>
<template #zh>

现在，客户端需要打开浏览器访问 `/authorize` 端点，用户在这里登录并授予所需的权限。随后，授权服务器会带着授权码重定向回客户端，客户端再用授权码换取 token：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "refresh_token": "def502...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

</template>
<template #zh>

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "refresh_token": "def502...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

</template>
</BiRow>

<BiRow>
<template #en>

The access token is what the client will use to authenticate requests to the MCP server. This step follows standard [OAuth 2.1 authorization code with PKCE](https://oauth.net/2/grant-types/authorization-code/) conventions.

</template>
<template #zh>

客户端将用 access token 对发往 MCP 服务器的请求进行认证。这一步遵循 [OAuth 2.1 授权码 + PKCE](https://oauth.net/2/grant-types/authorization-code/) 的标准惯例。

</template>
</BiRow>

<BiRow>
<template #en>

Finally, the client can make requests to your MCP server using the access token embedded in the `Authorization` header:

</template>
<template #zh>

最后，客户端可以把 access token 放进 `Authorization` 头，向你的 MCP 服务器发起请求：

</template>
</BiRow>

<BiRow>
<template #en>

```http
GET /mcp HTTP/1.1
Host: your-server.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

</template>
<template #zh>

```http
GET /mcp HTTP/1.1
Host: your-server.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

</template>
</BiRow>

<BiRow>
<template #en>

The MCP server will need to validate the token and process the request if the token is valid and has the required permissions.

</template>
<template #zh>

MCP 服务器需要校验该 token；只有 token 有效且具备所需权限时，才会处理请求。

</template>
</BiRow>

<BiRow>
<template #en>

## Implementation Example

</template>
<template #zh>

## 实现示例

</template>
</BiRow>

<BiRow>
<template #en>

To get started with a practical implementation, we will use a [Keycloak](https://www.keycloak.org/) authorization server hosted in a Docker container. Keycloak is an open-source authorization server that can be easily deployed locally for testing and experimentation.

</template>
<template #zh>

要开始动手实现，我们将使用一个运行在 Docker 容器中的 [Keycloak](https://www.keycloak.org/) 授权服务器。Keycloak 是一个开源授权服务器，可以轻松部署在本地进行测试和实验。

</template>
</BiRow>

<BiRow>
<template #en>

Make sure that you download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). We will need it to deploy Keycloak on our development machine.

</template>
<template #zh>

请确保你已下载并安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。我们需要用它把 Keycloak 部署到开发机上。

</template>
</BiRow>

<BiRow>
<template #en>

### Keycloak Setup

</template>
<template #zh>

### Keycloak 配置

</template>
</BiRow>

<BiRow>
<template #en>

From your terminal application, run the following command to start the Keycloak container:

</template>
<template #zh>

在终端应用中运行以下命令来启动 Keycloak 容器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

</template>
<template #zh>

```bash
docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

</template>
</BiRow>

<BiRow>
<template #en>

This command will pull the Keycloak container image locally and bootstrap the basic configuration. It will run on port `8080` and have an `admin` user with `admin` password.

</template>
<template #zh>

这条命令会把 Keycloak 容器镜像拉取到本地，并引导完成基础配置。它将运行在 `8080` 端口，并有一个 `admin` 用户，密码为 `admin`。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Not for Production**

</template>
<template #zh>

> **注意：**
> **不可用于生产环境**

</template>
</BiRow>

<BiRow>
<template #en>

  The configuration above may be suitable for testing and experimentation; however, you should never use it in production. Refer to the [Configuring Keycloak for production](https://www.keycloak.org/server/configuration-production) guide for additional details on how to deploy the authorization server for scenarios that require reliability, security, and high availability.

</template>
<template #zh>

  上面的配置或许适合测试与实验，但绝不应在生产环境中使用。至于在要求可靠性、安全性与高可用的场景中如何部署授权服务器，请参阅[面向生产环境配置 Keycloak](https://www.keycloak.org/server/configuration-production) 指南了解详情。

</template>
</BiRow>

<BiRow>
<template #en>

You will be able to access the Keycloak authorization server from your browser at `http://localhost:8080`.

</template>
<template #zh>

你可以在浏览器中通过 `http://localhost:8080` 访问 Keycloak 授权服务器。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-browser.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=cba689d986e113cbe937d732ac0558b6" alt="Keycloak admin dashboard authentication dialog." width="1834" height="1450" data-path="images/tutorial-authorization/keycloak-browser.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-browser.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=cba689d986e113cbe937d732ac0558b6" alt="Keycloak admin dashboard authentication dialog." width="1834" height="1450" data-path="images/tutorial-authorization/keycloak-browser.png" />

</template>
</BiRow>

<BiRow>
<template #en>

When running with the default configuration, Keycloak will already support many of the capabilities that we need for MCP servers, including Dynamic Client Registration. You can check this by looking at the OIDC configuration, available at:

</template>
<template #zh>

按照默认配置运行时，Keycloak 已经支持 MCP 服务器所需的许多能力，包括动态客户端注册。你可以查看 OIDC 配置来确认这一点，配置地址为：

</template>
</BiRow>

<BiRow>
<template #en>

```http
http://localhost:8080/realms/master/.well-known/openid-configuration
```

</template>
<template #zh>

```http
http://localhost:8080/realms/master/.well-known/openid-configuration
```

</template>
</BiRow>

<BiRow>
<template #en>

We will also need to set up Keycloak to support our scopes and allow our host (local machine) to dynamically register clients, as the default policies restrict anonymous dynamic client registration.

</template>
<template #zh>

我们还需要对 Keycloak 进行设置，让它支持我们的作用域，并允许我们的主机（本地机器）动态注册客户端，因为默认策略会限制匿名的动态客户端注册。

</template>
</BiRow>

<BiRow>
<template #en>

Go to **Client scopes** in the Keycloak dashboard and create a new `mcp:tools` scope. We will use this to access all of the tools on our MCP server.

</template>
<template #zh>

在 Keycloak 管理控制台中进入 **Client scopes**（客户端作用域），新建一个 `mcp:tools` 作用域。我们将用它来访问 MCP 服务器上的所有工具。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-scopes.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=3cd49dc2e070027609ae495751e0db58" alt="Configuring Keycloak scopes." width="1999" height="1710" data-path="images/tutorial-authorization/keycloak-scopes.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-scopes.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=3cd49dc2e070027609ae495751e0db58" alt="Configuring Keycloak scopes." width="1999" height="1710" data-path="images/tutorial-authorization/keycloak-scopes.png" />

</template>
</BiRow>

<BiRow>
<template #en>

After creating the scope, make sure that you assign its type to **Default** and have flipped the **Include in token scope** switch, as this will be needed for token validation.

</template>
<template #zh>

创建作用域后，请确保把它的类型设为 **Default**（默认），并打开 **Include in token scope**（包含在 token 作用域中）开关，因为后面的 token 校验会用到这一点。

</template>
</BiRow>

<BiRow>
<template #en>

Let's now also set up an **audience** for our Keycloak-issued tokens. An audience is important to configure because it embeds the intended destination directly into the issued access token. This helps your MCP server to verify that the token it got was actually meant for it rather than some other API. This is key to help avoid token passthrough scenarios.

</template>
<template #zh>

接下来，我们还要为 Keycloak 签发的 token 配置**受众（audience）**。受众配置很重要，因为它会把预期的目的地直接嵌入签发出的 access token。这能帮助你的 MCP 服务器确认：它拿到的 token 确实是签发给自己的，而不是给其他某个 API 的。这也是避免令牌透传（token passthrough）场景的关键一环。

</template>
</BiRow>

<BiRow>
<template #en>

To do this, open your `mcp:tools` client scope and click on **Mappers**, followed by **Configure a new mapper**. Select **Audience**.

</template>
<template #zh>

为此，打开你的 `mcp:tools` 客户端作用域，点击 **Mappers**（映射器），再点击 **Configure a new mapper**（配置新映射器），然后选择 **Audience**（受众）。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/scope-add-audience.gif?s=6ea9cf20c397f4c79c491c2e39019272" alt="Configuring an audience for a token in Keycloak." width="1080" height="921" data-path="images/tutorial-authorization/scope-add-audience.gif" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/scope-add-audience.gif?s=6ea9cf20c397f4c79c491c2e39019272" alt="Configuring an audience for a token in Keycloak." width="1080" height="921" data-path="images/tutorial-authorization/scope-add-audience.gif" />

</template>
</BiRow>

<BiRow>
<template #en>

For **Name**, use `audience-config`. Add a value for **Included Custom Audience**, set to `http://localhost:3000`. This will be the URI of our test server.

</template>
<template #zh>

**Name**（名称）填 `audience-config`。为 **Included Custom Audience**（包含的自定义受众）添加一个值，设为 `http://localhost:3000`。这将是我们测试服务器的 URI。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Not for Production**

</template>
<template #zh>

> **注意：**
> **不可用于生产环境**

</template>
</BiRow>

<BiRow>
<template #en>

  The audience configuration above is meant for testing. For production scenarios, additional set-up and configuration will be required to ensure that audiences are properly constrained for issued tokens. Specifically, the audience needs to be based on the resource parameter passed from the client, not a fixed value.

</template>
<template #zh>

  上面的受众配置仅用于测试。在生产场景中，还需要额外的设置与配置，以确保为签发的 token 正确限定受众。具体来说，受众需要基于客户端传来的 resource 参数，而不是一个固定值。

</template>
</BiRow>

<BiRow>
<template #en>

Now, navigate to **Clients**, then **Client registration**, and then **Trusted Hosts**. Disable the **Client URIs Must Match** setting and add the hosts from which you're testing. You can get your current host IP by running the `ifconfig` command on Linux or macOS, or `ipconfig` on Windows. You can see the IP address you need to add by looking at the keycloak logs for a line that looks like `Failed to verify remote host : 192.168.215.1`. Check that the IP address is associated with your host. This may be for a bridge network depending on your docker setup.

</template>
<template #zh>

现在，依次进入 **Clients**（客户端）、**Client registration**（客户端注册）和 **Trusted Hosts**（可信主机）。禁用 **Client URIs Must Match**（客户端 URI 必须匹配）设置，并添加你发起测试所在的主机。在 Linux 或 macOS 上运行 `ifconfig` 命令、在 Windows 上运行 `ipconfig`，即可获取当前主机的 IP。查看 Keycloak 日志中形如 `Failed to verify remote host : 192.168.215.1` 的一行，就能看到需要添加的 IP 地址。请核对该 IP 地址确实关联到你的主机。视你的 Docker 配置而定，它可能属于某个桥接网络。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-client.gif?s=b5d40b36a5f1ea1e818821bb8ea77f6b" alt="Setting up client registration details in Keycloak." width="1199" height="1027" data-path="images/tutorial-authorization/keycloak-client.gif" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-client.gif?s=b5d40b36a5f1ea1e818821bb8ea77f6b" alt="Setting up client registration details in Keycloak." width="1199" height="1027" data-path="images/tutorial-authorization/keycloak-client.gif" />

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Getting the Host**

</template>
<template #zh>

> **注意：**
> **获取主机地址**

</template>
</BiRow>

<BiRow>
<template #en>

  If you are running Keycloak from a container, you will also be able to see the host IP from the Terminal in the container logs.

</template>
<template #zh>

  如果你是在容器中运行 Keycloak，也可以在终端里查看容器日志，从中看到主机 IP。

</template>
</BiRow>

<BiRow>
<template #en>

Lastly, we need to register a new client that we can use with the **MCP server itself** to talk to Keycloak for things like [token introspection](https://oauth.net/2/token-introspection/). To do that:

</template>
<template #zh>

最后，我们需要注册一个新的客户端，供 **MCP 服务器本身**与 Keycloak 通信之用，例如执行 [token 内省](https://oauth.net/2/token-introspection/)（token introspection）等操作。具体步骤：

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to **Clients**.
2. Click **Create client**.
3. Give your client a unique **Client ID** and click **Next**.
4. Enable **Client authentication** and click **Next**.
5. Click **Save**.

</template>
<template #zh>

1. 进入 **Clients**（客户端）。
2. 点击 **Create client**（创建客户端）。
3. 为客户端提供一个唯一的 **Client ID**（客户端 ID），然后点击 **Next**（下一步）。
4. 启用 **Client authentication**（客户端认证），然后点击 **Next**（下一步）。
5. 点击 **Save**（保存）。

</template>
</BiRow>

<BiRow>
<template #en>

Worth noting that token introspection is just *one of* the available approaches to validate tokens. This can also be done with the help of standalone libraries, specific to each language and platform.

</template>
<template #zh>

值得一提的是，token 内省只是校验 token 的可用方法*之一*。这也可以借助各语言和平台专属的独立库来完成。

</template>
</BiRow>

<BiRow>
<template #en>

When you open the client details, go to **Credentials** and take note of the **Client Secret**.

</template>
<template #zh>

打开该客户端的详情后，进入 **Credentials**（凭据）并记下 **Client Secret**（客户端密钥）。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-client-auth.gif?s=7152c41a5746994fd399024bc4659e40" alt="Creating a new client in Keycloak." width="1200" height="1023" data-path="images/tutorial-authorization/keycloak-client-auth.gif" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-client-auth.gif?s=7152c41a5746994fd399024bc4659e40" alt="Creating a new client in Keycloak." width="1200" height="1023" data-path="images/tutorial-authorization/keycloak-client-auth.gif" />

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Handling Secrets**

</template>
<template #zh>

> **注意：**
> **机密信息的处理**

</template>
</BiRow>

<BiRow>
<template #en>

  Never embed client credentials directly in your code. We recommend using environment variables or specialized solutions for secret storage.

</template>
<template #zh>

  绝不要把客户端凭据直接嵌入你的代码。我们建议使用环境变量或专门的密钥存储方案。

</template>
</BiRow>

<BiRow>
<template #en>

With Keycloak configured, every time the authorization flow is triggered, your MCP server will receive a token like this:

</template>
<template #zh>

Keycloak 配置完成后，每次触发授权流程时，你的 MCP 服务器都会收到一个如下所示的 token：

</template>
</BiRow>

<BiRow>
<template #en>

```text
eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1TjcxMGw1WW5MWk13WGZ1VlJKWGtCS3ZZMzZzb3JnRG5scmlyZ2tlTHlzIn0.eyJleHAiOjE3NTU1NDA4MTcsImlhdCI6MTc1NTU0MDc1NywiYXV0aF90aW1lIjoxNzU1NTM4ODg4LCJqdGkiOiJvbnJ0YWM6YjM0MDgwZmYtODQwNC02ODY3LTgxYmUtMTIzMWI1MDU5M2E4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJzdWIiOiIzM2VkNmM2Yi1jNmUwLTQ5MjgtYTE2MS1mMmY2OWM3YTAzYjkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI3OTc1YTViNi04YjU5LTRhODUtOWNiYS04ZmFlYmRhYjg5NzQiLCJzaWQiOiI4ZjdlYzI3Ni0zNThmLTRjY2MtYjMxMy1kYjA4MjkwZjM3NmYiLCJzY29wZSI6Im1jcDp0b29scyJ9.P5xCRtXORly0R0EXjyqRCUx-z3J4uAOWNAvYtLPXroykZuVCCJ-K1haiQSwbURqfsVOMbL7jiV-sD6miuPzI1tmKOkN_Yct0Vp-azvj7U5rEj7U6tvPfMkg2Uj_jrIX0KOskyU2pVvGZ-5BgqaSvwTEdsGu_V3_E0xDuSBq2uj_wmhqiyTFm5lJ1WkM3Hnxxx1_AAnTj7iOKMFZ4VCwMmk8hhSC7clnDauORc0sutxiJuYUZzxNiNPkmNeQtMCGqWdP1igcbWbrfnNXhJ6NswBOuRbh97_QraET3hl-CNmyS6C72Xc0aOwR_uJ7xVSBTD02OaQ1JA6kjCATz30kGYg
```

</template>
<template #zh>

```text
eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1TjcxMGw1WW5MWk13WGZ1VlJKWGtCS3ZZMzZzb3JnRG5scmlyZ2tlTHlzIn0.eyJleHAiOjE3NTU1NDA4MTcsImlhdCI6MTc1NTU0MDc1NywiYXV0aF90aW1lIjoxNzU1NTM4ODg4LCJqdGkiOiJvbnJ0YWM6YjM0MDgwZmYtODQwNC02ODY3LTgxYmUtMTIzMWI1MDU5M2E4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJzdWIiOiIzM2VkNmM2Yi1jNmUwLTQ5MjgtYTE2MS1mMmY2OWM3YTAzYjkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiI3OTc1YTViNi04YjU5LTRhODUtOWNiYS04ZmFlYmRhYjg5NzQiLCJzaWQiOiI4ZjdlYzI3Ni0zNThmLTRjY2MtYjMxMy1kYjA4MjkwZjM3NmYiLCJzY29wZSI6Im1jcDp0b29scyJ9.P5xCRtXORly0R0EXjyqRCUx-z3J4uAOWNAvYtLPXroykZuVCCJ-K1haiQSwbURqfsVOMbL7jiV-sD6miuPzI1tmKOkN_Yct0Vp-azvj7U5rEj7U6tvPfMkg2Uj_jrIX0KOskyU2pVvGZ-5BgqaSvwTEdsGu_V3_E0xDuSBq2uj_wmhqiyTFm5lJ1WkM3Hnxxx1_AAnTj7iOKMFZ4VCwMmk8hhSC7clnDauORc0sutxiJuYUZzxNiNPkmNeQtMCGqWdP1igcbWbrfnNXhJ6NswBOuRbh97_QraET3hl-CNmyS6C72Xc0aOwR_uJ7xVSBTD02OaQ1JA6kjCATz30kGYg
```

</template>
</BiRow>

<BiRow>
<template #en>

Decoded, it will look like this:

</template>
<template #zh>

解码后的内容如下：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "5N710l5YnLZMwXfuVRJXkBKvY36sorgDnlrirgkeLys"
}.{
  "exp": 1755540817,
  "iat": 1755540757,
  "auth_time": 1755538888,
  "jti": "onrtac:b34080ff-8404-6867-81be-1231b50593a8",
  "iss": "http://localhost:8080/realms/master",
  "aud": "http://localhost:3000",
  "sub": "33ed6c6b-c6e0-4928-a161-f2f69c7a03b9",
  "typ": "Bearer",
  "azp": "7975a5b6-8b59-4a85-9cba-8faebdab8974",
  "sid": "8f7ec276-358f-4ccc-b313-db08290f376f",
  "scope": "mcp:tools"
}.[Signature]
```

</template>
<template #zh>

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "5N710l5YnLZMwXfuVRJXkBKvY36sorgDnlrirgkeLys"
}.{
  "exp": 1755540817,
  "iat": 1755540757,
  "auth_time": 1755538888,
  "jti": "onrtac:b34080ff-8404-6867-81be-1231b50593a8",
  "iss": "http://localhost:8080/realms/master",
  "aud": "http://localhost:3000",
  "sub": "33ed6c6b-c6e0-4928-a161-f2f69c7a03b9",
  "typ": "Bearer",
  "azp": "7975a5b6-8b59-4a85-9cba-8faebdab8974",
  "sid": "8f7ec276-358f-4ccc-b313-db08290f376f",
  "scope": "mcp:tools"
}.[Signature]
```

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **Embedded Audience**

</template>
<template #zh>

> **注意：**
> **内嵌的受众**

</template>
</BiRow>

<BiRow>
<template #en>

  Notice the `aud` claim embedded in the token - it's currently set to be the URI of the test MCP server and it's inferred from the scope that we've previously configured. This will be important in our implementation to validate.

</template>
<template #zh>

  注意 token 中内嵌的 `aud` 声明（claim）——它目前被设为测试 MCP 服务器的 URI，由我们之前配置的作用域推导而来。在后面的实现中，这一项校验非常重要。

</template>
</BiRow>

<BiRow>
<template #en>

### MCP Server Setup

</template>
<template #zh>

### MCP 服务器搭建

</template>
</BiRow>

<BiRow>
<template #en>

We will now set up our MCP server to use the locally-running Keycloak authorization server. Depending on your programming language preference, you can use one of the supported [MCP SDKs](https://modelcontextprotocol.io/docs/2026-07-28/sdk).

</template>
<template #zh>

现在，我们将搭建自己的 MCP 服务器来使用本地运行的 Keycloak 授权服务器。你可以根据偏好的编程语言，选用受支持的 [MCP SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk) 之一。

</template>
</BiRow>

<BiRow>
<template #en>

For our testing purposes, we will create an extremely simple MCP server that exposes two tools - one for addition and another for multiplication. The server will require authorization to access these.

</template>
<template #zh>

出于测试目的，我们将创建一个极其简单的 MCP 服务器，它暴露两个工具——一个做加法，一个做乘法。访问这些工具需要授权。

</template>
</BiRow>

<BiRow>
<template #en>

You can see the complete TypeScript project in the [sample repository](https://github.com/localden/min-ts-mcp-auth).

</template>
<template #zh>

完整的 TypeScript 项目见[示例仓库](https://github.com/localden/min-ts-mcp-auth)。

</template>
</BiRow>

<BiRow>
<template #en>

Prior to running the code below, ensure that you have a `.env` file with the following content:

</template>
<template #zh>

在运行下面的代码之前，请确保你有一个包含以下内容的 `.env` 文件：

</template>
</BiRow>

<BiRow>
<template #en>

```env
# Server host/port
HOST=localhost
PORT=3000

# Auth server location
AUTH_HOST=localhost
AUTH_PORT=8080
AUTH_REALM=master

# Keycloak OAuth client credentials
OAUTH_CLIENT_ID=<YOUR_SERVER_CLIENT_ID>
OAUTH_CLIENT_SECRET=<YOUR_SERVER_CLIENT_SECRET>
```

</template>
<template #zh>

```env
# Server host/port
HOST=localhost
PORT=3000

# Auth server location
AUTH_HOST=localhost
AUTH_PORT=8080
AUTH_REALM=master

# Keycloak OAuth client credentials
OAUTH_CLIENT_ID=<YOUR_SERVER_CLIENT_ID>
OAUTH_CLIENT_SECRET=<YOUR_SERVER_CLIENT_SECRET>
```

</template>
</BiRow>

<BiRow>
<template #en>

`OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` are associated with the MCP server client we created earlier.

</template>
<template #zh>

`OAUTH_CLIENT_ID` 和 `OAUTH_CLIENT_SECRET` 对应我们之前创建的那个 MCP 服务器客户端。

</template>
</BiRow>

<BiRow>
<template #en>

In addition to implementing the MCP authorization specification, the server below also does token introspection via Keycloak to make sure that the token it receives from the client is valid. It also implements basic logging to allow you to easily diagnose any issues.

</template>
<template #zh>

除了实现 MCP 授权规范之外，下面的服务器还会通过 Keycloak 执行 token 内省，以确保从客户端收到的 token 是有效的。它还实现了基本的日志记录，方便你诊断任何问题。

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import cors from "cors";
import {
  mcpAuthMetadataRouter,
  getOAuthProtectedResourceMetadataUrl,
} from "@modelcontextprotocol/sdk/server/auth/router.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";
import { OAuthMetadata } from "@modelcontextprotocol/sdk/shared/auth.js";
import { checkResourceAllowed } from "@modelcontextprotocol/sdk/shared/auth-utils.js";
const CONFIG = {
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 3000,
  auth: {
    host: process.env.AUTH_HOST || process.env.HOST || "localhost",
    port: Number(process.env.AUTH_PORT) || 8080,
    realm: process.env.AUTH_REALM || "master",
    clientId: process.env.OAUTH_CLIENT_ID || "mcp-server",
    clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
  },
};

function createOAuthUrls() {
  const authBaseUrl = new URL(
    `http://${CONFIG.auth.host}:${CONFIG.auth.port}/realms/${CONFIG.auth.realm}/`,
  );
  return {
    issuer: authBaseUrl.toString(),
    introspection_endpoint: new URL(
      "protocol/openid-connect/token/introspect",
      authBaseUrl,
    ).toString(),
    authorization_endpoint: new URL(
      "protocol/openid-connect/auth",
      authBaseUrl,
    ).toString(),
    token_endpoint: new URL(
      "protocol/openid-connect/token",
      authBaseUrl,
    ).toString(),
  };
}

function createRequestLogger() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    res.on("finish", () => {
      const ms = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`,
      );
    });
    next();
  };
}

const app = express();

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf?.toString() ?? "";
    },
  }),
);

app.use(
  cors({
    origin: "*",
    exposedHeaders: ["Mcp-Session-Id"],
  }),
);

app.use(createRequestLogger());

const mcpServerUrl = new URL(`http://${CONFIG.host}:${CONFIG.port}`);
const oauthUrls = createOAuthUrls();

const oauthMetadata: OAuthMetadata = {
  ...oauthUrls,
  response_types_supported: ["code"],
};

const tokenVerifier = {
  verifyAccessToken: async (token: string) => {
    const endpoint = oauthMetadata.introspection_endpoint;

    if (!endpoint) {
      console.error("[auth] no introspection endpoint in metadata");
      throw new Error("No token verification endpoint available in metadata");
    }

    const params = new URLSearchParams({
      token: token,
      client_id: CONFIG.auth.clientId,
    });

    if (CONFIG.auth.clientSecret) {
      params.set("client_secret", CONFIG.auth.clientSecret);
    }

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
    } catch (e) {
      console.error("[auth] introspection fetch threw", e);
      throw e;
    }

    if (!response.ok) {
      const txt = await response.text();
      console.error("[auth] introspection non-OK", { status: response.status });

      try {
        const obj = JSON.parse(txt);
        console.log(JSON.stringify(obj, null, 2));
      } catch {
        console.error(txt);
      }
      throw new Error(`Invalid or expired token: ${txt}`);
    }

    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      const txt = await response.text();
      console.error("[auth] failed to parse introspection JSON", {
        error: String(e),
        body: txt,
      });
      throw e;
    }

    if (data.active === false) {
      throw new Error("Inactive token");
    }

    if (!data.aud) {
      throw new Error("Resource indicator (aud) missing");
    }

    const audiences: string[] = Array.isArray(data.aud) ? data.aud : [data.aud];
    const allowed = audiences.some((a) => {
      try {
        return checkResourceAllowed({
          requestedResource: a,
          configuredResource: mcpServerUrl,
        });
      } catch {
        // Keycloak tokens include non-URL audiences (e.g. "account", "test-client").
        // Those are never our resource, so treat them as "no match" instead of crashing.
        return false;
      }
    });
    if (!allowed) {
      throw new Error(
        `None of the provided audiences are allowed. Expected ${mcpServerUrl}, got: ${audiences.join(", ")}`,
      );
    }

    return {
      token,
      clientId: data.client_id,
      scopes: data.scope ? data.scope.split(" ") : [],
      expiresAt: data.exp,
    };
  },
};
app.use(
  mcpAuthMetadataRouter({
    oauthMetadata,
    resourceServerUrl: mcpServerUrl,
    scopesSupported: ["mcp:tools"],
    resourceName: "MCP Demo Server",
  }),
);

const authMiddleware = requireBearerAuth({
  verifier: tokenVerifier,
  requiredScopes: [],
  resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(mcpServerUrl),
});

const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

function createMcpServer() {
  const server = new McpServer({
    name: "example-server",
    version: "1.0.0",
  });

  server.registerTool(
    "add",
    {
      title: "Addition Tool",
      description: "Add two numbers together",
      inputSchema: {
        a: z.number().describe("First number to add"),
        b: z.number().describe("Second number to add"),
      },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
    }),
  );

  server.registerTool(
    "multiply",
    {
      title: "Multiplication Tool",
      description: "Multiply two numbers together",
      inputSchema: {
        x: z.number().describe("First number to multiply"),
        y: z.number().describe("Second number to multiply"),
      },
    },
    async ({ x, y }) => ({
      content: [{ type: "text", text: `${x} × ${y} = ${x * y}` }],
    }),
  );

  return server;
}

const mcpPostHandler = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        transports[sessionId] = transport;
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };

    const server = createMcpServer();
    await server.connect(transport);
  } else {
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
};

const handleSessionRequest = async (
  req: express.Request,
  res: express.Response,
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

app.post("/", authMiddleware, mcpPostHandler);
app.get("/", authMiddleware, handleSessionRequest);
app.delete("/", authMiddleware, handleSessionRequest);

app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`🚀 MCP Server running on ${mcpServerUrl.origin}`);
  console.log(`📡 MCP endpoint available at ${mcpServerUrl.origin}`);
  console.log(
    `🔐 OAuth metadata available at ${getOAuthProtectedResourceMetadataUrl(mcpServerUrl)}`,
  );
});
```

</template>
<template #zh>

```typescript
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import cors from "cors";
import {
  mcpAuthMetadataRouter,
  getOAuthProtectedResourceMetadataUrl,
} from "@modelcontextprotocol/sdk/server/auth/router.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";
import { OAuthMetadata } from "@modelcontextprotocol/sdk/shared/auth.js";
import { checkResourceAllowed } from "@modelcontextprotocol/sdk/shared/auth-utils.js";
const CONFIG = {
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 3000,
  auth: {
    host: process.env.AUTH_HOST || process.env.HOST || "localhost",
    port: Number(process.env.AUTH_PORT) || 8080,
    realm: process.env.AUTH_REALM || "master",
    clientId: process.env.OAUTH_CLIENT_ID || "mcp-server",
    clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
  },
};

function createOAuthUrls() {
  const authBaseUrl = new URL(
    `http://${CONFIG.auth.host}:${CONFIG.auth.port}/realms/${CONFIG.auth.realm}/`,
  );
  return {
    issuer: authBaseUrl.toString(),
    introspection_endpoint: new URL(
      "protocol/openid-connect/token/introspect",
      authBaseUrl,
    ).toString(),
    authorization_endpoint: new URL(
      "protocol/openid-connect/auth",
      authBaseUrl,
    ).toString(),
    token_endpoint: new URL(
      "protocol/openid-connect/token",
      authBaseUrl,
    ).toString(),
  };
}

function createRequestLogger() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    res.on("finish", () => {
      const ms = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`,
      );
    });
    next();
  };
}

const app = express();

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf?.toString() ?? "";
    },
  }),
);

app.use(
  cors({
    origin: "*",
    exposedHeaders: ["Mcp-Session-Id"],
  }),
);

app.use(createRequestLogger());

const mcpServerUrl = new URL(`http://${CONFIG.host}:${CONFIG.port}`);
const oauthUrls = createOAuthUrls();

const oauthMetadata: OAuthMetadata = {
  ...oauthUrls,
  response_types_supported: ["code"],
};

const tokenVerifier = {
  verifyAccessToken: async (token: string) => {
    const endpoint = oauthMetadata.introspection_endpoint;

    if (!endpoint) {
      console.error("[auth] no introspection endpoint in metadata");
      throw new Error("No token verification endpoint available in metadata");
    }

    const params = new URLSearchParams({
      token: token,
      client_id: CONFIG.auth.clientId,
    });

    if (CONFIG.auth.clientSecret) {
      params.set("client_secret", CONFIG.auth.clientSecret);
    }

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
    } catch (e) {
      console.error("[auth] introspection fetch threw", e);
      throw e;
    }

    if (!response.ok) {
      const txt = await response.text();
      console.error("[auth] introspection non-OK", { status: response.status });

      try {
        const obj = JSON.parse(txt);
        console.log(JSON.stringify(obj, null, 2));
      } catch {
        console.error(txt);
      }
      throw new Error(`Invalid or expired token: ${txt}`);
    }

    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      const txt = await response.text();
      console.error("[auth] failed to parse introspection JSON", {
        error: String(e),
        body: txt,
      });
      throw e;
    }

    if (data.active === false) {
      throw new Error("Inactive token");
    }

    if (!data.aud) {
      throw new Error("Resource indicator (aud) missing");
    }

    const audiences: string[] = Array.isArray(data.aud) ? data.aud : [data.aud];
    const allowed = audiences.some((a) => {
      try {
        return checkResourceAllowed({
          requestedResource: a,
          configuredResource: mcpServerUrl,
        });
      } catch {
        // Keycloak tokens include non-URL audiences (e.g. "account", "test-client").
        // Those are never our resource, so treat them as "no match" instead of crashing.
        return false;
      }
    });
    if (!allowed) {
      throw new Error(
        `None of the provided audiences are allowed. Expected ${mcpServerUrl}, got: ${audiences.join(", ")}`,
      );
    }

    return {
      token,
      clientId: data.client_id,
      scopes: data.scope ? data.scope.split(" ") : [],
      expiresAt: data.exp,
    };
  },
};
app.use(
  mcpAuthMetadataRouter({
    oauthMetadata,
    resourceServerUrl: mcpServerUrl,
    scopesSupported: ["mcp:tools"],
    resourceName: "MCP Demo Server",
  }),
);

const authMiddleware = requireBearerAuth({
  verifier: tokenVerifier,
  requiredScopes: [],
  resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(mcpServerUrl),
});

const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

function createMcpServer() {
  const server = new McpServer({
    name: "example-server",
    version: "1.0.0",
  });

  server.registerTool(
    "add",
    {
      title: "Addition Tool",
      description: "Add two numbers together",
      inputSchema: {
        a: z.number().describe("First number to add"),
        b: z.number().describe("Second number to add"),
      },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
    }),
  );

  server.registerTool(
    "multiply",
    {
      title: "Multiplication Tool",
      description: "Multiply two numbers together",
      inputSchema: {
        x: z.number().describe("First number to multiply"),
        y: z.number().describe("Second number to multiply"),
      },
    },
    async ({ x, y }) => ({
      content: [{ type: "text", text: `${x} × ${y} = ${x * y}` }],
    }),
  );

  return server;
}

const mcpPostHandler = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sessionId) => {
        transports[sessionId] = transport;
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports[transport.sessionId];
      }
    };

    const server = createMcpServer();
    await server.connect(transport);
  } else {
    res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
    });
    return;
  }

  await transport.handleRequest(req, res, req.body);
};

const handleSessionRequest = async (
  req: express.Request,
  res: express.Response,
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
};

app.post("/", authMiddleware, mcpPostHandler);
app.get("/", authMiddleware, handleSessionRequest);
app.delete("/", authMiddleware, handleSessionRequest);

app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`🚀 MCP Server running on ${mcpServerUrl.origin}`);
  console.log(`📡 MCP endpoint available at ${mcpServerUrl.origin}`);
  console.log(
    `🔐 OAuth metadata available at ${getOAuthProtectedResourceMetadataUrl(mcpServerUrl)}`,
  );
});
```

</template>
</BiRow>

<BiRow>
<template #en>

When you run the server, you can add it to your MCP client, such as Visual Studio Code, by providing the MCP server endpoint.

</template>
<template #zh>

服务器运行后，在 MCP 客户端（例如 Visual Studio Code）中填入 MCP 服务器端点，即可把它添加进去。

</template>
</BiRow>

<BiRow>
<template #en>

For more details about implementing MCP servers in TypeScript, refer to the [TypeScript SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk).

</template>
<template #zh>

有关用 TypeScript 实现 MCP 服务器的更多细节，请参阅 [TypeScript SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk)。

</template>
</BiRow>

<BiRow>
<template #en>

You can see the complete Python project in the [sample repository](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples/servers/simple-auth).

</template>
<template #zh>

完整的 Python 项目见[示例仓库](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples/servers/simple-auth)。

</template>
</BiRow>

<BiRow>
<template #en>

To simplify our authorization interaction, in Python scenarios we rely on the `MCPServer` class from the [Python SDK](https://py.sdk.modelcontextprotocol.io/v2/run/authorization/). It publishes the Protected Resource Metadata document, answers unauthenticated requests with a `401` whose `WWW-Authenticate` header points back at that document, and hands every bearer token to a verifier that we supply. Many of the conventions around authorization, like the endpoints and token validation logic, are consistent across languages, but some offer simpler ways of integrating them in production scenarios.

</template>
<template #zh>

为了让授权交互更简单，Python 场景下我们直接使用 [Python SDK](https://py.sdk.modelcontextprotocol.io/v2/run/authorization/) 中的 `MCPServer` 类。它会发布受保护资源元数据文档，用 `401` 响应未认证的请求（其 `WWW-Authenticate` 头指回该文档），并把收到的每个 bearer token 交给我们提供的校验器。围绕授权的许多约定——例如端点和 token 校验逻辑——在各语言之间是一致的，不过某些语言在生产场景中为集成这些约定提供了更简单的方式。

</template>
</BiRow>

<BiRow>
<template #en>

Prior to writing the actual server, we need to set up our configuration in `config.py` - the contents are entirely based on your local server setup:

</template>
<template #zh>

在编写实际的服务器之前，我们需要先在 `config.py` 中完成配置——其内容完全取决于你本地的服务器设置：

</template>
</BiRow>

<BiRow>
<template #en>

```python
"""Configuration settings for the MCP auth server."""

import os

class Config:
    """Configuration class that loads from environment variables with sensible defaults."""

    # Server settings
    HOST: str = os.getenv("HOST", "localhost")
    PORT: int = int(os.getenv("PORT", "3000"))

    # Auth server settings
    AUTH_HOST: str = os.getenv("AUTH_HOST", "localhost")
    AUTH_PORT: int = int(os.getenv("AUTH_PORT", "8080"))
    AUTH_REALM: str = os.getenv("AUTH_REALM", "master")

    # OAuth client settings
    OAUTH_CLIENT_ID: str = os.getenv("OAUTH_CLIENT_ID", "test-client")
    OAUTH_CLIENT_SECRET: str = os.getenv("OAUTH_CLIENT_SECRET", "")

    # Scope required on every token
    MCP_SCOPE: str = os.getenv("MCP_SCOPE", "mcp:tools")

    @property
    def server_url(self) -> str:
        """Build the server URL."""
        return f"http://{self.HOST}:{self.PORT}"

    @property
    def auth_base_url(self) -> str:
        """Build the auth server base URL."""
        return f"http://{self.AUTH_HOST}:{self.AUTH_PORT}/realms/{self.AUTH_REALM}/"

# Global configuration instance
config = Config()
```

</template>
<template #zh>

```python
"""Configuration settings for the MCP auth server."""

import os

class Config:
    """Configuration class that loads from environment variables with sensible defaults."""

    # Server settings
    HOST: str = os.getenv("HOST", "localhost")
    PORT: int = int(os.getenv("PORT", "3000"))

    # Auth server settings
    AUTH_HOST: str = os.getenv("AUTH_HOST", "localhost")
    AUTH_PORT: int = int(os.getenv("AUTH_PORT", "8080"))
    AUTH_REALM: str = os.getenv("AUTH_REALM", "master")

    # OAuth client settings
    OAUTH_CLIENT_ID: str = os.getenv("OAUTH_CLIENT_ID", "test-client")
    OAUTH_CLIENT_SECRET: str = os.getenv("OAUTH_CLIENT_SECRET", "")

    # Scope required on every token
    MCP_SCOPE: str = os.getenv("MCP_SCOPE", "mcp:tools")

    @property
    def server_url(self) -> str:
        """Build the server URL."""
        return f"http://{self.HOST}:{self.PORT}"

    @property
    def auth_base_url(self) -> str:
        """Build the auth server base URL."""
        return f"http://{self.AUTH_HOST}:{self.AUTH_PORT}/realms/{self.AUTH_REALM}/"

# Global configuration instance
config = Config()
```

</template>
</BiRow>

<BiRow>
<template #en>

`OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` are associated with the MCP server client we created earlier. Set them in your environment before starting the server.

</template>
<template #zh>

`OAUTH_CLIENT_ID` 和 `OAUTH_CLIENT_SECRET` 对应我们之前创建的那个 MCP 服务器客户端。启动服务器前，请先在环境中设置它们。

</template>
</BiRow>

<BiRow>
<template #en>

The server implementation is as follows:

</template>
<template #zh>

服务器实现如下：

</template>
</BiRow>

<BiRow>
<template #en>

```python
import datetime
import logging
from typing import Any
from urllib.parse import urljoin

from pydantic import AnyHttpUrl

from mcp.server import MCPServer
from mcp.server.auth.settings import AuthSettings

from .config import config
from .token_verifier import IntrospectionTokenVerifier

logger = logging.getLogger(__name__)

def create_oauth_urls() -> dict[str, str]:
    """Create OAuth URLs based on configuration (Keycloak-style)."""
    auth_base_url = config.auth_base_url

    return {
        "issuer": auth_base_url,
        "introspection_endpoint": urljoin(auth_base_url, "protocol/openid-connect/token/introspect"),
        "authorization_endpoint": urljoin(auth_base_url, "protocol/openid-connect/auth"),
        "token_endpoint": urljoin(auth_base_url, "protocol/openid-connect/token"),
    }

def create_server() -> MCPServer:
    """Create and configure the MCP server."""

    oauth_urls = create_oauth_urls()

    token_verifier = IntrospectionTokenVerifier(
        introspection_endpoint=oauth_urls["introspection_endpoint"],
        server_url=config.server_url,
        client_id=config.OAUTH_CLIENT_ID,
        client_secret=config.OAUTH_CLIENT_SECRET,
    )

    app = MCPServer(
        name="MCP Resource Server",
        instructions="Resource Server that validates tokens via Authorization Server introspection",
        debug=True,
        token_verifier=token_verifier,
        auth=AuthSettings(
            issuer_url=AnyHttpUrl(oauth_urls["issuer"]),
            required_scopes=[config.MCP_SCOPE],
            resource_server_url=AnyHttpUrl(config.server_url),
        ),
    )

    @app.tool()
    async def add_numbers(a: float, b: float) -> dict[str, Any]:
        """
        Add two numbers together.
        This tool demonstrates basic arithmetic operations with OAuth authentication.

        Args:
            a: The first number to add
            b: The second number to add
        """
        result = a + b
        return {
            "operation": "addition",
            "operand_a": a,
            "operand_b": b,
            "result": result,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    @app.tool()
    async def multiply_numbers(x: float, y: float) -> dict[str, Any]:
        """
        Multiply two numbers together.
        This tool demonstrates basic arithmetic operations with OAuth authentication.

        Args:
            x: The first number to multiply
            y: The second number to multiply
        """
        result = x * y
        return {
            "operation": "multiplication",
            "operand_x": x,
            "operand_y": y,
            "result": result,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    return app

def main() -> int:
    """
    Run the MCP Resource Server.

    This server:
    - Provides RFC 9728 Protected Resource Metadata
    - Validates tokens via Authorization Server introspection
    - Serves MCP tools requiring authentication

    Configuration is loaded from config.py and environment variables.
    """
    logging.basicConfig(level=logging.INFO)

    oauth_urls = create_oauth_urls()

    try:
        mcp_server = create_server()

        logger.info("Starting MCP Server on %s:%s", config.HOST, config.PORT)
        logger.info("Authorization Server: %s", oauth_urls["issuer"])

        mcp_server.run(
            transport="streamable-http",
            host=config.HOST,
            port=config.PORT,
            streamable_http_path="/",
        )
        return 0

    except Exception:
        logger.exception("Server error")
        return 1

if __name__ == "__main__":
    exit(main())
```

</template>
<template #zh>

```python
import datetime
import logging
from typing import Any
from urllib.parse import urljoin

from pydantic import AnyHttpUrl

from mcp.server import MCPServer
from mcp.server.auth.settings import AuthSettings

from .config import config
from .token_verifier import IntrospectionTokenVerifier

logger = logging.getLogger(__name__)

def create_oauth_urls() -> dict[str, str]:
    """Create OAuth URLs based on configuration (Keycloak-style)."""
    auth_base_url = config.auth_base_url

    return {
        "issuer": auth_base_url,
        "introspection_endpoint": urljoin(auth_base_url, "protocol/openid-connect/token/introspect"),
        "authorization_endpoint": urljoin(auth_base_url, "protocol/openid-connect/auth"),
        "token_endpoint": urljoin(auth_base_url, "protocol/openid-connect/token"),
    }

def create_server() -> MCPServer:
    """Create and configure the MCP server."""

    oauth_urls = create_oauth_urls()

    token_verifier = IntrospectionTokenVerifier(
        introspection_endpoint=oauth_urls["introspection_endpoint"],
        server_url=config.server_url,
        client_id=config.OAUTH_CLIENT_ID,
        client_secret=config.OAUTH_CLIENT_SECRET,
    )

    app = MCPServer(
        name="MCP Resource Server",
        instructions="Resource Server that validates tokens via Authorization Server introspection",
        debug=True,
        token_verifier=token_verifier,
        auth=AuthSettings(
            issuer_url=AnyHttpUrl(oauth_urls["issuer"]),
            required_scopes=[config.MCP_SCOPE],
            resource_server_url=AnyHttpUrl(config.server_url),
        ),
    )

    @app.tool()
    async def add_numbers(a: float, b: float) -> dict[str, Any]:
        """
        Add two numbers together.
        This tool demonstrates basic arithmetic operations with OAuth authentication.

        Args:
            a: The first number to add
            b: The second number to add
        """
        result = a + b
        return {
            "operation": "addition",
            "operand_a": a,
            "operand_b": b,
            "result": result,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    @app.tool()
    async def multiply_numbers(x: float, y: float) -> dict[str, Any]:
        """
        Multiply two numbers together.
        This tool demonstrates basic arithmetic operations with OAuth authentication.

        Args:
            x: The first number to multiply
            y: The second number to multiply
        """
        result = x * y
        return {
            "operation": "multiplication",
            "operand_x": x,
            "operand_y": y,
            "result": result,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    return app

def main() -> int:
    """
    Run the MCP Resource Server.

    This server:
    - Provides RFC 9728 Protected Resource Metadata
    - Validates tokens via Authorization Server introspection
    - Serves MCP tools requiring authentication

    Configuration is loaded from config.py and environment variables.
    """
    logging.basicConfig(level=logging.INFO)

    oauth_urls = create_oauth_urls()

    try:
        mcp_server = create_server()

        logger.info("Starting MCP Server on %s:%s", config.HOST, config.PORT)
        logger.info("Authorization Server: %s", oauth_urls["issuer"])

        mcp_server.run(
            transport="streamable-http",
            host=config.HOST,
            port=config.PORT,
            streamable_http_path="/",
        )
        return 0

    except Exception:
        logger.exception("Server error")
        return 1

if __name__ == "__main__":
    exit(main())
```

</template>
</BiRow>

<BiRow>
<template #en>

Lastly, the token verification logic is delegated entirely to `token_verifier.py`, ensuring that we can use the Keycloak introspection endpoint to verify the validity of any credential artifacts.

</template>
<template #zh>

最后，token 校验逻辑完全委托给了 `token_verifier.py`，确保我们能够用 Keycloak 的内省端点校验各类凭据的有效性。

</template>
</BiRow>

<BiRow>
<template #en>

```python
"""Token verifier implementation using OAuth 2.0 Token Introspection (RFC 7662)."""

import logging
from typing import Any

import httpx2

from mcp.server.auth.provider import AccessToken, TokenVerifier
from mcp.shared.auth_utils import check_resource_allowed, resource_url_from_server_url

logger = logging.getLogger(__name__)

class IntrospectionTokenVerifier(TokenVerifier):
    """Token verifier that uses OAuth 2.0 Token Introspection (RFC 7662)."""

    def __init__(
        self,
        introspection_endpoint: str,
        server_url: str,
        client_id: str,
        client_secret: str,
    ):
        self.introspection_endpoint = introspection_endpoint
        self.server_url = server_url
        self.client_id = client_id
        self.client_secret = client_secret
        self.resource_url = resource_url_from_server_url(server_url)

    async def verify_token(self, token: str) -> AccessToken | None:
        """Verify token via introspection endpoint."""
        if not self.introspection_endpoint.startswith(("https://", "http://localhost", "http://127.0.0.1")):
            return None

        timeout = httpx2.Timeout(10.0, connect=5.0)
        limits = httpx2.Limits(max_connections=10, max_keepalive_connections=5)

        async with httpx2.AsyncClient(
            timeout=timeout,
            limits=limits,
            verify=True,
        ) as client:
            try:
                form_data = {
                    "token": token,
                    "client_id": self.client_id,
                }
                # Only send client_secret when one is configured
                # Public clients authenticate with client_id alone.
                if self.client_secret:
                    form_data["client_secret"] = self.client_secret
                headers = {"Content-Type": "application/x-www-form-urlencoded"}

                response = await client.post(
                    self.introspection_endpoint,
                    data=form_data,
                    headers=headers,
                )

                if response.status_code != 200:
                    return None

                data = response.json()
                if not data.get("active", False):
                    return None

                if not self._validate_resource(data):
                    return None

                return AccessToken(
                    token=token,
                    client_id=data.get("client_id", "unknown"),
                    scopes=data.get("scope", "").split() if data.get("scope") else [],
                    expires_at=data.get("exp"),
                    # AccessToken.resource is `str | None`. Keycloak returns `aud`
                    # as a *list* here (e.g. ["test-client", "http://localhost:3000",
                    # "account"]); passing that list straight in raises a pydantic
                    # ValidationError that the broad `except` below turns into a
                    # silent 401. We already confirmed this server's resource is a
                    # valid audience in `_validate_resource`, so record that.
                    resource=self.resource_url,
                    subject=data.get("sub"),  # RFC 7662 subject (resource owner)
                    claims=data,
                )

            except Exception:
                logger.exception("Token introspection failed")
                return None

    def _validate_resource(self, token_data: dict[str, Any]) -> bool:
        """Validate token was issued for this resource server.

        Rules:
        - Reject if 'aud' missing.
        - Accept if any audience entry matches the derived resource URL.
        - Supports string or list forms per JWT spec.
        """
        if not self.server_url or not self.resource_url:
            return False

        aud: list[str] | str | None = token_data.get("aud")
        if isinstance(aud, list):
            return any(self._is_valid_resource(a) for a in aud)
        if isinstance(aud, str):
            return self._is_valid_resource(aud)
        return False

    def _is_valid_resource(self, resource: str) -> bool:
        """Check if the given resource matches our server."""
        return check_resource_allowed(requested_resource=self.resource_url, configured_resource=resource)
```

</template>
<template #zh>

```python
"""Token verifier implementation using OAuth 2.0 Token Introspection (RFC 7662)."""

import logging
from typing import Any

import httpx2

from mcp.server.auth.provider import AccessToken, TokenVerifier
from mcp.shared.auth_utils import check_resource_allowed, resource_url_from_server_url

logger = logging.getLogger(__name__)

class IntrospectionTokenVerifier(TokenVerifier):
    """Token verifier that uses OAuth 2.0 Token Introspection (RFC 7662)."""

    def __init__(
        self,
        introspection_endpoint: str,
        server_url: str,
        client_id: str,
        client_secret: str,
    ):
        self.introspection_endpoint = introspection_endpoint
        self.server_url = server_url
        self.client_id = client_id
        self.client_secret = client_secret
        self.resource_url = resource_url_from_server_url(server_url)

    async def verify_token(self, token: str) -> AccessToken | None:
        """Verify token via introspection endpoint."""
        if not self.introspection_endpoint.startswith(("https://", "http://localhost", "http://127.0.0.1")):
            return None

        timeout = httpx2.Timeout(10.0, connect=5.0)
        limits = httpx2.Limits(max_connections=10, max_keepalive_connections=5)

        async with httpx2.AsyncClient(
            timeout=timeout,
            limits=limits,
            verify=True,
        ) as client:
            try:
                form_data = {
                    "token": token,
                    "client_id": self.client_id,
                }
                # Only send client_secret when one is configured
                # Public clients authenticate with client_id alone.
                if self.client_secret:
                    form_data["client_secret"] = self.client_secret
                headers = {"Content-Type": "application/x-www-form-urlencoded"}

                response = await client.post(
                    self.introspection_endpoint,
                    data=form_data,
                    headers=headers,
                )

                if response.status_code != 200:
                    return None

                data = response.json()
                if not data.get("active", False):
                    return None

                if not self._validate_resource(data):
                    return None

                return AccessToken(
                    token=token,
                    client_id=data.get("client_id", "unknown"),
                    scopes=data.get("scope", "").split() if data.get("scope") else [],
                    expires_at=data.get("exp"),
                    # AccessToken.resource is `str | None`. Keycloak returns `aud`
                    # as a *list* here (e.g. ["test-client", "http://localhost:3000",
                    # "account"]); passing that list straight in raises a pydantic
                    # ValidationError that the broad `except` below turns into a
                    # silent 401. We already confirmed this server's resource is a
                    # valid audience in `_validate_resource`, so record that.
                    resource=self.resource_url,
                    subject=data.get("sub"),  # RFC 7662 subject (resource owner)
                    claims=data,
                )

            except Exception:
                logger.exception("Token introspection failed")
                return None

    def _validate_resource(self, token_data: dict[str, Any]) -> bool:
        """Validate token was issued for this resource server.

        Rules:
        - Reject if 'aud' missing.
        - Accept if any audience entry matches the derived resource URL.
        - Supports string or list forms per JWT spec.
        """
        if not self.server_url or not self.resource_url:
            return False

        aud: list[str] | str | None = token_data.get("aud")
        if isinstance(aud, list):
            return any(self._is_valid_resource(a) for a in aud)
        if isinstance(aud, str):
            return self._is_valid_resource(aud)
        return False

    def _is_valid_resource(self, resource: str) -> bool:
        """Check if the given resource matches our server."""
        return check_resource_allowed(requested_resource=self.resource_url, configured_resource=resource)
```

</template>
</BiRow>

<BiRow>
<template #en>

For more details, see below or the [Python SDK documentation](https://github.com/modelcontextprotocol/python-sdk).

</template>
<template #zh>

更多细节见下文或 [Python SDK 文档](https://github.com/modelcontextprotocol/python-sdk)。

</template>
</BiRow>

<BiRow>
<template #en>

**Python MCP Server**

</template>
<template #zh>

**Python MCP 服务器**

</template>
</BiRow>

<BiRow>
<template #en>

In the server's root have a `pyproject.toml` file and a `mcp_server` folder. Put all the Python files in the `mcp_server` folder, and fill the `pyproject.toml` file like:

</template>
<template #zh>

在服务器的根目录下放一个 `pyproject.toml` 文件和一个 `mcp_server` 文件夹。把所有 Python 文件放进 `mcp_server` 文件夹，并按下面这样填写 `pyproject.toml` 文件：

</template>
</BiRow>

<BiRow>
<template #en>

```toml
[project]
name = "mcp-simple-auth"
version = "0.1.0"
description = "A simple MCP server demonstrating OAuth authentication"
requires-python = ">=3.10"
authors = [{ name = "Model Context Protocol a Series of LF Projects, LLC." }]
license = { text = "MIT" }
dependencies = [
  "httpx2>=2.5.0",
  "mcp>=2.0.0rc1",
  "pydantic>=2.0",
]

[project.scripts]
mcp-simple-auth-rs = "mcp_server.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_server"]

[dependency-groups]
dev = ["pyright>=1.1.391", "pytest>=8.3.4", "ruff>=0.8.5"]
```

</template>
<template #zh>

```toml
[project]
name = "mcp-simple-auth"
version = "0.1.0"
description = "A simple MCP server demonstrating OAuth authentication"
requires-python = ">=3.10"
authors = [{ name = "Model Context Protocol a Series of LF Projects, LLC." }]
license = { text = "MIT" }
dependencies = [
  "httpx2>=2.5.0",
  "mcp>=2.0.0rc1",
  "pydantic>=2.0",
]

[project.scripts]
mcp-simple-auth-rs = "mcp_server.server:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["mcp_server"]

[dependency-groups]
dev = ["pyright>=1.1.391", "pytest>=8.3.4", "ruff>=0.8.5"]
```

</template>
</BiRow>

<BiRow>
<template #en>

Then run the commands below to start the server.

</template>
<template #zh>

然后运行下面的命令来启动服务器。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
uv sync
uv run mcp-simple-auth-rs
```

</template>
<template #zh>

```bash
uv sync
uv run mcp-simple-auth-rs
```

</template>
</BiRow>

<BiRow>
<template #en>

You can see the complete C# project in the [sample repository](https://github.com/localden/min-cs-mcp-auth).

</template>
<template #zh>

完整的 C# 项目见[示例仓库](https://github.com/localden/min-cs-mcp-auth)。

</template>
</BiRow>

<BiRow>
<template #en>

To set up authorization in your MCP server using the MCP C# SDK, you can lean on the standard ASP.NET Core builder pattern. Instead of using the introspection endpoint provided by Keycloak, we will use built-in ASP.NET Core capabilities for token validation.

</template>
<template #zh>

使用 MCP C# SDK 在 MCP 服务器中设置授权时，可以依托标准的 ASP.NET Core builder 模式。这里我们不使用 Keycloak 提供的内省端点，而是使用 ASP.NET Core 内置的能力进行 token 校验。

</template>
</BiRow>

<BiRow>
<template #en>

In the root of your server folder, create two files, `Program.cs` and `ProtectedMcpServer.csproj`, and a `Tools` folder. Fill `Program.cs` with:

</template>
<template #zh>

在服务器文件夹的根目录下，创建 `Program.cs` 和 `ProtectedMcpServer.csproj` 两个文件，以及一个 `Tools` 文件夹。将 `Program.cs` 填写为：

</template>
</BiRow>

<BiRow>
<template #en>

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ModelContextProtocol.AspNetCore.Authentication;
using ProtectedMcpServer.Tools;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var serverUrl = "http://localhost:3000/";
var authorizationServerUrl = "http://localhost:8080/realms/master/";

builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = McpAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = authorizationServerUrl;
    var normalizedServerAudience = serverUrl.TrimEnd('/');
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authorizationServerUrl,
        ValidAudiences = new[] { normalizedServerAudience, serverUrl },
        AudienceValidator = (audiences, securityToken, validationParameters) =>
        {
            if (audiences == null) return false;
            foreach (var aud in audiences)
            {
                if (string.Equals(aud.TrimEnd('/'), normalizedServerAudience, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }
            return false;
        }
    };

    options.RequireHttpsMetadata = false; // Set to true in production

    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            var name = context.Principal?.Identity?.Name ?? "unknown";
            var email = context.Principal?.FindFirstValue("preferred_username") ?? "unknown";
            Console.WriteLine($"Token validated for: {name} ({email})");
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
    };
})
.AddMcp(options =>
{
    options.ResourceMetadata = new()
    {
        Resource = serverUrl,
        ResourceDocumentation = "https://docs.example.com/api/math",
        AuthorizationServers = { authorizationServerUrl },
        ScopesSupported = ["mcp:tools"]
    };
});

builder.Services.AddAuthorization();

builder.Services.AddHttpContextAccessor();
builder.Services.AddMcpServer()
    .WithTools<MathTools>()
    .WithHttpTransport();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapMcp().RequireAuthorization();

Console.WriteLine($"Starting MCP server with authorization at {serverUrl}");
Console.WriteLine($"Using Keycloak server at {authorizationServerUrl}");
Console.WriteLine($"Protected Resource Metadata URL: {serverUrl}.well-known/oauth-protected-resource");
Console.WriteLine("Exposed Math tools: Add, Multiply");
Console.WriteLine("Press Ctrl+C to stop the server");

app.Run(serverUrl);
```

</template>
<template #zh>

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ModelContextProtocol.AspNetCore.Authentication;
using ProtectedMcpServer.Tools;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

var serverUrl = "http://localhost:3000/";
var authorizationServerUrl = "http://localhost:8080/realms/master/";

builder.Services.AddAuthentication(options =>
{
    options.DefaultChallengeScheme = McpAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = authorizationServerUrl;
    var normalizedServerAudience = serverUrl.TrimEnd('/');
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authorizationServerUrl,
        ValidAudiences = new[] { normalizedServerAudience, serverUrl },
        AudienceValidator = (audiences, securityToken, validationParameters) =>
        {
            if (audiences == null) return false;
            foreach (var aud in audiences)
            {
                if (string.Equals(aud.TrimEnd('/'), normalizedServerAudience, StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }
            }
            return false;
        }
    };

    options.RequireHttpsMetadata = false; // Set to true in production

    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            var name = context.Principal?.Identity?.Name ?? "unknown";
            var email = context.Principal?.FindFirstValue("preferred_username") ?? "unknown";
            Console.WriteLine($"Token validated for: {name} ({email})");
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
    };
})
.AddMcp(options =>
{
    options.ResourceMetadata = new()
    {
        Resource = serverUrl,
        ResourceDocumentation = "https://docs.example.com/api/math",
        AuthorizationServers = { authorizationServerUrl },
        ScopesSupported = ["mcp:tools"]
    };
});

builder.Services.AddAuthorization();

builder.Services.AddHttpContextAccessor();
builder.Services.AddMcpServer()
    .WithTools<MathTools>()
    .WithHttpTransport();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapMcp().RequireAuthorization();

Console.WriteLine($"Starting MCP server with authorization at {serverUrl}");
Console.WriteLine($"Using Keycloak server at {authorizationServerUrl}");
Console.WriteLine($"Protected Resource Metadata URL: {serverUrl}.well-known/oauth-protected-resource");
Console.WriteLine("Exposed Math tools: Add, Multiply");
Console.WriteLine("Press Ctrl+C to stop the server");

app.Run(serverUrl);
```

</template>
</BiRow>

<BiRow>
<template #en>

Fill `ProtectedMcpServer.csproj` with:

</template>
<template #zh>

将 `ProtectedMcpServer.csproj` 填写为：

</template>
</BiRow>

<BiRow>
<template #en>

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <!-- Identifier for the local secret store, not a secret itself. -->
    <UserSecretsId>local-authorization-mcp-server</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.18" />
    <PackageReference Include="ModelContextProtocol" Version="2.0.0" />
    <PackageReference Include="ModelContextProtocol.AspNetCore" Version="2.0.0" />
  </ItemGroup>

</Project>
```

</template>
<template #zh>

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <!-- Identifier for the local secret store, not a secret itself. -->
    <UserSecretsId>local-authorization-mcp-server</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="9.0.18" />
    <PackageReference Include="ModelContextProtocol" Version="2.0.0" />
    <PackageReference Include="ModelContextProtocol.AspNetCore" Version="2.0.0" />
  </ItemGroup>

</Project>
```

</template>
</BiRow>

<BiRow>
<template #en>

In the `Tools` folder, create `MathTools.cs` and fill it with:

</template>
<template #zh>

在 `Tools` 文件夹中创建 `MathTools.cs` 并填写以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

```csharp
using System.ComponentModel;
using ModelContextProtocol.Server;

namespace ProtectedMcpServer.Tools;

[McpServerToolType]
public sealed class MathTools
{
    [McpServerTool, Description("Add two numbers together.")]
    public Task<double> Add(
        [Description("First operand")] double a,
        [Description("Second operand")] double b)
    {
        return Task.FromResult(a + b);
    }

    [McpServerTool, Description("Multiply two numbers together.")]
    public Task<double> Multiply(
        [Description("First operand")] double a,
        [Description("Second operand")] double b)
    {
        return Task.FromResult(a * b);
    }
}
```

</template>
<template #zh>

```csharp
using System.ComponentModel;
using ModelContextProtocol.Server;

namespace ProtectedMcpServer.Tools;

[McpServerToolType]
public sealed class MathTools
{
    [McpServerTool, Description("Add two numbers together.")]
    public Task<double> Add(
        [Description("First operand")] double a,
        [Description("Second operand")] double b)
    {
        return Task.FromResult(a + b);
    }

    [McpServerTool, Description("Multiply two numbers together.")]
    public Task<double> Multiply(
        [Description("First operand")] double a,
        [Description("Second operand")] double b)
    {
        return Task.FromResult(a * b);
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Then from the server's root, run:

</template>
<template #zh>

然后从服务器的根目录运行：

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

For more details, see the [C# SDK documentation](https://github.com/modelcontextprotocol/csharp-sdk).

</template>
<template #zh>

更多细节请参阅 [C# SDK 文档](https://github.com/modelcontextprotocol/csharp-sdk)。

</template>
</BiRow>

<BiRow>
<template #en>

## Testing the MCP Server

</template>
<template #zh>

## 测试 MCP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

For testing purposes, we will be using [Visual Studio Code](https://code.visualstudio.com), but any client that supports MCP and the new authorization specification will fit.

</template>
<template #zh>

为了测试，我们将使用 [Visual Studio Code](https://code.visualstudio.com)，不过任何支持 MCP 和新授权规范的客户端都可以。

</template>
</BiRow>

<BiRow>
<template #en>

Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> and select **MCP: Add server...**. Select **HTTP** and enter `http://localhost:3000`. Give the server a unique name to be used inside Visual Studio Code. In `mcp.json` you should now see an entry like this:

</template>
<template #zh>

按下 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>，选择 **MCP: Add server...**。选择 **HTTP** 并输入 `http://localhost:3000`。给服务器取一个在 Visual Studio Code 内使用的唯一名称。此时 `mcp.json` 中应出现如下条目：

</template>
</BiRow>

<BiRow>
<template #en>

```json
"my-mcp-server-18676652": {
  "url": "http://localhost:3000",
  "type": "http"
}
```

</template>
<template #zh>

```json
"my-mcp-server-18676652": {
  "url": "http://localhost:3000",
  "type": "http"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

On connection, you will be taken to the browser, where you will be prompted to consent to Visual Studio Code having access to the `mcp:tools` scope.

</template>
<template #zh>

连接时会跳转到浏览器，系统会提示你同意 Visual Studio Code 访问 `mcp:tools` 作用域。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-vscode.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=d5183fb7c257993aed1b2246f0bbbb27" alt="Keycloak consent form for VS Code." width="1915" height="1536" data-path="images/tutorial-authorization/keycloak-vscode.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/keycloak-vscode.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=d5183fb7c257993aed1b2246f0bbbb27" alt="Keycloak consent form for VS Code." width="1915" height="1536" data-path="images/tutorial-authorization/keycloak-vscode.png" />

</template>
</BiRow>

<BiRow>
<template #en>

After consenting, you will see the tools listed right above the server entry in `mcp.json`.

</template>
<template #zh>

同意之后，你会看到这些工具就列在 `mcp.json` 中该服务器条目的正上方。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/tools-vs-code.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=f7c34d1bf115fe6934e01b4a5a91168b" alt="Tools listed in VS Code." width="496" height="160" data-path="images/tutorial-authorization/tools-vs-code.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/tools-vs-code.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=f7c34d1bf115fe6934e01b4a5a91168b" alt="Tools listed in VS Code." width="496" height="160" data-path="images/tutorial-authorization/tools-vs-code.png" />

</template>
</BiRow>

<BiRow>
<template #en>

You will be able to invoke individual tools with the help of the `#` sign in the chat view.

</template>
<template #zh>

在聊天视图中，你可以借助 `#` 符号来调用单个工具。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/tools-vs-code-invoke.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=76cbef68e48821a3c5467bd20c7e89fe" alt="Invoking MCP tools in VS Code." width="1276" height="396" data-path="images/tutorial-authorization/tools-vs-code-invoke.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/sAd4SGUO-cEUqgzn/images/tutorial-authorization/tools-vs-code-invoke.png?fit=max&auto=format&n=sAd4SGUO-cEUqgzn&q=85&s=76cbef68e48821a3c5467bd20c7e89fe" alt="Invoking MCP tools in VS Code." width="1276" height="396" data-path="images/tutorial-authorization/tools-vs-code-invoke.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Common Pitfalls and How to Avoid Them

</template>
<template #zh>

## 常见陷阱与规避方法

</template>
</BiRow>

<BiRow>
<template #en>

For comprehensive security guidance, including attack vectors, mitigation strategies, and implementation best practices, make sure to read through [Security Best Practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices). A few key issues are called out below.

</template>
<template #zh>

有关攻击向量、缓解策略和实现最佳实践的全面安全指导，请务必通读[安全最佳实践](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices)。下面着重指出几个关键问题。

</template>
</BiRow>

<BiRow>
<template #en>

* **Do not implement token validation or authorization logic by yourself**. Use off-the-shelf, well-tested, and secure libraries for things like token validation or authorization decisions. Doing everything from scratch means that you're more likely to implement things incorrectly unless you are a security expert.
* **Use short-lived access tokens**. Depending on the authorization server used, this setting might be customizable. We recommend to not use long-lived tokens - if a malicious actor steals them, they will be able to maintain their access for longer periods.
* **Always validate tokens**. Just because your server received a token does not mean that the token is valid or that it's meant for your server. Always verify that what your MCP server is getting from the client matches the required constraints.
* **Store tokens in secure, encrypted storage**. In certain scenarios, you might need to cache tokens server-side. If that is the case, ensure that the storage has the right access controls and cannot be easily exfiltrated by malicious parties with access to your server. You should also implement robust cache eviction policies to ensure that your MCP server is not re-using expired or otherwise invalid tokens.
* **Enforce HTTPS in production**. Do not accept tokens or redirect callbacks over plain HTTP except for `localhost` during development.
* **Least-privilege scopes**. Don't use catch‑all scopes. Split access per tool or capability where possible and verify required scopes per route/tool on the resource server.
* **Don't log credentials**. Never log `Authorization` headers, tokens, codes, or secrets. Scrub query strings and headers. Redact sensitive fields in structured logs.
* **Separate app vs. resource server credentials**. Don't reuse your MCP server's client secret for end‑user flows. Store all secrets in a proper secret manager, not in source control.
* **Return proper challenges**. On 401, include `WWW-Authenticate` with `Bearer`, `realm`, and `resource_metadata` so clients can discover how to authenticate.
* **DCR (Dynamic Client Registration) controls**. If enabled, be aware of constraints specific to your organization, such as trusted hosts, required vetting, and audited registrations. Unauthenticated DCR means that anyone can register any client with your authorization server.
* **Multi‑tenant/realm mix-ups**. Pin to a single issuer/tenant unless explicitly multi‑tenant. Reject tokens from other realms even if signed by the same authorization server.
* **Audience/resource indicator misuse**. Don't configure or accept generic audiences (like `api`) or unrelated resources. Require the audience/resource to match your configured server.
* **Error detail leakage**. Return generic messages to clients, but log detailed reasons with correlation IDs internally to aid troubleshooting without exposing internals.
* **Session identifier hardening**. Treat `Mcp-Session-Id` as untrusted input; never tie authorization to it. Regenerate on auth changes and validate lifecycle server‑side.

</template>
<template #zh>

* **不要自己实现 token 校验或授权逻辑**。token 校验、授权决策这类事情，请使用现成的、经过充分测试且安全的库。除非你是安全专家，从零开始实现一切更有可能做错。
* **使用短有效期的 access token**。视所用授权服务器而定，这个设置或许可以自定义。我们建议不要使用长期 token——一旦被恶意行为者窃取，对方就能在更长的时间里维持访问。
* **始终校验 token**。你的服务器收到了 token，并不代表该 token 是有效的，也不代表它是签发给你的服务器的。务必核实 MCP 服务器从客户端收到的内容满足所需的约束。
* **把 token 存放在安全的加密存储中**。在某些场景下，你可能需要在服务器端缓存 token。如果是这种情况，请确保存储具备恰当的访问控制，不会被能访问你服务器的恶意方轻易外泄。你还应该实现稳健的缓存淘汰策略，确保 MCP 服务器不会复用过期或以其他方式失效的 token。
* **在生产环境中强制 HTTPS**。除了开发期间的 `localhost`，不要通过明文 HTTP 接受 token 或重定向回调。
* **最小权限的作用域**。不要使用大包大揽的作用域。尽可能按工具或能力拆分访问权限，并在资源服务器上按路由/工具核验所需的作用域。
* **不要记录凭据**。永远不要记录 `Authorization` 头、token、授权码或机密。清理查询字符串和请求头，并对结构化日志中的敏感字段做脱敏。
* **区分应用凭据与资源服务器凭据**。不要在面向最终用户的流程中复用 MCP 服务器的 client secret。所有机密都应存放在正规的密钥管理器中，而不是放进源码版本控制。
* **返回规范的质询（challenge）**。返回 401 时，在 `WWW-Authenticate` 头中带上 `Bearer`、`realm` 和 `resource_metadata`，让客户端知道该如何认证。
* **DCR（动态客户端注册）管控**。如果启用了 DCR，请注意你组织特有的约束，例如可信主机、必要的审查以及注册审计。未认证的 DCR 意味着任何人都可以在你的授权服务器上注册任何客户端。
* **多租户/realm 混淆**。除非明确面向多租户，否则固定使用单一签发方（issuer）/租户。即使 token 由同一个授权服务器签名，也要拒绝来自其他 realm 的 token。
* **受众/资源指示器误用**。不要配置或接受泛化的受众（比如 `api`）或无关的资源。要求受众/资源与你配置的服务器相匹配。
* **错误细节泄漏**。向客户端返回通用的消息，但内部结合关联 ID 记录详细的原因，以便在不暴露内部细节的情况下协助排障。
* **会话标识符加固**。把 `Mcp-Session-Id` 当作不可信输入；绝不把授权绑定到它上面。授权状态发生变化时重新生成会话 ID，并在服务器端校验其生命周期。

</template>
</BiRow>

<BiRow>
<template #en>

## Related Standards and Documentation

</template>
<template #zh>

## 相关标准与文档

</template>
</BiRow>

<BiRow>
<template #en>

MCP authorization builds on these well-established standards:

</template>
<template #zh>

MCP 授权建立在以下成熟标准之上：

</template>
</BiRow>

<BiRow>
<template #en>

* **[OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13)**: The core authorization framework
* **[RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414)**: Authorization Server Metadata discovery
* **[RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591)**: Dynamic Client Registration
* **[RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728)**: Protected Resource Metadata
* **[RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707)**: Resource Indicators

</template>
<template #zh>

* **[OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13)**：核心授权框架
* **[RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414)**：授权服务器元数据发现
* **[RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591)**：动态客户端注册
* **[RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728)**：受保护资源元数据
* **[RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707)**：资源指示器

</template>
</BiRow>

<BiRow>
<template #en>

For additional details, refer to:

</template>
<template #zh>

更多细节请参阅：

</template>
</BiRow>

<BiRow>
<template #en>

* [Authorization Specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
* [Security Best Practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices)
* [Available MCP SDKs](https://modelcontextprotocol.io/docs/2026-07-28/sdk)

</template>
<template #zh>

* [授权规范](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
* [安全最佳实践](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices)
* [可用的 MCP SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk)

</template>
</BiRow>

<BiRow>
<template #en>

Understanding these standards will help you implement authorization correctly and troubleshoot issues when they arise.

</template>
<template #zh>

理解这些标准能帮助你正确实现授权，并在问题出现时顺利排查。

</template>
</BiRow>
