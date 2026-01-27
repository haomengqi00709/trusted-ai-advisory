
import React, { useState, useRef, useEffect } from 'react';
import { getAdvisoryResponse } from '../services/geminiService';
import { Message } from '../types';

const AdvisoryBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the Trusted AI Policy Interface. How can I assist you with Canadian public sector AI directives or secure workflow design today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const response = await getAdvisoryResponse(userMessage);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that request." }]);
  };

  return (
    <section id="consultant" className="py-24 md:py-40 bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-6 text-[#0066FF]">Demo // Environment v1.0</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter font-display mb-10">AI Policy <br />Interface.</h2>
            <p className="text-white/60 font-light max-w-md mb-8 leading-relaxed">
              An interactive demonstration of how generative models can be tuned to reflect current federal and provincial AI regulatory frameworks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 bg-white/5 hover:border-[#0066FF]/50 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] block mb-2">Policy Unit</span>
                <span className="text-sm font-medium">AIDA Compliant</span>
              </div>
              <div className="p-4 border border-white/10 bg-white/5 hover:border-[#0066FF]/50 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066FF] block mb-2">Logic Engine</span>
                <span className="text-sm font-medium">Flash 3.0</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border border-white/10 h-[600px] flex flex-col bg-[#050505] relative overflow-hidden shadow-[0_30px_100px_rgba(0,102,255,0.1)]">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent"></div>
            
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${m.role === 'user' ? 'bg-[#0066FF] text-white p-4' : 'border-l-2 border-[#0066FF]/50 pl-6 py-2'}`}>
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold block mb-2 opacity-50">
                      {m.role === 'user' ? 'CLIENT REQUEST' : 'ADVISORY SYSTEM'}
                    </span>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="border-l-2 border-[#0066FF]/50 pl-6 py-2">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold block mb-2 text-[#0066FF]">PROCESSING...</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-[#0066FF] animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-[#0066FF] animate-pulse delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-[#0066FF] animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 border-t border-white/10 bg-black">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query policy framework..."
                  className="flex-1 bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-[#0066FF] transition-colors"
                />
                <button 
                  disabled={isTyping}
                  className="bg-[#0066FF] text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-[#0052cc] disabled:opacity-50 transition-all"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryBot;
