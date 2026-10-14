
import { Suspense } from "react";
import prisma from "@/lib/prisma";

export default function DatabaseTestPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        ShopEase Database Test
      </h1>

      <Suspense fallback={<p>Checking database...</p>}>
        <ProductCount />
      </Suspense>
    </main>
  );
}

async function ProductCount() {
  const count = await prisma.product.count();

  return (
    <p className="mt-4">
      Database connected! Products in database: {count}
    </p>
  );
}
