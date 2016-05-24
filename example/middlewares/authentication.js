module.exports = function (req, res, next) {
  // if (req.session && req.session.USER) {
  //   next();
  // } else {
  //   var err = new Error();
  //   err.status = 401;
  //   err.msg = 'You need to login';
  //   next(err);
  // }
  console.info('[Middleware] authentication');
  next();
};
