// Application Imports
import logger from '#common/logger.js'; // Application Logger
import app from '#common/express.js'; // Express Application
import mongoose from '#common/mongoose.js'; // Mongoose Manager
import { santizizeAndValidateInputs } from '#common/validator.js';
import routes from '#routes/index.js'; // Routes

// Connect to Mongo(ose) DB!
mongoose();

// Validation And Sanitization Efforts
app.use(santizizeAndValidateInputs)

// App Use Routes!
app.use(routes);

// App Error Handler
app.use((error, req, res) => {
    // Logging
    logger.info(`Error encountered.`);
    logger.error(`Error encountered. ${error}`);
    logger.debug(`Error encountered. Error Stack: ${error.stack}`);

    // Expand on HTTP Codes

    // Generic Error Response
    return res.json({ message: 'Error encountered. Please try again.' });
});

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
export default app;
