const { v4 } = require('uuid');
const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function userRepository({
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

  async function getHistories() {
    try {
      const histories = await db.select('*').from('history');

      if (histories) {
        return histories;
      }
      throw new DatabaseException('unable to find any history');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('unable to find any history');
    }
  }

  async function getHistoryByUserId({ user_id: userId }) {
    try {
      const user = await db.select('*')
        .from('history')
        .where('user_id', '=', userId)
        .first();
      if (user) {
        return user;
      }
      throw new DatabaseException("user don't have history");
    } catch (err) {
      logger.error(err);
      throw new DatabaseException("user don't have history");
    }
  }

  async function createHistory(history) {
    try {
      const id = v4();
      const {
        user, request, response, error,
      } = history;
      const inserted = await db('history').insert({
        id,
        request,
        response,
        error,
        user_id: user.id,
        created_at: new Date(),
      });
      if (inserted) {
        return inserted;
      }
      throw new DatabaseException('failed to insert history');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('failed to insert history');
    }
  }

  return {
    getHistories,
    getHistoryByUserId,
    createHistory,
  };
}

module.exports = userRepository;
