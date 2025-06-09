"use client";

import { useFavourites } from "@/hooks/useFavourites";
import { useCart } from "@/hooks/useCart";
import { usePreloadedQuery, PreloadedQuery } from "react-relay/hooks";
import { BookDetailQuery } from "@/queries/__generated__/BookDetailQuery.graphql";
import { bookDetailQuery } from "@/queries/BookDetailQuery";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useDeleteBookMutation } from "@/mutations/DeleteBookMutation";
import { useRouter } from "next/navigation";

type Props = {
  queryRef: PreloadedQuery<BookDetailQuery>;
};

function AdminActionButtons({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <button
      onClick={onDelete}
      disabled={isDeleting}
      className="px-5 py-2 rounded-md text-white font-medium bg-red-800 hover:bg-red-900 transition"
    >
      {isDeleting ? "Deleting..." : "Delete Book"}
    </button>
  );
}

export function BookDetail({ queryRef }: Props) {
  const data = usePreloadedQuery(bookDetailQuery, queryRef);
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { deleteBook, isInFlight } = useDeleteBookMutation();

  const book = data.book;
  if (!book) return <p className="text-center p-4">Book not found.</p>;

  const fav = isFavourite(book.id);
  const inCart = isInCart(book.id);

  const imageUrl = book.imageUrl ?? "/images/fallback.jpg";

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(
        id,
        () => {
          alert("Book deleted!");
          router.push("/books");
        },
        () => alert("Failed to delete book.")
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-center text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-sm italic text-gray-600 dark:text-gray-300 mb-4">
        by {book.author}
      </p>

      <div className="mb-6">
        <Image
          src={imageUrl}
          alt={book.title}
          width={240}
          height={360}
          className="rounded shadow-md mx-auto"
        />
      </div>

      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-left mb-4">
        {book.description}
      </p>

      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Price: €{book.price?.toFixed(2) ?? "N/A"}
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => toggleFavourite(book)}
          className={`px-5 py-2 rounded-md text-white font-medium transition ${
            isFavourite(book.id)
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isFavourite(book.id) ? "Remove Favourite" : "Add to Favourites"}
        </button>

        <button
          onClick={() => {
            if (!book.id) {
              console.error("Cannot add book without _id to cart.");
              return;
            }
            addToCart(book);
          }}
          className={`px-5 py-2 rounded-md text-white font-medium transition ${
            inCart
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={inCart}
        >
          {inCart ? "Already in Cart" : "Add to Cart"}
        </button>

        {user?.role === "admin" && (
          <AdminActionButtons
            onDelete={() => handleDelete(book.id)}
            isDeleting={isInFlight}
          />
        )}
      </div>

      <div className="text-center">
        <Link
          href="/books"
          className="inline-block mt-6 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          ← Back to Book List
        </Link>
      </div>
    </main>
  );
}
