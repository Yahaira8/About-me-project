import { expect, test } from '@playwright/test';

test('home page renders hero content and usable primary navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#hero-heading')).toHaveText('Yahaira Papin');

  for (const pageName of ['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin']) {
    const navigationLink = page.locator(`#nav-link-${pageName}`);

    await expect(navigationLink).toBeVisible();
  }

  for (const section of ['about', 'skills', 'projects', 'trivia', 'contact']) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
});

test('mobile menu links to every portfolio section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('#mobile-menu-toggle-btn').click();
  await expect(page.locator('#mobile-navigation-dropdown')).toBeVisible();

  for (const section of ['about', 'skills', 'projects', 'trivia', 'contact']) {
    const sectionLink = page.locator(`#mobile-section-link-${section}`);

    await expect(sectionLink).toBeVisible();
    await expect(sectionLink).toHaveAttribute('href', `#${section}`);
    await expect(page.locator(`#${section}`)).toBeAttached();
  }
});