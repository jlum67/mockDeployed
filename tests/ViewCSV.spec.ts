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
 * Tests that we can load and view a file with headers in brief mode
 */
test("on brief mode, I can load and view a file with headers", async ({
  page,
}) => {
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
    await expect(page.getByText(headers[i], { exact: true }).isVisible)
      .toBeTruthy;
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
});

/**
 * Tests that we can load and view a file without headers on verbose mode
 */
test("on brief mode, I can load and view a file without headers", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("file1noheaders").data.headers;
  const body = mockedJson("file1noheaders").data.body;

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
});

/**
 * Tests that we can load and view a file with one row on brief mode
 */
test("on brief mode, I can load and view a file with one row", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneRow");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneRow successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("oneRow").data.headers;
  const body = mockedJson("oneRow").data.body;

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
});

/**
 * Tests that we can load and view a file with one column on brief mode
 */
test("on brief mode, I can load and view a file with one column", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneCol successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("oneCol").data.headers;
  const body = mockedJson("oneCol").data.body;

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
});

/**
 * Tests that we can load and view a file with one cell on brief mode
 */
test("on brief mode, I can load and view a file with one cell", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("oneItem").data.headers;
  const body = mockedJson("oneItem").data.body;

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
});

/**
 * Tests that we can load and view an empty file on brief mode
 */
test("on brief mode, I can load and view an empty file", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();
  expect(
    page.getByText("empty successfully loaded!", { exact: true })
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers = mockedJson("empty").data.headers;
  const body = mockedJson("empty").data.body;

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
});

/**
 * Tests that we get an error when trying to view a file without loading
 * anything on brief mode
 */
test("on brief mode, I get an error when I try to view a file without loading anything", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No file loaded.", { exact: true })
  ).toBeVisible();
});

/**
 * Tests that we can load and view a file with headers in verbose mode
 */
test("on verbose mode, I can load and view a file with headers", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("file1").data.headers;
  const body = mockedJson("file1").data.body;

  for (let i = 0; i < headers.length; i++) {
    await expect(page.getByText(headers[i], { exact: true }).isVisible)
      .toBeTruthy;
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
});

/**
 * Tests that we can load and view a file without headers on verbose mode
 */
test("on verbose mode, I can load and view a file without headers", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("file1noheaders").data.headers;
  const body = mockedJson("file1noheaders").data.body;

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
});

/**
 * Tests that we can load and view a file with one row on verbose mode
 */
test("on verbose mode, I can load and view a file with one row", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneRow");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneRow successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("oneRow").data.headers;
  const body = mockedJson("oneRow").data.body;

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
});

/**
 * Tests that we can load and view a file with one column on verbose mode
 */
test("on verbose mode, I can load and view a file with one column", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneCol");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneCol successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("oneCol").data.headers;
  const body = mockedJson("oneCol").data.body;

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
});

/**
 * Tests that we can load and view a file with one cell on verbose mode
 */
test("on verbose mode, I can load and view a file with one cell", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("oneItem").data.headers;
  const body = mockedJson("oneItem").data.body;

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
});

/**
 * Tests that we can load and view an empty file on verbose mode
 */
test("on verbose mode, I can load and view an empty file", async ({ page }) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();
  expect(
    page.getByText("empty successfully loaded!", { exact: true })
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // for load command
  await expect(
    page.getByText("Command:", { exact: true }).nth(0)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(0)).toBeVisible();

  // for view command
  await expect(
    page.getByText("Command:", { exact: true }).nth(1)
  ).toBeVisible();
  await expect(page.getByText("Output:", { exact: true }).nth(1)).toBeVisible();

  const headers = mockedJson("empty").data.headers;
  const body = mockedJson("empty").data.body;

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
});

/**
 * Tests that we get an error when trying to view a file without loading
 * anything on verbose mode
 */
test("on verbose mode, I get an error when I try to view a file without loading anything", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:", { exact: true })).toBeVisible();
  await expect(page.getByText("Output:", { exact: true })).toBeVisible();
  await expect(
    page.getByText("No file loaded.", { exact: true })
  ).toBeVisible();
});

/**
 * Tests that we can make consecutive calls to load and view on brief mode
 */
test("on brief mode, we can make consecutive calls to load", async ({
  page,
}) => {
  // First file
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

  // Second file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers2 = mockedJson("file1noheaders").data.headers;
  const body2 = mockedJson("file1noheaders").data.body;

  for (let i = 0; i < headers2.length; i++) {
    await expect(page.getByText(headers2[i], { exact: true })).toBeVisible();
  }

  for (let j = 0; j < body2.length; j++) {
    for (let k = 0; k < body2[j].length; k++) {
      const elt = page.getByText(body2[j][k], { exact: true });
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

  // Third file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const headers3 = mockedJson("oneItem").data.headers;
  const body3 = mockedJson("oneItem").data.body;

  for (let i = 0; i < headers3.length; i++) {
    await expect(page.getByText(headers3[i], { exact: true })).toBeVisible();
  }

  for (let j = 0; j < body3.length; j++) {
    for (let k = 0; k < body3[j].length; k++) {
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
});

/**
 * Tests that we can make consecutive calls to load and view on verbose mode
 */
test("on verbose mode, we can make consecutive calls to load", async ({
  page,
}) => {
  await page.getByLabel("Mode", { exact: true }).click();

  // First file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(0)).toBeVisible();
  await expect(page.getByText("load_file file1")).toBeVisible();
  await expect(page.getByText("Output:").nth(0)).toBeVisible();
  await expect(page.getByText("file1 successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command:").nth(1)).toBeVisible();
  await expect(page.getByText("view").nth(0)).toBeVisible();
  await expect(page.getByText("Output:").nth(1)).toBeVisible();

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

  // Second file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file file1noheaders");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(2)).toBeVisible();
  await expect(page.getByText("load_file file1noheaders")).toBeVisible();
  await expect(page.getByText("Output:").nth(2)).toBeVisible();
  await expect(
    page.getByText("file1noheaders successfully loaded!")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command:").nth(3)).toBeVisible();
  await expect(page.getByText("view").nth(1)).toBeVisible();
  await expect(page.getByText("Output:").nth(3)).toBeVisible();

  const headers2 = mockedJson("file1noheaders").data.headers;
  const body2 = mockedJson("file1noheaders").data.body;

  for (let i = 0; i < headers2.length; i++) {
    await expect(page.getByText(headers2[i], { exact: true })).toBeVisible();
  }

  for (let j = 0; j < body2.length; j++) {
    for (let k = 0; k < body2[j].length; k++) {
      const elt = page.getByText(body2[j][k], { exact: true });
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

  // Third file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file oneItem");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command:").nth(4)).toBeVisible();
  await expect(page.getByText("load_file oneItem")).toBeVisible();
  await expect(page.getByText("Output:").nth(4)).toBeVisible();
  await expect(page.getByText("oneItem successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command:").nth(5)).toBeVisible();
  await expect(page.getByText("view").nth(2)).toBeVisible();
  await expect(page.getByText("Output:").nth(5)).toBeVisible();

  const headers3 = mockedJson("oneItem").data.headers;
  const body3 = mockedJson("oneItem").data.body;

  for (let i = 0; i < headers3.length; i++) {
    await expect(page.getByText(headers3[i], { exact: true })).toBeVisible();
  }

  for (let j = 0; j < body3.length; j++) {
    for (let k = 0; k < body3[j].length; k++) {
      const elt = page.getByText(body3[j][k], { exact: true });
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
});
