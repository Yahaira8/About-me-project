import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveTrivia } from './components/InteractiveTrivia';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Subpages
import { MediaPage } from './pages/MediaPage';
import { FuturePage } from './pages/FuturePage';
import { ChoiceJiuJitsuPage } from './pages/ChoiceJiuJitsuPage';
import { ChoiceCrochetPage } from './pages/ChoiceCrochetPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin'].includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin'].includes(path)) {
      return path;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  return (
    <div id="about-me-app-root" className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {/* Universal Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page View */}
      <main id="main-content" className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <InteractiveTrivia />
            <ContactSection />
          </>
        )}

        {currentPage === 'media' && <MediaPage />}
        {currentPage === 'future' && <FuturePage />}
        {currentPage === 'jiu-jitsu' && <ChoiceJiuJitsuPage />}
        {currentPage === 'crochet' && <ChoiceCrochetPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
