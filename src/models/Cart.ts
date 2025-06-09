import mongoose, { Schema, model, models } from "mongoose";
import "@/models/Book";

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
});

export const Cart = models.Cart || model("Cart", cartSchema);
