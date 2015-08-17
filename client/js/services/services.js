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
})
.factory('Comments', function ($http) {

  var getComments = function(postID, cb){
    $http({
      method: 'GET',
      url: '/api/comments?postID='+postID
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var addComment = function(post){
    return $http({
      method: 'POST',
      url: '/api/comments',
      data: post
    }).then(function (resp) {
      return resp.data;
    });
  };

  var upVote = function(commentID, user, cb){
    console.log("user ==== ", user)
    return $http({
      method: 'POST',
      url: '/api/comments/'+commentID+'/upvote',
      data: user
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  // var downVote = function(commentID, user, cb){
  //   return $http({
  //     method: 'POST',
  //     url: '/api/comments'+commentID,
  //     data: user
  //   }).then(function (resp) {
  //     cb(resp.data);
  //   });
  // };

  return {
    upVote: upVote,
    // downVote: downVote,
    getComments: getComments,
    addComment: addComment
  };
});
