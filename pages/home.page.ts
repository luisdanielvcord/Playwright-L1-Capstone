import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly signupLoginLink: Locator;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly productsLink: Locator;
  private readonly contactUsLink: Locator;
  private readonly logoutLink: Locator;
  private readonly loggedInAs: Locator;
  readonly womenCategoryLink: Locator;
  readonly womenDressLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.emailField = page.getByTestId('login-email');
    this.passwordField = page.getByTestId('login-password');
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.loginButton = page.getByTestId('login-button');
    this.contactUsLink = page.getByRole('link', { name: 'Contact Us' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.loggedInAs = page.locator('a:has(i.fa-user)');
    this.womenCategoryLink = page.locator('.left-sidebar').getByRole('link', { name: /women/i }).first();
    this.womenDressLink = page.locator('#Women').getByRole('link', { name: /^dress$/i });
  }

  get getsignupLoginLink(): Locator { return this.signupLoginLink; }
  get getLoggedUser(): Locator { return this.loggedInAs; }

  async openSignupLogin() {
    await this.signupLoginLink.click();
  }

  async login(email: string, password: string) {
      await this.emailField.fill(email);
      await this.passwordField.fill(password);
      await this.loginButton.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async clickProductsLink() {
    await this.productsLink.click();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async openWomenDressCategory() {
    await this.womenCategoryLink.click();
    await this.womenDressLink.click();
  }
}
