import { test, expect } from "@playwright/test";
import mockedJson from "../src/modules/mockedJson";


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
 * Tests for proper output when too many arguments used for search.
 */
test("too many arguments input for search", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hi hi hi");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Improper arguments used.")).toBeVisible;
});

/**
 * Tests for proper output when too few arguments used for search.
 */
test("too few arguments input for search", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Improper arguments used.")).toBeVisible;
});

/**
 * Tests when search is called before load.
 */
test("load not used before calling search", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hi hi");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No file loaded.")).toBeVisible;
});

/**
 * Tests when search is called with no column name/index specified.
 */
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

/**
 * Tests when search is called with column name specified.
 */
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

/**
 * Tests when search is called with column index specified.
 */
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
});

/**
 * Tests when search is called multiple times after loading.
 */
test("load once, search multiple times", async ({ page }) => {
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

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state de");
  await page.getByRole("button", { name: "Submit" }).click();

  const rowValues2: string[] = [
    "DE",
    '" $1,058.47 "',
    "395773.6521",
    " $1.00 ",
    "75%",
    "White",
  ];

  for (let i = 0; i < rowValues2.length; i++) {
    await expect(page.getByText(rowValues2[i])).toBeVisible;
  }

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hispanic");
  await page.getByRole("button", { name: "Submit" }).click();

  const rowValues3: string[] = [
    "RI",
    "Hispanic/Latino",
    "$673.14",
    "74596.18851",
    "$0.64",
    "14%",
  ];

  for (let i = 0; i < rowValues3.length; i++) {
    await expect(page.getByText(rowValues3[i])).toBeVisible;
  }

  const rowValues4: string[] = [
    "RI",
    "Multiracial",
    " Hispanic ",
    "8883.049171",
    " $0.92 ",
    "2%",
  ];

  for (let i = 0; i < rowValues4.length; i++) {
    await expect(page.getByText(rowValues4[i])).toBeVisible;
  }
});

/**
 * Tests when search is called with valid input (no column name or index provided) but value to find does not exist.
 */
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

/**
 * Tests when search is called with valid input (column name provided) but value to find does not exist.
 */
test("searching valid inputs but nothing found - column name", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state jeremy");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found.")).toBeVisible;
  
});

/**
 * Tests when search is called with valid input (column index provided) but value to find does not exist.
 */
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

/**
 * Tests when load is called and search results update properly.
 */
test("change load, see if search updates properly", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search herro");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("herro")).toBeVisible;

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

/**
 * Tests when search is called on empty file.
 */
test("searching empty file", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search jeremy");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found."))
    .toBeVisible;
});

/**
 * Tests when search is called on one item table. Also tests successive searching.
 */
test("searching one item table and search multiple times", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search herro");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("herro")).toBeVisible;

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search jeremy");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Search request could not be found."))
      .toBeVisible;
});

/**
 * Tests when search is called on one column table.
 */
test("searching one col file", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search white");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("white"))
    .toBeVisible;

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search jerm");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found."))
    .toBeVisible;
});

/**
 * Tests when search is called on one row table.
 */
test("searching one row file", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneRow");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search white");
  await page.getByRole("button", { name: "Submit" }).click();

  const rowValues: string[] = [
    "RI",
    "White",
    '" $1,058.47 "',
    "395773.6521",
    " $1.00 ",
    "75%",
  ];

  for (let i = 0; i < rowValues.length; i++) {
    await expect(page.getByText(rowValues[i])).toBeVisible;
  }

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search hi");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Search request could not be found."))
    .toBeVisible;
});

/**
 * Tests that load, view, and search interact properly.
 */
test("testing load, search, view interactions", async ({ page }) => {

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("file1").data.headers;
  const body = mockedJson("file1").data.body;

  for (let i = 0; i < headers.length; i++) {
    await expect(page.getByText(headers[i], { exact: true })).toBeVisible();
  }

  for (let j = 0; j < body.length; j++) {
    for (let k = 0; k < body[j].length; k++) {
      const elt = page.getByText(body[j][k], { exact: true });
      const count = await elt.count();
      if (count > 1) {
        for (let l = 0; l < count; l++) {
          await expect(elt.nth(l)).toBeVisible();
        }
      } else {
        await expect(elt).toBeVisible();
      }
    }
  }

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

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();
});

/**
 * Tests that verbosity works properly (brief mode is used in other testing).
 */
test("testing verbosity (brief is used in all other tests)", async ({ page }) => {
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

  await page.getByLabel("Mode", { exact: true }).click();
  await expect(page.getByText("output")).toBeVisible;
  await expect(page.getByText("command")).toBeVisible;
});
