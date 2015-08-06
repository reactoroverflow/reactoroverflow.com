'use strict';

var path = require('path');


exports.renderIndex = function(req, res) {
  //serve up static index.html
  res.sendFile(path.resolve('./client/index.html'));
};
