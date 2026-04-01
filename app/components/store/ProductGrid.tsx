import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import { motion } from "framer-motion";
type Props = {
  products: any[];
  onAdd: any;
};

export default function ProductGrid({ products, onAdd }: Props) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((p) => (
         <motion.div 
                      key={p.id}
                      whileHover={{ y: -10 }}
                      className="group relative"
                    >
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
        </motion.div>
      ))}
    </div>
  );
}


