import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Favourite } from "@/models/Favourite";
import { getUserFromRequest } from "@/lib/getUser";
import { Book } from "@/models/Book";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const favourites = await Favourite.find({ userId: user.id }).populate(
    "bookId"
  );
  // Return only valid books
  const validBooks = favourites.map((f) => f.bookId).filter((b) => b !== null); // remove nulls from deleted books

  return Response.json({ favourites: validBooks });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId } = await req.json();
  const existing = await Favourite.findOne({ userId: user.id, bookId });

  if (existing)
    return NextResponse.json(
      { message: "Already favourited" },
      { status: 200 }
    );

  const fav = await Favourite.create({ userId: user.id, bookId });
  return NextResponse.json(fav);
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const user = await getUserFromRequest(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId } = await req.json();
  await Favourite.deleteOne({ userId: user.id, bookId });

  return NextResponse.json({ message: "Removed from favourites" });
}
