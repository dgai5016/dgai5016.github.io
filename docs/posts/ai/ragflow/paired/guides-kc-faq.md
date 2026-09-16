<BiRow>
<template #en>

## 1. Why can't I see Wiki in Artifacts after knowledge compilation is complete?

</template>
<template #zh>

## 1. 知识编译完成后，为什么在 Artifacts 中看不到 Wiki？

</template>
</BiRow>

<BiRow>
<template #en>

Wiki is generated differently from other knowledge artifacts.

</template>
<template #zh>

Wiki 的生成方式与其他知识工件（knowledge artifact）不同。

</template>
</BiRow>

<BiRow>
<template #en>

Graph, Tree, PageIndex, MindMap, and Timeline are document-level knowledge artifacts. Their corresponding results can be viewed after knowledge compilation is complete.

</template>
<template #zh>

Graph、Tree、PageIndex、MindMap 和 Timeline 是文档级知识工件。知识编译（Knowledge Compilation）完成后即可查看相应的结果。

</template>
</BiRow>

<BiRow>
<template #en>

Wiki is a knowledge-base-level knowledge artifact. After document knowledge compilation is complete, you still need to go to the Artifacts page of the knowledge base and click generate. The system then generates Wiki based on the compilation results in the current knowledge base.

</template>
<template #zh>

Wiki 是知识库级知识工件。文档知识编译完成后，还需要进入知识库的 Artifacts 页面并点击生成，系统随后会基于当前知识库中的编译结果生成 Wiki。

</template>
</BiRow>

<BiRow>
<template #en>

## 2. Why are no corresponding knowledge artifacts generated after knowledge compilation?

</template>
<template #zh>

## 2. 为什么知识编译后没有生成相应的知识工件？

</template>
</BiRow>

<BiRow>
<template #en>

Check the following items in sequence:

</template>
<template #zh>

按顺序检查以下事项：

</template>
</BiRow>

<BiRow>
<template #en>

- Whether Compiler has been added to the Ingestion Pipeline.
- Whether Compiler has selected the correct knowledge compilation template.
- Whether the knowledge compilation task executed successfully.
- Whether the knowledge compilation template has been correctly configured and saved.
- Whether the default extraction model can be used normally.

</template>
<template #zh>

- 编译器（Compiler）是否已添加到摄取管道（Ingestion Pipeline）中。
- 编译器是否选择了正确的知识编译模板。
- 知识编译任务是否执行成功。
- 知识编译模板是否已正确配置并保存。
- 默认提取模型能否正常使用。

</template>
</BiRow>

<BiRow>
<template #en>

If the task execution fails, use the task execution logs to further check the specific cause.

</template>
<template #zh>

如果任务执行失败，可借助任务执行日志进一步排查具体原因。

</template>
</BiRow>

<BiRow>
<template #en>

## 3. Why is the generated knowledge artifact incomplete or inconsistent with expectations?

</template>
<template #zh>

## 3. 为什么生成的知识工件不完整或与预期不符？

</template>
</BiRow>

<BiRow>
<template #en>

The generation result of a knowledge artifact is affected by factors such as the original document content, selected template, default extraction model, and template configuration.

</template>
<template #zh>

知识工件的生成结果受原始文档内容、所选模板、默认提取模型以及模板配置等因素影响。

</template>
</BiRow>

<BiRow>
<template #en>

It is recommended to first check whether the parsing result of the original document is complete. Then adjust the global rules and the configuration parameters of the corresponding template based on the generated result, and execute knowledge compilation again.

</template>
<template #zh>

建议先检查原始文档的解析结果是否完整，再根据生成结果调整全局规则和相应模板的配置参数，然后重新执行知识编译。

</template>
</BiRow>

<BiRow>
<template #en>

## 4. Will already generated knowledge artifacts update automatically after I modify a knowledge compilation template?

</template>
<template #zh>

## 4. 修改知识编译模板后，已生成的知识工件会自动更新吗？

</template>
</BiRow>

<BiRow>
<template #en>

No. After modifying template configuration, you need to use the updated template to execute knowledge compilation again before the new configuration is applied to the generated result.

