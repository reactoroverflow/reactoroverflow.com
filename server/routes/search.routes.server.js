'use strict';

var path = require('path');

var search = require(path.resolve('./server/controllers/search.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/search').get(search.search);

  app.route('/api/search/posts').get(search.searchPosts);

  app.route('/api/search/comments').get(search.searchComments);

};
