"use client";

import { FileText, Printer, Loader2 } from "lucide-react";
import { useState } from "react";

interface PrintOrderButtonProps {
  order: any;
}
const PrintTemplate = ({ order }: { order: any }) => (
  /* Removemos a classe 'hidden' do Tailwind e deixamos o controle para o ID e o CSS Media Print */
  <div 
    id="print-area" 
    className="print:block hidden p-10 bg-white text-black min-h-screen w-full"
    style={{ fontFamily: 'sans-serif' }}
  >
    {/* CABEÇALHO */}
    <div className="flex justify-between items-start border-b-[3px] border-black pb-6 mb-8">
      <div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-black">
          Voldorico <span className="text-gray-400 font-light">ALM</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-2 text-gray-500">
          Engenharia de Sistemas Diesel & Pesados
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold uppercase tracking-widest text-black">Ordem de Serviço</p>
        <p className="text-2xl font-mono font-black italic text-black">#{order.num_os || "N/A"}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase">Entrada: {order.date_input ? new Date(order.date_input).toLocaleDateString() : '---'}</p>
      </div>
    </div>

    {/* GRID INFO */}
    <div className="grid grid-cols-2 gap-10 mb-10">
      <div className="border-l-[1px] border-black/20 pl-4">
        <h3 className="text-[9px] uppercase font-black text-gray-400 mb-2 tracking-widest">Proprietário / Cliente</h3>
        <p className="font-bold uppercase text-lg text-black">{order.client?.name || 'Cliente não identificado'}</p>
        <p className="text-sm text-black">{order.client?.phone || ''}</p>
      </div>
      <div className="border-l-[1px] border-black/20 pl-4">
        <h3 className="text-[9px] uppercase font-black text-gray-400 mb-2 tracking-widest">Equipamento / Veículo</h3>
        <p className="font-black text-xl italic uppercase tracking-tighter text-black">{order.truck?.plate || 'S/ PLACA'}</p>
        <p className="text-sm font-bold uppercase text-black">{order.truck?.model || 'Modelo não informado'}</p>
      </div>
    </div>

    {/* DIAGNÓSTICO */}
    <div className="mb-10">
      <div className="bg-gray-100 p-3 mb-4 border-l-[6px] border-black">
        <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-black">Relatório Técnico e Sintomas</h3>
      </div>
      <div className="px-4 py-2 min-h-[150px] border border-gray-100 rounded-xl">
        <p className="text-sm leading-relaxed italic uppercase font-medium text-black">
          {order.problem_desc_client || "O cliente não forneceu descrição detalhada dos sintomas na abertura da O.S."}
        </p>
      </div>
    </div>

    {/* TABELA DE VALORES */}
    <div className="mb-12">
      <div className="bg-gray-100 p-2 mb-2">
        <h3 className="text-[10px] uppercase font-black tracking-[0.2em] text-black">Estimativa de Investimento</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-3 text-[10px] uppercase font-bold text-black">Especificação do Serviço / Peças</th>
            <th className="py-3 text-[10px] uppercase font-bold text-right text-black">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {/* Se houver orçamentos cadastrados */}
          {order.orcamentos?.[0]?.items?.map((item: any, i: number) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="py-3 uppercase text-sm font-medium text-black">{item.description}</td>
              <td className="py-3 text-right font-mono text-black">R$ {item.price}</td>
            </tr>
          )) || (
            <tr className="border-b border-gray-100">
              <td className="py-6 uppercase text-gray-400 italic text-xs">Análise técnica em andamento. Valores sujeitos a alteração após desmontagem.</td>
              <td className="py-6 text-right font-mono text-gray-400">---</td>
            </tr>
          )}
          <tr>
            <td className="py-6 font-black uppercase tracking-widest text-lg text-black">Total Geral Estimado</td>
            <td className="py-6 text-right font-black text-2xl italic font-mono text-black">
               {order.budget ? `R$ ${order.budget}` : 'Consulte o Técnico'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* ASSINATURAS NO FINAL DA PÁGINA */}
    <div className="mt-auto pt-20 grid grid-cols-2 gap-20">
      <div className="border-t-[1px] border-black text-center pt-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">Voldorico ALM Diesel</p>
        <p className="text-[8px] text-gray-400 mt-1 uppercase">Responsável Técnico</p>
      </div>
      <div className="border-t-[1px] border-black text-center pt-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">Aprovação do Cliente</p>
        <p className="text-[8px] text-gray-400 mt-1 uppercase">Assinatura / Data</p>
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