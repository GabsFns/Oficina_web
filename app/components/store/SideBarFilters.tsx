"use client";

import { Filter } from "lucide-react";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = [
  "Todos",
  "Injeção",
  "Turbinas",
  "Câmbios",
  "Eletrônica",
];

export default function SidebarFilters({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <aside className="hidden lg:block lg:col-span-2 space-y-10">
      
      <div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Filter size={14} /> Categoria
        </h3>

        <ul className="space-y-4 text-sm font-bold">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer transition-colors flex justify-between ${
                selectedCategory === cat
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              <span>{cat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CARD EXTRA */}
      <div className="p-6 bg-yellow-500 rounded-[2rem] text-black">
        <h4 className="font-black uppercase italic text-sm mb-2">
          Suporte Técnico
        </h4>
        <p className="text-[10px] font-bold leading-tight opacity-80">
          Dúvida na aplicação da peça? Chame nossos especialistas.
        </p>
      </div>
    </aside>
  );
}