# Playwright Advanced Automation Framework (TypeScript)

This repository contains Test Automation Framework built with **Playwright Test** and **TypeScript** targeting E2E, UI Components, and API testing levels.

The framework is developed with industry best practices, making it highly maintainable and suitable for enterprise-level projects.

## Tech Stack & Highlights
- **Language:** TypeScript
- **Test Runner:** Playwright Test (with multi-project & multi-browser config)
- **API Testing:** Integrated JSON Schema Validation using **Ajv** & **Ajv-Formats**
- **Data Generation:** Synthetic test data generation via **@faker-js/faker**
- **Reporting:** **Allure Playwright** integration for rich test execution analytics
- **Code Quality & Style:** **ESLint 9+** (Flat Config) for linting and **Prettier** for formatting

## Project Structure
- `tests/` — Test suites separated by types: `api/`, `e2e-conduit/`, and `ui-components-herokuapp/`
- `page-objects/` — Page Object Model (POM) classes separating selectors from test logic
- `helpers/` — API endpoints builders, schemas, and `schemaValidator.ts`
- `fixtures/` — Custom Playwright fixtures for easy page injection
- `booker-endpoints/` — Dedicated API layer components

## Getting Started

### Prerequisites
Ensure you have **Node.js** (v18+) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/silushina/playwright-ui-api.git
   cd playwright-ui-api
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Execute All Tests
```bash
npm run tests:all
```

### API Testing
```bash
npm run tests:api
```

### UI Components (Herokuapp) by Browser
```bash
npm run tests:ui-components:chromium
npm run tests:ui-components:firefox
npm run tests:ui-components:safari
```

### E2E Testing (Conduit) by Browser
```bash
npm run tests:e2e:chromium
npm run tests:e2e:firefox
npm run tests:e2e:safari
```

## Reporting

The framework supports detailed reporting via **Allure Report**. To generate a static report and automatically open it in your default browser, execute:
```bash
npm run allure:show
```

## Code Quality & Formatting

- **Check Linter errors:** `npm run lint:check`
- **Automatically fix Linter issues:** `npm run lint:fix`
- **Check Prettier formatting:** `npm run format:check`
- **Format code automatically:** `npm run format`
