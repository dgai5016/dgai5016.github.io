<BiRow>
<template #en>

In the [previous tutorial](https://zilliz.com/learn/vector-index), we took a look at two of the most fundamental indexing algorithms - flat indexing and inverted file (IVF). Flat indexing is the simplest and most naive vector search strategy, but can surprisingly work quite well when the total dataset size is small (a couple thousand vectors) and/or if you're using a GPU for querying. IVF, on the other hand, is highly extensible to be highly extensible while working well with other indexing strategies too.

</template>
<template #zh>

在[上一篇教程](https://zilliz.com/learn/vector-index)中，我们了解了两种最基础的索引算法——暴力索引（flat indexing）和倒排文件索引（IVF）。暴力索引是最简单、最朴素的向量搜索策略，但当数据集总规模较小（几千个向量）和/或你用 GPU 来做查询时，效果却出奇地好。而 IVF 则具有极强的可扩展性，同时也能与其他索引策略很好地配合使用。

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we'll build on top of that knowledge by diving deeper into quantization techniques - specifically scalar quantization (also called integer quantization) and product quantization. We'll implement our own scalar and product quantization algorithms in Python.

</template>
<template #zh>

在本篇教程中，我们将在这些知识的基础上进一步深入量化（quantization）技术——具体来说就是标量量化（scalar quantization，也称为整数量化）和乘积量化（product quantization）。我们会用 Python 亲手实现自己的标量量化和乘积量化算法。

</template>
</BiRow>

<BiRow>
<template #en>

## Quantization vs. Dimensionality Reduction

</template>
<template #zh>

## 量化 vs. 降维

</template>
</BiRow>

<BiRow>
<template #en>

As mentioned in a previous tutorial on [vector similarity search](https://zilliz.com/learn/vector-similarity-search), quantization is a technique for reducing the total size of the database by reducing the overall *precision* of the vectors. Note that this is very different from dimensionality reduction (PCA, LDA, etc), which attempts to reduce the *length* of the vectors:

</template>
<template #zh>

正如先前那篇讲[向量相似度搜索](https://zilliz.com/learn/vector-similarity-search)的教程中提到的，量化是一种通过降低向量整体*精度*来缩减数据库总大小的技术。注意，它与降维（dimensionality reduction，如 PCA、LDA 等）完全是两回事——降维试图缩短向量的*长度*：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> vector.size  # length of our original vector
128
>>> quantized_vector.size  # length of our quantized vector
128
>>> reduced_vector.size  # length of our reduced vector
16
```

</template>
<template #zh>

```python
>>> vector.size  # length of our original vector
128
>>> quantized_vector.size  # length of our quantized vector
128
>>> reduced_vector.size  # length of our reduced vector
16
```

</template>
</BiRow>

<BiRow>
<template #en>

**Dimensionality reduction** methods such as PCA use linear algebra to project the input data into a lower dimensional space. Without getting too deep into the math here, just know that these methods generally aren't used as the primary indexing strategy because they tend to have limitations on the distribution of the data. PCA, for example, works best on data that can be separated into independent, Gaussian distributed components.

</template>
<template #zh>

**降维**方法（如 PCA）利用线性代数把输入数据投影到更低维的空间中。这里不深挖数学细节，你只需要知道：这类方法通常不会被用作主要的索引策略，因为它们对数据的分布往往有限制。举个例子，PCA 在可以分解成相互独立、服从高斯分布的各个成分的数据上效果最好。

</template>
</BiRow>

<BiRow>
<template #en>

**Quantization**, on the other hand, makes no assumption about the distribution of the data - rather, it looks at each dimension (or group of dimensions) separately and attempts to "bin" each value into one of many discrete buckets. Instead of performing a flat search over all of the original vectors, we can instead perform flat search over the quantized vectors - this can result in reduced memory consumption as well as significant speedup.

</template>
<template #zh>

而**量化**则对数据分布不做任何假设——它单独审视每个维度（或每一组维度），并尝试把每个值归入多个离散桶（bin）中的某一个。这样一来，我们不必再对所有原始向量做暴力搜索，而是对量化后的向量做暴力搜索——这既能降低内存消耗，也能带来显著加速。

</template>
</BiRow>

<BiRow>
<template #en>

## Scalar quantization

</template>
<template #zh>

## 标量量化

</template>
</BiRow>

<BiRow>
<template #en>

Scalar quantization is an important data compression technique that turns floating point values into low-dimensional integers.  Let's take a look at an example:

</template>
<template #zh>

标量量化是一种重要的数据压缩技术，它把浮点值转换成低位宽整数。我们来看一个例子：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> vector.dtype  # data type of our original vector
dtype('float64')
>>> quantized_vector.dtype
dtype('int8')
>>> reduced_vector.dtype
dtype('float64')
```

</template>
<template #zh>

```python
>>> vector.dtype  # data type of our original vector
dtype('float64')
>>> quantized_vector.dtype
dtype('int8')
>>> reduced_vector.dtype
dtype('float64')
```

</template>
</BiRow>

<BiRow>
<template #en>

From the above example, we can see that scalar quantization has reduced the total size of our vectors (and vector database) by a whopping 8x. Nice.

</template>
<template #zh>

从上面的例子可以看到，标量量化把我们的向量（以及向量数据库）的总大小压缩了整整 8 倍。不错。

</template>
</BiRow>

<BiRow>
<template #en>

### How does scalar quantization work?

</template>
<template #zh>

### 标量量化是如何工作的？

</template>
</BiRow>

<BiRow>
<template #en>

How exactly does scalar quantization work? Let's first take a look at the indexing process, i.e. turning floating point vectors into integer vectors. For each vector dimension, scalar quantization takes the maximum and minimum value of that particular dimension as seen across the entire database, and uniformly splits that dimension into bins across its entire range.

</template>
<template #zh>

标量量化到底是怎么工作的？我们先来看索引构建过程，也就是把浮点向量变成整数向量的过程。对向量的每个维度，标量量化会取整个数据库中该维度出现过的最大值和最小值，然后把这个维度的整个取值范围均匀地切分成若干个桶。

</template>
</BiRow>

<BiRow>
<template #en>

Let's try writing that in code. We'll first generate a dataset of a thousand 128D floating point vectors sampled from a multivariate distribution. Since this is a toy example, I'll be sampling from a Gaussian distribution; in practice, actual embeddings are rarely Gaussian distributed unless added as a constraint when training the model (such as in variational autoencoders):

</template>
<template #zh>

我们试着用代码写出来。首先生成一个数据集：从多元分布中采样 1000 个 128 维浮点向量。由于这只是个玩具示例，我会从高斯分布中采样；实际应用中，真实的嵌入向量（embedding）很少服从高斯分布，除非在训练模型时把它作为约束条件加进去（比如变分自编码器就是这样）：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
<template #zh>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
</BiRow>

<BiRow>
<template #en>

This dataset serves as our dummy data for use in this scalar quantization implementation. Now, let's determine the maximum and minimum values of each dimension of the vector and store it in a matrix called `ranges`:

</template>
<template #zh>

这个数据集就是我们实现标量量化要用的假数据。现在，我们来确定向量每个维度的最大值和最小值，并把它们存进一个叫 `ranges` 的矩阵里：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> ranges = np.vstack((np.min(dataset, axis=0), np.max(dataset, axis=0)))
```

</template>
<template #zh>

```python
>>> ranges = np.vstack((np.min(dataset, axis=0), np.max(dataset, axis=0)))
```

</template>
</BiRow>

<BiRow>
<template #en>

You'll notice that the `mins` and `maxes` here are fairly uniform across all dimensions for the this toy example since the input data was sampled from zero-mean unit-variance Gaussians - don't worry about that for now, as all the code here translates to real data as well. We now have the minimum and maximum value of each vector dimension in the entire dataset. With this, we can now determine the *start value* and *step size* for each dimension. The start value is simply the minimum value, and the step size is determined by the number of discrete bins in the integer type that we'll be using. In this case, we'll be using 8-bit unsigned integers `uint8_t` for a total of 256 bins:

</template>
<template #zh>

你会注意到，在这个玩具示例里，所有维度上的最小值和最大值都相当均匀，因为输入数据是从零均值、单位方差的高斯分布采样的——暂时不用纠结这一点，这里的所有代码换成真实数据同样适用。现在我们拿到了整个数据集中向量每个维度的最小值和最大值。有了它们，就可以确定每个维度的*起始值*（start value）和*步长*（step size）了。起始值就是最小值，而步长由我们所用整数类型的离散桶数量决定。这里我们用 8 位无符号整数 `uint8_t`，总共 256 个桶：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> starts = ranges[0,:]
>>> steps = (ranges[1,:] - ranges[0,:]) / 255
```

</template>
<template #zh>

```python
>>> starts = ranges[0,:]
>>> steps = (ranges[1,:] - ranges[0,:]) / 255
```

</template>
</BiRow>

<BiRow>
<template #en>

That's all the setup that's needed. The actual quantization is then done by subtracting all starting values for each dimension (`starts`) and dividing the resulting value by the step size (`steps`):

</template>
<template #zh>

需要做的准备就这么多。真正的量化操作是：减去每个维度的起始值（`starts`），再把结果除以步长（`steps`）：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> dataset_quantized = np.uint8((dataset - starts) / steps)
>>> dataset_quantized
array([[136,  58, 156, ..., 153, 182,  30],
       [210,  66, 175, ...,  68, 146,  33],
       [100, 136, 148, ..., 142,  86, 108],
       ...,
       [133, 146, 146, ..., 137, 209, 144],
       [ 63, 131,  96, ..., 174, 174, 105],
       [159,  78, 204, ...,  95,  87, 146]], dtype=uint8)
```

</template>
<template #zh>

```python
>>> dataset_quantized = np.uint8((dataset - starts) / steps)
>>> dataset_quantized
array([[136,  58, 156, ..., 153, 182,  30],
       [210,  66, 175, ...,  68, 146,  33],
       [100, 136, 148, ..., 142,  86, 108],
       ...,
       [133, 146, 146, ..., 137, 209, 144],
       [ 63, 131,  96, ..., 174, 174, 105],
       [159,  78, 204, ...,  95,  87, 146]], dtype=uint8)
```

</template>
</BiRow>

<BiRow>
<template #en>

We can also check the `mins` and `maxes` of the quantized dataset:

</template>
<template #zh>

我们还可以检查一下量化后数据集的最小值和最大值：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> np.min(dataset_quantized, axis=0)
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dtype=uint8)
>>> np.max(dataset_quantized, axis=1)
array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 254, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 254,
       254, 255, 255, 254, 255, 255, 255, 254, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 255, 254, 255, 255,
       255, 254, 255, 255, 255, 255, 255, 254, 254, 255, 255, 255, 255,
       255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], dtype=uint8)
```

</template>
<template #zh>

```python
>>> np.min(dataset_quantized, axis=0)
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dtype=uint8)
>>> np.max(dataset_quantized, axis=1)
array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 254, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 254,
       254, 255, 255, 254, 255, 255, 255, 254, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 254, 255, 255, 255, 255, 255, 254, 255, 255,
       255, 254, 255, 255, 255, 255, 255, 254, 254, 255, 255, 255, 255,
       255, 255, 255, 254, 255, 255, 255, 255, 254, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
       255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], dtype=uint8)
```

</template>
</BiRow>

<BiRow>
<template #en>

Note how we've used the full `uint8_t` range of `[0,255]` for each dimension (some of the maximum values are 254 instead of 255 due to floating point imprecisions).

</template>
<template #zh>

注意，每个维度都用满了 `uint8_t` 的 `[0,255]` 取值范围（由于浮点精度问题，有些最大值是 254 而不是 255）。

</template>
</BiRow>

<BiRow>
<template #en>

Now let's put it all together in a `ScalarQuantizer` class:

</template>
<template #zh>

现在我们把上面的内容整合成一个 `ScalarQuantizer` 类：

</template>
</BiRow>

<BiRow>
<template #en>

```python
import numpy as np

class ScalarQuantizer:

    def __init__(self):
        self._dataset = None

    def create(self):
        """Calculates and stores SQ parameters based on the input dataset."""
        self._dtype = dataset.dtype  # original dtype
        self._starts = np.min(dataset, axis=1)
        self._steps = (np.max(dataset, axis=1) - self._starts) / 255

        # the internal dataset uses `uint8_t` quantization
        self._dataset = np.uint8((dataset - self._starts) / self._steps)

    def quantize(self, vector):
        """Quantizes the input vector based on SQ parameters"""
        return np.uint8((vector - self._starts) / self._steps)

    def restore(self, vector):
        """Restores the original vector using SQ parameters."""
        return (vector * self._steps) + self._starts

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ScalarQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ScalarQuantizer(dataset)
```

</template>
<template #zh>

```python
import numpy as np

class ScalarQuantizer:

    def __init__(self):
        self._dataset = None

    def create(self):
        """Calculates and stores SQ parameters based on the input dataset."""
        self._dtype = dataset.dtype  # original dtype
        self._starts = np.min(dataset, axis=1)
        self._steps = (np.max(dataset, axis=1) - self._starts) / 255

        # the internal dataset uses `uint8_t` quantization
        self._dataset = np.uint8((dataset - self._starts) / self._steps)

    def quantize(self, vector):
        """Quantizes the input vector based on SQ parameters"""
        return np.uint8((vector - self._starts) / self._steps)

    def restore(self, vector):
        """Restores the original vector using SQ parameters."""
        return (vector * self._steps) + self._starts

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ScalarQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ScalarQuantizer(dataset)
```

</template>
</BiRow>

<BiRow>
<template #en>

And that's it for scalar quantization! The conversion function for scalar quantization can be changed to a quadratic or exponential function instead of a linear function as we have in the example above, but the general idea remains the same - split the entire space of each dimension into discrete bins in order to reduce the overall memory footprint of the vector data.

</template>
<template #zh>

标量量化就讲完了！上面例子里的转换函数是线性函数，其实也可以换成二次函数或指数函数，但核心思想不变——把每个维度的整个空间切分成离散的桶，从而降低向量数据的整体内存占用。

</template>
</BiRow>

<BiRow>
<template #en>

## Product quantization

</template>
<template #zh>

## 乘积量化

</template>
</BiRow>

<BiRow>
<template #en>

Product quantization (PQ) is another data compression technique that is much more powerful and flexible to quantize vectors when compared with scalar quantization. A major disadvantage of scalar quantization is that it does not take into consideration the *distribution* of values in each dimension. For example, imagine we have a dataset with the following 2-dimensional vectors:

</template>
<template #zh>

乘积量化（Product Quantization，PQ）是另一种数据压缩技术，与标量量化相比，它在量化向量方面要强大和灵活得多。标量量化的一大缺点是没有考虑每个维度上取值的*分布*。举个例子，假设我们有一个由下面这些二维向量组成的数据集：

</template>
</BiRow>

<BiRow>
<template #en>

```
array([[ 9.19,  1.55],
       [ 0.12,  1.55],
       [ 0.40,  0.78],
       [-0.04,  0.31],
       [ 0.81, -2.07],
       [ 0.29,  0.82],
       [ 0.05,  0.96],
       [ 0.12, -1.10]])
```

</template>
<template #zh>

```
array([[ 9.19,  1.55],
       [ 0.12,  1.55],
       [ 0.40,  0.78],
       [-0.04,  0.31],
       [ 0.81, -2.07],
       [ 0.29,  0.82],
       [ 0.05,  0.96],
       [ 0.12, -1.10]])
```

</template>
</BiRow>

<BiRow>
<template #en>

If we decide to quantize these vectors in to 3-bit integers (range `[0,7]`), 6 of the bins for the 0th dimension will be completely unused! Clearly, there must be a better way to perform quantization, especially if any of the dimensions have a non-uniform distribution. That's where product quantization can come to the rescure.

</template>
<template #zh>

如果我们决定把这些向量量化成 3 位整数（取值范围 `[0,7]`），第 0 个维度将有 6 个桶完全用不上！显然，一定存在更好的量化方法，尤其是当某些维度呈非均匀分布时。这时候就该乘积量化出手相救了。

</template>
</BiRow>

<BiRow>
<template #en>

### How does product quantization work?

</template>
<template #zh>

### 乘积量化是如何工作的？

</template>
</BiRow>

<BiRow>
<template #en>

The primary idea behind product quantization is to algorithmically split a high-dimensional vector into a lower dimensional subspace, with dimension of the subspace corresponding to multiple dimensions in the original high-dimensional vector. This reduction process is typically done using a special algorithm called the *Lloyd's algorithm*, a quantizer which is effectively equivalent to k-means clustering. Like scalar quantization, each original vector results in a vector of integers post-quantization, and each integer corresponds with a particular centroid.

</template>
<template #zh>

乘积量化背后的核心思想是：用算法把高维向量切分成更低维的子空间（subspace），子空间的每个维度对应原始高维向量中的多个维度。这个降维过程通常用一种叫 *Lloyd 算法*的特殊算法来完成——它是一种实际上等价于 k-means 聚类的量化器。和标量量化一样，每个原始向量量化后都会得到一个整数向量，其中每个整数都对应一个特定的质心（centroid）。

</template>
</BiRow>

<BiRow>
<template #en>

This might sound complex, but it becomes much easier to understand if we break it down from an algorithmic perspective. Let's first go over indexing:

</template>
<template #zh>

这听起来可能很复杂，但如果从算法的角度拆解，就容易理解多了。我们先过一遍索引构建过程：

</template>
</BiRow>

<BiRow>
<template #en>

1. Given a dataset of `N` total vectors, we'll first divide each vector into `M` subvectors (also known as a *subspace*). These subvectors don't necessarily have to be the same length, but in practice they almost always are.
2. We'll then use k-means (or some other clustering algorithm) for all subvectors in the dataset. This will give us a collection of `K` centroids for each subspace, each of which will be assigned its own unique ID.
3. With all centroids computed, we'll replace all subvectors in the original dataset with the ID of its closest centroid.

</template>
<template #zh>

1. 对于一个总共有 `N` 个向量的数据集，我们先把每个向量切分成 `M` 个子向量（也称为*子空间*）。这些子向量的长度不一定非要相同，但实际应用中几乎总是相同的。
2. 然后对数据集中的所有子向量使用 k-means（或其他聚类算法）。这样每个子空间都会得到一组共 `K` 个质心，每个质心都会被分配一个唯一的 ID。
3. 算出所有质心后，我们用离每个子向量最近的质心的 ID 来替换原数据集中的所有子向量。

</template>
</BiRow>

<BiRow>
<template #en>

![](/vector-db-images/scalar-quantization-and-product-quantization-01.png)

</template>
<template #zh>

![](/vector-db-images/scalar-quantization-and-product-quantization-01.png)

</template>
</BiRow>

<BiRow>
<template #en>

<sub>Product quantization, visualized.</sub>

</template>
<template #zh>

<sub>乘积量化示意图。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

PQ can both reduce memory usage and signficantly speed up nearest neighbor search speeds at the cost of a bit of accuracy. The trade-off is dependent on the parameters used - using more centroids and subvectors will improve search accuracy but will not result in as much compression nor speedup.

</template>
<template #zh>

PQ 既能降低内存占用，又能显著加快最近邻搜索的速度，代价是损失一点精度。这个权衡取决于所用的参数——使用更多的质心和子向量会提高搜索精度，但带来的压缩和加速效果也就没那么显著了。

</template>
</BiRow>

<BiRow>
<template #en>

Let's work through a very simple PQ implementation. As with the previous scalar quantization example, we'll be reducing the vectors into 8-bit unsigned integers (`uint8_t`) using `M = 16` and `K = 256`, i.e. each 128D vector will be split into 16 subvectors of size 8, with each subvector then being quantized into one of 256 buckets.

</template>
<template #zh>

下面我们来动手实现一个非常简单的 PQ 版本。和前面的标量量化例子一样，我们会用 `M = 16` 和 `K = 256` 把向量压缩成 8 位无符号整数（`uint8_t`），也就是说，每个 128 维向量会被切成 16 个长度为 8 的子向量，每个子向量再被量化成 256 个桶中的一个。

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> (M, K) = (16, 256)
```

</template>
<template #zh>

```python
>>> (M, K) = (16, 256)
```

</template>
</BiRow>

<BiRow>
<template #en>

We'll start with generating a toy dataset, as we did for the scalar quantization example:

</template>
<template #zh>

和标量量化例子中一样，我们先生成一个玩具数据集：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
<template #zh>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
</BiRow>

<BiRow>
<template #en>

With the dataset in hand, let's split off the first set of subvectors:

</template>
<template #zh>

拿到数据集后，我们先把第一组子向量切出来：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> sublen = dataset.shape[1] // M
>>> subspace = dataset[:,0:sublen]  # this is the 0th subspace
>>> subspace.shape
(1000, 8)
```

</template>
<template #zh>

```python
>>> sublen = dataset.shape[1] // M
>>> subspace = dataset[:,0:sublen]  # this is the 0th subspace
>>> subspace.shape
(1000, 8)
```

</template>
</BiRow>

<BiRow>
<template #en>

As with IVF, we'll use scipy's `kmeans2` implementation to determine centroids:

</template>
<template #zh>

和 IVF 那篇一样，我们使用 scipy 的 `kmeans2` 实现来确定质心：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> from scipy.cluster.vq import kmeans2
>>> (centroids, assignments) = kmeans2(subspace, K, iter=32)
```

</template>
<template #zh>

```python
>>> from scipy.cluster.vq import kmeans2
>>> (centroids, assignments) = kmeans2(subspace, K, iter=32)
```

</template>
</BiRow>

<BiRow>
<template #en>

The scipy k-means implementation returns the centroid indices in `int32_t` format, so we'll do a quick conversion to `uint8_t` to wrap things up:

</template>
<template #zh>

scipy 的 k-means 实现返回的质心索引是 `int32_t` 格式，所以我们快速转换成 `uint8_t`，就此收尾：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> quantized = np.uint8(assignments)
```

</template>
<template #zh>

```python
>>> quantized = np.uint8(assignments)
```

</template>
</BiRow>

<BiRow>
<template #en>

This process gets repeated for each subspace until we've quantized all of the vectors.

</template>
<template #zh>

对每个子空间重复这个过程，直到所有向量都完成量化。

</template>
</BiRow>

<BiRow>
<template #en>

As we've done for scalar quantization, let's also compile everything here into a class:

</template>
<template #zh>

像标量量化那样，我们把这些代码也整合成一个类：

</template>
</BiRow>

<BiRow>
<template #en>

```python
import numpy as np
from scipy.cluster.vq import kmeans2

class ProductQuantizer:

    def __init__(self, M=16, K=256):
        self.M = 16
        self.K = 256
        self._dataset = None

    def create(self, dataset):
        """Fits PQ model based on the input dataset."""
        sublen = dataset.shape[1] // self.M
        self._centroids = np.empty((self.M, self.K, sublen), dtype=np.float64)
        self._dataset = np.empty((dataset.shape[0], self.M), dtype=np.uint8)
        for m in range(self.M):
            subspace = dataset[:,m*sublen:(m+1)*sublen]
            (centroids, assignments) = kmeans2(subspace, self.K, iter=32)
            self._centroids[m,:,:] = centroids
            self._dataset[:,m] = np.uint8(assignments)

    def quantize(self, vector):
        """Quantizes the input vector based on PQ parameters"""
        quantized = np.empty((self.M,), dtype=np.uint8)
        for m in range(self.M):
            centroids = self._centroids[m,:,:]
            distances = np.linalg.norm(vector - centroids, axis=1)
            quantized[m] = np.argmin(distances)
        return quantized

    def restore(self, vector):
        """Restores the original vector using PQ parameters."""
        return np.hstack([self._centroids[m,vector[m],:] for m in range(M)])

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ProductQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ProductQuantizer()
>>> quantizer.create(dataset)
```

</template>
<template #zh>

```python
import numpy as np
from scipy.cluster.vq import kmeans2

class ProductQuantizer:

    def __init__(self, M=16, K=256):
        self.M = 16
        self.K = 256
        self._dataset = None

    def create(self, dataset):
        """Fits PQ model based on the input dataset."""
        sublen = dataset.shape[1] // self.M
        self._centroids = np.empty((self.M, self.K, sublen), dtype=np.float64)
        self._dataset = np.empty((dataset.shape[0], self.M), dtype=np.uint8)
        for m in range(self.M):
            subspace = dataset[:,m*sublen:(m+1)*sublen]
            (centroids, assignments) = kmeans2(subspace, self.K, iter=32)
            self._centroids[m,:,:] = centroids
            self._dataset[:,m] = np.uint8(assignments)

    def quantize(self, vector):
        """Quantizes the input vector based on PQ parameters"""
        quantized = np.empty((self.M,), dtype=np.uint8)
        for m in range(self.M):
            centroids = self._centroids[m,:,:]
            distances = np.linalg.norm(vector - centroids, axis=1)
            quantized[m] = np.argmin(distances)
        return quantized

    def restore(self, vector):
        """Restores the original vector using PQ parameters."""
        return np.hstack([self._centroids[m,vector[m],:] for m in range(M)])

    @property
    def dataset(self):
        if self._dataset:
            return self._dataset
        raise ValueError("Call ProductQuantizer.create() first")

>>> dataset = np.random.normal(size=(1000, 128))
>>> quantizer = ProductQuantizer()
>>> quantizer.create(dataset)
```

</template>
</BiRow>

<BiRow>
<template #en>

And that's it for product quantization! To really speed things up during the search process, we can expend a bit of extra memory to compute *distance tables* for all centroids in each subspace, but I'll leave that as a exercise for you.

</template>
<template #zh>

乘积量化也就讲完了！如果想在搜索过程中真正提速，我们还可以额外花一点内存为每个子空间的所有质心计算*距离表*（distance table），不过这个就留给你当练习了。

</template>
</BiRow>

<BiRow>
<template #en>

## Wrapping up

</template>
<template #zh>

## 总结

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we did a deep dive into scalar quantization and product quantization, creating our own simple implementations along the way. Scalar quantization is a good tool, but product quantization is much more powerful and can be used regardless of the distribution of our vector data. Please keep in mind that, while PQ can help significantly speed up query times while also reducing memory footprint, it is generally not that great for recall. We'll benchmark PQ along with several other indexing strategies in a future tutorial.

</template>
<template #zh>

在本篇教程中，我们深入探讨了标量量化和乘积量化，并一路写出了自己的简单实现。标量量化是个不错的工具，但乘积量化要强大得多，而且无论向量数据呈什么分布都能用。请记住：虽然 PQ 能显著加快查询速度并降低内存占用，但它通常不太利于召回率。我们会在后续教程中对 PQ 和其他几种索引策略做基准测试。

</template>
</BiRow>

<BiRow>
<template #en>

In the next tutorial, we'll continue our deep dive into indexing strategies with Hierarchical Navigable Small Worlds (HNSW) - a graph-based indexing algorithm that is arguably the most popular way to index vectors today (although it does come with its own downsides as well). See you in the next tutorial!

</template>
<template #zh>

在下一篇教程中，我们将继续深入索引策略，主角是分层可导航小世界（Hierarchical Navigable Small Worlds，HNSW）——一种基于图的索引算法，可以说是当今最流行的向量索引方式（当然它也有自己的缺点）。下一篇见！

</template>
</BiRow>

<BiRow>
<template #en>

All code for this tutorial is freely available on Github: https://github.com/fzliu/vector-search.

</template>
<template #zh>

本教程的所有代码都可在 Github 上免费获取：https://github.com/fzliu/vector-search。

</template>
</BiRow>
