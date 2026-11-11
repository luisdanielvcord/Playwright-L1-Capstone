import { test as base, expect, request, type APIRequestContext, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/home.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';
import { ContactPage } from '../pages/contact.page';

export type UserAccount = {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  birthDate: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

type AppFixtures = {
  homePage: HomePage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactPage: ContactPage;
  adsFreePage: Page;
  createUserViaApi: () => Promise<UserAccount>;
  deleteUserViaApi: (user: Pick<UserAccount, 'email' | 'password'>) => Promise<void>;
  existingUser: UserAccount;
};

function buildUserAccount(): UserAccount {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  return {
    name: `${firstName} ${lastName}`,
    email,
    password: faker.internet.password({ length: 12, memorable: false }) + 'A1!',
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    birthDate: faker.number.int({ min: 1, max: 28 }).toString(),
    birthMonth: faker.number.int({ min: 1, max: 12 }).toString(),
    birthYear: faker.number.int({ min: 1970, max: 2003 }).toString(),
    firstName,
    lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.string.numeric(10),
  };
}

async function createAccount(apiContext: APIRequestContext, user: UserAccount) {
  const response = await apiContext.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDate,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });

  expect(response.ok()).toBeTruthy();
  const body = JSON.parse(await response.text());
  expect(body).toMatchObject({ responseCode: 201, message: 'User created!' });
}

async function deleteAccount(apiContext: APIRequestContext, user: Pick<UserAccount, 'email' | 'password'>) {
  const response = await apiContext.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  expect(response.ok()).toBeTruthy();
  const body = JSON.parse(await response.text());
  expect(body).toMatchObject({ responseCode: 200, message: 'Account deleted!' });
}

export const test = base.extend<AppFixtures>({
  adsFreePage: async ({ page }, use) => {
    await page.route(/doubleclick|googlesyndication|googleads|adservice|analytics|google_vignette/i, route => route.abort());
    await page.addInitScript(() => {
      const hideAds = () => {
        for (const selector of ['ins.adsbygoogle', 'iframe[title="Advertisement"]', '#google_esf', '#aswift_0', '#aswift_1', '#aswift_2']) {
          document.querySelectorAll(selector).forEach(element => {
            (element as HTMLElement).style.display = 'none';
            (element as HTMLElement).style.visibility = 'hidden';
            (element as HTMLElement).style.pointerEvents = 'none';
          });
        }
      };

      hideAds();
      new MutationObserver(hideAds).observe(document.documentElement, { childList: true, subtree: true });
    });
    await use(page);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  createUserViaApi: async ({}, use) => {
    const apiContext = await request.newContext({ baseURL: process.env.URL });
    await use(async () => {
      const user = buildUserAccount();
      await createAccount(apiContext, user);
      return user;
    });
    await apiContext.dispose();
  },
  deleteUserViaApi: async ({}, use) => {
    const apiContext = await request.newContext({ baseURL: process.env.URL });
    await use(async user => {
      await deleteAccount(apiContext, user);
    });
    await apiContext.dispose();
  },
  existingUser: async ({ createUserViaApi, deleteUserViaApi }, use) => {
    const user = await createUserViaApi();
    await use(user);
    await deleteUserViaApi(user);
  },
});

export { expect } from "@playwright/test";
