import { HeartPulse, GraduationCap, Building2, Stethoscope, Compass, Calendar, Award } from 'lucide-react';
import { profileData } from '../data';

export const FuturePage = () => {
  const fiveYearPlan = [
    {
      year: 'Year 1 (2025 - 2026)',
      phase: 'High School Foundation & Web Design Mastery',
      icon: GraduationCap,
      description:
        'Complete freshman and sophomore high school courses with high honors while advancing digital web design skills with Mr. Benrud and training regularly in Brazilian Jiu Jitsu to cultivate physical and mental resilience.',
      milestones: [
        'Master responsive web development & accessible semantic UI',
        'Maintain a 3.8+ GPA across core STEM and health sciences',
        'Consistently train on the mats in Brazilian Jiu Jitsu'
      ]
    },
    {
      year: 'Year 2 (2026 - 2027)',
      phase: 'Healthcare Volunteer & Shadowing Experience',
      icon: HeartPulse,
      description:
        'Begin volunteering at local San Diego clinics or pediatric centers. Gain direct exposure to inpatient and outpatient workflows while taking AP Biology and Anatomy & Physiology.',
      milestones: [
        'Complete 100+ hours of community healthcare volunteering',
        'Earn basic First Aid, CPR, and AED certifications',
        'Create a patient care support website for young hospital visitors'
      ]
    },
    {
      year: 'Year 3 (2027 - 2028)',
      phase: 'High School Graduation & Nursing School Admission',
      icon: Building2,
      description:
        'Graduate high school with academic honors and enter an accredited Bachelor of Science in Nursing (BSN) collegiate program in California.',
      milestones: [
        'Graduate in the top tier of high school class',
        'Enroll in University BSN / Pre-Nursing program',
        'Join the Student Nurses Association'
      ]
    },
    {
      year: 'Year 4 (2028 - 2029)',
      phase: 'Clinical Rotations & Hands-On Patient Care',
      icon: Stethoscope,
      description:
        'Engage in intensive hospital clinical rotations across pediatric, med-surg, and emergency departments, mastering bedside patient care and clinical teamwork.',
      milestones: [
        'Complete clinical hospital rotations with stellar evaluations',
        'Master pharmacology, health assessment, and IV insertion',
        'Gift handmade crochet cheer plushies to pediatric patients'
      ]
    },
    {
      year: 'Year 5 (2029 - 2030)',
      phase: 'NCLEX-RN Exam & Registered Nurse (RN) Licensure',
      icon: Award,
      description:
        'Pass the NCLEX-RN national examination on the first attempt and begin working as a dedicated Registered Nurse at a renowned regional medical center.',
      milestones: [
        'Attain California Registered Nurse (RN) Board Licensure',
        'Accept residency position in a Pediatric or Critical Care Unit',
        'Provide daily compassionate, empathetic, life-saving care'
      ]
    }
  ];

  return (
    <div id="future-page" className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#831859]" />
            <span>5-Year Road Map • Long-Term Career Story</span>
          </div>
          <h1
            id="future-page-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            A 5-Year Vision into Healthcare
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            From high school web design and mat discipline to becoming a compassionate Registered Nurse (RN) dedicated to uplifting patient lives.
          </p>
        </div>

        {/* Long-Term Goal Banner */}
        <div
          id="long-term-goal-banner"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#ffdef5]/40 border-2 border-[#f7a6df] shadow-xs mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#831859] uppercase tracking-wider">
                Realistic Long-Term Objective
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                Registered Nurse (RN) — Pediatric or Critical Care Medicine
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
                "My core career aspiration is to provide compassionate, attentive healthcare where every patient feels heard, comforted, and protected during their most vulnerable moments."
              </p>
            </div>
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#ffdef5] text-[#831859] border border-[#f7a6df] flex items-center justify-center shadow-inner">
              <Stethoscope className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Timeline Story with Media & Content */}
        <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-[#ffdef5]">
          {fiveYearPlan.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.year}
                id={`future-plan-year-${index + 1}`}
                className="relative pl-12 sm:pl-20 group"
              >
                {/* Milestone Node */}
                <div className="absolute left-1.5 sm:left-5.5 top-5 w-6 h-6 rounded-full bg-white border-4 border-[#f7a6df] shadow-xs flex items-center justify-center group-hover:scale-125 transition-transform"></div>

                <div className="p-6 rounded-2xl bg-white border border-[#f7a6df]/50 hover:border-[#f7a6df] shadow-xs hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#ffdef5] text-[#831859] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#831859] uppercase tracking-wider">
                        {plan.year}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Planned Step</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                    {plan.phase}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {plan.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Key Milestones & Targets
                    </span>
                    <ul className="space-y-1.5">
                      {plan.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-stone-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f7a6df] mt-1.5 flex-shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inspiration & Mentorship Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
              alt="Medical & Nursing Career Preparation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="text-base font-bold text-stone-900">
              Guidance from High School to Healthcare
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              "Learning web design with Mr. Benrud teaches structured thinking, troubleshooting under pressure, and how to create clean interfaces. These exact problem-solving habits translate directly to the fast-paced, high-stakes environment of healthcare."
            </p>
            <div className="text-xs font-semibold text-[#831859]">
              — Yahaira Papin, {profileData.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
