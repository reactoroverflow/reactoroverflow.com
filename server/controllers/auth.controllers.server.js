'use strict';

var path = require('path');

exports.renderLogin = function(req, res) {
  if(req.session.user) {
    res.redirect('/');
  } else {
    res.sendFile(path.resolve('./client/login.html'));
  }
  
};

exports.loggedIn = function(req, res, next) {
  console.log(req.session.user);
  if(req.session.user === undefined) {
    console.log("Not Logged IN");
    res.redirect('/login');
    res.end();
  } else {
    next();
  }
};
