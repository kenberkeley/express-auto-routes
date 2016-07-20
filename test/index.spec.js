var path = require('path'),
  request = require('supertest'),
  app = require('express')(),
  autoRoutes = require('..')(app);

autoRoutes(path.resolve(__dirname, '../example/controllers/'));

describe('auto mount controllers to routes', function() {
  it('test some of the mounted APIs', function(done) {
    request(app.listen())
      .get('/')
      .expect('GET /')
      .end(function() {
        request(app.listen())
          .get('/home')
          .expect('GET /home', done);
      });
  });
});
