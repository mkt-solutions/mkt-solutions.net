
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[800px] overflow-hidden flex items-center bg-[#1a1a1a]"
      aria-label="Soluções de Marketing Digital e Gestão de Tráfego Google Ads para sua empresa"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000" 
          alt="Estratégia Digital ROI Driven e Growth Hacking" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent"></div>
      </div>

      {/* Logo-inspired Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#FF6600]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-slate-400/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-16 h-[2px] bg-[#FF6600]"></span>
            <span className="text-sm font-black uppercase tracking-[0.4em] text-[#FF6600]">SEO Pro & Web Performance</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-10 leading-[0.85]">
            Venda mais. <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] via-[#ff8c40] to-white">
              Escale agora.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-12 max-w-2xl">
            Sua agência de performance focada em conversão de leads e landing pages de alta conversão.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a 
              href="#products" 
              onClick={(e) => handleNavClick(e, 'products')}
              className="px-14 py-6 bg-[#FF6600] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#e65c00] transition-all shadow-[0_20px_40px_rgba(255,102,0,0.3)] text-center flex items-center justify-center gap-3 group"
              title="Ver Planos de Google Ads e Tráfego Pago"
            >
              Consultar Planos
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-14 py-6 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/20 transition-all text-center"
            >
              Nossa Expertise
            </a>
          </div>

          <div className="mt-24 pt-10 border-t border-white/10 flex flex-wrap items-center gap-12 opacity-40">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Foco em Resultados</span>
                <span className="text-lg font-black text-white tracking-tighter">ROI Driven</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Performance Web</span>
                <span className="text-lg font-black text-white tracking-tighter">SEO & PageSpeed</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual background bubbles accent */}
      <div className="absolute right-[-5%] top-[20%] opacity-20 hidden lg:block">
        <div className="w-64 h-64 border-[40px] border-[#FF6600] rounded-full"></div>
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FF6600] rounded-full"></div>
        <div className="absolute -bottom-5 right-10 w-12 h-12 bg-[#FF6600] rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;
