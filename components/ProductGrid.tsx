
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

const displayCategories = [
    { id: 'All', label: 'Todos' },
    { id: 'Web', label: 'Landing Pages' },
    { id: 'Ads', label: 'Google Ads' },
    { id: 'Social', label: 'Social Media' },
    { id: 'IA', label: 'Chatbots IA' },
    { id: 'CRM', label: 'Gestão CRM' },
    { id: 'Strategy', label: 'Estratégia' }
];

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center shadow-lg"><span className="text-white font-black text-xs">m</span></div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">Nossos Planos</h2>
          </div>
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-slate-100 w-full max-w-2xl">
            {displayCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] pb-1 border-b-2 transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'border-[#FF6600] text-[#FF6600]' 
                    : 'border-transparent text-slate-400 hover:text-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
