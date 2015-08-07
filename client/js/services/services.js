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

  var searchPosts = function(text){
    return $http({
      method: 'GET',
      url: '/api/search?text='+text
    }).then(function (resp) {
      return resp.data;
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
    searchPosts: searchPosts,
    addPost: addPost
  };
});
