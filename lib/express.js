'use strict';

var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use('/client', express.static(path.resolve('./client')));

module.exports = app;
