
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h2 className="mt-1 font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 block w-full rounded-lg bg-black px-4 py-2 text-center text-white transition hover:bg-gray-800"
    >
  View product
</Link>
      </div>
    </article>
  );
}
