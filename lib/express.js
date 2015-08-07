'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');

var client = require(path.resolve('./lib/elasticsearch'));

var sessionstore = require('sessionstore');

var app = express();

//app.use(morgan('dev'));

app.use(function (req, res, next) {
  console.log(req.user);
  next();
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// parse application/json 
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'keyboard cat fjdkslfjkdslvyuidogvhjkbvhdfkubvksbv',
  store: sessionstore.createSessionStore({
    type: 'elasticsearch',
    host: 'localhost:9200',    // optional
    prefix: '',                // optional
    index: 'express',          // optional
    typeName: 'session',       // optional
    pingInterval: 1000,        // optional
    timeout: 10000             // optional
  })
}));

require(path.resolve('./lib/passport.js'))(app);

app.use(express.static(path.resolve('./client')));

require(path.resolve('./server/routes/posts.routes.server.js'))(app);
require(path.resolve('./server/routes/search.routes.server.js'))(app);
require(path.resolve('./server/routes/auth.routes.server.js'))(app);
require(path.resolve('./server/routes/core.routes.server.js'))(app);

module.exports = app;
