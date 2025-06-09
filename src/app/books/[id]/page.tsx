"use client";

import { useEffect, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookDetail } from "@/components/BookDetail";
import { loadQuery } from "react-relay/hooks";
import { RelayEnvironment } from "@/lib/relay/RelayEnvironment";
import { bookDetailQuery } from "@/queries/BookDetailQuery";
import type { BookDetailQuery } from "@/queries/__generated__/BookDetailQuery.graphql";

type Props = {
  params: Promise<{ id: string }>;
};

export default function BookDetailPage({ params }: Props) {
  const { id } = use(params);

  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  const queryRef = useMemo(
    () => loadQuery<BookDetailQuery>(RelayEnvironment, bookDetailQuery, { id }),
    [id]
  );

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading || !isLoggedIn) return null;

  return <BookDetail queryRef={queryRef} />;
}
