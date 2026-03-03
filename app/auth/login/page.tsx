"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-6">
      {/* Container Principal */}
      <div className="w-full max-w-[1000px] h-[650px] flex overflow-hidden rounded-[2rem] bg-[#121214] shadow-2xl border border-white/5">
        
        {/* Lado Esquerdo: Login */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Oficina Especializada</p>
            <h2 className="text-4xl font-bold tracking-tight">Portal ALM Diesel</h2>
            <p className="text-gray-500 mt-2 text-sm">Acesse o sistema de gerenciamento.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 transition-colors group-focus-within:text-yellow-500">Usuário ou E-mail</label>
              <input
                type="email"
                placeholder="exemplo@vodorico.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-blue-500/40 transition-all text-sm mt-1"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold transition-colors group-focus-within:text-yellow-500">Senha</label>
                <span className="text-[10px] text-gray-600 hover:text-white cursor-pointer transition-all">Esqueceu a senha?</span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-blue-500/40 transition-all text-sm mt-1"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-500 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-yellow-900/20 active:scale-[0.98] mt-4"
            >
              Entrar no Sistema
            </button>
          </form>
          
          <p className="text-gray-500 mt-2 text-sm">
              Não possui conta?{" "}
              <Link href="/auth/register" className="text-yellow-500 hover:underline">
                Faça seu cadastro
              </Link>
            </p>

          <div className="mt-auto pt-10 text-center">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">Vodorico ALM Diesel © 2026</p>
          </div>
        </div>

        {/* Lado Direito: Foto do Caminhão com Overlay */}
        <div className="hidden md:block flex-1 relative group">
          {/* Imagem de Fundo (Caminhão) */}
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" 
            alt="Truck Diesel" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay de Gradiente para dar o estilo Dark das suas fotos */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40"></div>
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>

          {/* Texto sobre a imagem */}
          <div className="absolute bottom-12 left-12 right-12">
            <div className="w-12 h-[2px] bg-yellow-500 mb-4"></div>
            <h3 className="text-2xl font-light leading-snug">
              Potência e precisão <br /> 
              <span className="font-bold italic">em cada detalhe.</span>
            </h3>
          </div>
        </div>
      </div>
    </main>
  );
}