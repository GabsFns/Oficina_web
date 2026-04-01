"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
};

type Props = {
  product: Product;
  onAdd: (e: React.MouseEvent, product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="lg:col-span-10 flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[3rem] border border-dashed border-gray-200 p-12 text-center">
  
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="space-y-6"
  >
    {/* ÍCONE TÉCNICO ANIMADO */}
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
      <Search size={64} strokeWidth={1} className="relative text-gray-300 mx-auto mb-4" />
    </div>

    <div className="space-y-2">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter">
        Estoque em <span className="text-yellow-600">Sincronização</span>
      </h2>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] max-w-xs mx-auto leading-relaxed">
        Nossos ativos de alta performance estão sendo catalogados no banco de dados.
      </p>
    </div>

    {/* BOTÃO DE AVISO / SUPORTE */}
    <div className="pt-8">
      <button className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase italic text-[10px] tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center gap-3 mx-auto shadow-xl shadow-black/5">
        Me avise quando chegar <ChevronRight size={14} />
      </button>
    </div>

    {/* LOG DE STATUS (Pequeno detalhe para o dev) */}
    <div className="pt-12 flex items-center justify-center gap-4">
       <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-[8px] font-mono font-bold text-gray-300 uppercase">Database: Offline</span>
       </div>
       <div className="w-px h-3 bg-gray-100" />
       <div className="text-[8px] font-mono font-bold text-gray-300 uppercase italic">Vodorico_v2.0_init</div>
    </div>
  </motion.div>
</div>
  );
}