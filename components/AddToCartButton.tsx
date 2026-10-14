
"use client";

import { useCart, type CartProduct } from "@/context/CartContext";

type Props = {
  product: CartProduct;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  const isOutOfStock = product.stock < 1;

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={() => addToCart(product)}
      className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
