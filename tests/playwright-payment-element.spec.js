// @ts-check
const { test, expect } = require("@playwright/test");

test("test card payment element", async ({ page }) => {
  await page.goto("http://localhost:4242/");

  // Wait for the Payment Element iframe to be available
  const stripeIframe = await page.waitForSelector("iframe");
  const stripeFrame = await stripeIframe.contentFrame();

  // Wait for the card number input to be available
  const cardNumInput = await stripeFrame.waitForSelector(
    'input[name="number"]'
  );

  // Wait for the card expiry input to be available
  const cardExpInput = await stripeFrame.waitForSelector(
    'input[name="expiry"]'
  );

  // Wait for the card cvc to be available
  const cardCVCInput = await stripeFrame.waitForSelector('input[name="cvc"]');

  // Wait for the country selector to be available
  const countryInput = await stripeFrame.waitForSelector(
    'select[name="country"]'
  );

  // Fill the elements with valid card data
  await cardNumInput.fill("4242424242424242");
  await cardExpInput.fill("04/44");
  await cardCVCInput.fill("444");

  await countryInput.selectOption("IE");

  // Find and click the submit button
  const button = await page.locator("button");
  await button.click();

  // Wait for the success message to be written to the page
  await page.waitForSelector("span[class='console-message']");

  // Find the div on the page that has the ID 'console'
  const console = await page.locator('div[id="console"]');

  // Verify that the div with ID console contains the success message
  await expect(console).toContainText("Payment successful");
});