</template>
<template #zh>

不会。修改模板配置后，需要使用更新后的模板重新执行知识编译，新配置才会应用到生成结果中。

</template>
</BiRow>

<BiRow>
<template #en>

## 5. Can I use different knowledge compilation templates for the same document?

</template>
<template #zh>

## 5. 可以对同一文档使用不同的知识编译模板吗？

</template>
</BiRow>

<BiRow>
<template #en>

Yes. You can select different knowledge compilation templates based on actual usage scenarios to generate different types of knowledge artifacts, such as Graph, Tree, PageIndex, MindMap, or Timeline.

</template>
<template #zh>

可以。用户可以根据实际使用场景选择不同的知识编译模板，生成不同类型的知识工件，例如 Graph、Tree、PageIndex、MindMap 或 Timeline。

</template>
</BiRow>

<BiRow>
<template #en>

Different templates have different knowledge organization methods and applicable scenarios. For details, refer to the template selection recommendations.

</template>
<template #zh>

不同模板的知识组织方式和适用场景各不相同。详情请参阅模板选择建议。

</template>
</BiRow>

<BiRow>
<template #en>

## 6. What is the difference between "Re-Split Parser Output" and Chunker?

</template>
<template #zh>

## 6. 重新切分解析器输出（Re-Split Parser Output）和分块器（Chunker）有什么区别？

</template>
</BiRow>

<BiRow>
<template #en>

Re-Split Parser Output controls whether Compiler reorganizes and splits Parser output based on the processing requirements of the current template before knowledge compilation.

</template>
<template #zh>

重新切分解析器输出控制在执行知识编译前，编译器是否按当前模板的处理要求，对解析器的输出重新组织和切分。

</template>
</BiRow>

<BiRow>
<template #en>

Chunker is used for document chunk processing in the Ingestion Pipeline.

</template>
<template #zh>

分块器用于摄取管道中的文档分块处理。

</template>
</BiRow>

<BiRow>
<template #en>

They act at different processing stages. Re-Split Parser Output does not replace Chunker.

</template>
<template #zh>

二者作用于不同的处理阶段。重新切分解析器输出不会取代分块器。

</template>
</BiRow>

<BiRow>
<template #en>

## 7. Why do results differ when the same document uses different models?

</template>
<template #zh>

## 7. 为什么同一文档使用不同模型，结果会不一样？

</template>
</BiRow>

<BiRow>
<template #en>

During knowledge compilation, the model is responsible for tasks such as entity extraction, content understanding, and structure generation.

</template>
<template #zh>

在知识编译过程中，模型负责实体抽取、内容理解和结构生成等任务。

</template>
</BiRow>

<BiRow>
<template #en>

Different models may differ in understanding capability, context length, and generation capability, so the final knowledge artifacts may also differ. Select an appropriate model based on document type, content complexity, and the knowledge compilation template used.

</template>
<template #zh>

不同模型在理解能力、上下文长度和生成能力上存在差异，因此最终生成的知识工件也可能不同。请根据文档类型、内容复杂度以及所使用的知识编译模板选择合适的模型。

</template>
</BiRow>

<BiRow>
<template #en>

## 8. What should I adjust first when the knowledge compilation result is unsatisfactory?

</template>
<template #zh>

## 8. 知识编译结果不理想时，应优先调整什么？

</template>
</BiRow>

<BiRow>
<template #en>

It is recommended to first confirm whether the original document parsing result is correct.

</template>
<template #zh>

建议先确认原始文档的解析结果是否正确。

</template>
</BiRow>

<BiRow>
<template #en>

If the parsing result is normal, check and adjust the default extraction model, global rules, and specific configuration parameters of the current template in sequence. After adjustment, execute knowledge compilation again and compare whether the new knowledge artifact meets expectations.

</template>
<template #zh>

如果解析结果正常，再按顺序检查并调整默认提取模型、全局规则以及当前模板的具体配置参数。调整后重新执行知识编译，对比新的知识工件是否符合预期。

</template>
</BiRow>
