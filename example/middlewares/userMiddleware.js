module.exports = function (req, res, next) {
  console.info('[Middleware] user');
  next();
};
