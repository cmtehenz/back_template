"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuth = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuth"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    name: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.patch('/avatar', _ensureAuth.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;