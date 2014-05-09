var inherits = require('util').inherits;
var express = require('express');
var ProjectRouter = require('project-router');

function Mapper() {
  Mapper.super_.apply(this, arguments);
}
inherits(Mapper, ProjectRouter.Mapper);

var routes = Mapper.routes = {
  index: require('./routes/index')
, show: require('./routes/show')
, new: require('./routes/new')
, create: require('./routes/create')
, edit: require('./routes/edit')
, update: require('./routes/update')
, destroy: require('./routes/destroy')
};

module.exports = Mapper;

Mapper.map = function (options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  var router = express.Router();
  var mapper = new Mapper(router, options);
  fn.call(mapper);

  return router;
};

var p = Mapper.prototype;

p.mapper = Mapper;

Mapper.prototype.generateRoute = function (options) {
  var route = routes[options.action];
  if (!route) route = Mapper.super_.prototype.generateRoute.apply(this, arguments);
  return route;
};

