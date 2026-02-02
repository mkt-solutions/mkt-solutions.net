
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden relative">
      {/* Decorative logo-inspired shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center"><span className="text-white font-black text-xs">m</span></div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-[#808080]">Por que nós?</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] mb-10 leading-[0.9]">
              Resultados <br/> que saltam <br/> <span className="text-[#FF6600]">aos olhos.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-bold">
              Na MKT-Solutions, cada projeto é um plano estratégico único. Não apenas criamos sites; desenhamos jornadas de crescimento digital e performance acelerada.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-10 mb-12">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-[#FF6600] transition-all duration-500">
                <h4 className="text-4xl font-black text-[#FF6600] mb-2 group-hover:text-white transition-colors">3.5x</h4>
                <p className="text-xs font-black text-[#808080] uppercase tracking-widest group-hover:text-white/80 transition-colors">ROI Médio</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-[#FF6600] transition-all duration-500">
                <h4 className="text-4xl font-black text-[#FF6600] mb-2 group-hover:text-white transition-colors">99+</h4>
                <p className="text-xs font-black text-[#808080] uppercase tracking-widest group-hover:text-white/80 transition-colors">Performance Score</p>
              </div>
            </div>

            <ul className="space-y-6">
              {[
                'Transparência total em métricas de funil',
                'Design orientado à conversão e UX',
                'Estratégias escaláveis para qualquer mercado'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 font-black">
                  <div className="w-6 h-6 bg-[#FF6600]/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute -inset-6 bg-[#FF6600]/5 rounded-[3rem] -z-10 transform -rotate-2 group-hover:rotate-1 transition-transform duration-700"></div>
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-orange-100 border-8 border-white">
                <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="Gestão de Tráfego e Google Ads Performance Analysis" 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
            </div>
            
            <div className="absolute -bottom-10 -left-10 p-10 glass-card rounded-[2rem] shadow-2xl border border-slate-100 animate-bounce duration-5000">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-slate-800 tracking-tighter">+127%</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance de Crescimento</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
