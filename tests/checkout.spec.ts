import { test, expect } from '../fixtures/test.fixture';

test.describe('Validates the checkout page', () => {
  test('Completes the checkout process with an existing account', 
    async ({ homePage, productsPage, cartPage, checkoutPage, paymentPage }) => {
    
    const comment: string = 'checkout validation.';

    await homePage.openSignupLogin();
    await homePage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await homePage.clickProductsLink();
    await productsPage.addRandomProductToCart();
    await productsPage.clickViewCartFromModal();
    await cartPage.clickProceedToCheckout();
    await checkoutPage.placeOrder(comment);
    await paymentPage.fillCardDetails();
    await paymentPage.clickPayAndConfirmOrder();
    
    await expect(paymentPage.orderPlacedMessageLocator).toBeVisible();
  });
});
