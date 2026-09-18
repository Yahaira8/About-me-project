import { User, Compass, Heart, Award } from 'lucide-react';
import { profileData, journeyMilestones } from '../data';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 border-t border-stone-200/80 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>Background & Story</span>
          </div>
          <h2
            id="about-section-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight"
          >
            About Yahaira
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Bio Narrative */}
          <div className="lg:col-span-7 space-y-5 text-stone-700 leading-relaxed text-base">
            {profileData.bio.map((paragraph, index) => (
              <p key={index} className="text-stone-700">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mb-1">
                  Creative Exploration
                </h3>
                <p className="text-xs text-stone-600 leading-normal">
                  Always testing fresh web standards, playful cursors, and custom interaction patterns to delight visitors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mb-1">
                  Community & Nature
                </h3>
                <p className="text-xs text-stone-600 leading-normal">
                  Deeply interested in pet advocacy, monarch butterfly ecology, and accessible digital education.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline / Highlights Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div
              id="journey-timeline-card"
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Development Journey
                </h3>
              </div>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {journeyMilestones.map((milestone, idx) => (
                  <div key={idx} className="relative pl-7 group">
                    {/* Bullet */}
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-amber-600 group-hover:scale-110 transition-transform"></div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <h4 className="text-sm font-semibold text-stone-900">
                        {milestone.title}
                      </h4>
                      {milestone.organization && (
                        <p className="text-xs text-stone-500 mb-1">
                          {milestone.organization}
                        </p>
                      )}
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
