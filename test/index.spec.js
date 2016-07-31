var path = require('path'),
  request = require('supertest'),
  should = require('chai').should(),
  async = require('async'),
  app = require('express')(),
  autoRoutes = require('..')(app);

autoRoutes(path.resolve(__dirname, '../example/controllers/'));

describe('auto mount controllers to routes', function() {

  var api = request(app.listen());

  it('test APIs of example/', function(done) {

    async.parallel([
      function(cb) { api.get('/').expect(200, cb) },
      function(cb) { api.post('/log').expect(200, cb) },
      function(cb) { api.put('/user').expect(200, cb) },
      function(cb) { api.post('/login').expect(200, cb) },
      function(cb) { api.get('/home').expect(200, cb) },
      function(cb) { api.get('/login').expect(200, cb) },
      function(cb) { api.post('/setting').expect(200, cb) },
      function(cb) { api.get('/home/xyz').expect(200, cb) },
      function(cb) { api.get('/home/foo').expect(200, cb) },
      function(cb) { api.get('/user/:uid').expect(200, cb) },
      function(cb) { api.get('/user/logout').expect(200, cb) },
      function(cb) { api.get('/home/foo/bar').expect(200, cb) },
      function(cb) { api.get('/home/foo/hello').expect(200, cb) },
      function(cb) { api.del('/user/logout/:uid').expect(200, cb) },
      function(cb) { api.get('/user/setting/:uid').expect(200, cb) },
      function(cb) { api.get('/home/foo/bar/world').expect(200, cb) }
    ], done);
  });

});
