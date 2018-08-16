const PageProxy = require('./helpers/page');

let page;

describe('can change between boards', () => {
  it('can login on test account', async () => {
    page = await PageProxy.build();
    await page.goto('localhost:3000');
    
    await page.click('#local-login');
    const url = await page.url();
    expect(url).toMatch(/login/);
    await page.type('input[name=email]', 'puppet@gmail.com', {delay: 10});
    await page.type('input[name=password]', 'puppet', {delay: 10});
    await page.click('.auth-button');
    await page.waitFor('a[href="/api/logout"]');
  });

  it('displays /cyb/ - cyberpunk and cybersecurity', async () => {
    await page.click('a[href="/b/cyb"]');
    await page.waitFor('.board-title');
    const cyb = await page.getContentsOf('.board-title');
    expect(cyb).toEqual('/cyb/ - cyberpunk and cybersecurity');  
  });
  
  it('displays /tech/ - science and technology', async () => {
    await page.click('a[href="/b/tech"]');
    await page.waitFor('.board-title');
    const tech = await page.getContentsOf('.board-title');
    expect(tech).toEqual('/tech/ - science and technology');
  });

  it('displays /code/ - programming', async () => {
    await page.click('a[href="/b/code"]');
    await page.waitFor('.board-title');
    const code = await page.getContentsOf('.board-title');
    expect(code).toEqual('/code/ - programming');
  });

  it('displays /diy/ - do it yourself and projects', async () => {
    await page.click('a[href="/b/diy"]');
    await page.waitFor('.board-title');
    const diy = await page.getContentsOf('.board-title');
    expect(diy).toEqual('/diy/ - do it yourself and projects');
  });

  it('displays /inter/ - games and interactive media', async () => {
    await page.click('a[href="/b/inter"]');
    await page.waitFor('.board-title');
    const inter = await page.getContentsOf('.board-title');
    expect(inter).toEqual('/inter/ - games and interactive media');
  });

  it('displays /cult/ - culture', async () => {
    await page.click('a[href="/b/cult"]');
    await page.waitFor('.board-title');
    const cult = await page.getContentsOf('.board-title');
    expect(cult).toEqual('/cult/ - culture');
  });

  it('displays /feels/ - personal experiences', async () => {
    await page.click('a[href="/b/feels"]');
    await page.waitFor('.board-title');
    const feels = await page.getContentsOf('.board-title');
    expect(feels).toEqual('/feels/ - personal experiences');
  });

  it('displays /hum/ - humanity', async () => {
    await page.click('a[href="/b/hum"]');
    await page.waitFor('.board-title');
    const hum = await page.getContentsOf('.board-title');
    expect(hum).toEqual('/hum/ - humanity');
  });

  it('displays /r/ - random', async () => {
    await page.click('a[href="/b/r"]');
    await page.waitFor('.board-title');
    const r = await page.getContentsOf('.board-title');
    expect(r).toEqual('/r/ - random');
  });

  it('closes Chromium after finishing the tests', async () => {
    await page.close();
  });
});

describe('can create a post and add a comment', () => {
  let puppetPost = {
    title: Date.now() + '-Puppet_test',
    message: Date.now() + ' - Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit.'
  }

  it('can login on test account', async () => {
    page = await PageProxy.build();
    await page.goto('localhost:3000');
    
    await page.click('#local-login');
    const url = await page.url();
    expect(url).toMatch(/login/);
    await page.type('input[name=email]', 'puppet@gmail.com', {delay: 10});
    await page.type('input[name=password]', 'puppet', {delay: 10});
    await page.click('.auth-button');
    await page.waitFor('a[href="/api/logout"]');
  });

  it('can create a new post and displays it in the board', async () => {
    await page.click('a[href="/b/code"]');
    await page.waitFor('.board-title');
    
    await page.click('a[href="/b/code/new_post"]');
    const url = await page.url();
    expect(url).toMatch(/\/b\/code\/new_post/);

    await page.type('input[name=title]', puppetPost.title, {delay: 0});
    await page.type('textarea[name=message]', puppetPost.message, {delay: 0});
    await page.click('.new-post-button');

    await page.waitFor('.board-title');
    const found = (await page.content()).match(puppetPost.title);
    expect(found[0]).toEqual(puppetPost.title);
  });

  it('can add a comment and see the comment count change', async () => {
    await page.click('a[id="' + puppetPost.title + '"]');
    await page.waitFor('.comment-textarea');

    let count = await page.getContentsOf('.count-comments');
    expect(count).toEqual('0 comments');

    await page.type('textarea[name=message]', 'Puppet test comment', {delay: 20});
    await page.click('.comment-submit-button');
    await page.waitFor('.comment-box');

    const found = (await page.content()).match('Puppet test comment');
    expect(found[0]).toEqual('Puppet test comment');

    count = await page.getContentsOf('.count-comments');
    expect(count).toEqual('1 comments');

  });

  it('closes Chromium after finishing the tests', async () => {
    await page.close();
  });
});

