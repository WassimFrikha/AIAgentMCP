import { expect, test } from "@playwright/test";
import { getDisplayedCredentials, requestOneTimeCode } from "./login-helpers";

test("rejects an invalid one-time code", async ({ page }) => {
  const { username, password } = await getDisplayedCredentials(page);
  const validCode = await requestOneTimeCode(page, username, password);
  const invalidCode = String((Number(validCode) + 1) % 1_000_000).padStart(6, "0");

  await page.getByRole("textbox", { name: "One-time code" }).fill(invalidCode);
  await page.getByRole("button", { name: "Verify" }).click();

  await expect(page.getByRole("region", { name: "Messages" }))
    .toContainText("Your code is invalid!");
  await expect(page.getByRole("heading", { name: "Enter Your Code" })).toBeVisible();
});
