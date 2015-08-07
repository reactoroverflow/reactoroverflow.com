'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var core = require(path.resolve('./server/controllers/core.controllers.server.js'));

module.exports = function(app) {
  app.get('/', auth.loggedIn, core.renderIndex);
};
