import { test, expect } from "@playwright/test";

test("should allow user to register", async ({ page }) => {
  const timestamp = Date.now(); // To ensure a unique user each test
  const testUsername = `user${timestamp}`;
  const testPassword = `Test@${timestamp}`;

  // Go to registration page
  await page.goto("/register");

  // Fill out the form
  await page.getByPlaceholder("Username").fill(testUsername);
  await page.getByPlaceholder("Password").nth(0).fill(testPassword);
  await page.getByPlaceholder("Confirm Password").fill(testPassword);

  // Submit the form
  await page.getByRole("button", { name: "Register" }).click();

  // Expect redirect to login page
  await expect(page).toHaveURL(/.*\/login/);

  // Confirm login page rendered
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
