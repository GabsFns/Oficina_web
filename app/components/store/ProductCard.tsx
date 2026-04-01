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
    <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
      <div className="bg-white rounded-2xl p-4 border">
        <img src={product.image} className="h-40 w-full object-cover rounded-xl" />

        <h3 className="font-bold mt-4">{product.name}</h3>
        <p className="text-xs text-gray-400">{product.brand}</p>

        <div className="flex justify-between mt-4">
          <span className="font-mono font-bold">
            R$ {product.price.toLocaleString("pt-BR")}
          </span>

          <button
            onClick={(e) => onAdd(e, product)}
            className="bg-black text-white px-3 py-1 rounded-lg text-xs"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}