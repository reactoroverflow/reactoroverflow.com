'use strict';

var path = require('path');

var auth = require(path.resolve('./server/controllers/auth.controllers.server.js'));
var comments = require(path.resolve('./server/controllers/comments.controllers.server.js'));

module.exports = function(app) {

  app.route('/api/comments').all(auth.loggedIn)
    .get(comments.renderComments)
    .post(comments.storeComment);

  app.route('/api/comments/:commentID').all(auth.loggedIn)
    .get(comments.renderComment)
    .put(comments.updateComment)
    .delete(comments.deleteComment);

  app.param('commentID', comments.commentByID);

};
