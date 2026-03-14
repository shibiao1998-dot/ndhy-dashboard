import { useState, useMemo } from 'react';
import { tokenData, calculateTotalCost, formatTokenCount, formatRMB } from '../data';

function ProgressBar({ label, value, max, color, subLabel }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm text-gray-300 font-mono">{subLabel}</span>
      </div>
      <div className="progress-bar-bg h-2.5">
        <div
          className="progress-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color[0]}, ${color[1]})`,
          }}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, description, icon }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-bold text-white font-mono">{value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}

function PricingTable() {
  const p = tokenData.pricing;
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        定价表 — {tokenData.model}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 text-gray-500 font-normal">类型</th>
              <th className="text-right py-2 text-gray-500 font-normal">≤20万 Tokens</th>
              <th className="text-right py-2 text-gray-500 font-normal">&gt;20万 Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-2 text-gray-300">输入</td>
              <td className="py-2 text-right font-mono text-blue-300">
                ¥{p.input.tier1.pricePerMillion}/百万
              </td>
              <td className="py-2 text-right font-mono text-blue-400">
                ¥{p.input.tier2.pricePerMillion}/百万
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-300">输出</td>
              <td className="py-2 text-right font-mono text-emerald-300">
                ¥{p.output.tier1.pricePerMillion}/百万
              </td>
              <td className="py-2 text-right font-mono text-emerald-400">
                ¥{p.output.tier2.pricePerMillion}/百万
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TokenPanel() {
  const [usage, setUsage] = useState(tokenData.usage);
  const [refreshing, setRefreshing] = useState(false);

  const costs = useMemo(() => calculateTotalCost(usage), [usage]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call — in the future, replace with real API endpoint
    setTimeout(() => {
      // For now, just re-set the same data (mock)
      setUsage({ ...tokenData.usage });
      setRefreshing(false);
    }, 800);
  };

  const daysSinceOrg = useMemo(() => {
    const start = new Date(tokenData.orgEstablishedAt);
    const now = new Date();
    return Math.ceil((now - start) / (1000 * 60 * 60 * 24));
  }, []);

  const totalTokens = usage.inputTokens + usage.outputTokens;
  const tier1Limit = tokenData.pricing.input.tier1.limit;

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">💰</span>
          Token 消耗与花费
        </h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-1.5 text-sm rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span className={refreshing ? 'animate-spin inline-block' : ''}>⟳</span>
          {refreshing ? '刷新中...' : '刷新数据'}
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon="📊"
          label="总 Token 消耗"
          value={formatTokenCount(totalTokens)}
          description={`输入 ${formatTokenCount(usage.inputTokens)} + 输出 ${formatTokenCount(usage.outputTokens)}`}
        />
        <StatCard
          icon="💴"
          label="总花费"
          value={formatRMB(costs.totalCost)}
          unit="RMB"
          description={`输入 ${formatRMB(costs.inputCost)} + 输出 ${formatRMB(costs.outputCost)}`}
        />
        <StatCard
          icon="📅"
          label="运营天数"
          value={daysSinceOrg}
          unit="天"
          description={`自 ${tokenData.orgEstablishedAt} 起`}
        />
        <StatCard
          icon="⚡"
          label="使用模型"
          value={tokenData.model}
          description={`via ${tokenData.gateway}`}
        />
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Token 用量明细</h3>
          <ProgressBar
            label="输入 Tokens"
            value={usage.inputTokens}
            max={1_000_000}
            color={['#6366f1', '#818cf8']}
            subLabel={`${formatTokenCount(usage.inputTokens)} / 1M`}
          />
          <ProgressBar
            label="输出 Tokens"
            value={usage.outputTokens}
            max={100_000}
            color={['#10b981', '#34d399']}
            subLabel={`${formatTokenCount(usage.outputTokens)} / 100k`}
          />
          <ProgressBar
            label="输入 Tier1 使用率"
            value={Math.min(usage.inputTokens, tier1Limit)}
            max={tier1Limit}
            color={['#f59e0b', '#fbbf24']}
            subLabel={`${formatTokenCount(Math.min(usage.inputTokens, tier1Limit))} / ${formatTokenCount(tier1Limit)}`}
          />
          {usage.inputTokens > tier1Limit && (
            <div className="mt-2 text-xs text-amber-400/80">
              ⚠ 已超出 Tier1 限额，超出部分 ({formatTokenCount(usage.inputTokens - tier1Limit)}) 按 Tier2 计费
            </div>
          )}
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">花费明细</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/3">
              <div>
                <div className="text-sm text-gray-300">输入 Token 花费</div>
                <div className="text-xs text-gray-500">
                  {usage.inputTokens <= tier1Limit
                    ? `全部按 Tier1 (¥${tokenData.pricing.input.tier1.pricePerMillion}/百万)`
                    : `Tier1: ${formatTokenCount(tier1Limit)} + Tier2: ${formatTokenCount(usage.inputTokens - tier1Limit)}`
                  }
                </div>
              </div>
              <span className="text-lg font-bold text-blue-300 font-mono">
                {formatRMB(costs.inputCost)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/3">
              <div>
                <div className="text-sm text-gray-300">输出 Token 花费</div>
                <div className="text-xs text-gray-500">
                  {usage.outputTokens <= tokenData.pricing.output.tier1.limit
                    ? `全部按 Tier1 (¥${tokenData.pricing.output.tier1.pricePerMillion}/百万)`
                    : `含 Tier2 加价`
                  }
                </div>
              </div>
              <span className="text-lg font-bold text-emerald-300 font-mono">
                {formatRMB(costs.outputCost)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <div className="text-sm font-semibold text-white">合计</div>
              <span className="text-xl font-bold gradient-text font-mono">
                {formatRMB(costs.totalCost)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing table */}
      <PricingTable />
    </section>
  );
}
