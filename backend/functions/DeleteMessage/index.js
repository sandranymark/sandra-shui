const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  if (id) {
    try {
      await db.delete({
        TableName: 'shuiMessages',
        Key: {
          id: id,
        }
      });
      return sendResponse(200, { success: true });
    } catch (error) {
      return sendError(500, { message: error.message });
    }
  } else {
    return sendError(400, { message: 'Missing id' });
  }
};
