// Imports!
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env'),
});
const logger = require('./common/logger');
const app = require('./common/express');
const mongoose = require('./common/mongoose');

// Connect to Mongo(ose) DB!
mongoose.connect();

// App Use Routes!
app.use(require('./routes/index'));

// App Error Handler

// Listening
const port = process.env.PORT || 3000;
app.listen(
    port,
    () => {
        // Logging
        logger.info(`Server Started. Port: ${port}`);
        logger.debug(`Server Started. Port: ${port}`);
    },
);

/**
*  Export Application
*  @public
**/
module.exports = app;
