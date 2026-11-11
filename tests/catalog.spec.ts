import { test, expect } from '../fixtures/test.fixture';

test.describe('Catalog', () => {
  test('validates brand filter products belong to selected brand', async ({ homePage, productsPage }) => {
    const brandToSelect: string = 'Polo';

    await homePage.clickProductsLink();
    await productsPage.openBrand(brandToSelect);

    await expect(productsPage.getBrandResultsTitle).toContainText(`Brand - ${brandToSelect} Products`);
    await expect(productsPage.getProductCards.first()).toBeVisible();
  });
});
