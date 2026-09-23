import { Code, Palette, Sparkles, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data';

export const SkillsSection = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#831859]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#831859]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#831859]" />;
      default:
        return <Code className="w-5 h-5 text-[#831859]" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#831859]" />
            <span>Core Competencies</span>
          </div>
          <h2
            id="skills-section-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3"
          >
            Skills & Craft
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            A combination of modern web technologies, interface aesthetics, and personal passions that shape my work.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={index}
              id={`skills-category-card-${index}`}
              className="p-6 rounded-2xl bg-stone-50 border border-[#f7a6df]/30 hover:border-[#f7a6df]/70 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdef5] border border-[#f7a6df]/50 flex items-center justify-center shadow-2xs">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-snug">
                      {category.title}
                    </h3>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {category.skills.length} competencies
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-stone-900">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ffdef5] text-[#831859] border border-[#f7a6df]/50">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] text-stone-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#831859]" />
                <span>Actively utilized in current work</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
