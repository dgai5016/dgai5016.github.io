# 设计规范（Design System）

本站全站设计语言的唯一权威参考。**任何改 UI / 加组件 / 调样式的改动，动笔前先过一遍本文**；新控件必须对齐既有范式，而不是发明新视觉。

> 本文件放在 `theme/` 目录与样式代码同住；`.vitepress/` 下的 md 不会构建成站点页面。数值均核对自源码（`style.css` 及 `components/`），改动样式时记得同步更新本文。

## 1. 设计原则

- **单 accent 色 + slate 灰阶**：全站只有一个品牌色 `#6c63ff`（紫），文字用 Tailwind slate 三级灰；不引入第二个彩色系
- **毛玻璃 glassmorphism**：全屏海洋背景图（`/bg-ocean.jpg` fixed cover）上叠半透明白 + backdrop-blur 的「玻璃层」构成一切容器
- **纯 CSS，无框架**：无 Tailwind/UnoCSS，token 用 CSS 变量，组件样式在 scoped style
- **单亮色主题**：没有暗色模式，不写 `prefers-color-scheme` / `.dark`；浮层面板底色可带 `var(--c-bg, #f7f8fc)` 兜底
- **中文内容优先**：lang zh-CN，排版按中文习惯（标点、字距）

## 2. Design Tokens

定义在 `style.css:1-15` 的 `:root`：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--c-accent` | `#6c63ff` | 唯一品牌色：链接、hover、激活态、图标高亮 |
| `--c-accent-light` | `#8b83ff` | accent 亮档（少用） |
| `--c-accent-dark` | `#5a52e0` | accent 深档（按压态，少用） |
| `--c-bg-sidebar` | `rgba(255,255,255,0.82)` | 侧栏底色 |
| `--c-bg-card` | `rgba(255,255,255,0.72)` | 卡片底色 |
| `--c-bg-card-hover` | `rgba(255,255,255,0.88)` | 卡片 hover 提亮 |
| `--c-bg-surface` | `rgba(0,0,0,0.04)` | 内嵌表面（kbd 徽标底） |
| `--c-text-primary` | `#1e293b`（slate-800） | 标题/正文主色 |
| `--c-text-secondary` | `#475569`（slate-600） | 次要文字 |
| `--c-text-muted` | `#64748b`（slate-500） | 弱化文字（meta/作者/占位） |
| `--c-border` | `rgba(0,0,0,0.08)` | 常规边框 |
| `--c-border-hover` | `rgba(108,99,255,0.3)` | 唯一的 accent 派生边框 |

**语义色**（硬编码在具体组件，不入 `:root`）：

| 色 | 值 | 场景 |
| --- | --- | --- |
| 读完绿 | `#16a34a` | 书单详情浮层的「读完」文字徽章（卡片上的已读标识用紫色序号徽章，不占此色） |
| 京东红 | `#e1251b` | 京东胶囊（hover `#c81623`） |
| 豆瓣绿 | `#00b51d` | 豆瓣胶囊（hover `#009c19`） |
| 微信读书绿 | `#07c160` | 微信读书胶囊（hover `#06ad56`）；比豆瓣绿亮，相邻可区分 |

**字号/间距/圆角没有 token**，全部按第 4 节档位硬编码——新代码也照此办理，不要单发明数值。

## 3. 毛玻璃配方

定义在 `style.css:50-70`。核心规律：**背景越不透明 blur 越轻**（实底轻糊、虚底重糊）：

| 类 | 背景 | blur | 边框 | 用途 |
| --- | --- | --- | --- | --- |
| `.glass` | `rgba(255,255,255,0.72)` | `16px` | `1px rgba(255,255,255,0.3)` | 通用玻璃底（不含圆角/阴影，消费方自己加） |
| `.glass-sidebar` | `rgba(255,255,255,0.78)` | `20px` | 无 | 桌面侧栏（最糊） |
| `.glass-card` | `rgba(255,255,255,0.92)` | `12px` | `1px rgba(255,255,255,0.4)` | 一切卡片/浮层面板的标准底 |

变体：关闭按钮毛玻璃 `rgba(255,255,255,0.85)` 无 blur（小面积不需要）；CommandPalette 面板复刻 glass-card 配方。

## 4. 档位表

新代码取值**必须落档**，两档之间就取近的。

### 圆角

| 档 | 值 | 场景 |
| --- | --- | --- |
| 胶囊/圆钮 | `9999px` | tag、按钮、关闭钮、计数器 |
| 大浮层 | `1rem`(16px) | desktop-sidebar、palette 面板、书单详情浮层 |
| **标准卡片** | `0.75rem`(12px) | home-post-card、PostCard、content-card、TOC、搜索框（最常用默认档） |
| 小控件 | `0.5rem`(8px) | 移动端按钮、nav-link、书单 book-card |
| 微圆角 | `4~6px` | inline code、kbd、代码块按钮 |
| 正圆 | `50%` | 头像、返回钮、对勾角标 |

