"use client";

import { useState } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { bookListQuery } from "@/queries/BookListQuery";
import type { BookListQuery } from "@/queries/__generated__/BookListQuery.graphql";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useDeleteBookMutation } from "@/mutations/DeleteBookMutation";

type Props = {
  queryRef: PreloadedQuery<BookListQuery>;
};

export function BookList({ queryRef }: Props) {
  const data = usePreloadedQuery<BookListQuery>(bookListQuery, queryRef);
  const [search, setSearch] = useState("");

  const filteredBooks = data.books
    .filter((book) => book !== null)
    .filter((book) =>
      `${book.title} ${book.author}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const { user } = useAuth();
  const { deleteBook, isInFlight } = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(
        id,
        () => alert("Book deleted!"),
        () => alert("Failed to delete book.")
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
          <p>No books found. 📚 Try a different search term.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {filteredBooks.map((book) => {
            const imageUrl = book.imageUrl ?? "/images/fallback.jpg";
            return (
              <div
                key={book.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <Image
                    src={imageUrl}
                    alt={book.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "360px" }}
                    className="rounded shadow-md mx-auto"
                  />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3">
                    by {book.author}
                  </p>
                  {book.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                      {book.description.length > 120
                        ? book.description.slice(0, 120) + "..."
                        : book.description}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/books/${book.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Details →
                  </Link>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(book.id)}
                      disabled={isInFlight}
                      className={`text-sm text-red-600 dark:text-red-400 hover:underline font-medium`}
                    >
                      {isInFlight ? "Deleting..." : "Remove"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
