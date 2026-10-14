
"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="mt-8 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
    >
      Add to cart
    </button>
  );
}
