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
    },
    {
    label: "Galeria Técnica",
    icon: <Camera size={16} />,
    content: (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-yellow-500 rounded-full" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Evidências Visuais</h4>
          </div>
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            {selectedDiag.fotos?.length || 0} Arquivos capturados
          </span>
        </div>

        {/* Grid de Fotos Estilizado */}
        <div className="grid grid-cols-2 gap-4">
          {selectedDiag.fotos?.length > 0 ? (
            selectedDiag.fotos.map((foto: any, index: number) => (
              <div 
                key={index} 
                className="group relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black"
              >
                {/* Overlay de Scanline (Efeito Estético) */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />
                
                {/* Imagem (Substituir o div abaixo pela tag <img /> quando tiver as URLs reais) */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform duration-700 ease-in-out">
                   <Camera className="text-white/10" size={32} />
                   {/* <img src={foto.url} className="w-full h-full object-cover" /> */}
                </div>

                {/* Badge de Identificação na Imagem */}
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="bg-black/80 backdrop-blur-md text-[8px] text-yellow-500 font-black px-2 py-1 rounded-md border border-yellow-500/20 uppercase tracking-tighter">
                    REG_INT_{index + 1}
                  </span>
                </div>

                {/* Efeito de Glow no Hover */}
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/5 transition-colors duration-300" />
              </div>
            ))
          ) : (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem]">
               <Camera size={40} className="text-gray-800 mb-4" />
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 italic">
                 Nenhuma evidência fotográfica anexada
               </p>
            </div>
          )}
        </div>

        {/* Nota Técnica */}
        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
          <p className="text-[9px] text-yellow-500/70 font-bold uppercase leading-relaxed tracking-wide">
            <span className="text-yellow-500 font-black mr-2">AVISO:</span> 
            As imagens acima são de uso exclusivo para perícia técnica e aprovação de orçamento.
          </p>
        </div>
      </div>
    )
  }
] : [];

  return (
    <div className="min-h-screen text-white p-8">
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