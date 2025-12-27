const { test, expect } = require('@playwright/test');

test.describe('Sweet Shop Website Tests', () => {

  test('TC01 - Home page loads', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await expect(page).toHaveURL(/sweetshop/);
  });

  test('TC02 - Navigation works', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await page.click('text=About');
    await expect(page).toHaveURL(/about/);
  });

  test('TC03 - Products are visible', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    const products = page.locator('div');
    await expect(products.first()).toBeVisible();
  });

  test('TC06 - Contact form invalid submission', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/contact');
    await page.click('button[type="submit"]');
    await expect(page).not.toHaveURL(/success/);
  });

});
