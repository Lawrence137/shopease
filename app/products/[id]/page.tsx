
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db-products";
import { formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            ShopEase
          </Link>

          <Link
            href="/products"
            className="text-sm hover:underline"
          >
            Back to products
          </Link>
        </nav>
      </header>

      <Suspense
        fallback={
          <p className="mx-auto max-w-7xl px-6 py-12">
            Loading product...
          </p>
        }
      >
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}

async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl bg-white object-cover"
        />
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {product.name}
        </h1>

        <p className="mt-4 text-2xl font-semibold">
          {formatPrice(product.price)}
        </p>

        <p className="mt-6 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>

        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}