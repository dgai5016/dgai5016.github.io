<BiRow>
<template #en>

Configure SSL certificates for a RAGFlow instance deployed via Docker.

</template>
<template #zh>

为通过 Docker 部署的 RAGFlow 实例配置 SSL 证书。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

This guide details how to configure SSL certificates for a RAGFlow instance deployed via Docker, using the container name `docker-ragflow-cpu-1` as an example.

</template>
<template #zh>

本指南详细介绍如何为通过 Docker 部署的 RAGFlow 实例配置 SSL 证书，并以容器名 `docker-ragflow-cpu-1` 为例。

</template>
</BiRow>

<BiRow>
<template #en>

## 1. Prepare Certificate Files

</template>
<template #zh>

## 1. 准备证书文件

</template>
</BiRow>

<BiRow>
<template #en>

Ensure you have Nginx-formatted certificate files ready:

</template>
<template #zh>

请确保你已备好 Nginx 格式的证书文件：

</template>
</BiRow>

<BiRow>
<template #en>

- **Public Key**: Usually named `fullchain.pem` or `server.crt`.
- **Private Key**: Usually named `privkey.pem` or `server.key`.

</template>
<template #zh>

- **公钥**：通常命名为 `fullchain.pem` 或 `server.crt`。
- **私钥**：通常命名为 `privkey.pem` 或 `server.key`。

</template>
</BiRow>

<BiRow>
<template #en>

If necessary, rename your files to match the standard:

</template>
<template #zh>

如有必要，请把文件重命名为标准名称：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
# Rename bundle to fullchain.pem
cp XXXXX_bundle.pem fullchain.pem
# Rename private key to privkey.pem
cp XXXXX.key privkey.pem
```

</template>
<template #zh>

```bash
# Rename bundle to fullchain.pem
cp XXXXX_bundle.pem fullchain.pem
# Rename private key to privkey.pem
cp XXXXX.key privkey.pem
```

</template>
</BiRow>

<BiRow>
<template #en>

## 2. Confirm Container Status

</template>
<template #zh>

## 2. 确认容器状态

</template>
</BiRow>

<BiRow>
<template #en>

Verify that your container is running:

</template>
<template #zh>

确认容器正在运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker ps
```

</template>
<template #zh>

```bash
docker ps
```

</template>
</BiRow>

<BiRow>
<template #en>

## 3. Copy Certificates to the Container

</template>
<template #zh>

## 3. 把证书复制到容器

</template>
</BiRow>

<BiRow>
<template #en>

Transfer the files from your host machine to the container's temporary directory:

</template>
<template #zh>

把文件从主机传输到容器的临时目录：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker cp ./fullchain.pem docker-ragflow-cpu-1:/tmp/fullchain.pem
docker cp ./privkey.pem docker-ragflow-cpu-1:/tmp/privkey.pem
```

</template>
<template #zh>

```bash
docker cp ./fullchain.pem docker-ragflow-cpu-1:/tmp/fullchain.pem
docker cp ./privkey.pem docker-ragflow-cpu-1:/tmp/privkey.pem
```

</template>
</BiRow>

<BiRow>
<template #en>

## 4. Deploy Certificates Inside the Container

</template>
<template #zh>

## 4. 在容器内部署证书

</template>
</BiRow>

<BiRow>
<template #en>

Enter the container's interactive terminal:

</template>
<template #zh>

进入容器的交互式终端：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker exec -it docker-ragflow-cpu-1 /bin/bash
```

</template>
<template #zh>

```bash
docker exec -it docker-ragflow-cpu-1 /bin/bash
```

</template>
</BiRow>

<BiRow>
<template #en>

Once inside, move the files and set appropriate permissions:

</template>
<template #zh>

进入容器后，移动文件并设置合适的权限：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mkdir -p /etc/nginx/ssl
mv /tmp/fullchain.pem /etc/nginx/ssl/
mv /tmp/privkey.pem /etc/nginx/ssl/

