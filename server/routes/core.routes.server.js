'use strict';

var path = require('path');

var core = require(path.resolve('./server/controllers/core.controllers.server.js'));

module.exports = function(app) {
  app.get('/', core.renderIndex);
};
