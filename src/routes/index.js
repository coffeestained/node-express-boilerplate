// Imports
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '#configs/swagger.json' assert { type: "json" };

// Import Aggregated Routes
import common from '#routes/common/routes.js';

// Vars
const router = express.Router();
const apiPrefix = `/api/v${process.env.API_VERSION}`

/**
*  Register Aggregated Routes
*  @param1 route
*  @param2 routeFunction(req, res)
**/
router.use(apiPrefix, common);

// Swagger Section
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


/**
*  Export Aggregated Routes
*  @public
**/
export default router;
