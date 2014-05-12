var inherits = require('util').inherits;
var RSVP = require('rsvp');
var ProjectRouter = require('project-router');

function DestroyRoute () {}
inherits(DestroyRoute, ProjectRouter.Route);
module.exports = DestroyRoute;

var p = DestroyRoute.prototype;

p.model = function () {
  return this.findRecord().then(this.destroyRecord.bind(this));
};

p.destroyRecord = function (resource) {
  return new RSVP.Promise(function(resolve, reject) {
    resource.remove(function (err, resource_) { err ? reject(err) : resolve(resource_); });
  });
};

p.findRecord = function () {
  return this.resource.findById(this.param('id')).exec();
};

p.responseData = function () {
  return {};
};


