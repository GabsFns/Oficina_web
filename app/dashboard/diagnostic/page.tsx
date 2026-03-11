"use client";

import { ClipboardCheck, Search, Clock, User, Activity, FileText, Camera } from "lucide-react";
import { useState } from "react";

// Exemplo de dados baseados no seu modelo Prisma
const diagnosticsMock = [
  {
    id: "1",
    problem_desc_fun: "Desgaste excessivo nas unidades injetoras com presença de limalha no sistema de alta pressão. Necessário revisão completa da bomba de alta.",
    category: "MOTOR",
    prazo_estimado: "2026-03-15T10:00:00",
    createdAt: "2026-03-10T08:30:00",
    ordemService: { id: "OS-4482", truck: { plate: "ABC-1234", model: "Scania R450" } },
    user: { name: "Marcos Silva (Mecânico)" },
    fotos: [1, 2, 3]
  },
  // ... mais itens
];

export default function DiagnosticsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* HEADER ULTRA PREMIUM */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Central de Inteligência</p>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Diagnósticos <span className="text-gray-500">Técnicos</span>
          </h1>
        </div>

        {/* BARRA DE BUSCA ESTILIZADA */}
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="BUSCAR POR PLACA OU OS..."
            className="w-full bg-[#0d0d0e] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-700"
            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
          />
        </div>
      </header>

      {/* GRID DE DIAGNÓSTICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {diagnosticsMock.map((diag) => (
          <div 
            key={diag.id}
            className="group relative bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 hover:border-yellow-500/30 transition-all duration-500 overflow-hidden"
          >
            {/* Efeito Glow Interno */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-all" />

            <div className="relative z-10">
              {/* Top Card: Categoria e OS */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Status OS: {diag.ordemService.id}</span>
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase italic">
                      {diag.category}
                    </span>
                    <span className="text-white font-mono font-bold text-lg tracking-tighter">
                      {diag.ordemService.truck.plate}
                    </span>
                  </div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-gray-400">
                   <Activity size={20} className="group-hover:text-yellow-500 transition-colors" />
                </div>
              </div>

              {/* Descrição Técnica: O "Coração" do Diagnóstico */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-6">
                 <div className="flex items-center gap-2 mb-3">
                   <FileText size={14} className="text-yellow-500" />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">Relatório do Especialista</h4>
                 </div>
                 <p className="text-sm text-gray-300 leading-relaxed italic font-medium">
                   "{diag.problem_desc_fun}"
                 </p>
              </div>

              {/* Info Adicional: Prazo e Mecânico */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                   <Clock className="text-yellow-500" size={16} />
                   <div>
                     <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Prazo Estimado</p>
                     <p className="text-[11px] font-bold text-white uppercase">{new Date(diag.prazo_estimado).toLocaleDateString()}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                   <User className="text-yellow-500" size={16} />
                   <div>
                     <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Responsável</p>
                     <p className="text-[11px] font-bold text-white uppercase truncate">{diag.user.name}</p>
                   </div>
                </div>
              </div>

              {/* Footer do Card: Ações e Fotos */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0d0e] bg-gray-800 flex items-center justify-center">
                         <Camera size={12} className="text-gray-500" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    +{diag.fotos.length} Registros Visuais
                  </span>
                </div>
                
                <button className="text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:text-white transition-colors border-b border-yellow-500/20 hover:border-white pb-1">
                  Abrir Dossiê Completo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER DA PÁGINA */}
      <footer className="mt-20 flex justify-center border-t border-white/5 pt-10">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.6em]">
          Terminal Voldorico ALM Diesel • Monitoramento em Tempo Real
        </p>
      </footer>
    </div>
  );
}