"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[3rem] border border-dashed p-12 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        
        <Search size={64} className="text-gray-300 mx-auto mb-4" />

        <h2 className="text-3xl font-black italic">
          Estoque em <span className="text-yellow-600">Sincronização</span>
        </h2>

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-xl flex gap-2 items-center">
          Me avise <ChevronRight size={14} />
        </button>

      </motion.div>
    </div>
  );
}