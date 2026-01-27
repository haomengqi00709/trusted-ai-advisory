
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Values from './components/Values';
import Services from './components/Services';
import FeaturedProject from './components/FeaturedProject';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import LegalModal, { LegalDocType } from './components/LegalModal';

export type Language = 'en' | 'fr';

const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen relative">
      <Header 
        onInquireClick={() => setIsInquiryOpen(true)} 
        currentLang={lang} 
        onLangChange={setLang} 
      />
      <main>
        <Hero onInquireClick={() => setIsInquiryOpen(true)} lang={lang} />
        
        <div className="h-12 md:h-20"></div> 
        <Values lang={lang} />
        
        <div className="h-12 md:h-20"></div>
        <Services lang={lang} />
        
        <div className="h-12 md:h-20"></div>
        <FeaturedProject lang={lang} />
      </main>
      <Footer lang={lang} onLegalClick={(doc) => setLegalDoc(doc)} />

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} lang={lang} />
      <LegalModal isOpen={legalDoc !== null} onClose={() => setLegalDoc(null)} initialDoc={legalDoc} lang={lang} />
    </div>
  );
};

export default App;
