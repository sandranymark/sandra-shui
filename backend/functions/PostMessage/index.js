const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');
const { v4: uuid } = require('uuid');




exports.handler = async (event) => {
  const now = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  const { username, text } = JSON.parse(event.body);
  const id = uuid().substring(0, 8);

  if (username && text) {
    try {
      await db.put({
        TableName: 'shuiMessages',
        Item: {
          id: id,
          username: username,
          text: text,
          createdAt: now, // Används för tidszon Stockholm (svensk tid/datum)
        }
      });
      return sendResponse(200, { success: true });
    } catch (error) {
      return sendError(500, { message: error.message });
    }
  } else {
    return sendError(400, { message: 'Missing username or text' });
  }
};