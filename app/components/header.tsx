"use client";

import { Search, Bell, Plus } from "lucide-react";



export default function Header() {

 

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#121214]/50 backdrop-blur-md sticky top-0 z-10">
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar cliente ou placa..."
          className="w-full bg-[#1a1a1e] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-yellow-500/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
          <Bell size={20} />
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
          <Plus size={18} /> Nova Ordem
        </button>
      </div>
    </header>
  );
}