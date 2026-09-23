import { useState, useEffect } from 'react';
import { GitBranch, Mail, Menu, X, Lock } from 'lucide-react';
import { profileData } from '../data';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = [
    { id: 'home', name: 'Home' },
    { id: 'media', name: 'Media' },
    { id: 'future', name: 'Future' },
    { id: 'jiu-jitsu', name: 'Jiu Jitsu' },
    { id: 'crochet', name: 'Crochet' },
    { id: 'admin', name: 'Admin', icon: Lock },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-2.5'
          : 'bg-stone-50/80 backdrop-blur-xs border-b border-stone-200/50 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <button
          id="navbar-brand-link"
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-stone-900 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-[#f7a6df] group-hover:text-stone-900 transition-colors">
            YP
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-stone-900 text-sm sm:text-base leading-tight">
              {profileData.name}
            </span>
            <span className="text-[11px] text-[#831859] font-medium">
              Portfolio & Creative Showcase
            </span>
          </div>
        </button>

        {/* Desktop Navigation (Universal Across All 6 Pages) */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-1">
          {navPages.map((page) => {
            const isActive = currentPage === page.id;
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                type="button"
                id={`nav-link-${page.id}`}
                onClick={() => handleLinkClick(page.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#831859] bg-[#ffdef5] font-bold border border-[#f7a6df] shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {Icon && <Icon className="w-3 h-3 text-[#831859]" />}
                <span>{page.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Links */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            id="navbar-github-link"
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GitBranch className="w-4 h-4" />
          </a>
          <button
            id="navbar-contact-cta"
            type="button"
            onClick={() => {
              if (currentPage !== 'home') {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-stone-900" />
            <span>Contact</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-dropdown"
          className="md:hidden bg-stone-50 border-b border-stone-200 px-4 pt-3 pb-5 shadow-lg animate-in fade-in"
        >
          <div className="flex flex-col gap-1.5">
            {navPages.map((page) => {
              const isActive = currentPage === page.id;
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  type="button"
                  id={`mobile-nav-link-${page.id}`}
                  onClick={() => handleLinkClick(page.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-between ${
                    isActive
                      ? 'text-[#831859] bg-[#ffdef5] font-bold border border-[#f7a6df]'
                      : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#831859]" />}
                    <span>{page.name}</span>
                  </div>
                  {isActive && <span className="text-[10px] text-[#831859] font-bold">Active</span>}
                </button>
              );
            })}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 py-1"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub @Yahaira8</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  handleLinkClick('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3 py-1 text-xs font-semibold text-stone-900 bg-[#f7a6df] hover:bg-[#f28ecc] border border-[#f7a6df] rounded-lg"
              >
                Contact Note
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
