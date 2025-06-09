import { connectToDatabase } from "@/lib/db";
import { Book } from "@/models/Book";

export const resolvers = {
  Query: {
    books: async () => {
      await connectToDatabase();
      return await Book.find({});
    },

    book: async (_: any, { id }: { id: string }) => {
      await connectToDatabase();
      try {
        const book = await Book.findById(id);
        if (!book) {
          throw new Error("Book not found");
        }
        return book;
      } catch (err) {
        console.error("Error fetching book:", err);
        throw new Error("Failed to fetch book");
      }
    },
  },

  Mutation: {
    addBook: async (_: any, { input }: { input: any }) => {
      await connectToDatabase();
      try {
        const newBook = new Book(input);
        await newBook.save();
        return newBook;
      } catch (err) {
        console.error("Error adding book:", err);
        throw new Error("Failed to add book");
      }
    },

    deleteBook: async (_: any, { id }: { id: string }) => {
      await connectToDatabase();
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error("Book not found");
        }
        return deletedBook;
      } catch (err) {
        console.error("Error deleting book:", err);
        throw new Error("Failed to delete book");
      }
    },
  },

  Book: {
    id: (parent: any) => parent._id.toString(),
  },
};
