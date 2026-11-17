import { expect, test } from "@playwright/test";

test("connects, echoes a message, and disconnects over WebSocket", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/websocket");

  await page.getByRole("button", { name: "Connect", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Connected");

  const message = "Playwright WebSocket test";
  await page.getByRole("textbox", { name: "Message" }).fill(message);
  await page.getByRole("button", { name: "Send" }).click();

  await expect(
    page.getByRole("listitem").filter({ hasText: `Echo: ${message}` }),
  ).toHaveText(`Echo: ${message}`);

  await page.getByRole("button", { name: "Disconnect" }).click();
  await expect(page.getByRole("status")).toHaveText(/^Disconnected/);
});
