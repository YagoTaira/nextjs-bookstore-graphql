import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserFromRequest(
  req: NextRequest
): Promise<{ id: string; role: string } | null> {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}
