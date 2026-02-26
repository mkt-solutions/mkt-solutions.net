
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { SLOGAN } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onAdminClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };



  return (
    <footer className="bg-[#1a1a1a] pt-32 pb-16 px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center text-white text-xl font-black italic shadow-lg shadow-orange-900/40">m</div>
            <div className="flex flex-col">
                <h4 className="text-2xl font-black text-white tracking-tighter">mkt.solutions</h4>
                <span className="text-[10px] font-black text-[#808080] uppercase tracking-[0.3em]">{SLOGAN}</span>
            </div>
          </div>
          <p className="max-w-md font-bold text-lg leading-relaxed text-slate-400 mb-10">
            Transformamos cliques em conversões e visibilidade em faturamento através de estratégias digitais de alta performance.
          </p>

        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-10">
          <div>
            <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">Soluções</h4>
            <ul className="space-y-6 font-bold text-sm">
                <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#FF6600] transition-colors">Planos</a></li>
                <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#FF6600] transition-colors">SEO</a></li>
                <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#FF6600] transition-colors">Tráfego</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">MKT</h4>
            <ul className="space-y-6 font-bold text-sm">
                <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#FF6600] transition-colors">Sobre</a></li>
                <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-[#FF6600] transition-colors">Insights</a></li>
                {onAdminClick && (
                    <li><button onClick={onAdminClick} className="hover:text-[#FF6600] transition-colors text-left">Admin Leads</button></li>
                )}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <h4 className="font-black text-white mb-8 tracking-widest text-xs uppercase">News & Growth</h4>
          <div className="flex flex-col gap-6">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base outline-none focus:border-[#FF6600] transition-colors placeholder-slate-600 text-white font-bold" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="w-full text-xs font-black uppercase tracking-widest py-5 bg-[#FF6600] text-white rounded-2xl hover:bg-[#e65c00] shadow-xl shadow-orange-900/20 transition-all"
            >
              {subscribeStatus === 'idle' && 'Quero Receber Insights'}
              {subscribeStatus === 'loading' && 'Acessando...'}
              {subscribeStatus === 'success' && 'Bem-vindo!'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[#808080]">
        <p>© 2025 mkt.solutions | web digital plans</p>
        <p className="mt-4 md:mt-0">Estratégia · Performance · Resultados</p>
      </div>
    </footer>
  );
};

export default Footer;
