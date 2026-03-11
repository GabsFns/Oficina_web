"use client";

import { useState, useMemo } from "react";
import { 
  PackageSearch, 
  ArrowRight, 
  Factory, 
  Clock,
  Box,
  X,
  Layers,
  ExternalLink,
  Search,
  Hash,
  AlertCircle,
  Truck,
  User,
  ChevronRight,
  FileText,
  BadgeDollarSign
} from "lucide-react";

// --- ESTRUTURA DE DADOS AGRUPADA (Baseada no seu modelo Prisma) ---
const groupedBudgetsMock = [
  {
    id: "ORC-2026-001",
    num_os: "9921",
    status_geral: "PENDENTE",
    data_criacao: "2026-03-11T10:00:00",
    cliente: { name: "Transportadora Silva", phone: "(11) 99999-9999" },
    truck: { plate: "VLD-2026", model: "Volvo FH 540" },
    items: [
      {
        codigo_peca: "0501.212.871",
        peca: "Kit de Reparo Sincronizador 3ª/4ª",
        marca_modelo: "ZF TraXon",
        valor_unitario: 1250.00,
        quantidade: 1,
        fornecedor: "ZF do Brasil",
        prazo_entrega: "2026-03-15T14:00:00",
        status: "APROVADO",
      },
      {
        codigo_peca: "0734.319.612",
        peca: "Retentor de Saída",
        marca_modelo: "ZF Original",
        valor_unitario: 345.50,
        quantidade: 2,
        fornecedor: "Distribuidora Diesel",
        prazo_entrega: "2026-03-12T10:00:00",
        status: "EM_TRANSITO",
      }
    ]
  },
  {
    id: "ORC-2026-002",
    num_os: "9930",
    status_geral: "AGUARDANDO_FORNECEDOR",
    data_criacao: "2026-03-11T14:00:00",
    cliente: { name: "Expresso Logística", phone: "(21) 88888-8888" },
    truck: { plate: "ALM-0022", model: "VW Meteor 29.520" },
    items: [
      {
        codigo_peca: "1297.333.102",
        peca: "Garfo de Desengate",
        marca_modelo: "Eaton Fuller",
        valor_unitario: 890.00,
        quantidade: 1,
        fornecedor: "Pecagon Peças",
        prazo_entrega: "2026-03-14T09:00:00",
        status: "AGUARDANDO_FORNECEDOR",
      }
    ]
  }
];
// --- COMPONENTE: SIDEBAR DE DETALHES ---
function BudgetSidebar({ budget, onClose }: { budget: any, onClose: () => void }) {
  if (!budget) return null;

  const total = budget.items.reduce((acc: number, item: any) => acc + (item.valor_unitario * item.quantidade), 0);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#0a0a0b] border-l border-white/10 z-50 shadow-[20px_0_60px_rgba(0,0,0,1)] flex flex-col animate-in slide-in-from-right duration-500">
      {/* HEADER SIDEBAR */}
      <div className="p-8 border-b border-white/5 bg-black/40 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <span className="text-yellow-500 font-black text-[10px] tracking-widest uppercase italic">Detalhamento Técnico</span>
             <span className="text-gray-600 text-[10px] font-bold">ID: {budget.id}</span>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter italic">OS #{budget.num_os}</h2>
        </div>
        <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
        {/* SEÇÃO: CLIENTE E VEÍCULO */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-gray-500">
                <User size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Dossiê do Cliente</span>
             </div>
             <div>
                <p className="text-lg font-black text-white uppercase">{budget.cliente.name}</p>
                <div className="flex flex-col text-[10px] text-gray-600 font-bold mt-1">
                   <span>{budget.cliente.phone}</span>
                   <span>{budget.cliente.email}</span>
                </div>
             </div>
          </div>
          <div className="space-y-4 border-l border-white/5 pl-8">
             <div className="flex items-center gap-2 text-gray-500">
                <Truck size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Informação Técnica</span>
             </div>
             <div>
                <p className="text-lg font-black text-yellow-500 uppercase">{budget.truck.plate}</p>
                <p className="text-[10px] text-gray-500 font-black uppercase">{budget.truck.model} ({budget.truck.ano})</p>
                <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded text-gray-400 mt-2 inline-block italic font-bold">MOTOR: {budget.truck.motor}</span>
             </div>
          </div>
        </div>

        {/* LISTA DE PEÇAS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
               <Box size={14} className="text-yellow-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-white">Componentes em Orçamento</span>
            </div>
            <span className="text-[10px] text-gray-600 font-bold">{budget.items.length} Itens</span>
          </div>

          <div className="space-y-4">
            {budget.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col">
                    <span className="text-yellow-500 font-mono text-[11px] font-bold">{item.codigo_peca}</span>
                    <span className="text-sm font-black text-white uppercase tracking-tight mt-1">{item.peca}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-600 font-black uppercase">QTD: {item.quantidade}</span>
                    <p className="text-sm font-mono font-black text-white italic">R$ {(item.valor_unitario * item.quantidade).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex items-center gap-3">
                      <Factory size={12} className="text-gray-700" />
                      <span className="text-[9px] font-bold text-gray-500 uppercase">{item.fornecedor}</span>
                   </div>
                   <div className={`text-[8px] font-black uppercase tracking-[0.2em] ${item.status === 'APROVADO' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {item.status}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* FOOTER SIDEBAR (AÇÕES) */}
      <div className="p-8 bg-black/60 border-t border-white/10 space-y-4">
         <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Total Líquido</span>
            <span className="text-4xl font-mono font-black italic text-yellow-500 tracking-tighter">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <button className="py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Imprimir Laudo</button>
            <button className="py-4 rounded-2xl bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_10px_30px_rgba(234,179,8,0.2)]">Aprovar Completo</button>
         </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE: BADGE DE STATUS ---
function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    APROVADO: { color: "text-green-500", bg: "bg-green-500/10", label: "Aprovado", border: "border-green-500/20" },
    EM_TRANSITO: { color: "text-blue-500", bg: "bg-blue-500/10", label: "Em Trânsito", border: "border-blue-500/20" },
    PENDENTE: { color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Pendente", border: "border-yellow-500/20" },
    AGUARDANDO_FORNECEDOR: { color: "text-purple-500", bg: "bg-purple-500/10", label: "Aguardando", border: "border-purple-500/20" },
  };
  const config = configs[status] || configs.PENDENTE;
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.border} ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text', 'bg')} animate-pulse`} />
      <span className={`text-[9px] font-black uppercase tracking-widest ${config.color}`}>{config.label}</span>
    </div>
  );
}

