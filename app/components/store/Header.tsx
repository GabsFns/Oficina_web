"use client";

import { Search, ShoppingBag } from "lucide-react";
import SearchInput from "../ui/SearchInput";

type Props = {
  cartCount: number;
  onOpenCart: () => void;
  search: string;
  setSearch: (value: string) => void;
};

export default function Header({cartCount, 
  onOpenCart, 
  search, 
  setSearch  }: Props) {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4 flex justify-between items-center">
      
      <div className="flex items-center gap-10">
        <div className="text-2xl font-black tracking-tighter uppercase italic">
          Vodorico<span className="text-yellow-600">ALM</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <SearchInput value={search} onChange={setSearch} />

        <button onClick={onOpenCart} className="relative p-2">
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-yellow-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}