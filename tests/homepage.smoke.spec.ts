import { expect, test } from '@playwright/test';

test('home page renders hero content and usable primary navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#hero-heading')).toContainText("Hi, I'm Yahaira");

  for (const section of ['about', 'skills', 'projects', 'trivia', 'contact']) {
    const navigationLink = page.locator(`#nav-link-${section}`);

    await expect(navigationLink).toBeVisible();
    await expect(navigationLink).toHaveAttribute('href', `#${section}`);
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
});