"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-6 text-gray-800 dark:text-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-blue-600 dark:text-blue-400">
          📚 Welcome to the Bookstore App
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          Discover and manage your favorite books in one place. This platform is
          built with Next.js, TypeScript, Tailwind CSS, and Relay.
        </p>

        <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
          Explore the collection, add books to your cart or favourites, and
          enjoy a fast and elegant reading journey.
        </p>
      </div>
    </main>
  );
}
