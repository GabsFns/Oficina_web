"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { useCartStore } from "../../zu/cartStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, removeItem, increase, decrease } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* HEADER */}
            <div className="p-8 flex justify-between items-center border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-black uppercase italic">
                  Meu <span className="text-gray-400">Carrinho</span>
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {cart.length} ITENS SELECIONADOS
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* LISTA */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 text-sm font-bold">
                  Seu carrinho está vazio
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-black uppercase italic text-sm">
                        {item.name}
                      </h4>

                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {item.brand}
                      </p>

                      <div className="flex justify-between items-center pt-2">
                        {/* QUANTIDADE */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-3">
                          <button
                            onClick={() => decrease(item.id)}
                            className="p-1 hover:bg-white rounded shadow-sm"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="text-xs font-black px-1">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increase(item.id)}
                            className="p-1 hover:bg-white rounded shadow-sm"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* PREÇO */}
                        <span className="font-mono font-black text-sm">
                          R$ {(item.price * item.quantity).toLocaleString("pt-BR")}
                        </span>
                      </div>

                      {/* REMOVER */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] text-red-500 font-bold uppercase mt-2"
                      >
                        Remover item
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="p-8 bg-gray-50 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black font-mono">
                    R$ {subtotal.toLocaleString("pt-BR")}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Entrega</span>
                  <span className="text-green-600">Calculando...</span>
                </div>

                <div className="h-px bg-gray-200 my-4" />

                <div className="flex justify-between items-end">
                  <span className="font-black uppercase italic text-lg">
                    Total
                  </span>
                  <span className="text-3xl font-mono font-black tracking-tighter">
                    R$ {subtotal.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>

              {/* BENEFÍCIOS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border flex flex-col items-center gap-1">
                  <Truck size={16} className="text-gray-400" />
                  <span className="text-[8px] font-black uppercase text-gray-400">
                    Envio Rápido
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border flex flex-col items-center gap-1">
                  <ShieldCheck size={16} className="text-gray-400" />
                  <span className="text-[8px] font-black uppercase text-gray-400">
                    Garantia Vodorico
                  </span>
                </div>
              </div>

              {/* BOTÃO */}
              <button className="w-full bg-black text-white py-6 rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-3 group">
                Finalizar Pedido
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}