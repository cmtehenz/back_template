"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _ensureAuth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuth"));

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRouter.use(_ensureAuth.default);
profileRouter.put('/update', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string(),
    email: _celebrate.Joi.string(),
    provider: _celebrate.Joi.boolean(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.string(),
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password'))
  }
}), profileController.update);
profileRouter.get('/show', profileController.show);
var _default = profileRouter;
exports.default = _default;