import { test, expect } from '../fixtures/test.fixture';

test.describe('Visual', () => {
  test('matches women dress category page', async ({ homePage }) => {
    await homePage.openWomenDressCategory();

    await expect(homePage['page']).toHaveURL(/category_products/);
    await expect(homePage['page']).toHaveScreenshot('women-dress-category.png', { fullPage: true });
  });
});