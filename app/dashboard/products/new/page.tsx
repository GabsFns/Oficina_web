"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Plus,
  Info,
  Cpu,
  ShieldCheck,
  Globe,
  Zap,
  Box,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    cost: 0,
    stock: 0,
    category: "",
    images: [
      {
        url: "https://via.placeholder.com/300",
        alt: "Produto",
      },
    ],
  });

  async function handleSubmit() {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      const data = await res.json();

      alert("Produto criado com sucesso 🚀");

      // reset opcional
      setFormData({
        name: "",
        description: "",
        price: 0,
        cost: 0,
        stock: 0,
        category: "",
        images: [],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-yellow-500/30">
      {/* HEADER DE NAVEGAÇÃO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard/products"
            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-yellow-500 hover:text-black transition-all"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Plus className="text-yellow-500" size={14} />
              <p className="text-yellow-500 text-[9px] font-black uppercase tracking-[0.4em]">
                Engine Database / SKU-Register
              </p>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter italic leading-none">
              Novo <span className="text-gray-500">Ativo Técnico</span>
            </h1>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
            Descartar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_10px_40px_rgba(234,179,8,0.2)] flex items-center justify-center gap-2"
          >
            <Save size={16} /> Salvar no Master
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* COLUNA ESQUERDA: FORMULÁRIO TÉCNICO (8 Colunas) */}
        <div className="xl:col-span-7 space-y-8">
          {/* SEÇÃO 01: IDENTIFICAÇÃO */}
          <section className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <Cpu className="text-yellow-500" size={20} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">
                Especificações de Base
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Nome Técnico do Item
                </label>
                <input
                  type="text"
                  placeholder="EX: KIT EMBREAGEM SACHS"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm font-bold uppercase focus:border-yellow-500/50 focus:outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Categoria de Sistema
                </label>

                <select
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm font-bold uppercase focus:border-yellow-500/50 focus:outline-none transition-all appearance-none cursor-pointer hover:border-yellow-500/30"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Selecione</option>
                  <option value="MOTOR">Motor</option>
                  <option value="TRANSMISSAO">Transmissão</option>
                  <option value="FREIOS">Freios</option>
                  <option value="SUSPENSAO">Suspensão</option>
                  <option value="ELETRICO">Elétrico</option>
                  <option value="OUTROS">Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Estoque Inicial
                </label>
                <input
                  type="number"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm font-mono focus:border-yellow-500/50 focus:outline-none transition-all"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* SEÇÃO 02: VALORES E COMPATIBILIDADE */}
          <section className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <Globe className="text-yellow-500" size={20} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">
                Comercial & Aplicação
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Preço de Venda (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-sm">
                    R$
                  </span>
                  <input
                    type="number"
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-5 text-sm font-mono focus:border-yellow-500/50 focus:outline-none transition-all"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Descrição do Produto
                </label>
                <input
                  type="text"
                  placeholder="Descrição técnica do produto"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm font-bold uppercase focus:border-yellow-500/50 focus:outline-none transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* COLUNA DIREITA: PREVIEW & MEDIA (4 Colunas) */}
        <div className="xl:col-span-5 space-y-8">
          {/* UPLOAD DE IMAGEM ESTILIZADO */}
          <div className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-yellow-500/30 transition-all border-dashed border-2">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-4 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-all">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-1">
              Mídia do Ativo
            </h3>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
              Arraste fotos técnicas ou laudos em PDF
            </p>
          </div>

          {/* LIVE PREVIEW CARD */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 ml-4">
              <Zap size={14} className="text-yellow-500" />
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                Live Preview do Catálogo
              </span>
            </div>

            {/* O CARD QUE VOCÊ JÁ TINHA, MAS REATIVO AOS INPUTS */}
            <div className="bg-gradient-to-br from-[#121214] to-[#0d0d0e] border border-white/10 rounded-[2.5rem] p-8 opacity-90 shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 rounded-3xl bg-yellow-500 text-black shadow-[0_10px_30px_rgba(234,179,8,0.3)]">
                  <Box size={24} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block">
                    Status Auto
                  </span>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                    Aguardando Estoque
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-8">
                <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">
                  {formData.category || "CATEGORIA"}
                </p>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none truncate">
                  {formData.name || "NOME DO PRODUTO"}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                <div>
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">
                    Preço Sugerido
                  </span>
                  <span className="text-sm font-mono font-black italic text-yellow-500">
                    R$ {formData.price.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DICA DE INTELIGÊNCIA */}
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[2rem] p-8 flex items-start gap-4">
            <Info className="text-yellow-500 shrink-0" size={20} />
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
              Dica: O SKU é indexado globalmente. Certifique-se de que o código
              segue o padrão da montadora para facilitar a integração com o
              catálogo da ZF ou Eaton.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
