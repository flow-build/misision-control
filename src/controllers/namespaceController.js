function namespaceController({
  loggerService: logger,
  namespaceRepository: repo,
}) {
  async function listNamespaces(ctx, next) {

  }

  async function getNamespaceById(ctx, next) {

  }
  async function createNamespace(ctx, next) {

  }

  async function editNamespace(ctx, next) {

  }

  async function deleteNamespace(ctx, next) {

  }

  return {
    listNamespaces,
    getNamespaceById,
    createNamespace,
    editNamespace,
    deleteNamespace,
  };
}

module.exports = namespaceController;
