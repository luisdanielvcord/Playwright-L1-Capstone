import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BasePage } from './base.page';

export class PaymentPage extends BasePage {
  private readonly nameOnCardInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly cvcInput: Locator;
  private readonly expiryMonthInput: Locator;
  private readonly expiryYearInput: Locator;
  private readonly payAndConfirmOrderButton: Locator;
  private readonly orderPlacedMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameOnCardInput = page.getByTestId('name-on-card');
    this.cardNumberInput = page.getByTestId('card-number');
    this.cvcInput = page.getByTestId('cvc');
    this.expiryMonthInput = page.getByTestId('expiry-month');
    this.expiryYearInput = page.getByTestId('expiry-year');
    this.payAndConfirmOrderButton = page.getByTestId('pay-button');
    this.orderPlacedMessage = page.getByTestId('order-placed');
  }

  get orderPlacedMessageLocator(): Locator { return this.orderPlacedMessage; }

  async fillCardDetails() {
    await this.nameOnCardInput.fill(faker.person.fullName());
    await this.cardNumberInput.fill(faker.finance.creditCardNumber('################'));
    await this.cvcInput.fill(faker.finance.creditCardCVV());
    await this.expiryMonthInput.fill(faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'));
    await this.expiryYearInput.fill(faker.number.int({ min: 2027, max: 2035 }).toString());
  }

  async clickPayAndConfirmOrder() {
    await this.payAndConfirmOrderButton.click();
  }
}
