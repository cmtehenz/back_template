"use strict";

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepositories = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepositories"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepostory;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepositories.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepostory = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepostory);
  });
  it('should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'john@exemplo.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'john@exemplo.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'john@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token.', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepostory, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'john@exemplo.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'john@exemplo.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});