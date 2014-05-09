var inherits = require('util').inherits;
var ProjectRouter = require('project-router');

function UpdateRoute () {}
inherits(UpdateRoute, ProjectRouter.Route);
module.exports = UpdateRoute;

var p = UpdateRoute.prototype;

p.model = function () {
  var attrs = this.recordAttributes();
  return this.findRecord().then(this.updateRecord.bind(this, attrs));
};

p.updateRecord = function (attrs) {
  return this.resource.create(attrs).exec();
};

p.findRecord = function () {
  return this.resource.findById(this.param('id')).exec();
};

p.recordAttributes = function () {
  return this.request.body[this.resourceName];
};

p.responseData = function (model) {
  var ret = {};
  ret[this.resourceName] = model;
  return ret;
};


