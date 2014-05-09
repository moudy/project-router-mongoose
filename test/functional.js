var projectRouterMongoose = require('../index');
var expect = require('chai').expect;
var sinon = require('sinon');
var supertest = require('supertest');

var app = require('./app');
var User = require('./user');

var router = projectRouterMongoose.map(function () {
  this.resource('users', {resource: User});
});

app.use(router);

describe('CRUD', function () {

  beforeEach(resetDB);

  describe('readMany', function () {
    beforeEach(createModel(User, [{name: 'Foo'}, {name: 'Bar'}], 'users'));

    it('returns a collection of users', function (done) {
      var users = this.users;
      supertest(app)
        .get('/users')
        .set('Accept', 'application/json')
        .end(function (err, res) {
          var responseUsers = res.body.users;
          expect(responseUsers.length).to.eq(users.length);
          function getNames (obj) { return obj.name; }
          expect(responseUsers.map(getNames)).to.deep.eq(users.map(getNames));
          done();
        });
    });
  });

  describe('readOne', function () {
    beforeEach(createModel(User, {name: 'Foo'}, 'user'));

    it('returns a user', function (done) {
      var user = this.user;
      supertest(app)
        .get('/users/'+user.id)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          var responseUser = res.body.user;
          expect(responseUser.name).to.eq(user.name);
          done();
        });
    });
  });

  describe('create', function () {
    beforeEach(expectCount(User, 0));
    var data = {name: 'Baz'};

    it('creates a user', function (done) {
      supertest(app)
        .post('/users')
        .set('Accept', 'application/json')
        .send({ user: data })
        .end(function (err, res) {
          expect(res.body.user.name).to.eq(data.name);
          expectCount(User, 1)(done);
        });
    });
  });

});
