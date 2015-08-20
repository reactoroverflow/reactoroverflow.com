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
    search.size = 1000;
    search.body = {};
      search.body.query = {};
        search.body.query.match = {};
          search.body.query.match.postID = {};
            search.body.query.match.postID.query = postID;
            search.body.query.match.postID.fuzziness = 1;
            search.body.query.match.postID.operator = "and";
      search.body.sort = {"created_at" : {"order" : "asc"}};


    client.search(search).then(function (result) {
      var hits = result.hits.hits;
      for(var i=0; i<hits.length; i++) {
        hits[i].votes = hits[i]._source.upvotes.length - hits[i]._source.downvotes.length;
      }
      res.json(hits);
    });
  }
  
};

exports.renderComment = function(req, res) {
  res.json(req.comment);
};

exports.storeComment = function(req, res) {
  var comment = {};
  comment.postID = req.body.postID;
  comment.content = req.body.content;
  comment.author = req.session.user.login;
  comment.replies = [];
  comment.upvotes = [];
  comment.downvotes = [];
  comment.created_at = Date.now();

  var query = {};
  query.index = 'comments';
  query.type = 'comment';
  query._timestamp = {enabled: true};
  query.body = comment;

  client.create(query).then(function (results) {
    var commentID = results._id;
    
    var query = {};
    query.index = 'comments';
    query.type = 'comment';
    query.id = commentID;

    client.get(query).then(function (newComment) {
      res.json(newComment);
    });
  });
};

exports.upvoteComment = function(req, res) {

  var comment = req.comment;
  if(!comment._source.upvotes) {
    comment._source.upvotes = [];
  }

  if(comment._source.upvotes.indexOf(req.session.user.login) === -1) {
    comment._source.upvotes.push(req.session.user.login);
  }
  var update = {};
  update.index = 'comments';
  update.type = 'comment';
  update.id = comment._id;
  update.body = {};
  update.body.doc = {};
  update.body.doc.upvotes = comment._source.upvotes;
  client.update(update).then(function (result) {
    res.send(result);
  });
};

exports.downvoteComment = function(req, res) {
  var comment = req.comment;

  if(!comment._source.upvotes) {
    comment._source.upvotes = [];
  }
  if(comment._source.upvotes.indexOf(req.session.user.login) > -1) {
    comment._source.upvotes.splice(comment._source.upvotes.indexOf(req.session.user.login), 1);
  }

  var update = {};
  update.index = 'comments';
  update.type = 'comment';
  update.id = comment._id;
  update.body = {};
  update.body.doc = {};
  update.body.doc.upvotes = comment._source.upvotes;
  client.update(update).then(function (result) {
    res.send(result);
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
