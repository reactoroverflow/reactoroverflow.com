'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var profiles = require(path.resolve('./server/controllers/profiles.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/profiles').all(auth.loggedIn)
    .get(profiles.renderProfiles)
    .post(profiles.storeProfile);

  app.route('/api/profiles/:profileID').all(auth.loggedIn)
    .get(profiles.renderProfile)
    .put(profiles.updateProfile)
    .delete(profiles.deleteProfile);

  app.param('profileID', profiles.profileByID);

};
