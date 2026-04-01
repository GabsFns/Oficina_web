"use client";

import { useState } from "react";
import Header from "../components/store/Header";
import SidebarFilters from "../components/store/SideBarFilters";
import ProductGrid from "../components/store/ProductGrid";
import CartDrawer from "../components/store/CartDrawer";
import { useCartStore } from "../zu/cartStore";

const products = [
  {
    id: 1,
    name: "Injetor Bosch Common Rail",
    category: "Injeção",
    price: 2450.0,
    image:
      "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400",
    brand: "BOSCH",
  },
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  brand: string;
};

export default function PremiumStore() {
  const { addItem, getTotalItems } = useCartStore();

  const [openCart, setOpenCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "Todos" || p.category === category;

    return matchSearch && matchCategory;
  });

  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product); // ✅ correto
    setOpenCart(true);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-black">
      
      {/* HEADER */}
      <Header
        cartCount={getTotalItems()} // ✅ agora correto
        onOpenCart={() => setOpenCart(true)}
        search={search}
        setSearch={setSearch}
      />

      {/* HERO */}
      <section className="pt-24 px-6 md:px-12">
        <div className="relative h-[300px] md:h-[450px] w-full rounded-[3rem] overflow-hidden bg-black">
          <img
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-white text-6xl font-black italic">
              SHOP
            </h1>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <SidebarFilters
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />

        <div className="lg:col-span-10 space-y-6">
          
          <div className="flex justify-between">
            <h2 className="font-black text-xl uppercase italic">
              Produtos
            </h2>

            <span className="text-xs text-gray-400 font-bold">
              {filteredProducts.length} resultados
            </span>
          </div>

          <ProductGrid
            products={filteredProducts}
            onAdd={addToCart}
          />
        </div>
      </main>

      {/* CARRINHO */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </div>
  );
}