import { connectToDatabase } from "@/lib/db";
import { Book } from "@/models/Book";
import { BookType } from "@/models/models";
import { BookWithId } from "./types";

export const resolvers = {
  Query: {
    books: async () => {
      await connectToDatabase();
      return await Book.find({});
    },

    book: async (_: BookType, { id }: { id: string }) => {
      await connectToDatabase();
      try {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error("Book not found");
        }
        return book;
      } catch {
        //console.error("Error fetching book:", err);
        throw new Error("Failed to fetch book");
      }
    },
  },

  Mutation: {
    addBook: async (_: BookType, { input }: { input: BookType }) => {
      await connectToDatabase();
      try {
        const newBook = new Book(input);
        await newBook.save();
        return newBook;
      } catch {
        //console.error("Error adding book:", err);
        throw new Error("Failed to add book");
      }
    },

    deleteBook: async (_: BookType, { id }: { id: string }) => {
      await connectToDatabase();
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error("Book not found");
        }
        return deletedBook;
      } catch {
        //console.error("Error deleting book:", err);
        throw new Error("Failed to delete book");
      }
    },
  },

  Book: {
    id: (parent: BookWithId) => parent._id.toString(),
  },
};
