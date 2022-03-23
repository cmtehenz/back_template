"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepositories = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepositories"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepositories.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: 'secret'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@exemple.com');
  });
  it('should not be able to show profile with invalid id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: 'secret'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@exemple.com');
  });
  it('should not be able to show profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'not-existing user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});