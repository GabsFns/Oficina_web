"use client";

import { motion } from "framer-motion";

export default function PageTransition() {
  return (
    <>
      {/* Camada que faz o "Wipe" da cor */}
      <motion.div
        className="fixed inset-0 z-[100] bg-[#f8f9fa]" // Cor de destino (Store)
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      {/* Camada Grafite que sai de cena */}
      <motion.div
        className="fixed inset-0 z-[99] bg-[#121212]" // Cor de origem (Landing)
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />
    </>
  );
}