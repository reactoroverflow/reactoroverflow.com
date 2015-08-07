'use strict';

var path = require('path');

exports.renderLogin = function(req, res) {
  if(req.session.user){
    res.redirect('/');
  } else {
    res.sendFile(path.resolve('./client/login.html'));
  }
  
};
