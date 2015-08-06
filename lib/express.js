'use strict';

var express = require('express');
var morgan = require('morgan');
var path = require('path');

//var r = require(path.resolve('./lib/rethinkdb'));

var app = express();

app.use(morgan('dev'));

require(path.resolve('./lib/passport.js'))(app);

//app.use('/client', express.static(path.resolve('./client')));
app.use(express.static(path.resolve('./client')));
app.use(express.static(path.resolve('./dist')));

require(path.resolve('./server/routes/core.routes.server.js'))(app);

module.exports = app;
