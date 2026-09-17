<BiRow>
<template #en>

Hey there - welcome back to Vector Database 101.

</template>
<template #zh>

嗨，欢迎回到《Vector Database 101》。

</template>
</BiRow>

<BiRow>
<template #en>

In the previous tutorial, we provided a brief introduction to Milvus, Milvus' history, as well as the primary differences between Milvus 1.x and Milvus 2.x. We also took a quick tour of the architecture of Milvus 2.x and helped shine some light on how Milvus' architecture allows it to implement all of the required features of vector databases.

</template>
<template #zh>

在上一篇教程中，我们简要介绍了 Milvus 和它的历史，以及 Milvus 1.x 与 2.x 的主要区别。我们还快速逛了一圈 Milvus 2.x 的架构，并阐明了 Milvus 的架构如何让它实现向量数据库所需的全部功能。

</template>
</BiRow>

<BiRow>
<template #en>

If you haven't read the previous tutorials ([**unstructured data**](https://zilliz.com/learn/introduction-to-unstructured-data), [**vector database**](https://zilliz.com/learn/what-is-vector-database), [**Milvus introduction**](https://zilliz.com/learn/introduction-to-milvus-vector-database)), I recommend you go ahead and read them. If you have, great. Let's get started with Milvus!

</template>
<template #zh>

