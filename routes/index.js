
const healthController = require('../controllers/healthController');
const bookController = require('../controllers/bookController');

module.exports = (app) => {
    app.get('/health', healthController.getHealthStatus);

    app.post('/book', bookController.createBook);
}