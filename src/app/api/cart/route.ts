import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Cart } from "@/models/Cart";
import { getUserFromRequest } from "@/lib/getUser";
import { BookType } from "@/models/models";
import { CartItemGQL } from "@/graphql/types";
import { CartItemInput } from "@/graphql/types";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cart = await Cart.findOne({ userId: user.id }).populate("items.bookId");

  if (!cart || !cart.items) {
    return NextResponse.json({ items: [] });
  }

  const items = cart.items
    .filter((item: { bookId: BookType }) => item.bookId)
    .map(
      (item: {
        bookId: { toObject: () => BookType };
        quantity: CartItemGQL;
      }) => {
        const book =
          typeof item.bookId.toObject === "function"
            ? item.bookId.toObject()
            : item.bookId;

        return {
          ...book,
          quantity: item.quantity,
        };
      }
    );

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();

  const normalizedItems = items.map((item: CartItemInput) => ({
    bookId: item.bookId,
    quantity: item.quantity,
  }));

  await Cart.findOneAndUpdate(
    { userId: user.id },
    { items: normalizedItems },
    { upsert: true, new: true }
  );

  return NextResponse.json({ message: "Cart updated" });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await Cart.deleteOne({ userId: user.id });

  return NextResponse.json({ message: "Cart cleared" });
}
