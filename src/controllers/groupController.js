/* eslint-disable no-unused-vars */
const { NotImplementedExcetion } = require('../exceptions');

function groupController({
  authService,
  loggerService: logger,
  groupRepository: repo,
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

module.exports = groupController;
