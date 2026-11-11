import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly orderCommentInput: Locator;
  readonly placeOrderLink: Locator;

  constructor(page: Page) {
    super(page);
    this.orderCommentInput = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole('link', { name: /place order/i });
  }

  async placeOrder(comment: string) {
    await this.orderCommentInput.fill(comment);
    await this.placeOrderLink.click();
  }
}
