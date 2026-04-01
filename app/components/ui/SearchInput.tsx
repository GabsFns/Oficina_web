"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-3 border border-transparent focus-within:border-yellow-500/50 transition-all">
      
      <Search size={16} className="text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar peça técnica..."
        className="bg-transparent outline-none text-xs w-48 font-medium"
      />
    </div>
  );
}