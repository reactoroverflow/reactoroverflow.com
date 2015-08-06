'use strict';

var path = require('path');

var posts = require(path.resolve('./server/controllers/posts.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/posts')
    .get(posts.renderPosts)
    .post(posts.storePost);

  app.route('/api/posts/:postID')
    .get(posts.renderPost)
    .put(posts.updatePost)
    .delete(posts.deletePost);

  app.route('/api/posts/:postID/comments')
    .post(posts.addComment);

  app.route('/api/posts/:postID/comments/:commentID')
    .get(posts.renderComment)
    .put(posts.updateComment)
    .delete(posts.deleteComment);

  app.param('postID', posts.postByID);

  app.param('commentID', posts.commentByID);

};
