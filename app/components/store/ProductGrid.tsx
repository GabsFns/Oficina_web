import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

type Props = {
  products: any[];
  onAdd: any;
};

export default function ProductGrid({ products, onAdd }: Props) {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}