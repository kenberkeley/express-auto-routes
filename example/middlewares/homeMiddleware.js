module.exports = function (req, res, next) {
  console.info('[Middleware] home');
  next();
};
