
import React, { useState, useEffect } from 'react';
import { Language } from '../App';

interface StrategicCard {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  role: string;
  url: string;
  strategy: StrategicCard[];
}

interface FeaturedProjectProps {
  lang: Language;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ lang }) => {
  const [hoveredCard, setHoveredCard] = useState<number>(0);
  const [loadIframe, setLoadIframe] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadIframe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const project: Project = {
    en: {
      id: "01",
      title: "Pocket Trade Commissioner",
      role: "Visual AI engine for automated HS Code classification and global trade compliance assessment.",
      url: "https://pockettc.vercel.app",
      strategy: [
        {
          id: "01",
          title: "The Problem",
          subtitle: "Administrative Friction",
          content: "Trade Commissioners and SMEs are often slowed down by a 'documentation wall.' Manually hunting for niche HS Codes and local rules drains hours of expert time, creating a bottleneck that delays institutional support and business growth."
        },
        {
          id: "02",
          title: "Where AI Fits",
          subtitle: "REDUCING COSTLY BARRIERS",
          content: "Traditional trade research is expensive and slow. The Visual AI engine acts as a force multiplier, replacing costly manual cross-referencing with instant data. By analyzing product images, the system delivers precise classifications and insights in seconds."
        },
        {
          id: "03",
          title: "Process Impact",
          subtitle: "SAVING TIME & CAPITAL",
          content: "The system delivers a dual impact: SMEs save significant capital by bypassing early consulting fees, while Trade Commissioners save massive research time. This allows institutions to support more businesses with less administrative overhead."
        },
        {
          id: "04",
          title: "Next Step",
          subtitle: "System Integration",
          content: "The roadmap includes integrating institutional databases to maximize model precision. By implementing a human-in-the-loop feedback system, experts can verify and refine outputs, ensuring the engine evolves within strict policy standards."
        }
      ]
    },
    fr: {
      id: "01",
      title: "Commissaire au Commerce de Poche",
      role: "Moteur d'IA visuelle pour la classification automatisée des codes SH et l'évaluation de la conformité commerciale mondiale.",
      url: "https://pockettc.vercel.app",
      strategy: [
        {
          id: "01",
          title: "Le Problème",
          subtitle: "Friction Administrative",
          content: "Les délégués commerciaux et les PME sont souvent ralentis par un 'mur de documentation'. La recherche manuelle de codes SH de niche et de règles locales draine des heures de temps expert, créant un goulot d'étranglement qui retarde le soutien institutionnel et la croissance des entreprises."
        },
        {
          id: "02",
          title: "Le Rôle de l'IA",
          subtitle: "RÉDUIRE LES BARRIÈRES COÛTEUSES",
          content: "La recherche commerciale traditionnelle est coûteuse et lente. Le moteur d'IA visuelle agit comme multiplicateur de force, remplaçant les références croisées manuelles coûteuses par des données instantanées. En analysant les images de produits, le système livre des classifications précises et des perspectives en quelques secondes."
        },
        {
          id: "03",
          title: "Impact Processus",
          subtitle: "ÉCONOMIE DE TEMPS ET CAPITAL",
          content: "Le système offre un double impact: les PME économisent un capital significatif en contournant les frais de consultation initiaux, tandis que les délégués commerciaux économisent un temps de recherche massif. Cela permet aux institutions de soutenir plus d'entreprises avec moins de charge administrative."
        },
        {
          id: "04",
          title: "Prochaine Étape",
          subtitle: "Intégration Système",
          content: "La feuille de route inclut l'intégration de bases de données institutionnelles pour maximiser la précision du modèle. En implémentant un système de rétroaction humaine, les experts peuvent vérifier et affiner les résultats, assurant que le moteur évolue dans le respect de standards politiques stricts."
        }
      ]
    }
  }[lang];

  return (
    <section ref={sectionRef} id="featured-demo" className="py-16 md:py-24 scroll-mt-20 bg-white border-t border-black/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end border-b-2 border-black pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#0066FF] block mb-2">Lab Environment</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-display leading-none">
              {lang === 'en' ? 'Technical Proofs.' : 'Preuves Techniques.'}
            </h2>
          </div>
          <p className="text-black/60 text-[10px] uppercase font-black tracking-widest hidden md:block">Deployment Node // Trusted_CAN_01</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black overflow-hidden bg-white lg:h-[75vh] min-h-[680px] shadow-sm">
          
          <div className="lg:col-span-4 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-black h-full overflow-hidden">
            
            <div className="p-8 border-b border-black bg-neutral-50 shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-black uppercase tracking-[0.5em] text-[#0066FF]">P_01</span>
                <div className="h-[1.5px] w-8 bg-[#0066FF]"></div>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter font-display leading-[0.9] text-black mb-4">
                {project.title}
              </h2>
              <p className="text-[11px] text-black/70 font-black leading-tight uppercase tracking-wider">
                {project.role}
              </p>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {project.strategy.map((item, idx) => {
                const isActive = hoveredCard === idx;
                return (
                  <div 
                    key={idx}
                    onMouseEnter={() => setHoveredCard(idx)}
                    className={`relative flex flex-col border-b last:border-b-0 border-black transition-all duration-700 ease-in-out cursor-default overflow-hidden ${isActive ? 'flex-[6] bg-white' : 'flex-1 bg-neutral-50/60'}`}
                  >
                    <div className="px-6 pt-2 pb-6 h-full flex flex-col">
                      <div className="flex items-center gap-4 mb-2 shrink-0">
                        <span className={`text-xs font-mono font-black transition-colors ${isActive ? 'text-[#0066FF]' : 'text-black/20'}`}>
                          /0{item.id}
                        </span>
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-widest transition-colors ${isActive ? 'text-black' : 'text-black/60'}`}>
                          {item.title}
                        </h3>
                      </div>

                      <div className={`transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                         <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-[0.2em] mb-2">
                          {item.subtitle}
                         </p>
                         <p className="text-sm text-black/80 leading-relaxed font-medium">
                           {item.content}
                         </p>
                      </div>
                    </div>
                    <div className={`absolute left-0 top-0 w-2 h-full bg-[#0066FF] transition-transform duration-700 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></div>
                  </div>
                );
              })}
            </div>
            
            <div className="shrink-0 p-8 bg-black">
              <a 
                href={project.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between text-white transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 group-hover:text-[#0066FF]">Direct Access</span>
                  <span className="text-xs opacity-40 group-hover:opacity-100 italic">Launch Environment</span>
                </div>
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#F5F5F7] p-4 lg:p-10 flex flex-col h-full overflow-hidden">
            <div className="bg-white border border-black border-b-0 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
              <div className="text-[11px] font-mono font-black text-[#0066FF]">
                {project.url.replace('https://', '')}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black/60">Secure Instance Live</span>
              </div>
            </div>

            <div className="flex-1 bg-white border border-black relative overflow-hidden">
              {loadIframe ? (
                <iframe
                  src={project.url}
                  className="absolute inset-0 w-full h-full border-0"
                  title={project.title}
                  tabIndex={-1}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
                  <span className="text-xs text-black/30 uppercase tracking-widest">Loading...</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-black/30 shrink-0">
              <span>Trusted_CAN_Lab_01</span>
              <span>Architecture v1.08</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
