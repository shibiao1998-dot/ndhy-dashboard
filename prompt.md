Create a NDHY AI Agent Team management dashboard with React + Vite + Tailwind CSS. Dark theme, clean card-based layout, responsive.

Three main sections:

1. PROJECT CATALOG - Card list of projects, click to see details:
   - ai-org-showcase: Interactive demo page for AI org presentation. Tech: HTML+CSS+JS, Canvas animation, CSS glassmorphism. Status: v1 done, pending review. Path: D:\code\openclaw-home\workspace\ai-org-showcase\. Created: 2026-03-14.
   (Structure should support adding more projects easily)

2. EXPERT POOL - 5 AI expert cards with personality, motto, skills:
   - 🔧 贺匠心 Skill Developer: Perfectionist, pragmatic, craftsman. Motto: A good Skill should be usable by any Agent without guessing. Skills: skill-creator, clawhub, find-skills, github, coding-agent, tavily-search
   - 🌐 林栈桥 Fullstack Developer: Solid, holistic vision, security-minded. Motto: Code is written for humans to read, and incidentally for machines to execute. Skills: coding-agent(Claude Code), react-best-practices, frontend, agent-browser, github, gh-issues, tavily-search, feishu-fetch-doc, feishu-bitable
   - 📝 苏墨言 Technical Writer: Highly structured, concise, patient. Motto: Good docs are designed, not written. If readers cant find answers in 30s, the doc failed. Skills: feishu-create-doc, feishu-fetch-doc, feishu-update-doc, tavily-search, session-logs, github
   - 🔍 严守正 Code Reviewer: Rigorous, fair, constructive. Motto: Good review isnt you wrote this wrong but this could be better because... Skills: github, gh-issues, react-best-practices, coding-agent, tavily-search, session-logs
   - 🔬 陆知远 Research Analyst: Far-sighted, evidence-based, decision-oriented. Motto: Research doesnt end at I found lots of info but at Based on this, I recommend... Skills: search-layer, content-extract, tavily-search, agent-browser, feishu-fetch-doc, feishu-bitable, github, session-logs

3. TOKEN USAGE and COST - Show cumulative token consumption converted to RMB:
   Pricing (Claude 4.6 Opus via ndhy-gateway):
   - Input: 40.32 RMB per million tokens (for first 200k tokens), 80.64 RMB per million (above 200k tokens)
   - Output: 201.60 RMB per million tokens (for first 200k tokens), 302.40 RMB per million (above 200k tokens)
   Mock data: input 593000 tokens, output 4400 tokens. Org founded: 2026-03-12.
   Auto-calculate RMB cost based on pricing tiers. Show big numbers and simple chart.
   Include a Refresh Data button placeholder for future API integration.

Use Chinese for all UI labels and content. Make it visually appealing with smooth animations.
Create complete project with package.json, all components, and README.md.

Important technical requirements:
- Use Vite 6 with React 19
- Use Tailwind CSS v3 (NOT v4). For Tailwind v3: install tailwindcss postcss autoprefixer, create tailwind.config.js with content paths, create postcss.config.js, add @tailwind directives in index.css. Do NOT use @import tailwindcss or Tailwind v4 syntax.
- Create proper .gitignore file
- Initialize with npm (not yarn/pnpm)
