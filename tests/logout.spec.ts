import { test, expect } from "@playwright/test";

test("should log out the user", async ({ page }) => {
  // Navigate to login page
  await page.goto("/login");

  // Fill in credentials
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("Test@1234");

  // Click login button
  await page.getByRole("button", { name: "Login" }).click();

  // Expect redirect to homepage
  await expect(page).toHaveURL("/");

  // Assert user-specific UI
  await expect(page.locator("text=Logout")).toBeVisible();

  // Click logout
  await page.getByRole("button", { name: "Logout" }).click();

  // Expect redirect to login or public homepage
  await expect(page).toHaveURL("/login");
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
