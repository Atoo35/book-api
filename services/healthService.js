const { StatusCodes: { OK } } = require('http-status-codes');

const healthCheck = (callback) => {
    const result = {};
    result.status = OK;
    callback(null, result);
};

module.exports = {
    healthCheck,
};