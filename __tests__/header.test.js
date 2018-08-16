const PageProxy = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await PageProxy.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

it('the header has the correct text', async () => {
  const text = await page.$$('.logo-img');
  expect(text.length).toEqual(1);
});

it('clicking "Login With Google" starts OAuth flow', async () => {
  await page.click('#google-login');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

it('user can login through local strategy', async () => {
  await page.click('#local-login');
  const url = await page.url();
  expect(url).toMatch(/login/);
  await page.type('input[name=email]', 'test@gmail.com', {delay: 20});
  await page.type('input[name=password]', 'test', {delay: 20});
  await page.click('.auth-button');
  await page.waitFor('a[href="/api/logout"]');
  const text = await page.getContentsOf('a[href="/api/logout"]');
  expect(text).toEqual('Logout');
});

it('when signed in, shows a logout button that works', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/api/logout"]');
  expect(text).toEqual('Logout');

  await page.click('#logout');

  await page.waitFor('#local-login');
  const text2 = await page.getContentsOf('#local-login');
  expect(text2).toEqual('Log In');
});
