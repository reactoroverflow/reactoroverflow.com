'use strict';

angular.module('RDash.services', [])
.factory('Posts', function ($http) {

  var getPosts = function(cb){
    $http({
      method: 'GET',
      url: '/api/posts'
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var getPostsByTag = function(tagName, cb){
    $http({
      method: 'GET',
      url: '/api/search/tag/'+tagName
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var getPost = function(postID, cb){
    $http({
      method: 'GET',
      url: '/api/posts/'+postID
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var searchPosts = function(text, cb){
    console.log("I am in searchPosts");
    $http({
      method: 'GET',
      url: '/api/search?text='+text
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var addPost = function(post){
    return $http({
      method: 'POST',
      url: '/api/posts',
      data: post
    }).then(function (resp) {
      return resp.data;
    });
  };

  return {
    getPosts: getPosts,
    getPost: getPost,
    getPostsByTag: getPostsByTag,
    searchPosts: searchPosts,
    addPost: addPost
  };
});
