import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

/**
 * Test suite for the App
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  await page.goto("http://localhost:8000/");
});

/**
 * Check that an input exists
 */
test("on page load, i see an input bar", async ({ page }) => {
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * Check that the input box changes when you type in it
 */
test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

/**
 * Check that a header exists
 */
test("on page load, i see a header", async ({ page }) => {
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByRole("heading")).toBeVisible();
  await expect(page.getByRole("heading")).toBeVisible();
});

/**
 * Check that a Mode element exists and that it's set to "Brief"
 */
test("on page load, I see the mode is set to 'brief'", async ({ page }) => {
  await expect(page.getByLabel("Mode-Header")).toBeVisible;
  await expect(page.getByLabel("Mode")).toContainText(["Brief"]);
});
