// Imports
import mongoose from 'mongoose';
import logger from './logger';

// Mongoose Options
const options = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    dbName: process.env.MONGO_DATABASE,
};

// Declare Mongoose Object
function startMongoose() {
    return mongoose.set('strictQuery', false)
    .connect(process.env.MONGO_URL, options)
    .then(() => {
        // Logging
        logger.info(`MongoDB Connection Initiating`);
        logger.debug(`MongoDB Connection Initiating`);
    })
    .catch(async (error) => {
        // Logging
        logger.info(`MongoDB Connection Error`);
        logger.error(`MongoDB Connection Error: ${error}`);
        logger.debug(`MongoDB Connection Error: ${error}`);
    });
}

// Generate mongooseInstance
let mongooseInstance = startMongoose();

// Heartbeat failure
mongoose.connection.on('disconnected', async function () {
    // Logging
    logger.info(`MongoDB Connection Disconnected`);
    logger.error(`MongoDB Connection Disconnected`);
    logger.debug(`MongoDB Connection Disconnected`);

    // Close Any Active Connections
    // TODO: We shouldn't need this.
    //       Something is causing a
    //       second connection to exist
    //       on reconnect. /shrug
    try {
        await mongoose.connection.close()
    } catch (error) { /* empty */ }

    // Try to Close & Restart
    mongooseInstance = startMongoose();
});


/**
 * Connect To MongoDB
 * @returns {object} Mongoose Connection
 * @public
**/
const connect = () => {
    return mongooseInstance.connection;
};
export default connect;
