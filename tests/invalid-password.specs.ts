import { expect, test } from "@playwright/test";
import { getDisplayedCredentials } from "./login-helpers";

test("rejects an invalid password", async ({ page }) => {
  const { username } = await getDisplayedCredentials(page);

  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill("wrong-password");
  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("region", { name: "Messages" }))
    .toContainText("Your username or password is invalid!");
});
