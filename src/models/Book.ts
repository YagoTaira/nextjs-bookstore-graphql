import mongoose, { Schema, models, model } from "mongoose";

const bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  price: Number,
  imageUrl: String,
});

export const Book = models.Book || model("Book", bookSchema);
