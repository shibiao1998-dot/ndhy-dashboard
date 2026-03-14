export const projects = [
  {
    id: 'ai-org-showcase',
    name: 'AI Org Showcase',
    path: 'D:\\code\\openclaw-home\\workspace\\ai-org-showcase\\',
    description: 'AI组织分享会的交互式演示网页，展示"一个人 + 七个 AI = 完整产品团队"的组织化 AI 工作方式',
    techStack: ['HTML', 'CSS', 'Vanilla JS', 'Canvas 粒子动画', 'CSS Glassmorphism'],
    status: 'review', // 'completed' | 'review' | 'in-progress'
    statusLabel: '待审查',
    createdAt: '2026-03-14',
    version: 'v1',
    highlights: [
      '单文件架构，轻量快速',
      'Canvas 粒子动画背景',
      '毛玻璃 UI 效果',
      '展示组织化 AI 协作模式',
    ],
  },
];

export const experts = [
  {
    id: 'he-jiangxin',
    emoji: '🔧',
    name: '贺匠心',
    title: 'Skill 开发专家',
    personality: ['精益求精', '务实', '匠人心态'],
    motto: '一个好的 Skill，应该让任何 Agent 拿到就能用，不需要猜。',
    skills: ['skill-creator', 'clawhub', 'find-skills', 'github', 'coding-agent', 'tavily-search'],
    color: 'from-orange-500 to-amber-500',
    bgColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'lin-zhanqiao',
    emoji: '🌐',
    name: '林栈桥',
    title: '全栈开发专家',
    personality: ['扎实稳健', '全局视野', '安全意识强'],
    motto: '代码是给人读的，顺便让机器执行。',
    skills: ['coding-agent (Claude Code)', 'react-best-practices', 'frontend', 'agent-browser', 'github', 'gh-issues', 'tavily-search', 'feishu-fetch-doc', 'feishu-bitable'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  {
    id: 'su-moyan',
    emoji: '📝',
    name: '苏墨言',
    title: '技术文档专家',
    personality: ['结构感极强', '精炼', '有耐心'],
    motto: '好文档不是写出来的，是设计出来的。读者在 30 秒内找不到答案，就是文档的失败。',
    skills: ['feishu-create-doc', 'feishu-fetch-doc', 'feishu-update-doc', 'tavily-search', 'session-logs', 'github'],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  {
    id: 'yan-shouzheng',
    emoji: '🔍',
    name: '严守正',
    title: '代码审查专家',
    personality: ['严谨', '公正', '建设性'],
    motto: '好的 Review 不是"你这里写错了"，而是"这里可以更好，因为……"',
    skills: ['github', 'gh-issues', 'react-best-practices', 'coding-agent', 'tavily-search', 'session-logs'],
    color: 'from-purple-500 to-violet-500',
    bgColor: 'rgba(139, 92, 246, 0.08)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  {
    id: 'lu-zhiyuan',
    emoji: '🔬',
    name: '陆知远',
    title: '调研分析专家',
    personality: ['目光长远', '严谨求实', '决策导向'],
    motto: '调研的终点不是"我找到了很多信息"，而是"基于这些信息，我建议……"',
    skills: ['search-layer', 'content-extract', 'tavily-search', 'agent-browser', 'feishu-fetch-doc', 'feishu-bitable', 'github', 'session-logs'],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'rgba(244, 63, 94, 0.08)',
    borderColor: 'rgba(244, 63, 94, 0.2)',
  },
];

export const tokenData = {
  orgEstablishedAt: '2026-03-12',
  model: 'Claude 4.6 Opus',
  gateway: 'ndhy-gateway',
  pricing: {
    input: {
      tier1: { limit: 200000, pricePerMillion: 40.32 },  // ≤20万 tokens
      tier2: { pricePerMillion: 80.64 },                   // >20万 tokens
    },
    output: {
      tier1: { limit: 200000, pricePerMillion: 201.60 },
      tier2: { pricePerMillion: 302.40 },
    },
  },
  usage: {
    inputTokens: 593000,
    outputTokens: 4400,
    sessions: 1,
  },
};

/**
 * Calculate cost in RMB based on tiered pricing
 * @param {number} tokens - Number of tokens
 * @param {'input'|'output'} type - Token type
 * @returns {number} Cost in RMB
 */
export function calculateCost(tokens, type) {
  const pricing = tokenData.pricing[type];
  const tier1Limit = pricing.tier1.limit;

  if (tokens <= tier1Limit) {
    return (tokens / 1_000_000) * pricing.tier1.pricePerMillion;
  }

  const tier1Cost = (tier1Limit / 1_000_000) * pricing.tier1.pricePerMillion;
  const tier2Tokens = tokens - tier1Limit;
  const tier2Cost = (tier2Tokens / 1_000_000) * pricing.tier2.pricePerMillion;

  return tier1Cost + tier2Cost;
}

/**
 * Calculate total cost from token usage
 * @param {object} usage - { inputTokens, outputTokens }
 * @returns {{ inputCost: number, outputCost: number, totalCost: number }}
 */
export function calculateTotalCost(usage = tokenData.usage) {
  const inputCost = calculateCost(usage.inputTokens, 'input');
  const outputCost = calculateCost(usage.outputTokens, 'output');
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
  };
}

/**
 * Format number with Chinese units (万/亿)
 */
export function formatTokenCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return n.toString();
}

/**
 * Format RMB currency
 */
export function formatRMB(amount) {
  return '¥' + amount.toFixed(2);
}
