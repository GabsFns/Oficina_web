"use client";

import { useState } from "react";
import { Search, Clock, User, Activity, FileText, Camera, Box, PenTool } from "lucide-react";
import ModalTabs from "../_components/modal-tabs"; // Ajuste o caminho conforme seu projeto

// Mock de dados (No futuro, virá do seu banco via API)
const diagnosticsMock = [
  {
    id: "1",
    problem_desc_fun: "Identificada falha de compressão no 3º cilindro. Carbonização excessiva nas válvulas de admissão. Recomenda-se retífica imediata para evitar travamento do motor.",
    category: "MOTOR",
    prazo_estimado: "2026-03-20T18:00:00",
    createdAt: "2026-03-11T09:00:00",
    ordemServiceId: "OS-9921",
    ordemService: { 
      id: "OS-9921", 
      num_os: "9921",
      budget: "4.500,00",
      truck: { plate: "VLD-2026", model: "Volvo FH 540" },
      client: { name: "Transportadora Silva", phone: "(11) 99999-9999" }
    },
    user: { name: "Ricardo Técnico" },
    fotos: [1, 2]
  }
];

export default function DiagnosticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiag, setSelectedDiag] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o dossiê
  const handleOpenDossie = (diag: any) => {
    setSelectedDiag(diag);
    setIsModalOpen(true);
  };

  // Definição das Abas do Dossiê
  const dossieTabs = selectedDiag ? [
    {
      label: "Diagnóstico",
      icon: <Activity size={16} />,
      content: (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h4 className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-4">Relatório do Especialista</h4>
            <p className="text-gray-300 italic leading-relaxed text-sm">"{selectedDiag.problem_desc_fun}"</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-[9px] text-gray-500 uppercase font-black">Data do Registro</span>
              <p className="text-xs text-white font-bold">{new Date(selectedDiag.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
              <span className="text-[9px] text-gray-500 uppercase font-black">Categoria Técnica</span>
              <p className="text-xs text-white font-bold">{selectedDiag.category}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      label: "Veículo & OS",
      icon: <Box size={16} />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 font-black italic">
              VLD
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Placa Identificada</p>
              <p className="text-lg text-white font-black italic uppercase tracking-tighter">{selectedDiag.ordemService.truck.plate}</p>
            </div>
          </div>
          <div className="p-6 bg-black/20 border border-white/5 rounded-2xl">
            <h4 className="text-[10px] text-gray-500 font-black uppercase mb-3">Detalhes da Ordem</h4>
            <p className="text-sm text-gray-300">Modelo: <span className="text-white font-bold">{selectedDiag.ordemService.truck.model}</span></p>
            <p className="text-sm text-gray-300">Protocolo OS: <span className="text-white font-mono">#{selectedDiag.ordemService.id}</span></p>
          </div>
        </div>
      )
    }
  ] : [];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
        <div>
          <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Central de Análise</p>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Diagnósticos <span className="text-gray-500">Ativos</span></h1>
        </div>
        <input
          type="text"
          placeholder="FILTRAR POR PLACA..."
          className="bg-[#0d0d0e] border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-yellow-500/50 w-full md:w-80"
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />
      </header>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {diagnosticsMock.map((diag) => (
          <div 
            key={diag.id}
            className="group relative bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 hover:border-yellow-500/20 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-8">
               <Activity size={24} className="text-white/5 group-hover:text-yellow-500/20 transition-colors" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-yellow-500 text-black text-[9px] font-black px-3 py-1 rounded-full italic uppercase">
                  {diag.category}
                </span>
                <span className="text-gray-600 font-black text-[10px] tracking-widest uppercase">#{diag.ordemService.num_os}</span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-yellow-500 transition-colors">
                  {diag.ordemService.truck.plate}
                </h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{diag.ordemService.truck.model}</p>
              </div>

              <div className="bg-black/40 border border-white/5 p-5 rounded-2xl mb-8">
                <p className="text-sm text-gray-400 italic leading-relaxed line-clamp-2 italic">
                  "{diag.problem_desc_fun}"
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                    <User size={14} className="text-yellow-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{diag.user.name}</span>
                </div>
                
                <button 
                  onClick={() => handleOpenDossie(diag)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-yellow-500 transition-all group/btn"
                >
                  Abrir Dossiê 
                  <PenTool size={14} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE DOSSIÊ INTEGRADA */}
      {selectedDiag && (
        <ModalTabs 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Dossiê ${selectedDiag.ordemService.truck.plate}`}
          tabs={dossieTabs}
          order={selectedDiag.ordemService} // Passando a OS para o botão de imprimir
        />
      )}
    </div>
  );
}