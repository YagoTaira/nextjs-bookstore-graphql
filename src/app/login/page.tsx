"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const errorMessage = await login(form.username, form.password);

    if (errorMessage) {
      setError(errorMessage);
      setLoading(false);
      return;
    }

    router.push("/books");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 text-gray-800 dark:text-white flex justify-center pt-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md w-full h-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
        />

        {error && (
          <p className="text-sm text-red-600 text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
