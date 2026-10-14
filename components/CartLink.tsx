
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="hover:text-gray-500">
      Cart ({itemCount})
    </Link>
  );
}
