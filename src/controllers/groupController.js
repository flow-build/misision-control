function groupController({
  authService,
  loggerService: logger,
  groupRepository: repo,
}) {
  async function listGroups(ctx, next) {

  }

  async function getGroupById(ctx, next) {

  }
  async function createGroup(ctx, next) {

  }

  async function editGroup(ctx, next) {

  }

  async function deleteGroup(ctx, next) {

  }


  return {
    listGroups,
    getGroupById,
    createGroup,
    editGroup,
    deleteGroup,
  };
}

module.exports = groupController;
