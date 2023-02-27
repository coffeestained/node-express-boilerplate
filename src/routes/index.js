const router = require("express").Router();
const common = require('./common');

/**
*  Register Common Routes
*  @param1 route
*  @param2 routeFunction(req, res)
**/
router.use('/', common);


/**
*  Export Common Routes
*  @public
**/
module.exports = router;
