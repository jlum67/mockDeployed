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

/**
 * Tests that we can change the mode between verbose and brief on brief mode
 */
test("on clicking the mode, I can change it to 'verbose'", async ({ page }) => {
  await expect(page.getByLabel("Mode-Header")).toBeVisible();
  await expect(page.getByLabel("Mode")).toContainText(["Brief"]);
  await page.getByLabel("Mode", { exact: true }).click();
  await expect(page.getByLabel("Mode")).toContainText(["Verbose"]);
  await page.getByLabel("Mode", { exact: true }).click();
  await expect(page.getByLabel("Mode")).toContainText(["Brief"]);
});

/**
 * Tests that we get an error with empty commands on brief mode
 */
test("on brief mode, I get an error with an undefined command", async ({
  page,
}) => {
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible();
});

/**
 * Tests that we can load a file with headers on brief mode
 */
test("on brief mode, I get a success message when loading a file with headers", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file without headers on brief mode
 */
test("on brief mode, I get a success message when loading a file without headers", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();
});

/**
 * Tests that we can load a file with one column on brief mode
 */
test("on brief mode, I get a success message when loading a file with one column", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneCol successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file with one row on brief mode
 */
test("on brief mode, I get a success message when loading a file with one row", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneRow");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneRow successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file with one cell on brief mode
 */
test("on brief mode, I get a success message when loading a file with one cell", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load an empty file on brief mode
 */
test("on brief mode, I get a success message when loading an empty file", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("empty successfully loaded!")).toBeVisible();
});

/**
 * Tests that we get an error when loading invalid files on brief mode
 */
test("on brief mode, I get an error when loading an invalid file", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file asdf");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Failed to load file.")).toBeVisible();
});

/**
 * Tests that we get an error message for invalid commands on brief mode
 */
test("on brief mode, I get an error message when inputting an incorrect command", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello world");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible();
});

/**
 * Tests that we get an error with empty commands on verbose mode
 */
test("on verbose mode, I get an error with an undefined command", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible();
});

/**
 * Tests that we can load a file with headers on verbose mode
 */
test("on verbose mode, I get a success message when loading a file with headers", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file file1")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file without headers on verbose mode
 */
test("on verbose mode, I get a success message when loading a file without headers", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file file1noheaders")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();
});

/**
 * Tests that we can load a file with one column on verbose mode
 */
test("on verbose mode, I get a success message when loading a file with one column", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file oneCol")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("oneCol successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file with one row on verbose mode
 */
test("on verbose mode, I get a success message when loading a file with one row", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneRow");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file oneRow")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("oneRow successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load a file with one cell on verbose mode
 */
test("on verbose mode, I get a success message when loading a file with one cell", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file oneItem")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
});

/**
 * Tests that we can load an empty file on verbose mode
 */
test("on verbose mode, I get a success message when loading an empty file", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file empty")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("empty successfully loaded!")).toBeVisible();
});

/**
 * Tests that we get an error when loading invalid files on verbose mode
 */
test("on verbose mode, I get an error when loading an invalid file", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file asdf");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("load_file asdf")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("Failed to load file.")).toBeVisible();
});

/**
 * Tests that we get an error message for invalid commands on verbose mode
 */
test("on verbose mode, I get an error message when inputting an incorrect command", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello world");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("hello world")).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(page.getByText("Unknown command was inputted.")).toBeVisible();
});

test("on brief mode, we can make consecutive calls to load", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
});

test("on verbose mode, we can make consecutive calls to load", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(0)).toBeVisible();
  await expect(page.getByText("load_file file1")).toBeVisible();
  await expect(page.getByText("Output:").nth(0)).toBeVisible();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(1)).toBeVisible();
  await expect(page.getByText("load_file file1noheaders")).toBeVisible();
  await expect(page.getByText("Output:").nth(1)).toBeVisible();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(2)).toBeVisible();
  await expect(page.getByText("load_file oneItem")).toBeVisible();
  await expect(page.getByText("Output:").nth(2)).toBeVisible();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
});
