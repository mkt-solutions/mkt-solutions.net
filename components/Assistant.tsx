
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AdminLead } from '../types.ts';
import { sendMessageToGemini } from '../services/geminiService.ts';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Oi! Sou o Boris, estrategista aqui na MKT. Adoro conversar sobre estratégias de crescimento. Como está o momento da sua empresa hoje?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen, isThinking, isSendingEmail]);

  const saveLeadToAdmin = (lead: AdminLead) => {
    const existing = JSON.parse(localStorage.getItem('mkt_leads') || '[]');
    localStorage.setItem('mkt_leads', JSON.stringify([lead, ...existing]));
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isFinished || isSendingEmail) return;
    
    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const result = await sendMessageToGemini(history, userMsg.text);

      if (result.functionCall && result.functionCall.name === 'enviarTranscricao') {
        const args = result.functionCall.args;
        setIsSendingEmail(true);
        
        saveLeadToAdmin({
            id: Math.random().toString(36).substr(2, 9),
            nome: args.nome,
            email: args.email,
            whatsapp: args.whatsapp,
            resumo: args.resumo,
            tag: args.tag || 'lead padrão',
            data: Date.now()
        });

        const WEBHOOK_URL = 'https://formsubmit.co/ajax/atendimento@mkt-solutions.com.br'; 
        
        const payload = {
          _subject: `Novo Lead IA [${args.tag || 'Geral'}]: ${args.nome}`,
          nome: args.nome,
          email: args.email,
          whatsapp: args.whatsapp,
          resumo: args.resumo,
          tag: args.tag,
          transcricao: [...history, { role: 'user', text: userMsg.text }].map(m => 
            `${m.role === 'user' ? 'Cliente' : 'Boris'}: ${m.text}`
          ).join('\n')
        };

        try {
          await fetch(WEBHOOK_URL, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload) 
          });
          
          const confirmationMsg = `Perfeito, ${args.nome.split(' ')[0]}. Já anotei tudo e enviei pessoalmente para o meu time comercial. Eles vão te chamar no WhatsApp em breve!`;
          
          setMessages(prev => [...prev, { role: 'model', text: confirmationMsg, timestamp: Date.now() }]);
          setIsFinished(true);
        } catch (error) {
          setMessages(prev => [...prev, { role: 'model', text: "Anotei seus dados, Boris aqui, mas tive um probleminha no meu sistema de envio. Nosso time já foi alertado!", timestamp: Date.now() }]);
          setIsFinished(true);
        } finally {
          setIsSendingEmail(false);
        }
      } else if (result.text) {
        setMessages(prev => [...prev, { role: 'model', text: result.text, timestamp: Date.now() }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Minha conexão falhou por um segundo. Pode me contar de novo?", timestamp: Date.now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  // Imagem do Boris (Baseada no modelo fornecido)
  const borisAvatar = "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=200";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(255,102,0,0.2)] w-[90vw] sm:w-[420px] h-[650px] mb-6 flex flex-col overflow-hidden border border-slate-100 animate-fade-in-up">
          <div className="bg-[#1a1a1a] p-8 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF6600]">
                 <img src={borisAvatar} alt="Boris" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter">Boris</span>
                  <span className="text-[8px] uppercase tracking-widest opacity-50 font-bold">Estrategista MKT-Solutions</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-bold leading-relaxed ${msg.role === 'user' ? 'bg-[#FF6600] text-white shadow-xl shadow-orange-100 rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && <div className="flex gap-2 p-5 bg-white border border-slate-200 rounded-3xl w-fit"><div className="w-2 h-2 bg-[#FF6600] rounded-full animate-bounce"></div><div className="w-2 h-2 bg-[#FF6600] rounded-full animate-bounce delay-100"></div><div className="w-2 h-2 bg-[#FF6600] rounded-full animate-bounce delay-200"></div></div>}
            {isSendingEmail && (
              <div className="flex justify-center py-4 italic text-slate-400 text-xs font-bold animate-pulse">
                Boris avisando o comercial...
              </div>
            )}
            {isFinished && (
              <div className="flex justify-center py-4">
                <span className="bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  Papo com Boris enviado!
                </span>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex gap-3">
              <input 
                disabled={isFinished || isSendingEmail}
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder={isFinished ? "Tudo certo!" : "Fale com o Boris..."} 
                className="flex-1 bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-orange-50 font-bold disabled:opacity-50" 
              />
              <button 
                disabled={isFinished || isSendingEmail}
                onClick={handleSend} 
                className="bg-[#FF6600] text-white p-4 rounded-2xl hover:bg-[#e65c00] shadow-lg shadow-orange-200 transition-all disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Botão de Boris com Texto */}
      <div className="flex items-center gap-4 group">
        {!isOpen && (
          <div className="bg-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-100 animate-fade-in-up transition-all group-hover:-translate-x-2">
            <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
              como eu posso te ajudar?
            </p>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="bg-white w-20 h-20 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-[#FF6600] overflow-hidden group relative"
        >
          {isOpen ? (
            <svg className="w-8 h-8 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          ) : (
            <img src={borisAvatar} alt="Boris Chat" className="w-full h-full object-cover" />
          )}
          {!isOpen && <div className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>}
        </button>
      </div>
    </div>
  );
};

export default Assistant;
