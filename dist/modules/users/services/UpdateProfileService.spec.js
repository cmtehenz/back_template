"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepositories = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepositories"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepositories.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should not be able to update profile without user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'John Doe',
      email: 'john@exemple.com',
      old_password: 'secret',
      password: 'secret'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John John',
      email: 'johnjohn@exemplo.com'
    });
    expect(updateUser.name).toBe('John John');
    expect(updateUser.email).toBe('johnjohn@exemplo.com');
  });
  it('should not be able to change to another user email.', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste@gmail.com',
      password: 'secret'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John John',
      email: 'john@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John John',
      email: 'johnjohn@exemplo.com',
      old_password: 'secret',
      password: '123456'
    });
    expect(updateUser.password).toBe('123456');
  });
  it('should be not able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John John',
      email: 'johnjohn@exemplo.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be not able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John John',
      email: 'johnjohn@exemplo.com',
      password: '123456',
      old_password: 'potato'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});