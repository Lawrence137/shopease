
import prisma from "@/lib/prisma";

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
  });
}