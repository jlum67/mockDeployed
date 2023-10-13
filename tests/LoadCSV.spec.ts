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

test("on clicking the mode, I can change it to 'verbose'", async ({ page }) => {
  await expect(page.getByLabel("Mode-Header")).toBeVisible();
  await expect(page.getByLabel("Mode")).toContainText(["Brief"]);
  await page.getByLabel("Mode", { exact: true }).click();
  await expect(page.getByLabel("Mode")).toContainText(["Verbose"]);
});

test("on brief mode, I get an error with an undefined command", async ({
  page,
}) => {
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible();
});

test("on brief mode, I get a success message when loading a file", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible;
});

test("on brief mode, I get an error when loading an invalid file", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file asdf");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Failed to load file.")).toBeVisible;
});

test("on brief mode, I get an error message when inputting an incorrect command", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello world");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible;
});

test("on verbose mode, I get an error with an undefined command", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:")).toBeVisible;
  await expect(page.getByText("Output:")).toBeVisible;
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible;
});

test("on verbose mode, I get a success message when loading a file", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:")).toBeVisible;
  await expect(page.getByText("load_file file1")).toBeVisible;
  await expect(page.getByText("Output:")).toBeVisible;
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible;
});

test("on verbose mode, I get an error when loading an invalid file", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file asdf");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:")).toBeVisible;
  await expect(page.getByText("load_file asdf")).toBeVisible;
  await expect(page.getByText("Output:")).toBeVisible;
  await expect(page.getByText("Failed to load file.")).toBeVisible;
});

test("on verbose mode, I get an error message when inputting an incorrect command", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello world");
  await expect(page.getByText("Command:")).toBeVisible;
  await expect(page.getByText("hello world")).toBeVisible;
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Output:")).toBeVisible;
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible;
});
