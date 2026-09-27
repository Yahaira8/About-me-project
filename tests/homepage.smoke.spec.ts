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

test('project details modal opens and closes', async ({ page }) => {
  await page.goto('/');

  const projectCard = page.locator('#project-card-photos-gallery');
  const projectTitle = await projectCard.locator('h3').textContent();
  await projectCard.getByRole('button', { name: 'View Details' }).click();

  const modal = page.locator('#project-detail-modal-overlay');
  await expect(modal).toBeVisible();
  await expect(modal.locator('h3')).toHaveText(projectTitle?.trim() ?? '');

  await modal.getByRole('button', { name: 'Close modal' }).click();
  await expect(modal).toBeHidden();
});

test('trivia answer can advance to the next question', async ({ page }) => {
  await page.goto('/');

  const trivia = page.locator('#interactive-trivia-box');
  await expect(trivia.getByText(/Question 1 of \d+/)).toBeVisible();
  await trivia.locator('#trivia-option-0-0').click();
  await expect(trivia.getByText('Current Score: 1')).toBeVisible();

  await trivia.locator('#trivia-next-question-btn').click();
  await expect(trivia.getByText(/Question 2 of \d+/)).toBeVisible();
});

test('valid contact message confirms without reloading the page', async ({ page }) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  await page.goto('/');

  const initialTimeOrigin = await page.evaluate(() => performance.timeOrigin);
  let loadEvents = 0;
  page.on('load', () => {
    loadEvents += 1;
  });

  await page.locator('#sender-name-input').fill('Test Visitor');
  await page.locator('#sender-message-input').fill('Hello from the browser test.');
  await page.locator('#contact-form-submit-btn').click();

  await expect(page.getByRole('heading', { name: 'Thank you for reaching out!' })).toBeVisible();
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(initialTimeOrigin);
  expect(loadEvents).toBe(0);
});
