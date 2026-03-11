"use client";

import { useState, useMemo } from "react";
import { 
  PackageSearch, 
  ArrowRight, 
  Factory, 
  Clock,
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
                  
                  <button className="flex items-center gap-2 bg-white/5 hover:bg-yellow-500 hover:text-black px-6 py-4 rounded-2xl transition-all group/btn font-black text-[10px] uppercase tracking-widest">
                    Ver Detalhes 
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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