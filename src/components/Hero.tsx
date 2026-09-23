import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Check, Copy, ExternalLink, MapPin, Sparkles } from 'lucide-react';
import { profileData } from '../data';

export const Hero = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Main Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdef5] border border-[#f7a6df]/70 text-xs font-semibold text-[#831859] mb-6 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f7a6df] animate-pulse"></span>
              <span>{profileData.statusMessage}</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] mb-4"
            >
              {profileData.name}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#831859] font-medium mb-3">
              {profileData.title}
            </p>

            {/* Location & Pronouns */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-500 mb-6">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#831859]" />
                {profileData.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span>Pronouns: {profileData.pronouns}</span>
            </div>

            {/* Introductory statement */}
            <p className="text-stone-600 text-base leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
              High school freshman learning hands-on web design with Mr. Benrud. Dedicated to athletic discipline on the mat in Brazilian Jiu Jitsu, crafting handmade crochet plushies, and preparing for a future career as a compassionate Registered Nurse (RN).
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                id="hero-projects-cta-btn"
                href="#projects"
                className="px-6 py-3 rounded-xl bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] text-stone-900 font-semibold text-sm transition-all shadow-xs hover:shadow-sm flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 text-stone-700" />
              </a>

              <button
                id="hero-copy-email-btn"
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-xl bg-[#ffdef5] hover:bg-[#f7a6df]/30 border border-[#f7a6df]/60 text-stone-900 font-medium text-sm transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#831859]" />
                    <span className="text-[#831859] font-semibold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#831859]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                id="hero-github-link-btn"
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white hover:bg-[#ffdef5] border border-stone-200 hover:border-[#f7a6df] text-stone-700 transition-colors"
                title="Open GitHub"
                aria-label="Open GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Profile Card / Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-xs sm:max-w-sm flex-shrink-0"
          >
            <div
              id="hero-profile-card"
              className="relative p-6 rounded-2xl bg-white border border-[#f7a6df]/50 shadow-xs"
            >
              {/* Decorative Accent */}
              <div className="absolute top-4 right-4 text-[#831859]">
                <Sparkles className="w-5 h-5 opacity-80" />
              </div>

              {/* Student Portrait Box */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#f7a6df] shadow-md mb-5 bg-[#ffdef5]">
                <img
                  id="student-photo-above-fold"
                  src={profileData.avatarUrl}
                  alt={`${profileData.name} - Student Portrait`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#831859] shadow-2xs">
                  Student
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">
                    {profileData.name}
                  </h2>
                  <p className="text-xs text-[#831859] font-medium">Freshman & Web Design Student</p>
                </div>

                <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-3 text-left">
                  <div className="p-2.5 rounded-lg bg-[#ffdef5]/60 border border-[#f7a6df]/40">
                    <span className="block text-[11px] text-[#831859] font-semibold uppercase tracking-wider">
                      Discipline
                    </span>
                    <span className="text-xs font-semibold text-stone-800">
                      Jiu Jitsu
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#ffdef5]/60 border border-[#f7a6df]/40">
                    <span className="block text-[11px] text-[#831859] font-semibold uppercase tracking-wider">
                      Craft
                    </span>
                    <span className="text-xs font-semibold text-stone-800">
                      Crochet Plushies
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-600 italic">
                  "Building clean digital experiences while pursuing athletic discipline and compassionate healthcare."
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
