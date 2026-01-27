
import React, { useState } from 'react';
import { Language } from '../App';

interface ValuesProps {
  lang: Language;
}

const Values: React.FC<ValuesProps> = ({ lang }) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const tenets = {
    en: [
      {
        id: "01",
        tag: "AUTOMATION",
        title: "Operational Automation",
        benefit: "Eliminate repetitive tasks",
        description: "We build AI-driven workflows that connect your different platforms, including Email, Excel, R, and SaaS tools. By automating the data flow between these systems, we overcome the technical barriers that used to slow you down, helping your infrastructure satisfy every requirement for fast and modern service.",
        roi: [
          "Cut manual processing time by 80% to meet efficiency targets.",
          "The workflow acts as a backup to handle basic tasks when your team is away, preventing work from piling up.",
          "Eliminate human error to achieve 100% consistency and compliance."
        ],
        scenario: {
          title: "Scenario: Document Processing",
          before: {
            title: "Before",
            content: "Every Friday morning, you manually extract data from a mass email to update your Excel or SaaS records. You then spend hours running calculations and drafting a briefing for your manager, a process that relies entirely on manual effort. This repetitive cycle turns your morning into a series of data-copying tasks instead of high-level analysis."
          },
          after: {
            title: "After",
            content: "The AI workflow automatically pulls the data and prepares your files, but pauses at every step for your review. You can check the numbers in Excel and edit the draft Email, maintaining full control over the final output. You act as the expert supervisor, ensuring the system meets your standards before anything is finalized."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* The S-Shape line - Precisely threading through all 6 points */}
            <path 
              d="M 38 10 L 18 10 C 12 10, 10 14, 10 20 C 10 26, 36 22, 38 28 C 40 34, 34 38, 30 38 L 10 38" 
              className="opacity-0 group-hover:opacity-100 group-hover:stroke-[#0066FF] transition-all duration-700 ease-in-out" 
              strokeLinecap="round"
              strokeDasharray="140"
              style={{ strokeDashoffset: '140' }}
            />
            <style>{`
              .group:hover .draw-path {
                animation: drawSLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              @keyframes drawSLine {
                from { stroke-dashoffset: 140; opacity: 1; }
                to { stroke-dashoffset: 0; opacity: 1; }
              }
            `}</style>
            
            {/* The 6 Points - Static and perfectly aligned to path points */}
            <circle cx="38" cy="10" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            <circle cx="18" cy="10" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            <circle cx="10" cy="20" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            <circle cx="38" cy="28" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            <circle cx="30" cy="38" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            <circle cx="10" cy="38" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors duration-300" />
            
            {/* The Path overlay that actually animates */}
            <path 
              d="M 38 10 L 18 10 C 12 10, 10 14, 10 20 C 10 26, 36 22, 38 28 C 40 34, 34 38, 30 38 L 10 38" 
              className="draw-path opacity-0"
              strokeDasharray="140"
              stroke="#0066FF"
              strokeLinecap="round"
            />
          </svg>
        )
      },
      {
        id: "02",
        tag: "KNOWLEDGE ARCHITECTURE",
        title: "INSTITUTIONAL KNOWLEDGE",
        benefit: "PROTECT EXPERTISE & NAVIGATE LOGIC",
        description: "An alternative intelligence layer that acts as your team’s digital memory—answering the 'where, who, and how' of your operations instantly.",
        roi: [
          "Lower training costs by automating routine 'how-to' queries.",
          "Secure 'know-how' to ensure continuity during staff turnover.",
          "Boost collaboration and eliminate redundant work by providing instant visibility into project history."
        ],
        scenario: {
          title: "Scenario: Vendor Assessment",
          before: {
            title: "Before",
            content: "A senior lead leaves, and suddenly nobody knows why certain decisions were made or where the key resources are hidden. Projects stall, and the remaining team wastes weeks trying to piece together the history through old emails and guesswork."
          },
          after: {
            title: "After",
            content: "The AI Knowledge Engine keeps the logic alive. The new lead doesn't start from zero; they simply ask the AI for the 'where, who, and how' of the past project. Collaboration stays smooth because the organization’s brain remains intact, even when people change."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* The 'Little Person' part */}
            <g className="group-hover:text-[#0066FF] transition-colors duration-500">
              <circle cx="12" cy="16" r="3.5" />
              <path d="M12 19.5 v10 M8 23 h8 M10 37 l2-7.5 2 7.5" />
            </g>
            
            {/* The 'Audit' part (Eye appearing) */}
            <rect x="30" y="8" width="6" height="32" className="fill-black/10 stroke-none group-hover:opacity-0 transition-opacity duration-300" />
            <g className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-[#0066FF]">
              <path d="M26 24 s6-8 12-8 12 8 12 8 -6 8 -12 8 -12-8 -12-8 z" />
              <circle cx="38" cy="24" r="4" fill="currentColor" />
            </g>
          </svg>
        )
      },
      {
        id: "03",
        tag: "KNOWLEDGE EMPOWERMENT",
        title: "Organizational Enablement",
        benefit: "UPSKILL STAFF & EVALUATE VALUE",
        description: "We look past your official documents to see how your team actually works. By joining your staff on the front lines, we map out the real-world steps they take to get jobs done, identifying exactly where AI can make the workflow faster and more reliable.",
        roi: [
          "Empower staff to solve delivery challenges with the latest AI tools.",
          "Establish clear standards to ensure every AI output is safe and high-quality.",
          "Audit vendor pricing and workload to ensure you pay for actual complexity."
        ],
        scenario: {
          title: "Scenario: Team Training",
          before: {
            title: "Before",
            content: "Employees see new AI tools appearing every day but often feel overwhelmed, not knowing which ones are safe or effective for their specific tasks. Without guidance, they risk using unvetted platforms that could leak company data, or they avoid AI entirely, leaving the organization behind the technology curve."
          },
          after: {
            title: "After",
            content: "With a clear roadmap, the team knows exactly which tools to choose and how to use them securely. Instead of guessing, staff members confidently lead AI workflows that speed up delivery. They transform from passive users into expert supervisors who ensure every AI output meets the organization's high standards."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Open Book */}
            <path d="M24 40 V12" className="group-hover:stroke-[#0066FF] transition-colors" /> {/* Spine */}
            <path d="M24 12 C 18 12, 10 10, 6 12 V 38 C 10 36, 18 38, 24 40 C 30 38, 38 36, 42 38 V 12 C 38 10, 30 12, 24 12" className="group-hover:stroke-[#0066FF] transition-colors" />
            
            {/* AI letters on pages - Centered and straightened */}
            <text x="11" y="28" className="text-[12px] font-black opacity-0 group-hover:opacity-100 transition-all duration-500 fill-[#0066FF] stroke-none select-none">A</text>
            <text x="31" y="28" className="text-[12px] font-black opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 fill-[#0066FF] stroke-none select-none">I</text>
          </svg>
        )
      }
    ],
    fr: [
      {
        id: "01",
        tag: "AUTOMATISATION",
        title: "Automatisation Opérationnelle",
        benefit: "Éliminer les tâches répétitives",
        description: "Nous construisons des flux de travail alimentés par l'IA qui connectent vos différentes plateformes, y compris courriel, Excel, R et outils SaaS. En automatisant le flux de données entre ces systèmes, nous surmontons les barrières techniques qui vous ralentissaient, aidant votre infrastructure à satisfaire toutes les exigences d'un service rapide et moderne.",
        roi: [
          "Réduire le temps de traitement manuel de 80% pour atteindre les objectifs d'efficacité.",
          "Le flux de travail agit comme solution de secours pour gérer les tâches de base lorsque votre équipe est absente, évitant l'accumulation du travail.",
          "Éliminer les erreurs humaines pour atteindre 100% de cohérence et de conformité."
        ],
        scenario: {
          title: "Scénario: Traitement de Documents",
          before: {
            title: "Avant",
            content: "Chaque vendredi matin, vous extrayez manuellement des données d'un courriel de masse pour mettre à jour vos fichiers Excel ou SaaS. Vous passez ensuite des heures à effectuer des calculs et à rédiger un briefing pour votre gestionnaire, un processus qui repose entièrement sur l'effort manuel. Ce cycle répétitif transforme votre matinée en une série de tâches de copie de données au lieu d'analyses de haut niveau."
          },
          after: {
            title: "Après",
            content: "Le flux de travail IA extrait automatiquement les données et prépare vos fichiers, mais s'arrête à chaque étape pour votre révision. Vous pouvez vérifier les chiffres dans Excel et modifier le brouillon de courriel, gardant le contrôle total sur le résultat final. Vous agissez en tant que superviseur expert, vous assurant que le système respecte vos standards avant toute finalisation."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path 
              d="M 38 10 L 18 10 C 12 10, 10 14, 10 20 C 10 26, 36 22, 38 28 C 40 34, 34 38, 30 38 L 10 38" 
              className="draw-path opacity-0 group-hover:opacity-100 group-hover:stroke-[#0066FF] transition-all duration-700 ease-in-out" 
              strokeLinecap="round"
              strokeDasharray="140"
            />
            <circle cx="38" cy="10" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
            <circle cx="18" cy="10" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
            <circle cx="10" cy="20" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
            <circle cx="38" cy="28" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
            <circle cx="30" cy="38" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
            <circle cx="10" cy="38" r="2.5" fill="currentColor" className="group-hover:text-[#0066FF] transition-colors" />
          </svg>
        )
      },
      {
        id: "02",
        tag: "ARCHITECTURE DES CONNAISSANCES",
        title: "CONNAISSANCES INSTITUTIONNELLES",
        benefit: "PROTÉGER L'EXPERTISE & NAVIGUER LA LOGIQUE",
        description: "Une couche d'intelligence alternative qui agit comme la mémoire numérique de votre équipe — répondant instantanément aux questions 'où, qui et comment' de vos opérations.",
        roi: [
          "Réduire les coûts de formation en automatisant les requêtes routinières de type 'comment faire'.",
          "Sécuriser le 'savoir-faire' pour assurer la continuité lors du roulement du personnel.",
          "Stimuler la collaboration et éliminer le travail redondant en offrant une visibilité instantanée sur l'historique des projets."
        ],
        scenario: {
          title: "Scénario: Continuité des Connaissances",
          before: {
            title: "Avant",
            content: "Un responsable senior quitte l'organisation, et soudainement personne ne sait pourquoi certaines décisions ont été prises ou où les ressources clés sont cachées. Les projets stagnent, et l'équipe restante perd des semaines à reconstituer l'historique à travers d'anciens courriels et des suppositions."
          },
          after: {
            title: "Après",
            content: "Le moteur de connaissances IA garde la logique vivante. Le nouveau responsable ne part pas de zéro; il demande simplement à l'IA le 'où, qui et comment' du projet passé. La collaboration reste fluide car le cerveau de l'organisation reste intact, même lorsque les personnes changent."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <g className="group-hover:text-[#0066FF] transition-colors duration-500">
              <circle cx="12" cy="16" r="3.5" />
              <path d="M12 19.5 v10 M8 23 h8 M10 37 l2-7.5 2 7.5" />
            </g>
            <rect x="30" y="8" width="6" height="32" className="fill-black/10 stroke-none group-hover:opacity-0 transition-opacity duration-300" />
            <g className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-[#0066FF]">
              <path d="M26 24 s6-8 12-8 12 8 12 8 -6 8 -12 8 -12-8 -12-8 z" />
              <circle cx="38" cy="24" r="4" fill="currentColor" />
            </g>
          </svg>
        )
      },
      {
        id: "03",
        tag: "AUTONOMISATION DES CONNAISSANCES",
        title: "Habilitation Organisationnelle",
        benefit: "PERFECTIONNER LE PERSONNEL & ÉVALUER LA VALEUR",
        description: "Nous regardons au-delà de vos documents officiels pour voir comment votre équipe travaille réellement. En rejoignant votre personnel sur le terrain, nous cartographions les étapes concrètes qu'ils suivent pour accomplir leurs tâches, identifiant précisément où l'IA peut rendre le flux de travail plus rapide et plus fiable.",
        roi: [
          "Habiliter le personnel à résoudre les défis de livraison avec les derniers outils d'IA.",
          "Établir des standards clairs pour garantir que chaque sortie d'IA est sécuritaire et de haute qualité.",
          "Auditer les prix des fournisseurs et la charge de travail pour vous assurer de payer pour la complexité réelle."
        ],
        scenario: {
          title: "Scénario: Formation d'Équipe",
          before: {
            title: "Avant",
            content: "Les employés voient de nouveaux outils d'IA apparaître chaque jour mais se sentent souvent dépassés, ne sachant pas lesquels sont sécuritaires ou efficaces pour leurs tâches spécifiques. Sans orientation, ils risquent d'utiliser des plateformes non vérifiées qui pourraient divulguer des données de l'entreprise, ou ils évitent complètement l'IA, laissant l'organisation en retard sur la courbe technologique."
          },
          after: {
            title: "Après",
            content: "Avec une feuille de route claire, l'équipe sait exactement quels outils choisir et comment les utiliser de manière sécuritaire. Au lieu de deviner, les membres du personnel dirigent avec confiance des flux de travail IA qui accélèrent la livraison. Ils passent d'utilisateurs passifs à superviseurs experts qui s'assurent que chaque sortie d'IA respecte les hauts standards de l'organisation."
          }
        },
        renderIcon: () => (
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M24 40 V12" className="group-hover:stroke-[#0066FF] transition-colors" />
            <path d="M24 12 C 18 12, 10 10, 6 12 V 38 C 10 36, 18 38, 24 40 C 30 38, 38 36, 42 38 V 12 C 38 10, 30 12, 24 12" className="group-hover:stroke-[#0066FF] transition-colors" />
            <text x="11" y="28" className="text-[12px] font-black opacity-0 group-hover:opacity-100 transition-all duration-500 fill-[#0066FF] stroke-none select-none">A</text>
            <text x="31" y="28" className="text-[12px] font-black opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 fill-[#0066FF] stroke-none select-none">I</text>
          </svg>
        )
      }
    ]
  }[lang];

  return (
    <section id="core-tenets" className="bg-white pt-8 pb-20 scroll-mt-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12 pb-6 border-b-2 border-black flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-display leading-none text-black">
            {lang === 'en' ? 'Core Tenets.' : 'Principes.'}
          </h2>
          <span className="text-[10px] font-mono text-black/20 font-bold uppercase tracking-widest hidden md:block">Advisory_Logic_v2.5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-black/5">
          {tenets.map((item, i) => (
            <div
              key={i}
              className={`
                group relative p-10 flex flex-col transition-all duration-500 cursor-default bg-white
                ${i !== 2 ? 'md:border-r border-black/5' : ''}
                border-b md:border-b-0 last:border-b-0 border-black/5
                hover:bg-neutral-50/50 hover:shadow-lg hover:z-10
              `}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-black/20 group-hover:text-[#0066FF] transition-colors font-black mb-1">ITEM_{item.id}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-black/60 transition-all">
                    {item.tag}
                  </span>
                </div>
                
                <div className="text-black/20 transition-all duration-500 h-12 w-12 flex items-center justify-center">
                  {item.renderIcon()}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 font-display leading-tight group-hover:text-black transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] font-black text-[#0066FF] mb-4 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
                  {item.benefit}
                </p>

                <div className="h-px w-8 bg-black/10 mb-4 group-hover:w-full group-hover:bg-[#0066FF]/20 transition-all duration-700"></div>

                <p className="text-sm leading-relaxed text-black/40 font-medium group-hover:text-black/70 transition-colors mb-4">
                  {item.description}
                </p>

                {/* Scenario Button - Moved up and more prominent */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveScenario(activeScenario === item.id ? null : item.id);
                  }}
                  className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#0066FF] border border-[#0066FF]/30 px-3 py-2 hover:bg-[#0066FF] hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0"
                  style={{ transitionDelay: '100ms' }}
                >
                  <span>{lang === 'en' ? 'View Scenario' : 'Voir Scénario'}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* ROI Bullet Points */}
                <div className="space-y-2 overflow-hidden">
                  {item.roi.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-500"
                      style={{ transitionDelay: `${200 + idx * 100}ms` }}
                    >
                      <span className="text-[#0066FF] mt-1 text-xs">&#9642;</span>
                      <span className="text-xs text-black/60 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 left-0 w-0 h-[6px] bg-[#0066FF] group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario Modal Overlay */}
      {activeScenario && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          onClick={() => setActiveScenario(null)}
        >
          <div
            className="bg-white max-w-2xl w-full p-10 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveScenario(null)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-black/10 hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {tenets.filter(t => t.id === activeScenario).map(item => (
              <div key={item.id}>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0066FF] block mb-2">
                  {item.tag} // {lang === 'en' ? 'Use Case' : 'Cas d\'Usage'}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display mb-8">
                  {item.scenario.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before */}
                  <div className="border border-black/10 p-6 bg-neutral-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-black/40">
                        {item.scenario.before.title}
                      </span>
                    </div>
                    <p className="text-sm text-black/60 leading-relaxed">
                      {item.scenario.before.content}
                    </p>
                  </div>

                  {/* After */}
                  <div className="border border-[#0066FF]/30 p-6 bg-[#F8FAFF]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0066FF]">
                        {item.scenario.after.title}
                      </span>
                    </div>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {item.scenario.after.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Values;
