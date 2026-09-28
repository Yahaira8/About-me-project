import { expect, test } from '@playwright/test';
import { triviaQuestions } from '../src/data';

test('home page renders hero content and usable primary navigation', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#hero-heading')).toHaveText('Yahaira Papin');

  for (const pageName of ['home', 'media', 'future', 'jiu-jitsu', 'crochet', 'admin']) {
    const navigationLink = page.locator(`#nav-link-${pageName}`);

    await expect(navigationLink).toBeVisible();
  }

  for (const section of ['about', 'trivia', 'contact']) {
    await expect(page.locator(`#${section}`)).toBeAttached();
  }

  await expect(page.locator('#skills')).toHaveCount(0);
  await expect(page.locator('#projects')).toHaveCount(0);
});

test('mobile menu links to every portfolio section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('#mobile-menu-toggle-btn').click();
  await expect(page.locator('#mobile-navigation-dropdown')).toBeVisible();

  for (const section of ['about', 'trivia', 'contact']) {
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
    ...['about', 'trivia', 'contact'].map((section) =>
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

test('contact form only confirms a server-saved message and retains input on failure', async ({ page }) => {
  const requests: Record<string, string>[] = [];
  let shouldFail = true;
  await page.route('**/api/contact', async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      status: shouldFail ? 503 : 201,
      contentType: 'application/json',
      body: shouldFail
        ? JSON.stringify({ error: 'Message storage is temporarily unavailable.' })
        : JSON.stringify({ success: true }),
    });
  });
  await page.goto('/');

  const initialTimeOrigin = await page.evaluate(() => performance.timeOrigin);
  await page.locator('#sender-first-name-input').fill('Test');
  await page.locator('#sender-last-name-input').fill('Visitor');
  await page.locator('#sender-email-input').fill('visitor@example.com');
  await page.locator('#sender-reason-select').selectOption('Question');
  await page.locator('#sender-message-input').fill('Hello from the browser test.');
  await page.locator('#contact-form-submit-btn').click();

  await expect(page.getByRole('alert')).toContainText('Message storage is temporarily unavailable.');
  await expect(page.getByRole('heading', { name: 'Thank you for reaching out!' })).toHaveCount(0);
  await expect(page.locator('#sender-first-name-input')).toHaveValue('Test');
  expect(requests).toEqual([{
    firstName: 'Test',
    lastName: 'Visitor',
    email: 'visitor@example.com',
    reason: 'Question',
    message: 'Hello from the browser test.',
  }]);

  shouldFail = false;
  await page.locator('#contact-form-submit-btn').click();
  await expect(page.getByRole('heading', { name: 'Thank you for reaching out!' })).toBeVisible();
  expect(requests).toHaveLength(2);
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(initialTimeOrigin);
  expect(await page.evaluate(() => localStorage.getItem('contact_messages'))).toBeNull();

  await page.getByRole('button', { name: 'Send another note' }).click();
  await expect(page.locator('#sender-first-name-input')).toHaveValue('');
  await expect(page.locator('#sender-reason-select')).toHaveValue('');
});

test('admin filters, metrics, chart and reply status use authenticated server records', async ({ page }) => {
  const records = [
    {
      id: '00000000-0000-4000-8000-000000000002',
      firstName: 'Newer',
      lastName: 'Visitor',
      email: 'newer@example.com',
      reason: 'Question',
      message: 'Newer note',
      timestamp: '2026-09-28T12:00:00.000Z',
      status: 'new',
      replied: false,
      repliedAt: null,
    },
    {
      id: '00000000-0000-4000-8000-000000000001',
      firstName: 'Older',
      lastName: 'Visitor',
      email: 'older@example.com',
      reason: 'Feedback',
      message: 'Older note',
      timestamp: '2026-09-27T12:00:00.000Z',
      status: 'replied',
      replied: true,
      repliedAt: '2026-09-28T10:00:00.000Z',
    },
  ];
  let authorizedReads = 0;
  await page.route('**/api/admin/verify', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ authenticated: true, token: 'synthetic-test-token' }),
  }));
  await page.route('**/api/contact', (route) => {
    expect(route.request().headers().authorization).toBe('Bearer synthetic-test-token');
    authorizedReads += 1;
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(records) });
  });
  await page.route('**/api/contact/reply', (route) => {
    expect(route.request().headers().authorization).toBe('Bearer synthetic-test-token');
    expect(route.request().postDataJSON()).toEqual({ id: records[0].id });
    const updated = {
      ...records[0], status: 'replied', replied: true, repliedAt: '2026-09-28T13:00:00.000Z',
    };
    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, item: updated }),
    });
  });

  await page.goto('/admin');
  await page.locator('#admin-password-input').fill('synthetic password intercepted by test');
  await page.locator('#admin-login-btn').click();
  await expect(page.getByText('Reply Rate')).toBeVisible();
  await expect(page.getByText('Reply Rate').locator('..')).toContainText('50%');
  await expect(page.getByRole('heading', { name: 'Messages by Reason' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Message counts by reason' })).toContainText('Question');
  const ids = await page.locator('span.font-mono').allTextContents();
  expect(ids[0]).toContain(records[0].id);
  expect(authorizedReads).toBeGreaterThan(0);

  await page.getByRole('button', { name: 'New (1)' }).click();
  await expect(page.locator('span.font-mono')).toHaveCount(1);
  await page.getByRole('button', { name: 'Mark as Replied' }).click();
  await expect(page.getByText('Reply Rate').locator('..')).toContainText('100%');
  await expect(page.getByRole('button', { name: 'New (0)' })).toBeVisible();
  await page.getByRole('button', { name: 'Replied (2)' }).click();
  await expect(page.locator('span.font-mono')).toHaveCount(2);
});
