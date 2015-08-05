'use strict';

var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('dev'));



app.use('/client', express.static(path.resolve('./client')));

require(path.resolve('./server/routes/core.routes.server.js'))(app);

module.exports = app;
