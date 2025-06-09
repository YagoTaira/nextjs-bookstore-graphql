import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  await connectToDatabase();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = username === process.env.ADMIN_USERNAME ? "admin" : "user";

  const user = await User.create({ username, password: hashedPassword, role });

  return NextResponse.json(
    {
      message: "User created",
      user: { username: user.username, role: user.role },
    },
    { status: 201 }
  );
}
