"use client";

import { useState } from "react";
import Header from "../components/store/Header";
import SidebarFilters from "../components/store/SideBarFilters";
import ProductGrid from "../components/store/ProductGrid";
import CartDrawer from "../components/store/CartDrawer";

const products = [
  { id: 1, name: "Injetor Bosch Common Rail", category: "Injeção", price: 2450.00, image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "BOSCH", rating: 5.0, reviews: 120 },
  { id: 2, name: "Turbina Holset HE400VG", category: "Turbinas", price: 8900.00, image: "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "HOLSET", rating: 4.8, reviews: 85 },
  { id: 3, name: "Kit Embreagem Sachs 430mm", category: "Mecânica", price: 3200.00, image: "https://images.pexels.com/photos/3644913/pexels-photo-3644913.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "SACHS", rating: 4.9, reviews: 210 },
  { id: 4, name: "Módulo Eletrônico Volvo FH", category: "Eletrônica", price: 12500.00, image: "https://images.pexels.com/photos/2582931/pexels-photo-2582931.jpeg?auto=compress&cs=tinysrgb&w=400", brand: "VOLVO", rating: 5.0, reviews: 45 },
];
export default function PremiumStore() {
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  // 🧠 FILTRO (search + categoria)
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "Todos" || p.category === category;

    return matchSearch && matchCategory;
  });

  // 🛒 ADD TO CART
  const addToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    setOpenCart(true);
  };


  type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  brand: string;
};

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-black">

      {/* HEADER */}
      <Header
        cartCount={cart.length}
        onOpenCart={() => setOpenCart(true)}
        search={search}
        setSearch={setSearch}
      />

      {/* HERO */}
       <section className="pt-24 px-6 md:px-12">
        <div className="relative h-[300px] md:h-[450px] w-full rounded-[3rem] overflow-hidden bg-black group">
          <img 
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260" 
            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-white text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-4">SHOP</h1>
            <p className="text-yellow-500 font-bold tracking-[0.5em] uppercase text-xs md:text-sm">Peças de alta performance diesel</p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* SIDEBAR */}
        <SidebarFilters
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />

        {/* PRODUTOS */}
        <div className="lg:col-span-10 space-y-6">

          {/* INFO TOPO */}
          <div className="flex justify-between items-center">
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
        cart={cart}
      />

    </div>
  );
}