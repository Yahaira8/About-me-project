import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Target,
  Flame,
  Trophy,
  Compass,
  Maximize2,
  X,
  Tag,
  Award,
  Sparkles
} from 'lucide-react';

export const ChoiceJiuJitsuPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photoUrl = 'https://i.imgur.com/IzzqkAx.jpeg';

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const pillars = [
    {
      title: 'Mental Focus Under Pressure',
      description:
        'When rolling against an opponent, panicking burns energy. Jiu Jitsu teaches you to breathe, analyze leverage, and calmly find an escape route even in tight positions.',
      icon: Target
    },
    {
      title: 'Physical Resilience & Conditioning',
      description:
        'Continuous mat sparring tests core strength, flexibility, balance, and endurance. Every session builds the stamina needed for long days on the floor.',
      icon: Flame
    },
    {
      title: 'Humility & Continuous Learning',
      description:
        'In Brazilian Jiu Jitsu, you will tap out countless times before mastering a guard pass or submission. Every mistake is a direct lesson in humility and technical adjustment.',
      icon: Trophy
    }
  ];

  const photoMilestone = {
    title: 'Belt Promotion Ceremony • Yahaira Papin',
    category: 'Belt Promotion',
    imageSrc: photoUrl,
    caption:
      'Coach presenting the newly awarded belt to Yahaira Papin ("Yami P.") on the academy training mats, with her yellow belt draped around her neck—celebrating dedication, persistence, and continuous technical growth in Brazilian Jiu Jitsu.',
    detailedStory:
      'A proud milestone on the mats! Yahaira Papin ("Yami P.") standing proudly alongside her coach at the academy after being awarded her newly promoted belt. This recognition represents months of consistent sparring, positional escapes, guard defense drilling, and developing the composure to stay calm under intense physical pressure.',
    tags: ['BrazilianJiuJitsu', 'BeltPromotion', 'YamiP', 'MartialArts', 'Discipline', 'AcademyMats']
  };

  return (
    <div id="jiu-jitsu-page" className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-[#831859]" />
            <span>Choice Page 1 • Martial Arts Discipline</span>
          </div>
          <h1
            id="jiu-jitsu-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            <span className="neon-flowing-glow">Brazilian Jiu Jitsu: The Gentle Art</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            How physical discipline on the mat strengthens mental resilience, problem solving, and composure under pressure.
          </p>
        </div>

        {/* Feature Banner with Belt Promotion Photo & Caption */}
        <div className="neon-card grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-14 bg-white p-6 sm:p-8 rounded-2xl shadow-xs">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ffdef5]/80 text-[#831859] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Training Philosophy & Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Discipline Over Motivation
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              "Training in Brazilian Jiu Jitsu (BJJ) is one of the most demanding yet rewarding commitments in my life. It isn’t about brute strength—it is about body mechanics, timing, and composure. Knowing how to remain calm when caught in an unfavorable position is a skill that transfers directly into academic and healthcare environments."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859]">
                Guard Retention
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859]">
                Hip Escapes & Framing
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859]">
                Positional Control
              </span>
            </div>
          </div>

          {/* Interactive Photo Card with Click-to-Expand Modal */}
          <div className="md:col-span-6">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setIsModalOpen(true)}
              className="neon-card group cursor-pointer rounded-2xl bg-white shadow-xs overflow-hidden flex flex-col"
            >
              {/* Media Container with Hover Zoom */}
              <div className="relative aspect-3/4 sm:aspect-4/3 w-full overflow-hidden bg-stone-100">
                <img
                  src={photoMilestone.imageSrc}
                  alt={photoMilestone.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-stone-950/75 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#f7a6df]" />
                    <span>Promotion Photo</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#ffdef5]/95 text-[#831859] text-[10px] font-bold border border-[#f7a6df]/60 shadow-xs">
                    {photoMilestone.category}
                  </span>
                </div>

                {/* Expand Hover Hint */}
                <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all p-2 rounded-xl bg-white/95 text-stone-900 shadow-md flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#831859]" />
                  <span className="text-[11px] font-bold text-[#831859]">Click to expand</span>
                </div>
              </div>

              {/* Caption Section */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#ffdef5]/20 border-t border-[#f7a6df]/30">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#831859] transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#831859]" />
                    <span>Belt Promotion Ceremony</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    Academy Mats
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {photoMilestone.caption}
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#f7a6df]/30 flex items-center justify-between text-[11px] text-[#831859] font-semibold">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Click photo for full view & details</span>
                  </span>
                  <span className="text-stone-400">#YamiP</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="mb-14">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 text-center">
            Three Core Lessons from Mat Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="neon-card p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ffdef5] text-[#831859] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-stone-900 mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connection to Nursing & Healthcare */}
        <div className="neon-card bg-stone-900 p-6 sm:p-8 rounded-2xl text-stone-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-[#f7a6df] text-stone-950 flex items-center justify-center flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              The Bridge Between Martial Arts and Registered Nursing
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Healthcare professionals often encounter unpredictable, high-pressure emergencies. My BJJ practice trains my nervous system to de-escalate anxiety, stay observant, and act decisively with clarity and compassion.
            </p>
          </div>
        </div>
      </div>

      {/* Pop-up Modal: Matches Media Page Click-to-Expand Experience */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id="jiujitsu-expanded-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              id="jiujitsu-expanded-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="neon-card w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#ffdef5] text-[#831859] text-xs font-bold border border-[#f7a6df]">
                    {photoMilestone.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                    {photoMilestone.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Content */}
              <div className="flex-1 overflow-auto bg-stone-950 flex items-center justify-center p-3 sm:p-4 min-h-[300px] max-h-[500px]">
                <img
                  src={photoMilestone.imageSrc}
                  alt={photoMilestone.title}
                  className="max-h-[460px] max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Footer / Details & Story */}
              <div className="p-5 bg-white border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#831859]" />
                    <span>{photoMilestone.title}</span>
                  </h4>
                  <span className="text-xs font-semibold text-[#831859] bg-[#ffdef5] px-2 py-0.5 rounded">
                    Martial Arts Milestone
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {photoMilestone.detailedStory}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <div className="flex flex-wrap gap-1.5">
                    {photoMilestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#831859]" />
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#ffdef5] hover:bg-[#f7a6df] text-[#831859] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
