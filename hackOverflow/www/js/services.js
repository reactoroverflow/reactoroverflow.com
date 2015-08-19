// 'use strict';

angular.module('hackOverflow.services', ['ionic'])

.factory('Posts', function ($http) {

  var getPosts = function(cb){
    console.log("getting posts");
    $http({
      method: 'GET',
      url: 'http://localhost:4000/api/posts'
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
    console.log("--->",post)
    console.log("Posting posts")
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/posts',
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

  var upVote = function(commentID){
    return $http({
      method: 'POST',
      url: '/api/comments/'+commentID+'/upvote'
    });
  };

  var downVote = function(commentID){
    return $http({
      method: 'POST',
      url: '/api/comments/'+commentID+'/downvote'
    });
  };

  return {
    upVote: upVote,
    downVote: downVote,
    getComments: getComments,
    addComment: addComment
  };
})

.factory('History', function($ionicHistory, $state) {
  return {
    lastState: null,

    navToProfile: function() {
      this.lastState = $ionicHistory.currentStateName();
      console.log("STATE", this.lastState, this);
      $state.go('profileTabs.main');
    }
  };
});
