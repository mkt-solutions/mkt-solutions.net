
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product, LoadingState } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    sobrenome: '',
    empresa: '',
    cidade: '',
    whatsapp: ''
  });
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMessage, setErrorMessage] = useState('');



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.nome || !formData.whatsapp) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
    }

    setStatus(LoadingState.LOADING);
    setErrorMessage('');

    // Endpoint configurado para atendimento@mkt-solutions.com.br
    const ENDPOINT = 'https://formsubmit.co/ajax/atendimento@mkt-solutions.com.br';

    const payload = {
        _subject: `Nova Proposta Site: ${formData.empresa || formData.nome}`,
        ...formData,
        itens_selecionados: items.map(i => i.name).join(', '),
        valor_total: 'Sob Consulta',
        _honey: "" // Campo anti-spam
    };

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success === "true") {
            setStatus(LoadingState.SUCCESS);
        } else {
            // Se o e-mail não foi ativado, o FormSubmit retorna erro aqui
            console.error("Erro FormSubmit:", result);
            setErrorMessage(result.message || "E-mail não ativado. Verifique a caixa de entrada de atendimento@mkt-solutions.com.br para ativar o FormSubmit.");
            setStatus(LoadingState.ERROR);
        }
    } catch (error) {
        console.error("Erro no checkout:", error);
        setErrorMessage("Erro de conexão. Verifique sua internet ou se o serviço FormSubmit está acessível.");
        setStatus(LoadingState.ERROR);
    }
  };

  if (status === LoadingState.SUCCESS) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-8">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">Proposta Enviada!</h1>
            <p className="text-slate-500 font-bold mb-10 max-w-md">Obrigado! Recebemos sua solicitação em atendimento@mkt-solutions.com.br. Nosso time analisará seu perfil e entrará em contato via WhatsApp.</p>
            <button onClick={onBack} className="px-10 py-4 bg-[#FF6600] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#e65c00] transition-colors">Voltar ao Site</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-white animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#FF6600] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Voltar para os Planos
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tighter">Finalizar Proposta</h1>
            <p className="text-sm text-slate-500 font-bold mb-12">Receba um diagnóstico personalizado com os planos selecionados.</p>
            
            <div className="space-y-12">
              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Seu Contato</h2>
                <div className="space-y-4">
                   <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="E-mail profissional" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 placeholder-slate-400 outline-none focus:border-[#FF6600] transition-colors font-bold" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">Informações do Negócio</h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <input required name="nome" value={formData.nome} onChange={handleInputChange} type="text" placeholder="Primeiro Nome" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 font-bold outline-none focus:border-[#FF6600]" />
                      <input name="sobrenome" value={formData.sobrenome} onChange={handleInputChange} type="text" placeholder="Sobrenome" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 font-bold outline-none focus:border-[#FF6600]" />
                   </div>
                   <input name="empresa" value={formData.empresa} onChange={handleInputChange} type="text" placeholder="Nome da Empresa ou Site" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 font-bold outline-none focus:border-[#FF6600]" />
                   <div className="grid grid-cols-2 gap-4">
                      <input name="cidade" value={formData.cidade} onChange={handleInputChange} type="text" placeholder="Cidade" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 font-bold outline-none focus:border-[#FF6600]" />
                      <input required name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="text" placeholder="WhatsApp (com DDD)" className="w-full bg-slate-50 border-b-2 border-slate-100 py-4 px-4 text-slate-800 font-bold outline-none focus:border-[#FF6600]" />
                   </div>
                </div>
              </div>

              <div>
                <button 
                    type="submit"
                    disabled={status === LoadingState.LOADING}
                    className="w-full py-6 bg-[#FF6600] text-white uppercase tracking-widest text-sm font-black rounded-2xl hover:bg-[#e65c00] shadow-2xl shadow-orange-100 transition-all disabled:opacity-50"
                >
                    {status === LoadingState.LOADING ? 'Enviando...' : `Solicitar Proposta`}
                </button>
                {status === LoadingState.ERROR && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-center">
                    <p className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-1">Erro no Envio</p>
                    <p className="text-slate-600 text-xs font-bold leading-tight">{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:pl-16 lg:border-l border-slate-100">
            <h2 className="text-xl font-black text-slate-800 mb-10 uppercase tracking-tight">Resumo da Seleção</h2>
            
            <div className="space-y-8 mb-10">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-6 animate-fade-in-up">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden relative border border-slate-100">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-black text-slate-800 text-lg tracking-tighter">{item.name}</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <span className="text-sm font-black text-slate-800">Sob Consulta</span>
                 </div>
               ))}
            </div>

            <div className="border-t border-slate-100 pt-8 space-y-4">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                 <span>Subtotal</span>
                 <span className="text-slate-800 font-black">Sob Consulta</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 mt-8 pt-8">
               <div className="flex justify-between items-center">
                 <span className="font-black text-2xl text-slate-800 tracking-tighter">Total Estimado</span>
                 <span className="font-black text-4xl text-[#FF6600] tracking-tighter">Sob Consulta</span>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
