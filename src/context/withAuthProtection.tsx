"use client";

import { useAuth } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ComponentType } from "react";

export function withAuthProtection<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  return function ProtectedComponent(props: P) {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !isLoggedIn && pathname !== "/login") {
        router.push("/login");
      }
    }, [loading, isLoggedIn, pathname, router]);

    if (loading || !isLoggedIn) {
      return (
        <div className="text-center py-20 text-gray-600 dark:text-gray-400">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
