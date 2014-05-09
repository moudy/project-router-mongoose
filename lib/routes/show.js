var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function ShowRoute () {}
inherits(ShowRoute, ProjectRouter.Route);
module.exports = ShowRoute;

var p = ShowRoute.prototype;

p.model = function () {
  return this.findRecord();
};

p.findRecord = function () {
  return this.resource.findById(this.param('id')).exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.resourceName] = model;
  return ret;
};

