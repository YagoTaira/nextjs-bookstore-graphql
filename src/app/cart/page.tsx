"use client";

import { withAuthProtection } from "@/context/withAuthProtection";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";

function CartPage() {
  const { cart, hydrated, removeFromCart, updateQuantity } = useCart();

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
        <p>Loading cart...</p>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 Your Cart</h1>
        <p>No items in your cart yet.</p>
        <Link
          href="/books"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Book List
        </Link>
      </main>
    );
  }

  const total = cart.reduce(
    (sum, book) => sum + (book.price ?? 0) * (book.quantity ?? 1),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-8">🛒 Your Cart</h1>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {cart.map((book, index) => (
          <div
            key={`${book._id?.toString() ?? book.title}-${index}`}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
          >
            {book.imageUrl && (
              <Image
                src={book.imageUrl}
                alt="Book Title"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "360px" }}
                className="rounded shadow-md mx-auto"
                priority
              />
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">
                by {book.author}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed mb-2">
                {book.description?.length
                  ? book.description.length > 120
                    ? book.description.slice(0, 120) + "..."
                    : book.description
                  : "No description available."}
              </p>

              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Price: €{book.price?.toFixed(2) ?? "N/A"}
              </p>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">Quantity:</span>
                <button
                  className="px-2 py-1 text-sm font-bold bg-gray-200 dark:bg-gray-700 rounded"
                  onClick={() =>
                    updateQuantity(
                      book.id,
                      Math.max((book.quantity ?? 1) - 1, 1)
                    )
                  }
                >
                  -
                </button>
                <span className="text-sm">{book.quantity ?? 1}</span>
                <button
                  className="px-2 py-1 text-sm font-bold bg-gray-200 dark:bg-gray-700 rounded"
                  onClick={() =>
                    updateQuantity(book.id, (book.quantity ?? 1) + 1)
                  }
                >
                  +
                </button>
              </div>

              <p className="text-sm font-medium">
                Subtotal: €
                {((book.price ?? 0) * (book.quantity ?? 1)).toFixed(2)}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => removeFromCart(book.id)}
                className="px-4 py-2 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 text-sm"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right text-xl font-semibold">
        Total: €{total.toFixed(2)}
      </div>
    </main>
  );
}

export default withAuthProtection(CartPage);
