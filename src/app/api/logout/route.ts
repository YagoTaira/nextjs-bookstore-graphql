import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    maxAge: 0, // expire it immediately
  });

  return response;
}
