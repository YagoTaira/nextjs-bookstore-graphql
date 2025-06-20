import { Types } from "mongoose";

export interface BookType {
  _id: Types.ObjectId;
  title: string;
  author: string;
  description?: string;
  price: number;
  imageUrl?: string;
}
