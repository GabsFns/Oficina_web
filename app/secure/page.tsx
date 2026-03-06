"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ChevronRight, Activity } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function EntryPage() {
 

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success(data.message);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro no login");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Efeitos de Fundo "Premium" */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full"></div>
      
      {/* Linhas de Grade Industriais Sutis */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* LOGO / ICON */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 p-[1px] mb-6 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center">
              <Lock className="text-yellow-500" size={32} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-2">
            Voldorico <span className="text-yellow-500">ALM</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-bold">
            Diesel Engineering Systems
          </p>
        </div>

        {/* BOX DE ACESSO */}
        <div className="bg-[#111111]/50 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
            <Activity size={16} className="text-yellow-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Protocolo de Segurança Ativo
            </span>
          </div>

          <form onSubmit={(e) => {
    e.preventDefault(); // previne recarregar a página
    handleLogin();      // chama sua função
  }} className="space-y-6">
            <div className="relative group">
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="CHAVE DE ACESSO"
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-yellow-500/50 transition-all text-center font-mono tracking-[0.3em] text-yellow-500 placeholder:text-gray-700 placeholder:tracking-normal"
              />
            </div>

            <button
              disabled={loading}
              className="w-full group relative overflow-hidden bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                {loading ? "Verificando..." : "Liberar Oficina"}
                <ChevronRight size={16} strokeWidth={3} />
              </span>
            </button>
          </form>
        </div>

        {/* FOOTER DA PÁGINA */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 opacity-30">
            <ShieldCheck size={20} />
            <div className="h-4 w-[1px] bg-white/20"></div>
            <span className="text-[9px] uppercase font-bold tracking-widest">Encrypted Terminal</span>
          </div>
          <p className="text-gray-700 text-[8px] uppercase tracking-widest mt-4">
            Authorized Personnel Only • Est. 2026
          </p>
        </div>
      </div>
    </main>
  );
}