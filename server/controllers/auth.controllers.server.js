'use strict';

var path = require('path');

exports.renderLogin = function(req, res) {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.resolve('./hackOverflow/www/landing.html'));
  }
  
};

exports.loggedIn = function(req, res, next) {
  console.log(req.session.user)
  if(req.session.user === undefined) {
    res.redirect('/login');
    res.end();
  } else {
    next();
  }
};

