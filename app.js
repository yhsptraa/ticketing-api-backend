const { env, port } = require('./src/core/config');
const logger = require('./src/core/logger')('app');
const server = require('./src/core/server');

const app = server.listen(port, (err) => {
    if (err) {
        logger.fatal(err, 'Failed to start the server.');
        process.exit(1);
    } else {
        logger.info(`Server runs at port ${port} in ${env} environment`);
    }
});

process.on('uncaughtException', (err) => {
    logger.fatal(err, 'Uncaught exception.');
    app.close(() => process.exit(1));
    setTimeout(() => process.abort(), 1000).unref();
    process.exit(1);
});
