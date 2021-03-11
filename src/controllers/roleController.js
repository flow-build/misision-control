/* eslint-disable no-unused-vars */
const { NotImplementedExcetion } = require('../exceptions');

function roleController({
  authService,
  loggerService: logger,
  roleRepository: repo,
}) {
  async function getList(ctx, next) {
    throw new NotImplementedExcetion();
  }

  async function getById(ctx, next) {
    throw new NotImplementedExcetion();
  }
  async function create(ctx, next) {
    throw new NotImplementedExcetion();
  }

  async function updateById(ctx, next) {
    throw new NotImplementedExcetion();
  }

  async function deleteById(ctx, next) {
    throw new NotImplementedExcetion();
  }

  return {
    getList,
    getById,
    create,
    updateById,
    deleteById,
  };
}

module.exports = roleController;