如果你还没有读过前几篇教程（[**非结构化数据**](https://zilliz.com/learn/introduction-to-unstructured-data)、[**向量数据库**](https://zilliz.com/learn/what-is-vector-database)、[**Milvus 入门**](https://zilliz.com/learn/introduction-to-milvus-vector-database)），建议你先去读一读。如果都读过了，那太好了。我们这就开始玩转 Milvus 吧！

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we look at different deployments, followed with a step-by-step guide for installing your first vector database.

</template>
<template #zh>

在本篇教程中，我们会先看看几种不同的部署方式，随后奉上一份安装你第一个向量数据库的分步指南。

</template>
</BiRow>

<BiRow>
<template #en>

## Let's get started

</template>
<template #zh>

## 开始吧

</template>
</BiRow>

<BiRow>
<template #en>

We offer two different modes of deployment: [standalone](https://milvus.io/docs/v2.1.x/install_standalone-docker.md) and [cluster](https://milvus.io/docs/v2.1.x/install_cluster-docker.md). In Milvus standalone, all nodes - coordinators, worker nodes, and forward-facing proxies - are deployed as a single instance. For persistent data and metadata, Milvus standalone relies on `MinIO` and `etcd`, respectively. In future releases, we hope to eliminate these two third-party dependencies, allowing everything to run in a single process and removing the need to install third-party dependencies.

</template>
<template #zh>

我们提供两种部署模式：[单机版（standalone）](https://milvus.io/docs/v2.1.x/install_standalone-docker.md)和[集群版（cluster）](https://milvus.io/docs/v2.1.x/install_cluster-docker.md)。在 Milvus standalone 中，所有节点——协调器、工作节点和面向前端的 proxy——都部署为单个实例。为了持久化数据和元数据，Milvus standalone 分别依赖 `MinIO` 和 `etcd`。在未来的版本中，我们希望能去掉这两个第三方依赖，让所有组件跑在单个进程里，省去安装第三方依赖的麻烦。

</template>
</BiRow>

<BiRow>
<template #en>

Milvus cluster is our full-fledged version of Milvus, complete with separate instances/pods for all eight microservice components along with three third-party dependencies: `MinIO`, `etcd`, and `Pulsar` (Pulsar serves as the log broker and provides log pub/sub services). If you haven't gotten the chance to take a look at the Milvus overview from the previous slide, please do so! It'll help clarify what each of these third party dependencies is used for and why we've included them in Milvus cluster.

</template>
<template #zh>

Milvus 集群版是 Milvus 的完全体：全部八个微服务组件各自拥有独立的实例/pod，外加三个第三方依赖——`MinIO`、`etcd` 和 `Pulsar`（Pulsar 作为日志代理器，提供日志发布/订阅服务）。如果你还没看过上一篇的 Milvus 概览，强烈建议先去看一看！它会讲清楚每个第三方依赖的用途，以及我们为什么把它们放进 Milvus 集群版。

</template>
</BiRow>

<BiRow>
<template #en>

## Milvus standalone (`docker-compose`)

</template>
<template #zh>

## Milvus standalone（`docker-compose`）

</template>
</BiRow>

<BiRow>
<template #en>

Milvus standalone is meant to be super easy to install. In this section, we'll go over how `docker-compose` can be used to install Milvus. You can view the recommended prerequisites on [Milvus documentation page](https://milvus.io/docs/v2.1.x/prerequisite-docker.md).

</template>
<template #zh>

Milvus standalone 的目标就是做到安装超级简单。本节我们讲讲如何用 `docker-compose` 安装 Milvus。你可以在 [Milvus 文档页](https://milvus.io/docs/v2.1.x/prerequisite-docker.md)查看推荐的前置条件。

</template>
</BiRow>

<BiRow>
<template #en>

Let's first download the [`docker-compose.yml`](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml) configuration file needed for the standalone installation. If you're on any Debian-based Linux (including Ubuntu), you can use the following command:

</template>
<template #zh>

先下载单机版安装所需的 [`docker-compose.yml`](https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml) 配置文件。如果你用的是任何基于 Debian 的 Linux（包括 Ubuntu），可以运行以下命令：

</template>
</BiRow>

<BiRow>
<template #en>

```
wget https://github.com/milvus-io/milvus/releases/download/v2.4.12/milvus-standalone-docker-compose.yml -O docker-compose.yml
sudo docker compose up -d
```

</template>
<template #zh>

```
wget https://github.com/milvus-io/milvus/releases/download/v2.4.12/milvus-standalone-docker-compose.yml -O docker-compose.yml
sudo docker compose up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

```shell
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.108.133, 185.199.111.133, 185.199.109.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.108.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1303 (1.3K) [application/octet-stream]
    Saving to: docker-compose.yml

    docker-compose.yml  100%[===================>]   1.27K  --.-KB/s    in 0s

    2022-06-29 13:58:49 (113 MB/s) - docker-compose.yml saved [1303/1303]
```

</template>
<template #zh>

```shell
    Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.108.133, 185.199.111.133, 185.199.109.133, ...
    Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.108.133|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 1303 (1.3K) [application/octet-stream]
    Saving to: docker-compose.yml

    docker-compose.yml  100%[===================>]   1.27K  --.-KB/s    in 0s

    2022-06-29 13:58:49 (113 MB/s) - docker-compose.yml saved [1303/1303]
```

</template>
</BiRow>

<BiRow>
<template #en>

Alternatively, if you're on MacOS, make sure you have [Docker Desktop](https://docs.docker.com/desktop/mac/install/) installed first. I recommend using `brew`:

</template>
<template #zh>

另外，如果你用的是 MacOS，请先确保装好了 [Docker Desktop](https://docs.docker.com/desktop/mac/install/)。我推荐用 `brew`：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% brew install --cask docker
```

</template>
<template #zh>

```shell
% brew install --cask docker
```

</template>
</BiRow>

<BiRow>
<template #en>

You can then follow this up with the command below:

</template>
<template #zh>

然后接着运行下面的命令：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% curl https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -o docker-compose.yml
```

</template>
<template #zh>

```shell
% curl https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -o docker-compose.yml
```

</template>
</BiRow>

<BiRow>
<template #en>

With everything ready, we can now spin up our Milvus standalone instance:

</template>
<template #zh>

一切就绪，现在可以启动我们的 Milvus standalone 实例了：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ docker-compose up -d
```

</template>
<template #zh>

```shell
$ docker-compose up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

Docker Compose is now in the Docker CLI, try `docker compose up`

</template>
<template #zh>

Docker Compose 现已并入 Docker CLI，可以试试 `docker compose up`

</template>
</BiRow>

<BiRow>
<template #en>

```shell
    Creating milvus-etcd  ... done
    Creating milvus-minio ... done
    Creating milvus-standalone ... done
```

</template>
<template #zh>

```shell
    Creating milvus-etcd  ... done
    Creating milvus-minio ... done
    Creating milvus-standalone ... done
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, we can check on the status of our containers

</template>
<template #zh>

现在，我们可以看看容器的状态：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ docker ps -a
```

</template>
<template #zh>

```shell
$ docker ps -a
```

</template>
</BiRow>

<BiRow>
<template #en>

```shell
    CONTAINER ID   IMAGE                                      COMMAND                  CREATED          STATUS                    PORTS                      NAMES
    711d54ab15c7   milvusdb/milvus:v2.0.2                     "/tini -- milvus run…"   42 seconds ago   Up 40 seconds             0.0.0.0:19530->19530/tcp   milvus-standalone
    0d85f4927864   minio/minio:RELEASE.2020-12-03T00-03-10Z   "/usr/bin/docker-ent…"   42 seconds ago   Up 40 seconds (healthy)   9000/tcp                   milvus-minio
    99de39278b35   quay.io/coreos/etcd:v3.5.0                 "etcd -advertise-cli…"   42 seconds ago   Up 40 seconds             2379-2380/tcp              milvus-etcd
```

</template>
<template #zh>

```shell
    CONTAINER ID   IMAGE                                      COMMAND                  CREATED          STATUS                    PORTS                      NAMES
    711d54ab15c7   milvusdb/milvus:v2.0.2                     "/tini -- milvus run…"   42 seconds ago   Up 40 seconds             0.0.0.0:19530->19530/tcp   milvus-standalone
    0d85f4927864   minio/minio:RELEASE.2020-12-03T00-03-10Z   "/usr/bin/docker-ent…"   42 seconds ago   Up 40 seconds (healthy)   9000/tcp                   milvus-minio
    99de39278b35   quay.io/coreos/etcd:v3.5.0                 "etcd -advertise-cli…"   42 seconds ago   Up 40 seconds             2379-2380/tcp              milvus-etcd
```

</template>
</BiRow>

<BiRow>
<template #en>

Here's a quick rundown of what each of the containers are doing. `milvus-standalone` is the compiled/compressed version of Milvus, mean to run on a single machine.

</template>
<template #zh>

简单过一下每个容器在干什么：`milvus-standalone` 是 Milvus 编译/压缩后的版本，设计为在单机上运行。

</template>
</BiRow>

<BiRow>
<template #en>

To stop Milvus standalone, run:

</template>
<template #zh>

要停止 Milvus standalone，运行：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ docker-compose down
```

</template>
<template #zh>

```shell
$ docker-compose down
```

</template>
</BiRow>

<BiRow>
<template #en>

And that's it for Milvus standalone! Easy, right?

</template>
<template #zh>

Milvus standalone 就到这里！很简单，对吧？

</template>
</BiRow>

<BiRow>
<template #en>

## Milvus standalone (`apt`)

</template>
<template #zh>

## Milvus standalone（`apt`）

</template>
</BiRow>

<BiRow>
<template #en>

We also provide a handy `apt` package for Debian-based distributions. Simply run:

</template>
<template #zh>

我们还为基于 Debian 的发行版提供了一个好用的 `apt` 包。只需运行：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

</template>
<template #zh>

```shell
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:milvusdb/milvus
$ sudo apt update
$ sudo apt install milvus
```

</template>
</BiRow>

<BiRow>
<template #en>

Once that's done, you're good to go. You can check the status of the running services with:

</template>
<template #zh>

跑完之后，你就准备就绪了。可以用下面的命令检查各服务的运行状态：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

</template>
<template #zh>

```shell
$ sudo systemctl status milvus
$ sudo systemctl status milvus-etcd
$ sudo systemctl status milvus-minio
```

</template>
</BiRow>

<BiRow>
<template #en>

## Milvus cluster

</template>
<template #zh>

## Milvus 集群

</template>
</BiRow>

<BiRow>
<template #en>

From the previous tutorial, we know that Milvus is composed of four primary components: the access layer, coordinator service, worker nodes, and object storage. Requests are sent to a cluster of proxies in the access layer, which then forwards the requests to either the coordinator layer or a streaming service for vector data. The stateful coordinator nodes within the coordinator service manage and control all of the stateless worker nodes, allowing for easy horizontal scaling. Object storage is accomplished via S3 or any "S3-like" storage layer, allowing Milvus to be run both in the cloud and on-premises via MinIO.

</template>
<template #zh>

从上一篇教程我们知道，Milvus 由四大核心组件组成：接入层、协调服务、工作节点和对象存储。请求先发给接入层的一组 proxy，再由 proxy 转发给协调层，或转发给面向向量数据的流式服务。协调服务中有状态的协调器节点管理和控制所有无状态的工作节点，从而轻松实现水平扩展。对象存储通过 S3 或任何「类 S3」存储层实现，让 Milvus 既能跑在云端，也能通过 MinIO 跑在本地。

</template>
</BiRow>

<BiRow>
<template #en>

Milvus' remaining third-party dependencies, Pulsar/Kafka and etcd, are also distributed and cloud-native, allowing the entirety of Milvus to run via Kubernetes as an orchestration engine. Using [Kubernetes](https://github.com/kubernetes/kubernetes) is a no-brainer for nearly all distributed applications, as it provides out-of-the-box support for application deployment, maintanence, and scaling. We recommend deploying Milvus as a Kubernetes application via [Helm](https://helm.sh/):

</template>
<template #zh>

Milvus 其余的第三方依赖——Pulsar/Kafka 和 etcd——同样是分布式、云原生的，因此整套 Milvus 可以用 Kubernetes 作为编排引擎来运行。对几乎所有分布式应用来说，使用 [Kubernetes](https://github.com/kubernetes/kubernetes) 都是理所当然的选择，它为应用部署、维护和扩缩提供了开箱即用的支持。我们推荐通过 [Helm](https://helm.sh/) 把 Milvus 作为 Kubernetes 应用部署：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% helm repo add milvus https://milvus-io.github.io/milvus-helm/

"milvus" has been added to your repositories
```

</template>
<template #zh>

```shell
% helm repo add milvus https://milvus-io.github.io/milvus-helm/

"milvus" has been added to your repositories
```

</template>
</BiRow>

<BiRow>
<template #en>

Now, let's grab the latest Milvus chart from the `milvus-io/milvus-helm` repository.

</template>
<template #zh>

现在，从 `milvus-io/milvus-helm` 仓库拉取最新的 Milvus chart：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% helm repo update
```

</template>
<template #zh>

```shell
% helm repo update
```

</template>
</BiRow>

<BiRow>
<template #en>

```shell
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "milvus" chart repository
    Update Complete. Happy Helming
```

</template>
<template #zh>

```shell
    Hang tight while we grab the latest from your chart repositories...
    ...Successfully got an update from the "milvus" chart repository
    Update Complete. Happy Helming
```

</template>
</BiRow>

<BiRow>
<template #en>

Great. Now that we've gotten all of the dependencies out of the way, let's install Milvus (cluster)!

</template>
<template #zh>

很好。现在依赖都解决了，来安装 Milvus（集群版）吧！

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% helm install my-release milvus/milvus
```

</template>
<template #zh>

```shell
% helm install my-release milvus/milvus
```

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

With this done, we can now see the pods that are up and running via `kubectl`:

</template>
<template #zh>

搞定之后，我们就可以通过 `kubectl` 查看正在运行的 pod 了：

</template>
</BiRow>

<BiRow>
<template #en>

```shell
$ kubectl get pods
```

</template>
<template #zh>

```shell
$ kubectl get pods
```

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

That's it! You now have Milvus installed directly on your on-premises cluster. Check out our next tutorial to see how to create a collection within Milvus and begin inserting and querying embeddings.

</template>
<template #zh>

就是这样！你现在已经把 Milvus 直接装在了本地（on-premises）集群上。去看看我们的下一篇教程，学习如何在 Milvus 中创建 collection（相当于关系型数据库中的表），并开始插入和查询嵌入向量（embedding）吧。

</template>
</BiRow>

<BiRow>
<template #en>

If you're interested in running Milvus on cloud infrastructure check out the [Milvus standalone on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-hzmmt4xyvi7ei).

</template>
<template #zh>

如果你有兴趣在云基础设施上运行 Milvus，可以看看 [AWS Marketplace 上的 Milvus standalone](https://aws.amazon.com/marketplace/pp/prodview-hzmmt4xyvi7ei)。

</template>
</BiRow>

<BiRow>
<template #en>

## Wrapping up

</template>
<template #zh>

## 收尾

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we took a look at how to install the standalone version of Milvus (via `docker-compose`) and the cluster version of Milvus (via `helm`). The standalone version is suitable for testing purposes, while the cluster version is suitable for internal clusters or on-premises deployments. In the next tutorial, we'll look at basic Milvus operations: connecting to a Milvus server, creating a collection (equivalent to a table in relational databases), creating a partition within the collection, inserting embedding vector data, and conducting a vector search.

</template>
<template #zh>

在本篇教程中，我们学习了如何安装 Milvus 单机版（通过 `docker-compose`）和 Milvus 集群版（通过 `helm`）。单机版适合测试用途，集群版则适合内部集群或本地部署。在下一篇教程中，我们将学习 Milvus 的基本操作：连接 Milvus 服务器、创建 collection（相当于关系型数据库中的表）、在 collection 中创建 partition（分区）、插入嵌入向量数据，以及执行向量搜索。

</template>
</BiRow>

<BiRow>
<template #en>

See you in the next couple of tutorials.

</template>
<template #zh>

接下来几篇教程见！

</template>
</BiRow>
