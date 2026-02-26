import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface LoginPageProps {
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      // Redirect or close login page, handled by parent (App.tsx)
    } else {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white animate-fade-in-up">
      <div className="max-w-md w-full bg-slate-50 p-10 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter text-center">Login Admin</h1>
        <p className="text-sm text-slate-500 font-bold mb-8 text-center">Acesse a área de leads com suas credenciais.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border-b-2 border-slate-100 py-4 px-4 text-slate-800 placeholder-slate-400 outline-none focus:border-[#FF6600] transition-colors font-bold"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border-b-2 border-slate-100 py-4 px-4 text-slate-800 placeholder-slate-400 outline-none focus:border-[#FF6600] transition-colors font-bold"
            required
          />
          {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
          <button
            type="submit"
            className="w-full py-5 bg-[#FF6600] text-white uppercase tracking-widest text-sm font-black rounded-2xl hover:bg-[#e65c00] transition-all shadow-xl shadow-orange-100"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 text-slate-500 uppercase tracking-widest text-xs font-black rounded-2xl hover:text-slate-800 transition-colors"
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
