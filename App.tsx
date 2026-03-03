
import React, { useState, useEffect } from 'react';
import { EDUCATION_PATHS, LOGO_URL } from './constants';
import { ViewState, EducationPath } from './types';
import MenuButton from './components/MenuButton';
import ContentDetail from './components/ContentDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MENU);
  const [selectedPath, setSelectedPath] = useState<EducationPath | null>(null);
  const [activeSubMenuParent, setActiveSubMenuParent] = useState<EducationPath | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePathSelect = (path: EducationPath) => {
    if (path.subPaths) {
      setActiveSubMenuParent(path);
      setCurrentView(ViewState.SUB_MENU);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedPath(path);
      setCurrentView(ViewState.CONTENT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentView === ViewState.CONTENT && activeSubMenuParent) {
      setCurrentView(ViewState.SUB_MENU);
      setSelectedPath(null);
    } else {
      setCurrentView(ViewState.MENU);
      setSelectedPath(null);
      setActiveSubMenuParent(null);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#6eae44] overflow-y-auto">
      {/* Kiosk Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
         <button 
          onClick={toggleFullscreen}
          className="p-3 bg-white/10 hover:bg-white/30 rounded-full text-white transition-all backdrop-blur-sm"
          title="Plein écran"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          )}
        </button>
      </div>

      {currentView === ViewState.MENU && (
        <div className="flex flex-col min-h-full items-center px-6 md:px-20 py-16">
          <div className="flex flex-col items-center mb-16 space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="bg-white/90 p-6 rounded-[2rem] shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-transform">
              <img src={LOGO_URL} alt="Logo" className="h-24 md:h-32 w-auto object-contain" />
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Explorez Votre Avenir</h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium italic">Choisissez une filière pour découvrir les opportunités de demain.</p>
            </div>
          </div>
          <div className="w-full max-w-7xl kiosk-grid animate-in fade-in zoom-in-95 duration-1000 delay-300">
            {EDUCATION_PATHS.map((path) => (
              <MenuButton key={path.id} path={path} onClick={handlePathSelect} />
            ))}
          </div>
          <footer className="mt-20 py-8 text-center text-white/30 text-lg uppercase tracking-widest font-bold border-t border-white/10 w-full max-w-xs">Interaction Tactile</footer>
        </div>
      )}

      {currentView === ViewState.SUB_MENU && activeSubMenuParent && (
        <div className="flex flex-col min-h-full items-center px-6 md:px-20 py-16 animate-in slide-in-from-right duration-500">
          <button 
            onClick={handleBack}
            className="self-start mb-8 flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/20 text-white text-xl font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Retour au menu principal
          </button>
          
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-white uppercase mb-2">{activeSubMenuParent.title}</h2>
            <p className="text-2xl text-white/70 italic">Veuillez choisir votre spécialité</p>
          </div>

          <div className="w-full max-w-5xl flex flex-col gap-6">
            {activeSubMenuParent.subPaths?.map((sub) => (
              <MenuButton key={sub.id} path={sub} onClick={handlePathSelect} />
            ))}
          </div>
        </div>
      )}

      {currentView === ViewState.CONTENT && selectedPath && (
        <ContentDetail path={selectedPath} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