### 阴影

| 档 | 值 | 场景 |
| --- | --- | --- |
| 极轻 | `0 10px 15px -3px rgba(0,0,0,0.05)` | 侧栏静置 |
| 轻 | `0 1px 3px rgba(0,0,0,0.12)` | 封面/图片静置 |
| hover 加深 | `0 4px 12~16px rgba(0,0,0,0.18)` | 上浮物 |
| 单侧投影 | `-20px 0 60px rgba(15,18,40,0.18)` | 右滑面板（往左投） |
| 居中模态 | `0 20px 60px rgba(15,18,40,0.25)`（深底 0.5） | Lightbox / Palette / 代码展开 |
| 书单详情 | `0 8px 40px rgba(0,0,0,0.35)` | 居中详情卡 |
| 白描边环 | `0 0 0 2px rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.25)` | 压在彩色图上的角标 |
| 焦点环 | `0 0 0 2px rgba(108,99,255,0.4)` | `:focus-visible` 无障碍 |
| inset 竖条 | `inset 3px 0 0 var(--c-accent)` | 键盘选中态（不占布局） |

### 过渡时长

| 档 | 场景 |
| --- | --- |
| `0.15s` | 微反馈：颜色/背景/小位移（nav、按钮、卡片） |
| `0.2s` | 标准变色：标题变色、filter（灰度恢复）、抽屉滑入 |
| `0.25s` | 浮层淡入淡出 |
| `0.3s` | glass-card 背景渐变 |
| `0.32s cubic-bezier(0.22,0.61,0.36,1)` | 右滑面板专属 ease（PostOverlay / BilingualOverlay 两处一致） |

## 5. hover 八范式

新交互元素的 hover **必须从下列选一种**，不发明新的：

| # | 范式 | 触发物 |
| --- | --- | --- |
| 1 | 标题变 `--c-accent` 色 | 一切卡片/列表项的标题（最普遍） |
| 2 | accent 泛色背景 `rgba(108,99,255,0.05~0.06)` | 导航项、书卡；胶囊按钮用 0.1→0.18 |
| 3 | 上浮 `translateY(-2px)` + 阴影加深 | 带封面的媒体卡（目前仅书封） |
| 4 | 图标旋转 `rotate(90deg)` | 浮层关闭按钮（×） |
| 5 | 深遮罩上白系泛光 `rgba(255,255,255,0.12→0.22)` | 深色遮罩里的按钮（Lightbox 箭头等） |
| 6 | 文字下划线 | 行内文字链（post-link、footer-link） |
| 7 | 灰度恢复 `filter: none` | 未读书封（见第 13 节） |
| 8 | 渐显 + accent（opacity 0→1） | 代码块角落按钮（hover 容器才出现） |

## 6. 浮层/模态范式

- **遮罩**：`rgba(15,18,40,0.45)` + `blur(2px)`；看大图的深色版 `0.82`
- **两种形态**：右滑面板（PostOverlay `min(100%,72rem)`、BilingualOverlay `min(94%,92rem)`，0.32s custom bezier）/ 居中模态（Lightbox、CommandPalette `36rem`、代码展开、书单详情 `40rem`）
- **关闭按钮三件套**：`2.5rem` 圆形、`top/right: 1rem`、白玻璃底 + 细边框，hover 图标转 accent + 旋转 90°（范式 4）——PostOverlay/BilingualOverlay/ImageLightbox/CodeBlockExpand 四处一致
- **关闭途径三保底**：点遮罩 / Esc / 点 ×；打开时锁 `body` 滚动并保存滚动位置，关闭还原
- **Teleport 到 body**：浮层内容挂 body，避免被父级层级/裁切影响

## 7. z-index 层级表

新增浮层**按此表取档**，插新层不得打乱既有相对顺序：

| 值 | 元素 |
| --- | --- |
| 2~3 | 组件内部小件（代码块语言标签、展开按钮） |
| 20 | 返回按钮 back-btn |
| 30 | 移动端抽屉遮罩 |
| 40 | 移动端抽屉面板 |
| 50 | hamburger 按钮 |
| 100 / 101 / 102 | 右滑面板遮罩 / 面板 / 关闭钮 |
| 200 / 201 | 全屏模态（Lightbox / Palette / 代码展开）遮罩 / 面板 |
| 999 | 书单详情浮层（需压过 PostOverlay） |

