'use strict';

var passport = require('passport');
var path = require('path');
var GitHubStrategy = require('passport-github').Strategy;

var config = require(path.resolve('./lib/config'));
var client = require(path.resolve('./lib/elasticsearch'));

module.exports = function(app) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL, // TODO Make the route and controller
      passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
      req.session.user = profile._json;
      return done(null, profile._json);
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

};
