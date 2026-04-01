"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: any[];
};

export default function CartDrawer({ open, onClose, cart }: Props) {
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-[400px] bg-white"
          >
            <div className="p-6 flex justify-between">
              <h2>Carrinho</h2>
              <button onClick={onClose}><X /></button>
            </div>

            <div className="p-6">
              {cart.map((item, i) => (
                <div key={i}>{item.name}</div>
              ))}
            </div>

            <div className="p-6 border-t">
              Total: R$ {subtotal.toLocaleString("pt-BR")}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}