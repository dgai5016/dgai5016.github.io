# 配置 SSL 证书

为通过 Docker 部署的 RAGFlow 实例配置 SSL 证书。

---

本指南详细介绍如何为通过 Docker 部署的 RAGFlow 实例配置 SSL 证书，并以容器名 `docker-ragflow-cpu-1` 为例。

## 1. 准备证书文件

请确保你已备好 Nginx 格式的证书文件：

- **公钥**：通常命名为 `fullchain.pem` 或 `server.crt`。
- **私钥**：通常命名为 `privkey.pem` 或 `server.key`。

如有必要，请把文件重命名为标准名称：

```bash
# Rename bundle to fullchain.pem
cp XXXXX_bundle.pem fullchain.pem
# Rename private key to privkey.pem
cp XXXXX.key privkey.pem
```

## 2. 确认容器状态

确认容器正在运行：

```bash
docker ps
```

## 3. 把证书复制到容器

把文件从主机传输到容器的临时目录：

```bash
docker cp ./fullchain.pem docker-ragflow-cpu-1:/tmp/fullchain.pem
docker cp ./privkey.pem docker-ragflow-cpu-1:/tmp/privkey.pem
```

## 4. 在容器内部署证书

进入容器的交互式终端：

```bash
docker exec -it docker-ragflow-cpu-1 /bin/bash
```

进入容器后，移动文件并设置合适的权限：

```bash
mkdir -p /etc/nginx/ssl
mv /tmp/fullchain.pem /etc/nginx/ssl/
mv /tmp/privkey.pem /etc/nginx/ssl/

# Set permissions: 644 for public key, 600 for private key
chmod 644 /etc/nginx/ssl/fullchain.pem
chmod 600 /etc/nginx/ssl/privkey.pem
```

## 5. 把 Nginx 切换为 HTTPS 配置

用 HTTPS 模板替换默认的 HTTP 配置：

1. 进入配置目录：`cd /etc/nginx/conf.d/`。
2. 备份原配置：`mv ragflow.conf ragflow.conf.bak`。
3. 启用 HTTPS 模板：`cp /etc/nginx/ragflow.https.conf ./ragflow.conf`。

## 6. 编辑 HTTPS 模板

1. 打开配置文件：`vi ragflow.conf`。
2. 确保 `ssl_certificate` 和 `ssl_certificate_key` 的路径指向你存放在 `/etc/nginx/ssl/` 下的文件。
3. 校验 Nginx 语法：`nginx -t`。

## 7. 应用配置

重新加载 Nginx 使改动生效：

```bash
nginx -s reload
```

如果改动未生效，请退出容器并重启它：

```bash
exit
docker restart docker-ragflow-cpu-1
```

## 配置持久化

:::tip 重要
通过 `docker cp` 和 `docker exec` 做出的改动，在容器被删除或通过 `docker-compose down` 停止后会丢失。
**建议**：测试成功后，把证书保存在主机上，并在 `docker-compose.yaml` 中通过 `volumes` 挂载证书和 `ragflow.conf`，使其持久生效。
:::
