
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600">
            Your cart is empty.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-3 text-gray-600">
            {itemCount} item(s) in your cart
          </p>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-gray-600">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                      className="rounded border px-3 py-1 disabled:opacity-40"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                      className="rounded border px-3 py-1"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-bold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-gray-100 p-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-xl font-bold">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Shipping and any applicable taxes are not included.
            </p>

            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white"
            >
              Checkout — next lesson
            </button>
          </div>
        </>
      )}
    </main>
  );
}
