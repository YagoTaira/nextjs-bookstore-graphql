import { test, expect } from "@playwright/test";

test("admin can add a new book", async ({ page }) => {
  // Login as admin
  await page.goto("/login");
  await page.getByPlaceholder("Username").fill("admintest");
  await page.getByPlaceholder("Password").fill("Admin@1234");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("link", { name: "New Book" })).toBeVisible();

  // Go to add-book page
  await page.goto("/admin/add-book");

  // Fill the form using placeholder-based selectors
  await page.getByPlaceholder("Book Title").fill("Test Book");
  await page.getByPlaceholder("Author Name").fill("Test Author");
  await page
    .getByPlaceholder("Optional description...")
    .fill("A test book description.");
  await page.getByPlaceholder("e.g.,").fill("9.99");

  // Upload image
  await page.setInputFiles('input[type="file"]', "public/images/book1.jpg");

  // Submit the form
  await page.getByRole("button", { name: "Add Book" }).click();

  // Wait for redirect and assert heading
  await expect(
    page.getByRole("heading", { name: "📚 Your Book Collection" })
  ).toBeVisible();

  // Navigate to /books explicitly if needed
  await page.goto("/books");

  // Assert that the new book is listed
  await expect(
    page.getByRole("heading", { name: "Test Book" }).first()
  ).toBeVisible();

  await expect(page.locator("text=Test Author").first()).toBeVisible();
});
