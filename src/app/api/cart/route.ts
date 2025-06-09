import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Cart } from "@/models/Cart";
import { getUserFromRequest } from "@/lib/getUser";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await Cart.findOne({ userId: user.id }).populate("items.bookId");
  return NextResponse.json({ cart });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();

  const updatedCart = await Cart.findOneAndUpdate(
    { userId: user.id },
    { items },
    { upsert: true, new: true }
  );

  return NextResponse.json({ cart: updatedCart });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await Cart.deleteOne({ userId: user.id });
  return NextResponse.json({ message: "Cart cleared" });
}
