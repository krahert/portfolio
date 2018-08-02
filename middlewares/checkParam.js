module.exports = value => {
  return (req, res, next) => {
    const checkParam = /^[0-9a-f]{24}$/.test(req.body[value]);

    if (req.body[value].length !== 24 || !checkParam) {
      res.send({ err: 'Invalid id' });
    } else {
      return next();
    }
  };
};
