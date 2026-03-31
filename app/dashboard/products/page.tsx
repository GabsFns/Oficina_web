"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Settings2, 
  Package, 
  ArrowUpRight, 
  MoreHorizontal,
  Box,
  Layers,
  ShieldCheck,
  Tag,
  Factory,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// --- MOCK DE PRODUTOS ---
const productsMock = [
  {
    id: "SKU-ZF-TRX-01",
    name: "Transmissão TraXon 12TX",
    category: "Transmissão",
    brand: "ZF Aftermarket",
    price: 45200.00,
    stock: 2,
    status: "DISPONÍVEL",
    compatibility: "Volvo/MAN"
  },
  {
    id: "SKU-EAT-CLU-99",
    name: "Kit Embreagem Heavy Duty",
    category: "Embreagem",
    brand: "Eaton",
    price: 3850.00,
    stock: 15,
    status: "ESTOQUE_BAIXO",
    compatibility: "VW Constellation"
  },
  {
    id: "SKU-SACH-3400",
    name: "Platô de Pressão 430mm",
    category: "Sistema de Transmissão",
    brand: "Sachs",
    price: 2100.00,
    stock: 0,
    status: "INDISPONÍVEL",
    compatibility: "Mercedes-Benz Actros"
  }
];

export default function ProductsMasterPage() {
  const [filter, setFilter] = useState("");

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      
      {/* HEADER DINÂMICO */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="text-yellow-500" size={16} />
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Master Catalog / Engineering</p>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Gestão de <span className="text-gray-500">Produtos</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full xl:w-auto">
          {/* BARRA DE PESQUISA TÁTICA */}
          <div className="relative group flex-1 xl:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="BUSCAR POR SKU OU NOME TÉCNICO..."
              className="w-full bg-[#0d0d0e] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-700"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <Link href="/products/new">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-2xl flex items-center gap-2 transition-all shadow-[0_10px_30px_rgba(234,179,8,0.2)] active:scale-95 group">
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Novo Item</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ÁREA DE PRODUTOS - GRID ULTRA PREMIUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {productsMock.map((product) => (
          <div key={product.id} className="group bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 hover:border-yellow-500/30 transition-all duration-500 relative overflow-hidden">
            
            {/* Overlay Decorativo SKU */}
            <div className="absolute -right-4 -top-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <span className="text-8xl font-black italic uppercase tracking-tighter">{product.brand.split(' ')[0]}</span>
            </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="p-3 rounded-2xl bg-white/5 text-gray-500 group-hover:text-yellow-500 transition-colors">
                <Box size={24} />
              </div>
              <div className="flex flex-col items-end">
                <StatusBadge status={product.status} />
                <span className="text-[9px] font-mono font-bold text-gray-600 mt-2 tracking-tighter">{product.id}</span>
              </div>
            </div>

            <div className="space-y-1 mb-8 relative z-10">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-yellow-500 transition-colors leading-none">
                {product.name}
              </h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Factory size={12} className="text-gray-700" /> {product.brand} • {product.category}
              </p>
            </div>

            {/* DADOS DE PERFORMANCE DO PRODUTO */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Preço Sugerido</span>
                <span className="text-lg font-mono font-black italic text-white">R$ {product.price.toLocaleString('pt-BR')}</span>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 group-hover:border-white/10 transition-colors">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Compatibilidade</span>
                <span className="text-[10px] font-black text-yellow-500/80 uppercase tracking-tighter leading-none">{product.compatibility}</span>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Homologado</span>
              </div>
              
              <Link href={`/products/${product.id}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors group/link">
                Editar Specs 
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}

        {/* CARD ADICIONAR (PLACEHOLDER) */}
        <Link href="/products/new" className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-gray-600 hover:text-yellow-500 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition-all group min-h-[350px]">
          <div className="p-6 rounded-full bg-white/5 group-hover:bg-yellow-500/10 transition-all">
            <Plus size={40} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">Registrar Novo Ativo</span>
        </Link>
      </div>

      {/* FOOTER DE APOIO */}
      <div className="mt-12 p-8 bg-[#0d0d0e] border border-white/5 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">
            <Settings2 size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black italic uppercase tracking-tighter text-white">Configurações de Atributos</h4>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Defina categorias, marcas e regras de precificação global</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Gerenciar Metadados</button>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE: BADGE DE STATUS ---
function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    DISPONÍVEL: { color: "text-green-500", bg: "bg-green-500/10", label: "Disponível", border: "border-green-500/20" },
    ESTOQUE_BAIXO: { color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Estoque Crítico", border: "border-yellow-500/20" },
    INDISPONÍVEL: { color: "text-red-500", bg: "bg-red-500/10", label: "Sem Estoque", border: "border-red-500/20" },
  };
  const config = configs[status] || configs.DISPONÍVEL;
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.border} ${config.bg}`}>
      <span className={`w-1 h-1 rounded-full ${config.color.replace('text', 'bg')}`} />
      <span className={`text-[8px] font-black uppercase tracking-[0.1em] ${config.color}`}>{config.label}</span>
    </div>
  );
}