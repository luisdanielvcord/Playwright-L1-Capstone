import { test, expect } from '../fixtures/test.fixture';

test.describe('Visual', () => {
  test('matches women dress category page without ads', async ({ adsFreePage, homePage }) => {
    await homePage.openWomenDressCategory();

    await expect(adsFreePage).toHaveURL(/category_products/);
    await expect(adsFreePage).toHaveScreenshot('women-dress-category.png', { fullPage: true });
  });
});
