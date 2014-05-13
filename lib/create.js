var inherits = require('util').inherits;
var ProjectRouter = require('project-router');
var shared = require('./shared');

function CreateRoute () {}
inherits(CreateRoute, ProjectRouter.Route);
module.exports = CreateRoute;

var p = CreateRoute.prototype;

p.modelName = shared.modelName;

p.model = function () {
  var attrs = this.recordAttributes();
  return this.createRecord(attrs);
};

p.createRecord = function (attrs) {
  return this.resource.create(attrs);
};

p.recordAttributes = function () {
  var body = this.body();
  return body[this.modelName()];
};

p.responseData = function (model) {
  var ret = {};
  ret[this.modelName()] = model;
  return ret;
};


