const { test, expect } = require('@playwright/test');

// ponytail: Hardcoded selectors and test data used for quick verification. Ceiling: Hard to scale with dynamic items, roles, or multiple test flows. Upgrade path: Implement Page Object Model (POM) and use data-driven fixtures.

test.describe('SauceDemo Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Log in
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Add item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Go to cart
    await page.click('[data-test="shopping-cart-link"]');
  });

  test('TC-CKO-001: verify checkout button funcanlity (clickable + redirection) in cart page', async ({ page }) => {
    // Click on Checkout button
    await page.click('[data-test="checkout"]');
    
    // Verify redirection to the Checkout: Your Information page
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await page.screenshot({ path: 'screenshots/TC-CKO-001.png' });
  });

  test('TC-CKO-002: Register in Checkout: Your Information page using valid inputs', async ({ page }) => {
    // Click on Checkout button
    await page.click('[data-test="checkout"]');
    
    // Enter first name, last name, and postal code
    await page.fill('[data-test="firstName"]', 'omar');
    await page.fill('[data-test="lastName"]', 'abdo');
    await page.fill('[data-test="postalCode"]', '12345');
    
    // Click Continue
    await page.click('[data-test="continue"]');
    
    // Verify redirection to Checkout: Overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await page.screenshot({ path: 'screenshots/TC-CKO-002.png' });
  });

  test('TC-CKO-003: Register in Checkout: Your Information page without filling mandatory fields', async ({ page }) => {
    // Click on Checkout button
    await page.click('[data-test="checkout"]');
    
    // Click the Continue button without entering any details
    await page.click('[data-test="continue"]');
    
    // Verify error message appears: "Error: First Name is required"
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Error: First Name is required');
    await page.screenshot({ path: 'screenshots/TC-CKO-003.png' });
  });
});
