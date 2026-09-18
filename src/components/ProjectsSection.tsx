import { useState } from 'react';
import { ExternalLink, FolderGit2, Star, X } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Interactive Web App', 'Portfolio & Profile', 'Educational Experience'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-stone-200 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Selected Work</span>
            </div>
            <h2
              id="projects-section-heading"
              className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight"
            >
              Featured Projects
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-stone-200/70">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`project-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-[10px] font-semibold">
                      <Star className="w-3 h-3 fill-amber-600 text-amber-600" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-stone-500 mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed mb-5">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-900 hover:underline"
                  >
                    View Details
                  </button>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div
          id="project-detail-modal-overlay"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            id="project-detail-modal-card"
            className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {activeModalProject.category}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {activeModalProject.tagline}
              </p>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
              >
                Close
              </button>
              {activeModalProject.repoUrl && (
                <a
                  href={activeModalProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Open GitHub Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
