//Cody, please work your magic with the db query's :)

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

  client.search(search).then(function(results){
    res.json(results.hits.hits);
  });
};

exports.renderPost = function(req, res) {
  // Return a single post by ID
  res.json(req.post);
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

  client.create(query).then(function(results){
    res.json(results);
  });
};

exports.updatePost = function(req, res) {
  //tell model to update a post 
  r.table('posts').get().update().run(conn); //<----input value for get
};

exports.deletePost = function(req, res) {
  //tell model to delete a post
  r.table("posts").get().delete().run(conn); //<----needs major attention
};

exports.postByID = function(req, res, next, id) {

  var query = {};
  query.index = 'posts';
  query.type = 'post';
  query.id = id;

  client.get(query).then(function(result){
    req.post = result;
    next();
  });

  
};
