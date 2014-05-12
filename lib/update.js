var inherits = require('util').inherits;
var RSVP = require('rsvp');
var ProjectRouter = require('project-router');

function UpdateRoute () {}
inherits(UpdateRoute, ProjectRouter.Route);
module.exports = UpdateRoute;

var p = UpdateRoute.prototype;

p.model = function () {
  var self = this;
  var attrs = this.recordAttributes();
  return this.findRecord().then(function (record) {
    return self.updateRecord(record, attrs);
  }, this.error.bind(this));
};

p.updateRecord = function (record, attrs) {
  return new RSVP.Promise(function(resolve, reject) {
    record.set(attrs);
    record.save(function (err, doc) { err ? reject(err) : resolve(doc); });
  });
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


