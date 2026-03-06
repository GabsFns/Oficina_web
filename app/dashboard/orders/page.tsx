'use client'
import { Plus, ClipboardList, Search, Clock, CheckCircle2, AlertCircle, Wrench, MoreHorizontal } from "lucide-react";
import useSWR from 'swr'
import ModalTabs from "../_components/modal-tabs";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default async function OrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };    
    
  const { data: orders, isLoading, error } = useSWR('/api/orders', fetcher, { refreshInterval: 10000 });

  if (isLoading) return <div>Carregando ordens...</div>
  if (error) return <div>Erro ao carregar ordens</div>
  // Função para definir a cor do badge com base no staatus
const statusStyles: Record<string, string> = {
  ABERTA: "bg-gray-500/10 text-gray-400 border-gray-500/20",

  AGUARDANDO_DIAGNOSTICO: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  EM_DIAGNOSTICO: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  DIAGNOSTICO_CONCLUIDO: "bg-green-500/10 text-green-400 border-green-500/20",

  AGUARDANDO_COTACAO: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  EM_COTACAO: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  COTACAO_CONCLUIDA: "bg-green-500/10 text-green-400 border-green-500/20",

  AGUARDANDO_APROVACAO: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  APROVADO: "bg-green-500/10 text-green-400 border-green-500/20",
  REJEITADO: "bg-red-500/10 text-red-400 border-red-500/20",

  AGUARDANDO_PECAS: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  EM_EXECUCAO: "bg-blue-500/10 text-blue-400 border-blue-500/20",

  FINALIZADA: "bg-green-600/10 text-green-500 border-green-600/20",
  ENTREGUE: "bg-emerald-600/10 text-emerald-500 border-emerald-600/20",

  CANCELADA: "bg-red-600/10 text-red-500 border-red-600/20",
};

const getStatusStyle = (status: string) => {
  return statusStyles[status] ?? "bg-gray-500/10 text-gray-400 border-gray-500/20";
};

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Workflow</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            Ordens de <span className="text-white/20">Serviço</span>
          </h1>
        </div>

        {/* <Link
          href="/dashboard/orders/new"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Abrir Nova O.S.
        </Link> */}
      </div>

      {/* ÁREA DA TABELA */}
      <div className="bg-[#121214] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        
        {/* FILTROS RÁPIDOS */}
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-lg border border-white/5 w-full md:w-96">
            <Search size={18} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar por O.S., Placa ou Cliente..." 
              className="bg-transparent border-none outline-none text-sm text-gray-400 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <span className="text-[10px] font-bold uppercase p-2 text-gray-500">Filtrar por:</span>
            <button className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-bold uppercase hover:bg-yellow-500 hover:text-black transition-colors">Todos</button>
            <button className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-bold uppercase hover:bg-blue-500 transition-colors">Em Aberto</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Nº O.S. / Data</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Veículo & Cliente</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Serviço Principal</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Status</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  
                  {/* NÚMERO E DATA */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="text-yellow-500/50 group-hover:text-yellow-500 transition-colors">
                        <ClipboardList size={20} />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-bold text-gray-200">#{order.id.toString().padStart(4, '0')}</p>
                        <p className="text-[10px] text-gray-600 uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* VEÍCULO E CLIENTE */}
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-sm font-black text-yellow-500 italic uppercase leading-none mb-1">
                        {order.truck?.plate}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium truncate max-w-[150px]">
                        {order.client?.name}
                      </p>
                    </div>
                  </td>

                  {/* DESCRIÇÃO DO SERVIÇO */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Wrench size={14} className="text-gray-600" />
                      <span className="truncate max-w-[200px]">{order.problem_desc_client || "Manutenção Geral"}</span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                  {/* AÇÕES */}
                  <td className="px-8 py-6 text-right">
                    <button  onClick={() => openModal(order)}className="text-gray-600 hover:text-white transition-all p-2 hover:bg-white/5 rounded-lg">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>    
          </table>
        </div>
        
{selectedOrder && (
  <ModalTabs
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title={`Ordem #${selectedOrder.id ?? '---'}`}
    tabs={[
      {
        label: 'Orçamento',
        content: (
          <div className="space-y-6">
            <div className="bg-black/40 border border-white/5 p-6 rounded-3xl">
              <p className="text-[10px] uppercase text-gray-500 font-bold mb-2">
                Valor Total Estimado
              </p>
              <p className="text-4xl font-black text-yellow-500 font-mono italic">
                {selectedOrder.budget != null ? `R$ ${selectedOrder.budget}` : 'Pendente'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <p className="text-[10px] uppercase text-gray-500 font-bold mb-2 ml-1">
                Itens de Reposição
              </p>
              {selectedOrder.budget_items?.length ? (
                selectedOrder.budget_items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 text-sm uppercase font-medium"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 italic">Nenhum item listado.</p>
              )}
            </div>
          </div>
        ),
      },
      {
        label: 'Diagnóstico',
        content: (
          <div className="space-y-4">
            <div className="p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-3xl">
              <h4 className="text-yellow-500 text-xs font-black uppercase mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
                Parecer Técnico
              </h4>
              <p className="text-gray-300 leading-relaxed italic uppercase font-medium text-sm">
                "{selectedOrder.diagnosis || 'Aguardando avaliação do mecânico.'}"
              </p>
            </div>
            <div className="p-4 border border-white/5 rounded-2xl flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Resultado Final</span>
              <span className="text-xs font-black uppercase text-white tracking-widest">
                {selectedOrder.result || 'Pendente'}
              </span>
            </div>
          </div>
        ),
      },
      {
        label: 'Dados da Máquina',
        content: (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-500 font-black italic">
                ALM
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase italic tracking-tighter">
                  Proprietário
                </p>
                <p className="font-bold text-white uppercase">
                  {selectedOrder.client?.name ?? '---'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Placa</p>
                <p className="font-mono font-black text-yellow-500 text-lg uppercase">
                  {selectedOrder.truck?.plate ?? '---'}
                </p>
              </div>
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Modelo</p>
                <p className="font-bold text-white text-sm uppercase truncate">
                  {selectedOrder.truck?.model ?? '---'}
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ]}
  />
)}

        {/* FOOTER */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
          <span>Legenda: O.S. = Ordem de Serviço</span>
          <div className="flex gap-4">
             <span className="flex items-center gap-1"><Clock size={12}/> Pendente</span>
             <span className="flex items-center gap-1 text-green-500/70"><CheckCircle2 size={12}/> Finalizada</span>
          </div>
        </div>
      </div>
    </div>
  );
}