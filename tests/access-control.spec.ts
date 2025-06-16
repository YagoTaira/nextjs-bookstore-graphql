import { test, expect } from "@playwright/test";

// Test 1: Non-admin user cannot access /add-book
// You must have a seed user set up without admin rights

test("non-admin user should be redirected when accessing /admin/add-book", async ({
  page,
}) => {
  // Navigate to login page
  await page.goto("/login");

  // Fill in credentials
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("Test@1234");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Expect redirect to homepage
  await expect(page).toHaveURL("/books");

  // Try accessing the admin-only route
  await page.goto("/admin/add-book");

  // Assert New Book is NOT visible
  const newBookLink = page.getByRole("link", { name: "New Book" });
  await expect(newBookLink).toHaveCount(0);

  // Assert user-specific UI
  await expect(page.locator("text=Logout")).toBeVisible();
});

// Test 2: Unauthorized user (not logged in) is redirected from /books

test("unauthenticated user should be redirected from /books", async ({
  page,
}) => {
  await page.goto("/books");
  await expect(page).not.toHaveURL("/books");
  await expect(page).toHaveURL("/login");
});

// Test 3: Unauthenticated user is redirected from /favourites

test("unauthenticated user should be redirected from /favourites", async ({
  page,
}) => {
  await page.goto("/favourites");
  await expect(page).not.toHaveURL("/favourites");
  await expect(page).toHaveURL("/login");
});

// Test 4: "Add Book" button is visible only to admins

test("add book button is only visible to admin", async ({ page }) => {
  // Login as admin
  // Navigate to login page
  await page.goto("/login");

  // Fill in credentials
  await page.getByPlaceholder("Username").fill("admintest");
  await page.getByPlaceholder("Password").fill("Admin@1234");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Expect redirect to homepage
  await expect(page).toHaveURL("/books");

  // Wait for the navbar to load
  await expect(page.locator("nav")).toBeVisible();

  // Assert New Book is visible for admin
  const newBookLinkVisible = page.getByRole("link", { name: "New Book" });
  await expect(newBookLinkVisible).toHaveCount(1);

  // Logout
  await page.getByRole("button", { name: "Logout" }).click();

  // Login as regular user
  await page.goto("/login");
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("Test@1234");
  await page.getByRole("button", { name: "Login" }).click();

  // Go to homepage again
  await page.goto("/");
  await expect(page.locator("nav")).toBeVisible();

  // Assert New Book is NOT visible for user
  const newBookLinkNotVisible = page.getByRole("link", { name: "New Book" });
  await expect(newBookLinkNotVisible).toHaveCount(0);
});
