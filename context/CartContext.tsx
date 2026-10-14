
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartAction =
  | { type: "ADD"; product: CartProduct }
  | { type: "REMOVE"; productId: number }
  | {
      type: "UPDATE_QUANTITY";
      productId: number;
      quantity: number;
    }
  | { type: "LOAD"; items: CartItem[] };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (
    productId: number,
    quantity: number
  ) => void;
};

function cartReducer(
  state: CartItem[],
  action: CartAction
): CartItem[] {
  switch (action.type) {
    case "ADD": {
      if (action.product.stock < 1) {
        return state;
      }

      const existing = state.find(
        (item) => item.id === action.product.id
      );

      if (existing) {
        return state.map((item) => {
          if (item.id !== action.product.id) {
            return item;
          }

          return {
            ...item,
            stock: action.product.stock,
            quantity: Math.min(
              item.quantity + 1,
              action.product.stock
            ),
          };
        });
      }

      return [
        ...state,
        {
          ...action.product,
          quantity: 1,
        },
      ];
    }

    case "REMOVE":
      return state.filter(
        (item) => item.id !== action.productId
      );

    case "UPDATE_QUANTITY":
      return state.map((item) => {
        if (item.id !== action.productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(
            1,
            Math.min(
              Math.floor(action.quantity),
              item.stock
            )
          ),
        };
      });

    case "LOAD":
      return action.items
        .filter((item) => item.stock > 0)
        .map((item) => ({
          ...item,
          quantity: Math.min(item.quantity, item.stock),
        }))
        .filter((item) => item.quantity >= 1);

    default:
      return state;
  }
}

const CartContext = createContext<
  CartContextValue | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopease-cart");

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item): item is CartItem =>
              item !== null &&
              typeof item === "object" &&
              typeof item.id === "number" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              typeof item.category === "string" &&
              typeof item.image === "string" &&
              typeof item.stock === "number" &&
              Number.isInteger(item.stock) &&
              item.stock >= 0 &&
              typeof item.quantity === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity >= 1
          );

          dispatch({
            type: "LOAD",
            items: validItems,
          });
        }
      }
    } catch {
      localStorage.removeItem("shopease-cart");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(
        "shopease-cart",
        JSON.stringify(items)
      );
    }
  }, [items, hydrated]);

  const value: CartContextValue = {
    items,

    itemCount: items.reduce(
      (total, item) => total + item.quantity,
      0
    ),

    subtotal: items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),

    addToCart: (product) =>
      dispatch({ type: "ADD", product }),

    removeFromCart: (productId) =>
      dispatch({ type: "REMOVE", productId }),

    updateQuantity: (productId, quantity) =>
      dispatch({
        type: "UPDATE_QUANTITY",
        productId,
        quantity,
      }),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}
