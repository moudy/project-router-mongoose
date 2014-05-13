var inherits = require('util').inherits;
var ProjectRouter = require('project-router');
var shared = require('./shared');

function ShowRoute () {}
inherits(ShowRoute, ProjectRouter.Route);
module.exports = ShowRoute;

var p = ShowRoute.prototype;

p.modelName = shared.modelName;

p.model = function () {
  return this.findRecord();
};

p.afterModel = function (model) {
  if (!model) this.reject(404, 'Not found');
};

p.findRecord = function () {
  return this.resource.findById(this.param('id')).exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.modelName()] = model;
  return ret;
};

