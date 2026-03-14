import { useState } from 'react';

const statusStyles = {
  completed: 'status-badge status-completed',
  review: 'status-badge status-review',
  'in-progress': 'status-badge status-in-progress',
};

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
            <span className={statusStyles[project.status]}>{project.statusLabel}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">概述</h3>
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">技术栈</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">亮点</h3>
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-gray-300 flex items-start gap-2">
                  <span className="text-indigo-400 mt-1 text-sm">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div>
            <span className="text-xs text-gray-500">版本</span>
            <p className="text-gray-300 font-mono text-sm">{project.version}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">创建日期</span>
            <p className="text-gray-300 font-mono text-sm">{project.createdAt}</p>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-gray-500">项目路径</span>
            <p className="text-gray-300 font-mono text-sm break-all">{project.path}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCards({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">📁</span>
          项目管理
          <span className="text-sm font-normal text-gray-500 ml-2">
            {projects.length} 个项目
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-card p-5 cursor-pointer group"
            onClick={() => setSelectedProject(project)}
          >
            {/* Project name & status */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                {project.name}
              </h3>
              <span className={statusStyles[project.status]}>{project.statusLabel}</span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs px-2 py-0.5 bg-white/5 rounded text-gray-400">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-0.5 text-gray-500">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
              <span className="font-mono">{project.version}</span>
              <span>{project.createdAt}</span>
            </div>
          </div>
        ))}

        {/* Add project placeholder */}
        <div className="glass-card p-5 flex flex-col items-center justify-center min-h-[160px] cursor-pointer opacity-40 hover:opacity-70 transition-opacity border-dashed">
          <span className="text-3xl mb-2">+</span>
          <span className="text-sm text-gray-400">新增项目</span>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
