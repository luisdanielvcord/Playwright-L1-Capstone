import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { randomNumber } from '../utils/randomNumber';

export class ProductsPage extends BasePage {
  private readonly productCards: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly viewCartLink: Locator;
  private readonly brandResultsTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
    this.brandResultsTitle = page.getByRole('heading', { name: /brand - .* products/i });
  }

  get getProductCards(): Locator { return this.productCards; }
  get getBrandResultsTitle(): Locator { return this.brandResultsTitle; }

  async addRandomProductToCart() {
    const productCount = await this.productCards.count();
    const randomIndex = randomNumber(0, productCount - 1);
    const productCard = this.productCards.nth(randomIndex);
    await productCard.hover();
    await productCard.locator('a', { hasText: 'Add to cart' }).first().click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickViewCartFromModal() {
    await this.viewCartLink.click();
  }

  async openBrand(brand: string) {
    const brandLink = this.page.locator(`a[href="/brand_products/${brand}"]`);
    await brandLink.scrollIntoViewIfNeeded();
    await brandLink.click();
  }
}
