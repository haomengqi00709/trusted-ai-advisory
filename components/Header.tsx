
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../App';

interface HeaderProps {
  onInquireClick: () => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onInquireClick, currentLang, onLangChange }) => {
  const [isDemosOpen, setIsDemosOpen] = useState(false);

  const t = {
    en: {
      tenets: "Core Tenets",
      services: "Services",
      demos: "Demos",
      contact: "Contact",
      inquire: "Inquire",
      subtitle: "Innovation within Boundaries"
    },
    fr: {
      tenets: "Principes",
      services: "Services",
      demos: "Démos",
      contact: "Contact",
      inquire: "Demander",
      subtitle: "L'innovation dans le respect des cadres"
    }
  }[currentLang];

  const demos = {
    en: [
      {
        title: "Pocket Trade Commissioner",
        desc: "Visual HS Code recognition & SME export feasibility engine.",
        tag: "Live Prototype",
        href: "https://pockettc.vercel.app",
        videoId: "vWMMLBp-vFs"
      },
      {
        title: "PPT Translator",
        desc: "High-fidelity PowerPoint translation preserving all formatting.",
        tag: "Utility",
        href: "https://translation-app-2ed.vercel.app",
        videoId: "E8i8TKl1624"
      },
      {
        title: "SpeechTrack AI",
        desc: "Smart teleprompter that tracks your speech and translates in real time.",
        tag: "Video Demo",
        href: null,
        videoId: "7JY5Zwd3kYQ"
      }
    ],
    fr: [
      {
        title: "Commissaire au Commerce de Poche",
        desc: "Moteur de reconnaissance visuelle des codes SH pour PME.",
        tag: "Prototype en Direct",
        href: "https://pockettc.vercel.app",
        videoId: "vWMMLBp-vFs"
      },
      {
        title: "Traducteur PPT",
        desc: "Traduction PowerPoint haute fidélité préservant le formatage.",
        tag: "Utilitaire",
        href: "https://translation-app-2ed.vercel.app",
        videoId: "E8i8TKl1624"
      },
      {
        title: "SpeechTrack AI",
        desc: "Téléprompteur intelligent qui suit votre discours et traduit en temps réel.",
        tag: "Démo Vidéo",
        href: null,
        videoId: "7JY5Zwd3kYQ"
      }
    ]
  }[currentLang];

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-black/10"
      onMouseLeave={() => setIsDemosOpen(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl md:text-2xl tracking-tighter uppercase leading-none cursor-pointer hover:text-[#0066FF] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            Trusted AI Advisory
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] uppercase tracking-widest text-black/60 font-black">
              {t.subtitle}
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex space-x-10 h-full items-center">
          <a href="#core-tenets" onClick={(e) => scrollToSection(e, 'core-tenets')} className="text-xs uppercase tracking-[0.2em] font-bold hover:text-[#0066FF] transition-colors">{t.tenets}</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-xs uppercase tracking-[0.2em] font-bold hover:text-[#0066FF] transition-colors">{t.services}</a>
          
          <div 
            className="relative h-full flex items-center cursor-default group"
            onMouseEnter={() => setIsDemosOpen(true)}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs uppercase tracking-[0.2em] font-black transition-colors ${isDemosOpen ? 'text-[#0066FF]' : 'text-black'}`}>
                {t.demos}
              </span>
              <div className={`w-5 h-5 flex items-center justify-center border transition-all duration-500 ${isDemosOpen ? 'rotate-45 border-[#0066FF] text-[#0066FF]' : 'border-black/10 text-black/20 group-hover:border-black/30'}`}>
                <span className="text-sm font-light">+</span>
              </div>
            </div>
          </div>

          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-xs uppercase tracking-[0.2em] font-bold hover:text-[#0066FF] transition-colors">{t.contact}</a>
        </nav>

        <div className="flex items-center space-x-6">
          <div className="flex items-center border border-black/10 rounded-full px-3 py-1 bg-neutral-50 shadow-sm">
            <button 
              onClick={() => onLangChange('en')}
              className={`text-[11px] font-black px-2 transition-colors ${currentLang === 'en' ? 'text-[#0066FF]' : 'text-black/30 hover:text-black'}`}
            >
              EN
            </button>
            <div className="w-[1px] h-3 bg-black/10 mx-1"></div>
            <button 
              onClick={() => onLangChange('fr')}
              className={`text-[11px] font-black px-2 transition-colors ${currentLang === 'fr' ? 'text-[#0066FF]' : 'text-black/30 hover:text-black'}`}
            >
              FR
            </button>
          </div>
          
          <button 
            onClick={onInquireClick}
            className="bg-black text-white px-6 py-2.5 text-xs uppercase tracking-widest font-black hover:bg-[#0066FF] transition-all"
          >
            {t.inquire}
          </button>
        </div>
      </div>

      <div 
        className={`absolute top-20 left-0 w-full bg-[#FCFCFC] transition-all duration-500 ease-in-out overflow-hidden border-b border-black/10 shadow-xl ${
          isDemosOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-x divide-black/5 bg-white">
          {demos.map((demo, i) => (
            <div
              key={i}
              className="p-8 transition-all group relative hover:bg-neutral-50/50"
            >
              <span className="text-[9px] uppercase tracking-widest px-2 py-1 border border-black/10 text-black/60 font-black mb-6 inline-block">
                {demo.tag}
              </span>
              <h3 className="text-xl font-black uppercase tracking-tighter font-display mb-3 text-black">
                {demo.title}
              </h3>
              <p className="text-xs text-black/60 leading-relaxed font-light mb-6">
                {demo.desc}
              </p>
              <div className="flex items-center gap-4">
                {/* Launch button */}
                {demo.href ? (
                  <button
                    onClick={() => {
                      setIsDemosOpen(false);
                      window.open(demo.href, '_blank');
                    }}
                    className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-black/60 hover:text-[#0066FF] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {currentLang === 'en' ? 'Launch' : 'Lancer'}
                  </button>
                ) : (
                  <span className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-black/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {currentLang === 'en' ? 'Launch' : 'Lancer'}
                    <span className="text-[8px] bg-black/5 text-black/30 px-1.5 py-0.5">
                      {currentLang === 'en' ? 'Soon' : 'Bientôt'}
                    </span>
                  </span>
                )}

                <div className="w-px h-4 bg-black/10"></div>

                {/* Watch Demo button */}
                {demo.videoId ? (
                  <button
                    onClick={() => {
                      setIsDemosOpen(false);
                      setActiveVideoId(demo.videoId);
                    }}
                    className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-black/60 hover:text-[#0066FF] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    {currentLang === 'en' ? 'Watch Demo' : 'Voir Démo'}
                  </button>
                ) : (
                  <span className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-black/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    {currentLang === 'en' ? 'Watch Demo' : 'Voir Démo'}
                    <span className="text-[8px] bg-black/5 text-black/30 px-1.5 py-0.5">
                      {currentLang === 'en' ? 'Soon' : 'Bientôt'}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal - rendered via portal to escape header positioning */}
      {activeVideoId && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          onClick={() => setActiveVideoId(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          <div
            className="relative w-full max-w-4xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
            >
              {currentLang === 'en' ? 'Close' : 'Fermer'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              className="w-full h-full"
              title="Video Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
