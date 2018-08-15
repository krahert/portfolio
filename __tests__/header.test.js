const PageProxy = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await PageProxy.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test.skip('the header has the correct text', async () => {
  // const text = await page.getContentsOf('.menu-link');
  const text = await page.$$('.logo-img');
  expect(text.length).toEqual(1);
});

test.skip('clicking "Login With Google" starts OAuth flow', async () => {
  await page.click('#google-login');
  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('user can login through local strategy', async () => {
	await page.click('#local-login');
	const url = await page.url();

	expect(url).toMatch(/login/);
	await page.type('input[name=email]', 'test@gmail.com', {delay: 20});
	await page.type('input[name=password]', 'test', {delay: 20});
	await page.click('.auth-button');
	// const xxx = await page.$eval('input[name=email]').outerHTML;
	// console.log(xxx);

	await page.waitFor('a[href="/api/logout"]');
	const text = await page.getContentsOf('a[href="/api/logout"]');
  expect(text).toEqual('Logout');
});

test.skip('when signed in, shows logout button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/api/logout"]');
  expect(text).toEqual('Logout');
});
