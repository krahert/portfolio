const puppeteer = require('puppeteer');

const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
      // args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    // Instantiaza obiectul customPage si apoi invoca metoda built-in
    // , a Proxy-ului numita get(), care o sa extraga numele metodei/proprietatii
    // , chainuite de customPage.
    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
		const user = await userFactory();
		const { session, sig } = sessionFactory(user);

		await this.page.setCookie({ name: 'session', value: session });
		await this.page.setCookie({ name: 'session.sig', value: sig });

		await this.page.goto('localhost:3000/b/cyb');

		//! O sa ii spun lui Puppeteer sa astepte pana cand apare elementul precizat,
		//! , ca sa fiu sigur ca s-a incarcat pagina inainte sa incep sa testez.
		// Daca elementul de mai jos nu apare, o sa mi se blocheze testul.
		await this.page.waitFor('a[href="/api/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  get(path) {
    return this.page.evaluate(_path => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_data)
        }).then(res => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }

}

module.exports = CustomPage;
