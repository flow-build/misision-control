/* eslint-disable no-bitwise */
const { PolicyType } = require('../models');

const defaultPolicy = { type: PolicyType.NONE };

function userHasPermission(policy, policyType, user) {
  const userPolicy = (user.policies.find((x) => x.name.startsWith(policy))
  || defaultPolicy);

  const neededPolicy = PolicyType[policyType];
  const userHasGrantedAcess = (userPolicy
  && (userPolicy.type & neededPolicy) > 0);

  return Boolean(userHasGrantedAcess);
}

module.exports = {
  PolicyType,
  userHasPermission,
};
