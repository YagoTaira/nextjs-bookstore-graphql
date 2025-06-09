"use client";

import { useEffect, useState } from "react";
import { Book } from "@/graphql/types";

export function useFavourites() {
  const [favourites, setFavourites] = useState<Book[] | null>(null);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const res = await fetch("/api/favourites", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load favourites");
        const data = await res.json();
        setFavourites(data.favourites || data);
      } catch (err) {
        console.error("Error loading favourites:", err);
        setFavourites([]);
      }
    };

    loadFavourites();
  }, []);

  const toggleFavourite = async (book: Book) => {
    if (favourites === null) return;

    const exists = favourites.some((b) => b._id === book._id);
    const method = exists ? "DELETE" : "POST";

    try {
      const res = await fetch("/api/favourites", {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bookId: book._id ?? book.id }),
      });

      if (!res.ok) throw new Error("Failed to update favourite");

      setFavourites((prev) => {
        if (!prev) return [];
        if (exists) {
          return [...prev.filter((b) => b._id !== book._id)];
        } else {
          return [...prev, { ...book }];
        }
      });
    } catch (err) {
      console.error("Error toggling favourite:", err);
    }
  };

  const isFavourite = (bookId: string) =>
    favourites?.some((book) => book._id === bookId || book.id === bookId) ??
    false;

  return { favourites, toggleFavourite, isFavourite };
}
