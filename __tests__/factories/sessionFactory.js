const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
	const sessionObject = {
		passport: {
      user: user._id.toString()
		}
	};

	// O sa convertesc obiectul continut de Cookie, in JSON si apoi din UTF-8 in Base64.
	const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

	// Generez semnatura pentru session, pe care o voi trimite impreuna cu session cookie
  const sig = keygrip.sign('session=' + session);
	
  return { session, sig };
};