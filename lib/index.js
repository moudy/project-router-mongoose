var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function IndexRoute () {}
inherits(IndexRoute, ProjectRouter.Route);
module.exports = IndexRoute;

var p = IndexRoute.prototype;

p.model = function () {
  return this.findRecords();
};

p.findRecords = function () {
  return this.resource.find().exec();
};

p.responseData = function (model) {
  var ret = {};
  ret[this.collectionName] = model;
  return ret;
};


