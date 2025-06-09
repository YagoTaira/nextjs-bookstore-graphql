import { test, expect } from "@playwright/test";

test("admin can add a book to favourites and view it", async ({ page }) => {
  // Go to login page and log in
  await page.goto("/login");
  await page.getByPlaceholder("Username").fill("admintest");
  await page.getByPlaceholder("Password").fill("Admin@1234");
  await page.getByRole("button", { name: "Login" }).click();

  // Go to the Books page
  await page.getByRole("link", { name: "Books", exact: true }).click();

  // Locate the correct book card
  const bookCard = page.locator("h2", { hasText: "Clean Code" }).first();
  const cardContainer = bookCard.locator("..").locator("..");

  // Click on "View Details" inside that book card
  await cardContainer.getByRole("link", { name: "View Details →" }).click();

  // On the details page, add the book to favourites
  await page.getByRole("button", { name: "Add to Favourites" }).click();

  // Navigate to the Favourites page
  await page.getByRole("link", { name: "Favourites" }).click();

  // Assert that the book appears there
  await expect(page.getByRole("heading", { name: "Clean Code" })).toBeVisible();
});
