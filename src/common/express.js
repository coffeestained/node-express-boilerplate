// Package Imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

/**
* Declare Express App
* @public
*/
const app = express();

// Register Morgan (HTTP Logging)
app.use(morgan(process.env.ENV === 'development' ? 'combined' : 'tiny'));

// Register Bodyparser (req.body JSON)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register GZIP Compression
app.use(compress());

// Register Method Override
// By setting header to
// <X-Http-Method-Override: 'methodOfChoice'
// Method-Override then supports clients
// That may only support GET / POST as
// an example.
app.use(methodOverride());

// Register Helmet -- Simple Methodology To
// Secure HTTP Requests By Enforcing Certain Header Values
app.use(helmet());

// Register CORS
app.use(cors());

// Register Error Handler


// Export Express App <3
module.exports = app;
