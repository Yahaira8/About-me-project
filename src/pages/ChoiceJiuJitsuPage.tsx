import { Shield, Target, Flame, Trophy, Compass } from 'lucide-react';

export const ChoiceJiuJitsuPage = () => {
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
            Brazilian Jiu Jitsu: The Gentle Art
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            How physical discipline on the mat strengthens mental resilience, problem solving, and composure under pressure.
          </p>
        </div>

        {/* Feature Banner with Visual Media */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-14 bg-white p-6 sm:p-8 rounded-2xl border border-[#f7a6df]/50 shadow-xs">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#831859] uppercase tracking-wider">
              Training Philosophy
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
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
          <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-video border border-stone-200 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
              alt="Brazilian Jiu Jitsu Sparring Mat"
              className="w-full h-full object-cover"
            />
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
                  className="p-6 rounded-2xl bg-white border border-[#f7a6df]/50 hover:border-[#f7a6df] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
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
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-stone-100 flex flex-col md:flex-row items-center gap-6">
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
    </div>
  );
};
