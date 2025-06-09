"use client";

import { useEffect, useState } from "react";
import { useQueryLoader } from "react-relay/hooks";
import { bookListQuery } from "@/queries/BookListQuery";
import type { BookListQuery } from "@/queries/__generated__/BookListQuery.graphql";
import { BookList } from "@/components/BookList";
import { withAuthProtection } from "@/context/withAuthProtection";
import { useSearchParams } from "next/navigation";

function BooksPage() {
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");
  const [queryRef, loadQuery] = useQueryLoader<BookListQuery>(bookListQuery);

  useEffect(() => {
    loadQuery({}, { fetchPolicy: "network-only" });
  }, [refresh, loadQuery]);

  if (!queryRef) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">
          Loading books...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-6 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        📚 Your Book Collection
      </h1>

      <BookList queryRef={queryRef} />
    </main>
  );
}

export default withAuthProtection(BooksPage);
