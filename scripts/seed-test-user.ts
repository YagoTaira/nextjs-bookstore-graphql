import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { User } from "../src/models/User";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Remove old test users
  await User.deleteMany({ username: /^testuser/ });
  await User.deleteMany({ username: /^admintest/ });

  // Create admin test user
  const hashAdminPass = await bcrypt.hash("Admin@1234", 10);
  const userAdmin = new User({
    username: "admintest",
    password: hashAdminPass,
    role: "admin",
  });

  // Create test user
  const hashPassword = await bcrypt.hash("Test@1234", 10);
  const user = new User({
    username: "testuser",
    password: hashPassword,
    role: "user",
  });

  await userAdmin.save();
  await user.save();
  console.log("👤 Admin test user created:", userAdmin.username);
  console.log("👤 Test user created:", user.username);

  await mongoose.disconnect();
  console.log("✅ Disconnected from MongoDB");
};

seed().catch((err) => {
  console.error("❌ Error seeding test user:", err);
  process.exit(1);
});
