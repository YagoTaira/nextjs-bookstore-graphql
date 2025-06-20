import { BookType } from "@/models/models";

export type BookGQL = {
  id: string;
  _id?: string;
  title: string;
  author: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
};

export type CartItemGQL = BookGQL & {
  quantity: number;
};

export type BookWithId = BookType & { _id: string };
