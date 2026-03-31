"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap,
  RefreshCcw,
  History,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function EditProductPage({ params }: { params: { id: string } }) {
  // Estado inicial simulando o produto carregado pelo ID
  const [formData, setFormData] = useState({
    sku: "ZF-9901-TRX",
    name: "Transmissão TraXon 12TX",
    brand: "ZF Aftermarket",
    category: "Transmissão",
    price: 45200.00,
    compatibility: "Volvo FH / MAN TGX",
    lastUpdate: "2026-03-15"
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-yellow-500/30">
      
      {/* HEADER DE EDIÇÃO */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex items-center gap-6">
          <Link href="/products" className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft size={20} className="text-gray-500 group-hover:text-white transition-colors" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <RefreshCcw className="text-yellow-500 animate-spin-slow" size={14} />
              <p className="text-yellow-500 text-[9px] font-black uppercase tracking-[0.4em]">Asset Refactoring / SKU: {params.id}</p>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
              Editar <span className="text-gray-500">Especificações</span>
            </h1>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group">
            <Trash2 size={20} />
          </button>
          <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_10px_40px_rgba(234,179,8,0.2)] flex items-center justify-center gap-2">
            <Save size={16} /> Atualizar Registro
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        
        {/* COLUNA DE CAMPOS (8 Colunas) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* CARD: DADOS MESTRE */}
          <section className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <ShieldCheck size={40} className="text-white/[0.03]" />
            </div>

            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <Cpu className="text-yellow-500" size={20} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">Core Specifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EditField 
                label="SKU / Identificador" 
                value={formData.sku} 
                fontMono 
                onChange={(v:any) => setFormData({...formData, sku: v})} 
              />
              <EditField 
                label="Nome do Ativo" 
                value={formData.name} 
                onChange={(v:any) => setFormData({...formData, name: v})} 
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Fabricante Autorizado</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm font-bold uppercase focus:border-yellow-500/50 focus:outline-none transition-all appearance-none text-white">
                  <option>{formData.brand}</option>
                  <option>Eaton Fuller</option>
                  <option>Sachs / Mann</option>
                </select>
              </div>
              <EditField 
                label="Categoria do Sistema" 
                value={formData.category} 
                onChange={(v:any) => setFormData({...formData, category: v})} 
              />
            </div>
          </section>

          {/* CARD: COMERCIAL E APLICAÇÃO */}
          <section className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <Globe className="text-yellow-500" size={20} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">Market & Compatibility</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Preço Sugerido (Venda)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500/50 font-bold text-sm font-mono">R$</span>
                  <input 
                    type="text" 
                    value={formData.price}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-5 text-sm font-mono text-white focus:border-yellow-500/50 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <EditField 
                label="Compatibilidade Técnica" 
                value={formData.compatibility} 
                onChange={(v:any) => setFormData({...formData, compatibility: v})} 
              />
            </div>
          </section>
        </div>

        {/* COLUNA DE METADADOS (4 Colunas) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* STATUS DO REGISTRO */}
          <div className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Audit Log</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <History size={14} className="text-gray-700" />
                      <span className="text-[10px] font-bold text-gray-600 uppercase">Última Edição</span>
                   </div>
                   <span className="text-[10px] font-mono text-white">{formData.lastUpdate}</span>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Zap size={14} className="text-green-500" />
                      <span className="text-[10px] font-bold text-gray-600 uppercase">Status Global</span>
                   </div>
                   <span className="text-[9px] font-black px-2 py-0.5 bg-green-500/10 text-green-500 rounded uppercase">Sincronizado</span>
                </div>
             </div>
          </div>

          {/* BOX DE SEGURANÇA */}
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[2.5rem] p-8">
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-yellow-500" size={20} />
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Aviso Crítico</h4>
             </div>
             <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
               Alterar o **SKU** ou o **Fabricante** afetará todos os registros históricos de estoque e vendas vinculados a este identificador. Proceda com cautela.
             </p>
          </div>

          {/* BOTÃO DE APOIO (DUPLICAR) */}
          <button className="w-full py-5 rounded-[2rem] border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-3">
             <RefreshCcw size={16} /> Duplicar para Novo SKU
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE DE CAMPO DE EDIÇÃO ---
function EditField({ label, value, onChange, fontMono = false }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1 group-focus-within:text-yellow-500 transition-colors">
        {label}
      </label>
      <input 
        type="text" 
        defaultValue={value}
        className={`w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-sm text-white focus:border-yellow-500/50 focus:outline-none transition-all ${fontMono ? 'font-mono' : 'font-bold uppercase italic tracking-tight'}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}