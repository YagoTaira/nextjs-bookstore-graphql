"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  username: string;
  role: "admin" | "user";
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status !== 401) {
            //console.error("Unexpected error in /api/me", res.status);
          }
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        //console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setUser(null);
          return "Invalid username or password";
        }

        setUser(data.user);
        router.refresh();
        router.push("/books");
        return null;
      } catch {
        return "An unexpected error occurred";
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout", {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // Ignore logout errors
    } finally {
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      logout,
      loading,
    }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
