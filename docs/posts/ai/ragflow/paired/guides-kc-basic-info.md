<BiRow>
<template #en>

When creating or editing a knowledge compilation template, you need to complete the basic information configuration first. Basic information determines the template name, the model used, and the basic compilation method. All knowledge compilation template types include these configuration items.

</template>
<template #zh>

创建或编辑知识编译（Knowledge Compilation）模板时，需要先完成基本信息配置。基本信息决定模板名称、所使用的模型以及基本编译方式。所有类型的知识编译模板都包含这些配置项。

</template>
</BiRow>

<BiRow>
<template #en>

## Template Name

</template>
<template #zh>

## 模板名称

</template>
</BiRow>

<BiRow>
<template #en>

Sets the name of the knowledge compilation template so different templates can be identified during later configuration and use. It is recommended to name the template based on its actual purpose so that the name clearly reflects the usage scenario.

</template>
<template #zh>

设置知识编译模板的名称，便于在后续配置和使用时区分不同模板。建议按实际用途命名模板，使名称能清晰反映使用场景。

</template>
</BiRow>

<BiRow>
<template #en>

## Template Description

</template>
<template #zh>

## 模板描述

</template>
</BiRow>

<BiRow>
<template #en>

The template description explains the function, applicable scenarios, and main processing content of the current template, making later viewing and management easier.

</template>
<template #zh>

模板描述用来说明当前模板的功能、适用场景和主要处理内容，便于后续查看和管理。

</template>
</BiRow>

<BiRow>
<template #en>

## Default Extraction Model

</template>
<template #zh>

## 默认提取模型

</template>
</BiRow>

<BiRow>
<template #en>

The default extraction model specifies the model used during knowledge compilation. The system uses this model to understand and analyze document content, and completes information extraction and structured generation according to the rules defined in the template.

</template>
<template #zh>

默认提取模型指定知识编译过程中使用的模型。系统使用该模型理解和分析文档内容，并按模板中定义的规则完成信息提取和结构化生成。

</template>
</BiRow>

<BiRow>
<template #en>

Select an appropriate model based on actual business requirements and model capabilities. You can refer to the related description in the "Template Selection Recommendations" section.

</template>
<template #zh>

请根据实际业务需求和模型能力选择合适的模型。相关说明可参阅「模板选择建议」章节。

</template>
</BiRow>

<BiRow>
<template #en>

## Template

</template>
<template #zh>

## 模板

</template>
</BiRow>

<BiRow>
<template #en>

Selects the knowledge artifact type to generate through knowledge compilation. The following templates are currently supported:

</template>
<template #zh>

选择要通过知识编译生成的知识工件（knowledge artifact）类型。目前支持以下模板：

</template>
</BiRow>

<BiRow>
<template #en>

- Graph
- Tree
- PageIndex
- MindMap
- Timeline
- Wiki

</template>
<template #zh>

- Graph
- Tree
- PageIndex
- MindMap
- Timeline
- Wiki

</template>
</BiRow>

<BiRow>
<template #en>

Different templates correspond to different knowledge organization methods and configuration items. After selecting a template, you can continue configuring the parameters for that template. The template is used to select the template type used by the knowledge compilation task.

</template>
<template #zh>

不同模板对应不同的知识组织方式和配置项。选定模板后，可继续配置该模板的参数。模板用于选择知识编译任务所使用的模板类型。

</template>
</BiRow>

<BiRow>
<template #en>

## Global Rules

</template>
<template #zh>

## 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Sets the requirements that the current knowledge compilation template must follow uniformly during execution.

</template>
<template #zh>

设置当前知识编译模板在执行过程中必须统一遵循的要求。

</template>
</BiRow>

<BiRow>
<template #en>

The content controlled by global rules differs between templates. For example, Graph can use global rules to constrain entity and relationship extraction, while Wiki can use global rules to control content organization and generation requirements. For specific configuration methods, refer to the corresponding template chapter.

</template>
<template #zh>

不同模板由全局规则控制的内容各不相同。例如，Graph 可以通过全局规则约束实体和关系提取，而 Wiki 可以通过全局规则控制内容组织和生成要求。具体配置方法请参阅对应的模板章节。

</template>
</BiRow>

<BiRow>
<template #en>

## Re-Split Parser Output

</template>
<template #zh>

## 重新切分解析器输出（Re-Split Parser Output）

</template>
</BiRow>

<BiRow>
<template #en>

Controls whether Compiler reorganizes and splits Parser output before executing knowledge compilation.

</template>
<template #zh>

控制编译器（Compiler）在执行知识编译前，是否对解析器（Parser）的输出重新组织和切分。

</template>
</BiRow>

<BiRow>
<template #en>

After this option is enabled, Compiler reorganizes Parser output based on the processing requirements of the current knowledge compilation template before executing subsequent knowledge compilation. If disabled, compilation is performed directly based on Parser output.

</template>
<template #zh>

启用该选项后，编译器会先按当前知识编译模板的处理要求对解析器输出重新组织和切分，再执行后续的知识编译；禁用时，则直接基于解析器输出进行编译。

</template>
</BiRow>

<BiRow>
<template #en>

This setting only affects the knowledge compilation process and does not replace Chunker in the Ingestion Pipeline.

</template>
<template #zh>

该设置只影响知识编译过程，不会取代摄取管道（Ingestion Pipeline）中的分块器（Chunker）。

</template>
</BiRow>

<BiRow>
<template #en>

Whether this feature is enabled must be determined when configuring the knowledge compilation template. After the template is saved, the setting takes effect when the template is used for knowledge compilation.

</template>
<template #zh>

是否启用该功能，须在配置知识编译模板时确定。模板保存后，该设置在使用模板进行知识编译时生效。

</template>
</BiRow>

<BiRow>
<template #en>

![Re-Split Parser Output](/ragflow-images/basic-info-config-rechunk-parser-output.jpg)

</template>
<template #zh>

![重新切分解析器输出](/ragflow-images/basic-info-config-rechunk-parser-output.jpg)

</template>
</BiRow>
