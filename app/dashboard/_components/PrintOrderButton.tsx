"use client";

import { FileText, Printer, Loader2 } from "lucide-react";
import { useState } from "react";

interface PrintOrderButtonProps {
  order: any;
}
const PrintTemplate = ({ order }: { order: any }) => (
  <div id="print-area" className="hidden print:block p-12 bg-white text-black min-h-screen font-sans">
    {/* CABEÇALHO */}
    <div className="flex justify-between items-start border-b-4 border-black pb-6 mb-8">
      <div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
          Voldorico <span className="text-gray-400 font-light">ALM</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1 text-gray-600">
          Engenharia de Sistemas Diesel & Pesados
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold uppercase tracking-widest">Ordem de Serviço</p>
        <p className="text-2xl font-mono font-black italic">#{order.num_os || "N/A"}</p>
        <p className="text-[10px] text-gray-500 font-bold uppercase">Entrada: {new Date(order.date_input).toLocaleDateString()}</p>
      </div>
    </div>

    {/* INFO CLIENTE E VEÍCULO */}
    <div className="grid grid-cols-2 gap-8 mb-10">
      <div className="border-l-2 border-black pl-4">
        <h3 className="text-[9px] uppercase font-black text-gray-400 mb-2 tracking-widest">Proprietário</h3>
        <p className="font-bold uppercase text-lg">{order.client?.name}</p>
        <p className="text-sm">{order.client?.phone}</p>
      </div>
      <div className="border-l-2 border-black pl-4">
        <h3 className="text-[9px] uppercase font-black text-gray-400 mb-2 tracking-widest">Veículo</h3>
        <p className="font-black text-xl italic uppercase tracking-tighter">{order.truck?.plate}</p>
        <p className="text-sm font-bold uppercase">{order.truck?.model}</p>
      </div>
    </div>

    {/* RELATO TÉCNICO */}
    <div className="mb-10">
      <div className="bg-gray-100 p-2 mb-4 border-l-4 border-black">
        <h3 className="text-[10px] uppercase font-black tracking-[0.2em]">Diagnóstico de Entrada</h3>
      </div>
      <div className="px-4 py-2 min-h-[120px]">
        <p className="text-sm leading-relaxed italic uppercase font-medium">
          {order.problem_desc_client || "Sem descrição informada."}
        </p>
      </div>
    </div>

    {/* TABELA DE VALORES */}
    <div className="mb-12">
      <div className="bg-gray-100 p-2 mb-2">
        <h3 className="text-[10px] uppercase font-black tracking-[0.2em]">Estimativa de Custos</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-2 text-[10px] uppercase font-bold">Item / Serviço</th>
            <th className="py-2 text-[10px] uppercase font-bold text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {order.orcamentos?.[0]?.items?.map((item: any, i: number) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-3 uppercase font-medium">{item.description}</td>
              <td className="py-3 text-right font-mono">R$ {item.price}</td>
            </tr>
          )) || (
            <tr className="border-b border-gray-100">
              <td className="py-3 uppercase text-gray-400 italic">Aguardando Aprovação de Peças</td>
              <td className="py-3 text-right font-mono">---</td>
            </tr>
          )}
          <tr className="border-t-2 border-black">
            <td className="py-4 font-black uppercase tracking-widest text-lg">Total Geral</td>
            <td className="py-4 text-right font-black text-2xl italic font-mono">
               {order.budget ? `R$ ${order.budget}` : '---'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* RODAPÉ E ASSINATURA */}
    <div className="mt-20 grid grid-cols-2 gap-20">
      <div className="border-t border-black text-center pt-2">
        <p className="text-[8px] font-bold uppercase tracking-widest">Voldorico ALM Diesel</p>
      </div>
      <div className="border-t border-black text-center pt-2">
        <p className="text-[8px] font-bold uppercase tracking-widest">Assinatura do Cliente</p>
      </div>
    </div>
  </div>
);
export default function PrintOrderButton({ order }: PrintOrderButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handlePrint}
        disabled={isGenerating}
        className="group relative flex items-center gap-3 bg-white/[0.03] border border-white/10 hover:border-yellow-500/50 px-6 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-yellow-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        
        {isGenerating ? (
          <Loader2 className="text-yellow-500 animate-spin" size={18} />
        ) : (
          <Printer className="text-yellow-500 group-hover:rotate-12 transition-transform" size={18} />
        )}

        <div className="flex flex-col items-start relative z-10 text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {isGenerating ? "Processando..." : "Gerar Relatório"}
          </span>
          <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">
            Documento A4 Oficial
          </span>
        </div>
        <FileText size={14} className="ml-2 text-gray-700 group-hover:text-yellow-500/50 transition-colors" />
      </button>

      {/* RENDERIZA O TEMPLATE AQUI (ELE ESTÁ COM "hidden print:block") */}
      <PrintTemplate order={order} />
    </>
  );
}