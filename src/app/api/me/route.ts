import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getUserFromRequest } from "@/lib/getUser";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error in /api/me:", err);
    return NextResponse.json(
      { user: null, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
