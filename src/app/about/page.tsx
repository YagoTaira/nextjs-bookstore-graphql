"use client";

import { withAuthProtection } from "@/context/withAuthProtection";

function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-20 text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About the Developer</h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          This app was built as a personal project to explore the power of
          modern web technologies. It demonstrates how to build fast, scalable,
          and interactive web apps with minimal setup.
        </p>
        <p className="mt-6 text-md text-gray-600 dark:text-gray-400">
          Feel free to fork the project, learn from it, and build your own
          custom bookstore or adapt it for any other collection-based platform.
        </p>
      </div>
    </main>
  );
}

export default withAuthProtection(AboutPage);
