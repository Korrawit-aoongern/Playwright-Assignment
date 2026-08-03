const { test, expect } = require('@playwright/test');

test.describe('Coffee Cart eCommerce Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://seleniumbase.io/coffee/');
  });

  test('Coffee_001: Verify the total price once buy one coffee', async ({ page }) => {
    await page.click('[data-test="Cafe_Latte"]');
    await page.click('a[aria-label="Cart page"]');
    await expect(page.locator('[data-test="checkout"]')).toHaveText('Total: $16.00');
    await page.screenshot({ path: 'screenshots/Coffee_001.png' })
  });

  test('Coffee_002: Verify the total price once buy three coffee', async ({ page }) => {
    await page.click('[data-test="Mocha"]');
    await page.click('[data-test="Flat_White"]');
    await page.click('[data-test="Cappuccino"]');
    await page.click('a[aria-label="Cart page"]');
    await expect(page.locator('[data-test="checkout"]')).toHaveText('Total: $45.00');
    await page.screenshot({ path: 'screenshots/Coffee_002.png' })
  });

  test('Coffee_003: Verify the total price once buy the same kind of coffee 2 unit', async ({ page }) => {
    await page.click('[data-test="Americano"]');
    await page.click('a[aria-label="Cart page"]');
    await page.click('.list ul:not(.cart-preview) button[aria-label="Add one Americano"]');
    await expect(page.locator('[data-test="checkout"]')).toHaveText('Total: $14.00');
    await page.screenshot({ path: 'screenshots/Coffee_003.png' })
  });
});

