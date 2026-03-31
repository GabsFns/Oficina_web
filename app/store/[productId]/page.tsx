"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Check,
  ChevronRight,
  Settings2,
  Package,
  Wrench
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock do produto baseado na sua estética
  const product = {
    name: "Câmbio Eaton FS6306B",
    price: 18000.00,
     brand: "Eaton",
   category: "Transmissão",
    rating: 4.9,
    reviews: 124,
   sku: "TRN-EAT-FS6306B",
   description: "Caixa de câmbio manual de 6 marchas, alta durabilidade para caminhões médios e pesados.",
       images: [
      "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800"
      
    ]
  };




  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20">
      
      {/* HEADER NAVEGAÇÃO */}
      <nav className="px-6 md:px-12 py-8 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <Link href="/shop" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
          <ArrowLeft size={16} /> Voltar para Loja
        </Link>
        <div className="text-sm font-black italic uppercase tracking-tighter">
          Vodorico<span className="text-yellow-600">ALM</span>
        </div>
        <button className="relative p-2">
          <ShoppingBag size={20} strokeWidth={2} />
        </button>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 pt-8">
        
        {/* LADO ESQUERDO: GALERIA (Inspirado na sua Ref 2) */}
        <section className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[4/5] bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 relative group"
          >
            <img 
              src={product.images[selectedImage]} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt={product.name}
            />
            <div className="absolute top-8 left-8 bg-black text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
               New Performance Item
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-3xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-yellow-500 scale-95" : "border-transparent opacity-50 hover:opacity-100"}`}
              >
                <img src={img} className="w-full h-full object-cover grayscale" />
              </button>
            ))}
          </div>
        </section>

        {/* LADO DIREITO: INFOS E COMPRA */}
        <section className="flex flex-col justify-center">
          <div className="space-y-2 mb-6">
            <span className="text-yellow-600 text-[10px] font-black uppercase tracking-[0.3em]">{product.brand}</span>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">{product.name}</h1>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.reviews} Avaliações de Mecânicos</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-mono font-black italic tracking-tighter">R$ {product.price.toLocaleString('pt-BR')}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 italic">Ou 12x de R$ {(product.price / 12).toFixed(2)} no cartão</p>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Settings2 size={14} className="text-yellow-600" /> Especificações do Ativo
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md font-medium">
                {product.description}
              </p>
            </div>

            {/* BENEFÍCIOS (Estilo Nextgen) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <BenefitCard icon={<Truck size={18} />} title="Envio Expresso" desc="Saída de Nova Iguaçu em 2h" />
               <BenefitCard icon={<ShieldCheck size={18} />} title="Garantia Vodorico" desc="12 meses de cobertura total" />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex gap-4 h-16">
              <div className="flex items-center bg-gray-100 rounded-3xl px-6 gap-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-yellow-600 transition-colors"><Minus size={18} /></button>
                <span className="text-lg font-black font-mono w-4 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-yellow-600 transition-colors"><Plus size={18} /></button>
              </div>
              <button className="flex-1 bg-black text-white rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-yellow-500 hover:text-black transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                Adicionar ao Pedido <Plus size={20} />
              </button>
            </div>
            
            <button className="w-full py-5 rounded-[2rem] border border-black/5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-50 transition-all">
              Consultar Aplicação Técnica via WhatsApp
            </button>
          </div>
        </section>
      </main>

      {/* RODAPÉ TÉCNICO (Reviews Section) */}
      <section className="mt-32 max-w-[1400px] mx-auto px-6 md:px-12 border-t border-gray-100 pt-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div>
               <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Rating <span className="text-gray-300">&</span> Reviews</h3>
               <div className="text-6xl font-mono font-black tracking-tighter mb-2">4.9 <span className="text-xl text-gray-300">/ 5.0</span></div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Baseado em 124 revisões de frotistas.</p>
            </div>

            <div className="lg:col-span-2 space-y-12">
               {[1, 2].map((review) => (
                 <div key={review} className="space-y-4">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs uppercase tracking-tighter">JR</div>
                          <div>
                             <p className="text-xs font-black uppercase italic">Jorge Rodrigues - Transp. Silva</p>
                             <p className="text-[9px] text-gray-400 font-bold">13 DE OUTUBRO, 2026</p>
                          </div>
                       </div>
                       <div className="flex text-yellow-500"><Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /></div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium italic">"Peça genuína com encaixe perfeito no Scania R450. A oficina Vodorico entregou o produto calibrado e pronto para montagem. Recomendo para quem não quer dor de cabeça na estrada."</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTE BENEFIT CARD ---
function BenefitCard({ icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100">
      <div className="text-yellow-600">{icon}</div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{title}</h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase">{desc}</p>
      </div>
    </div>
  );
}