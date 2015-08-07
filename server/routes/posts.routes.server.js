'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var posts = require(path.resolve('./server/controllers/posts.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/posts').all(auth.loggedIn)
    .get(posts.renderPosts)
    .post(posts.storePost);

  app.route('/api/posts/:postID').all(auth.loggedIn)
    .get(posts.renderPost)
    .put(posts.updatePost)
    .delete(posts.deletePost);

  app.route('/api/posts/:postID/comments').all(auth.loggedIn)
    .post(posts.addComment);

  app.route('/api/posts/:postID/comments/:commentID').all(auth.loggedIn)
    .get(posts.renderComment)
    .put(posts.updateComment)
    .delete(posts.deleteComment);

  app.param('postID', posts.postByID);

  app.param('commentID', posts.commentByID);

};
