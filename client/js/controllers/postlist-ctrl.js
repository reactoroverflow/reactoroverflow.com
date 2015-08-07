'use strict';
/**
 * PostList Controller
 */

angular.module('RDash')
.controller('PostListCtrl', ['$scope', 'Posts', PostListCtrl]);

function PostListCtrl($scope, Posts) {

  $scope.data = {
    posts: [
      {
        title: "Test",
        author: "Andrew Kishino",
        content: "Hi Guys",
        created_at:
        tags: []
      },
      {
        title: "Test2",
        author: "Kevin Schweigert",
        content: "Hi Guys",
        tags: []
      },
      {
        title: "Test3",
        author: "Lina Lu",
        content: "Hi Guys",
        tags: []
      },
      {
        title: "Test4",
        author: "Cody Daig",
        content: "Hi Guys",
        tags: []
      }
    ]
  };

  // $scope.getPosts = function() {
  //   Posts.getPosts(function(data) {
  //     $scope.data.posts = data;
  //     console.log('===========', data);
  //   });
  // };

  // $scope.getPosts();
};
