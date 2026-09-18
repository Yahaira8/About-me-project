import { useState, useEffect } from 'react';
import { GitBranch, Mail, Menu, X } from 'lucide-react';
import { profileData } from '../data';

interface NavbarProps {
  activeSection: string;
}

export const Navbar = ({ activeSection }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Trivia', href: '#trivia' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          id="navbar-brand-link"
          href="#"
          className="flex items-center gap-2.5 text-stone-900 group"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-amber-600 transition-colors">
            YP
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-stone-900 text-sm sm:text-base leading-tight">
              {profileData.name}
            </span>
            <span className="text-[11px] text-stone-500 font-normal">
              Portfolio & Profile
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-stone-900 bg-stone-200/70 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.name}
              </a>
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
          <a
            id="navbar-contact-cta"
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-stone-800" />
            <span>Get in Touch</span>
          </a>
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
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-stone-800 hover:bg-stone-100 font-medium text-sm"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 py-1"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub @Yahaira8</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-200 rounded-lg"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
