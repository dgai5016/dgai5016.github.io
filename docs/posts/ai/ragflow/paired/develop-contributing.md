<BiRow>
<template #en>

General guidelines for RAGFlow's community contributors.

</template>
<template #zh>

RAGFlow 社区贡献者的通用指南。

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

This document offers guidelines and major considerations for submitting your contributions to RAGFlow.

</template>
<template #zh>

本文档为向 RAGFlow 提交贡献提供指导原则和主要注意事项。

</template>
</BiRow>

<BiRow>
<template #en>

- To report a bug, file a [GitHub issue](https://github.com/infiniflow/ragflow/issues/new/choose) with us.
- For further questions, you can explore existing discussions or initiate a new one in [Discussions](https://github.com/orgs/infiniflow/discussions).

</template>
<template #zh>

- 要报告 bug，请向我们提交 [GitHub issue](https://github.com/infiniflow/ragflow/issues/new/choose)。
- 如有其他问题，你可以在 [Discussions](https://github.com/orgs/infiniflow/discussions) 中浏览现有讨论，或发起一场新的讨论。

</template>
</BiRow>

<BiRow>
<template #en>

## What You Can Contribute

</template>
<template #zh>

## 你可以贡献什么

</template>
</BiRow>

<BiRow>
<template #en>

The list below mentions some contributions you can make, but it is not a complete list.

</template>
<template #zh>

下面列出了一些你可以做出的贡献，但这并非完整清单。

</template>
</BiRow>

<BiRow>
<template #en>

- Proposing or implementing new features
- Fixing a bug
- Adding test cases or demos
- Posting a blog or tutorial
- Updates to existing documents, codes, or annotations.
- Suggesting more user-friendly error codes

</template>
<template #zh>

- 提出或实现新功能
- 修复 bug
- 添加测试用例或示例
- 发布博客或教程
- 更新现有的文档、代码或注释
- 建议更加用户友好的错误码

</template>
</BiRow>

<BiRow>
<template #en>

## File a Pull Request (PR)

</template>
<template #zh>

## 提交 Pull Request（PR）

</template>
</BiRow>

<BiRow>
<template #en>

### General Workflow

</template>
<template #zh>

### 通用流程

</template>
</BiRow>

<BiRow>
<template #en>

1. Fork our GitHub repository.
2. Clone your fork to your local machine:
`git clone git@github.com:<yourname>/ragflow.git`
3. Create a local branch:
`git checkout -b my-branch`
4. Provide sufficient information in your commit message
`git commit -m 'Provide sufficient info in your commit message'`
5. Commit changes to your local branch, and push to GitHub: (include necessary commit message)
`git push origin my-branch.`
6. Submit a pull request for review.

</template>
<template #zh>

1. Fork 我们的 GitHub 仓库。
2. 把你 fork 的仓库克隆到本地机器：
`git clone git@github.com:<yourname>/ragflow.git`
3. 创建一个本地分支：
`git checkout -b my-branch`
4. 在提交信息中提供充分的信息
`git commit -m 'Provide sufficient info in your commit message'`
5. 把改动提交到本地分支，并推送到 GitHub：（附上必要的提交信息）
`git push origin my-branch.`
6. 提交 pull request 以供审查。

</template>
</BiRow>

<BiRow>
<template #en>

### Before Filing a PR

</template>
<template #zh>

### 提交 PR 之前

</template>
</BiRow>

<BiRow>
<template #en>

- Consider splitting a large PR into multiple smaller, standalone PRs to keep a traceable development history.
- Ensure that your PR addresses just one issue, or keep any unrelated changes small.
- Add test cases when contributing new features. They demonstrate that your code functions correctly and protect against potential issues from future changes.

</template>
<template #zh>

- 考虑把一个大的 PR 拆分成多个更小的、相互独立的 PR，以保持可追溯的开发历史。
- 确保你的 PR 只处理一个问题；如果包含无关改动，请把改动控制在尽量小的范围内。
- 贡献新功能时请添加测试用例。它们既能证明你的代码运行正确，也能防范未来改动引入的潜在问题。

</template>
</BiRow>

<BiRow>
<template #en>

### Describing Your PR

</template>
<template #zh>

### 描述你的 PR

</template>
</BiRow>

<BiRow>
<template #en>

- Ensure that your PR title is concise and clear, providing all the required information.
- Refer to a corresponding GitHub issue in your PR description if applicable.
- Include sufficient design details for *breaking changes* or *API changes* in your description.

</template>
<template #zh>

- 确保 PR 标题简洁清晰，并提供所有必要信息。
- 如适用，请在 PR 描述中引用对应的 GitHub issue。
- 对于*破坏性变更*（breaking changes）或 *API 变更*，请在描述中提供充分的设计细节。

</template>
</BiRow>

<BiRow>
<template #en>

### Reviewing & Merging a PR

</template>
<template #zh>

### 审查并合并 PR

</template>
</BiRow>

<BiRow>
<template #en>

Ensure that your PR passes all Continuous Integration (CI) tests before merging it.

</template>
<template #zh>

合并前，请确保你的 PR 通过所有持续集成（CI）测试。

</template>
</BiRow>
