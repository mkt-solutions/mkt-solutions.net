
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

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      default:
        return <div className="w-5 h-5 bg-white/20 group-hover:bg-white rounded-sm"></div>;
    }
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
          <div className="flex gap-6">
            {['twitter', 'instagram', 'linkedin'].map(social => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF6600] hover:border-[#FF6600] transition-all group text-white/40 hover:text-white"
                  aria-label={social}
                >
                    {getSocialIcon(social)}
                </a>
            ))}
          </div>
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
