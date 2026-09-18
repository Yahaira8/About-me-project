import { ArrowUp, GitBranch, Heart } from 'lucide-react';
import { profileData } from '../data';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="py-12 border-t border-stone-200 bg-white text-stone-500 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-stone-900 text-stone-50 flex items-center justify-center font-bold text-xs">
            YP
          </div>
          <span className="font-semibold text-stone-800">{profileData.name}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> & curiosity
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 flex items-center gap-1.5 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <button
            id="footer-back-to-top-btn"
            type="button"
            onClick={scrollToTop}
            className="hover:text-stone-900 flex items-center gap-1.5 transition-colors p-1.5 rounded-md hover:bg-stone-100"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
