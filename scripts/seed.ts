import mongoose from "mongoose";
import { Book } from "../src/models/Book";
import "dotenv/config";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";

const books = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    description:
      "A timeless guide offering practical advice for becoming a more effective and adaptable programmer...",
    price: 32.99,
    imageUrl: "/images/book1.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A foundational book on writing clean, readable, and maintainable code...",
    price: 27.5,
    imageUrl: "/images/book2.jpg",
  },
  {
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    description:
      "An eye-opening deep dive into the inner workings of JavaScript...",
    price: 21.95,
    imageUrl: "/images/book3.jpg",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "A comprehensive catalog of refactoring techniques aimed at improving existing code structure...",
    price: 34.0,
    imageUrl: "/images/book4.jpg",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    description:
      "A landmark book that introduced the 'Gang of Four' design patterns...",
    price: 38.45,
    imageUrl: "/images/book5.jpg",
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, and Stein",
    description:
      "One of the most widely used academic textbooks on algorithms...",
    price: 49.99,
    imageUrl: "/images/book6.jpg",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description:
      "A concise yet powerful book that identifies the elegant features of JavaScript...",
    price: 19.99,
    imageUrl: "/images/book7.jpg",
  },
  {
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    description:
      "Essential reading for anyone maintaining or refactoring legacy codebases...",
    price: 28.99,
    imageUrl: "/images/book8.jpg",
  },
  {
    title: "The Clean Coder",
    author: "Robert C. Martin",
    description:
      "A practical guide on how to behave as a professional programmer...",
    price: 25.0,
    imageUrl: "/images/book9.jpg",
  },
  {
    title: "Soft Skills",
    author: "John Sonmez",
    description:
      "A complete life guide for software developers, covering career and personal growth...",
    price: 23.45,
    imageUrl: "/images/book10.jpg",
  },
  {
    title: "Continuous Delivery",
    author: "Jez Humble & David Farley",
    description:
      "A comprehensive manual for building, testing, and releasing software rapidly and reliably...",
    price: 35.5,
    imageUrl: "/images/book11.jpg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    description:
      "A beautifully written and illustrated introduction to JavaScript and programming fundamentals...",
    price: 22.95,
    imageUrl: "/images/book12.jpg",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Book.deleteMany({});
    console.log("🗑️  Old books deleted");

    await Book.insertMany(books);
    console.log(`📚 ${books.length} books inserted`);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding the database:", err);
    process.exit(1);
  }
}

seed();
