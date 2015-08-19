'use strict';

var path = require('path');

exports.renderIndex = function(req, res) {
  //serve up static index.html
  res.render(path.resolve('./hackOverflow/www/index'), {
    user: req.session.user || null
  });
};
