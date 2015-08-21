'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var profiles = require(path.resolve('./server/controllers/profiles.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/profiles').all(auth.loggedIn)
    .get(profiles.renderProfiles);

  app.route('/api/profiles/:username').all(auth.loggedIn)
    .get(profiles.renderProfile)
    //.post(profiles.storeProfile)
    .put(profiles.updateProfile)
    .delete(profiles.deleteProfile);
  
  app.route('/api/profiles/setpair/:username').all(auth.loggedIn)
    .post(profiles.setPair);
  
  app.route('/api/profiles/currentuser').all(auth.loggedIn)
    .get(profiles.getCurrent);

  app.param('username', profiles.profileByUsername);

};