分层逻辑：内容(auto) < 返回钮(20) < 抽屉遮罩(30) < 抽屉(40) < hamburger(50) < 右滑面板(100系) < 全屏模态(200系) < 书单(999)。

## 8. 图标规范

- **内联 SVG**，不用 icon font / 不引图标库
- `viewBox="0 0 24 24"`，**Heroicons outline 风**：`fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
- 尺寸惯例：导航图标 `1rem` / 功能图标 `1.25rem` / 关闭钮内 `18~22px`
- 唯一例外：GitHub mark 用 `fill="currentColor"`
- 示例：关闭 X 的 path 为 `M6 18L18 6M6 6l12 12`（多处复用同一份）

## 9. 字号阶梯

全站**无自定义 font-family**（继承 VitePress 默认栈，zh-CN 下含 `'Punctuation SC', 'Inter', system-ui…`）。字号取档：

| 档 | 值 | 场景 |
| --- | --- | --- |
| 极小 | `0.7~0.75rem` | kbd 徽标、muted meta |
| 次要主力 | `0.85~0.875rem` | meta、次要正文 |
| 常规 | `0.9~1rem` | 正文、按钮 |
| 卡片标题 | `1.125rem`(18px) | PostCard 等 |
| section 标题 | `1.25~1.5rem` | 列表区块标题 |
| 页面标题 | `2.25rem` → ≥640 `3rem` | post/page-title |

## 10. 响应式断点（只有两档）

- **640px（sm）**：标题放大、post-grid 1→2 列、书墙 3→5 列、各浮层 padding 放大
- **1024px（lg）**：desktop-sidebar 显 / hamburger 藏、TOC 显、书墙 →10 列、双语文档双栏
- 写法两种并存：mobile-first `min-width`（新代码优先）与反向 `max-width: 639px/1023px`

## 11. 已知待统一项（技术债，只记录不动手）

- px 与 rem 并存：老 `.post-card` 系仍用 12/18px（style.css 前段）
- 两代颜色写法：老 `rgba(108,99,255,0.1)` vs 新 `color-mix(in srgb, var(--c-accent) 10%, transparent)`（PostCard/PostMeta）
- 四个浮层组件的关闭按钮/遮罩是复制粘贴，可提炼共享基类
- **新代码约定：一律 rem + 现 mainstream 的 rgba 写法；旧代码不动**

## 12. 新增 UI 自检清单

动笔前过一遍，全绿再交付：

- [ ] 颜色只用了 accent 三档 + slate 三级 + 语义色表内的值？
- [ ] 圆角 / 阴影 / 过渡时长都落在第 4 节档位上？
- [ ] hover 对齐了第 5 节八范式之一（不发明新效）？
- [ ] 若是浮层：遮罩配方、关闭三保底（遮罩/Esc/×）、滚动锁定、z-index 入表？
- [ ] 图标是内联 SVG stroke 风（viewBox 24 / stroke-width 2）？
- [ ] 640 和 1024 两档断点都检查过显示？
- [ ] `:focus-visible` 焦点环可见（键盘可用）？
- [ ] 中文文案与英文/数字之间有空格、标点全角？
- [ ] 组件插槽里的 markdown 语法不渲染（用 HTML 标签替代）？
- [ ] 图片有 width/height 或 aspect-ratio 占位（防布局抖动）？

## 13. 页面专属模式：书单「点亮式」读书进度

书墙里区分已读/未读的反转设计（85 本仅 2 本读完，灰掉未读比提亮已读对比效率更高）：

| 状态 | 封面 | 文字 | 序号徽章（封面左上角） |
| --- | --- | --- | --- |
| 未读 | `filter: grayscale(1)` + `opacity: 0.72` | 书名/作者转 muted 灰 | 18px 白玻璃胶囊、`--c-text-secondary` 灰字 |
| 读完（`isRead: true`） | 原色 | 正常深色 | 同一枚徽章转主题紫底（`var(--c-accent)`）白字 |
| hover 未读 | `filter: none` 恢复彩色（0.2s） | — | — |

状态并入序号徽章（不单放对勾）：主题内序号 1 起，两位数自动撑宽成胶囊，白描边环压在任意封面上都有清晰边界。

排序（sortBooks）：**已读置顶优先，已读之间按 finishedDate（读完年月，来自读书笔记的 created）先读完的在前**，其余保持 yaml 书写顺序（难度等级字段 level 已于 2026-09 移除）；置顶后紫色序号从读书历程最早的一本数起，「彩色封面 + 紫色序号」即「已读完」标识，详情浮层元信息尾部展示「读完于 YYYY-MM」。

数据字段：yaml `isRead: true`（2026-09 由 `status: 读完` 改名），完整文字语义保留在详情浮层里。
