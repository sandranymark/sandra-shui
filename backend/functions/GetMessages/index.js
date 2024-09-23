const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');

exports.handler = async (event) => {
  try {
    const { Items } = await db.scan({
      TableName: 'shuiMessages',
    });

    if (Items) {
      return sendResponse(200, Items);
    } else {
      sendError(404, { success: false, message: 'No todos found!' });
    }

  } catch (error) {
    return sendError(404, { message: error.message });
  }
};
