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
