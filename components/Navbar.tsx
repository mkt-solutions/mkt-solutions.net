
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { BRAND_NAME, SLOGAN } from '../constants';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const handleCartClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      onOpenCart();
  }

  const textColorClass = scrolled || mobileMenuOpen ? 'text-slate-800' : 'text-white';
  const logoColorClass = scrolled || mobileMenuOpen ? 'text-slate-800' : 'text-white';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen ? 'bg-white py-4 shadow-xl' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavClick(e, ''); 
            }}
            className={`flex items-center gap-3 group z-50 transition-all duration-500`}
          >
            <div className="relative">
                <div className="w-10 h-10 bg-[#FF6600] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xl italic">m</span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6600] rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#FF6600] rounded-full opacity-70"></div>
            </div>
            <div className="flex flex-col">
                <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${logoColorClass}`}>
                    <span className={scrolled || mobileMenuOpen ? 'text-slate-500' : 'text-slate-200'}>mkt.</span>
                    <span className={scrolled || mobileMenuOpen ? 'text-slate-800' : 'text-white'}>solutions</span>
                </span>
                <span className={`text-[8px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${scrolled || mobileMenuOpen ? 'text-slate-400' : 'text-slate-300'}`}>
                    {SLOGAN}
                </span>
            </div>
          </a>
          
          {/* Center Links */}
          <div className={`hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${textColorClass}`}>
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:text-[#FF6600] transition-colors">Planos</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#FF6600] transition-colors">Metodologia</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-[#FF6600] transition-colors">Blog</a>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
            <button 
              onClick={handleCartClick}
              className={`text-[10px] font-black uppercase tracking-widest transition-all px-6 py-3 rounded-full border border-current hover:bg-[#FF6600] hover:border-[#FF6600] hover:text-white`}
            >
              Propostas ({cartCount})
            </button>
            
            <button 
              className={`block md:hidden focus:outline-none transition-colors duration-500 ${textColorClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
          <div className="flex flex-col items-center space-y-10 text-3xl font-black text-slate-800 uppercase tracking-tighter">
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')}>Planos</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>Metodologia</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')}>Blog</a>
            <button 
                onClick={handleCartClick} 
                className="bg-[#FF6600] text-white px-10 py-5 rounded-xl text-sm uppercase tracking-widest font-bold shadow-xl shadow-orange-200"
            >
                Ver Propostas ({cartCount})
            </button>
          </div>
      </div>
    </>
  );
};

export default Navbar;
