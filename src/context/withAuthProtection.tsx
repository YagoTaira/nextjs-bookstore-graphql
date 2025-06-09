"use client";

import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, type ComponentType } from "react";

export function withAuthProtection<P extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  return function ProtectedComponent(props: P) {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isLoggedIn) {
        router.push("/login");
      }
    }, [loading, isLoggedIn, router]);

    if (loading || !isLoggedIn) return null;

    return <WrappedComponent {...props} />;
  };
}
