"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    user_id,
    name,
    email,
    password,
    old_password
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User not found');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new _AppError.default('E-mail already in use.');
    }

    if (password && !old_password) {
      throw new _AppError.default('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new _AppError.default('Wrong Old Password.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateProfileService;
exports.default = _default;