import { test, expect } from '../fixtures/test.fixture';

test.describe('Authentication', () => {
  test('creates account via API, logs in and logs out via UI, deletes via API', 
    async ({ homePage, createUserViaApi, deleteUserViaApi }) => {

    const user = await createUserViaApi();

    await homePage.openSignupLogin();
    await homePage.login(user.email, user.password);
    
    await expect(homePage.getLoggedUser).toContainText(user.name);
    await homePage.logout();
    await expect(homePage.getsignupLoginLink).toBeVisible();

    await deleteUserViaApi(user);
  });
});
