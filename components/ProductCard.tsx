
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group flex flex-col gap-6 cursor-pointer bg-slate-50 p-4 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-orange-100" onClick={() => onClick(product)}>
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-white">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-white text-[#FF6600] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black shadow-xl">
                    Ver Detalhes
                </span>
            </div>
        </div>
        
        <div className="absolute top-4 left-4">
             <span className="bg-[#FF6600] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                {product.category}
             </span>
        </div>
      </div>
      
      <div className="px-2">
        <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#FF6600] transition-colors tracking-tighter">{product.name}</h3>
        <p className="text-sm font-bold text-slate-500 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planos a partir de</span>
            <span className="text-lg font-black text-slate-800">R$ {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
