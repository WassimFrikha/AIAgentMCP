import { expect, type Page } from "@playwright/test";

export async function getDisplayedCredentials(page: Page) {
  await page.goto("https://the-internet.herokuapp.com/two_factor");
  await expect(page.getByRole("heading", { name: "Two-Factor Login" })).toBeVisible();

  const credentialsHeading = page.getByRole("heading", { level: 4 });
  const username = (await credentialsHeading.locator("em").nth(0).textContent())?.trim();
  const password = (await credentialsHeading.locator("em").nth(1).textContent())?.trim();

  if (!username || !password) {
    throw new Error("The login page did not display the test credentials.");
  }

  return { username, password };
}

export async function requestOneTimeCode(page: Page, username: string, password: string) {
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", { name: "Enter Your Code" })).toBeVisible();

  const codeText = await page.getByRole("heading", { level: 4 }).innerText();
  const code = codeText.match(/\b\d{6}\b/)?.[0];

  if (!code) {
    throw new Error("The two-factor page did not display a six-digit code.");
  }

  return code;
}
