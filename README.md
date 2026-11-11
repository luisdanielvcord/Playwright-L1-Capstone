# Daniel VC L1 PLAYWRIGHT CAPSTONE PROJECT

Playwright end-to-end automation project for the Automation Exercise site using TypeScript, fixtures, and the Page Object Model.

## Features

- Playwright with TypeScript
- Page Object Model structure under `pages/`
- Shared fixtures under `fixtures/`
- UI and API-assisted test flows
- Cross-browser execution for Chromium, Firefox, and WebKit
- HTML reporting
- Trace, video, and screenshot capture on failures
- Ad blocking setup applied through the shared `homePage` fixture flow

## Project Structure

- `tests/` - test specs
- `pages/` - page objects
- `fixtures/` - shared Playwright fixtures and API helpers
- `testdata/` - static test files
- `utils/` - utility helpers
- `reports/` - Playwright HTML reports
- `test-results/` - artifacts generated during execution

## Test Coverage

Current specs include:

- `auth.spec.ts` - account creation via API, login/logout via UI, cleanup via API
- `cart.spec.ts` - add and remove products from cart
- `catalog.spec.ts` - brand filter validation
- `checkout.spec.ts` - checkout flow with an existing account
- `contact.spec.ts` - contact us form submission with file upload
- `visual.spec.ts` - visual validation for the women dress category page

## Requirements

- Node.js 18+
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
URL=https://automationexercise.com
EMAIL=your_existing_user_email
PASSWORD=your_existing_user_password
```

### Variables used

- `URL` - base URL for the application under test
- `EMAIL` - existing account email used by checkout/login flows
- `PASSWORD` - existing account password used by checkout/login flows

## Running Tests

Run all tests:

```bash
npm test
```

Run only Chromium:

```bash
npm run test:chromium
```

Run with Playwright UI mode:

```bash
npm run test:ui
```

Run tests and open the HTML report:

```bash
npm run test:report
```

## Playwright Configuration

Main configuration is in `playwright.config.ts`.

Current setup includes:

- `testDir: ./tests`
- `timeout: 20000`
- retries enabled
- HTML and list reporters
- `data-qa` as the test id attribute
- trace on
- video retained on first failure
- screenshot on failure
- headless execution
- projects for Chromium, Firefox, and WebKit

## Fixtures

Shared fixtures are defined in `fixtures/test.fixture.ts`.

They provide:

- page objects such as `homePage`, `productsPage`, `cartPage`, `checkoutPage`, `paymentPage`, and `contactPage`
- API helpers to create and delete users
- an `existingUser` fixture for tests that need a temporary account

## Notes

- The project uses Faker to generate user data for API-created accounts.
- The contact form test uploads the file from `testdata/contact-message.txt`.
- Ad blocking is initialized in the `homePage` fixture path before navigating to the site.
- Reports and test artifacts are generated locally and should not usually be committed.

## Useful Commands

```bash
npx playwright test --project=webkit
npx playwright test --grep "Contact us"
npx playwright show-report
```