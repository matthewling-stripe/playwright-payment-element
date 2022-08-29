import { test, expect } from "@playwright/test";
test("test card payment element", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("http://localhost:3000/");

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

  await page.locator("text=Pay with Payment Element").click();

  await page.waitForNavigation();

  await expect(page.url()).toContain("http://localhost:3000/?payment_intent");
});

test("test redirection payment element", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const stripeIframe = await page.waitForSelector("iframe");
  const stripeFrame = await stripeIframe.contentFrame();

  const idealTab = await stripeFrame.waitForSelector('button[id="ideal-tab"]');
  await idealTab.click();

  const idealName = await stripeFrame.waitForSelector('input[name="name"]');
  await idealName.fill("Max Powers");

  await Promise.all([
    page.waitForNavigation(),
    page.locator("text=Pay with Payment Element").click(),
  ]);

  await expect(page.url()).toContain(
    "https://stripe.com/payment_methods/test_payment"
  );

  const authButton = await page.locator('a[name="success"]');

  await Promise.all([page.waitForNavigation(), authButton.click()]);

  await expect(page.url()).toContain("http://localhost:3000/?payment_intent");

  // const console = page.locator('div[id="console"]');
  // await expect(console).toContainText("Payment succeeded");
});
