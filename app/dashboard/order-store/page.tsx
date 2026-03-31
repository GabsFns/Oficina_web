"use client";

import { useState } from "react";
import { 
  ShoppingBag, 
  Truck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  User, 
  MoreVertical, 
  ExternalLink, 
  Filter, 
  Search,
  ArrowUpRight,
  PackageCheck,
  CreditCard,
  ChevronRight
} from "lucide-react";

// --- MOCK DE PEDIDOS ---
const ordersMock = [
  {
    id: "ORD-2026-8812",
    client: "Transportadora Global LTDA",
    date: "31 Mar 2026",
    total: 52450.00,
    status: "PROCESSANDO",
    items: 4,
    address: "Av. Brasil, 1500 - Rio de Janeiro, RJ",
    shippingMethod: "Transportadora Própria",
    payment: "Boleto Faturado (15 dias)"
  },
  {
    id: "ORD-2026-8815",
    client: "Marcos Oliveira (Particular)",
    date: "31 Mar 2026",
    total: 3850.00,
    status: "ENVIADO",
    items: 1,
    address: "Rua das Flores, 45 - Nova Iguaçu, RJ",
    shippingMethod: "Sedex 10",
    payment: "Cartão de Crédito"
  },
  {
    id: "ORD-2026-8801",
    client: "Logística Express S.A",
    date: "30 Mar 2026",
    total: 12100.00,
    status: "ENTREGUE",
    items: 2,
    address: "Rod. Pres. Dutra, Km 12 - São Paulo, SP",
    shippingMethod: "Retirada no Local",
    payment: "Pix"
  }
];

export default function OrderStorePage() {
  const [filter, setFilter] = useState("TODOS");

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      
      {/* HEADER DE OPERAÇÕES */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingBag className="text-yellow-500" size={16} />
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Sales & Fulfillment Center</p>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Gestão de <span className="text-gray-500 italic font-light">Vendas</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="BUSCAR PEDIDO OU CLIENTE..."
              className="bg-[#0d0d0e] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-[9px] font-black tracking-widest uppercase focus:outline-none focus:border-yellow-500/50 transition-all w-64"
            />
          </div>
          
          <div className="flex bg-[#0d0d0e] border border-white/10 rounded-2xl p-1 gap-1">
             {["TODOS", "PROCESSANDO", "ENVIADO"].map(st => (
               <button 
                 key={st}
                 onClick={() => setFilter(st)}
                 className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${filter === st ? "bg-yellow-500 text-black" : "text-gray-500 hover:text-white"}`}
               >
                 {st}
               </button>
             ))}
          </div>
        </div>
      </header>

      {/* GRID DE PEDIDOS */}
      <div className="space-y-6">
        {ordersMock.map((order) => (
          <div key={order.id} className="group bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-all relative overflow-hidden">
            
            {/* Lado Esquerdo: Info Principal */}
            <div className="flex flex-col xl:flex-row gap-10 items-start xl:items-center">
              
              {/* STATUS ICON */}
              <div className="relative">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-2xl ${
                  order.status === "PROCESSANDO" ? "bg-yellow-500/10 text-yellow-500 shadow-yellow-500/5" :
                  order.status === "ENVIADO" ? "bg-blue-500/10 text-blue-500 shadow-blue-500/5" :
                  "bg-green-500/10 text-green-500 shadow-green-500/5"
                }`}>
                  {order.status === "PROCESSANDO" ? <Clock size={28} /> : 
                   order.status === "ENVIADO" ? <Truck size={28} /> : <PackageCheck size={28} />}
                </div>
              </div>

              {/* DADOS DO CLIENTE E PEDIDO */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-gray-600">{order.id}</span>
                  <StatusTag status={order.status} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-yellow-500 transition-colors leading-none">
                  {order.client}
                </h3>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <MapPin size={12} className="text-gray-700" /> {order.address}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <User size={12} className="text-gray-700" /> {order.items} itens no pedido
                  </div>
                </div>
              </div>

              {/* DADOS FINANCEIROS */}
              <div className="w-full xl:w-64 bg-black/40 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Total da Venda</p>
                      <h4 className="text-xl font-mono font-black italic text-white leading-none">R$ {order.total.toLocaleString('pt-BR')}</h4>
                   </div>
                   <CreditCard size={20} className="text-gray-700" />
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">Método de Pagamento</p>
                   <p className="text-[10px] font-bold text-yellow-500/80 uppercase">{order.payment}</p>
                </div>
              </div>

              {/* AÇÕES DE ADMINISTRAÇÃO */}
              <div className="flex xl:flex-col gap-3 w-full xl:w-auto">
                 <button className="flex-1 xl:flex-none p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest group/btn">
                    Detalhes <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
                 <button className="flex-1 xl:flex-none p-4 rounded-2xl bg-yellow-500 text-black hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(234,179,8,0.2)]">
                    Despachar <Truck size={14} />
                 </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* FOOTER: RESUMO DE EXPEDIÇÃO */}
      <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <SummaryCard label="Aguardando Envio" value="08" icon={<Clock className="text-yellow-500" />} />
         <SummaryCard label="Em Trânsito" value="15" icon={<Truck className="text-blue-500" />} />
         <SummaryCard label="Total Faturado (Hoje)" value="R$ 18.500" icon={<DollarSignIcon />} />
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTES ---

function StatusTag({ status }: { status: string }) {
  const styles: any = {
    PROCESSANDO: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    ENVIADO: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ENTREGUE: "bg-green-500/10 text-green-500 border-green-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
}

function SummaryCard({ label, value, icon }: any) {
  return (
    <div className="bg-[#0d0d0e] border border-white/5 rounded-[2rem] p-8 flex items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
        <h4 className="text-2xl font-mono font-black italic text-white leading-none">{value}</h4>
      </div>
    </div>
  );
}

function DollarSignIcon() {
  return (
    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
      <CreditCard size={24} />
    </div>
  );
}