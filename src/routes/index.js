// Imports
import express from 'express';
const router = express.Router();

// Import Aggregated Routes
import common from '#routes/common/routes.js';

/**
*  Register Aggregated Routes
*  @param1 route
*  @param2 routeFunction(req, res)
**/
router.use('/', common);

/**
*  Export Aggregated Routes
*  @public
**/
export default router;
