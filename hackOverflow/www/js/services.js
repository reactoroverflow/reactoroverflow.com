// 'use strict';

angular.module('hackOverflow.services', ['ionic'])

.factory('Posts', function ($http) {

  var getPosts = function(cb){
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
      url: 'http://localhost:4000/api/search/tag/'+tagName
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var getPost = function(postID, cb){
    $http({
      method: 'GET',
      url: 'http://localhost:4000/api/posts/'+postID
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var searchPosts = function(text, cb){
    $http({
      method: 'GET',
      url: 'http://localhost:4000/api/search?text='+text
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var addPost = function(post){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/posts',
      data: post
    }).then(function (resp) {
      return resp.data;
    });
  };

  var upVote = function(postID){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/posts/'+postID+'/upvote'
    });
  };

  return {
    getPosts: getPosts,
    getPost: getPost,
    getPostsByTag: getPostsByTag,
    searchPosts: searchPosts,
    addPost: addPost,
    upVote: upVote
  };
})
.factory('Comments', function ($http) {

  var getComments = function(postID, cb){
    $http({
      method: 'GET',
      url: 'http://localhost:4000/api/comments?postID='+postID
    }).then(function (resp) {
      cb(resp.data);
    });
  };

  var addComment = function(post){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/comments',
      data: post
    }).then(function (resp) {
      return resp.data;
    });
  };

  var upVote = function(commentID){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/comments/'+commentID+'/upvote'
    });
  };

  var downVote = function(commentID){
    return $http({
      method: 'POST',
      url: 'http://localhost:4000/api/comments/'+commentID+'/downvote'
    });
  };

  return {
    upVote: upVote,
    downVote: downVote,
    getComments: getComments,
    addComment: addComment
  };
})

/**
 * Provides a way to store a user across views and to download that user.
*/
.factory('Profile', function ($http, $state) {
  var username = null;

  // store user to search
  var setProfile = function(username) {
    this.username = username;
  };

  var getProfile = function(username) {
    return this.username || $state.params.username;
  };

  var downloadProfile = function() {
    console.log("FACTORY", this.getProfile());
    return $http({
      method: 'GET',
      url: '/api/profiles/' + this.getProfile()
    }).then(function(resp) {
      return resp.data;
    });
  };

  var updateProfile = function(username, data) {
    console.log("FACTORY PUT", this.getProfile());
    return $http({
      method:'PUT',
      url: '/api/profiles/' + this.getProfile(),
      data: data
    }).then(function(resp) {
      return resp.data;
    });
  };

  return {
    setProfile: setProfile,
    getProfile: getProfile,
    downloadProfile: downloadProfile,
    updateProfile: updateProfile
  };
})

/**
 * Keep track of signed in user
*/
.factory('User', function() {
  var user = null;
  var setUser = function(username) {
    this.user = username;
  };

  var getUser = function() {
    return this.user;
  };

  return {
    user: user,
    setUser: setUser,
    getUser: getUser
  }
})

/**
 * Saves last state when navigating to another profile
*/
.factory('History', function($ionicHistory, $state, $stateParams, Profile) {
  return {
    lastState: 'app.posts',

    navToProfile: function(username) {
      this.lastState = $ionicHistory.currentStateName();
      // set user
      Profile.setProfile(username);
      $state.go('profileTabs.main', {username: username});
    }
  };
})

.factory('Tags', function() {
  return {
    tags: ['AskHR', 'MarketPlace', 'LPT', 'Random']
  };
});
