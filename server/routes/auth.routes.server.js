'use strict';

var passport = require('passport');
var path = require('path');
var profiles = require(path.resolve('./server/controllers/profiles.controllers.server.js'));
var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));

module.exports = function(app) {

  app.route('/login').get(auth.renderLogin);

  app.get('/api/auth/github', 
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res) { }
  );

  app.get('/api/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('success');
      //console.log(req.user._raw);
      req.session.user = req.user;
      profiles.findOrStoreProfile(req.user, function(result) {
        req.session.profile = result;
        console.log("profile is " + result)
        res.redirect('/');
      })
    }
  );

  app.get('/logout', function(req, res){
    req.session.user = undefined;
    req.logout();
    res.redirect('/');
  });

};
