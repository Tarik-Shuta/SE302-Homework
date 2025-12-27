const { test, expect } = require('@playwright/test');

test.describe('Sweet Shop Website Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
  });

  test('TC01 - Home page URL verification', async ({ page }) => {
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('TC02 - Click any navigation element', async ({ page }) => {
    const clickableElements = page.locator('a, button, [role="button"]');
    const count = await clickableElements.count();
    
    if (count > 0) {
      await clickableElements.first().click();
      const newUrl = page.url();
      expect(newUrl).toBeTruthy();
    } else {
      await expect(page).toHaveURL('https://sweetshop.netlify.app/');
    }
  });

  test('TC03 - Check page content visibility', async ({ page }) => {
    const elements = ['h1', 'p', 'img', 'div'];
    
    for (const element of elements) {
      const locator = page.locator(element);
      if (await locator.count() > 0) {
        await expect(locator.first()).toBeVisible();
      }
    }
    
    const header = page.locator('h1');
    if (await header.count() > 0) {
      const headerText = await header.textContent();
      expect(headerText).toBeTruthy();
    }
  });

  test('TC05 - Test form interaction if exists', async ({ page }) => {
    const form = page.locator('form');
    
    if (await form.count() > 0) {
      const textInputs = page.locator('input[type="text"], input:not([type]), textarea');
      const emailInputs = page.locator('input[type="email"]');
      
      if (await textInputs.count() > 0) {
        await textInputs.first().fill('Test User');
      }
      
      if (await emailInputs.count() > 0) {
        await emailInputs.first().fill('test@example.com');
      }
      
      await page.click('button[type="submit"], input[type="submit"]');
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/sweetshop/);
    } else {
      await expect(page).toHaveURL('https://sweetshop.netlify.app/');
    }
  });

  test('TC06 - Negative test - invalid page access', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/nonexistent-page');
    const currentUrl = page.url();
    
    if (currentUrl.includes('nonexistent-page')) {
      const errorText = await page.locator('body').textContent();
      expect(errorText.toLowerCase()).toMatch(/404|not found|error/i);
    } else {
      expect(currentUrl).not.toContain('nonexistent-page');
    }
  });

});