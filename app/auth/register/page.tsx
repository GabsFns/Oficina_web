"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Erro ao cadastrar");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white p-6">
      {/* Container Principal */}
      <div className="w-full max-w-[1000px] h-[650px] flex overflow-hidden rounded-[2rem] bg-[#121214] shadow-2xl border border-white/5">
        <div className="hidden md:block flex-1 relative group">
          {/* Nova imagem de caminhão robusto em fundo escuro */}
          <img
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Truck Diesel Engine"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              // Se o link acima falhar, ele carrega essa imagem de segurança (caminhão genérico)
              e.currentTarget.src =
                "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260";
            }}
          />

          {/* Overlay de Gradiente - Deixa a parte de baixo escura para o texto aparecer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40"></div>

          {/* Overlay Amarelo Sutil */}
          <div className="absolute inset-0 bg-yellow-600/5 mix-blend-overlay"></div>

          {/* Texto sobre a imagem */}
          <div className="absolute bottom-12 left-12 right-12 text-right">
            <div className="w-12 h-[2px] bg-yellow-500 mb-4 ml-auto"></div>
            <h3 className="text-2xl font-light leading-snug">
              Tecnologia de ponta <br />
              <span className="font-bold italic text-yellow-500">
                Voldorico ALM Diesel.
              </span>
            </h3>
          </div>
        </div>

        {/* Lado Direito: Formulário de Cadastro */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Novo Cadastro
            </p>
            <h2 className="text-4xl font-bold tracking-tight">Criar Conta</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Já tem conta?{" "}
              <Link href="/auth/login" className="text-yellow-500 hover:underline">
                Faça login
              </Link>
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Campo Nome */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 transition-colors group-focus-within:text-yellow-500">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/40 transition-all text-sm mt-1"
              />
            </div>

            {/* Campo Email */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 transition-colors group-focus-within:text-yellow-500">
                E-mail Corporativo
              </label>
              <input
                type="email"
                placeholder="nome@voldorico.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/40 transition-all text-sm mt-1"
              />
            </div>

            {/* Campo Senha */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 transition-colors group-focus-within:text-yellow-500">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/40 transition-all text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold transition-all shadow-lg shadow-yellow-900/10 active:scale-[0.98] mt-6 uppercase tracking-wider text-sm"
            >
              Finalizar Registro
            </button>
          </form>

          <div className="mt-auto pt-8 text-center">
            <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em]">
              Voldorico ALM Diesel • Tecnologia & Força
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
