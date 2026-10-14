
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// Tell Next.js which product pages to generate.
export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to products
        </Link>

        <div className="mt-8 grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-full rounded-xl object-cover"
          />

          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-semibold">
              {formatPrice(product.price)}
            </p>

            <p className="mt-4 text-gray-600">
              A quality everyday essential, selected for
              comfort, style, and value.
            </p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
