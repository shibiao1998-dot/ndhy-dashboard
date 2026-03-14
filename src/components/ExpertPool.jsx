import { useState } from 'react';

function ExpertModal({ expert, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="text-5xl w-18 h-18 flex items-center justify-center rounded-2xl"
              style={{ background: expert.bgColor }}
            >
              {expert.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{expert.name}</h2>
              <p className={`text-sm font-medium bg-gradient-to-r ${expert.color} bg-clip-text text-transparent`}>
                {expert.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Motto */}
        <div className="mb-6 p-4 rounded-xl" style={{ background: expert.bgColor }}>
          <p className="text-gray-300 italic leading-relaxed">
            "{expert.motto}"
          </p>
        </div>

        {/* Personality */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">性格特质</h3>
          <div className="flex flex-wrap gap-2">
            {expert.personality.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1 rounded-lg text-sm"
                style={{ background: expert.bgColor, border: `1px solid ${expert.borderColor}`, color: '#e0e0e0' }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">技能栈</h3>
          <div className="flex flex-wrap gap-2">
            {expert.skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertPool({ experts }) {
  const [selectedExpert, setSelectedExpert] = useState(null);

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          专家池
          <span className="text-sm font-normal text-gray-500 ml-2">
            {experts.length} 位专家
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 stagger-children">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="glass-card p-5 cursor-pointer group relative overflow-hidden"
            style={{ borderColor: expert.borderColor }}
            onClick={() => setSelectedExpert(expert)}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${expert.bgColor}, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Emoji & Name */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{expert.emoji}</div>
                <h3 className="text-lg font-bold text-white">{expert.name}</h3>
                <p className={`text-xs font-medium bg-gradient-to-r ${expert.color} bg-clip-text text-transparent`}>
                  {expert.title}
                </p>
              </div>

              {/* Personality tags */}
              <div className="flex flex-wrap justify-center gap-1 mb-3">
                {expert.personality.map((trait) => (
                  <span
                    key={trait}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: expert.bgColor, color: '#bbb' }}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              {/* Motto (truncated) */}
              <p className="text-xs text-gray-500 text-center italic line-clamp-2 mb-3">
                "{expert.motto}"
              </p>

              {/* Skill count */}
              <div className="text-center">
                <span className="text-xs text-gray-500">
                  {expert.skills.length} 项技能
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedExpert && (
        <ExpertModal
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      )}
    </section>
  );
}
