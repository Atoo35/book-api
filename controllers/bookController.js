const { StatusCodes: { CREATED } } = require('http-status-codes');
const { send } = require("../clients/kafka");
const logger = require("../common/logger");
const bookService = require("../services/bookService");

const createBook = async (req, res, next) => {
    try {
        logger.info('bookController: createBook');
        const { body } = req;
        const result = await bookService.createBook(body);
        await send(result);
        res.status(CREATED).json(result);
    } catch (error) {
        logger.error(`Got error in createBook: ${error.message}`);
        next(error);
    }
}

module.exports = {
    createBook,
};