const { db } = require('../../services/db.js');
const { sendResponse, sendError } = require('../../responses/responses.js');

exports.handler = async (event) => {
    try {
        let { username } = event.pathParameters;

        if (!username) {
            return sendError(400, 'Username is required');
        }

        const { Items } = await db.scan({
            TableName: "shuiMessages",
            FilterExpression: "username = :username",
            ExpressionAttributeValues: { ":username": username },
        });

        if (!Items || Items.length === 0) {
            return sendError(404, 'No messages found for this username');
        }

        return sendResponse(200, Items);
    } catch (error) {
        return sendError(500, error.message);
    }
};