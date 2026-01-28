
import React, { useState, useEffect, useRef } from 'react';
import { generateInquirySummary } from '../services/geminiService';
import { Language } from '../App';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<'A' | 'B' | null>(null);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [customInput, setCustomInput] = useState('');
  const [formData, setFormData] = useState({ message: '', email: '' });

  useEffect(() => {
    if (step === 5 && !summaryGenerated && !isAIGenerating) {
      handleGenerateSummary();
    }
  }, [step]);

  if (!isOpen) return null;

  const t = {
    en: {
      step: "STEP",
      pathA_title: "EXPLORE THE POTENTIAL",
      pathA_desc: "I want to explore what AI can do for us — I haven't defined my boundaries yet.",
      pathB_title: "AUDIT & IMPLEMENT",
      pathB_desc: "I have a specific task or an existing vendor plan — I need execution or an audit.",
      back: "Back",
      send: "Send Brief to Lead Advisor",
      final_title: "Brief Sent.",
      final_desc: "Our principal advisors will review your request and reach out within 12 hours.",
      return: "Return to Site",
      direct_contact: "Direct Contact",
      email_us: "Email our lead advisor directly for immediate inquiries.",
      custom_placeholder: "Or describe your specific situation in your own words...",
      confirm: "Confirm & Continue",
      email_placeholder: "Email you wish to be contacted at"
    },
    fr: {
      step: "ÉTAPE",
      pathA_title: "EXPLORER LE POTENTIEL",
      pathA_desc: "Je veux explorer ce que l'IA peut faire — mes limites ne sont pas encore définies.",
      pathB_title: "AUDIT & MISE EN ŒUVRE",
      pathB_desc: "J'ai une tâche spécifique ou un plan de fournisseur — j'ai besoin d'exécution ou d'audit.",
      back: "Retour",
      send: "Envoyer le dossier au conseiller",
      final_title: "Dossier Envoyé.",
      final_desc: "Nos conseillers principaux examineront votre demande et vous contacteront sous 12h.",
      return: "Retour au site",
      direct_contact: "Contact Direct",
      email_us: "Contactez directement notre conseiller principal pour des demandes immédiates.",
      custom_placeholder: "Ou décrivez votre situation spécifique dans vos propres mots...",
      confirm: "Confirmer et Continuer",
      email_placeholder: "E-mail auquel vous souhaitez être contacté"
    }
  }[lang];

  const handleGenerateSummary = async () => {
    if (!path) return;
    setIsAIGenerating(true);
    const summary = await generateInquirySummary(path, answers);
    setFormData(prev => ({ ...prev, message: summary || '' }));
    setIsAIGenerating(false);
    setSummaryGenerated(true);
  };

  const handleSubmitInquiry = async () => {
    if (!formData.email || !formData.message) return;
    setIsSending(true);
    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          path: path
        })
      });
      if (response.ok) {
        setStep(6);
      } else {
        console.error('Failed to send inquiry');
        setStep(6); // Still show success for UX, email can be followed up
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      setStep(6); // Still show success for UX
    } finally {
      setIsSending(false);
    }
  };

  const handleNextStep = (answer: string) => {
    const field = step === 2 ? 'q1' : step === 3 ? 'q2' : 'q3';
    setAnswers(prev => ({ ...prev, [field]: answer }));
    setCustomInput('');
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 5) setSummaryGenerated(false);
      setStep(step - 1);
    }
  };

  const pathAQuestions = {
    en: [
      {
        question: "Which of my recurring tasks drains the most 'human hours'?",
        options: [
          "Our team currently spends significant time manually summarizing and extracting data from complex documents.",
          "We are heavily burdened by the manual process of moving data between disparate legacy systems.",
          "Our primary operational drain is the manual checking of every document for policy compliance."
        ]
      },
      {
        question: "What is my biggest barrier to starting this AI journey?",
        options: [
          "Our organization is held back by significant concerns regarding data privacy and security frameworks.",
          "We are currently unsure where AI can actually provide tangible value within our specific context.",
          "We lack a clear 'Step One' plan to move from conceptual interest to actual implementation."
        ]
      },
      {
        question: "What would a successful 'Quick Win' look like?",
        options: [
          "Success for us would be having a clear, actionable long-term roadmap for AI adoption.",
          "We need a working prototype that solves one specific, high-friction problem for our team.",
          "A successful start would be ensuring our entire team has a unified understanding of AI capabilities."
        ]
      }
    ],
    fr: [
      {
        question: "Laquelle de mes tâches récurrentes draine le plus d'heures ?",
        options: [
          "Notre équipe passe actuellement beaucoup de temps à résumer et extraire manuellement des données.",
          "Nous sommes lourdement chargés par le processus manuel de déplacement de données entre systèmes.",
          "Notre principal drain est la vérification manuelle de la conformité de chaque document."
        ]
      },
      {
        question: "Quel est le plus grand obstacle à mon parcours IA ?",
        options: [
          "Notre organisation est freinée par des préoccupations de confidentialité et de sécurité des données.",
          "Nous ne savons pas exactement où l'IA peut apporter une valeur tangible dans notre contexte.",
          "Nous manquons d'un plan clair pour passer de l'intérêt conceptuel à la mise en œuvre réelle."
        ]
      },
      {
        question: "À quoi ressemblerait un succès rapide ?",
        options: [
          "Le succès serait d'avoir une feuille de route claire et exploitable pour l'adoption de l'IA.",
          "Nous avons besoin d'un prototype fonctionnel qui résout un problème spécifique pour notre équipe.",
          "Un bon début serait d'assurer une compréhension unifiée des capacités de l'IA par toute l'équipe."
        ]
      }
    ]
  }[lang];

  const pathBQuestions = {
    en: [
      {
        question: "Where does the project currently stand?",
        options: [
          "I have figured out our requirements and now need a functional Demo or MVP.",
          "We have received several vendor quotes and now require an independent audit of technical feasibility.",
          "Our system is already deployed, but it is currently underperforming and needs a technical audit."
        ]
      },
      {
        question: "What is the biggest barrier to moving forward?",
        options: [
          "We need to prove that the proposed solution actually works before committing further resources.",
          "Our progress is stalled by the need to ensure complete compliance with rigorous security standards.",
          "We are uncertain about the actual technical effort and budget required to finish implementation."
        ]
      },
      {
        question: "What specific technical output do I require?",
        options: [
          "We require a functional minimum viable product (MVP) that demonstrates the core logic.",
          "Our primary need is a detailed third-party feasibility report for our leadership team.",
          "We are looking for a complete and secure system architecture design that follows policy guidelines."
        ]
      }
    ],
    fr: [
      {
        question: "Où en est le projet actuellement ?",
        options: [
          "J'ai défini nos besoins et j'ai maintenant besoin d'une démo ou d'un MVP fonctionnel.",
          "Nous avons reçu des devis et avons besoin d'un audit indépendant de faisabilité technique.",
          "Notre système est déployé mais sous-performant et nécessite un audit d'optimisation."
        ]
      },
      {
        question: "Quel est le plus grand obstacle à l'avancement ?",
        options: [
          "Nous devons prouver que la solution fonctionne avant d'engager plus de ressources.",
          "Nos progrès sont bloqués par la nécessité d'assurer la conformité aux normes de sécurité.",
          "Nous sommes incertains de l'effort technique et du budget réels requis pour terminer."
        ]
      },
      {
        question: "Quelle sortie technique spécifique est requise ?",
        options: [
          "Nous avons besoin d'un MVP fonctionnel qui démontre la logique de base.",
          "Notre besoin principal est un rapport de faisabilité tiers détaillé pour la direction.",
          "Nous recherchons une architecture système complète et sécurisée conforme aux politiques."
        ]
      }
    ]
  }[lang];

  const currentQuestions = path === 'A' ? pathAQuestions : pathBQuestions;
  const currentQData = currentQuestions[step - 2];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-white border border-black flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Left Side: Sidebar with Contact Info */}
        <div className="w-full md:w-5/12 bg-white p-12 flex flex-col justify-between border-r border-black/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0066FF] block mb-12">Advisory Brief // 2026</span>
            <h3 className="text-4xl font-black uppercase tracking-tighter font-display mb-12">{lang === 'en' ? 'Strategic Intake.' : 'Entrée Stratégique.'}</h3>
            
            <div className="pt-12 border-t border-black/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 block mb-4">{t.direct_contact}</span>
              <a href="mailto:info@trustedaiadvisory.ca" className="text-xl font-black hover:text-[#0066FF] transition-colors underline decoration-black/10">info@trustedaiadvisory.ca</a>
              <p className="mt-4 text-[11px] text-black/40 leading-relaxed max-w-[200px]">
                {t.email_us}
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="h-px w-12 bg-[#0066FF] mb-4"></div>
            <span className="text-[9px] font-mono text-black/20 uppercase tracking-widest">Instance_ID: TAA_INTAKE_v1</span>
          </div>
        </div>

        {/* Right Side: Step Content & Back Button */}
        <div className="flex-1 p-8 md:p-12 bg-[#FAFAFA] overflow-y-auto max-h-[90vh] relative">
          {step > 1 && step < 6 && (
            <button 
              onClick={handleBack}
              className="absolute top-8 left-12 group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors z-10"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.back}
            </button>
          )}

          <div className={step > 1 && step < 6 ? "mt-4" : ""}>
            {step === 1 && (
              <div className="animate-in slide-in-from-right-8 duration-500 flex flex-col justify-center min-h-[400px]">
                <span className="text-xs font-black font-mono text-[#0066FF] mb-1">{t.step} 01/05</span>
                <h4 className="text-2xl font-black uppercase mb-6 font-display leading-tight">
                  {lang === 'en' ? 'How can we best support your mission today?' : 'Comment pouvons-nous mieux soutenir votre mission aujourd\'hui ?'}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => { setPath('A'); setStep(2); }} className="text-left p-5 border border-black/10 bg-white hover:border-[#0066FF] transition-all group shadow-sm">
                    <span className="block text-lg font-black uppercase mb-1 group-hover:text-[#0066FF] transition-colors">{t.pathA_title}</span>
                    <span className="text-[13px] text-black leading-snug font-medium">{t.pathA_desc}</span>
                  </button>
                  <button onClick={() => { setPath('B'); setStep(2); }} className="text-left p-5 border border-black/10 bg-white hover:border-[#0066FF] transition-all group shadow-sm">
                    <span className="block text-lg font-black uppercase mb-1 group-hover:text-[#0066FF] transition-colors">{t.pathB_title}</span>
                    <span className="text-[13px] text-black leading-snug font-medium">{t.pathB_desc}</span>
                  </button>
                </div>
              </div>
            )}

            {step >= 2 && step <= 4 && currentQData && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-xs font-black font-mono text-[#0066FF]">0{step}</span>
                  <div className="flex-1 h-px bg-black/5">
                    <div className="bg-[#0066FF] h-full transition-all" style={{ width: `${(step/5)*100}%` }}></div>
                  </div>
                </div>
                <h4 className="text-2xl font-black uppercase mb-8 font-display leading-tight">{currentQData.question}</h4>
                
                <div className="space-y-3">
                  {currentQData.options.map((opt, i) => (
                    <button key={i} onClick={() => handleNextStep(opt)} className="w-full text-left p-5 border border-black/5 bg-white hover:border-[#0066FF] transition-all text-[13px] font-medium leading-relaxed hover:shadow-sm">
                      {opt}
                    </button>
                  ))}
                  
                  {/* Option 4: Permanent Custom Textarea */}
                  <div className="mt-6 border-t border-black/5 pt-6">
                    <textarea
                      placeholder={t.custom_placeholder}
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      className="w-full h-24 border border-black/5 bg-white p-4 text-[13px] font-medium leading-relaxed focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                    />
                    {customInput.trim().length > 0 && (
                      <button 
                        onClick={() => handleNextStep(customInput)} 
                        className="mt-3 w-full bg-[#0066FF] text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all animate-in fade-in slide-in-from-top-2"
                      >
                        {t.confirm}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-in fade-in duration-700">
                <h4 className="text-2xl font-black uppercase mb-2 font-display">{lang === 'en' ? 'Strategic Summary' : 'Synthèse Stratégique'}</h4>
                <p className="text-xs text-black/50 mb-6">
                  {lang === 'en'
                    ? 'Feel free to edit the summary below before sending.'
                    : 'N\'hésitez pas à modifier le résumé ci-dessous avant l\'envoi.'}
                </p>
                <div className="relative group">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-80 border border-black/5 p-8 text-[13px] font-medium leading-relaxed mb-6 bg-white shadow-inner focus:outline-none focus:border-[#0066FF]/30 transition-colors"
                  />
                  {isAIGenerating && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#0066FF] animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#0066FF] animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-[#0066FF] animate-bounce delay-200"></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input 
                    type="email" 
                    placeholder={t.email_placeholder} 
                    value={formData.email}
                    className="w-full border border-black p-5 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-[#0066FF] bg-white transition-all placeholder:text-black/30"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleSubmitInquiry}
                  disabled={!formData.email || isAIGenerating || isSending}
                  className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#0066FF] transition-all disabled:opacity-20"
                >
                  {isSending ? (lang === 'en' ? 'Sending...' : 'Envoi...') : t.send}
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="h-full flex flex-col justify-center items-center text-center py-20">
                <h4 className="text-3xl font-black uppercase font-display mb-6">{t.final_title}</h4>
                <p className="text-black/50 text-sm max-w-sm mb-10 leading-relaxed font-light">{t.final_desc}</p>
                <button onClick={onClose} className="px-12 py-4 border border-black text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all">{t.return}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
