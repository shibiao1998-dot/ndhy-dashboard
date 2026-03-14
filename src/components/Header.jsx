export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0a1a]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
            N
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">NDHY Dashboard</h1>
            <p className="text-xs text-gray-500">AI Agent Team 管理仪表盘</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 hidden sm:inline-block font-mono">
            一个人 + 七个 AI = 完整产品团队
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
        </div>
      </div>
    </header>
  );
}
