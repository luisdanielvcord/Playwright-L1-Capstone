import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly messageInput: Locator;
  private readonly uploadFileInput: Locator;
  private readonly submitButton: Locator;
  private readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByTestId('name');
    this.emailInput = page.getByTestId('email');
    this.subjectInput = page.getByTestId('subject');
    this.messageInput = page.getByTestId('message');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByTestId('submit-button');
    this.successAlert = page.locator('.status.alert.alert-success');
  }
  
  get getSuccessAlert (): Locator { return this.successAlert; }

  async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    filePath: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
    await this.uploadFileInput.setInputFiles(data.filePath);

    this.page.once('dialog', dialog => dialog.accept());
    await this.submitButton.click();
  }
}
