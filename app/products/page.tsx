
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/db-products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            ShopEase
          </Link>

          <Link href="/" className="text-sm hover:underline">
            Back to home
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-2 text-gray-600">
          Explore our collection.
        </p>

        <Suspense
          fallback={
            <p className="mt-8 text-gray-600">
              Loading products...
            </p>
          }
        >
          <ProductList />
        </Suspense>
      </section>
    </main>
  );
}

async function ProductList() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <p className="mt-8 text-gray-600">
        No products found. Add some products to your database.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}