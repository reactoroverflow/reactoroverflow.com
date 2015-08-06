'use strict';

var path = require('path');

var posts = require(path.resolve('./server/controllers/posts.controllers.server.js'));

module.exports = function(app) {
  app.get('/api/posts', posts.renderPosts);

  app.post('/api/posts', posts.storePost);

  app.put('/api/posts', posts.updatePost);

  app.delete('/api/posts', posts.deletePost);
};
