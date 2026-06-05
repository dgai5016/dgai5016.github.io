---
title: 用 VitePress + Tailwind CSS 搭建个人博客
date: 2025-06-05
tags: [VitePress, Tailwind CSS, Vue, 博客]
category: project
excerpt: 记录从零搭建一个现代科技感博客的过程，使用 VitePress 作为 SSG 框架，Tailwind CSS 构建自定义主题...
layout: post
pin: true
---

## 为什么选择 VitePress

在众多静态站点生成器中，我最终选择了 VitePress，主要基于以下考虑：

1. **Vue + TypeScript 技术栈** — 作为前端开发者，VitePress 的技术栈与我日常使用的工具完全一致
2. **极快的构建速度** — 基于 Vite 的 HMR 让开发体验非常流畅
3. **高度可定制** — 自定义主题系统灵活，可以完全控制 UI

## 技术方案

- **框架**: VitePress（Vite + Vue 3）
- **样式**: Tailwind CSS 4
- **评论**: Giscus（基于 GitHub Discussions）
- **部署**: GitHub Actions → GitHub Pages

## 项目结构

```
docs/
├── .vitepress/
│   ├── config.ts          # 站点配置
│   ├── posts.data.ts      # 文章数据加载
│   └── theme/             # 自定义主题
│       ├── Layout.vue
│       └── components/
├── posts/                 # 博客文章
└── pages/                 # 其他页面
```

## 关键实现

### 文章数据加载

使用 VitePress 的 `createContentLoader` API 自动扫描 Markdown 文件并提取 frontmatter：

```ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw.sort((a, b) =>
      +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    )
  },
})
```

### 自定义主题

通过 `theme/index.ts` 注册自定义 Layout，在 Vue 组件中使用 Tailwind CSS 构建科技感 UI。

## 总结

VitePress + Tailwind CSS 的组合非常适合想要完全控制博客外观的开发者。整个搭建过程大约需要一天时间，后续添加新文章只需要创建 Markdown 文件即可。
