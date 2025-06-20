import { Schema, models, model } from "mongoose";
import type { BookType } from "@/models/models";

const bookSchema = new Schema<BookType>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
});

export const Book = models.Book || model<BookType>("Book", bookSchema);
