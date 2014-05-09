process.env.NODE_ENV = 'testing';

var _         = require('underscore');
var mongoose = require('mongoose');
var MONGO_URI = 'mongodb://localhost/project-router-mongoose-testing';
var clearDB = require('mocha-mongoose')(MONGO_URI);
var expect = require('chai').expect;

global.resetDB = function (done) {
  clearDB(function () {
    if (mongoose.connection.db) return done();
    mongoose.connect(MONGO_URI, done);
  });
};

global.createModel = function(Model, data, name, cb) {
  return function (done) {
    var context = this;
    Model.create(data, function (err, doc) {
      if (err) return done(err);
      if (_.isArray(data)) {
        doc = _.toArray(arguments);
        doc.shift();
      }
      context[name] = doc;
      done();
    });
  };
};

global.expectCount = function(Model, count, cb) {
  return function (done) {
    Model.count(function (err, count_) {
      expect(count_).to.eq(count);
      cb ? cb(err) : done(err);
    });
  };
};
