const router = require("express").Router();
const ping = require("./ping");

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
module.exports = router;
