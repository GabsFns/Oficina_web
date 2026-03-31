"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShoppingBag, Filter, X, Plus, Minus, 
  ArrowRight, ChevronRight, Star, Truck, ShieldCheck, CreditCard 
} from "lucide-react";

import Link from "next/link";

const products = [
  { id: 1, name: "Injetor Bosch Common Rail", category: "Injeção", price: 2450.00, image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "BOSCH", rating: 5.0, reviews: 120 },
  { id: 2, name: "Turbina Holset HE400VG", category: "Turbinas", price: 8900.00, image: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "HOLSET", rating: 4.8, reviews: 85 },
  { id: 3, name: "Kit Embreagem Sachs 430mm", category: "Mecânica", price: 3200.00, image: "https://images.pexels.com/photos/3644913/pexels-photo-3644913.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "SACHS", rating: 4.9, reviews: 210 },
  { id: 4, name: "Módulo Eletrônico Volvo FH", category: "Eletrônica", price: 12500.00, image: "https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "VOLVO", rating: 5.0, reviews: 45 },
];

export default function PremiumStore() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

 const addToCart = (e: React.MouseEvent, product: any) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (!product || typeof product.price === 'undefined') return;

  setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  setIsCartOpen(true);
};

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans text-black selection:bg-yellow-500">
      
      {/* HEADER ESTILO NEXTGEN */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="text-2xl font-black tracking-tighter uppercase italic text-black">
            Vodorico<span className="text-yellow-600">ALM</span>
          </div>
          <div className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <a href="/dashboard/l" className="hover:text-black transition-colors">Oficina</a>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-3 border border-transparent focus-within:border-yellow-500/50 transition-all">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder="Buscar peça técnica..." className="bg-transparent outline-none text-xs w-48 font-medium" />
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-black hover:scale-110 transition-transform">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-yellow-500 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO / BANNER (Inspirado na sua imagem 1) */}
      <section className="pt-24 px-6 md:px-12">
        <div className="relative h-[300px] md:h-[450px] w-full rounded-[3rem] overflow-hidden bg-black group">
          <img 
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260" 
            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-white text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-4">SHOP</h1>
            <p className="text-yellow-500 font-bold tracking-[0.5em] uppercase text-xs md:text-sm">Peças de alta performance diesel</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* FILTROS LATERAIS (Inspirado na sua imagem 1) */}
        <aside className="hidden lg:block lg:col-span-2 space-y-10">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Filter size={14} /> Categoria
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li className="text-black flex items-center justify-between cursor-pointer">
                <span>Injeção</span> <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px]">12</span>
              </li>
              <li className="hover:text-black transition-colors cursor-pointer">Turbinas</li>
              <li className="hover:text-black transition-colors cursor-pointer">Câmbios</li>
              <li className="hover:text-black transition-colors cursor-pointer">Eletrônica</li>
            </ul>
          </div>
          <div className="p-6 bg-yellow-500 rounded-[2rem] text-black">
            <h4 className="font-black uppercase italic text-sm mb-2">Suporte Técnico</h4>
            <p className="text-[10px] font-bold leading-tight opacity-80">Dúvida na aplicação da peça? Chame nossos especialistas.</p>
          </div>
        </aside>

        {/* GRID DE PRODUTOS */}
        <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((p) => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* O Link envolve o conteúdo visual do card */}
              
                
        {/* GRID DE PRODUTOS / EMPTY STATE */}
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
           
            </motion.div>
          ))}
        </div>
      </main>

      {/* CARRINHO LATERAL PREMIUM (Inspirado na Imagem 2) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-8 flex justify-between items-center border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-black uppercase italic">Meu <span className="text-gray-400">Carrinho</span></h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cart.length} ITENS SELECIONADOS</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-black uppercase italic text-sm">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</p>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                          <button className="p-1 hover:bg-white rounded shadow-sm"><Minus size={12} /></button>
                          <span className="text-xs font-black px-1">1</span>
                          <button className="p-1 hover:bg-white rounded shadow-sm"><Plus size={12} /></button>
                        </div>
                        <span className="font-mono font-black text-sm">R$ {item.price.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RODAPÉ DO CARRINHO (ESTILO CHECKOUT NEXTGEN) */}
              <div className="p-8 bg-gray-50 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Subtotal</span> <span className="text-black font-mono">R$ {subtotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span>Entrega</span> <span className="text-green-600">Calculando...</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="font-black uppercase italic text-lg">Total</span>
                    <span className="text-3xl font-mono font-black tracking-tighter">R$ {subtotal.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center gap-1">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">Envio Rápido</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col items-center gap-1">
                    <ShieldCheck size={16} className="text-gray-400" />
                    <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">Garantia Vodorico</span>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/10 group">
                  Finalizar Pedido <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}