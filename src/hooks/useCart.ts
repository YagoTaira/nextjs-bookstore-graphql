import { useEffect, useState } from "react";
import { Book } from "@/graphql/types";

type CartItem = Book & {
  id: string;
  quantity: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        setCart(parsed);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  const addToCart = (book: Book) => {
    if (!book.id) {
      console.warn("Cannot add book without id to cart.");
      return;
    }

    setCart((prev) => {
      const index = prev.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += 1;
        return updated;
      }
      return [...prev, { ...book, quantity: 1 } as CartItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) => prev.map((b) => (b.id === id ? { ...b, quantity } : b)));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((b) => b.id !== id));
  };

  const isInCart = (id: string) => cart.some((b) => b.id === id);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    hydrated,
  };
}
