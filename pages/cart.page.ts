import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly proceedToCheckoutButton: Locator;
  readonly cartRows: Locator;
  readonly deleteButton: Locator;
  readonly cartEmptyText: Locator;

  constructor(page: Page) {
    super(page);
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.deleteButton = page.locator('.cart_quantity_delete');
    this.cartEmptyText = page.getByText('Cart is empty!');
    this.proceedToCheckoutButton = page.getByText('Proceed To Checkout');
  }

  get cartRowsLocator(): Locator { return this.cartRows; }
  get cartEmptyTextLocator(): Locator { return this.cartEmptyText; }

  async removeFirstProduct() {
    await this.deleteButton.first().click();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
