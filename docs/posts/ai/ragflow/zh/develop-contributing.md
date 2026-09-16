# 贡献指南

RAGFlow 社区贡献者的通用指南。

---

本文档为向 RAGFlow 提交贡献提供指导原则和主要注意事项。

- 要报告 bug，请向我们提交 [GitHub issue](https://github.com/infiniflow/ragflow/issues/new/choose)。
- 如有其他问题，你可以在 [Discussions](https://github.com/orgs/infiniflow/discussions) 中浏览现有讨论，或发起一场新的讨论。

## 你可以贡献什么

下面列出了一些你可以做出的贡献，但这并非完整清单。

- 提出或实现新功能
- 修复 bug
- 添加测试用例或示例
- 发布博客或教程
- 更新现有的文档、代码或注释
- 建议更加用户友好的错误码

## 提交 Pull Request（PR）

### 通用流程

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

### 提交 PR 之前

- 考虑把一个大的 PR 拆分成多个更小的、相互独立的 PR，以保持可追溯的开发历史。
- 确保你的 PR 只处理一个问题；如果包含无关改动，请把改动控制在尽量小的范围内。
- 贡献新功能时请添加测试用例。它们既能证明你的代码运行正确，也能防范未来改动引入的潜在问题。

### 描述你的 PR

- 确保 PR 标题简洁清晰，并提供所有必要信息。
- 如适用，请在 PR 描述中引用对应的 GitHub issue。
- 对于*破坏性变更*（breaking changes）或 *API 变更*，请在描述中提供充分的设计细节。

### 审查并合并 PR

合并前，请确保你的 PR 通过所有持续集成（CI）测试。
