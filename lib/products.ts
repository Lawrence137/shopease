
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Sneakers",
    price: 4500,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Everyday Backpack",
    price: 3200,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 3,
    name: "Minimal Wristwatch",
    price: 5800,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 4,
    name: "Casual T-Shirt",
    price: 1500,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(price);
}
