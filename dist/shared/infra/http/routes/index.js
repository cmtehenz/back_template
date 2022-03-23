"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _docSwagger = require("../../../docs/docSwagger");

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/doc', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_docSwagger.swaggerDocument));
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/profile', _profile.default);
routes.use('/password', _password.default);
var _default = routes;
exports.default = _default;