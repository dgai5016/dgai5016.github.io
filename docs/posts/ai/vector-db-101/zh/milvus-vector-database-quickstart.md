# Milvus 快速上手：5 分钟安装 Milvus 向量数据库

嗨，欢迎回到《Vector Database 101》。

在上一篇教程中，我们简要介绍了 Milvus 和它的历史，以及 Milvus 1.x 与 2.x 的主要区别。我们还快速逛了一圈 Milvus 2.x 的架构，并阐明了 Milvus 的架构如何让它实现向量数据库所需的全部功能。

如果你还没有读过前几篇教程（[**非结构化数据**](https://zilliz.com/learn/introduction-to-unstructured-data)、[**向量数据库**](https://zilliz.com/learn/what-is-vector-database)、[**Milvus 入门**](https://zilliz.com/learn/introduction-to-milvus-vector-database)），建议你先去读一读。如果都读过了，那太好了。我们这就开始玩转 Milvus 吧！

在本篇教程中，我们会先看看几种不同的部署方式，随后奉上一份安装你第一个向量数据库的分步指南。

## 开始吧

我们提供两种部署模式：[单机版（standalone）](https://milvus.io/docs/v2.1.x/install_standalone-docker.md)和[集群版（cluster）](https://milvus.io/docs/v2.1.x/install_cluster-docker.md)。在 Milvus standalone 中，所有节点——协调器、工作节点和面向前端的 proxy——都部署为单个实例。为了持久化数据和元数据，Milvus standalone 分别依赖 `MinIO` 和 `etcd`。在未来的版本中，我们希望能去掉这两个第三方依赖，让所有组件跑在单个进程里，省去安装第三方依赖的麻烦。

Milvus 集群版是 Milvus 的完全体：全部八个微服务组件各自拥有独立的实例/pod，外加三个第三方依赖——`MinIO`、`etcd` 和 `Pulsar`（Pulsar 作为日志代理器，提供日志发布/订阅服务）。如果你还没看过上一篇的 Milvus 概览，强烈建议先去看一看！它会讲清楚每个第三方依赖的用途，以及我们为什么把它们放进 Milvus 集群版。

## Milvus standalone（`docker-compose`）

Milvus standalone 的目标就是做到安装超级简单。本节我们讲讲如何用 `docker-compose` 安装 Milvus。你可以在 [Milvus 文档页](https://milvus.io/docs/v2.1.x/prerequisite-docker.md)查看推荐的前置条件。

先下载单机版安装所需的 [`docker-compose.yml`](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml) 配置文件。如果你用的是任何基于 Debian 的 Linux（包括 Ubuntu），可以运行以下命令：

```
wget https://github.com/milvus-io/milvus/releases/download/v2.4.12/milvus-standalone-docker-compose.yml -O docker-compose.yml
sudo docker compose up -d
```

```shell
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.108.133, 185.199.111.133, 185.199.109.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.108.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1303 (1.3K) [application/octet-stream]
    Saving to: docker-compose.yml

    docker-compose.yml  100%[===================>]   1.27K  --.-KB/s    in 0s

    2022-06-29 13:58:49 (113 MB/s) - docker-compose.yml saved [1303/1303]
```

另外，如果你用的是 MacOS，请先确保装好了 [Docker Desktop](https://docs.docker.com/desktop/mac/install/)。我推荐用 `brew`：

```shell
% brew install --cask docker
```

然后接着运行下面的命令：

```shell
% curl https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -o docker-compose.yml
```

一切就绪，现在可以启动我们的 Milvus standalone 实例了：

```shell
$ docker-compose up -d
```

Docker Compose 现已并入 Docker CLI，可以试试 `docker compose up`

```shell
    Creating milvus-etcd  ... done
    Creating milvus-minio ... done
    Creating milvus-standalone ... done
```

现在，我们可以看看容器的状态：

```shell
$ docker ps -a
```

```shell
    CONTAINER ID   IMAGE                                      COMMAND                  CREATED          STATUS                    PORTS                      NAMES
    711d54ab15c7   milvusdb/milvus:v2.0.2                     "/tini -- milvus run…"   42 seconds ago   Up 40 seconds             0.0.0.0:19530->19530/tcp   milvus-standalone
    0d85f4927864   minio/minio:RELEASE.2020-12-03T00-03-10Z   "/usr/bin/docker-ent…"   42 seconds ago   Up 40 seconds (healthy)   9000/tcp                   milvus-minio
    99de39278b35   quay.io/coreos/etcd:v3.5.0                 "etcd -advertise-cli…"   42 seconds ago   Up 40 seconds             2379-2380/tcp              milvus-etcd
```

简单过一下每个容器在干什么：`milvus-standalone` 是 Milvus 编译/压缩后的版本，设计为在单机上运行。

要停止 Milvus standalone，运行：

```shell
$ docker-compose down
```

Milvus standalone 就到这里！很简单，对吧？

## Milvus standalone（`apt`）

我们还为基于 Debian 的发行版提供了一个好用的 `apt` 包。只需运行：

```shell
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

跑完之后，你就准备就绪了。可以用下面的命令检查各服务的运行状态：

```shell
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

## Milvus 集群

从上一篇教程我们知道，Milvus 由四大核心组件组成：接入层、协调服务、工作节点和对象存储。请求先发给接入层的一组 proxy，再由 proxy 转发给协调层，或转发给面向向量数据的流式服务。协调服务中有状态的协调器节点管理和控制所有无状态的工作节点，从而轻松实现水平扩展。对象存储通过 S3 或任何「类 S3」存储层实现，让 Milvus 既能跑在云端，也能通过 MinIO 跑在本地。

Milvus 其余的第三方依赖——Pulsar/Kafka 和 etcd——同样是分布式、云原生的，因此整套 Milvus 可以用 Kubernetes 作为编排引擎来运行。对几乎所有分布式应用来说，使用 [Kubernetes](https://github.com/kubernetes/kubernetes) 都是理所当然的选择，它为应用部署、维护和扩缩提供了开箱即用的支持。我们推荐通过 [Helm](https://helm.sh/) 把 Milvus 作为 Kubernetes 应用部署：

```shell
% helm repo add milvus https://milvus-io.github.io/milvus-helm/

"milvus" has been added to your repositories
```

现在，从 `milvus-io/milvus-helm` 仓库拉取最新的 Milvus chart：

```shell
% helm repo update
```

```shell
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "milvus" chart repository
    Update Complete. Happy Helming
```

很好。现在依赖都解决了，来安装 Milvus（集群版）吧！

```shell
% helm install my-release milvus/milvus
```

```shell
    W0629 16:01:00.674407   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.676536   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.678594   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.680671   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.808448   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.809339   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.809344   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    W0629 16:01:00.809594   21803 warnings.go:70 policy/v1beta1 PodDisruptionBudget is deprecated in v1.21+, unavailable in v1.25+; use policy/v1 PodDisruptionBudget
    NAME: my-release
    LAST DEPLOYED: Wed Jun 29 16:01:00 2022
    NAMESPACE: default
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
```

搞定之后，我们就可以通过 `kubectl` 查看正在运行的 pod 了：

```shell
$ kubectl get pods
```

```shell
    NAME                                             READY  STATUS   RESTARTS  AGE
    my-release-etcd-0                                1/1    Running   0        2m23s
    my-release-etcd-1                                1/1    Running   0        2m23s
    my-release-etcd-2                                1/1    Running   0        2m23s
    my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        2m23s
    my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        2m23s
    my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        2m23s
    my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        2m24s
    my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        2m24s
    my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        2m24s
    my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        2m24s
    my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        2m23s
    my-release-minio-0                               1/1    Running   0        2m23s
    my-release-minio-1                               1/1    Running   0        2m23s
    my-release-minio-2                               1/1    Running   0        2m23s
    my-release-minio-3                               1/1    Running   0        2m23s
    my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        2m24s
    my-release-pulsar-bookkeeper-0                   1/1    Running   0        2m23s
    my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
    my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        2m23s
    my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        2m23s
    my-release-pulsar-zookeeper-0                    1/1    Running   0        2m23s
    my-release-pulsar-zookeeper-metadata-98zbr       1/1   Completed  0        2m24s
```

就是这样！你现在已经把 Milvus 直接装在了本地（on-premises）集群上。去看看我们的下一篇教程，学习如何在 Milvus 中创建 collection（相当于关系型数据库中的表），并开始插入和查询嵌入向量（embedding）吧。

如果你有兴趣在云基础设施上运行 Milvus，可以看看 [AWS Marketplace 上的 Milvus standalone](https://aws.amazon.com/marketplace/pp/prodview-hzmmt4xyvi7ei)。

## 收尾

在本篇教程中，我们学习了如何安装 Milvus 单机版（通过 `docker-compose`）和 Milvus 集群版（通过 `helm`）。单机版适合测试用途，集群版则适合内部集群或本地部署。在下一篇教程中，我们将学习 Milvus 的基本操作：连接 Milvus 服务器、创建 collection（相当于关系型数据库中的表）、在 collection 中创建 partition（分区）、插入嵌入向量数据，以及执行向量搜索。

接下来几篇教程见！
