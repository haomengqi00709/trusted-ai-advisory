
import React from 'react';
import { Language } from '../App';
import { LegalDocType } from './LegalModal';

interface FooterProps {
  lang: Language;
  onLegalClick: (doc: LegalDocType) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onLegalClick }) => {
  const t = {
    en: {
      mission: "Specialized AI governance for Canada’s public sector. We empower federal and provincial bodies to deploy secure, high-integrity AI frameworks that protect the privacy and rights of all Canadians.",
      hq: "HQ",
      inquiries: "Inquiries",
      rights: "All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      compliance: "Compliance"
    },
    fr: {
      mission: "Gouvernance spécialisée de l'IA pour le secteur public canadien. Nous donnons aux organismes fédéraux et provinciaux les moyens de déployer des cadres d'IA sécurisés et de haute intégrité, protégeant la vie privée et les droits de tous les Canadiens.",
      hq: "Siège",
      inquiries: "Demandes",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      compliance: "Conformité"
    }
  }[lang];

  return (
    <footer id="contact" className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 border-t border-black/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <h4 className="text-3xl font-black uppercase tracking-tighter mb-8 font-display">Trusted AI Advisory Inc.</h4>
          <p className="text-black/50 text-sm max-w-sm leading-relaxed">
            {t.mission}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 block mb-6">{t.inquiries}</span>
          <div className="space-y-2">
            <a href="mailto:info@trustedaiadvisory.ca" className="block text-sm hover:opacity-50 transition-opacity underline decoration-black/10">info@trustedaiadvisory.ca</a>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 block mb-6">{t.hq}</span>
          <p className="text-sm text-black/60 leading-relaxed">
            116 Albert Street, Suite 200 & 300<br />
            Ottawa, ON K1P 5G3<br />
            Canada
          </p>
        </div>
      </div>
      
      <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold">
          &copy; 2026 Trusted AI Advisory Inc. {t.rights}
        </span>
        <div className="flex space-x-8">
          <button onClick={() => onLegalClick('privacy')} className="text-[10px] uppercase tracking-widest text-black/30 font-bold hover:text-black transition-colors">{t.privacy}</button>
          <button onClick={() => onLegalClick('terms')} className="text-[10px] uppercase tracking-widest text-black/30 font-bold hover:text-black transition-colors">{t.terms}</button>
          <button onClick={() => onLegalClick('compliance')} className="text-[10px] uppercase tracking-widest text-black/30 font-bold hover:text-black transition-colors">{t.compliance}</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
