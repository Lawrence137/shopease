
import { Suspense } from "react";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import CartLink from "@/components/CartLink";
import { getProducts } from "@/lib/db-products";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            ShopEase
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-gray-500">
              Home
            </Link>

            <Link
              href="/products"
              className="hover:text-gray-500"
            >
              Products
            </Link>

            <CartLink />
          </div>
        </nav>
      </header>

      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="rounded-2xl bg-gray-900 px-8 py-16 text-white md:px-16">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-300">
            Your Everyday Essentials
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
            Find something you love.
          </h1>

          <p className="mt-5 max-w-lg text-gray-300">
            Discover quality products for your everyday life.
            Great style, simple shopping.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold">
          Featured Products
        </h2>

        <p className="mt-2 text-gray-600">
          Check out some of our favorite picks.
        </p>

        <Suspense
          fallback={
            <p className="mt-8 text-gray-600">
              Loading featured products...
            </p>
          }
        >
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* Footer */}

<footer className="border-t bg-white px-6 py-8 text-center text-sm text-gray-500">
  © 2026 ShopEase. Built while learning Next.js.
</footer>

    </main>
  );
}

async function FeaturedProducts() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <p className="mt-8 text-gray-600">
        No products available yet.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
