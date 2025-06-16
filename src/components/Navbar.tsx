"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, isLoggedIn, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Bookstore 📚
        </Link>

        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/books"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Books
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin/add-book"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  New Book
                </Link>
              )}
              <Link
                href="/favourites"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Favourites
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </Link>
              <Link
                href="/cart"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                🛒 Cart
              </Link>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
