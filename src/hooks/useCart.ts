"use client";

import { useEffect, useState } from "react";
import { BookGQL, CartItemGQL } from "@/graphql/types";

export function useCart() {
  const [cart, setCart] = useState<CartItemGQL[] | null>(null);

  // Fetch cart from server
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load cart");
        const data = await res.json();
        setCart(data.items || []);
      } catch {
        //console.error("Error loading cart:", err);
        setCart([]);
      }
    };

    loadCart();
  }, []);

  // Save cart to backend
  const saveCart = async (items: CartItemGQL[]) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: items.map((item) => ({
            bookId: item._id || item.id,
            quantity: item.quantity,
          })),
        }),
      });
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  };

  const addToCart = async (book: BookGQL) => {
    if (!book._id && !book.id) return;
    const bookId = book._id || book.id;

    setCart((prev) => {
      const current = prev || [];
      const index = current.findIndex((b) => (b._id || b.id) === bookId);
      let updated: CartItemGQL[];
      if (index !== -1) {
        updated = [...current];
        updated[index].quantity += 1;
      } else {
        updated = [...current, { ...book, quantity: 1 }];
      }
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    setCart((prev) => {
      const current = prev || [];
      const updated = current.map((b) =>
        (b._id || b.id) === id ? { ...b, quantity } : b
      );
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = async (id: string) => {
    setCart((prev) => {
      //console.log("Removing book ID:", id);
      //console.log(
      //  "Current cart IDs:",
      //  (prev || []).map((b) => b._id || b.id)
      //);
      const current = prev || [];
      const updated = current.filter((b) => (b._id || b.id)?.toString() !== id);
      saveCart(updated);
      return updated;
    });
  };

  const isInCart = (id: string) =>
    cart?.some((b) => (b._id || b.id) === id) ?? false;

  return {
    cart: cart ?? [],
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    hydrated: cart !== null,
  };
}
