/**
 * 标题子序列模糊匹配 + 相关性打分
 *
 * 设计目标（参考 fzf / VSCode Quick Open 的 fuzzy matching）：
 *   - 连打、不输空格也能搜到——查询串的每个字符「按顺序」出现在标题里即可，不要求连续。
 *     例：查询「梯度学习」可命中《梯度下降：机器学习如何优化》（梯→度→学→习，中间隔着别的字）。
 *   - 命中后按相关性排序，避免宽松规则导致一堆不相关的结果。
 *
 * 纯 JS，零依赖；中英文通用。调用前请把 query 与 title 各自 toLowerCase（大小写不敏感）。
 *
 * @param {string} query 查询串（建议先 trim + toLowerCase）
 * @param {string} title 文章标题（建议先 toLowerCase）
 * @returns {number} 分数越大越相关；返回 -Infinity 表示 query 不是 title 的子序列（不匹配）
 */
export function fuzzyScore(query, title) {
  // 空查询不参与打分（调用方一般在查询为空时就直接跳过本函数，走默认排序）
  if (!query) return 0

  let score = 0          // 累计相关性分数
  let qi = 0             // query 指针：当前要匹配 query 的第几个字符
  let consecutive = 0    // 当前连续命中片段的长度
  let prevMatch = -2     // 上一个命中位置；初值 -2 保证首个字符不会被误判为「与前一个相邻」

  // 单趟扫描：用 ti 在 title 上前进，命中一个字符就消费 query 的一个字符
  for (let ti = 0; ti < title.length && qi < query.length; ti++) {
    if (title[ti] !== query[qi]) continue

    // —— 命中一个字符，逐项累加分数 ——

    // 1) 位置分：命中越靠前越相关，靠后则扣分（用 -ti 作惩罚）
    score -= ti

    // 2) 连续度分：若与上一个命中位置相邻，连续片段长度 +1 并按长度递增奖励；
    //    一旦中断就清零。这样「梯度」连着打会比「梯…度」隔开打得分更高。
    if (prevMatch === ti - 1) {
      consecutive += 1
      score += consecutive * 8
    } else {
      consecutive = 0
    }

    // 3) 词首分：当前字符处于一个词的开头时加分——
    //    前一字符是空格/标点/符号，或中英交界（如「AI概念」的「概」、「概念AI」的「A」）
    if (ti === 0 || isWordStart(title[ti], title[ti - 1])) {
      score += 15
    }

    prevMatch = ti
    qi += 1
  }

  // query 没能全部消费完 → 它不是 title 的子序列 → 不匹配
  if (qi < query.length) return -Infinity

  // 4) 标题长度惩罚：标题越短、匹配密度越高越相关（每多一个字符扣 1 分）
  score -= title.length

  return score
}

/**
 * 判断当前字符是否处于「词的开头」
 * @param {string} cur  当前命中的字符
 * @param {string} prev 紧邻它前面的字符
 * @returns {boolean}
 */
function isWordStart(cur, prev) {
  // 规则一：前一字符不是字母/数字/汉字（即空格、标点、符号）→ 当前字符是词首
  if (!/[a-zA-Z0-9一-龥]/.test(prev)) return true
  // 规则二：中英交界——字母与汉字相邻时，后一个算词首
  if (/[a-zA-Z]/.test(prev) && /[一-龥]/.test(cur)) return true
  if (/[一-龥]/.test(prev) && /[a-zA-Z]/.test(cur)) return true
  return false
}
