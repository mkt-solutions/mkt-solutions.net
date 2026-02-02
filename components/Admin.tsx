
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { AdminLead } from '../types.ts';

interface AdminProps {
  onBack: () => void;
}

const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const [leads, setLeads] = useState<AdminLead[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('mkt_leads') || '[]');
    setLeads(data);
  }, []);

  const clearLeads = () => {
    if (confirm("Deseja realmente limpar todos os leads salvos localmente?")) {
        localStorage.removeItem('mkt_leads');
        setLeads([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
            <div>
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">Admin Leads</h1>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Gestão de leads capturados pela IA</p>
            </div>
            <div className="flex gap-4">
                <button 
                  onClick={clearLeads}
                  className="px-6 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
                >
                  Limpar Dados
                </button>
                <button 
                  onClick={onBack}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
                >
                  Sair do Admin
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leads.length === 0 ? (
            <div className="col-span-full py-32 text-center bg-white rounded-[2rem] border border-slate-100">
               <span className="text-slate-300 font-black uppercase text-xs tracking-[0.2em]">Nenhum lead capturado ainda</span>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                {lead.tag === 'lead quente' && (
                  <div className="absolute top-0 right-0 bg-[#FF6600] text-white px-6 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest">
                    Lead Quente
                  </div>
                )}
                
                <div className="mb-6">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Data: {new Date(lead.data).toLocaleDateString()}</span>
                    <h3 className="text-xl font-black text-slate-800 tracking-tighter">{lead.nome}</h3>
                    <p className="text-[#FF6600] font-black text-sm">{lead.whatsapp}</p>
                    <p className="text-slate-400 font-bold text-xs truncate">{lead.email}</p>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3">Principais Pontos / Resumo:</span>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                        "{lead.resumo}"
                    </p>
                </div>

                <div className="mt-6 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${lead.tag === 'lead quente' ? 'bg-orange-50 text-[#FF6600]' : 'bg-slate-50 text-slate-400'}`}>
                        {lead.tag}
                    </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
