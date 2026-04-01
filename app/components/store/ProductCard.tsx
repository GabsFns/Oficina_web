"use client";

import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
};

type Props = {
  product: Product;
  onAdd: (e: React.MouseEvent, product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
    >
      {/* IMAGEM */}
      <div className="w-full h-48 bg-gray-50 rounded-xl overflow-hidden mb-4">
        <img
          src={product.image}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* INFO */}
      <div className="space-y-2">
        <h3 className="font-black uppercase italic text-sm leading-tight">
          {product.name}
        </h3>

        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {product.brand}
        </p>

        {/* PREÇO + BOTÃO */}
        <div className="flex justify-between items-center pt-4">
          <span className="font-mono font-black text-lg">
            R$ {product.price.toLocaleString("pt-BR")}
          </span>

          <button
            onClick={(e) => onAdd(e, product)}
            className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
          >
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}