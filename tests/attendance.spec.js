const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
});

test('should log login action', async ({ page }) => {
    await page.click('#login-btn');
    const logContainer = page.locator('#log-container');
    await expect(logContainer).toContainText('Login');
});

test('should log logout action', async ({ page }) => {
    await page.click('#logout-btn');
    const logContainer = page.locator('#log-container');
    await expect(logContainer).toContainText('Logout');
});

test('should persist logs after reload', async ({ page }) => {
    await page.click('#login-btn');
    await page.reload();
    const logContainer = page.locator('#log-container');
    await expect(logContainer).toContainText('Login');
});

test('should clear logs', async ({ page }) => {
    await page.click('#login-btn');

    // Handle the confirm dialog
    page.on('dialog', dialog => dialog.accept());
    await page.click('#clear-logs-btn');

    const logContainer = page.locator('#log-container');
    await expect(logContainer).toContainText('No logs found.');
});
