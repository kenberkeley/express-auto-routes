exports.use = require('../../middlewares/homeMiddleware');

exports.get = function (req, res, next) {
  res.send('GET /home');
};
