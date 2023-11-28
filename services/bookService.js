const logger = require("../common/logger");

const createBook = async (book) => {
    // const bookModel = new Book(book);
    // return await bookModel.save();
    logger.info(`bookService: createBook: ${JSON.stringify(book)}`);
    return book;
}

module.exports = {
    createBook,
};