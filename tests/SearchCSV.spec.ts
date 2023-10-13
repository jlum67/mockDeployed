import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
  await page.goto("http://localhost:8000/");
});

//improper argument, no file loaded, different search combos, different modes, search could not be found
test("too many arguments input for search", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hi hi hi");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Improper arguments used.")).toBeVisible;
});

test("load not used before calling search", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hi hi");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No file loaded.")).toBeVisible;
});

test("searching with no column name or index input", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hispanic");
  await page.getByRole("button", { name: "Submit" }).click();

  //   const rowValues: string[] = [
  //     "RI",
  //     "Hispanic/Latino",
  //     "$673.14",
  //     "74596.18851",
  //     "$0.64",
  //     "14%",
  //   ];

  const rowValues: string[] = ["Hispanic/Latino"];

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }
});
