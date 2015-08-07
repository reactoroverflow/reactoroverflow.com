'use strict';

var path = require('path');

exports.renderLogin = function(req, res) {
  res.sendFile(path.resolve('./client/login.html'));
};
