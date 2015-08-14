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
      
      // Retrieve user from DB.

      // If user does not exist, make sure user is a member of the HackReactor organization.
        // If user is member of HackReactor, add user to db and continue.
        // Else, Return unauthorized. THis site is for HackReactor students/staff/alumni only.

      req.session.user = profile._json;

      return done(null, profile._json);
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

};
