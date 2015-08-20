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
 * @ngdoc service
 * @name Profile
 * @description
 *   Provides a way to store a username across views in order to access that profile.
*/
.factory('Profile', function ($http, $state) {
  var username = null;

  // store profile to search
  var setProfile = function(username) {
    this.username = username;
  };

  // get profile; defaults to the username param in URL
  var getProfile = function(username) {
    return this.username || $state.params.username;
  };

  /**
   * Requests a given user's profile
   * @memberof Profile
   * @returns {Promise} http response with profile data
   */
  var downloadProfile = function() {
    return $http({
      method: 'GET',
      url: '/api/profiles/' + this.getProfile()
    }).then(function(resp) {
      return resp.data;
    });
  };

  /**
   * Updates a given user's profile
   * @memberof Profile
   * @returns {Promise} http response with profile data
   */
  var updateProfile = function(username, data) {
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
 * @ngdoc service
 * @name User
 * @description
 *   Keeps track of the currently signed in user
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
  };
})

/**
 * @ngdoc service
 * @name History
 * @description
 *   Allows saving of state before navigating to a profile (in order to easily return
 *   to that profile)
*/
.factory('History', function($ionicHistory, $state, $stateParams, Profile) {
  return {
    lastState: 'app.posts',

    /**
     * Navigates to a given profile, while saving the state before the user profile
     * @memberof History
     */
    navToProfile: function(username) {
      this.lastState = $ionicHistory.currentStateName();
      // set user in Profile Service (in order to access in profile controller)
      // Profile.setProfile(username);
      $state.go('profileTabs.main', {username: username});
    }
  };
})

.factory('Tags', function() {
  return {
    tags: ['AskHR', 'MarketPlace', 'LPT', 'Random']
  };
});
