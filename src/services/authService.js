const crypto = require('crypto');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const {
  AuthorizationException,
  AuthenticationException,
} = require('../exceptions');
// eslint-disable-next-line no-unused-vars
const { permissionPolicy } = require('../policies');
// eslint-disable-next-line no-unused-vars
const { PolicyType } = require('../models');

class AuthService {
  constructor({
    userRepository,
    roleRepository,
    groupRepository,
    policyRepository,
    cryptoService,
    loggerService,
    webOptions,
  }) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.groupRepository = groupRepository;
    this.policyRepository = policyRepository;
    this.logger = loggerService;
    this.cryptoService = cryptoService;
    this.jwtSecret = webOptions.jwtSecret;
  }

  async createUser(user) {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const password = this.cryptoService.encryptPayload(randomBytes);
    const id = uuid();
    await this.userRepository.createUser({
      ...user,
      id,
      password,
    });
    return {
      ...user,
      id,
      password: randomBytes,
    };
  }

  async loginUser(userDTO) {
    const {
      password,
      email,
    } = userDTO;

    const user = await this.userRepository.getUserByEmail({ email });
    const encryptedPassword = this.cryptoService.encryptPayload(password);

    if (user.encryptedPassword === encryptedPassword) {
      const encryptedUser = this.cryptoService.encryptPayload(user);
      const token = jwt.sign({ payload: encryptedUser },
        this.jwtSecret,
        { expiresIn: '6h' });

      return token;
    }
    throw new AuthenticationException('invallid login');
  }

  async changePassword(requestDTO) {
    const { id, ...passwords } = requestDTO;
    const user = await this.userRepository.getUserById({ id });

    const encryptedCurrentPassword = this.cryptoService.encryptPayload(
      passwords.currentPassword,
    );
    if (user.encryptedPassword === encryptedCurrentPassword) {
      if (passwords.password === passwords.confirmationPassword) {
        const { password } = passwords;
        const encryptedPassword = this.cryptoService.encryptPayload(password);

        await this.userRepository.updateUser({
          id,
          password: encryptedPassword,
        });
        return;
      }
    }
    throw new AuthorizationException('current password invalid');
  }

  async authenticateUser(token) {
    try {
      jwt.verify(token, this.jwtSecret);
      const decryptedToken = jwt.decode(token, this.jwtSecret);
      const { payload } = decryptedToken;
      const user = this.cryptoService.decryptPayload(payload);
      return user;
    } catch (err) {
      throw new AuthenticationException(err, 'error on decrypt token');
    }
  }
}

module.exports = AuthService;