export default function BudgetManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
const [selectedBudget, setSelectedBudget] = useState<any>(null);
  // Filtro por Placa ou Número da OS
  const filteredOrçamentos = useMemo(() => {
    return groupedBudgetsMock.filter(orc => 
      orc.num_os.includes(searchTerm) || 
      orc.truck.plate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* HEADER PREMIUM */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PackageSearch className="text-yellow-500" size={16} />
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Central de Suprimentos</p>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Dossiês <span className="text-gray-500">de Orçamento</span>
          </h1>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="BUSCAR POR PLACA OU OS..."
            className="w-full bg-[#0d0d0e] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-yellow-500/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* LISTAGEM DE ORÇAMENTOS (VISÃO AGRUPADA) */}
      <div className="space-y-6">
        {filteredOrçamentos.length > 0 ? filteredOrçamentos.map((orc) => {
          const totalOrcamento = orc.items.reduce((acc, item) => acc + (item.valor_unitario * item.quantidade), 0);
          
          return (
            <div key={orc.id} className="group bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 hover:border-yellow-500/20 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* IDENTIFICAÇÃO DO VEÍCULO & OS */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded italic uppercase">OS #{orc.num_os}</span>
                    <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest">{orc.id}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                      <Truck size={20} className="text-gray-600" /> {orc.truck.plate}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{orc.truck.model}</p>
                  </div>
                </div>

                {/* DADOS DO CLIENTE */}
                <div className="lg:col-span-3 border-l border-white/5 pl-8">
                  <div className="flex items-center gap-3 mb-1">
                    <User size={14} className="text-yellow-500/50" />
                    <span className="text-[10px] font-black uppercase text-gray-400">Requerente</span>
                  </div>
                  <p className="text-sm font-bold text-white uppercase">{orc.cliente.name}</p>
                  <p className="text-[10px] text-gray-600 font-mono tracking-tighter">{orc.cliente.phone}</p>
                </div>

                {/* RESUMO TÉCNICO */}
                <div className="lg:col-span-2 border-l border-white/5 pl-8 text-center lg:text-left">
                  <div className="flex items-center gap-3 mb-1 justify-center lg:justify-start">
                    <FileText size={14} className="text-gray-600" />
                    <span className="text-[10px] font-black uppercase text-gray-500">Volume</span>
                  </div>
                  <p className="text-sm font-black text-white">{orc.items.length} ITENS</p>
                  <StatusBadge status={orc.status_geral} />
                </div>

                {/* FINANCEIRO & AÇÃO */}
                <div className="lg:col-span-4 flex items-center justify-between bg-black/40 rounded-3xl p-6 border border-white/5">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.2em] flex items-center gap-1">
                       <BadgeDollarSign size={10} /> Total Estimado
                    </span>
                    <p className="text-2xl font-mono font-black italic text-yellow-500 tracking-tighter">
                      R$ {totalOrcamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
 <button 
                    onClick={() => setSelectedBudget(orc)}
                    className="p-5 rounded-[2rem] bg-white/5 hover:bg-yellow-500 hover:text-black transition-all group/btn"
                  >
                    <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          );
        }) : (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <AlertCircle size={40} className="mx-auto text-gray-800 mb-4" />
            <p className="text-gray-600 font-black uppercase tracking-widest text-[10px]">Nenhum dossiê encontrado para os critérios de busca.</p>
          </div>
        )}
      </div>

      <BudgetSidebar 
        budget={selectedBudget} 
        onClose={() => setSelectedBudget(null)} 
      />


      {/* FOOTER: APOIO AO CATALOGO */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <CatalogCard 
          title="ZF Aftermarket" 
          subtitle="Peças Genuínas ZF/Sachs" 
          url="https://aftermarket.zf.com"
          brand="ZF"
        />
        <CatalogCard 
          title="Eaton Roadranger" 
          subtitle="Suporte Transmissão Eaton" 
          url="https://roadranger.eaton.com"
          brand="EATON"
        />
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-[2.5rem] p-10 flex flex-col justify-between group cursor-pointer hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] active:scale-95 transition-all">
          <Layers className="text-black/20 group-hover:text-black/40 transition-colors" size={48} />
          <div>
            <h4 className="text-black font-black uppercase italic tracking-tighter text-2xl leading-none mb-1">Novo Item</h4>
            <p className="text-black/60 text-[10px] font-bold uppercase tracking-[0.2em]">Adicionar à OS Atual</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTE: CARD DE CATALOGO ---
function CatalogCard({ title, subtitle, url, brand }: { title: string, subtitle: string, url: string, brand: string }) {
  return (
    <a href={url} target="_blank" className="bg-[#0d0d0e] border border-white/5 p-10 rounded-[2.5rem] hover:border-white/20 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 text-[40px] font-black italic text-white/[0.02] pointer-events-none group-hover:text-yellow-500/[0.03] transition-colors uppercase">
        {brand}
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-12">
           <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-600 group-hover:text-yellow-500 transition-colors">
              <ExternalLink size={20} />
           </div>
           <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.3em]">Consulta de Catálogo</span>
        </div>
        <div>
          <h4 className="text-white font-black uppercase italic tracking-tighter text-2xl group-hover:text-yellow-500 transition-colors">{title}</h4>
          <p className="text-gray-500 text-[10px] font-bold uppercase mt-1 tracking-widest leading-none">{subtitle}</p>
        </div>
      </div>
    </a>
  );
}