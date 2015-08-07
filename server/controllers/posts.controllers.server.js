'use strict';

var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.renderPosts = function(req, res) {
  var query = {};
  query.match_all = {};

  var search = {};
  search.index = 'posts';
  search.type = 'post';
  search.size = 50;
  search.body = {};
  search.body.query = query;
  search.body.sort = {"created_at" : {"order" : "desc"}};

  client.search(search).then(function (results){
    res.send(results.hits.hits);
  });
};

exports.renderPost = function(req, res) {
  // Return a single post by ID
  res.send(req.post);
};

exports.storePost = function(req, res) {
  var post = {};
  post.title = req.body.title;
  post.author = req.body.author; // Set this on the server side
  post.content = req.body.content;
  post.created_at = Date.now();
  post.comments = [];

  var query = {};
  query.index = 'posts';
  query.type = 'post';
  query._timestamp = {enabled: true};
  query.body = post;

  client.create(query).then(function (results){
    res.json(results);
  });
};

exports.updatePost = function(req, res) {
  // Update a Single Post
};

exports.deletePost = function(req, res) {
  // Delete a Single Post
};

exports.renderComment = function(req, res) {
  res.json(req.comment);
};

exports.addComment = function(req, res) {
  var post = req.post;

  var comment = {};
  comment.postID = post._id;
  comment.content = req.body.content;
  comment.author = req.body.author; // Set this on the server side
  comment.created_at = Date.now();

  var query = {};
  query.index = 'comments';
  query.type = 'comment';
  query._timestamp = {enabled: true};
  query.body = comment;

  client.create(query).then(function (results) {
    res.json(results);
  });
};

exports.updateComment = function(req, res) {

};

exports.deleteComment = function(req, res) {

};

exports.postByID = function(req, res, next, id) {
  var query = {};
  query.index = 'posts';
  query.type = 'post';
  query.id = id;

  client.get(query).then(function (result) {
    req.post = result;
    next();
  });
};

exports.commentByID = function(req, res, next, id) {
  var query = {};
  query.index = 'comments';
  query.type = 'comment';
  query.id = id;

  client.get(query).then(function (result) {
    req.comment = result;
    next();
  });
};
