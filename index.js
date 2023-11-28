const express = require('express');
const cors = require('cors');
const http = require('http');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./common/logger');
const httpContext = require('express-http-context');
const errorHandler = require('./middlewares/errorHandler')
const expressPinoLogger = require('express-pino-logger');

const loggerMidlleware = expressPinoLogger({
    logger,
    autoLogging: false,
});

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(httpContext.middleware);
app.use(loggerMidlleware);
app.use(errorHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errors());
routes(app)

const server = http.createServer(app);
// datastore.connect((err) => {
//     if (err) {
//         logger.error(err);
//         process.exit(1);
//     }
server.listen(PORT, '0.0.0.0', () => {
    logger.info(`Server started on port ${PORT}`);
});
// });

process.on('SIGINT', () => {
    server.close((err) => {
        if (err) {
            logger.error(`Unable to close the server: ${err.message}`);
            process.exit(1);
        }
        logger.info('Server stopped successfully');
        process.exit(0);
    });
});