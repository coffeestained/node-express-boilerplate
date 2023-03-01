// Import Application Stuff
import logger from '#root/src/common/logger.js';

const ping = function ping(req, res, next) {
    try {
        // Logging
        logger.info(`Server Ping Received`);
        logger.debug(`Server Ping Received`, req);

        // Return Response
        return res.status(200).json({
            pingReceived: true
        })
    } catch (error) {
        next(error);
    }
};

export default ping;