# Set permissions: 644 for public key, 600 for private key
chmod 644 /etc/nginx/ssl/fullchain.pem
chmod 600 /etc/nginx/ssl/privkey.pem
```

</template>
<template #zh>

```bash
mkdir -p /etc/nginx/ssl
mv /tmp/fullchain.pem /etc/nginx/ssl/
mv /tmp/privkey.pem /etc/nginx/ssl/

# Set permissions: 644 for public key, 600 for private key
chmod 644 /etc/nginx/ssl/fullchain.pem
chmod 600 /etc/nginx/ssl/privkey.pem
```

</template>
</BiRow>

<BiRow>
<template #en>

## 5. Switch Nginx to HTTPS Configuration

</template>
<template #zh>

## 5. 把 Nginx 切换为 HTTPS 配置

</template>
</BiRow>

<BiRow>
<template #en>

Replace the default HTTP configuration with the HTTPS template:

</template>
<template #zh>

用 HTTPS 模板替换默认的 HTTP 配置：

</template>
</BiRow>

<BiRow>
<template #en>

1. Navigate to the configuration directory: `cd /etc/nginx/conf.d/`.
2. Back up the original configuration: `mv ragflow.conf ragflow.conf.bak`.
3. Enable the HTTPS template: `cp /etc/nginx/ragflow.https.conf ./ragflow.conf`.

</template>
<template #zh>

1. 进入配置目录：`cd /etc/nginx/conf.d/`。
2. 备份原配置：`mv ragflow.conf ragflow.conf.bak`。
3. 启用 HTTPS 模板：`cp /etc/nginx/ragflow.https.conf ./ragflow.conf`。

</template>
</BiRow>

<BiRow>
<template #en>

## 6. Edit the HTTPS Template

</template>
<template #zh>

## 6. 编辑 HTTPS 模板

</template>
</BiRow>

<BiRow>
<template #en>

1. Open the configuration file: `vi ragflow.conf`.
2. Ensure `ssl_certificate` and `ssl_certificate_key` paths point to your files in `/etc/nginx/ssl/`.
3. Verify the Nginx syntax: `nginx -t`.

</template>
<template #zh>

1. 打开配置文件：`vi ragflow.conf`。
2. 确保 `ssl_certificate` 和 `ssl_certificate_key` 的路径指向你存放在 `/etc/nginx/ssl/` 下的文件。
3. 校验 Nginx 语法：`nginx -t`。

</template>
</BiRow>

<BiRow>
<template #en>

## 7. Apply the Configuration

</template>
<template #zh>

## 7. 应用配置

</template>
</BiRow>

<BiRow>
<template #en>

Reload Nginx to apply changes:

</template>
<template #zh>

重新加载 Nginx 使改动生效：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
nginx -s reload
```

</template>
<template #zh>

```bash
nginx -s reload
```

</template>
</BiRow>

<BiRow>
<template #en>

If the changes do not take effect, exit the container and restart it:

</template>
<template #zh>

如果改动未生效，请退出容器并重启它：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
exit
docker restart docker-ragflow-cpu-1
```

</template>
<template #zh>

```bash
exit
docker restart docker-ragflow-cpu-1
```

</template>
</BiRow>

<BiRow>
<template #en>

## Configuration Persistence

</template>
<template #zh>

## 配置持久化

</template>
</BiRow>

<BiRow>
<template #en>

:::tip IMPORTANT
Changes made via `docker cp` and `docker exec` are lost if the container is removed or stopped via `docker-compose down`.
**Recommendation**: After a successful test, store the certificates on the host machine and use `volumes` in your `docker-compose.yaml` to mount the certificates and `ragflow.conf` permanently.
:::

</template>
<template #zh>

:::tip 重要
通过 `docker cp` 和 `docker exec` 做出的改动，在容器被删除或通过 `docker-compose down` 停止后会丢失。
**建议**：测试成功后，把证书保存在主机上，并在 `docker-compose.yaml` 中通过 `volumes` 挂载证书和 `ragflow.conf`，使其持久生效。
:::

</template>
</BiRow>
