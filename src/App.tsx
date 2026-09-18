import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveTrivia } from './components/InteractiveTrivia';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'trivia', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="about-me-app-root" className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Navbar activeSection={activeSection} />
      <main id="main-content" className="flex-1">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <InteractiveTrivia />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
