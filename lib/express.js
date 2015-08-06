'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

var app = express();

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

require(path.resolve('./lib/passport.js'))(app);

app.use(express.static(path.resolve('./client')));

require(path.resolve('./server/routes/posts.routes.server.js'))(app);
require(path.resolve('./server/routes/core.routes.server.js'))(app);

module.exports = app;
