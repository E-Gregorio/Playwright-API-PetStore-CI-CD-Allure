import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  retries: 1,
  reporter: [['html'], ['allure-playwright']],
  use: {
    baseURL: 'https://petstore.swagger.io/v2',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  testDir: './tests',
};

export default config;