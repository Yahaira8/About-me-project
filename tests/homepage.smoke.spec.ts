import { expect, test } from '@playwright/test';
import { triviaQuestions } from '../src/data';

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

test('mobile menu exposes its expanded state to assistive technology', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const toggle = page.locator('#mobile-menu-toggle-btn');
  const menu = page.locator('#mobile-navigation-dropdown');

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation-dropdown');
  await expect(menu).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toBeVisible();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();
});

test('mobile menu options remain reachable on a short screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  await page.locator('#mobile-menu-toggle-btn').click();

  const dropdown = page.locator('#mobile-navigation-dropdown');
  await expect(dropdown).toBeVisible();

  const options = [
    ...['about', 'skills', 'projects', 'trivia', 'contact'].map((section) =>
      page.locator(`#mobile-section-link-${section}`),
    ),
    ...['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin'].map((pageName) =>
      page.locator(`#mobile-nav-link-${pageName}`),
    ),
    dropdown.getByRole('link', { name: /GitHub/ }),
    dropdown.getByRole('button', { name: 'Contact Note' }),
  ];

  for (const option of options) {
    await option.scrollIntoViewIfNeeded();
    await expect(option).toBeVisible();

    const fitsInDropdownAndViewport = await option.evaluate((element) => {
      const optionRect = element.getBoundingClientRect();
      const dropdownRect = document
        .getElementById('mobile-navigation-dropdown')!
        .getBoundingClientRect();

      return (
        optionRect.top >= dropdownRect.top &&
        optionRect.bottom <= dropdownRect.bottom &&
        optionRect.bottom <= window.innerHeight
      );
    });

    expect(fitsInDropdownAndViewport).toBe(true);
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

test('project details modal supports keyboard users and restores focus', async ({ page }) => {
  await page.goto('/');

  const projectCard = page.locator('#project-card-photos-gallery');
  const trigger = projectCard.getByRole('button', { name: 'View Details' });
  const projectTitle = (await projectCard.locator('h3').textContent())?.trim() ?? '';
  await trigger.focus();
  await page.keyboard.press('Enter');

  const dialog = page.getByRole('dialog', { name: projectTitle });
  const dialogTitle = dialog.getByRole('heading', { name: projectTitle });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(dialogTitle).toBeFocused();

  const closeButton = dialog.getByRole('button', { name: 'Close', exact: true });
  const closeIconButton = dialog.getByRole('button', { name: 'Close modal' });
  const repositoryLink = dialog.getByRole('link', { name: 'Open GitHub Repo' });
  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(repositoryLink).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(closeIconButton).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(repositoryLink).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('trivia shows the final score and resets when played again', async ({ page }) => {
  await page.goto('/');

  const trivia = page.locator('#interactive-trivia-box');
  for (const [questionIndex, question] of triviaQuestions.entries()) {
    await expect(trivia.getByText(`Question ${questionIndex + 1} of ${triviaQuestions.length}`)).toBeVisible();
    await trivia.locator(`#trivia-option-${questionIndex}-${question.correctIndex}`).click();
    await expect(trivia.getByText(`Current Score: ${questionIndex + 1}`)).toBeVisible();
    await trivia.locator('#trivia-next-question-btn').click();
  }

  await expect(trivia.getByRole('heading', { name: 'Quiz Completed!' })).toBeVisible();
  await expect(trivia.getByText(`You scored ${triviaQuestions.length} out of ${triviaQuestions.length}!`)).toBeVisible();

  await trivia.locator('#trivia-restart-quiz-btn').click();
  await expect(trivia.getByText(`Question 1 of ${triviaQuestions.length}`)).toBeVisible();
  await expect(trivia.getByRole('heading', { name: triviaQuestions[0].question })).toBeVisible();
  await expect(trivia.getByText('Current Score: 0')).toBeVisible();
});

test('valid contact message is saved locally when sending service is unavailable', async ({ page }) => {
  let contactRequests = 0;
  await page.route('**/api/contact', (route) => {
    contactRequests += 1;
    return route.abort('failed');
  });
  await page.goto('/');

  const initialTimeOrigin = await page.evaluate(() => performance.timeOrigin);
  let loadEvents = 0;
  page.on('load', () => {
    loadEvents += 1;
  });

  await page.locator('#sender-name-input').fill('Test Visitor');
  await page.locator('#sender-email-input').fill('visitor@example.com');
  await page.locator('#sender-message-input').fill('Hello from the browser test.');
  await page.locator('#contact-form-submit-btn').click();

  await expect(page.getByRole('heading', { name: 'Thank you for reaching out!' })).toBeVisible();
  expect(contactRequests).toBe(1);
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(initialTimeOrigin);
  expect(loadEvents).toBe(0);

  const storedMessages = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('contact_messages') ?? '[]'),
  );
  expect(storedMessages).toHaveLength(1);
  expect(storedMessages[0]).toMatchObject({
    name: 'Test Visitor',
    email: 'visitor@example.com',
    message: 'Hello from the browser test.',
    status: 'new',
    replied: false,
  });
});
