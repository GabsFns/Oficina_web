"use client";

import { useState, useMemo } from "react";
import { 
  PackageSearch, 
  ArrowRight, 
  Factory, 
  CheckCircle2, 
  Clock,
  Layers,
  ExternalLink,
  Search,
  Filter,
  Hash,
  AlertCircle,
  Truck
} from "lucide-react";

// --- MOCK DE DADOS EXPANDIDO ---
const budgetsMock = [
  {
    id: "ORC-772",
    num_os: "9921",
    codigo_peca: "0501.212.871",
    peca: "Kit de Reparo Sincronizador 3ª/4ª",
    marca_modelo: "ZF TraXon - Ecosplit",
    valor_unitario: 1250.00,
    quantidade: 1,
    valor_total: 1250.00,
    fornecedor: "ZF do Brasil",
    prazo_entrega: "2026-03-15T14:00:00",
    status: "APROVADO",
  },
  {
    id: "ORC-773",
    num_os: "9921",
    codigo_peca: "0734.319.612",
    peca: "Retentor de Saída do Eixo Principal",
    marca_modelo: "ZF Original",
    valor_unitario: 345.50,
    quantidade: 2,
    valor_total: 691.00,
    fornecedor: "Distribuidora Diesel",
    prazo_entrega: "2026-03-12T10:00:00",
    status: "EM_TRANSITO",
  },
  {
    id: "ORC-774",
    num_os: "9921",
    codigo_peca: "S671.090.255",
    peca: "Óleo ZF Ecofluid M 75W-80",
    marca_modelo: "ZF High Performance",
    valor_unitario: 185.00,
    quantidade: 12,
    valor_total: 2220.00,
    fornecedor: "ZF Store",
    prazo_entrega: "2026-03-11T16:00:00",
    status: "PENDENTE",
  },
  {
    id: "ORC-775",
    num_os: "9930",
    codigo_peca: "1297.333.102",
    peca: "Garfo de Desengate da Embreagem",
    marca_modelo: "Eaton Fuller",
    valor_unitario: 890.00,
    quantidade: 1,
    valor_total: 890.00,
    fornecedor: "Pecagon Peças",
    prazo_entrega: "2026-03-14T09:00:00",
    status: "AGUARDANDO_FORNECEDOR",
  },
  {
    id: "ORC-776",
    num_os: "9930",
    codigo_peca: "KIT-CLUTCH-15",
    peca: "Platô de Embreagem 430mm",
    marca_modelo: "Eaton Heavy Duty",
    valor_unitario: 3200.00,
    quantidade: 1,
    valor_total: 3200.00,
    fornecedor: "Eaton Suprimentos",
    prazo_entrega: "2026-03-18T11:00:00",
    status: "PENDENTE",
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
      <span className={`text-[9px] font-black uppercase tracking-widest ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function BudgetManagementPage() {
  const [osFilter, setOsFilter] = useState("");

  // Filtro lógico
  const filteredBudgets = useMemo(() => {
    return budgetsMock.filter(item => 
      item.num_os.toLowerCase().includes(osFilter.toLowerCase())
    );
  }, [osFilter]);

  // Cálculos de Totais
  const totals = useMemo(() => {
    const value = filteredBudgets.reduce((acc, curr) => acc + curr.valor_total, 0);
    const count = filteredBudgets.reduce((acc, curr) => acc + curr.quantidade, 0);
    return { value, count };
  }, [filteredBudgets]);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* HEADER DE OPERAÇÃO */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PackageSearch className="text-yellow-500" size={16} />
              <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Cadeia de Suprimentos</p>
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              Orçamentos <span className="text-gray-500">& Peças</span>
            </h1>
          </div>

          {/* FILTRO POR OS */}
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="FILTRAR POR Nº DA OS..."
              className="w-full bg-[#0d0d0e] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-700"
              value={osFilter}
              onChange={(e) => setOsFilter(e.target.value)}
            />
          </div>
        </div>

        {/* INDICADORES TÉCNICOS */}
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
           <div className="bg-[#0d0d0e] border border-white/10 px-8 py-5 rounded-[2.5rem] flex flex-col items-end justify-center min-w-[240px] flex-1 xl:flex-none">
              <span className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">Compilado de Cotação</span>
              <span className="text-3xl font-mono font-black italic text-yellow-500 tracking-tighter">
                R$ {totals.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[7px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
                Ref: {totals.count} Componentes Identificados
              </span>
          </div>
        </div>
      </header>

      {/* LISTAGEM TÉCNICA */}
      <div className="overflow-x-auto custom-scrollbar">
        {filteredBudgets.length > 0 ? (
          <table className="w-full border-separate border-spacing-y-4 min-w-[1000px]">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                <th className="px-8 text-left">Código de Referência</th>
                <th className="px-8 text-left">Componente & Aplicação</th>
                <th className="px-8 text-left">Suprimentos / Prazo</th>
                <th className="px-8 text-left">Análise de Custo</th>
                <th className="px-8 text-left">Status</th>
                <th className="px-8 text-right">Controle</th>
              </tr>
            </thead>
            <tbody>
              {filteredBudgets.map((item) => (
                <tr key={item.id} className="group bg-[#0d0d0e] border border-white/5 hover:bg-white/[0.02] transition-all duration-300">
                  {/* Código */}
                  <td className="px-8 py-7 rounded-l-[2rem] border-l border-t border-b border-white/5">
                    <div className="flex flex-col">
                      <span className="text-yellow-500 font-mono text-base font-bold tracking-tighter">{item.codigo_peca}</span>
                      <span className="text-[9px] text-gray-600 font-black mt-1 uppercase flex items-center gap-1">
                        <Hash size={10} className="text-gray-700" /> OS: {item.num_os}
                      </span>
                    </div>
                  </td>

                  {/* Peça */}
                  <td className="px-8 py-7 border-t border-b border-white/5">
                    <div className="flex flex-col max-w-[250px]">
                      <span className="text-sm font-black text-white uppercase tracking-tight leading-tight mb-1 group-hover:text-yellow-500 transition-colors">
                        {item.peca}
                      </span>
                      <span className="text-[10px] text-gray-500 font-bold italic tracking-wide">{item.marca_modelo}</span>
                    </div>
                  </td>

                  {/* Fornecedor */}
                  <td className="px-8 py-7 border-t border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:border-yellow-500/20 transition-all">
                        <Factory size={16} className="text-gray-600 group-hover:text-yellow-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-300 uppercase leading-none mb-1">{item.fornecedor}</span>
                        <div className="flex items-center gap-1.5">
                           <Clock size={10} className="text-gray-700" />
                           <span className="text-[9px] text-gray-600 font-black uppercase">{new Date(item.prazo_entrega).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Valores */}
                  <td className="px-8 py-7 border-t border-b border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-tighter mb-1">
                        {item.quantidade} UN x R$ {item.valor_unitario.toFixed(2)}
                      </span>
                      <span className="text-lg font-black text-white font-mono italic leading-none">
                        R$ {item.valor_total.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-8 py-7 border-t border-b border-white/5">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Ação */}
                  <td className="px-8 py-7 rounded-r-[2rem] border-r border-t border-b border-white/5 text-right">
                    <button className="w-12 h-12 inline-flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-yellow-500 hover:text-black transition-all hover:-rotate-12">
                      <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-[3rem] bg-[#0d0d0e]/50 text-center">
             <AlertCircle size={48} className="text-gray-800 mb-4" />
             <h3 className="text-lg font-black uppercase italic text-gray-600 tracking-tighter">Nenhum registro encontrado</h3>
             <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest mt-1">Verifique o número da OS ou limpe o filtro</p>
             <button onClick={() => setOsFilter("")} className="mt-6 text-[9px] font-black uppercase text-yellow-500 border-b border-yellow-500/20 pb-1 hover:text-white transition-colors">Limpar Filtros</button>
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