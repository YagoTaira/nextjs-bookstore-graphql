import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function ensureAdminUserExists() {
  const adminUsername = process.env.ADMIN_USERNAME!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const testAdminUsername = process.env.TEST_ADMIN_USERNAME!;
  const testAdminPassword = process.env.TEST_ADMIN_PASSWORD!;

  // Ensure main admin exists
  const existingAdmin = await User.findOne({ username: adminUsername });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: adminUsername,
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin user created");
  }
}
