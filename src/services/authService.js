const { permissionPolicy } = require('../policies');
const { PolicyType } = require('../models');

class AuthService {
  constructor({
    userRepository,
    roleRepository,
    groupRepository,
    policyRepository,
    authValidator,
    loggerService,
  }) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.groupRepository = groupRepository;
    this.policyRepository = policyRepository;
    this.authValidator = authValidator;
    this.logger = loggerService;
  }

  checkUserAuthoization(user, policy, policyType, args) {

  }

  generateNewPolicies(policyType, instance, user) {
    // TODO: on create object (workflow,group,role) add create custom roles,
    // and grant access to creator
  }
}

module.exports = AuthService;
