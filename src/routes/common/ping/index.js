const logger = require('../../../common/logger');

const ping = function ping(req, res) {
    // Logging
    logger.info(`Server Ping Received`);
    logger.debug(`Server Ping Received`, req);

    // Return Response
    return res.status(200).json({
        pingReceived: true
    })
};

module.exports = ping;
