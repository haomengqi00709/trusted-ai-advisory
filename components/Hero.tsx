
import React, { useState } from 'react';
import { Language } from '../App';

interface HeroProps {
  onInquireClick: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onInquireClick, lang }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const t = {
    en: {
      mandate: "Innovation within Boundaries // 2026",
      tagline: (
        <>
          Trusted AI Advisory Inc. architects <span className="text-[#0066FF] font-black">policy-aligned</span>, <span className="text-[#0066FF] font-black">security-conscious</span>, and <span className="text-[#0066FF] font-black">human-centered</span> AI Inovation to drive operational excellence within regulated environments.
        </>
      ),
      demo: "Try Demo",
      inquire: "Inquire Now",
      pillar: "Strategic Pillar"
    },
    fr: {
      mandate: "L'innovation dans le respect des cadres // 2026",
      tagline: (
        <>
          Trusted AI Advisory Inc. conçoit des flux de travail IA <span className="text-[#0066FF] font-black">alignés sur les politiques</span>, <span className="text-[#0066FF] font-black">sécuritaires</span> et <span className="text-[#0066FF] font-black">centrés sur l'humain</span> afin de favoriser l'excellence opérationnelle au sein des environnements réglementés.
        </>
      ),
      demo: "Essayer Démo",
      inquire: "Demander Maintenant",
      pillar: "Pilier Stratégique"
    }
  }[lang];

  const keywords = {
    en: [
      { 
        word: "Policy-Aligned", 
        id: "01",
        description: "Integrating institutional standards into robust technical solutions to ensure that every system remains fully compliant, ethically aligned, and built for long-term auditability."
      },
      { 
        word: "Security-Conscious", 
        id: "02",
        description: "Architecting high-stakes data environments with zero-trust logic to prevent data leakage and ensure all intelligence processing remains contained within your secure platform and private infrastructure."
      },
      { 
        word: "Human-Centered", 
        id: "03",
        description: "AI that serves the citizen by empowering the public servant. We design workflows that reduce friction while maintaining human oversight."
      }
    ],
    fr: [
      { 
        word: "Aligné Politiques", 
        id: "01",
        description: "Intégrer les normes institutionnelles dans des solutions techniques robustes pour garantir que chaque système reste entièrement conforme, aligné sur l'éthique et conçu pour une auditabilité à long terme."
      },
      { 
        word: "SOUCIEUX DE LA SÉCURITÉ", 
        id: "02",
        description: "Concevoir des environnements de données à enjeux élevés avec une logique de « vérification systématique » (zéro confiance) pour prévenir les fuites de données et garantir que tout le traitement de l'intelligence reste confiné dans votre plateforme sécurisée et votre infrastructure privée."
      },
      { 
        word: "Centré Humain", 
        id: "03",
        description: "Concevoir des couches d'assistance intelligente qui renforcent l'expertise professionnelle grâce à une automatisation à grande vitesse, tout en garantissant que la supervision humaine demeure l'autorité finale de chaque processus."
      }
    ]
  }[lang];

  return (
    <section className="relative min-h-screen flex flex-col pt-16 px-6 md:px-12 max-w-[1440px] mx-auto border-x border-black/10 bg-white">
      <div className="pt-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10">
        <div className="max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0066FF] block mb-3">{t.mandate}</span>
          <p className="text-xl md:text-2xl leading-[1.15] font-medium max-w-2xl text-black/90">
            {t.tagline}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-4">
        <div className="divide-y-[1px] md:divide-y-2 divide-black">
          {keywords.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <div key={idx} className="flex flex-col">
                <div
                  onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                  className={`group flex items-center justify-between py-[2.5vh] transition-all duration-500 cursor-pointer px-2 ${isActive ? 'bg-[#F8FAFF]' : 'hover:bg-neutral-50'}`}
                >
                  <div className="flex items-center gap-4 lg:gap-8">
                    <span className={`text-[10px] md:text-xs font-mono transition-colors ${isActive ? 'text-[#0066FF]' : 'text-black/30'}`}>
                      {item.id}
                    </span>
                    <h2 className={`text-[5vh] md:text-[8vh] lg:text-[10vh] font-black uppercase tracking-tighter font-display leading-[0.8] transition-all duration-500 ${isActive ? 'text-[#0066FF] translate-x-6' : 'group-hover:translate-x-4'}`}>
                      {item.word}
                    </h2>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-500 ${isActive ? 'rotate-45 border-[#0066FF] text-[#0066FF]' : 'border-black/10 text-black/20'}`}>
                    <span className="text-xl font-light">+</span>
                  </div>
                </div>

                <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="pl-12 md:pl-32 pr-6 md:pr-12 pt-4 pb-12 border-l-2 border-[#0066FF] ml-4 md:ml-6">
                      <p className="text-lg md:text-2xl font-light text-black/80 leading-snug max-w-4xl italic">
                        "{item.description}"
                      </p>
                      <div className="mt-8 flex items-center gap-6">
                        <div className="h-px w-24 bg-[#0066FF]"></div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0066FF]">{t.pillar} {item.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pb-8 pt-6 border-t border-black/10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => document.getElementById('featured-demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-10 py-5 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#0066FF] transition-all flex items-center gap-3 shrink-0"
          >
            {t.demo}
          </button>
          <button
            onClick={onInquireClick}
            className="border border-black px-10 py-5 text-[10px] uppercase font-bold tracking-[0.2em] hover:border-[#0066FF] hover:text-[#0066FF] transition-all shrink-0"
          >
            {t.inquire}
          </button>
        </div>
        <div className="flex-1 hidden md:block border-b border-black/5 h-[1px] ml-4"></div>
      </div>

    </section>
  );
};

export default Hero;
