export type Book = {
  id: any;
  _id?: string;
  title: string;
  author: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
};
