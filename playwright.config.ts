import fs from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

const chromiumPath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH ||
  (fs.existsSync('/repl/tools/bin/chromium') ? '/repl/tools/bin/chromium' : undefined);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5000',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
    ...(chromiumPath
      ? {
          launchOptions: {
            executablePath: chromiumPath,
          },
        }
      : {}),
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:5000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});