
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Language } from '../App';

// Import markdown files
import privacyEn from '../legal/privacy-en.md?raw';
import privacyFr from '../legal/privacy-fr.md?raw';
import termsEn from '../legal/terms-en.md?raw';
import termsFr from '../legal/terms-fr.md?raw';
import complianceEn from '../legal/compliance-en.md?raw';
import complianceFr from '../legal/compliance-fr.md?raw';

export type LegalDocType = 'privacy' | 'terms' | 'compliance' | null;

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc: LegalDocType;
  lang: Language;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialDoc, lang }) => {
  const [activeDoc, setActiveDoc] = useState<Exclude<LegalDocType, null>>('privacy');

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const docs = {
    privacy: { en: privacyEn, fr: privacyFr },
    terms: { en: termsEn, fr: termsFr },
    compliance: { en: complianceEn, fr: complianceFr }
  };

  const tabs = {
    en: [
      { key: 'privacy', label: 'Privacy Policy' },
      { key: 'terms', label: 'Terms of Service' },
      { key: 'compliance', label: 'Compliance' }
    ],
    fr: [
      { key: 'privacy', label: 'Confidentialité' },
      { key: 'terms', label: 'Conditions' },
      { key: 'compliance', label: 'Conformité' }
    ]
  }[lang];

  const content = docs[activeDoc][lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white border border-black shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="shrink-0 bg-black text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono font-bold tracking-widest opacity-50">LEGAL</span>
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveDoc(tab.key as Exclude<LegalDocType, null>)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeDoc === tab.key
                      ? 'bg-[#0066FF] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="prose prose-sm max-w-none
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:font-black prose-h1:mb-2 prose-h1:border-b-2 prose-h1:border-black prose-h1:pb-4
            prose-h2:text-lg prose-h2:font-black prose-h2:mt-8 prose-h2:mb-3 prose-h2:text-black
            prose-p:text-black/70 prose-p:leading-relaxed prose-p:text-sm
            prose-li:text-black/70 prose-li:text-sm
            prose-strong:text-black prose-strong:font-bold
            prose-ul:my-3 prose-ul:pl-4
            prose-a:text-[#0066FF] prose-a:no-underline hover:prose-a:underline
          ">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-8 py-4 bg-neutral-50 border-t border-black/10 flex justify-between items-center">
          <span className="text-[10px] font-mono text-black/30">
            Trusted AI Advisory Inc.
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/30">
            {lang === 'en' ? 'Press ESC to close' : 'Appuyez sur ESC pour fermer'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
