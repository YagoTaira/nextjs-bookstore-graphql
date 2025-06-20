import { connectToDatabase } from "@/lib/db";
import { Book } from "@/models/Book";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDatabase();

    const { title, author, description, price, imageUrl } = req.body;

    if (!title || !author || typeof price !== "number") {
      return res
        .status(400)
        .json({ message: "Missing or invalid required fields." });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      price,
      imageUrl,
    });

    return res.status(201).json(newBook);
  } catch {
    //console.error("Error creating book:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
