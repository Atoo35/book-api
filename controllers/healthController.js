const { StatusCodes: { SERVICE_UNAVAILABLE, OK } } = require('http-status-codes');
const healthService = require('../services/healthService');
const logger = require('../common/logger');
const { send } = require('../clients/kafka');

const getHealthStatus = (req, res, next) => {
    logger.info('healthController: getHealthStatus');
    healthService.healthCheck((error, result) => {
        if (error) {
            res.status(SERVICE_UNAVAILABLE).json(result);
            next();
        } else {
            const payload = {
                message: "all good!!"
            }
            send(payload).then(() => {
                res.status(OK).json(result);
            });
        }
    });
};

module.exports = {
    getHealthStatus,
};