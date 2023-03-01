// Imports
import express from 'express';
const router = express.Router();

// Route Functions
import ping from "./ping.js";

/**
*  Register Ping Routes
*  @param1 route
*  @param2 routeFunction(req, res)
**/
router.get('/ping', ping);

/**
*  Export Common Routes
*  @public
**/
export default router;
