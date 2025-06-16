import { test, expect } from "@playwright/test";

test("should allow user to login", async ({ page }) => {
  // Navigate to login page
  await page.goto("/login");

  // Fill in credentials
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("Test@1234");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Expect redirect to homepage
  await expect(page).toHaveURL("/books");

  // Assert user-specific UI
  await expect(page.locator("text=Logout")).toBeVisible();
});

test("should NOT allow unregistered user to login", async ({ page }) => {
  // Navigate to login page
  await page.goto("/login");

  // Fill in invalid credentials
  await page.getByPlaceholder("Username").fill("nonexistent_user");
  await page.getByPlaceholder("Password").fill("WrongPass@123");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Stay on login page
  await expect(page).toHaveURL("/login");

  // Assert error message is shown
  await expect(page.locator("text=Invalid username or password")).toBeVisible();

  // Assert Logout button is NOT visible
  await expect(page.locator("text=Logout")).toHaveCount(0);
});
