const bcrypt = require('bcrypt');

const generateHash = async clearPassword => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(clearPassword, salt);
  
  return hash;
};

const compareHash = async (clearPassword, hash) => {
  const res = await bcrypt.compare(clearPassword, hash);
  return res;
};

module.exports = { generateHash, compareHash };