// 'use strict';


var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.renderPosts = function(req, res) {
  console.log("Rendering")
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
  res.json(req.post);
};

exports.storePost = function(req, res) {
  console.log("STORING")
  var post = {};
  post.title = req.body.title;
  // post.author = req.session.user.login;
  post.author = "JAY";
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.data = req.body.data;
  post.created_at = Date.now();
  
  var query = {};
  query.index = 'posts';
  query.type = 'post';
  query._timestamp = {enabled: true};
  query.body = post;

  client.create(query).then(function (results){
    console.log(results);
    res.json(results);
  });
};  

exports.upvotePost = function(req, res) {
  var post = req.post;
  if(!post._source.upvotes) {
    post._source.upvotes = [];
  }

  if(post._source.upvotes.indexOf(req.session.user.login) === -1) {
    post._source.upvotes.push(req.session.user.login);
  } else {
    res.send(412);
    return;
  }

  var update = {};
  update.index = 'posts';
  update.type = 'post';
  update.id = post._id;
  update.body = {};
  update.body.doc = {};
  update.body.doc.upvotes = post._source.upvotes;
  client.update(update).then(function (result) {
    res.send(204);
  });
}

exports.removeUpvote = function(req, res) {
  var post = req.post;
  
  if(!post._source.upvotes) {
    res.send(412);
  }
  var userIndex = post._source.upvotes.indexOf(req.session.user.login);
  if(userIndex === -1) {
    res.send(412);
  }
  post._source.upvoted.splice(userIndex);
  var update = {};
  update.index = 'posts';
  update.type = 'post';
  update.id = post._id;
  update.body = {};
  update.body.doc = {};
  update.body.doc.upvotes = post._source.upvotes;
  client.update(update).then(function (result) {
    res.send(204);
  });

}

exports.updatePost = function(req, res) {
  // Update a Single Post
};

exports.deletePost = function(req, res) {
  // Delete a Single Post
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
