
import React, { useState, useEffect } from 'react';
import { Language } from '../App';

interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  duration?: string;
}

interface ServiceDetail {
  cat: string;
  title: string;
  desc: string;
  fullDesc: string;
  steps: ProcessStep[];
  policyContext: string;
}

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeService]);

  const serviceList: ServiceDetail[] = {
    en: [
      {
        cat: "Advisory",
        title: "Workflow Discovery",
        desc: "Finding high-impact AI opportunities by observing your team’s real-world workflows firsthand.",
        fullDesc: "We look past your official documents to see how your team actually works. By joining your staff on the front lines, we map out the real-world steps they take to get jobs done, identifying exactly where AI can make the workflow faster and more reliable.",
        steps: [
          { phase: "01", title: "Initial Consultation", description: "We meet to understand your goals, pain points, and current workflow challenges.", duration: "1-2 hours" },
          { phase: "02", title: "Operational Embedding", description: "We work alongside your team to see how tasks move from start to finish and find the 'hidden' logic that isn't written in any manual.", duration: "1-2 weeks" },
          { phase: "03", title: "Analysis & Mapping", description: "We categorize tasks by automation potential and identify friction points.", duration: "3-5 days" },
          { phase: "04", title: "Opportunity Report", description: "A practical 'how-to' guide for your business, including: Visual Process Maps, A List of Potential AI Enhancements, and A Step-by-Step Plan to build them.", duration: "Delivery" }
        ],
        policyContext: "Operational Reality Alignment"
      },
      {
        cat: "Transparency",
        title: "Effort Audit & Assessment",
        desc: "We provide a vendor-neutral technical audit. We strip away the marketing hype to reveal the true engineering effort required for success.",
        fullDesc: "We provide an independent technical check on your AI projects, whether they are still on paper or already in development. We look under the hood to ensure the actual complexity and costs match what you are being told.",
        steps: [
          { phase: "01", title: "Scope Definition", description: "We meet to review the vendor proposals or internal project goals that need an independent technical check.", duration: "1-2 hours" },
          { phase: "02", title: "Technical Deep-Dive", description: "We deconstruct the proposed architecture to ensure it’s a robust solution rather than a generic template.", duration: "3-5 days" },
          { phase: "03", title: "Pricing Audit", description: "We calculate the actual man-hours required and highlight any unnecessary 'padding' in the quoted costs", duration: "2-3 days" },
          { phase: "04", title: "Assessment Report", description: "A transparent project breakdown including: Our expert technical assessment, the specific tech stack required, safety concerns, and a realistic timeline for completion.", duration: "Delivery" }
        ],
        policyContext: "Financial & Technical Transparency"
      },
      {
        cat: "Systems",
        title: "Secure Prototype Design",
        desc: "Transforming validated ideas into secure, functional AI layers and operational MVPs.",
        fullDesc: "We transform validated use-cases into secure, functional AI layers. Our focus is on building controlled prototypes that integrate into policy-compliant environments.",
        steps: [
          { phase: "01", title: "Requirements Alignment", description: "We translate your specific business needs into technical specifications and clear success metrics.", duration: "2-3 days" },
          { phase: "02", title: "Architecture Design", description: "We design the secure framework and select the appropriate AI models that fit within your existing infrastructure.", duration: "1 week" },
          { phase: "03", title: "MVP Development", description: "We build the prototype in a secure sandbox, running back-and-forth testing sessions with your team to refine the tool until it meets your practical standards.", duration: "2-4 weeks" },
          { phase: "04", title: "Handoff & Training", description: "A fully deployable AI asset and technical specification, including: The production-ready code integrated with your platform, our expert assessment of the architecture, a safety & monitoring guide, and a realistic timeline for institutional-wide adoption.", duration: "Delivery" }
        ],
        policyContext: "TBS Directive & Secure Integration"
      },
      {
        cat: "Capability",
        title: "Literacy Calibration",
        desc: "Empowering your institution with the latest AI insights and training to ensure your team stays ahead of the technology curve.",
        fullDesc: "We bridge the gap between having AI tools and knowing how to use them safely. We calibrate your team’s understanding of AI logic, ensuring they can lead and supervise the new institutional-wide workflow.",
        steps: [
          { phase: "01", title: "Needs Assessment", description: "We evaluate your staff's current comfort level with AI to identify the specific knowledge gaps required for their roles.", duration: "1-2 hours" },
          { phase: "02", title: "Custom Curriculum", description: "We design a training program specifically for the AI layers we’ve delivered, focusing on practical operation and institutional compliance.", duration: "3-5 days" },
          { phase: "03", title: "Live Sessions", description: "We run hands-on sessions where your team practices supervising AI outputs, focusing on how to identify errors and maintain quality control.", duration: "1-2 days" },
          { phase: "04", title: "Competency Handoff", description: "You receive role-specific handbooks and ongoing reference materials.", duration: "Delivery" }
        ],
        policyContext: "Organizational Readiness"
      }
    ],
    fr: [
      {
        cat: "Conseil",
        title: "Découverte des Flux",
        desc: "Trouver des opportunités IA à fort impact en observant directement les flux de travail réels de votre équipe.",
        fullDesc: "Nous regardons au-delà de vos documents officiels pour voir comment votre équipe travaille réellement. En rejoignant votre personnel sur le terrain, nous cartographions les étapes concrètes qu'ils suivent pour accomplir leurs tâches, identifiant précisément où l'IA peut rendre le flux de travail plus rapide et plus fiable.",
        steps: [
          { phase: "01", title: "Consultation Initiale", description: "Nous nous rencontrons pour comprendre vos objectifs, points de friction et défis actuels des flux de travail.", duration: "1-2 heures" },
          { phase: "02", title: "Immersion Opérationnelle", description: "Nous travaillons aux côtés de votre équipe pour voir comment les tâches progressent du début à la fin et trouver la logique 'cachée' qui n'est écrite dans aucun manuel.", duration: "1-2 semaines" },
          { phase: "03", title: "Analyse et Cartographie", description: "Nous catégorisons les tâches par potentiel d'automatisation et identifions les points de friction.", duration: "3-5 jours" },
          { phase: "04", title: "Rapport d'Opportunités", description: "Un guide pratique 'comment faire' pour votre entreprise, incluant: Cartes visuelles des processus, Liste des améliorations IA potentielles, et Plan étape par étape pour les construire.", duration: "Livraison" }
        ],
        policyContext: "Alignement sur la Réalité Opérationnelle"
      },
      {
        cat: "Transparence",
        title: "Audit et Évaluation",
        desc: "Nous fournissons un audit technique neutre. Nous éliminons le battage marketing pour révéler l'effort d'ingénierie réel requis pour le succès.",
        fullDesc: "Nous fournissons une vérification technique indépendante de vos projets IA, qu'ils soient encore sur papier ou déjà en développement. Nous regardons sous le capot pour nous assurer que la complexité et les coûts réels correspondent à ce qu'on vous dit.",
        steps: [
          { phase: "01", title: "Définition du Périmètre", description: "Nous nous rencontrons pour examiner les propositions de fournisseurs ou les objectifs de projets internes nécessitant une vérification technique indépendante.", duration: "1-2 heures" },
          { phase: "02", title: "Analyse Technique Approfondie", description: "Nous déconstruisons l'architecture proposée pour nous assurer qu'il s'agit d'une solution robuste plutôt qu'un modèle générique.", duration: "3-5 jours" },
          { phase: "03", title: "Audit des Prix", description: "Nous calculons les heures-personnes réelles requises et mettons en évidence tout 'remplissage' inutile dans les coûts cités.", duration: "2-3 jours" },
          { phase: "04", title: "Rapport d'Évaluation", description: "Une ventilation transparente du projet incluant: Notre évaluation technique experte, la pile technologique spécifique requise, les préoccupations de sécurité, et un calendrier réaliste pour l'achèvement.", duration: "Livraison" }
        ],
        policyContext: "Transparence Financière et Technique"
      },
      {
        cat: "Systèmes",
        title: "Conception de Prototypes Sécurisés",
        desc: "Transformer des idées validées en couches d'IA sécurisées et fonctionnelles et en MVP opérationnels.",
        fullDesc: "Nous transformons les cas d'utilisation validés en couches d'IA sécurisées et fonctionnelles. Notre focus est de construire des prototypes contrôlés qui s'intègrent dans des environnements conformes aux politiques.",
        steps: [
          { phase: "01", title: "Alignement des Besoins", description: "Nous traduisons vos besoins d'affaires spécifiques en spécifications techniques et métriques de succès claires.", duration: "2-3 jours" },
          { phase: "02", title: "Conception d'Architecture", description: "Nous concevons le cadre sécurisé et sélectionnons les modèles d'IA appropriés qui s'intègrent à votre infrastructure existante.", duration: "1 semaine" },
          { phase: "03", title: "Développement MVP", description: "Nous construisons le prototype dans un bac à sable sécurisé, effectuant des sessions de test itératives avec votre équipe pour affiner l'outil jusqu'à ce qu'il réponde à vos standards pratiques.", duration: "2-4 semaines" },
          { phase: "04", title: "Transfert et Formation", description: "Un actif IA entièrement déployable et spécification technique, incluant: Le code prêt pour la production intégré à votre plateforme, notre évaluation experte de l'architecture, un guide de sécurité et surveillance, et un calendrier réaliste pour l'adoption institutionnelle.", duration: "Livraison" }
        ],
        policyContext: "Directive du SCT et Intégration Sécurisée"
      },
      {
        cat: "Capacité",
        title: "Calibration de la Littératie",
        desc: "Autonomiser votre institution avec les dernières perspectives et formations en IA pour assurer que votre équipe reste en avance sur la courbe technologique.",
        fullDesc: "Nous comblons le fossé entre avoir des outils IA et savoir les utiliser de manière sécuritaire. Nous calibrons la compréhension de votre équipe de la logique IA, assurant qu'ils peuvent diriger et superviser le nouveau flux de travail institutionnel.",
        steps: [
          { phase: "01", title: "Évaluation des Besoins", description: "Nous évaluons le niveau de confort actuel de votre personnel avec l'IA pour identifier les lacunes de connaissances spécifiques requises pour leurs rôles.", duration: "1-2 heures" },
          { phase: "02", title: "Curriculum Personnalisé", description: "Nous concevons un programme de formation spécifiquement pour les couches d'IA que nous avons livrées, axé sur l'opération pratique et la conformité institutionnelle.", duration: "3-5 jours" },
          { phase: "03", title: "Sessions en Direct", description: "Nous animons des sessions pratiques où votre équipe s'exerce à superviser les sorties IA, en se concentrant sur comment identifier les erreurs et maintenir le contrôle qualité.", duration: "1-2 jours" },
          { phase: "04", title: "Transfert de Compétences", description: "Vous recevez des manuels spécifiques aux rôles et des matériaux de référence continus.", duration: "Livraison" }
        ],
        policyContext: "Préparation Organisationnelle"
      }
    ]
  }[lang];

  return (
    <section id="services" className="pt-12 pb-24 md:pt-16 md:pb-40 scroll-mt-20 max-w-[1440px] mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-6 text-[#0066FF]">Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-display mb-6">
            {lang === 'en' ? 'Service Dimensions.' : 'Dimensions.'}
          </h2>
          <div className="h-1.5 w-20 bg-[#0066FF] mb-6"></div>
          <p className="text-sm text-black/60 leading-relaxed">
            {lang === 'en'
              ? 'Every solution is fully customized to your unique operational context. The following service areas provide insight into our core capabilities.'
              : 'Chaque solution est entièrement personnalisée selon votre contexte opérationnel. Les domaines de service suivants offrent un aperçu de nos capacités principales.'}
          </p>
        </div>
        
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-px gap-y-px bg-black/10 border border-black/10 overflow-hidden">
            {serviceList.map((service, i) => (
              <div key={i} className="bg-white p-10 flex flex-col justify-between hover:bg-[#F8FAFF] group transition-colors min-h-[320px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#0066FF] bg-[#E6F0FF] px-2 py-0.5 inline-block">{service.cat}</span>
                    <span className="text-[10px] font-mono text-black/10 font-black">0{i+1}</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-4 font-display">{service.title}</h4>
                  <p className="text-sm text-black/60 font-light leading-relaxed">{service.desc}</p>
                </div>
                <button 
                  onClick={() => setActiveService(service)}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1 hover:border-[#0066FF] hover:text-[#0066FF] transition-all"
                >
                  {lang === 'en' ? 'View Blueprint' : 'Voir le Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveService(null)}></div>
          <div className="relative w-full max-w-4xl bg-white border border-black shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#0066FF] p-8 text-white shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 block mb-2">{activeService.cat}</span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter font-display leading-none">{activeService.title}</h3>
                </div>
                <button onClick={() => setActiveService(null)} className="text-white/60 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">
                  {lang === 'en' ? 'Close' : 'Fermer'}
                </button>
              </div>
              <p className="text-sm text-white/80 mt-4 leading-relaxed">{activeService.fullDesc}</p>
            </div>

            {/* Process Steps */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[10px] font-mono font-black text-[#0066FF]">PROCESS_BLUEPRINT</span>
                <div className="h-px flex-1 bg-black/10"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                  {lang === 'en' ? 'What to Expect' : 'À Quoi S\'attendre'}
                </span>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-8 bottom-8 w-[2px] bg-black/10"></div>

                <div className="space-y-0">
                  {activeService.steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-6 group">
                      {/* Timeline node */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-black/10 flex items-center justify-center group-hover:border-[#0066FF] group-hover:bg-[#0066FF] transition-all duration-300">
                          <span className="text-[10px] font-black text-black/40 group-hover:text-white transition-colors">{step.phase}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="bg-neutral-50 border border-black/5 p-5 group-hover:border-[#0066FF]/30 group-hover:bg-[#F8FAFF] transition-all duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-black uppercase tracking-wide">{step.title}</h4>
                            {step.duration && (
                              <span className="text-[9px] font-bold uppercase tracking-widest text-[#0066FF] bg-[#E6F0FF] px-2 py-1">{step.duration}</span>
                            )}
                          </div>
                          <p className="text-sm text-black/60 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 px-8 py-4 bg-neutral-50 border-t border-black/10 flex justify-between items-center">
              <span className="text-[10px] font-mono text-black/30">{activeService.policyContext}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/30">
                {lang === 'en' ? 'Trusted AI Advisory' : 'Trusted AI Advisory'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
