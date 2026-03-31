"use client";

import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden bg-[#f8f9fa]">
      <PageTransition />
      
      {/* Conteúdo vindo da lateral direita */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4, // Espera a "cortina" passar um pouco
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}