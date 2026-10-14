
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";
import CartLink from "@/components/CartLink";

// export const dynamic = "force-dynamic";

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
            Your everyday essentials
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
            Explore products
          </Link>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Handpicked for you
            </p>
            <h2 className="mt-1 text-3xl font-bold">
              Featured products
            </h2>
          </div>

          <Link
            href="/products"
            className="text-sm font-medium underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t bg-white px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopEase. Built while
        learning Next.js.
      </footer> */}
    </main>
  );
}
