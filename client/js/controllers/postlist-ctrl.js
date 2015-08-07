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
        content: "Street art keytar Schlitz Vice, ugh art party tofu. Cold-pressed pug disrupt health goth listicle, fixie ennui salvia aesthetic skateboard paleo mixtape XOXO.",
        created_at: Date.now(),
        tags: []
      },
      {
        title: "Test2",
        author: "Kevin Schweigert",
        content: "Street art keytar Schlitz Vice, ugh art party tofu. Cold-pressed pug disrupt health goth listicle, fixie ennui salvia aesthetic skateboard paleo mixtape XOXO.",
        created_at: Date.now(),
        tags: []
      },
      {
        title: "Test3",
        author: "Lina Lu",
        content: "Street art keytar Schlitz Vice, ugh art party tofu. Cold-pressed pug disrupt health goth listicle, fixie ennui salvia aesthetic skateboard paleo mixtape XOXO.",
        created_at: Date.now(),
        tags: []
      },
      {
        title: "Test4",
        author: "Cody Daig",
        content: "Street art keytar Schlitz Vice, ugh art party tofu. Cold-pressed pug disrupt health goth listicle, fixie ennui salvia aesthetic skateboard paleo mixtape XOXO.",
        created_at: Date.now(),
        tags: []
      }
    ]
  };

  $scope.getPosts = function() {
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
      console.log('===========', data);
    });
  };

  // $scope.getPosts();
}
