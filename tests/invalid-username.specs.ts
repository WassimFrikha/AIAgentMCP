import { expect, test } from "@playwright/test";
import { getDisplayedCredentials } from "./login-helpers";

test("rejects an invalid username", async ({ page }) => {
  const { password } = await getDisplayedCredentials(page);

  await page.getByRole("textbox", { name: "Username" }).fill("invalid-user");
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("region", { name: "Messages" }))
    .toContainText("Your username or password is invalid!");
});
