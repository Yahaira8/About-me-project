import { ArrowUp, GitBranch, Mail } from 'lucide-react';
import { profileData } from '../data';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = [
    { id: 'home', name: 'Home' },
    { id: 'media', name: 'Media' },
    { id: 'future', name: 'Future' },
    { id: 'jiu-jitsu', name: 'Jiu Jitsu' },
    { id: 'crochet', name: 'Crochet' },
    { id: 'admin', name: 'Admin' },
  ];

  return (
    <footer id="app-footer" className="py-12 border-t border-stone-200 bg-white text-stone-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f7a6df] text-stone-900 flex items-center justify-center font-bold text-xs border border-[#f7a6df] shadow-2xs">
              YP
            </div>
            <span className="font-semibold text-stone-800 text-sm">{profileData.name}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-stone-500">
              High School Freshman &bull; Learning with Mr. Benrud
            </span>
          </div>

          {/* Quick Page Links */}
          {onNavigate && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {pages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onNavigate(p.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#831859] hover:underline cursor-pointer font-medium"
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-[#831859] flex items-center gap-1.5 transition-colors"
              title="Email Yahaira"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#831859] flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <button
              id="footer-back-to-top-btn"
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#831859] flex items-center gap-1.5 transition-colors p-1.5 rounded-md hover:bg-[#ffdef5]"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <span>&copy; {new Date().getFullYear()} Yahaira Papin. Built with React, TypeScript & Tailwind CSS.</span>
          <span className="flex items-center gap-1">
            Passions: Brazilian Jiu Jitsu &bull; Crochet Plushies &bull; Nursing Healthcare
          </span>
        </div>
      </div>
    </footer>
  );
};
