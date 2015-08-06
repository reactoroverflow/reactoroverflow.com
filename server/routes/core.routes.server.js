'use strict';

var path = require('path');

var core = require(path.resolve('./server/controllers/core.controllers.server.js'));

module.exports = function(app) {
  app.get('/', core.renderIndex);
  app.get('/api/posts', core.renderPosts);
  
  app.post('/api/posts', core.storePost);

  app.put('/api/posts', core.updatePost);

  app.delete('/apit/posts', core.deletePost);
};
