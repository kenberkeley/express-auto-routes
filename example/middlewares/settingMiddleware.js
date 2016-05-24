module.exports = function (req, res, next) {
  console.info('[Middleware] setting');
  next();
};
