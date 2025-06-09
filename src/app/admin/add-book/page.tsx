"use client";

import { withAuthProtection } from "@/context/withAuthProtection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AddBookForm } from "@/components/AddBookForm";
import { useEffect } from "react";

function AddBookPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (user === null) {
    return <p>Loading...</p>;
  }

  if (user.role !== "admin") {
    return null;
  }

  return (
    <main className="min-h-screen py-10 px-6 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📘 Add a New Book</h1>
      <div className="max-w-xl mx-auto">
        <AddBookForm
          onBookAdded={() => {
            router.refresh();
            router.push("/books");
          }}
        />
      </div>
    </main>
  );
}

export default withAuthProtection(AddBookPage);
