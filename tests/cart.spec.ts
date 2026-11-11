import { test, expect } from '../fixtures/test.fixture';

test.describe('Validates the cart page', () => {
  test('Adds and removes products from cart without login', 
    async ({ homePage, productsPage, cartPage }) => {
    
    await homePage.clickProductsLink();
    await productsPage.addRandomProductToCart();
    await productsPage.clickContinueShopping();
    await productsPage.addRandomProductToCart();
    await productsPage.clickViewCartFromModal();

    await expect(cartPage.cartRows).toHaveCount(2);
    await cartPage.removeFirstProduct();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.removeFirstProduct();
    await expect(cartPage.cartEmptyTextLocator).toBeVisible();
  });
});
