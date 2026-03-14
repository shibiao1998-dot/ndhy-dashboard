import Header from './components/Header';
import ProjectCards from './components/ProjectCards';
import ExpertPool from './components/ExpertPool';
import TokenPanel from './components/TokenPanel';
import { projects, experts } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <ProjectCards projects={projects} />
        <ExpertPool experts={experts} />
        <TokenPanel />
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
        NDHY AI Agent Team © 2026 · Powered by OpenClaw
      </footer>
    </div>
  );
}
