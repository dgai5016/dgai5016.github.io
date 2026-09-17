<BiRow>
<template #en>

Welcome to Vector Database 101.

</template>
<template #zh>

欢迎来到《Vector Database 101》。

</template>
</BiRow>

<BiRow>
<template #en>

## Introduction

</template>
<template #zh>

## 引言

</template>
</BiRow>

<BiRow>
<template #en>

This is the first tutorial in the course *[Vector Database 101](https://zilliz.com/blog?tag=39&page=1)*, and will be mostly a text-based overview of *unstructured data*. I know, this doesn't sound like a very sexy topic, but before you press that little **x** button on your browser tab, hear us out.

</template>
<template #zh>

这是《[Vector Database 101](https://zilliz.com/blog?tag=39&page=1)》课程的第一篇教程，主要内容是以文字形式概述*非结构化数据*。我知道，这听起来不是个多么「性感」的话题，但在你按下浏览器标签页上那个小小的 **x** 之前，请先听我们说完。

</template>
</BiRow>

<BiRow>
<template #en>

New data is being generated every day, and is undoubtedly a key driver of both worldwide integration as well as the global economy. From heart rate monitors worn on wrists generating sensor data to GPS positions of a vehicle fleet to videos uploaded to social media, data is being generated at an exponentially increasing rate. The importance of this ever-increasing amount of data cannot be understated; data can help better serve existing customers, identify supply chain weaknesses, pinpoint workforce inefficiencies, and help companies identify and break into new markets, all factors that can enable a company (and you) to generate more revenue.

</template>
<template #zh>

新数据每天都在产生，它无疑是全球一体化和全球经济的关键驱动力。从手腕上心率监测器产生的传感器数据，到车队的 GPS 定位，再到上传到社交媒体的视频，数据正以指数级的速度增长。这批不断增长的数据有多重要，怎么强调都不为过：数据能帮助企业更好地服务现有客户、发现供应链的薄弱环节、定位人员效率的短板，还能帮企业发现并打入新市场——这一切都可能让一家公司（以及你）获得更多收入。

</template>
</BiRow>

<BiRow>
<template #en>

Not convinced yet? International Data Corporation - also known as *IDC* - predicts that the *global datasphere* - a measure of the total amount of new data created and stored on persistent storage all around the world - will grow to 400 zettabytes (a zettabyte = $10 ^ {21}$ bytes) by 2028. At that time, over 30% of said data will be generated in real-time, while 80% of all generated data will be *unstructured data*.

</template>
<template #zh>

还不信？国际数据公司（International Data Corporation，也叫 *IDC*）预测，*全球数据圈*（global datasphere——衡量全球新创建并存储到持久存储介质上的数据总量）到 2028 年将增长到 400 泽字节（1 泽字节 = $10 ^ {21}$ 字节）。届时，超过 30% 的数据将实时产生，而全部产生的数据中将有 80% 是*非结构化数据*。

</template>
</BiRow>

<BiRow>
<template #en>

## Structured/ semi-structured/ unstructured data definition

</template>
<template #zh>

## 结构化、半结构化与非结构化数据的定义

</template>
</BiRow>

<BiRow>
<template #en>

So what exactly is [unstructured data](https://zilliz.com/glossary/unstructured-data)? As the name suggests, unstructured data refers to data that cannot be stored in a pre-defined format or fit into an existing data model. Human-generated data - images, video, audio, text files, etc - are great examples of unstructured data. But there are a variety of less mundane examples of unstructured data too. Protein structures, executable file hashes, and even human-readable code are three of a near-infinite set of examples of unstructured data.

</template>
<template #zh>

那[非结构化数据](https://zilliz.com/glossary/unstructured-data)到底是什么？顾名思义，非结构化数据指那些无法按预定义格式存储、也无法塞进现有数据模型的数据。人类产生的数据——图片、视频、音频、文本文件等——是典型的非结构化数据。但非结构化数据的例子远不止这些日常形态：蛋白质结构、可执行文件的哈希值，甚至人类可读的代码，都只是近乎无穷的例子集合中的三个。

</template>
</BiRow>

<BiRow>
<template #en>

Structured data, on the other hand, refers to data that can be stored in a table-based format, while semi-structured data refers to data that can be stored in single- or multi-level array/key-value stores. If none of this makes sense to you yet, don't fret. Bear with us and we'll provide examples to help solidify your understanding of the key differences between stuctured and unstructured data.

</template>
<template #zh>

相对地，结构化数据指可以按表格形式存储的数据；半结构化数据则指可以存储在单层或多层数组、键值对结构中的数据。如果这些定义现在还让你一头雾水，别急。跟着我们往下走，我们会用例子帮你把结构化与非结构化数据的关键区别搞扎实。

</template>
</BiRow>

<BiRow>
<template #en>

## Some concrete examples of structured data

</template>
<template #zh>

## 结构化数据的具体例子

</template>
</BiRow>

<BiRow>
<template #en>

Still with us? Excellent - let's start by briefly describing structured/semi-structured data. In the simplest terms, traditional structured data can be stored via a relational model. Take, for example, a book database:

</template>
<template #zh>

还跟得上？很好——先简要讲讲结构化/半结构化数据。用最简单的话说，传统结构化数据可以通过关系模型来存储。拿一个图书数据库举例：

</template>
</BiRow>

<BiRow>
<template #en>

| ISBN | Year | Name | Author |
| --- | --- | --- | --- |
| 0767908171 | 2003 | A Short History of Nearly Everything | Bill Bryson |
| 039516611X | 1962 | Silent Spring | Rachel Carson |
| 0374332657 | 1998 | Holes | Louis Sachar |
| ... |  |  |  |

</template>
<template #zh>

| ISBN | 年份 | 书名 | 作者 |
| --- | --- | --- | --- |
| 0767908171 | 2003 | A Short History of Nearly Everything | Bill Bryson |
| 039516611X | 1962 | Silent Spring | Rachel Carson |
| 0374332657 | 1998 | Holes | Louis Sachar |
| ... |  |  |  |

</template>
</BiRow>

<BiRow>
<template #en>

<sub>Ahh, _Holes_. Brings back childhood memories.</sub>

</template>
<template #zh>

<sub>啊哈，*Holes*。童年的回忆一下子涌上来了。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

In the example above, each row within the database represents a particular book (indexed by ISBN number), while the columns denote the corresponding category of information. Databases built on top of the relational model allow for multiple tables, each of which has its own unique set of columns. These tables are formally known as *relations*, but we'll just call them tables to avoid confusing databases with friends and family members. Two of the most popular and well-known examples of relational databases are *MySQL* (released in 1995) and *PostgreSQL* (released in 1996).

</template>
<template #zh>

在上表的例子里，数据库中每一行代表一本书（以 ISBN 编号作索引），每一列则对应一类信息。基于关系模型构建的数据库可以有多个表，每个表都有自己独立的列集合。这些表在正式场合叫「关系」（relation），但为了避免把数据库和你的朋友家人（relationship）搅在一起，我们还是直接叫它们「表」。最有名、最广为人知的两个关系数据库例子是 *MySQL*（1995 年发布）和 *PostgreSQL*（1996 年发布）。

</template>
</BiRow>

<BiRow>
<template #en>

Semi-structured data is the subset of structured data that does not conform to the traditional table-based model. Instead, semi-structured data usually comes with keys or markers which can be used to describe and index the data. Going back to the example of a book database, we can expand it to a semi-structured JSON format as so:

</template>
<template #zh>

半结构化数据是结构化数据中不符合传统表格模型的那部分。它通常自带可用于描述和索引数据的键或标记。还是图书数据库的例子，我们可以把它扩展成半结构化的 JSON 格式：

</template>
</BiRow>

<BiRow>
<template #en>

```
{
  ISBN: 0767908171
  Month: February
  Year: 2003
  Name: A Short History of Nearly Everything
  Author: Bill Bryson
  Tags: geology, biology, physics
},
{
  ISBN: 039516611X
  Name: Silent Spring
  Author: Rachel Carson
},
{
  ISBN: 0374332657
  Year: 1998
  Name: Holes
  Author: Louis Sachar
},
...
```

</template>
<template #zh>

```
{
  ISBN: 0767908171
  Month: February
  Year: 2003
  Name: A Short History of Nearly Everything
  Author: Bill Bryson
  Tags: geology, biology, physics
},
{
  ISBN: 039516611X
  Name: Silent Spring
  Author: Rachel Carson
},
{
  ISBN: 0374332657
  Year: 1998
  Name: Holes
  Author: Louis Sachar
},
...
```

</template>
</BiRow>

<BiRow>
<template #en>

Note how the first element in our new JSON database now contains `Months` and `Tags` as two extra pieces of information, without impacting the two subsequent elements. With semi-structured data, this can be done without the extra overhead of two additional columns for all elements, thereby allowing for greater flexibility.

</template>
<template #zh>

注意，新的 JSON 数据库里，第一个元素现在多了 `Months` 和 `Tags` 两项信息，而后面的两个元素完全不受影响。半结构化数据玩这一手，不用给所有元素都背上两个额外列的开销，从而带来了更大的灵活性。

</template>
</BiRow>

<BiRow>
<template #en>

Semi-structured data is typically stored in a *NoSQL database* (wide-column store, object/document database, key-value store, etc), as their non-tabular nature prevents direct use in a relational database. *Cassandra* (released in 2008), *MongoDB* (released in 2009), and *Redis* (released in 2009) are three of the most popular databases for semi-structured data today. Note how these popular databases for semi-structured data were released a little over a decade after popular databases for structured data - keep this in mind as we'll get to it later.

</template>
<template #zh>

半结构化数据通常存储在 *NoSQL 数据库*（宽列存储、对象/文档数据库、键值存储等）中，因为它非表格的天性使其无法直接用于关系数据库。*Cassandra*（2008 年发布）、*MongoDB*（2009 年发布）和 *Redis*（2009 年发布）是当今最流行的三个半结构化数据库。注意，这些流行的半结构化数据库比流行的结构化数据库晚了十年左右才发布——记住这一点，后面会用到。

</template>
</BiRow>

<BiRow>
<template #en>

## A paradigm shift — Unstructured Data Definition

</template>
<template #zh>

## 范式转变——非结构化数据的定义

</template>
</BiRow>

<BiRow>
<template #en>

Now that we have a solid understanding of structured/semi-structured data, let's move to talking about unstructured data. Unlike structured/semi-structured data, unstructured data can take any form, be of an arbitrarily large or small size on disk, and can require vastly different runtimes to transform and index. Let's take images as an example: three front-facing successive images of the same German Shepherd are *semantically the same*.

</template>
<template #zh>

现在我们对结构化/半结构化数据有了扎实的理解，来聊聊非结构化数据。与结构化/半结构化数据不同，非结构化数据可以取任意形态，在磁盘上的大小可大可小，转换和索引所需的运行时也千差万别。拿图片举例：同一只德国牧羊犬的三张连续正面照，在*语义上是相同的*。

</template>
</BiRow>

<BiRow>
<template #en>

*Semantically the same*? What on earth does that mean? Let's dive a bit deeper and unpack the idea of *semantic similarity*. Although these three photos may have vastly different pixel values, resolutions, file sizes, etc, all three photos are of the same German Shepherd in the same environment. Think about it - all three photos have identical or near-identical content but significantly different raw pixel values. This poses a new challenge for industries and companies that use data<sup>1</sup>: how can we transform, store, and search unstructured data in a similar fashion to structured/semi-structured data?

</template>
<template #zh>

「语义上相同」？这到底是什么意思？我们深挖一下*语义相似性*这个概念。尽管这三张照片的像素值、分辨率、文件大小可能天差地别，但三张拍的都是同一环境里的同一只德国牧羊犬。想想看——三张照片的内容完全相同（或几乎相同），原始像素值却截然不同。这给使用数据的各行业和各公司<sup>1</sup>出了一道新题：怎样才能像处理结构化/半结构化数据那样，对非结构化数据进行转换、存储和搜索？

</template>
</BiRow>

<BiRow>
<template #en>

At this point, you're probably wondering: how can we search and analyze unstructured data if it has no fixed size or format? The answer: machine learning (or more specifically, deep learning). In the past decade, the combination of big data and deep neural networks has fundamentally changed the way we approach data-driven applications; tasks ranging from spam email detection to realistic text-to-video synthesis have seen incredible strides, with accuracy metrics on certain tasks reaching superhuman levels. This may sound scary (hello, Skynet), but we're still many decades away from Elon Musk's vision of AI taking over the world.

</template>
<template #zh>

说到这儿，你可能在想：既然非结构化数据没有固定的大小和格式，我们到底怎么搜索和分析它？答案是：机器学习（更准确地说，深度学习）。过去十年，大数据与深度神经网络的结合从根本上改变了我们做数据驱动应用的方式；从垃圾邮件检测到逼真的文本到视频合成，各类任务都取得了惊人的进展，某些任务的准确率指标已经达到超人水平。这听起来可能有点吓人（你好啊，天网），但距离埃隆·马斯克设想的「AI 接管世界」还有几十年呢。

</template>
</BiRow>

<BiRow>
<template #en>

<sup>1</sup><sub>In essence, this is all industries, all companies, and all individuals. Including you!</sub>

</template>
<template #zh>

<sup>1</sup><sub>本质上，这里说的是所有行业、所有公司、所有个人——包括你！</sub>

</template>
</BiRow>

<BiRow>
<template #en>

### Examples of Unstructured data

</template>
<template #zh>

### 非结构化数据的例子

</template>
</BiRow>

<BiRow>
<template #en>

Unstructured data can be generated by machines or by humans.
Machine-generated unstructured data examples include:

</template>
<template #zh>

非结构化数据既可以由机器产生，也可以由人类产生。
机器产生的非结构化数据包括：

</template>
</BiRow>

<BiRow>
<template #en>

- Sensor data: Data collected from sensors, such as temperature sensors, humidity sensors, GPS sensors, and motion sensors.
- Machine log data: Data generated by machines, devices, or applications, including system logs, application logs, and event logs.
- Internet of Things (IoT) data: Data collected from smart devices, such as smart thermostats, smart home assistants, and wearable devices.
- Computer vision data: This is unstructured data generated by computer vision technologies, such as image recognition, object detection, and video analysis.
- Natural Language Processing (NLP) data: This is data generated by NLP technologies, such as speech recognition, language translation, and sentiment analysis.
- Web and application data: Data generated by web servers, web applications, and mobile applications, including user behavior data, error logs, and application performance data.

</template>
<template #zh>

- 传感器数据：从传感器采集的数据，如温度传感器、湿度传感器、GPS 传感器和运动传感器。
- 机器日志数据：由机器、设备或应用程序产生的数据，包括系统日志、应用日志和事件日志。
- 物联网（IoT）数据：从智能设备采集的数据，如智能恒温器、智能家居助手和可穿戴设备。
- 计算机视觉数据：由计算机视觉技术产生的非结构化数据，如图像识别、目标检测和视频分析。
- 自然语言处理（NLP）数据：由 NLP 技术产生的数据，如语音识别、语言翻译和情感分析。
- 网络与应用数据：由 Web 服务器、Web 应用和移动应用产生的数据，包括用户行为数据、错误日志和应用性能数据。

</template>
</BiRow>

<BiRow>
<template #en>

Examples of human-generated unstructured data include:

</template>
<template #zh>

人类产生的非结构化数据包括：

</template>
</BiRow>

<BiRow>
<template #en>

- Emails: Email messages are often unstructured and can contain free-form text, images, and attachments.
- Text messages: Text messages can be informal, unstructured, and contain abbreviations or emojis.
- Social media posts: Social media posts can vary in structure and content, including text, images, videos, and hashtags.
- Audio recordings: Human-generated audio recordings can include phone calls, voicemails, audio files and audio notes are unstructured data.
- Handwritten notes: Handwritten notes can be unstructured and contain drawings, diagrams, and other visual elements.
- Meeting notes: Meeting notes can contain unstructured text, diagrams, and action items.
- Transcripts: Transcripts of speeches, interviews, and meetings can contain unstructured text with varying degrees of accuracy.
- User-generated content: User-generated content on websites and forums can be unstructured data and include free-form text, images, and video files.

</template>
<template #zh>

- 电子邮件：邮件通常是非结构化的，可能包含自由格式的文本、图片和附件。
- 短信：短信可以是非正式、非结构化的，还常带缩写或表情符号。
- 社交媒体帖子：社交媒体帖子的结构和内容千变万化，包括文本、图片、视频和话题标签。
- 音频录音：人类产生的音频录音包括通话、语音留言，音频文件和语音便签也都是非结构化数据。
- 手写笔记：手写笔记可以是非结构化的，包含涂鸦、示意图和其他视觉元素。
- 会议记录：会议记录可能包含非结构化文本、示意图和行动项。
- 转录文本：演讲、访谈和会议的转录文本可能包含准确度参差不齐的非结构化文本。
- 用户生成内容：网站和论坛上的用户生成内容可以是非结构化数据，包括自由格式的文本、图片和视频文件。

</template>
</BiRow>

<BiRow>
<template #en>

## A crash course on embeddings

</template>
<template #zh>

## 嵌入向量速成课

</template>
</BiRow>

<BiRow>
<template #en>

Let's get back on track. The vast majority of neural network models are capable of turning a single piece of unstructured data into a list of floating point values, also known more commonly as an *embeddings* or *embedding vectors*. As it turns out, a properly trained neural network can output embeddings that represent the semantic content of the image<sup>2</sup>. In a future tutorial, we'll go over a [vector database](https://zilliz.com/learn/what-is-vector-database) use case that uses a pre-determined algorithm to generate embeddings.

</template>
<template #zh>

言归正传。绝大多数神经网络模型都能把一条非结构化数据转换成一列浮点数，更常见的叫法是*嵌入向量*（embedding / embedding vector）。事实证明，训练得当的神经网络输出的嵌入向量能够表示图像的语义内容<sup>2</sup>。在后续教程里，我们会讲一个[向量数据库](https://zilliz.com/learn/what-is-vector-database)的实战案例——用预先确定的算法生成嵌入向量。

</template>
</BiRow>

<BiRow>
<template #en>

![An Eastern Towhee. Photo by Patrice Bouchard.](/vector-db-images/introduction-to-unstructured-data-01.png)
    An Eastern Towhee. Photo by [Patrice Bouchard](https://unsplash.com/photos/CcmxhowdIFc).

</template>
<template #zh>

![An Eastern Towhee. Photo by Patrice Bouchard.](/vector-db-images/introduction-to-unstructured-data-01.png)
    一只东部红眼雀（Eastern Towhee）。照片由 [Patrice Bouchard](https://unsplash.com/photos/CcmxhowdIFc) 拍摄。

</template>
</BiRow>

<BiRow>
<template #en>

The photo above provides an example of transforming a piece of unstructured data into a vector. With the preeminent ResNet-50 convolutional neural network, this image can be represented as a vector of length 2048 - here are the first three and last three elements: `[0.1392, 0.3572, 0.1988, ..., 0.2888, 0.6611, 0.2909]`. Embeddings generated by a properly trained neural network have mathematical properties which make them easy to search and analyze. We won't go too much into detail here, but know that, generally speaking, embedding vectors for semantically similar objects are *close to each other in terms of distance*. Therefore, searching across and understanding unstructured data boils down to vector arithmetic.

</template>
<template #zh>

上面这张照片展示了把一条非结构化数据转换成向量的例子。用大名鼎鼎的 ResNet-50 卷积神经网络，这张图可以表示成一个长度为 2048 的向量——下面是它的前三个和后三个元素：`[0.1392, 0.3572, 0.1988, ..., 0.2888, 0.6611, 0.2909]`。训练得当的神经网络生成的嵌入向量具有便于搜索和分析的数学性质。这里不展开细讲，只需知道：一般来说，语义相似的对象，其嵌入向量*在距离上彼此接近*。因此，对非结构化数据的搜索和理解，归根结底就是向量算术。

</template>
</BiRow>

<BiRow>
<template #en>

![Embedding arithmetic in action.](/vector-db-images/introduction-to-unstructured-data-02.jpeg)
Embedding arithmetic in action.

</template>
<template #zh>

![Embedding arithmetic in action.](/vector-db-images/introduction-to-unstructured-data-02.jpeg)
嵌入向量算术实战。

</template>
</BiRow>

<BiRow>
<template #en>

As mentioned in the introduction, unstructured data will comprise a whopping 80% of all newly created data by the year 2028. This proportion will continue to increase beyond 80% as industries mature and implement methods for unstructured data processing. This impacts everybody - you, me, the companies that we work for, the organizations that we volunteer for, so on and so forth. Just as new user-facing applications from 2010 onward required databases for storing semi-structured data (as opposed to traditional tabular data), this decade necessitates databases purpose-built for indexing and searching across massive quantities (exabytes) of unstructured data.

</template>
<template #zh>

如引言所说，到 2028 年，非结构化数据将占全部新创建数据的整整 80%。随着各行各业成熟并落地非结构化数据处理方法，这个比例还会继续突破 80%。这件事影响到每一个人——你、我、我们效力的公司、我们做志愿的组织，如此等等。正如 2010 年之后面向用户的新应用需要能存半结构化数据（而不是传统表格数据）的数据库一样，这个十年需要的是专门为海量（艾字节级）非结构化数据的索引与搜索而生的数据库。

</template>
</BiRow>

<BiRow>
<template #en>

The solution? A database for the AI era - a *vector database*. Welcome to our world; welcome to the world of ***[the open-source vector database, Milvus](https://zilliz.com/what-is-milvus)***.

</template>
<template #zh>

解决方案？一个为 AI 时代而生的数据库——*向量数据库*。欢迎来到我们的世界；欢迎来到***[开源向量数据库 Milvus](https://zilliz.com/what-is-milvus)***的世界。

</template>
</BiRow>

<BiRow>
<template #en>

<sup>2</sup><sub>In most tutorials, we'll focus on embeddings generated by neural networks; do note, however, that embeddings can be generated through handcrafted algorithms as well.</sub>

</template>
<template #zh>

<sup>2</sup><sub>在大多数教程里，我们聚焦神经网络生成的嵌入向量；但请注意，嵌入向量也可以通过人工设计的算法生成。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

## Unstructured data processing

</template>
<template #zh>

## 非结构化数据的处理

</template>
</BiRow>

<BiRow>
<template #en>

Excited yet? Excellent. But before we dive headfirst into vector databases and Milvus, let's take a minute to talk about how we process and analyze unstructured data. In the case of structured and semi-structured data, searching for or filtering items in the database is fairly straightforward. As a simple example, querying MongoDB for the first book from a particular author can be done with the following code snippet (using `pymongo`):

</template>
<template #zh>

兴奋了吗？很好。但在一头扎进向量数据库和 Milvus 之前，先花一分钟讲讲我们如何处理和分析非结构化数据。对结构化和半结构化数据来说，在数据库里搜索或过滤条目相当直接。举个简单的例子，查询 MongoDB 里某位作者的第一本书，用下面这段代码（`pymongo`）就能搞定：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> document = collection.find_one({'Author': 'Bill Bryson'})
```

</template>
<template #zh>

```python
>>> document = collection.find_one({'Author': 'Bill Bryson'})
```

</template>
</BiRow>

<BiRow>
<template #en>

This type of querying methodology is not dissimilar to that of traditional relational databases, which rely on SQL statements to filter and fetch data. The concept is the same: databases for structured/semi-structured data perform filtering and querying using mathematical (e.g. `<=`, string distance) or logical (e.g. `EQUALS`, `NOT`) operators across numerical values and/or strings. For traditional relational databases, this is called *relational algebra*; for those of you unfamiliar with it, trust me when I say it's much worse than linear algebra. You may have seen examples of extremely complex filters being constructed through relational algebra, but the core concept remains the same - traditional databases are *deterministic* systems that always return exact matches for a given set of filters.

</template>
<template #zh>

这套查询方法论与传统关系数据库没什么两样——后者靠 SQL 语句过滤和取数。核心概念是一样的：结构化/半结构化数据库用数学（如 `<=`、字符串距离）或逻辑（如 `EQUALS`、`NOT`）运算符，在数值和/或字符串上做过滤与查询。对传统关系数据库来说，这套东西叫*关系代数*；不熟悉它的朋友，请相信我：它比线性代数可怕多了。你可能见过用关系代数搭出的极其复杂的过滤器，但核心概念不变——传统数据库是*确定性*系统，对给定的一组过滤条件，永远返回精确匹配。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike databases for structured/semi-structured data, vector database queries are done by specifying an input *query vector* as opposed to SQL statement or data filters (such as `{'Author': 'Bill Bryson'}`). This vector is the embedding-based representation of the unstructured data. As a quick example, this can be done in Milvus with the following snippet (using `pymilvus`):

</template>
<template #zh>

与结构化/半结构化数据库不同，向量数据库的查询靠指定一个输入的*查询向量*，而不是 SQL 语句或数据过滤器（比如 `{'Author': 'Bill Bryson'}`）。这个向量就是非结构化数据基于嵌入的表示。快速看个例子，在 Milvus 里（用 `pymilvus`）这么写：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> results = collection.search(embedding, 'embedding', params, limit=10)
```

</template>
<template #zh>

```python
>>> results = collection.search(embedding, 'embedding', params, limit=10)
```

</template>
</BiRow>

<BiRow>
<template #en>

Internally, queries across large collections of unstructured data are performed using a suite of algorithms collectively known as *approximate nearest neighbor search*, or *ANN search* for short. In a nutshell, ANN search is a form of optimization that attempts to find the "closest" point or set of points to a given query vector. Note the "approximate" in ANN. By utilizing clever indexing methods, vector databases have a clear accuracy/performance tradeoff: increasing search runtimes will result in a more consistent database that performs closer to a deterministic system, always returning the absolute nearest neighbors given a query value. Conversely, reducing query times will improve throughput but may result in capturing fewer of a query's true nearest values. In this sense, unstructured data processing is a *probabilistic* process<sup>3</sup>.

</template>
<template #zh>

在内部，对大规模非结构化数据集合的查询由一套统称为*近似最近邻搜索*（Approximate Nearest Neighbor search，ANN 搜索）的算法完成。简言之，ANN 搜索是一种优化，目标是找出距离给定查询向量「最近」的点或点集。注意 ANN 里的「近似」二字。借助巧妙的索引方法，向量数据库存在明确的准确率/性能取舍：拉长搜索耗时，数据库的行为就更一致、更接近确定性系统，对给定查询值总能返回绝对最近邻；反过来，压缩查询时间会提升吞吐量，但可能漏掉查询的一部分真正最近邻。从这个意义上说，非结构化数据处理是一个*概率性*过程<sup>3</sup>。

</template>
</BiRow>

<BiRow>
<template #en>

![Approximate nearest neighbor search, visualized.](/vector-db-images/introduction-to-unstructured-data-03.jpeg)
Approximate nearest neighbor search, visualized.

</template>
<template #zh>

![Approximate nearest neighbor search, visualized.](/vector-db-images/introduction-to-unstructured-data-03.jpeg)
近似最近邻搜索，可视化呈现。

</template>
</BiRow>

<BiRow>
<template #en>

ANN search is a core component of vector databases and a massive research area in and of itself; as such, we'll dive deep into various ANN search methodologies available to you within Milvus in a future set of articles.

</template>
<template #zh>

ANN 搜索是向量数据库的核心组件，本身就是一个庞大的研究领域。因此，我们会在后续一系列文章里深入讲 Milvus 中可用的各种 ANN 搜索方法。

</template>
</BiRow>

<BiRow>
<template #en>

<sup>3</sup><sub>Vector databases can be made deterministic by selecting a specific index.</sub>

</template>
<template #zh>

<sup>3</sup><sub>通过选择特定的索引，向量数据库也可以做到确定性。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

## Wrapping up

</template>
<template #zh>

## 收尾总结

</template>
</BiRow>

<BiRow>
<template #en>

Thanks for making it this far! Here are the key takeaways for this tutorial:

</template>
<template #zh>

感谢你读到这里！本篇教程的关键要点如下：

</template>
</BiRow>

<BiRow>
<template #en>

- Structured/semi-structured data are limited to numeric, string, or time data types. Through the power of modern machine learning, unstructured data is represented as high-dimensional vectors of numerical values.
- These vectors, more commonly known as embeddings, are great for representing the semantic content of the unstructured data. Structured/semi-structured data, on the other hand, is semantically as-is, i.e. the content itself is equivalent to the semantics.
- Searching and analyzing unstructured data is done through ANN search, a process that is inherently probabilistic. Querying across structured/semi-structured data, on the other hand, is deterministic.
- Unstructured data processing is very different from semi-structured data processing, and requires a complete paradigm shift. This naturally necessitates a new type of database - the vector database.

</template>
<template #zh>

- 结构化/半结构化数据仅限于数值、字符串或时间数据类型；而借助现代机器学习的力量，非结构化数据被表示成由数值构成的高维向量。
- 这些向量（更常叫嵌入向量）非常擅长表达非结构化数据的语义内容；结构化/半结构化数据在语义上则是「所见即所得」，即内容本身就等于语义。
- 对非结构化数据的搜索与分析通过 ANN 搜索完成，这一过程本质上是概率性的；而对结构化/半结构化数据的查询是确定性的。
- 非结构化数据处理与半结构化数据处理截然不同，需要彻底的范式转变。这自然催生了一种新型数据库——向量数据库。

</template>
</BiRow>

<BiRow>
<template #en>

This concludes part one of this introductory series - for those of you new to vector databases, welcome to Milvus! In the next [tutorial](https://zilliz.com/learn/what-is-vector-database), we'll cover vector databases in more detail:

</template>
<template #zh>

入门系列的第一篇到此结束——各位向量数据库的新朋友，欢迎来到 Milvus！下一篇[教程](https://zilliz.com/learn/what-is-vector-database)我们会更深入地讲向量数据库：

</template>
</BiRow>

<BiRow>
<template #en>

- We'll first provide a birds-eye view of the the Milvus vector database.
- We'll then follow it up with how Milvus differs from vector search libraries (FAISS, ScaNN, DiskANN, etc).
- We'll also discuss how vector databases differ from vector search plugins (for traditional databases and search systems).
- We'll wrap up with technical challenges associated with modern vector databases.

</template>
<template #zh>

- 先鸟瞰 Milvus 向量数据库的全貌；
- 接着讲 Milvus 与向量搜索库（FAISS、ScaNN、DiskANN 等）的区别；
- 还会讨论向量数据库与向量搜索插件（面向传统数据库和搜索系统）的区别；
- 最后聊聊现代向量数据库面临的技术挑战。

</template>
</BiRow>

<BiRow>
<template #en>

See you in the next tutorial, [What is a Vector Database?](https://zilliz.com/learn/what-is-vector-database).

</template>
<template #zh>

下篇教程[《什么是向量数据库？》](https://zilliz.com/learn/what-is-vector-database)再见。

</template>
</BiRow>
