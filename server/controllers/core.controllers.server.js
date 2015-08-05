'use strict';

var path = require('path');

exports.renderIndex = function(req, res) {
  res.sendFile(path.resolve('./client/index.html'));
};
