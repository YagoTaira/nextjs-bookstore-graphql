"use client";

import { withAuthProtection } from "@/context/withAuthProtection";
import { useFavourites } from "@/hooks/useFavourites";
import Link from "next/link";
import Image from "next/image";

function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourites();

  if (favourites === null) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          ❤️ Your Favourites
        </h1>
        <p>Loading your favourites...</p>
      </main>
    );
  }

  if (favourites.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          ❤️ Your Favourites
        </h1>
        <p>No favourite books yet.</p>
        <Link
          href="/books"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Book List
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-8">
        ❤️ Your Favourites
      </h1>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {favourites.map((book) => (
          <div
            key={book._id?.toString()}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
          >
            {book.imageUrl && (
              <Image
                src={book.imageUrl}
                alt={book.title}
                width={240}
                height={360}
                className="rounded shadow-md mx-auto mb-4"
              />
            )}

            <div>
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

            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/books/${book._id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View Details →
              </Link>

              <button
                onClick={() => toggleFavourite(book)}
                className="text-sm text-red-600 dark:text-red-400 hover:underline font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default withAuthProtection(FavouritesPage);
