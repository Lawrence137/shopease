
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const products = [
    {
      name: "Classic Sneakers",
      description: "Comfortable everyday sneakers.",
      price: 4500,
      category: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      stock: 10,
    },
    {
      name: "Everyday Backpack",
      description: "A practical backpack for daily use.",
      price: 3200,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      stock: 10,
    },
    {
      name: "Minimal Wristwatch",
      description: "A clean, minimalist wristwatch.",
      price: 5800,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      stock: 10,
    },
    {
      name: "Casual T-Shirt",
      description: "A simple T-shirt for everyday wear.",
      price: 1500,
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      stock: 10,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    });
  }

  console.log("ShopEase products seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });