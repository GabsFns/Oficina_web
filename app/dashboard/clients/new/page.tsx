"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, ArrowLeft, Save, UserPlus } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { PatternFormat } from "react-number-format";


export default function NewClient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });

      if (res.ok) {
        toast.success("Cliente cadastrado com sucesso!");
        setTimeout(() => router.push("/dashboard/clients"), 1500);
      } else {
        toast.error("Erro ao salvar cliente. Verifique os dados.");
      }
    } catch (error) {
      toast.error("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      {/* Sistema de Notificação */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: '#121214', 
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.05)' 
          } 
        }} 
      />

      <div className="max-w-2xl mx-auto">
        {/* VOLTAR */}
        <Link 
          href="/dashboard/clients" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Lista de Clientes</span>
        </Link>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <UserPlus className="text-yellow-500" size={32} />
            Novo <span className="text-white/20">Cliente</span>
          </h1>
          <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
        </div>

        {/* FORMULÁRIO */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-[#121214] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl space-y-6"
        >
          {/* CAMPO: NOME */}
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
              <User size={12} /> Nome Completo ou Razão Social
            </label>
            <input
              required
              type="text"
              placeholder="Digite o nome do proprietário ou empresa"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CAMPO: TELEFONE */}
         <div className="group">
  <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
    <Phone size={12} /> Telefone / WhatsApp
  </label>

  <PatternFormat
    format="(##) #####-####"
    mask="_"
    value={phone}
    onValueChange={(values) => setPhone(values.value)}
    placeholder="(00) 00000-0000"
    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm font-mono"
  />
</div>

            {/* CAMPO: EMAIL */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Mail size={12} /> E-mail de Contato
              </label>
              <input
                type="email"
                placeholder="cliente@exemplo.com"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* BOTÃO SALVAR */}
          <div className="pt-6">
            <button
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/10 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} /> Finalizar Cadastro
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-[9px] uppercase tracking-[0.4em] mt-10">
          Base de Dados Confidencial — Voldorico ALM Diesel
        </p>
      </div>
    </div>
  );
}