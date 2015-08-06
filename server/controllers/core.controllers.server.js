'use strict';

var path = require('path');

exports.renderIndex = function(req, res) {
  //serve up static index.html
  res.sendFile(path.resolve('./client/index.html'));
};




//use an ORM inside these functions? If not we need models.
exports.renderPosts = function(req, res) {
  //tell model to query the db for posts
  
  // need to res.json(results)
};

exports.storePost = function(req, res) {
  //tell model to send a post to the db
    //need to res.sendStatus(201)
};

exports.updatePost = function(req, res) {
  //tell model to update a post with a comment or upvote
};

exports.deletePosts = function(req, res) {
  //tell model to delete a post
};
