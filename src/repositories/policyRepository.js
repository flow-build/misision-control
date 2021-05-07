const { DependencyNotFoundException } = require('../exceptions');

function policyRepository({
  instanceService,
  loggerService: logger,
}) {
  if (!instanceService) {
    throw new DependencyNotFoundException('instance Service');
  }
  if (!logger) {
    throw new DependencyNotFoundException('logger Service');
  }

  const { db } = instanceService;

  async function listPolicies({}) {

  }

  async function getPolicy({}) {

  }

  async function createPolicy({}) {
  }

  async function updatePolicy({}) {

  }

  async function disablePolocy({}) {

  }

  return {
    listPolicies,
    getPolicy,
    createPolicy,
    updatePolicy,
    disablePolocy,
  };
}

module.exports = policyRepository;
