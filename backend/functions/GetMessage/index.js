const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');

exports.handler = async (event) => {
    const { id } = event.pathParameters;

    if (id) {
        try {
            const result = await db.get({
                TableName: 'shuiMessages',
                Key: {
                    id: id,
                },
            });

            if (result.Item) {
                return sendResponse(200, result.Item);
            } else {
                return sendError(404, { message: 'User not found' });
            }
        } catch (error) {
            return sendError(500, { message: error.message });
        }
    } else {
        return sendError(400, { message: 'Missing id' });
    }
}