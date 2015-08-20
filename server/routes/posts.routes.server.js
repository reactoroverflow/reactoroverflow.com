'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var posts = require(path.resolve('./server/controllers/posts.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/posts')
    .get(posts.renderPosts)
    .post(posts.storePost);

  app.route('/api/posts/:postID')
    .get(posts.renderPost)
    .put(posts.updatePost)
    .delete(posts.deletePost);

  app.route('/api/posts/:postID/upvote').all(auth.loggedIn)
    .post(posts.upvotePost)
    .get(posts.upvotePost);

  app.param('postID', posts.postByID);

};
