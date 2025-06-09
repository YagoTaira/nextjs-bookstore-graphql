import mongoose, { Schema, model, models } from "mongoose";
import "@/models/Book";

const favouriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
});

export const Favourite =
  models.Favourite || model("Favourite", favouriteSchema);
