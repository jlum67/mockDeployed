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

    const rowValues: string[] = [
      "RI",
      "Hispanic/Latino",
      "$673.14",
      "74596.18851",
      "$0.64",
      "14%",
    ];

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }

  const rowValues2: string[] = [
    "RI",
    "Multiracial",
    " Hispanic ",
    "8883.049171",
    " $0.92 ",
    "2%",
  ];

  for (let i = 0; i < rowValues2.length; i++) {
    await expect(page.getByText(rowValues2[i])).toBeVisible;
  }
});

test("searching with column name provided", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state de");
  await page.getByRole("button", { name: "Submit" }).click();

  const rowValues: string[] = [
    "DE",
    '" $1,058.47 "',
    "395773.6521",
    " $1.00 ",
    "75%",
    "White",
  ];

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }
});

test("searching with column index provided", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 multiracial");
  await page.getByRole("button", { name: "Submit" }).click();

  const rowValues: string[] = [
    "RI",
    "Multiracial",
    " Hispanic ",
    "8883.049171",
    " $0.92 ",
    "2%",
  ];

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }
});

test("searching valid inputs but nothing found - column and index not provided", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search jeremy");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found."))
    .toBeVisible;
});

test("searching valid inputs but nothing found - column name", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state jeremy");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found.")).toBeVisible;
  
});

test("searching valid inputs but nothing found - column index", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 2 jeremy");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found."))
    .toBeVisible;
});

