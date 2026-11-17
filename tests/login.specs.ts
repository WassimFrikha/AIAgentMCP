import { expect, test } from "@playwright/test";
import { getDisplayedCredentials, requestOneTimeCode } from "./login-helpers";

test("login", async ({ page }) => {
  const { username, password } = await getDisplayedCredentials(page);
  const code = await requestOneTimeCode(page, username, password);

  await page.getByRole("textbox", { name: "One-time code" }).fill(code);
  await page.getByRole("button", { name: "Verify" }).click();

  await expect(page.getByRole("heading", { name: "Secure Area" })).toBeVisible();
  await expect(page.getByText("You logged in with two-factor authentication!")).toBeVisible();

  if (process.env.PLAYWRIGHT_HOLD_BROWSER === "1") {
    await page.pause();
  }
});
