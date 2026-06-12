import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'allure-report',
      'allure-results',
      'test-results/',
      'test-data',
      'playwright.config.ts'
    ],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  
  {
    files: [
      'tests/**/*.ts', 
      'page-objects/**/*.ts', 
      'helpers/**/*.ts', 
      'fixtures/**/*.ts', 
      'booker-endpoints/**/*.ts'
    ],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error', 
      'playwright/no-skipped-test': 'warn',   
      'playwright/no-wait-for-timeout': 'error', 
      '@typescript-eslint/no-explicit-any': 'warn', 
      'no-console': 'warn', 
    },
  }
)];
