import path from 'path';
import { test, expect } from '../fixtures/test.fixture';

test.describe('Contact us', () => {
  test('submits contact us form with an existing user', async ({ homePage, contactPage, existingUser }) => {
    const filePath = path.resolve(process.cwd(), 'testdata', 'contact-message.txt');

    await homePage.clickContactUs();
    await contactPage.submitContactForm({
      name: existingUser.name,
      email: existingUser.email,
      subject: 'Capstone contact form',
      message: 'Submitting the contact us form using Playwright page objects.',
      filePath,
    });

    await expect(contactPage.getSuccessAlert).toBeVisible();
  });
});
