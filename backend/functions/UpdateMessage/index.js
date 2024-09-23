const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const { text } = JSON.parse(event.body);

  if (id && text) {
    try {
      await db.update({
        TableName: 'shuiMessages',
        Key: {
          id: id,
        },
        UpdateExpression: 'set #text = :text',
        ExpressionAttributeNames: {
          '#text': 'text',
        },
        ExpressionAttributeValues: {
          ':text': text,
        },
      });
      return sendResponse(200, { success: true });
    } catch (error) {
      return sendError(500, { message: error.message });
    }
  } else {
    return sendError(400, { message: 'Missing id or message' });
  }
};