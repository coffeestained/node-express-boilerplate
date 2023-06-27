// Application Imports
import logger from '@common/logger'; // Application Logger
import app from '@common/express'; // Express Application
import mongoose from '@common/mongoose'; // Mongoose Manager
import { santizizeAndValidateInputs } from '@common/validator';
import routes from '@routes/index'; // Routes
import { NextFunction, Request, Response } from 'express';

// Connect to Mongo(ose) DB!
mongoose();

// Validation And Sanitization Efforts
app.use(santizizeAndValidateInputs)

// App Use Routes!
app.use(routes);

// App Error Handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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
