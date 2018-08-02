//! Aici o sa fac 'monkey-patch' la metoda exec() din Mongoose, unde o sa rulez
//! , codul meu inainte sa execut codul din functia originala. 
//! Si o sa creez o metoda custom '.cache()', pe care o voi folosi sa aleg
//! , ce vreau sa pun in cache.

const mongoose = require('mongoose');
const redis = require('redis');

const util = require('util');

const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisURL);

//! Modific hget() din Redis ca acesta sa returneze un promise in loc de callback.
client.hget = util.promisify(client.hget);

// Referinta catre exec()-ul original din Mongoose.
const exec = mongoose.Query.prototype.exec;

// cache() va spune query-ului de Mongoose ca vreau sa il cache-uiesc
// Parametrul 'options' va contine un { key: <hashKey> } pentru indexarea datelor
// , in cache.
mongoose.Query.prototype.cache = function(options = {}) {
  // 'this' = Query instance
  this.useCache = true;
  // remember: daca folosesc obiecte, va trebui sa le transform in JSON
  this.hashKey = options.key || '';
  
  // Returnez 'this' ca sa ii permit metodei sa fie chainuita de alte metode.
  return this;
};

//! modific exec() din Mongoose ca sa treaca mai intai prin Redis.
mongoose.Query.prototype.exec = async function() {

  if (!this.useCache) {
    
    // exec() este metoda memorata mai sus din Mongoose.Query si 'arguments' va
    // , fi un pseudo-array cu filtrele de cautare din Mongoose Query.
    return exec.apply(this, arguments);
  }

	// Object.assign() este folosit pentru a copia in mod corect, proprietatile
  // , dintr-un obiect in altul. arg1 = destination, arg2, arg3 = sources.
  // this.getQuery() returneaza un obiect cu seach filters din Query-ul curent.

	const key = JSON.stringify(Object.assign({}, this.getQuery(), {
		collection: this.mongooseCollection.name
  }));
  
  //! Verific in Redis daca sunt date cached pentru key-ul respectiv. Pot folosi
  //! async / await deorece l-am facut sa returneze un promise.
  // hget('cars', 'toyota') === "new" . { cars: { toyota: "new" }}
  const cacheValue = await client.hget(this.hashKey, key);

  // Daca DA...
  if (cacheValue) {
    // console.log('FROM CACHE');
    const doc = JSON.parse(cacheValue);

    // Hydrate la rezultatul primit, ia un obiect sau un array de obiecte si le
    // , converteste intr-un Mongoose document ca acesta sa le poata intelege.
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  
  // Daca NU...
  // console.log('FROM MONGODB');
  const result = await exec.apply(this, arguments);
  
  // ii spun sa imi creeze un hash key-value pair in Redis si acest pair sa expire in 15m.
  client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 15000);

  return result;
};

//! module care folosesc Redis sau current query instance.
module.exports = {
  clearHash(hashKey) {
    client.del(hashKey);
  }
};