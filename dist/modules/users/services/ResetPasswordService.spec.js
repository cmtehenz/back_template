"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepositories = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepositories"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepostory;
let fakeHashProvider;
let resetPassword;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepositories.default();
    fakeUserTokensRepostory = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepostory, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gobarber.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepostory.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: 'secret',
      token
    });
    const updateUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('secret');
    expect(updateUser?.password).toBe('secret');
  });
  it('should not be able to reset password with non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'no-existing-token',
      password: 'secret'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepostory.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: 'secret'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password after than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gobarber.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepostory.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: 'secret',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});