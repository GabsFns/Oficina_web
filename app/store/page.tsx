"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ShoppingBag, 
  Filter, 
  X, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronDown,
  Box,
  Cpu,
  Zap
} from "lucide-react";

// --- MOCK DE PRODUTOS ---
const products = [
  { id: 1, name: "Injetor Bosch Common Rail", category: "Injeção", price: 2450.00, image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "BOSCH" },
  { id: 2, name: "Turbina Holset HE400VG", category: "Turbinas", price: 8900.00, image: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "HOLSET" },
  { id: 3, name: "Kit Embreagem Sachs 430mm", category: "Mecânica", price: 3200.00, image: "https://images.pexels.com/photos/3644913/pexels-photo-3644913.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "SACHS" },
  { id: 4, name: "Módulo Eletrônico Volvo FH", category: "Eletrônica", price: 12500.00, image: "https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "VOLVO" },
];

export default function StorePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("TODOS");

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#0a0a0b] text-white min-h-screen font-sans">
      
      {/* NAVBAR DA LOJA */}
      <nav className="fixed w-full z-50 flex justify-between items-center px-6 md:px-10 py-6 backdrop-blur-xl border-b border-white/5 bg-[#0a0a0b]/90">
        <div className="text-xl font-black tracking-tighter uppercase italic">
          Vodorico<span className="text-yellow-500">STORE</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <button onClick={() => setActiveCategory("TODOS")} className={activeCategory === "TODOS" ? "text-yellow-500" : ""}>Todos</button>
            <button onClick={() => setActiveCategory("Injeção")} className={activeCategory === "Injeção" ? "text-yellow-500" : ""}>Injeção</button>
            <button onClick={() => setActiveCategory("Turbinas")} className={activeCategory === "Cambios" ? "text-yellow-500" : ""}>Cambios</button>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 bg-white/5 rounded-full hover:bg-yellow-500 hover:text-black transition-all group"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0b]">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-10">
        
        {/* HEADER DE CATEGORIA */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter"
          >
            Peças <span className="text-gray-700 italic font-light">Originais</span>
          </motion.h2>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-1 w-20 bg-yellow-500"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Performance Heavy Duty</p>
          </div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Imagem do Produto */}
              <div className="aspect-[3/4] bg-[#121214] rounded-[2rem] overflow-hidden border border-white/5 relative mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                    {product.brand}
                  </span>
                </div>
                
                {/* Overlay de Compra Rápida */}
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-6 left-6 right-6 bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"
                >
                  Adicionar ao Carrinho
                </button>
              </div>

              {/* Info do Produto */}
              <div className="space-y-1 px-2">
                <p className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">{product.category}</p>
                <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none group-hover:text-yellow-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-mono font-black text-gray-400 mt-2">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* CARRINHO LATERAL (DRAWER) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0d0d0e] z-[70] p-10 border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Seu <span className="text-gray-600">Pedido</span></h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-yellow-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 italic">
                    <ShoppingBag size={48} className="mb-4 opacity-10" />
                    <p className="text-sm uppercase font-black tracking-widest">Carrinho Vazio</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex gap-5 bg-white/5 p-4 rounded-[1.5rem] border border-white/5">
                      <div className="w-20 h-20 bg-black rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h4 className="text-[11px] font-black uppercase italic leading-none mb-1">{item.name}</h4>
                        <p className="text-[10px] font-mono font-bold text-yellow-500">R$ {item.price.toLocaleString('pt-BR')}</p>
                      </div>
                      <button className="text-gray-700 hover:text-red-500 self-center">
                        <X size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Total Estimado</span>
                  <span className="text-3xl font-mono font-black italic text-white">
                    R$ {cart.reduce((acc, curr) => acc + curr.price, 0).toLocaleString('pt-BR')}
                  </span>
                </div>
                <button className="w-full bg-yellow-500 text-black py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-yellow-400 transition-all shadow-[0_10px_40px_rgba(234,179,8,0.2)] flex items-center justify-center gap-3">
                  Finalizar Compra <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}