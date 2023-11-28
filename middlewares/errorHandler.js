const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const logger = require('../common/logger');

const errorHandler = (error, req, res, next) => {
    if (error) {
        logger.error(`Got error in errorHandler: ${error.message}`);
        if (error.statusCode) {
            const { statusCode, message, details } = error;
            res.status(statusCode).json({ message, details });
        } else {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    }
    next(error);
};

module.exports = errorHandler;