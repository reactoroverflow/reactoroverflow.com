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
      var u = profile._json;
      // Retrieve user from DB.
      var search = {};
      search.index = 'users';
      search.type = 'user';
      search.size = 1;
      search.body = {};
        search.body.query = {};
          search.body.query.match = {};
            search.body.query.match.id = {};
              search.body.query.match.id.query = u.id;
              search.body.query.match.id.fuzziness = 1;
              search.body.query.match.id.operator = "and";
        search.body.sort = '_score';

      client.search(search).then(function (result) {
        if(result.hits.hits.length === 0) {
          // Add the user to the database
          var user = {};
          user.id = u.id;
          user.avatar_url = u.avatar_url;
          user.email = u.email;
          user.login = u.login;
          user.name = u.name;
          user.created_at = Date.now();

          var query = {};
          query.index = 'users';
          query.type = 'user';
          query._timestamp = {enabled: true};
          query.body = user;

          client.create(query).then(function (results){
            req.session.user = user;
            return done(null, user);
          });
        } else {
          req.session.user = result.hits.hits[0]._source;
          return done(null, result.hits.hits[0]._source);
        }
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

};
