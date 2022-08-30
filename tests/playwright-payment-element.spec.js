import { test, expect } from "@playwright/test";
test("test card payment element", async ({ page }) => {
  // Go to http://localhost:4242/
  await page.goto("http://localhost:4242/");

  const stripeIframe = await page.waitForSelector("iframe");
  const stripeFrame = await stripeIframe.contentFrame();

  const cardNumInput = await stripeFrame.waitForSelector(
    'input[name="number"]'
  );
  const cardExpInput = await stripeFrame.waitForSelector(
    'input[name="expiry"]'
  );
  const cardCVCInput = await stripeFrame.waitForSelector('input[name="cvc"]');

  await cardNumInput.fill("4242424242424242");
  await cardExpInput.fill("04/44");
  await cardCVCInput.fill("444");

  const button = await page.locator("button");
  await button.click();

  await page.waitForSelector("span[class='console-message']");

  const console = await page.locator('div[id="console"]');
  await expect(console).toContainText("Payment successful");
});
