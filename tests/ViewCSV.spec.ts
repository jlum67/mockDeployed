import { test, expect } from "@playwright/test";
import { mockedJson} from mockedJson;

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

test("on brief mode, I can load and view a file with headers", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible;
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  const headers = mockedJson("file1").data.headers;
  const body = mockedJson("file1").data.body;

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }
});

test("on brief mode, I can load and view a file without headers", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible;
});