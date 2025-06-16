import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { username } = await req.json();
  await connectToDatabase();

  await User.deleteOne({ username });
  return NextResponse.json({ message: "User deleted" });
}
