const redis = require('redis');
const rateLimit = require('express-rate-limit');
const redisStore = require('rate-limit-redis');

const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisURL);

// 60 5 0

module.exports = options => {
  return new rateLimit({
    store: new redisStore({
      expiry: options.expiresSec,
      resetExpiryOnChange: false,
      client,
      prefix: options.prefix
    }),
    max: options.maxRequests,
    delayMs: options.delayMs || 0,
    message: options.message || 'Too many requests, please try again later.'
  });
};
