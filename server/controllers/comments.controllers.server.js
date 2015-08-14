'use strict';

var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.renderComments = function(req, res) {
  var postID = req.query.postID;
  var search;

  if(!postID) {
    var query = {};
    query.match_all = {};

    search = {};
    search.index = 'comments';
    search.type = 'comment';
    search.size = 50;
    search.body = {};
    search.body.query = query;
    search.body.sort = {"created_at" : {"order" : "desc"}};

    client.search(search).then(function (results){
      res.send(results.hits.hits);
    });
  } else {
    search = {};
    search.index = 'comments';
    search.type = 'comment';
    search.size = 10;
    search.body = {};
      search.body.query = {};
        search.body.query.match = {};
          search.body.query.match.tags = {};
            search.body.query.match.tags.query = postID;
            search.body.query.match.tags.fuzziness = 1;
            search.body.query.match.tags.operator = "and";
      search.body.sort = '_score';

    client.search(search).then(function (result) {
      res.json(result.hits.hits);
    });
  }
  
};

exports.renderComment = function(req, res) {
  res.json(req.comment);
};

exports.storeComment = function(req, res) {
  var post = req.body;

  var comment = {};
  comment.postID = post._id;
  comment.content = req.body.content;
  comment.author = req.session.user.login;
  comment.replies = [];
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
