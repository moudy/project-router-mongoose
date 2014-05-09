var ProjectRouter = require('project-router');
var Mapper = require('./lib/mapper');

var Route = ProjectRouter.Route;
var routes = Mapper.routes;

exports.IndexRoute = routes.index;
exports.ShowRoute = routes.show;
exports.NewRoute = routes.new;
exports.CreateRoute = routes.create;
exports.EditRoute = routes.edit;
exports.UpdateRoute = routes.update;
exports.DestroyRoute = routes.destroy;

exports.Route = Route;
exports.Mapper = Mapper;
exports.map = Mapper.map;
