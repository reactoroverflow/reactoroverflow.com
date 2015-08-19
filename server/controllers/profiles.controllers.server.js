'use strict';


var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.renderProfiles = function(req, res) {
  //res.send("You got the renderProfiles endpoint!");
  
  var query = {};
  query.match_all = {};

  var search = {};
  search.index = 'profiles';
  search.type = 'profile';
  search.size = 50;
  search.body = {};
  search.body.query = query;
  //search.body.sort = {"created_at" : {"order" : "desc"}};

  client.search(search).then(function (results){
    res.send(results.hits.hits);
  });
  
};

exports.renderProfile = function(req, res) {
  // Return a single profile by ID
  res.json(req.profile);
};

exports.findOrStoreProfile = function(username, callback) {
  

  var query = {};
  query.index = 'profiles';
  query.type = 'profile';
  query.id = username;
  //Look for a profile associated with the provided username
  client.get(query, function (error, result) {
    if (error) {
      //If no profile exists, create a new one
      console.log("Error: " + error);
      var sampleProfile = 
      {
        blog: 'www.blog.com',
        website: 'www.homepage.com',
        hometown: 'San Francisco',
        bio: 'Example bio',
        social: {
          facebook: 'www.facebook.com',
          linkedin: 'www.linkedin.com',
          twitter: 'www.twitter.com',
          instagram: 'www.instagram.com'
        }
      }
      var profile = sampleProfile;
      profile.created_at = Date.now();

      var query = {};
      query.index = 'profiles';
      query.type = 'profile';
      query.id = username;
      query._timestamp = {enabled: true};
      query.body = profile;
      //Add the newly-created profile to the database
      client.create(query, function(error, results) {
        if (error) {
          res.send("User with that name already exists");
        } else {
          //callback on the new profile
          callback(results);
        }
      });
    } else {
      //callback on the found profile
      callback(result);
    }
  });
};  

exports.updateProfile = function(req, res) {
  // Update a Single Profile
};

exports.deleteProfile = function(req, res) {
  // Delete a Single Profile
};

exports.profileByUsername = function(req, res, next, username) {
  var query = {};
  query.index = 'profiles';
  query.type = 'profile';
  //TODO: FIX THIS
  query.id = username;

  // req.username = username;
  // next();
  
  client.get(query, function (error, result) {
    req.username = username;
    if (error) {
      console.log("Error: " + error);
    } else {
      req.profile = result;
    }
    next();
  });
};
