---
title: TypeScript 泛型实战指南
date: 2025-05-28
tags: [TypeScript, 编程技术]
category: coding
excerpt: 深入理解 TypeScript 泛型的使用场景，从基础语法到高级技巧...
layout: post
---

## 什么是泛型

泛型（Generics）是 TypeScript 中最强大的特性之一，它允许我们在定义函数、接口或类时不预先指定具体类型，而在使用时再确定。

## 基础语法

```typescript
function identity<T>(arg: T): T {
  return arg
}

const result = identity<string>('hello') // 类型为 string
const num = identity(42) // 类型推断为 number
```

## 常见使用场景

### 1. 泛型约束

使用 `extends` 限制泛型的范围：

```typescript
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength('hello')   // OK
logLength([1, 2, 3]) // OK
// logLength(123)    // Error: number 没有 length 属性
```

### 2. 泛型与 API 响应

在处理 API 响应时，泛型非常有用：

```typescript
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  return response.json()
}

// 使用时指定具体类型
interface User {
  id: number
  name: string
}

const userResponse = await fetchApi<User>('/api/user/1')
// userResponse.data 的类型是 User
```

### 3. 条件类型与 infer

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

function getUser() {
  return { id: 1, name: 'dg' }
}

type UserReturn = ReturnType<typeof getUser>
// { id: number; name: string }
```

## 实用工具类型

TypeScript 内置了许多基于泛型的工具类型：

- `Partial<T>` — 将所有属性变为可选
- `Required<T>` — 将所有属性变为必需
- `Pick<T, K>` — 从 T 中选取部分属性
- `Omit<T, K>` — 从 T 中排除部分属性
- `Record<K, V>` — 构建键值对类型

## 总结

泛型是 TypeScript 类型系统的灵魂。掌握泛型不仅能写出更安全的代码，还能提升代码的复用性。建议在实际项目中多练习，逐步加深理解。
