'use strict';


var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.renderProfiles = function(req, res) {
  var query = {};
  query.match_all = {};

  var search = {};
  search.index = 'profiles';
  search.type = 'profiles';
  search.size = 50;
  search.body = {};
  search.body.query = query;
  search.body.sort = {"created_at" : {"order" : "desc"}};

  client.search(search).then(function (results){
    res.send(results.hits.hits);
  });
};

exports.renderProfile = function(req, res) {
  // Return a single profile by ID
  res.json(req.profile);
};

exports.storeProfile = function(req, res) {
  //TODO: profile schema!
  /*
  var post = {};
  post.title = req.body.title;
  post.author = req.session.user.login;
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
*/
};  

exports.updateProfile = function(req, res) {
  // Update a Single Profile
};

exports.deleteProfile = function(req, res) {
  // Delete a Single Profile
};

exports.profileByID = function(req, res, next, id) {
  var query = {};
  query.index = 'profiles';
  query.type = 'profile';
  query.id = id;

  client.get(query).then(function (result) {
    req.profile = result;
    next();
  });
};
