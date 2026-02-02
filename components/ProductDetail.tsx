
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="pt-32 min-h-screen bg-white animate-fade-in-up">
      <div className="max-w-[1400px] mx-auto px-8 pb-32">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#FF6600] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Voltar para Planos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[#FF6600]/5 rounded-[3rem] -z-10 transform rotate-1"></div>
            <div className="w-full aspect-square bg-slate-50 overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#FF6600]"></span>
                <span className="text-xs font-black text-[#FF6600] uppercase tracking-widest">{product.category}</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-8 tracking-tighter leading-tight">{product.name}</h1>
             
             <div className="bg-slate-50 p-8 rounded-3xl mb-10 border border-slate-100">
                 <p className="text-xl text-slate-600 leading-relaxed font-bold">
                   {product.longDescription || product.description}
                 </p>
             </div>

             <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between px-2">
                   <div className="flex flex-col">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investimento Estimado</span>
                       <span className="text-4xl font-black text-slate-800">R$ {product.price}</span>
                   </div>
                   <div className="text-right">
                       <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Status: Ativo</span>
                       <div className="flex gap-1 justify-end">
                           {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>)}
                       </div>
                   </div>
               </div>

               <button 
                 onClick={() => onAddToCart(product)}
                 className="w-full py-6 bg-[#FF6600] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#e65c00] transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-4 group"
               >
                 Adicionar à Proposta
                 <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
               </button>
               
               <div className="grid grid-cols-2 gap-4 mt-4">
                 {product.features.map((feature, idx) => (
                   <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="w-2 h-2 bg-[#FF6600] rounded-full"></div>
                     <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{feature}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
