'use strict';
/**
 * Post Controller
 */

angular.module('RDash')
.controller('PostCtrl', function PostCtrl($scope) {
  $scope.data = {
    posts: [
      {
        title: 'how to make a grown man cry',
        author: 'Andrew Koshinoko',
        content: 'first you need to push them onto the ground and then...',
        tags: ['#cry', '#cruelty']
      }
    ]
  }; // clear out this test data when ready

  $scope.fetch = function(){
    console.log('I am in the PostCtrl trying to fetch post')
    console.log('postID = ', $scope.data.post.postID)
    $scope.data.post = Posts.getPost($scope.data.post.postID)
  };

  // $scope.fetch();

});
